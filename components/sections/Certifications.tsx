import styles from "./Certifications.module.css";

const certifications = [
  {
    code: "FSSAI",
    name: "Food Safety & Standards Authority of India",
    note: "Licensed food business operator",
  },
  {
    code: "APEDA",
    name: "Agricultural & Processed Food Products Export Development Authority",
    note: "Registered exporter",
  },
  {
    code: "Spices Board",
    name: "Spices Board of India",
    note: "Registered spice exporter",
  },
  {
    code: "IEC",
    name: "Importer Exporter Code",
    note: "DGFT issued",
  },
  {
    code: "Phytosanitary",
    name: "Plant Quarantine certification",
    note: "Issued per consignment",
  },
  {
    code: "Lab tested",
    name: "Third-party laboratory analysis",
    note: "Moisture, pesticide, aflatoxin",
  },
];

const incoterms = ["EXW", "FOB", "CIF", "CFR", "DAP"];

export default function Certifications() {
  return (
    <section className={styles.section}>
      <img
        src="/assets/decor/compass-arc.svg"
        alt=""
        className={styles.decor}
        aria-hidden="true"
      />
      <div className="container">
        <div className={styles.head}>
          <span className={styles.eyebrow}>Compliance</span>
          <h2 className={styles.heading}>
            Paperwork that clears customs the first time.
          </h2>
          <p className={styles.lead}>
            Registrations, testing and documentation are prepared before
            loading, not chased after the container leaves.
          </p>
        </div>

        <div className={styles.grid}>
          {certifications.map((item) => (
            <article key={item.code} className={styles.card}>
              <span className={styles.badge}>{item.code}</span>
              <strong>{item.name}</strong>
              <small>{item.note}</small>
            </article>
          ))}
        </div>

        <div className={styles.terms}>
          <span className={styles.termsLabel}>Incoterms supported</span>
          <div className={styles.termsList}>
            {incoterms.map((term) => (
              <span key={term} className={styles.term}>
                {term}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
