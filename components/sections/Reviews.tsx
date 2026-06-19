"use client";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
  doc,
  setDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, db, googleProvider } from "@/lib/firebase";
import Image from "next/image";

interface Review {
  id: string;
  userId: string;
  name: string;
  photo: string;
  company?: string;
  country?: string;
  rating: number;
  text: string;
  createdAt: Timestamp;
}

const STAR = "★";
const STAR_EMPTY = "☆";

export default function Reviews() {
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Edit display name / company
  const [editName, setEditName] = useState("");
  const [form, setForm] = useState({
    company: "",
    country: "",
    rating: 5,
    text: "",
  });

  // Auth listener
  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) setEditName(u.displayName || "");
    });
  }, []);

  // Firestore listener
  useEffect(() => {
    const q = query(
      collection(db, "reviews"),
      where("approved", "==", true),
      orderBy("createdAt", "desc"),
    );
    return onSnapshot(q, (snap) => {
      setReviews(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Review));
      setLoading(false);
    });
  }, []);

  async function handleGoogleSignIn() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleSignOut() {
    await signOut(auth);
    setShowForm(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || form.text.trim().length < 10) return;
    setSubmitting(true);
    // Uses userId as doc ID — second submit from same user overwrites (still pending)
    const slug = (editName || user.displayName || "buyer")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const docId = `${slug}_${user.uid.slice(0, 8)}`;

    await setDoc(doc(db, "reviews", docId), {
      docId,
      userId: user.uid,
      approved: false,
      name: editName || user.displayName || "Buyer",
      photo: user.photoURL || "",
      company: form.company,
      country: form.country,
      rating: form.rating,
      text: form.text.trim(),
      createdAt: Timestamp.now(),
    });
    setForm({ company: "", country: "", rating: 5, text: "" });
    setShowForm(false);
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <div className="section-head">
          <svg
            className="quote-mark"
            viewBox="0 0 32 32"
            width="40"
            height="40"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 8c-4 1.5-6 4.7-6 9.6V24h8v-8H9.5c.2-2.4 1.4-3.7 3.5-4.4L12 8Zm14 0c-4 1.5-6 4.7-6 9.6V24h8v-8h-4.5c.2-2.4 1.4-3.7 3.5-4.4L26 8Z" />
          </svg>
          <span className="kicker">Buyer Feedback</span>
          <h2 className="section-title">
            From sourcing teams across global markets.
          </h2>
          <p className="section-copy">
            Trade relationships are built on consistent supply, complete
            documentation, and direct communication.
          </p>
        </div>

        {/* Auth bar */}
        <div
          style={{
            display: "flex",
            gap: "var(--space-4)",
            marginTop: "var(--space-6)",
            padding: "var(--space-4) var(--space-6)",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-xl)",
          }}
        >
          {!user ? (
            <button
              className="btn btn-secondary"
              onClick={handleGoogleSignIn}
              style={{ display: "flex", gap: 8, alignItems: "center" }}
            >
              <img
                src="https://cdn.simpleicons.org/google"
                alt=""
                width={16}
                height={16}
                style={{ borderRadius: 2 }}
              />
              Sign in with Google to leave a review
            </button>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-3)",
                }}
              >
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt={user.displayName || ""}
                    width={32}
                    height={32}
                    style={{
                      borderRadius: "50%",
                      border: "1px solid var(--border)",
                      objectFit: "cover",
                      overflow: "hidden",
                      display: "block",
                      flexShrink: 0,
                    }}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "var(--blue-wash)",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 700,
                      fontSize: "var(--text-sm)",
                      color: "var(--blue)",
                      flexShrink: 0,
                    }}
                  >
                    {(editName || user.displayName || "B")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 600,
                      fontSize: "var(--text-sm)",
                      color: "var(--navy)",
                    }}
                  >
                    {editName || user.displayName}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "var(--text-xs)",
                      color: "var(--text-muted)",
                    }}
                  >
                    Signed in · Google
                  </p>
                </div>
              </div>
              <button
                className="btn btn--outline"
                onClick={() => {
                  setShowForm((s) => !s);
                  setSubmitted(false);
                }}
              >
                {showForm ? "Cancel" : "+ Add Review"}
              </button>
              <button
                className="btn btn--ghost"
                style={{ fontSize: "var(--text-xs)" }}
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </>
          )}
        </div>

        {submitted && !showForm && (
          <div
            className="card"
            style={{
              padding: "var(--space-8)",
              marginBottom: "var(--space-8)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "var(--space-3)" }}>
              ✓
            </div>
            <h3
              style={{
                fontSize: "var(--text-xl)",
                color: "var(--navy)",
                marginBottom: "var(--space-2)",
              }}
            >
              Review submitted.
            </h3>
            <p
              style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}
            >
              Your review is pending approval and will appear on the website
              once confirmed.
            </p>
          </div>
        )}

        {/* Review form */}
        {showForm && user && (
          <form
            onSubmit={handleSubmit}
            className="card"
            style={{
              padding: "var(--space-8)",
              marginBottom: "var(--space-8)",
              display: "grid",
              gap: "var(--space-5)",
            }}
          >
            <h3 style={{ fontSize: "var(--text-xl)", marginBottom: 0 }}>
              Share your experience
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--space-4)",
              }}
            >
              <div className="form-group">
                <label className="form-label" htmlFor="r-name">
                  Display Name
                </label>
                <input
                  id="r-name"
                  className="form-input"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder={user.displayName || "Your name"}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="r-company">
                  Company{" "}
                  <span style={{ fontWeight: 400, opacity: 0.6 }}>
                    (optional)
                  </span>
                </label>
                <input
                  id="r-company"
                  className="form-input"
                  value={form.company}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, company: e.target.value }))
                  }
                  placeholder="Carter Foods LLC"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="r-country">
                  Country{" "}
                  <span style={{ fontWeight: 400, opacity: 0.6 }}>
                    (optional)
                  </span>
                </label>
                <input
                  id="r-country"
                  className="form-input"
                  value={form.country}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, country: e.target.value }))
                  }
                  placeholder="United Kingdom"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Rating</label>
                <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, rating: s }))}
                      style={{
                        fontSize: "1.6rem",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: s <= form.rating ? "#d19900" : "var(--border)",
                        lineHeight: 1,
                      }}
                      aria-label={`${s} star`}
                    >
                      {STAR}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="r-text">
                Your review{" "}
                <span style={{ color: "var(--text-faint)", fontWeight: 400 }}>
                  (min. 10 characters)
                </span>
              </label>
              <textarea
                id="r-text"
                className="form-textarea"
                value={form.text}
                onChange={(e) =>
                  setForm((p) => ({ ...p, text: e.target.value }))
                }
                placeholder="Share your experience with GiantzFly — product quality, documentation, communication..."
                required
                style={{ minHeight: 100 }}
              />
            </div>
            <button
              type="submit"
              className="btn btn--primary btn--lg"
              disabled={submitting || form.text.trim().length < 10}
              style={{ justifySelf: "start" }}
            >
              {submitting ? "Posting…" : "Post Review"}
            </button>
          </form>
        )}

        {/* Reviews grid */}
        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "var(--space-6)",
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: "var(--space-6)",
                  height: 180,
                  background: "var(--bg-2)",
                }}
              />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "var(--space-16) 0",
              color: "var(--text-muted)",
            }}
          >
            <p style={{ fontSize: "var(--text-base)" }}>
              No reviews yet. Be the first to share your experience.
            </p>
          </div>
        ) : (
          <div
            style={{
              marginTop: "var(--space-8)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "var(--space-6)",
            }}
          >
            {reviews.map((r) => (
              <article
                key={r.id}
                className="card"
                style={{
                  padding: "var(--space-6)",
                  display: "grid",
                  gap: "var(--space-4)",
                  border: "1px solid var(--border)",
                  background:
                    "linear-gradient(180deg, var(--bg-card), var(--bg-2))",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "var(--space-3)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-3)",
                    }}
                  >
                    {r.photo ? (
                      <img
                        src={r.photo}
                        alt={r.name}
                        width={36}
                        height={36}
                        style={{
                          borderRadius: "50%",
                          border: "1px solid var(--border)",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          background: "var(--blue-wash)",
                          display: "grid",
                          placeItems: "center",
                          fontWeight: 700,
                          fontSize: "var(--text-sm)",
                          color: "var(--blue)",
                        }}
                      >
                        {r.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p
                        style={{
                          fontWeight: 700,
                          fontSize: "var(--text-sm)",
                          color: "var(--navy)",
                          margin: 0,
                        }}
                      >
                        {r.name}
                      </p>
                      {(r.company || r.country) && (
                        <p
                          style={{
                            fontSize: "var(--text-xs)",
                            color: "var(--text-muted)",
                            margin: "2px 0 0",
                          }}
                        >
                          {[r.company, r.country].filter(Boolean).join(" · ")}
                        </p>
                      )}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 2 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        style={{
                          fontSize: "0.9rem",
                          color: s <= r.rating ? "#d19900" : "var(--border)",
                        }}
                      >
                        {STAR}
                      </span>
                    ))}
                  </div>
                </div>
                <blockquote
                  style={{
                    margin: 0,
                    fontSize: "var(--text-sm)",
                    lineHeight: 1.75,
                    color: "var(--navy)",
                    fontStyle: "normal",
                  }}
                >
                  {r.text}
                </blockquote>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "var(--space-2)",
                    alignItems: "center",
                  }}
                >
                  <span className="chip" style={{ fontSize: "var(--text-xs)" }}>
                    Verified Buyer
                  </span>
                  <span
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-faint)",
                      marginLeft: "auto",
                    }}
                  >
                    {r.createdAt?.toDate?.().toLocaleDateString("en-GB", {
                      month: "short",
                      year: "numeric",
                    }) || ""}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
