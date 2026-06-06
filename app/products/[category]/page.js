"use client";
import { use, useRef, useEffect, useState, useCallback } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { getCategoryById, getProductsByCategory } from "../../../lib/products";

const PRODUCT_IMAGES = {
  "turmeric-finger-premium": "https://images.unsplash.com/photo-1615485500704-8e990f9900f7",
  "cumin-seeds-bold":        "https://images.unsplash.com/photo-1599599810694-b5b37304c041",
  "black-pepper-malabar":    "https://images.unsplash.com/photo-1532336414038-cf19250c5757",
  "coriander-seeds-eagle":   "https://images.unsplash.com/photo-1601050690597-df0568f70950",
  "red-chilli-s4":           "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
  "cardamom-green-8mm":      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
  "makhana-grade-a-large":   "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
  "makhana-grade-b":         "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
  "makhana-roasted-salted":  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
  "makhana-flavoured":       "https://images.unsplash.com/photo-1488477181946-6428a0291777",
  "cashew-w320":             "https://images.unsplash.com/photo-1599599810694-b5b37304c041",
  "almonds-california-style":"https://images.unsplash.com/photo-1508747703725-719777637510",
  "raisins-golden":          "https://images.unsplash.com/photo-1596560548464-f010b45d76da",
  "walnuts-light-halves":    "https://images.unsplash.com/photo-1563412580-8f01533e1e3f",
  "pistachios-fandoghi":     "https://images.unsplash.com/photo-1606923829579-0cb981a83e2a",
};

const CAT_HERO_IMAGES = {
  "spices":     "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
  "makhana":    "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
  "dry-fruits": "https://images.unsplash.com/photo-1508747703725-719777637510",
};

/* 3D tilt card */
function TiltCard({ product, priority = false }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotX = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 280, damping: 28 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 280, damping: 28 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const onMove = useCallback((e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    mx.set(nx); my.set(ny);
    setMousePos({ x: nx * 100, y: ny * 100 });
  }, [mx, my]);

  const onLeave = useCallback(() => {
    mx.set(0.5); my.set(0.5);
    setHovered(false);
  }, [mx, my]);

  const imgSrc = PRODUCT_IMAGES[product.slug];
  const specEntries = Object.entries(product.specifications).filter(([, v]) => !Array.isArray(v)).slice(0, 3);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", transformPerspective: 900, position: "relative", overflow: "hidden", cursor: "pointer", height: "100%" }}
    >
      <Link href={`/products/${product.category}/${product.slug}`} style={{ display: "block", width: "100%", height: "100%", textDecoration: "none" }}>
        {/* Image */}
        <div style={{ position: "relative", height: "clamp(200px, 26vw, 360px)", overflow: "hidden" }}>
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            sizes="(max-width: 900px) 100vw, 33vw"
            style={{ objectFit: "cover", transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)", transform: hovered ? "scale(1.06)" : "scale(1)" }}
            priority={priority}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, oklch(11% 0.012 58 / 0.85) 0%, transparent 55%)" }} />

          {/* Mouse glow */}
          {hovered && (
            <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", mixBlendMode: "screen", background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, oklch(72% 0.18 68 / 0.2) 0%, transparent 60%)` }} />
          )}

          {/* Badges */}
          <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem", zIndex: 4, display: "flex", gap: "0.4rem" }}>
            {product.featured && (
              <span className="label" style={{ padding: "0.2rem 0.6rem", background: "oklch(72% 0.18 68 / 0.15)", border: "1px solid oklch(72% 0.18 68 / 0.45)", color: "oklch(43% 0.13 255)", fontSize: "8px", backdropFilter: "blur(8px)" }}>Featured</span>
            )}
            <span className="label" style={{ padding: "0.2rem 0.6rem", background: "oklch(97% 0.005 255 / 0.85)", border: "1px solid oklch(22% 0.07 255 / 0.08)", color: "oklch(22% 0.07 255 / 0.6)", fontSize: "8px", backdropFilter: "blur(8px)" }}>{product.tags[0]}</span>
          </div>

          <div style={{ position: "absolute", bottom: "0.75rem", left: "0.875rem", zIndex: 3 }}>
            <span className="label" style={{ color: "oklch(22% 0.07 255 / 0.45)", fontSize: "8px" }}>{product.origin}</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "1.25rem 1.25rem 1.5rem", background: "oklch(97% 0.005 255)", transform: "translateZ(20px)" }}>
          <p style={{ fontFamily: "'Boska', Georgia, serif", fontSize: "var(--text-xl)", fontWeight: 700, letterSpacing: "-0.02em", color: "oklch(22% 0.07 255)", lineHeight: 1.1, marginBottom: "0.2rem" }}>
            {product.name}
          </p>
          <p style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: "var(--text-xs)", color: "oklch(97% 0.008 85 / 0.38)", marginBottom: "1rem" }}>
            {product.grade}
          </p>

          {/* Specs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.25rem" }}>
            {specEntries.map(([key, val]) => (
              <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid oklch(22% 0.07 255 / 0.06)", paddingBottom: "0.35rem" }}>
                <span className="label" style={{ color: "oklch(22% 0.07 255 / 0.3)", fontSize: "8px" }}>{key.replace(/_/g, " ").toUpperCase()}</span>
                <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: "var(--text-sm)", fontWeight: 600, color: "oklch(22% 0.07 255)" }}>{val}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p className="label" style={{ color: "oklch(43% 0.13 255)", fontSize: "8px", marginBottom: "0.15rem" }}>MIN ORDER</p>
              <p style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: "var(--text-md)", fontWeight: 700, color: "oklch(22% 0.07 255)" }}>{product.moq}</p>
            </div>
            <span className="label" style={{ color: "oklch(43% 0.13 255)", fontSize: "9px", borderBottom: "1px solid oklch(72% 0.18 68 / 0.5)", paddingBottom: "1px" }}>View Details →</span>
          </div>
        </div>

        {/* Hover cert strip */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="certs"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0.6rem 1.25rem", background: "oklch(11% 0.012 58 / 0.9)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderTop: "1px solid oklch(72% 0.18 68 / 0.3)", display: "flex", gap: "0.4rem", flexWrap: "wrap" }}
            >
              {product.certifications.slice(0, 4).map(c => (
                <span key={c} className="label" style={{ fontSize: "8px", color: "oklch(43% 0.13 255)", padding: "0.15rem 0.5rem", border: "1px solid oklch(72% 0.18 68 / 0.35)" }}>{c}</span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Link>
    </motion.div>
  );
}

export default function CategoryPage({ params }) {
  /* Next.js 16: params is a Promise, must unwrap with React.use() */
  const { category: categoryId } = use(params);
  const category = getCategoryById(categoryId);
  if (!category) notFound();

  const allProducts = getProductsByCategory(categoryId);
  const [activeFilter, setActiveFilter] = useState("All");
  const heroImgRef = useRef(null);

  const filtered = activeFilter === "All" ? allProducts : allProducts.filter(p => p.tags.includes(activeFilter));
  const availableTags = ["All", ...new Set(allProducts.flatMap(p => p.tags))];
  const featured = allProducts.find(p => p.featured);
  const rest = allProducts.filter(p => p.id !== featured?.id);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        if (heroImgRef.current) {
          gsap.fromTo(heroImgRef.current,
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "expo.inOut", delay: 0.1 }
          );
          gsap.to(heroImgRef.current.querySelector("img"),
            { yPercent: 22, ease: "none", scrollTrigger: { trigger: heroImgRef.current, start: "top top", end: "bottom top", scrub: true } }
          );
        }
        gsap.fromTo(".cat-hero-word",
          { yPercent: 110 },
          { yPercent: 0, duration: 1.0, ease: "expo.out", stagger: 0.06, delay: 0.3 }
        );
        gsap.fromTo(".cat-hero-sub",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "expo.out", delay: 0.9 }
        );
      });
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <main style={{ background: "oklch(22% 0.07 255)" }}>

      {/* Cinematic hero */}
      <div style={{ position: "relative", height: "100svh", overflow: "hidden", background: "oklch(97% 0.005 255)" }} data-theme="light">
        <div ref={heroImgRef} style={{ position: "absolute", inset: 0, clipPath: "inset(0 100% 0 0)" }}>
          <Image src={CAT_HERO_IMAGES[categoryId]} alt={category.name} fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "center 40%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, oklch(11% 0.012 58 / 0.9) 0%, oklch(22% 0.07 255 / 0.4) 55%, oklch(11% 0.012 58 / 0.15) 100%)" }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 5, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "clamp(4rem, 7vw, 8rem)" }}>
          <p className="cat-hero-sub label" style={{ color: "oklch(22% 0.07 255 / 0.45)", marginBottom: "2rem", opacity: 0 }}>
            <Link href="/products" style={{ color: "inherit" }}>Products</Link>
            <span style={{ margin: "0 0.75rem" }}>→</span>
            {category.name}
          </p>
          <h1 style={{ fontFamily: "'Boska', Georgia, serif", fontSize: "var(--text-display)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 0.85, color: "oklch(22% 0.07 255)", marginBottom: "2rem" }}>
            {category.name.toUpperCase().split("").map((ch, i) => (
              <span key={i} style={{ display: ch === " " ? "inline" : "inline-block", overflow: ch === " " ? "visible" : "hidden" }}>
                <span className="cat-hero-word" style={{ display: "inline-block" }}>{ch === " " ? " " : ch}</span>
              </span>
            ))}
          </h1>
          <div className="cat-hero-sub" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", opacity: 0 }}>
            <p style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: "var(--text-md)", color: "oklch(22% 0.07 255 / 0.6)", maxWidth: "55ch", lineHeight: 1.6 }}>
              {category.tagline}
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {allProducts[0]?.certifications?.slice(0, 3).map(c => (
                <span key={c} className="label" style={{ padding: "0.3rem 0.75rem", border: "1px solid oklch(22% 0.07 255 / 0.15)", color: "oklch(22% 0.07 255 / 0.5)", fontSize: "9px" }}>{c}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "clamp(2rem, 4vw, 4rem)", right: "clamp(1.5rem, 4vw, 6rem)", zIndex: 5 }}>
          <span style={{ fontFamily: "'Boska', Georgia, serif", fontSize: "var(--text-display)", fontWeight: 900, color: "oklch(22% 0.07 255 / 0.05)", letterSpacing: "-0.05em" }}>
            {String(allProducts.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Category description */}
      <div className="container" style={{ paddingBlock: "clamp(4rem, 7vw, 8rem)", borderBottom: "1px solid oklch(22% 0.07 255 / 0.08)" }}>
        <p style={{ fontFamily: "'Boska', Georgia, serif", fontSize: "var(--text-2xl)", fontStyle: "italic", fontWeight: 500, letterSpacing: "-0.02em", color: "oklch(35% 0.08 255)", lineHeight: 1.35, maxWidth: "70ch" }}>
          "{category.description}"
        </p>
      </div>

      {/* Filter strip */}
      <div style={{ position: "sticky", top: "clamp(64px, 8vw, 80px)", zIndex: 20, background: "oklch(97% 0.008 85 / 0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid oklch(22% 0.07 255 / 0.08)" }}>
        <div className="container" style={{ paddingBlock: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <span className="label" style={{ color: "oklch(50% 0.07 255)", marginRight: "0.5rem" }}>Filter:</span>
          {availableTags.map(tag => (
            <button key={tag} onClick={() => setActiveFilter(tag)} className="label" style={{ padding: "0.35rem 0.875rem", border: `1px solid ${activeFilter === tag ? "oklch(43% 0.13 255)" : "oklch(14% 0.015 60 / 0.15)"}`, background: activeFilter === tag ? "oklch(43% 0.13 255)" : "transparent", color: activeFilter === tag ? "oklch(22% 0.07 255)" : "oklch(35% 0.08 255)", cursor: "pointer", letterSpacing: "0.12em", fontSize: "9px", transition: "all 200ms" }}>
              {tag}
            </button>
          ))}
          <span className="label" style={{ marginLeft: "auto", color: "oklch(50% 0.07 255)" }}>{filtered.length} of {allProducts.length}</span>
        </div>
      </div>

      {/* Product grid */}
      <div className="container" style={{ paddingBlock: "clamp(3rem, 6vw, 7rem)" }}>
        <AnimatePresence mode="wait">
          {activeFilter === "All" ? (
            <motion.div key="bento" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              {/* Bento: featured spans 2 rows */}
              <div data-theme="light" style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr 1fr", gap: "2px", background: "oklch(22% 0.07 255 / 0.06)" }}>
                {featured && (
                  <div style={{ gridRow: "span 2", minHeight: "clamp(450px, 58vw, 740px)" }}>
                    <TiltCard product={featured} priority />
                  </div>
                )}
                {rest.slice(0, 4).map((p, i) => (
                  <div key={p.id} style={{ minHeight: "clamp(220px, 28vw, 360px)" }}>
                    <TiltCard product={p} priority={i < 2} />
                  </div>
                ))}
                {rest.slice(4).map(p => (
                  <div key={p.id} style={{ minHeight: "clamp(220px, 28vw, 360px)" }}>
                    <TiltCard product={p} />
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key={`f-${activeFilter}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
              <div data-theme="light" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2px", background: "oklch(22% 0.07 255 / 0.06)" }}>
                {filtered.length === 0 ? (
                  <div style={{ gridColumn: "1 / -1", padding: "5rem 0", textAlign: "center" }}>
                    <p style={{ fontFamily: "'Boska', Georgia, serif", fontSize: "var(--text-xl)", color: "oklch(50% 0.07 255)" }}>No products match this filter.</p>
                  </div>
                ) : filtered.map(p => (
                  <div key={p.id} style={{ minHeight: "clamp(340px, 42vw, 500px)" }}>
                    <TiltCard product={p} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div data-theme="light" style={{ background: "oklch(97% 0.005 255)", paddingBlock: "clamp(4rem, 7vw, 8rem)" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <p className="label" style={{ color: "oklch(43% 0.13 255)", marginBottom: "0.75rem" }}>Interested in {category.name}?</p>
            <p style={{ fontFamily: "'Boska', Georgia, serif", fontSize: "var(--text-2xl)", fontWeight: 700, letterSpacing: "-0.03em", color: "oklch(22% 0.07 255)", lineHeight: 1.1 }}>Start your enquiry.</p>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/cart" className="btn-primary">Build Enquiry List</Link>
            <Link href="/products" className="btn-ghost" style={{ color: "oklch(22% 0.07 255)", borderColor: "oklch(22% 0.07 255 / 0.14)" }}>← All Products</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
