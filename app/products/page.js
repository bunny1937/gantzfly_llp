"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CATEGORIES,
  PRODUCTS,
  getProductsByCategory,
} from "../../lib/products";

gsap.registerPlugin(ScrollTrigger);

const PRODUCT_IMAGES = {
  "turmeric-finger-premium":
    "https://images.unsplash.com/photo-1615485500704-8e990f9900f7",
  "cumin-seeds-bold":
    "https://images.unsplash.com/photo-1599599810694-b5b37304c041",
  "black-pepper-malabar":
    "https://images.unsplash.com/photo-1532336414038-cf19250c5757",
  "coriander-seeds-eagle":
    "https://images.unsplash.com/photo-1601050690597-df0568f70950",
  "red-chilli-s4":
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
  "cardamom-green-8mm":
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
  "makhana-grade-a-large":
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
  "makhana-grade-b":
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
  "makhana-roasted-salted":
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
  "makhana-flavoured":
    "https://images.unsplash.com/photo-1488477181946-6428a0291777",
  "cashew-w320": "https://images.unsplash.com/photo-1599599810694-b5b37304c041",
  "almonds-california-style":
    "https://images.unsplash.com/photo-1508747703725-719777637510",
  "raisins-golden":
    "https://images.unsplash.com/photo-1596560548464-f010b45d76da",
  "walnuts-light-halves":
    "https://images.unsplash.com/photo-1563412580-8f01533e1e3f",
  "pistachios-fandoghi":
    "https://images.unsplash.com/photo-1606923829579-0cb981a83e2a",
};

const CAT_COLORS = {
  spices: "oklch(43% 0.13 255)",
  makhana: "oklch(43% 0.13 255)",
  "dry-fruits": "oklch(43% 0.13 255)",
};

function ProductCard({ product, priority = false }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotX = useSpring(useTransform(my, [0, 1], [9, -9]), {
    stiffness: 300,
    damping: 30,
  });
  const rotY = useSpring(useTransform(mx, [0, 1], [-9, 9]), {
    stiffness: 300,
    damping: 30,
  });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const onMove = useCallback(
    (e) => {
      const r = cardRef.current?.getBoundingClientRect();
      if (!r) return;
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      mx.set(nx);
      my.set(ny);
      setMousePos({ x: nx * 100, y: ny * 100 });
    },
    [mx, my],
  );

  const onLeave = useCallback(() => {
    mx.set(0.5);
    my.set(0.5);
    setHovered(false);
  }, [mx, my]);

  const catColor = CAT_COLORS[product.category];
  const imgSrc = PRODUCT_IMAGES[product.slug];
  const specEntries = Object.entries(product.specifications)
    .filter(([, v]) => !Array.isArray(v) && v !== undefined)
    .slice(0, 3);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: "preserve-3d",
        transformPerspective: 900,
        position: "relative",
        cursor: "pointer",
        height: "100%",
      }}
    >
      <Link
        href={`/products/${product.category}/${product.slug}`}
        style={{ display: "block", height: "100%", textDecoration: "none" }}
      >
        <div
          style={{
            position: "relative",
            height: "100%",
            overflow: "hidden",
            background: "oklch(97% 0.005 255)",
          }}
        >
          <div
            style={{
              position: "relative",
              height: "clamp(180px, 22vw, 300px)",
              overflow: "hidden",
            }}
          >
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{
                objectFit: "cover",
                transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)",
                transform: hovered ? "scale(1.08)" : "scale(1)",
              }}
              priority={priority}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, oklch(11% 0.012 58 / 0.7) 0%, transparent 50%)",
              }}
            />
            {hovered && (
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  pointerEvents: "none",
                  mixBlendMode: "screen",
                  background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, oklch(72% 0.18 68 / 0.18) 0%, transparent 60%)`,
                }}
              />
            )}
            <div
              style={{
                position: "absolute",
                top: "0.75rem",
                left: "0.75rem",
                zIndex: 3,
                display: "flex",
                gap: "0.4rem",
              }}
            >
              {product.featured && (
                <span
                  className="label"
                  style={{
                    padding: "0.2rem 0.6rem",
                    background: "oklch(72% 0.18 68 / 0.15)",
                    border: `1px solid ${catColor}`,
                    color: catColor,
                    fontSize: "8px",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  Featured
                </span>
              )}
              <span
                className="label"
                style={{
                  padding: "0.2rem 0.6rem",
                  background: "oklch(97% 0.005 255 / 0.85)",
                  border: "1px solid oklch(22% 0.07 255 / 0.08)",
                  color: "oklch(22% 0.07 255 / 0.6)",
                  fontSize: "8px",
                  backdropFilter: "blur(8px)",
                }}
              >
                {product.tags[0]}
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "0.75rem",
                left: "0.875rem",
                zIndex: 3,
              }}
            >
              <span
                className="label"
                style={{ color: "oklch(97% 0.005 255 / 0.7)", fontSize: "8px" }}
              >
                {product.origin}
              </span>
            </div>
          </div>

          <div
            style={{
              padding: "1.25rem 1.25rem 1.5rem",
              transform: "translateZ(20px)",
            }}
          >
            <p
              style={{
                fontFamily: "'Boska', Georgia, serif",
                fontSize: "var(--text-xl)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "oklch(22% 0.07 255)",
                lineHeight: 1.1,
                marginBottom: "0.2rem",
              }}
            >
              {product.name}
            </p>
            <p
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: "var(--text-xs)",
                color: "oklch(22% 0.07 255 / 0.4)",
                marginBottom: "1rem",
              }}
            >
              {product.grade}
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.45rem",
                marginBottom: "1.25rem",
              }}
            >
              {specEntries.map(([key, val]) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid oklch(22% 0.07 255 / 0.06)",
                    paddingBottom: "0.4rem",
                  }}
                >
                  <span
                    className="label"
                    style={{
                      color: "var(--navy)",
                      fontSize: "8px",
                      letterSpacing: "0.14em",
                    }}
                  >
                    {key.replace(/_/g, " ").toUpperCase()}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cabinet Grotesk', sans-serif",
                      fontSize: "var(--text-sm)",
                      fontWeight: 600,
                      color: "oklch(22% 0.07 255)",
                    }}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  className="label"
                  style={{
                    color: catColor,
                    fontSize: "8px",
                    marginBottom: "0.15rem",
                  }}
                >
                  MIN ORDER
                </p>
                <p
                  style={{
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    fontSize: "var(--text-md)",
                    fontWeight: 700,
                    color: "oklch(22% 0.07 255)",
                  }}
                >
                  {product.moq}
                </p>
              </div>
              <motion.span
                animate={{ x: hovered ? 4 : 0 }}
                transition={{ duration: 0.2 }}
                className="label"
                style={{
                  color: catColor,
                  fontSize: "9px",
                  borderBottom: `1px solid ${catColor}`,
                  paddingBottom: "1px",
                }}
              >
                View Details →
              </motion.span>
            </div>
          </div>

          <AnimatePresence>
            {hovered && (
              <motion.div
                key="certs"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "0.6rem 1.25rem",
                  background: "oklch(11% 0.012 58 / 0.88)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderTop: `1px solid ${catColor}`,
                  display: "flex",
                  gap: "0.4rem",
                  flexWrap: "wrap",
                }}
              >
                {product.certifications.slice(0, 4).map((c) => (
                  <span
                    key={c}
                    className="label"
                    style={{
                      fontSize: "8px",
                      color: "oklch(72% 0.10 240)",
                      padding: "0.15rem 0.5rem",
                      border: "1px solid oklch(72% 0.10 240 / 0.4)",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              pointerEvents: "none",
              background: `linear-gradient(135deg, oklch(100% 0 0 / ${hovered ? 0.06 : 0}) 0%, transparent 40%)`,
              transition: "opacity 300ms",
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

function CategorySection({ category, catIndex }) {
  const products = getProductsByCategory(category.id);
  const headRef = useRef(null);
  const color = CAT_COLORS[category.id];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx;
    if (headRef.current) {
      ctx = gsap.context(() => {
        gsap.fromTo(
          headRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.1,
            ease: "expo.inOut",
            scrollTrigger: {
              trigger: headRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
        gsap.fromTo(
          `.cat-meta-${category.id}`,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "expo.out",
            stagger: 0.07,
            scrollTrigger: { trigger: headRef.current, start: "top 85%" },
          },
        );
      });
    }
    return () => ctx?.revert();
  }, [category.id]);

  return (
    <div
      style={{
        paddingBlock: "clamp(4rem, 7vw, 8rem)",
        borderTop: "1px solid oklch(22% 0.07 255 / 0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "clamp(2rem, 4vw, 4rem)",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            className={`cat-meta-${category.id} label`}
            style={{
              color,
              marginBottom: "0.75rem",
              letterSpacing: "0.2em",
              opacity: 0,
            }}
          >
            {String(catIndex + 1).padStart(2, "0")} — {category.tagline}
          </p>
          <h2
            ref={headRef}
            style={{
              fontFamily: "'Boska', Georgia, serif",
              fontSize: "var(--text-display)",
              fontWeight: 900,
              letterSpacing: "-0.05em",
              lineHeight: 0.85,
              color: "oklch(22% 0.07 255)",
              clipPath: "inset(0 100% 0 0)",
            }}
          >
            {category.name.toUpperCase()}
          </h2>
        </div>
        <div className={`cat-meta-${category.id}`} style={{ opacity: 0 }}>
          <Link
            href={`/products/${category.id}`}
            className="btn-ghost"
            style={{ fontSize: "var(--text-xs)" }}
          >
            All {products.length} Products →
          </Link>
        </div>
      </div>

      <div
        data-theme="light"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(clamp(240px, 28vw, 360px), 1fr))",
          gap: "2px",
          background: "oklch(22% 0.07 255 / 0.06)",
        }}
      >
        {products.map((p, i) => (
          <div key={p.id} style={{ minHeight: "clamp(380px, 48vw, 540px)" }}>
            <ProductCard product={p} priority={catIndex === 0 && i < 3} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const heroRef = useRef(null);
  // const [bgMode, setBgMode] = useState("wash");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx;
    if (heroRef.current) {
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".archive-word",
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.08,
            delay: 0.15,
          },
        );
        gsap.fromTo(
          ".archive-sub",
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "expo.out",
            delay: 0.55,
            stagger: 0.06,
          },
        );
      }, heroRef);
    }
    return () => ctx?.revert();
  }, []);

  return (
    <main>
      <div className="container">
        <div
          ref={heroRef}
          style={{
            position: "relative",
            isolation: "isolate",
            paddingTop: "clamp(4rem, 16vw, 14rem)",
            borderBottom: "1px solid oklch(22% 0.07 255 / 0.08)",
            minHeight: "calc(100vh - 8rem)",
            display: "grid",
            gridTemplateColumns:
              typeof window !== "undefined" && window.innerWidth < 980
                ? "1fr"
                : "minmax(0, 1.35fr) minmax(280px, 0.65fr)",
            columnGap: "clamp(2rem, 6vw, 6rem)",
            rowGap: "2rem",
            alignItems: "end",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              overflow: "hidden",
              zIndex: 0,
            }}
          >
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                right: "-2%",
                top: "6%",
                width: "clamp(18rem, 28vw, 26rem)",
                aspectRatio: "4 / 5",
                borderRadius: "2rem",
                overflow: "hidden",
                boxShadow: "0 30px 90px rgba(15,35,69,0.18)",
                rotate: "-8deg",
                opacity: 0.98,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1400&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </motion.div>

            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                right: "19%",
                bottom: "8%",
                width: "clamp(14rem, 21vw, 19rem)",
                aspectRatio: "1 / 1.12",
                borderRadius: "1.6rem",
                overflow: "hidden",
                boxShadow: "0 22px 70px rgba(15,35,69,0.14)",
                rotate: "6deg",
                opacity: 0.96,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </motion.div>

            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                right: "7%",
                bottom: "1%",
                width: "clamp(12rem, 18vw, 16rem)",
                aspectRatio: "1 / 1.24",
                borderRadius: "1.35rem",
                overflow: "hidden",
                boxShadow: "0 18px 54px rgba(15,35,69,0.12)",
                rotate: "-5deg",
                opacity: 0.9,
                display:
                  typeof window !== "undefined" && window.innerWidth < 980
                    ? "none"
                    : "block",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=1200&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </motion.div>

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(247,249,252,0.1) 0%, rgba(247,249,252,0.95) 34%, rgba(247,249,252,0.22) 58%, rgba(247,249,252,0.28) 78%, rgba(247,249,252,0.01) 100%)",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "transparent",
              }}
            />
          </div>

          <div style={{ minWidth: 0, position: "relative", zIndex: 1 }}>
            <p
              className="archive-sub label"
              style={{
                color: "oklch(43% 0.13 255)",
                marginBottom: "1.5rem",
                letterSpacing: "0.2em",
                opacity: 0,
              }}
            >
              Export Catalog — {PRODUCTS.length} Products · {CATEGORIES.length}{" "}
              Categories
            </p>

            <h1
              style={{
                fontFamily: "'Boska', Georgia, serif",
                fontSize: "clamp(4.5rem, 8vw, 8rem)",
                fontWeight: 900,
                letterSpacing: "-0.055em",
                lineHeight: 0.84,
                color: "oklch(22% 0.07 255)",
                maxWidth: "11ch",
              }}
            >
              {["OUR", "PRODUCTS"].map((word, i) => (
                <span key={i} style={{ display: "block", overflow: "hidden" }}>
                  <span className="archive-word" style={{ display: "block" }}>
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <div
              className="archive-sub"
              style={{
                display: "grid",
                gridTemplateColumns:
                  typeof window !== "undefined" && window.innerWidth < 768
                    ? "repeat(2, minmax(0, 1fr))"
                    : "repeat(4, minmax(0, 1fr))",
                gap: "clamp(1rem, 2vw, 2.5rem)",
                marginTop: "3rem",
                maxWidth: "56rem",
                opacity: 0,
              }}
            >
              {[
                ["3", "Categories"],
                [String(PRODUCTS.length), "Products"],
                ["15+", "Years Export"],
                ["3", "Continents"],
              ].map(([num, label]) => (
                <div key={label}>
                  <p
                    style={{
                      fontFamily: "'Boska', Georgia, serif",
                      fontSize: "var(--text-3xl)",
                      fontWeight: 900,
                      letterSpacing: "-0.04em",
                      color: "oklch(22% 0.07 255)",
                      lineHeight: 1,
                    }}
                  >
                    {num}
                  </p>
                  <p
                    className="label"
                    style={{
                      color: "oklch(50% 0.07 255)",
                      marginTop: "0.4rem",
                    }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {CATEGORIES.map((cat, i) => (
          <CategorySection key={cat.id} category={cat} catIndex={i} />
        ))}

        <div
          style={{
            paddingBlock: "clamp(4rem, 8vw, 10rem)",
            borderTop: "1px solid oklch(22% 0.07 255 / 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <div>
            <p
              className="label"
              style={{ color: "oklch(43% 0.13 255)", marginBottom: "0.75rem" }}
            >
              Ready to source?
            </p>
            <p
              style={{
                fontFamily: "'Boska', Georgia, serif",
                fontSize: "var(--text-2xl)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "oklch(22% 0.07 255)",
                lineHeight: 1.1,
              }}
            >
              Build your enquiry list.
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link href="/cart" className="btn-primary">
              Build Enquiry List
            </Link>
            <a
              href="https://wa.me/919427191459"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
