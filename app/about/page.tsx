import Link from "next/link";

const capabilities = [
  {
    title: "Farm-origin sourcing",
    text: "We source from known producing belts including Erode, Unjha, Wayanad, Guntur, Idukki, Darbhanga, Nashik, and Kashmir depending on the commodity.",
  },
  {
    title: "Export-grade sorting",
    text: "Lots are cleaned, graded, sorted, and packed to buyer specification for wholesale, distributor, and private label requirements.",
  },
  {
    title: "Documentation support",
    text: "We support COO, COA, phytosanitary, fumigation, packing list, commercial invoice, and buyer-specific export paperwork.",
  },
  {
    title: "Flexible packaging",
    text: "Bulk sacks, cartons, vacuum formats, and retail-ready packs are available depending on market, product, and MOQ.",
  },
  {
    title: "Private label supply",
    text: "For distributors and supermarket buyers, we support brand-neutral or private label packing subject to quantity and artwork approval.",
  },
  {
    title: "Multi-market shipping",
    text: "We work for buyers targeting USA, UK, Germany, France, UAE, South Africa, and Nigeria with practical trade communication.",
  },
];

const buyerTypes = [
  "Importers and sourcing teams",
  "Distributors and regional wholesalers",
  "Supermarket and modern trade buyers",
  "Private label grocery brands",
  "International retailers",
];

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="section section-illus">
        <div className="illus-bg illus-bg--tr" aria-hidden="true">
          <img
            src="/assets/illustrations/global-trade.svg"
            alt=""
            width="480"
            height="480"
            loading="lazy"
          />
        </div>

        <div className="container">
          <p className="eyebrow">About GiantzFly</p>
          <h1 className="text-display">
            Built for buyers who need export clarity, not retail noise.
          </h1>
          <p className="text-muted about-lead">
            GiantzFly Exim LLP is a B2B export company focused on Indian spices,
            makhana, and dry fruits for international buyers. Our role is to
            connect origin-linked supply with clean documentation, dependable
            packaging, and trade-ready communication.
          </p>

          <div className="about-grid">
            <div className="card about-card">
              <p className="eyebrow">Positioning</p>
              <h2>From Indian Origins to Global Markets.</h2>
              <p className="text-muted">
                Farm-direct. Lab-certified. Export-ready for your shelf.
              </p>
              <hr className="divider" />
              <p className="text-muted">
                We are not building for Indian retail shoppers. We speak to
                importers, distributors, supermarket buyers, and private label
                teams who need MOQ clarity, certifications, origin traceability,
                and shipment confidence.
              </p>
            </div>

            <div className="card about-card">
              <p className="eyebrow">Who we serve</p>
              <ul className="serve-list" role="list">
                {buyerTypes.map((item) => (
                  <li key={item}>
                    <span className="dot" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="section section-illus">
        <div className="illus-bg illus-bg--br" aria-hidden="true">
          <img
            src="/assets/illustrations/sourcing.svg"
            alt=""
            width="440"
            height="360"
            loading="lazy"
          />
        </div>

        <div className="container">
          <p className="eyebrow">Capabilities</p>
          <h2 className="section-title">
            Export operations buyers actually ask about.
          </h2>

          <div className="cap-grid">
            {capabilities.map((item) => (
              <div key={item.title} className="card cap-card">
                <h3>{item.title}</h3>
                <p className="text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <p className="eyebrow">Trade Enquiry</p>
            <h2>Need origin, MOQ, and shipment clarity before you sample?</h2>
            <p>
              Send your requirement with destination market, product, quantity,
              and packaging preference. We will respond with a trade-ready
              enquiry flow.
            </p>
            <div className="about-cta-actions">
              <Link href="/contact" className="btn btn--primary btn--lg">
                Contact Us
              </Link>
              <Link href="/quote-cart" className="btn btn--ghost btn--lg">
                Open Quote Cart
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
