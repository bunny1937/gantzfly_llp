"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NoiseCanvas from "../ui/NoiseCanvas";
import SparkCanvas from "../ui/SparkCanvas";

/* ─── Unsplash hero image — spice market, warm tones ─── */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1800&q=80&fit=crop";

/* ─── Authored text sequence — phrase by phrase (persepolis.getty.edu) ─── */
const PHRASES = [
  { text: "INDIA'S", delay: 0.3 },
  { text: "FINEST", delay: 0.75 },
  { text: "ON YOUR", delay: 1.25 },
  { text: "SHELF.", delay: 1.75 },
];

export default function HeroSection() {
  const headingRef = useRef(null);
  const magneticRef = useRef(null);
  const cornerRef = useRef(null);
  const containerRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  /* ─── GSAP entrance sequence ─── */
  useEffect(() => {
    let ctx;
    let tl;

    const init = async () => {
      const { gsap } = await import("gsap");

      ctx = gsap.context(() => {
        // Set initial states
        gsap.set(".hero-phrase", { yPercent: 110, opacity: 0 });
        gsap.set(".hero-sub", { opacity: 0, y: 20 });
        gsap.set(".hero-cta", { opacity: 0, y: 16 });
        gsap.set(".hero-corner", { opacity: 0, x: 20 });
        gsap.set(".hero-scroll-hint", { opacity: 0 });

        tl = gsap.timeline({
          delay: 0.4,
          onComplete: () => setRevealed(true),
        });

        // Phrases stagger — authored timing
        PHRASES.forEach((phrase, i) => {
          tl.to(
            `.hero-phrase-${i}`,
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.9,
              ease: "expo.out",
            },
            phrase.delay
          );
        });

        // Sub-elements after last phrase
        tl.to(".hero-sub", { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" }, 2.4)
          .to(".hero-cta", { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }, 2.65)
          .to(".hero-corner", { opacity: 1, x: 0, duration: 0.5, ease: "expo.out" }, 2.8)
          .to(".hero-scroll-hint", { opacity: 1, duration: 0.4 }, 3.2);
      }, containerRef);
    };

    init();

    return () => ctx?.revert();
  }, []);

  /* ─── Magnetic cursor on heading (theshift.tokyo) ─── */
  useEffect(() => {
    const el = magneticRef.current;
    if (!el) return;

    let gsap;
    let cleanup;

    const init = async () => {
      const mod = await import("gsap");
      gsap = mod.gsap;

      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 180;

        if (dist < radius) {
          const strength = (1 - dist / radius) * 18;
          gsap.to(el, {
            x: (dx / dist) * strength,
            y: (dy / dist) * strength,
            duration: 0.4,
            ease: "power2.out",
          });
        } else {
          gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "expo.out" });
        }
      };

      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
      };

      window.addEventListener("mousemove", onMove, { passive: true });
      el.addEventListener("mouseleave", onLeave);

      cleanup = () => {
        window.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    };

    init();
    return () => cleanup?.();
  }, []);

  /* ─── Easter egg: click corner element 3× → gold burst ─── */
  const eggClicks = useRef(0);
  const handleCornerClick = async () => {
    eggClicks.current += 1;
    if (eggClicks.current < 3) return;
    eggClicks.current = 0;

    const { gsap } = await import("gsap");
    const corner = cornerRef.current;
    if (!corner) return;

    // Create 12 gold particle dots
    const particles = Array.from({ length: 12 }, () => {
      const dot = document.createElement("span");
      dot.style.cssText = `
        position: fixed;
        width: 6px; height: 6px;
        background: oklch(72% 0.18 68);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
      `;
      const rect = corner.getBoundingClientRect();
      dot.style.left = `${rect.left + rect.width / 2}px`;
      dot.style.top = `${rect.top + rect.height / 2}px`;
      document.body.appendChild(dot);
      return dot;
    });

    gsap.to(particles, {
      x: () => (Math.random() - 0.5) * 140,
      y: () => (Math.random() - 0.5) * 140,
      opacity: 0,
      scale: () => Math.random() * 2 + 0.5,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.04,
      onComplete: () => particles.forEach((p) => p.remove()),
    });
  };

  return (
    <section
      ref={containerRef}
      data-theme="dark"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
        background: "var(--surface-0)",
      }}
      aria-label="Hero — GiantzFly Exim LLP"
    >
      {/* ─── Background image ─── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <Image
          src={HERO_IMAGE}
          alt="Premium Indian spices — export grade"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
        />
        {/* Gradient overlay — warm ink, not pure black */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              to top,
              oklch(11% 0.012 58 / 0.97) 0%,
              oklch(11% 0.012 58 / 0.75) 40%,
              oklch(11% 0.012 58 / 0.35) 70%,
              transparent 100%
            )`,
          }}
        />
      </div>

      {/* ─── Canvas effects ─── */}
      <SparkCanvas color="oklch(72% 0.18 68)" amount={42} speed={0.5} />
      <NoiseCanvas alpha={14} />

      {/* ─── Fixed corner element — theshift.tokyo live-clock concept ─── */}
      <div
        ref={cornerRef}
        className="hero-corner"
        onClick={handleCornerClick}
        title="Click 3× for a surprise"
        style={{
          position: "absolute",
          top: "clamp(80px, 6rem, 100px)",
          right: "clamp(1.25rem, 3vw, 4rem)",
          zIndex: 10,
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <p
          className="label"
          style={{
            color: "var(--saffron)",
            letterSpacing: "0.18em",
            lineHeight: 1.8,
            textAlign: "right",
          }}
        >
          INDIA
        </p>
        <p
          className="label"
          style={{
            color: "oklch(97% 0.008 85 / 0.45)",
            letterSpacing: "0.12em",
            lineHeight: 1.8,
            textAlign: "right",
          }}
        >
          → USA · EU · AFRICA
        </p>
        <LiveClock />
      </div>

      {/* ─── Main hero content — left-aligned, bottom of viewport ─── */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 5,
          paddingBottom: "clamp(4rem, 5vw + 2rem, 8rem)",
          paddingTop: "clamp(6rem, 10vw, 12rem)",
        }}
      >
        {/* Eyebrow label */}
        <p
          className="label hero-sub"
          style={{
            color: "var(--saffron)",
            marginBottom: "1.5rem",
          }}
        >
          Premium Indian Export — Est. 2010
        </p>

        {/* ─── Authored heading — phrase by phrase ─── */}
        <h1
          ref={headingRef}
          style={{
            fontFamily: "'Boska', Georgia, serif",
            fontSize: "var(--text-display)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            color: "var(--porcelain)",
            marginBottom: "clamp(2rem, 3vw, 4rem)",
            overflow: "hidden",
          }}
        >
          {/* Each phrase wraps in overflow:hidden to clip yPercent animation */}
          {PHRASES.map((phrase, i) => (
            <span
              key={i}
              style={{ display: "block", overflow: "hidden" }}
            >
              <span
                ref={i === 0 ? magneticRef : null}
                className={`hero-phrase hero-phrase-${i}`}
                style={{
                  display: "inline-block",
                  /* "SHELF." gets saffron accent */
                  color:
                    i === PHRASES.length - 1
                      ? "var(--saffron)"
                      : "var(--porcelain)",
                }}
              >
                {phrase.text}
              </span>
            </span>
          ))}
        </h1>

        {/* Sub-copy */}
        <p
          className="hero-sub"
          style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontSize: "var(--text-lg)",
            color: "oklch(97% 0.008 85 / 0.65)",
            maxWidth: "52ch",
            lineHeight: 1.55,
            marginBottom: "clamp(2rem, 3vw, 3.5rem)",
          }}
        >
          Spices, Makhana & Dry Fruits — bulk supply and private-label
          capability for distributors, retailers and supermarkets.
        </p>

        {/* CTAs */}
        <div
          className="hero-cta"
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          <Link href="/products" className="btn-primary">
            Browse Products
          </Link>
          <Link href="/cart" className="btn-ghost">
            Build Enquiry
          </Link>
        </div>
      </div>

      {/* ─── Scroll hint ─── */}
      <div
        className="hero-scroll-hint"
        style={{
          position: "absolute",
          bottom: "clamp(1.5rem, 3vw, 3rem)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
        aria-hidden="true"
      >
        <p
          className="label"
          style={{ color: "oklch(97% 0.008 85 / 0.3)", letterSpacing: "0.2em" }}
        >
          SCROLL
        </p>
        <ScrollArrow />
      </div>
    </section>
  );
}

/* ─── Live clock — theshift.tokyo fixed operational element ─── */
function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const ist = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(ist + " IST");
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <p
      style={{
        fontFamily: "'Cabinet Grotesk', sans-serif",
        fontSize: "var(--text-xs)",
        color: "oklch(97% 0.008 85 / 0.3)",
        letterSpacing: "0.1em",
        textAlign: "right",
        marginTop: "0.25rem",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {time}
    </p>
  );
}

/* ─── Animated scroll arrow ─── */
function ScrollArrow() {
  return (
    <svg
      width="20"
      height="28"
      viewBox="0 0 20 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ opacity: 0.3 }}
    >
      <rect
        x="1"
        y="1"
        width="18"
        height="26"
        rx="9"
        stroke="oklch(97% 0.008 85)"
        strokeWidth="1.5"
      />
      <circle cx="10" cy="8" r="2.5" fill="oklch(97% 0.008 85)">
        <animate
          attributeName="cy"
          values="8;18;8"
          dur="2s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        <animate
          attributeName="opacity"
          values="1;0;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
