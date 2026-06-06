"use client";
import { use, useRef, useEffect, useState, useCallback } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { getProductBySlug, getRelatedProducts, getCategoryById } from "../../../../lib/products";
import { useCart } from "../../../../lib/cart";

const PRODUCT_IMAGES = {
  "turmeric-finger-premium": [
    "https://images.unsplash.com/photo-1615485500704-8e990f9900f7",
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
    "https://images.unsplash.com/photo-1531236698054-1cbc5f30a7d9",
  ],
  "cumin-seeds-bold": [
    "https://images.unsplash.com/photo-1599599810694-b5b37304c041",
    "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
  ],
  "black-pepper-malabar": [
    "https://images.unsplash.com/photo-1532336414038-cf19250c5757",
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
    "https://images.unsplash.com/photo-1599599810694-b5b37304c041",
  ],
  "coriander-seeds-eagle": [
    "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
    "https://images.unsplash.com/photo-1599599810694-b5b37304c041",
  ],
  "red-chilli-s4": [
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
    "https://images.unsplash.com/photo-1601050690597-df0568f70950",
  ],
  "cardamom-green-8mm": [
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
    "https://images.unsplash.com/photo-1599599810694-b5b37304c041",
    "https://images.unsplash.com/photo-1532336414038-cf19250c5757",
  ],
  "makhana-grade-a-large": [
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
    "https://images.unsplash.com/photo-1488477181946-6428a0291777",
  ],
  "makhana-grade-b": [
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
    "https://images.unsplash.com/photo-1488477181946-6428a0291777",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
  ],
  "makhana-roasted-salted": [
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
    "https://images.unsplash.com/photo-1488477181946-6428a0291777",
  ],
  "makhana-flavoured": [
    "https://images.unsplash.com/photo-1488477181946-6428a0291777",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
  ],
  "cashew-w320": [
    "https://images.unsplash.com/photo-1599599810694-b5b37304c041",
    "https://images.unsplash.com/photo-1508747703725-719777637510",
    "https://images.unsplash.com/photo-1563412580-8f01533e1e3f",
  ],
  "almonds-california-style": [
    "https://images.unsplash.com/photo-1508747703725-719777637510",
    "https://images.unsplash.com/photo-1599599810694-b5b37304c041",
    "https://images.unsplash.com/photo-1606923829579-0cb981a83e2a",
  ],
  "raisins-golden": [
    "https://images.unsplash.com/photo-1596560548464-f010b45d76da",
    "https://images.unsplash.com/photo-1508747703725-719777637510",
    "https://images.unsplash.com/photo-1563412580-8f01533e1e3f",
  ],
  "walnuts-light-halves": [
    "https://images.unsplash.com/photo-1563412580-8f01533e1e3f",
    "https://images.unsplash.com/photo-1508747703725-719777637510",
    "https://images.unsplash.com/photo-1596560548464-f010b45d76da",
  ],
  "pistachios-fandoghi": [
    "https://images.unsplash.com/photo-1606923829579-0cb981a83e2a",
    "https://images.unsplash.com/photo-1508747703725-719777637510",
    "https://images.unsplash.com/photo-1563412580-8f01533e1e3f",
  ],
};

const ORIGIN_IMAGES = {
  "spices":     "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
  "makhana":    "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
  "dry-fruits": "https://images.unsplash.com/photo-1508747703725-719777637510",
};

const CAT_ACCENT = {
  "spices":     "oklch(43% 0.13 255)",
  "makhana":    "oklch(43% 0.13 255)",
  "dry-fruits": "oklch(43% 0.13 255)",
};

/* ── Auto-advancing image carousel ── */
function ImageCarousel({ images, alt, accent }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setActive(p => (p + 1) % images.length);
    }, 4000);
    return () => clearInterval(t);
  }, [images.length]);

  const go = useCallback((i) => {
    setDir(i > active ? 1 : -1);
    setActive(i);
  }, [active]);

  const variants = {
    enter: d => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: d => ({ x: d < 0 ? "100%" : "-100%", opacity: 0 }),
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: "oklch(97% 0.005 255)" }}>
      <AnimatePresence custom={dir} mode="popLayout" initial={false}>
        <motion.div
          key={active}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src={images[active]}
            alt={`${alt} — view ${active + 1}`}
            fill
            sizes="50vw"
            style={{ objectFit: "cover" }}
            priority={active === 0}
          />
          {/* Subtle right-edge fade — blends into content panel */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 70%, oklch(97% 0.005 255 / 0.85) 100%)" }} />
        </motion.div>
      </AnimatePresence>

      {/* Dot nav */}
      <div style={{ position: "absolute", bottom: "2rem", left: "2rem", zIndex: 10, display: "flex", gap: "0.5rem" }}>
        {images.map((_, i) => (
          <button key={i} onClick={() => go(i)} aria-label={`Image ${i + 1}`} style={{ width: i === active ? "2rem" : "0.45rem", height: "0.45rem", borderRadius: "9999px", background: i === active ? accent : "oklch(22% 0.07 255 / 0.3)", border: "none", cursor: "pointer", transition: "width 350ms cubic-bezier(0.16,1,0.3,1), background 300ms", padding: 0 }} />
        ))}
      </div>

      {/* Counter top-right */}
      <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", zIndex: 10 }}>
        <span className="label" style={{ color: "oklch(22% 0.07 255 / 0.4)", fontSize: "8px" }}>
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

/* ── Related product tilt card ── */
function RelatedCard({ product }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 280, damping: 28 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 280, damping: 28 });

  const onMove = useCallback(e => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }, [mx, my]);

  const imgs = PRODUCT_IMAGES[product.slug];
  const src = Array.isArray(imgs) ? imgs[0] : imgs;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { mx.set(0.5); my.set(0.5); setHovered(false); }}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", transformPerspective: 800, flex: "0 0 auto", width: "clamp(240px, 24vw, 340px)", cursor: "pointer" }}
    >
      <Link href={`/products/${product.category}/${product.slug}`} style={{ display: "block", textDecoration: "none" }}>
        <div style={{ position: "relative", height: "clamp(260px, 30vw, 380px)", overflow: "hidden" }}>
          <Image src={src} alt={product.name} fill sizes="24vw" style={{ objectFit: "cover", transition: "transform 600ms cubic-bezier(0.16,1,0.3,1)", transform: hovered ? "scale(1.06)" : "scale(1)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, oklch(11% 0.012 58 / 0.9) 0%, transparent 55%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.25rem", transform: "translateZ(16px)" }}>
            <p style={{ fontFamily: "'Boska', Georgia, serif", fontSize: "var(--text-lg)", fontWeight: 700, color: "oklch(22% 0.07 255)", lineHeight: 1.1, marginBottom: "0.2rem" }}>{product.name}</p>
            <p style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: "var(--text-xs)", color: "oklch(22% 0.07 255 / 0.45)" }}>{product.grade}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProductPage({ params }) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryById(product.category);
  const related = getRelatedProducts(product, 3);
  const images = PRODUCT_IMAGES[product.slug] || ["https://images.unsplash.com/photo-1596040033229-a9821ebd058d"];
  const accent = CAT_ACCENT[product.category] || "oklch(72% 0.18 68)";

  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [pack, setPack] = useState(product.packaging[0]);
  const [added, setAdded] = useState(false);

  const specRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        /* Hero text entrance */
        gsap.fromTo(".spec-name-word",
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, ease: "expo.out", stagger: 0.06, delay: 0.2 }
        );
        gsap.fromTo(".spec-hero-meta",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, ease: "expo.out", delay: 0.65, stagger: 0.07 }
        );
        /* Bento cells fade in on scroll */
        if (specRef.current) {
          gsap.fromTo(specRef.current.querySelectorAll(".bento-cell"),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.55, ease: "expo.out", stagger: 0.04,
              scrollTrigger: { trigger: specRef.current, start: "top 80%" } }
          );
        }
      });
    };
    init();
    return () => ctx?.revert();
  }, []);

  function handleAdd() {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  const specEntries = Object.entries(product.specifications).filter(([, v]) => !Array.isArray(v));
  const flavourSpec = product.specifications.flavours;

  return (
    <main style={{ background: "oklch(97% 0.005 255)" }}>

      {/* ══════════════════════════════════════
          SECTION 1: carousel left + details right
          ══════════════════════════════════════ */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "100svh",
        paddingTop: "clamp(64px, 8vw, 80px)",
        background: "oklch(97% 0.005 255)",
      }}>
        {/* LEFT — sticky full-height carousel */}
        <div style={{ position: "sticky", top: "clamp(64px, 8vw, 80px)", height: "calc(100svh - clamp(64px, 8vw, 80px))" }}>
          <ImageCarousel images={images} alt={product.name} accent={accent} />
        </div>

        {/* RIGHT — scrollable product detail */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(2.5rem, 5vw, 6rem) clamp(2rem, 4vw, 5rem)",
          gap: "0",
          overflowY: "auto",
        }}>
          {/* Breadcrumb */}
          <p className="spec-hero-meta label" style={{ color: "oklch(22% 0.07 255 / 0.3)", marginBottom: "2rem", opacity: 0 }}>
            <Link href="/products" style={{ color: "inherit", textDecoration: "none" }}>Products</Link>
            <span style={{ margin: "0 0.6rem" }}>→</span>
            <Link href={`/products/${product.category}`} style={{ color: "inherit", textDecoration: "none" }}>{category?.name}</Link>
            <span style={{ margin: "0 0.6rem" }}>→</span>
            {product.name}
          </p>

          {/* Category + featured badges */}
          <div className="spec-hero-meta" style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap", opacity: 0 }}>
            <span className="label" style={{ padding: "0.25rem 0.75rem", border: `1px solid ${accent}`, color: accent, fontSize: "9px" }}>
              {product.category.replace("-", " ").toUpperCase()}
            </span>
            {product.featured && (
              <span className="label" style={{ padding: "0.25rem 0.75rem", background: `${accent}18`, border: `1px solid ${accent}`, color: accent, fontSize: "9px" }}>
                Featured
              </span>
            )}
          </div>

          {/* Product name — big Boska */}
          <h1 style={{ fontFamily: "'Boska', Georgia, serif", fontSize: "var(--text-3xl)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.88, color: "oklch(22% 0.07 255)", marginBottom: "0.5rem", overflow: "hidden" }}>
            {product.name.split(" ").map((word, i) => (
              <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.2em" }}>
                <span className="spec-name-word" style={{ display: "inline-block" }}>{word}</span>
              </span>
            ))}
          </h1>
          <p className="spec-hero-meta" style={{ fontFamily: "'Boska', Georgia, serif", fontSize: "var(--text-lg)", fontStyle: "italic", color: accent, marginBottom: "0.75rem", opacity: 0 }}>
            {product.grade}
          </p>

          {/* Origin */}
          <div className="spec-hero-meta" style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "2rem", opacity: 0 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent, flexShrink: 0 }} />
            <span className="label" style={{ color: "oklch(22% 0.07 255 / 0.45)", fontSize: "9px", letterSpacing: "0.16em" }}>{product.origin}</span>
          </div>

          {/* Quick spec 2×2 */}
          <div className="spec-hero-meta" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "oklch(100% 0 0 / 0.05)", marginBottom: "2rem", opacity: 0 }}>
            {specEntries.slice(0, 4).map(([key, val]) => (
              <div key={key} style={{ padding: "0.875rem 1rem", background: "oklch(94% 0.006 255)" }}>
                <p className="label" style={{ color: "oklch(22% 0.07 255 / 0.3)", fontSize: "8px", marginBottom: "0.3rem", letterSpacing: "0.14em" }}>
                  {key.replace(/_/g, " ").toUpperCase()}
                </p>
                <p style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: "var(--text-sm)", fontWeight: 700, color: "oklch(22% 0.07 255)" }}>{val}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="spec-hero-meta" style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "2rem", opacity: 0 }}>
            {product.certifications.map(c => (
              <span key={c} className="label" style={{ padding: "0.2rem 0.6rem", border: `1px solid ${accent}40`, color: accent, fontSize: "8px" }}>{c}</span>
            ))}
          </div>

          {/* Packaging selector */}
          <div className="spec-hero-meta" style={{ marginBottom: "1.5rem", opacity: 0 }}>
            <p className="label" style={{ color: "oklch(22% 0.07 255 / 0.3)", fontSize: "9px", marginBottom: "0.6rem", letterSpacing: "0.14em" }}>SELECT PACKAGING</p>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {product.packaging.map(p => (
                <button key={p} onClick={() => setPack(p)} className="label" style={{ padding: "0.4rem 0.875rem", border: `1px solid ${p === pack ? accent : "oklch(22% 0.07 255 / 0.1)"}`, background: p === pack ? `${accent}18` : "transparent", color: p === pack ? accent : "oklch(22% 0.07 255 / 0.45)", cursor: "pointer", fontSize: "9px", transition: "all 200ms", letterSpacing: "0.1em" }}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Qty stepper */}
          <div className="spec-hero-meta" style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.75rem", opacity: 0 }}>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid oklch(22% 0.07 255 / 0.1)", overflow: "hidden" }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: "2.5rem", height: "2.5rem", background: "transparent", border: "none", color: "oklch(22% 0.07 255)", cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}
                onMouseEnter={e => e.currentTarget.style.background = "oklch(22% 0.07 255 / 0.06)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>−</button>
              <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: "var(--text-md)", fontWeight: 700, color: "oklch(22% 0.07 255)", minWidth: "2.5rem", textAlign: "center" }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{ width: "2.5rem", height: "2.5rem", background: "transparent", border: "none", color: "oklch(22% 0.07 255)", cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}
                onMouseEnter={e => e.currentTarget.style.background = "oklch(22% 0.07 255 / 0.06)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>+</button>
            </div>
            <span className="label" style={{ color: "oklch(22% 0.07 255 / 0.35)", fontSize: "9px" }}>MOQ: {product.moq}</span>
          </div>

          {/* CTA row */}
          <div className="spec-hero-meta" style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", opacity: 0 }}>
            <button
              onClick={handleAdd}
              style={{ flex: 1, padding: "0.9rem 1.5rem", background: added ? "oklch(62% 0.17 145)" : accent, border: "none", color: "oklch(22% 0.07 255)", fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: "var(--text-sm)", fontWeight: 800, letterSpacing: "0.1em", cursor: "pointer", transition: "background 300ms" }}
            >
              <AnimatePresence mode="wait">
                {added
                  ? <motion.span key="done" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>ADDED ✓</motion.span>
                  : <motion.span key="add" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>ADD TO ENQUIRY</motion.span>
                }
              </AnimatePresence>
            </button>
            <a
              href={`https://wa.me/919427191459?text=Hello, I'm interested in ${encodeURIComponent(product.name)} — ${product.grade}. Packaging: ${encodeURIComponent(pack)}. Qty: ${qty} × ${product.moq}.`}
              target="_blank" rel="noopener noreferrer"
              style={{ padding: "0.9rem 1.25rem", border: `1px solid ${accent}`, color: accent, fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: "var(--text-sm)", fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem", whiteSpace: "nowrap" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>

          {/* Description */}
          <p className="spec-hero-meta" style={{ fontFamily: "'Boska', Georgia, serif", fontSize: "var(--text-md)", fontStyle: "italic", color: "oklch(22% 0.07 255 / 0.5)", lineHeight: 1.55, borderTop: "1px solid oklch(22% 0.07 255 / 0.06)", paddingTop: "1.5rem", opacity: 0 }}>
            {product.description}
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════
          SECTION 2: 100vh full-width bento grid
          ══════════════════════════════════════ */}
      <div
        ref={specRef}
        style={{
          width: "100%",
          minHeight: "100svh",
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridAutoRows: "minmax(clamp(90px, 12vh, 140px), auto)",
          gap: "2px",
          background: "oklch(22% 0.07 255 / 0.08)",
        }}
      >
        {/* A: Description — col 1-6, row 1-3 */}
        <div className="bento-cell" style={{ gridColumn: "1 / 6", gridRow: "1 / 4", background: "oklch(94% 0.006 255)", padding: "clamp(1.75rem, 3vw, 3.5rem)", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <p className="label" style={{ color: accent, marginBottom: "1rem", letterSpacing: "0.16em" }}>PRODUCT STORY</p>
          <p style={{ fontFamily: "'Boska', Georgia, serif", fontSize: "var(--text-xl)", fontStyle: "italic", fontWeight: 500, color: "oklch(22% 0.07 255)", lineHeight: 1.5, letterSpacing: "-0.01em" }}>
            {product.description}
          </p>
        </div>

        {/* B: MOQ giant — col 6-10, row 1-2 */}
        <div className="bento-cell" style={{ gridColumn: "6 / 10", gridRow: "1 / 3", background: accent, padding: "clamp(1.5rem, 3vw, 3rem)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <p className="label" style={{ color: "oklch(22% 0.07 255 / 0.45)", fontSize: "9px", letterSpacing: "0.16em" }}>MINIMUM ORDER QTY</p>
          <div>
            <p style={{ fontFamily: "'Boska', Georgia, serif", fontSize: "var(--text-4xl)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 0.85, color: "oklch(22% 0.07 255)" }}>{product.moq}</p>
            <p className="label" style={{ color: "oklch(22% 0.07 255 / 0.4)", marginTop: "0.5rem", fontSize: "9px" }}>Bulk / custom on request</p>
          </div>
        </div>

        {/* C: Origin — col 10-13, row 1-2 */}
        <div className="bento-cell" style={{ gridColumn: "10 / 13", gridRow: "1 / 3", background: "oklch(91% 0.007 255)", padding: "clamp(1.25rem, 2.5vw, 2.5rem)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <p className="label" style={{ color: "oklch(22% 0.07 255 / 0.3)", fontSize: "9px", letterSpacing: "0.16em" }}>ORIGIN</p>
          <div>
            <p style={{ fontFamily: "'Boska', Georgia, serif", fontSize: "var(--text-2xl)", fontWeight: 900, letterSpacing: "-0.03em", color: "oklch(22% 0.07 255)", lineHeight: 1.05, marginBottom: "0.4rem" }}>{product.origin}</p>
            <p className="label" style={{ color: "oklch(22% 0.07 255 / 0.3)", fontSize: "9px" }}>India — Direct Source</p>
          </div>
        </div>

        {/* D/E/F: First 3 spec values — col 1-4, 4-7, 7-10, row 4 */}
        {specEntries.slice(0, 3).map(([key, val], i) => {
          const cols = ["1 / 5", "5 / 9", "9 / 13"];
          return (
            <div key={key} className="bento-cell" style={{ gridColumn: cols[i], gridRow: "4 / 5", background: "oklch(94% 0.006 255)", padding: "clamp(1rem, 2vw, 2rem)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <p className="label" style={{ color: "oklch(22% 0.07 255 / 0.3)", fontSize: "8px", letterSpacing: "0.14em" }}>{key.replace(/_/g, " ").toUpperCase()}</p>
              <p style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: "var(--text-xl)", fontWeight: 800, color: "oklch(22% 0.07 255)", letterSpacing: "-0.02em" }}>{val}</p>
            </div>
          );
        })}

        {/* G: Shelf life callout — col 6-10, row 2-4 */}
        <div className="bento-cell" style={{ gridColumn: "6 / 10", gridRow: "2 / 4", background: "oklch(91% 0.007 255)", padding: "clamp(1.25rem, 2.5vw, 2.5rem)", display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.5rem" }}>
          <p className="label" style={{ color: "oklch(22% 0.07 255 / 0.3)", fontSize: "9px", letterSpacing: "0.16em" }}>SHELF LIFE</p>
          <p style={{ fontFamily: "'Boska', Georgia, serif", fontSize: "var(--text-3xl)", fontWeight: 900, color: "oklch(22% 0.07 255)", letterSpacing: "-0.04em", lineHeight: 1 }}>
            {product.specifications.shelf_life || "On Request"}
          </p>
          {product.specifications.hs_code && (
            <p className="label" style={{ color: "oklch(22% 0.07 255 / 0.3)", fontSize: "9px" }}>HS Code: {product.specifications.hs_code}</p>
          )}
        </div>

        {/* H: Remaining specs — col 10-13, row 2-4 */}
        {specEntries.slice(3, 5).map(([key, val], i) => (
          <div key={key} className="bento-cell" style={{ gridColumn: "10 / 13", gridRow: `${2 + i} / ${3 + i}`, background: i % 2 === 0 ? "oklch(22% 0.07 255)" : "oklch(94% 0.006 255)", padding: "clamp(1rem, 1.5vw, 1.5rem)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <p className="label" style={{ color: "oklch(22% 0.07 255 / 0.3)", fontSize: "8px", letterSpacing: "0.14em" }}>{key.replace(/_/g, " ").toUpperCase()}</p>
            <p style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: "var(--text-lg)", fontWeight: 700, color: "oklch(22% 0.07 255)", letterSpacing: "-0.01em" }}>{val}</p>
          </div>
        ))}

        {/* I: Certifications — col 1-7, row 5-6 */}
        <div className="bento-cell" style={{ gridColumn: "1 / 7", gridRow: "5 / 7", background: "oklch(94% 0.006 255)", padding: "clamp(1.5rem, 3vw, 3rem)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <p className="label" style={{ color: "oklch(22% 0.07 255 / 0.3)", fontSize: "9px", letterSpacing: "0.16em" }}>CERTIFICATIONS</p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {product.certifications.map(c => (
              <span key={c} style={{ padding: "0.5rem 1.25rem", border: `1px solid ${accent}`, color: accent, fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: "var(--text-sm)", fontWeight: 700, letterSpacing: "0.1em" }}>{c}</span>
            ))}
          </div>
        </div>

        {/* J: Packaging — col 7-10, row 5-6 */}
        <div className="bento-cell" style={{ gridColumn: "7 / 10", gridRow: "5 / 7", background: "oklch(91% 0.007 255)", padding: "clamp(1.25rem, 2.5vw, 2.5rem)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <p className="label" style={{ color: "oklch(22% 0.07 255 / 0.3)", fontSize: "9px", letterSpacing: "0.16em" }}>PACKAGING OPTIONS</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            {product.packaging.map((p, i) => (
              <div key={p} style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingBottom: "0.45rem", borderBottom: i < product.packaging.length - 1 ? "1px solid oklch(22% 0.07 255 / 0.06)" : "none" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: "var(--text-sm)", color: "oklch(22% 0.07 255)", fontWeight: 600 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* K: CTA cell — col 10-13, row 5-6 */}
        <div className="bento-cell" style={{ gridColumn: "10 / 13", gridRow: "5 / 7", background: "oklch(22% 0.07 255)", padding: "clamp(1.25rem, 2.5vw, 2.5rem)", display: "flex", flexDirection: "column", justifyContent: "space-between", border: `1px solid ${accent}30` }}>
          <p style={{ fontFamily: "'Boska', Georgia, serif", fontSize: "var(--text-xl)", fontWeight: 700, color: "oklch(22% 0.07 255)", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
            Ready to source {product.name}?
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <button
              onClick={handleAdd}
              style={{ display: "block", width: "100%", padding: "0.8rem 1.25rem", background: accent, border: "none", color: "oklch(22% 0.07 255)", fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: "var(--text-xs)", fontWeight: 800, letterSpacing: "0.12em", cursor: "pointer" }}
            >
              {added ? "ADDED ✓" : "ADD TO ENQUIRY"}
            </button>
            <a
              href={`https://wa.me/919427191459?text=Enquiry for ${encodeURIComponent(product.name)} — ${product.grade}`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: "block", padding: "0.8rem 1.25rem", border: "1px solid oklch(22% 0.07 255 / 0.12)", color: "oklch(22% 0.07 255)", fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: "var(--text-xs)", fontWeight: 700, letterSpacing: "0.12em", textDecoration: "none", textAlign: "center" }}
            >
              WHATSAPP
            </a>
          </div>
        </div>

        {/* L: Tags / flavours — col 1-6, row 4-5 — only if space allows */}
        <div className="bento-cell" style={{ gridColumn: "1 / 6", gridRow: "4 / 5", background: "oklch(22% 0.07 255)", padding: "clamp(1rem, 2vw, 2rem)", display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
          <p className="label" style={{ color: "oklch(22% 0.07 255 / 0.25)", fontSize: "8px", letterSpacing: "0.14em", marginRight: "0.25rem" }}>TAGS</p>
          {product.tags.map(t => (
            <span key={t} className="label" style={{ padding: "0.25rem 0.65rem", border: "1px solid oklch(22% 0.07 255 / 0.08)", color: "oklch(22% 0.07 255 / 0.45)", fontSize: "8px" }}>{t}</span>
          ))}
          {flavourSpec && flavourSpec.slice(0, 4).map(f => (
            <span key={f} className="label" style={{ padding: "0.25rem 0.65rem", background: `${accent}12`, border: `1px solid ${accent}35`, color: accent, fontSize: "8px" }}>{f}</span>
          ))}
        </div>
      </div>

      {/* ══ Related products ══ */}
      {related.length > 0 && (
        <div style={{ paddingBlock: "clamp(4rem, 7vw, 8rem)", background: "oklch(94% 0.006 255)" }}>
          <div style={{ paddingInline: "clamp(1.5rem, 4vw, 6rem)", marginBottom: "clamp(2rem, 4vw, 4rem)", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <p className="label" style={{ color: accent, marginBottom: "0.5rem" }}>You may also need</p>
              <h2 style={{ fontFamily: "'Boska', Georgia, serif", fontSize: "var(--text-2xl)", fontWeight: 900, letterSpacing: "-0.04em", color: "oklch(22% 0.07 255)" }}>Related Products</h2>
            </div>
            <Link href={`/products/${product.category}`} className="label" style={{ color: "oklch(22% 0.07 255 / 0.4)", textDecoration: "none" }}>View all →</Link>
          </div>
          <div style={{ paddingInline: "clamp(1.5rem, 4vw, 6rem)", display: "flex", gap: "2px", overflow: "auto" }}>
            {related.map(r => <RelatedCard key={r.id} product={r} />)}
          </div>
        </div>
      )}
    </main>
  );
}
