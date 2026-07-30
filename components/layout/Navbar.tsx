"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useQuoteCart } from "@/context/QuoteCartContext";
import { navItems } from "./nav-data";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const { totalItems } = useQuoteCart();
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
    setMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setOpen(false);
      }
    }
    function onClick(event: MouseEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  function isActive(href: string) {
    if (href === "/") return pathname === "/" || pathname.startsWith("/about");
    return pathname.startsWith(href);
  }

  function hoverOpen(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  }

  function hoverClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner} ref={navRef}>
        <Link href="/" className={styles.logo} aria-label="GiantzFly home">
          <img
            src="/assets/logo.jpg"
            alt="GiantzFly Exim LLP"
            width={38}
            height={38}
            className={styles.logoMark}
          />
          <span className={styles.logoText}>
            <span className={styles.logoMain}>GiantzFly</span>
            <span className={styles.logoSub}>EXIM LLP</span>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const expanded = openMenu === item.label;
            if (!item.children) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.link} ${active ? styles.active : ""}`}
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <div
                key={item.href}
                className={styles.navItem}
                onMouseEnter={() => hoverOpen(item.label)}
                onMouseLeave={hoverClose}
              >
                <Link
                  href={item.href}
                  className={`${styles.link} ${styles.linkWithMenu} ${
                    active ? styles.active : ""
                  }`}
                  aria-expanded={expanded}
                  aria-haspopup="true"
                  onFocus={() => hoverOpen(item.label)}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={`${styles.chev} ${expanded ? styles.chevOpen : ""}`}
                    aria-hidden="true"
                  />
                </Link>

                <div
                  className={`${styles.dropdown} ${expanded ? styles.dropdownOpen : ""}`}
                  role="menu"
                  aria-label={item.label}
                >
                  <div className={styles.dropdownGrid}>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={styles.dropdownLink}
                        role="menuitem"
                      >
                        <strong>{child.label}</strong>
                        <small>{child.note}</small>
                      </Link>
                    ))}
                  </div>
                  <Link href={item.href} className={styles.dropdownAll}>
                    View {item.label.toLowerCase()} overview
                  </Link>
                </div>
              </div>
            );
          })}
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

      {open && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileInner}>
            {navItems.map((item) =>
              item.children ? (
                <div key={item.href} className={styles.mobileGroup}>
                  <button
                    type="button"
                    className={styles.mobileGroupBtn}
                    aria-expanded={mobileSection === item.label}
                    onClick={() =>
                      setMobileSection((current) =>
                        current === item.label ? null : item.label,
                      )
                    }
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`${styles.chev} ${
                        mobileSection === item.label ? styles.chevOpen : ""
                      }`}
                    />
                  </button>
                  {mobileSection === item.label && (
                    <div className={styles.mobileSublist}>
                      <Link href={item.href} className={styles.mobileSublink}>
                        {item.label} overview
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={styles.mobileSublink}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.mobileLink} ${
                    isActive(item.href) ? styles.activeMobile : ""
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link href="/quote-cart" className={styles.mobileCTA}>
              Quote Cart {totalItems > 0 ? `(${totalItems})` : ""}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
