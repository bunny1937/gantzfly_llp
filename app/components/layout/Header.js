"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../../lib/cart";

const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { items } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const cartCount = items.length;

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          transition: "background 200ms cubic-bezier(0.4,0,0.2,1), box-shadow 200ms",
          background: scrolled
            ? "oklch(99% 0.002 255 / 0.96)"
            : "oklch(97% 0.005 255 / 0.92)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: scrolled
            ? "1px solid oklch(22% 0.07 255 / 0.1)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 24px oklch(22% 0.07 255 / 0.06)" : "none",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "clamp(56px, 4rem + 1vw, 72px)" }}>

          {/* Logo + wordmark */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
            <div style={{ position: "relative", width: "clamp(36px, 3vw, 44px)", height: "clamp(36px, 3vw, 44px)", flexShrink: 0 }}>
              <Image src="/logo.jpeg" alt="GiantzFly Exim LLP" fill sizes="44px" style={{ objectFit: "contain" }} priority />
            </div>
            <div style={{ lineHeight: 1.1 }}>
              <span style={{ display: "block", fontFamily: "'Boska', Georgia, serif", fontSize: "clamp(0.95rem, 0.85rem + 0.5vw, 1.2rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "oklch(22% 0.07 255)" }}>
                GIANTZFLY
              </span>
              <span style={{ display: "block", fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: "var(--text-xs)", fontWeight: 600, letterSpacing: "0.18em", color: "oklch(43% 0.13 255)", lineHeight: 1 }}>
                EXIM LLP
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }} className="desktop-nav">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: "var(--text-sm)", fontWeight: 600, letterSpacing: "0.06em", color: "oklch(22% 0.07 255)", opacity: 0.65, transition: "opacity 200ms, color 200ms" }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.color = "oklch(43% 0.13 255)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "0.65"; e.currentTarget.style.color = "oklch(22% 0.07 255)"; }}
              >
                {label}
              </Link>
            ))}

            <Link
              href="/cart"
              aria-label={`Quote Cart — ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1.25rem", border: "1px solid oklch(43% 0.13 255)", color: "oklch(43% 0.13 255)", fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: "var(--text-xs)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", transition: "background 200ms, color 200ms", position: "relative", textDecoration: "none" }}
              onMouseEnter={e => { e.currentTarget.style.background = "oklch(43% 0.13 255)"; e.currentTarget.style.color = "oklch(97% 0.005 255)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "oklch(43% 0.13 255)"; }}
            >
              Quote Cart
              {cartCount > 0 && (
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, background: "oklch(43% 0.13 255)", color: "oklch(97% 0.005 255)", borderRadius: "50%", fontSize: 10, fontWeight: 800, lineHeight: 1 }}>
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{ display: "none", flexDirection: "column", gap: "5px", padding: "8px", minWidth: 44, minHeight: 44, alignItems: "center", justifyContent: "center" }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{ display: "block", width: 22, height: 1.5, background: "oklch(22% 0.07 255)", transition: "transform 300ms, opacity 300ms", transform: menuOpen && i === 0 ? "translateY(6.5px) rotate(45deg)" : menuOpen && i === 2 ? "translateY(-6.5px) rotate(-45deg)" : "none", opacity: menuOpen && i === 1 ? 0 : 1 }} />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile overlay — light, navy text */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99, background: "oklch(97% 0.005 255)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(2rem, 5vw, 4rem)" }}>
          <nav style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[...NAV_LINKS, { href: "/cart", label: "Quote Cart" }].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{ fontFamily: "'Boska', Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 4rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "oklch(22% 0.07 255)", lineHeight: 1, transition: "color 200ms", textDecoration: "none" }}
                onMouseEnter={e => e.currentTarget.style.color = "oklch(43% 0.13 255)"}
                onMouseLeave={e => e.currentTarget.style.color = "oklch(22% 0.07 255)"}
              >
                {label}
              </Link>
            ))}
          </nav>
          <p className="label" style={{ marginTop: "4rem", color: "oklch(50% 0.07 255)" }}>
            India → USA · EU · Africa
          </p>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
