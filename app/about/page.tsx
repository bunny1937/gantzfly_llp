import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Globe2,
  MapPin,
  PackageCheck,
  Ship,
  Sprout,
} from "lucide-react";
import styles from "./about.module.css";
const capabilities = [
  "Origin-led sourcing",
  "Export-grade sorting",
  "Documentation support",
  "Packaging consultancy",
  "Private-label development",
  "Multi-market shipping",
];
const origins = [
  "Erode / turmeric",
  "Unjha / cumin",
  "Wayanad / pepper",
  "Guntur / chilli",
  "Darbhanga / makhana",
  "Nashik / raisins",
  "Kashmir / walnuts",
];
export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroAsset}>
          <img
            src="/assets/illustrations/about-network.svg"
            alt="India to global trade network"
          />
        </div>
        <div className="container">
          <p className={styles.kicker}>About GiantzFly</p>
          <h1>
            Origin intelligence.
            <br />
            <em>Global execution.</em>
          </h1>
          <p>
            We connect Indian products, packaging systems and qualified supply
            with the commercial clarity international buyers need.
          </p>
        </div>
      </section>
      <section className={styles.story}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div>
              <p className={styles.kicker}>What we are building</p>
              <h2>
                A practical bridge between a strong product and a confident
                shipment.
              </h2>
            </div>
            <div>
              <p>
                GiantzFly Exim LLP is a B2B export and packaging solutions
                company serving importers, distributors, supermarket buyers,
                manufacturers, startups and private-label teams.
              </p>
              <p>
                Our work combines origin sourcing, pack engineering, vendor
                qualification, quality coordination, regulatory support and
                export logistics.
              </p>
              <Link href="/packaging">
                Explore packaging practice <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.origins}>
        <div className="container">
          <div className={styles.titleRow}>
            <div>
              <p className={styles.kicker}>The origin map</p>
              <h2>Source where the product has an advantage.</h2>
            </div>
            <MapPin size={70} />
          </div>
          <div className={styles.originGrid}>
            <div className={styles.map}>
              <img
                src="/assets/illustrations/india-origins.svg"
                alt="Indian sourcing origin illustration"
              />
            </div>
            <div className={styles.originList}>
              {origins.map((x, i) => (
                <div key={x}>
                  <span>0{i + 1}</span>
                  <p>{x}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className={styles.capabilities}>
        <div className="container">
          <p className={styles.kicker}>How we work</p>
          <h2>One operating model, six useful capabilities.</h2>
          <div className={styles.capGrid}>
            {capabilities.map((x, i) => {
              const icons = [
                Sprout,
                PackageCheck,
                BadgeCheck,
                Globe2,
                PackageCheck,
                Ship,
              ];
              const I = icons[i];
              return (
                <article key={x}>
                  <span>0{i + 1}</span>
                  <I size={25} />
                  <h3>{x}</h3>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className={styles.cta}>
        <div className="container">
          <div>
            <p className={styles.kicker}>Bring us the requirement</p>
            <h2>
              Product, pack, market and volume.
              <br />
              We’ll connect the route.
            </h2>
            <Link href="/contact">
              Start a trade enquiry <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
