"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useQuoteCart } from "@/context/QuoteCartContext";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/packaging", label: "Packaging" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
const productLinks = [
  { href: "/products/spices", label: "Spices", note: "Whole & ground" },
  { href: "/products/makhana", label: "Makhana", note: "Bulk & private label" },
  {
    href: "/products/dry-fruits",
    label: "Dry Fruits",
    note: "Graded export lines",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { totalItems } = useQuoteCart();
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="GiantzFly home">
          <svg
            width="34"
            height="34"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <rect width="32" height="32" rx="7" fill="currentColor" />
            <path
              d="M8 22L14 10L20 22M10.5 18H17.5"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 22V13M21 13C23.2 13 24.5 14.2 24.5 15.8C24.5 17.4 23.2 18.5 21 18.5"
              stroke="#7BB8E0"
              strokeWidth="2.2"
              strokeLinecap="round"
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
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className={styles.categoryRail} aria-label="Product categories">
        <div className={styles.categoryRailInner}>
          <Link href="/packaging" className={styles.packagingLabel}>
            Packaging services
          </Link>
          {productLinks.map((item, index) => (
            <Link
              href={item.href}
              key={item.href}
              className={styles.categoryLink}
            >
              <span>0{index + 1}</span>
              <strong>{item.label}</strong>
              <small>{item.note}</small>
            </Link>
          ))}
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
            {productLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.mobileLink}
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
          </div>
        </div>
      )}
    </header>
  );
}
