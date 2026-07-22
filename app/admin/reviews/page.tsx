"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

const ADMIN_EMAIL = "giantzflyexim@gmail.com";

interface PendingReview {
  id: string;
  name: string;
  company?: string;
  country?: string;
  rating: number;
  text: string;
  photo?: string;
  createdAt: { seconds: number };
}

export default function AdminReviewsPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [reviews, setReviews] = useState<PendingReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== ADMIN_EMAIL) {
        router.replace("/");
        return;
      }
      setReady(true);
      fetchPending(user);
    });
    return unsub;
  }, [router]);

  const fetchPending = async (user: import("firebase/auth").User) => {
    setLoading(true);
    const token = await user.getIdToken();
    const res = await fetch("/api/admin/pending-reviews", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setReviews(data.reviews);
    }
    setLoading(false);
  };

  const handleAction = useCallback(
    async (reviewId: string, action: "approve" | "reject") => {
      setActionMsg("");
      const user = auth.currentUser;
      if (!user) return;
      const token = await user.getIdToken();
      const res = await fetch("/api/admin/approve-review", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewId, action }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMsg(
          `${action === "approve" ? "✓ Approved" : "✗ Rejected"}: ${reviewId}`,
        );
        if (auth.currentUser) fetchPending(auth.currentUser);
      } else {
        setActionMsg("Error — try again.");
      }
    },
    [],
  );

  if (!ready) return null;

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Admin</p>
        <h1
          style={{
            fontSize: "var(--text-2xl)",
            marginTop: "var(--space-3)",
            marginBottom: "var(--space-8)",
          }}
        >
          Pending Reviews
        </h1>

        {actionMsg && (
          <div
            className="card"
            style={{
              padding: "var(--space-4)",
              marginBottom: "var(--space-6)",
              background: "var(--bg-2)",
              fontSize: "var(--text-sm)",
            }}
          >
            {actionMsg}
          </div>
        )}

        {loading ? (
          <p style={{ color: "var(--text-muted)" }}>Loading…</p>
        ) : reviews.length === 0 ? (
          <div
            className="card"
            style={{
              padding: "var(--space-10)",
              textAlign: "center",
              color: "var(--text-muted)",
            }}
          >
            <p>No pending reviews. All clear.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "var(--space-5)" }}>
            {reviews.map((r) => (
              <div
                key={r.id}
                className="card"
                style={{
                  padding: "var(--space-6)",
                  display: "grid",
                  gap: "var(--space-4)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "var(--space-4)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "var(--space-3)",
                      alignItems: "center",
                    }}
                  >
                    {r.photo ? (
                      <img
                        src={r.photo}
                        alt={r.name}
                        width={40}
                        height={40}
                        referrerPolicy="no-referrer"
                        style={{
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "1px solid var(--border)",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          background: "var(--blue-wash)",
                          display: "grid",
                          placeItems: "center",
                          fontWeight: 700,
                          color: "var(--blue)",
                        }}
                      >
                        {r.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontWeight: 700,
                          color: "var(--navy)",
                          fontSize: "var(--text-sm)",
                        }}
                      >
                        {r.name}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "var(--text-xs)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {[r.company, r.country].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 2 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        style={{
                          fontSize: "1.1rem",
                          color: s <= r.rating ? "#d19900" : "var(--border)",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <p
                  style={{
                    margin: 0,
                    fontSize: "var(--text-sm)",
                    lineHeight: 1.75,
                    color: "var(--navy)",
                    background: "var(--bg-2)",
                    padding: "var(--space-4)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  {r.text}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "var(--space-3)",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    className="btn btn--primary"
                    onClick={() => handleAction(r.id, "approve")}
                  >
                    ✓ Approve
                  </button>
                  <button
                    className="btn btn--ghost"
                    style={{ color: "var(--text-muted)" }}
                    onClick={() => handleAction(r.id, "reject")}
                  >
                    ✗ Reject
                  </button>
                  <span
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-faint)",
                      marginLeft: "auto",
                    }}
                  >
                    Doc ID: {r.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
