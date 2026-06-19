"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback, useEffect, useRef } from "react";
import { useQuoteCart } from "@/context/QuoteCartContext";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithCredential, onAuthStateChanged, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import styles from "./Navbar.module.css";

const ADMIN_EMAIL = "giantzflyexim@gmail.com";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (cfg: object) => void;
          prompt: () => void;
          cancel: () => void;
        };
      };
    };
  }
}

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { totalItems } = useQuoteCart();
  const [isAdmin, setIsAdmin] = useState(false);
  const logoClicksRef = useRef<number[]>([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAdmin(user?.email === ADMIN_EMAIL);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) return;

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.google?.accounts.id.initialize({
        client_id: clientId,
        callback: async (response: { credential: string }) => {
          try {
            const credential = GoogleAuthProvider.credential(response.credential);
            await signInWithCredential(auth, credential);
          } catch {
            // wrong account or cancelled — silent
          }
        },
        auto_select: true,
        cancel_on_tap_outside: true,
        itp_support: true,
        // no .prompt() — silent only, no popup for regular users
      });
    };
    document.head.appendChild(script);

    return () => {
      window.google?.accounts.id.cancel();
      document.head.removeChild(script);
    };
  }, []);

  const handleLogoClick = useCallback(async () => {
    if (isAdmin) return;
    const now = Date.now();
    logoClicksRef.current = [...logoClicksRef.current, now].filter(
      (t) => now - t < 2000,
    );
    if (logoClicksRef.current.length >= 5) {
      logoClicksRef.current = [];
      try {
        const { signInWithPopup } = await import("firebase/auth");
        await signInWithPopup(auth, googleProvider);
      } catch {
        // cancelled — silent
      }
    }
  }, [isAdmin]);

  const handleAdminSignOut = useCallback(async () => {
    await signOut(auth);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="GiantzFly Exim LLP home"
          onClick={handleLogoClick}
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <rect width="32" height="32" rx="7" fill="currentColor" />
            <path
              d="M8 22L14 10L20 22"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.5 18H17.5"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M21 22V13"
              stroke="#7BB8E0"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M21 13C23.2 13 24.5 14.2 24.5 15.8C24.5 17.4 23.2 18.5 21 18.5"
              stroke="#7BB8E0"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className={styles.logoText}>
            <span className={styles.logoMain}>GiantzFly</span>
            <span className={styles.logoSub}>EXIM LLP</span>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.link} ${pathname.startsWith(item.href) ? styles.active : ""}`}
            >
              {item.label}
            </Link>
          ))}
          {isAdmin && (
            <>
              <Link href="/admin/reviews" className={`${styles.link} ${styles.adminLink}`}>
                Reviews
              </Link>
              <Link href="/studio" className={`${styles.link} ${styles.adminLink}`}>
                Studio
              </Link>
              <button className={styles.adminSignOut} onClick={handleAdminSignOut} type="button">
                Sign out
              </button>
            </>
          )}
        </nav>

        <div className={styles.actions}>
          <Link href="/quote-cart" className={styles.quoteBtn}>
            Quote Cart
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </Link>

          <button
            className={styles.menuToggle}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileInner}>
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.mobileLink} ${pathname.startsWith(item.href) ? styles.activeMobile : ""}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/quote-cart"
              className={styles.mobileCTA}
              onClick={() => setOpen(false)}
            >
              Quote Cart {totalItems > 0 ? `(${totalItems})` : ""}
            </Link>
            {isAdmin && (
              <>
                <Link href="/admin/reviews" className={styles.mobileLink} onClick={() => setOpen(false)}>
                  Reviews (Admin)
                </Link>
                <Link href="/studio" className={styles.mobileLink} onClick={() => setOpen(false)}>
                  Sanity Studio
                </Link>
                <button className={`${styles.mobileLink} ${styles.adminSignOut}`} onClick={handleAdminSignOut} type="button">
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
