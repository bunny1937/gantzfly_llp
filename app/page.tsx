import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { categories, featuredProducts } from "@/data/products";
import Newsletter from "@/components/sections/Newsletter";
import Reviews from "@/components/sections/Reviews";
import styles from "./home.module.css";
import { AutoCollapseMenu } from "sanity";

const certifications = [
  {
    name: "FSSAI",
    full: "Food Safety and Standards Authority of India",
    description:
      "Mandatory food safety certification for all Indian food processing and export operations.",
    file: "/assets/certificates/cert1.jpg",
  },
  {
    name: "APEDA",
    full: "Agricultural & Processed Food Products Export Development Authority",
    description:
      "Core export registration required for agri-commodity shipments from India to international markets.",
    file: "/assets/certificates/cert1.jpg",
  },
  {
    name: "Spices Board India",
    full: "Spices Board Export Certificate",
    description:
      "Mandatory for all spice export consignments. Recognised by importers in USA, UK, EU, and Gulf markets.",
    file: "/assets/certificates/cert2.jpg",
  },
  {
    name: "ISO 22000",
    full: "Food Safety Management System",
    description:
      "Internationally recognised standard covering hygiene, traceability, and food safety processes.",
    file: "/assets/certificates/cert2.jpg",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="page-hero page-hero--image">
        <div className="page-hero__media" aria-hidden="true">
          <div className="page-hero__bg" />
          <div className="page-hero__overlay" />
        </div>

        <div className="container page-hero__shell">
          <div className="page-hero__content">
            <span className="eyebrow page-hero__eyebrow">
              B2B Export Catalog · India
            </span>

            <h1 className="page-hero__title">
              From Indian Origins
              <br />
              to Global Markets.
            </h1>

            <p className="page-hero__text">
              Farm-direct. Lab-certified. Export-ready for your shelf. We supply
              Indian spices, makhana, and dry fruits to importers, distributors,
              supermarket buyers, and sourcing teams.
            </p>

            <div className="hero-actions page-hero__actions">
              <Link href="/products" className="btn btn-primary">
                Explore Products
              </Link>
              <Link href="/quote-cart" className="btn btn-secondary">
                Start Quote Request
              </Link>
            </div>

            <div className={`chip-row page-hero__chips ${styles.heroChips}`}>
              <span className="chip">FSSAI Certified</span>
              <span className="chip">APEDA Registered</span>
              <span className="chip">Private Label Options</span>
              <span className="chip">EXW / FOB / CIF</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Why buyers shortlist us</span>
            <h2 className="section-title">
              Built for importers, not retail shoppers.
            </h2>
            <p className="section-copy">
              The site is structured around trade clarity: grade, origin, MOQ,
              packaging, certifications, and direct enquiry instead of checkout
              noise.
            </p>
          </div>
          <div className="feature-grid">
            <div className="panel">
              <span className="feature-icon" aria-hidden="true">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2c2.5 2.7 4 6.3 4 10s-1.5 7.3-4 10c-2.5-2.7-4-6.3-4-10s1.5-7.3 4-10Z" />
                </svg>
              </span>
              <div className="kicker">Origin-Led Supply</div>
              <h3 className={styles.featureTitle}>
                Sourced from benchmark regions
              </h3>
              <p className={styles.featureText}>
                Erode turmeric, Unjha cumin, Wayanad pepper, Bihar makhana, and
                J&K walnuts.
              </p>
            </div>
            <div className="panel">
              <span className="feature-icon" aria-hidden="true">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 4h6a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
                  <path d="M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" />
                  <path d="m9 14 2 2 4-4" />
                </svg>
              </span>
              <div className="kicker">Operational Clarity</div>
              <h3 className={styles.featureTitle}>
                Export-first trade details
              </h3>
              <p className={styles.featureText}>
                MOQ, certifications, packaging, lead-time style language, and
                structured quote flow.
              </p>
            </div>
            <div className="panel">
              <span className="feature-icon" aria-hidden="true">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
                </svg>
              </span>
              <div className="kicker">Shelf-Ready Supply</div>
              <h3 className={styles.featureTitle}>Bulk and private label</h3>
              <p className={styles.featureText}>
                Suitable for distributors, supermarket buyers, and health-snack
                or grocery brands.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="stats-grid">
            <div className="panel metric-card">
              <div className="metric-number">3</div>
              <div className="metric-label">Core export categories</div>
            </div>
            <div className="panel metric-card">
              <div className="metric-number">15+</div>
              <div className="metric-label">Export-ready SKUs</div>
            </div>
            <div className="panel metric-card">
              <div className="metric-number">7</div>
              <div className="metric-label">Target buyer markets</div>
            </div>
            <div className="panel metric-card">
              <div className="metric-number">4</div>
              <div className="metric-label">Trust signals above the fold</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Compliance & Certifications</span>
            <h2 className="section-title">
              Every shipment is backed by documentation.
            </h2>
            <p className="section-copy">
              GiantzFly holds and maintains all certifications required for
              export-grade supply to international buyers across food retail,
              distribution, and import programs.
            </p>
          </div>
          <div className={styles.certGrid}>
            {certifications.map((cert) => (
              <article key={cert.name} className={`card ${styles.certCard}`}>
                <div className={styles.certImage}>
                  <Image
                    src={cert.file}
                    alt={`${cert.name} certificate`}
                    fill
                    sizes="404px"
                    className={styles.imgContain}
                  />
                </div>
                <div>
                  <p className="eyebrow">{cert.name}</p>
                  <h3 className={styles.certTitle}>{cert.full}</h3>
                  <p className={`text-desc ${styles.certDesc}`}>
                    {cert.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATALOG ── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Catalog</span>
            <h2 className="section-title">Three focused categories.</h2>
          </div>
          <div className="grid-3">
            {categories.map((category) => (
              <article key={category.slug} className="panel">
                <div className="kicker">{category.name}</div>
                <h3 className={styles.catalogTitle}>{category.name}</h3>
                <p className={styles.catalogText}>{category.description}</p>
                <Link
                  href={`/products/${category.slug}`}
                  className={`btn btn-secondary ${styles.catalogLink}`}
                >
                  View {category.name}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Featured products</span>
            <h2 className="section-title">Shortlist-ready export lines.</h2>
            <p className="section-copy">
              Clear catalog presentation for sourcing teams comparing origin,
              grade, MOQ, and pack formats.
            </p>
          </div>
          <div className="product-grid">
            {featuredProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--wave">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Inside our supply</span>
            <h2 className="section-title">
              From origin fields to{" "}
              <span className="gradient-text">export-ready</span> pallets.
            </h2>
            <p className="section-copy">
              A look at the produce, processing, and dispatch behind every
              GiantzFly consignment.
            </p>
          </div>
          <div className="gallery">
            <figure className="gallery-item wide tall">
              <img
                src="/assets/images/spices.webp"
                alt="Assorted Indian export spices in burlap sacks and wooden bowls"
                loading="lazy"
              />
              <figcaption>Whole &amp; ground spices</figcaption>
            </figure>
            <figure className="gallery-item">
              <img
                src="/assets/images/makhana.webp"
                alt="Premium roasted makhana fox nuts in a wooden bowl"
                loading="lazy"
              />
              <figcaption>Roasted makhana</figcaption>
            </figure>
            <figure className="gallery-item">
              <img
                src="/assets/images/dry-fruits.webp"
                alt="Assorted premium dry fruits and nuts in ceramic dishes"
                loading="lazy"
              />
              <figcaption>Dry fruits &amp; nuts</figcaption>
            </figure>
            <figure className="gallery-item wide">
              <img
                src="/assets/images/warehouse.webp"
                alt="Export-ready cartons and jute sacks in an organized warehouse"
                loading="lazy"
              />
              <figcaption>Export-ready dispatch</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <Reviews />

      <section className="section">
        <div className="container">
          <div className="split-panel">
            <div className="panel">
              <span className="kicker">Documentation</span>
              <h2 className={styles.docHeading}>
                Trust comes from paperwork and consistency.
              </h2>
              <ul className={`clean-list ${styles.docList}`}>
                <li>FSSAI and APEDA-backed trade positioning</li>
                <li>Product-grade and origin-based catalog structure</li>
                <li>Private label and bulk packaging support</li>
                <li>
                  Buyer-facing enquiry flow instead of retail checkout language
                </li>
              </ul>
            </div>
            <div className="cta-band">
              <span className={`kicker ${styles.ctaKicker}`}>
                Trade enquiry
              </span>
              <h3 className={styles.ctaHeading}>
                Build your quote list, then send one clean enquiry.
              </h3>
              <p className={styles.ctaText}>
                Best for importers, distributors, retail buyers, and private
                label teams.
              </p>
              <div className="hero-actions">
                <Link href="/quote-cart" className="btn btn-primary">
                  Open Quote Cart
                </Link>
                <Link href="/contact" className="btn btn-secondary">
                  Contact GiantzFly
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
