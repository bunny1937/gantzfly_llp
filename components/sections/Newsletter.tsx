"use client";
import { useState } from "react";
import styles from "./Newsletter.module.css";

export default function Newsletter() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(data.error || "Something went wrong.");
    }
  }

  return (
    <section className={`section ${styles.newsletter}`}>
      <div className={`container ${styles.grid}`}>
        {/* Left — Text */}
        <div>
          <span className="feature-icon" aria-hidden="true">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </span>
          <p className={`eyebrow ${styles.eyebrowLight}`}>Trade Updates</p>
          <h2 className={styles.heading}>
            Stay informed on catalog, origins, and availability.
          </h2>
          <p className={styles.lead}>
            We share crop updates, new SKU additions, MOQ changes, and
            export-relevant notes directly with buyers on our list. No marketing
            noise — only trade information relevant to importers, distributors,
            and sourcing teams.
          </p>
          <div className={styles.bulletList}>
            {[
              "Seasonal harvest and availability updates",
              "New grades, packaging options, and SKUs",
              "Origin traceability and certification news",
            ].map((item) => (
              <div key={item} className={styles.bulletItem}>
                <span aria-hidden="true" className={styles.bulletDot} />
                <span className={styles.bulletText}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div className={`card ${styles.formCard}`}>
          {status === "success" ? (
            <div className={styles.successBox}>
              <div className={styles.successMark}>✓</div>
              <h3 className={styles.successTitle}>You&#39;re subscribed.</h3>
              <p className={styles.successText}>
                Check your inbox for a welcome message from GiantzFly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div>
                <p
                  className={`eyebrow ${styles.eyebrowLight} ${styles.formEyebrow}`}
                >
                  Join the trade list
                </p>
                <p className={styles.formIntro}>
                  For buyers and sourcing teams. No retail content.
                </p>
              </div>

              <div className="form-group">
                <label
                  className={`form-label ${styles.labelLight}`}
                  htmlFor="nl-name"
                >
                  Full Name
                </label>
                <input
                  id="nl-name"
                  className={`form-input ${styles.inputDark}`}
                  placeholder="James Carter"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label
                  className={`form-label ${styles.labelLight}`}
                  htmlFor="nl-company"
                >
                  Company / Organisation{" "}
                  <span className={styles.optional}>(optional)</span>
                </label>
                <input
                  id="nl-company"
                  className={`form-input ${styles.inputDark}`}
                  placeholder="Acme Imports Ltd."
                  value={form.company}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, company: e.target.value }))
                  }
                />
              </div>

              <div className="form-group">
                <label
                  className={`form-label ${styles.labelLight}`}
                  htmlFor="nl-email"
                >
                  Business Email
                </label>
                <input
                  id="nl-email"
                  type="email"
                  className={`form-input ${styles.inputDark}`}
                  placeholder="buyer@company.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label
                  className={`form-label ${styles.labelLight}`}
                  htmlFor="nl-msg"
                >
                  What are you sourcing?{" "}
                  <span className={styles.optional}>(optional)</span>
                </label>
                <textarea
                  id="nl-msg"
                  className={`form-textarea ${styles.inputDark} ${styles.textareaDark}`}
                  placeholder="Cumin seeds, makhana, black pepper..."
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                />
              </div>

              {status === "error" && (
                <p className={styles.errorText}>{errorMsg}</p>
              )}

              <button
                type="submit"
                className={`btn btn--primary btn--lg ${styles.submitBtn}`}
                disabled={status === "loading"}
              >
                {status === "loading" ? "Submitting…" : "Join →"}
              </button>

              <p className={styles.disclaimer}>
                By subscribing you agree to receive B2B trade updates from
                GiantzFly Exim LLP. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
