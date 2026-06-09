"use client";
import { useRef, useEffect, useState } from "react";

const STATS = [
  {
    value: 15,
    suffix: "+",
    label: "Years Exporting",
    description: "Operating since 2010",
  },
  {
    value: 3,
    suffix: "",
    label: "Continents Reached",
    description: "USA · Europe · Africa",
  },
  {
    value: 500,
    suffix: "+",
    label: "Metric Tons / Year",
    description: "Consistent bulk supply",
  },
  {
    value: 15,
    suffix: "",
    label: "Product Lines",
    description: "Spices · Makhana · Dry Fruits",
  },
];

const CERTS = [
  { name: "FSSAI", desc: "Food Safety & Standards Authority of India" },
  {
    name: "APEDA",
    desc: "Agricultural & Processed Food Products Export Development Authority",
  },
  { name: "IEC", desc: "Importer Exporter Code — Ministry of Commerce" },
  { name: "USDA Organic", desc: "United States Department of Agriculture" },
  { name: "EU Organic", desc: "European Union Organic Certification" },
  { name: "Spices Board", desc: "Quality Mark — Spices Board of India" },
];

function AnimatedStat({ value, suffix, trigger }) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    const duration = 1800;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [trigger, value]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

function StatCard({ stat }) {
  const ref = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        padding: "clamp(2rem, 3vw, 3.5rem) clamp(1.5rem, 2.5vw, 3rem)",
        border: "1px solid var(--surface-border)",
        background: "var(--surface-1)",
        transition: "background 300ms",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "var(--surface-2)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "var(--surface-1)")
      }
    >
      <p
        style={{
          fontFamily: "'Boska', Georgia, serif",
          fontSize: "var(--text-4xl)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          lineHeight: 0.9,
          color: "var(--saffron)",
          marginBottom: "0.75rem",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <AnimatedStat
          value={stat.value}
          suffix={stat.suffix}
          trigger={triggered}
        />
      </p>
      <p
        style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontSize: "var(--text-md)",
          fontWeight: 600,
          color: "var(--navy)",
          marginBottom: "0.4rem",
        }}
      >
        {stat.label}
      </p>
      <p
        style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontSize: "var(--text-sm)",
          color: "var(--ink-faint)",
        }}
      >
        {stat.description}
      </p>
    </div>
  );
}

export default function ProofRoom() {
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    };

    init();
  }, []);

  return (
    <section
      data-theme="dark"
      style={{
        background: "var(--bg)",
        paddingBlock: "var(--section-normal)",
      }}
      aria-label="Proof — export credentials and stats"
    >
      <div className="container">
        {/* Section header */}
        <div
          ref={titleRef}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
            marginBottom: "clamp(3rem, 4vw, 5rem)",
          }}
        >
          <div>
            <p
              className="label"
              style={{ color: "var(--saffron)", marginBottom: "1rem" }}
            >
              Why Buyers Trust Us
            </p>
            <h2
              style={{
                fontFamily: "'Boska', Georgia, serif",
                fontSize: "var(--text-3xl)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "var(--navy)",
                lineHeight: 1,
              }}
            >
              THE PROOF
              <br />
              <span style={{ color: "var(--saffron)" }}>ROOM.</span>
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontSize: "var(--text-md)",
              color: "var(--ink-faint)",
              maxWidth: "40ch",
              lineHeight: 1.65,
            }}
          >
            Numbers don't lie. Every certification, every metric, every shipment
            — documented and auditable.
          </p>
        </div>

        {/* Stats — bento-style, not uniform 3-col */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1px",
            background: "var(--surface-border)",
            border: "1px solid var(--surface-border)",
            marginBottom: "clamp(3rem, 4vw, 5rem)",
          }}
        >
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

        {/* Certifications */}
        <div>
          <p
            className="label"
            style={{ color: "var(--ink-faint)", marginBottom: "1.5rem" }}
          >
            Certifications & Registrations
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            {CERTS.map(({ name, desc }) => (
              <div
                key={name}
                title={desc}
                style={{
                  padding: "0.6rem 1.25rem",
                  border: "1px solid var(--surface-border)",
                  cursor: "default",
                  transition: "border-color 200ms, background 200ms",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--saffron)";
                  e.currentTarget.style.background = "var(--surface-1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--surface-border)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <p
                  className="label"
                  style={{ color: "var(--navy)", letterSpacing: "0.1em" }}
                >
                  {name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
