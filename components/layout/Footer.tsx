import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <div className={styles.brand}>GiantzFly Exim LLP</div>
            <p className={styles.tagline}>
              From Indian Origins to Global Markets.
            </p>
            <p className={styles.subline}>
              Farm-direct. Lab-certified. Export-ready for your shelf.
            </p>
          </div>

          <div className={styles.links}>
            <div>
              <h4>Navigate</h4>
              <Link href="/products">Products</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/quote-cart">Quote Cart</Link>
            </div>

            <div>
              <h4>Categories</h4>
              <Link href="/products/spices">Spices</Link>
              <Link href="/products/makhana">Makhana</Link>
              <Link href="/products/dry-fruits">Dry Fruits</Link>
            </div>

            <div>
              <h4>Trade</h4>
              <span>Available on request</span>
              <span>Incoterms: EXW / FOB / CIF</span>
              <span>FSSAI · APEDA · Spices Board</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2026 GiantzFly Exim LLP</span>
          <span>
            Built for international buyers, distributors, and sourcing teams.
          </span>
        </div>
      </div>
    </footer>
  );
}
