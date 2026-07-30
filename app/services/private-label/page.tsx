import Link from "next/link";
import s from "@/components/story/story.module.css";

export const metadata = {
  title: "Private Label | Giantzfly Exim LLP",
  description:
    "Your brand on the pack, our sourcing, filling and shipping behind it.",
};

const PHOTO_SHELF =
  "https://images.pexels.com/photos/4019401/pexels-photo-4019401.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_AISLE =
  "https://images.pexels.com/photos/20489330/pexels-photo-20489330.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_STORE =
  "https://images.pexels.com/photos/5498225/pexels-photo-5498225.jpeg?auto=compress&cs=tinysrgb&w=2400";

export default function PrivateLabelPage() {
  return (
    <main className={s.page}>
      <section
        className={s.opening}
        style={{ backgroundImage: `url("${PHOTO_SHELF}")` }}
      >
        <div className={s.shell}>
          <div className={s.panel}>
            <span className={s.kicker}>Private Label</span>
            <h1 className={s.display}>
              Your name on the front.
              <span className={s.displaySoft}>Our work behind it.</span>
            </h1>
            <p className={s.lede}>
              Sourcing, milling, filling, sealing and shipping, arriving as a
              finished retail pack.
            </p>
          </div>
        </div>
      </section>

      <section className={s.chapter}>
        <img
          src="/assets/illustrations/catalog-grid.svg"
          alt=""
          aria-hidden="true"
          className={s.decorRight}
        />
        <div className={s.shell}>
          <div className={s.narrow}>
            <span className={s.kickerDark}>The run</span>
            <h2 className={s.heading}>From brief to pallet, in seven steps.</h2>
          </div>

          <div className={s.ledger}>
            <div className={s.entry}>
              <span className={s.entryNum}>01</span>
              <div>
                <p className={s.entryTitle}>Product and grade fixed</p>
                <p className={s.entryNote}>
                  Chosen against your price point, not ours.
                </p>
              </div>
            </div>
            <div className={s.entry}>
              <span className={s.entryNum}>02</span>
              <div>
                <p className={s.entryTitle}>Pack format chosen</p>
                <p className={s.entryNote}>
                  Pouch, jar or carton, sized to the shelf.
                </p>
              </div>
            </div>
            <div className={s.entry}>
              <span className={s.entryNum}>03</span>
              <div>
                <p className={s.entryTitle}>Artwork adapted</p>
                <p className={s.entryNote}>
                  Your design placed on our die line.
                </p>
              </div>
            </div>
            <div className={s.entry}>
              <span className={s.entryNum}>04</span>
              <div>
                <p className={s.entryTitle}>Compliance text checked</p>
                <p className={s.entryNote}>
                  Declarations for the destination market.
                </p>
              </div>
            </div>
            <div className={s.entry}>
              <span className={s.entryNum}>05</span>
              <div>
                <p className={s.entryTitle}>Pilot pack approved</p>
                <p className={s.entryNote}>
                  Real product, real seal, in your hands.
                </p>
              </div>
            </div>
            <div className={s.entry}>
              <span className={s.entryNum}>06</span>
              <div>
                <p className={s.entryTitle}>Production run</p>
                <p className={s.entryNote}>
                  Batch coded, weight checked, logged.
                </p>
              </div>
            </div>
            <div className={s.entry}>
              <span className={s.entryNum}>07</span>
              <div>
                <p className={s.entryTitle}>Export documents</p>
                <p className={s.entryNote}>
                  Ready before the container is booked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={s.statement}>
        <div className={s.statementText}>
          <p className={s.quote}>
            The shelf never asks{" "}
            <span className={s.quoteStrong}>who filled the pack.</span>
          </p>
          <p className={s.quoteBy}>That is the point</p>
        </div>
        <div
          className={s.statementPhoto}
          style={{ backgroundImage: `url("${PHOTO_STORE}")` }}
          role="img"
          aria-label="Wide supermarket aisle stocked with branded packs"
        />
      </section>

      <section className={s.chapterTint}>
        <img
          src="/assets/illustrations/service-factory.svg"
          alt=""
          aria-hidden="true"
          className={s.decorLeft}
        />
        <div className={s.shell}>
          <div className={s.narrow}>
            <span className={s.kickerDark}>What you keep</span>
            <h2 className={s.heading}>
              Your brand, your margin, your customers.
            </h2>
            <p className={s.say}>
              We stay invisible on the pack and accountable on the file.
            </p>
          </div>
          <div className={s.counts}>
            <div className={s.count}>
              <span className={s.countValue}>7</span>
              <span className={s.countLabel}>Steps to first run</span>
            </div>
            <div className={s.count}>
              <span className={s.countValue}>41</span>
              <span className={s.countLabel}>Products available</span>
            </div>
            <div className={s.count}>
              <span className={s.countValue}>1</span>
              <span className={s.countLabel}>Invoice, start to finish</span>
            </div>
          </div>
        </div>
      </section>

      <section className={s.closing}>
        <div className={s.shell}>
          <h2 className={s.closingHeading}>Send artwork and a target price.</h2>
          <p className={s.closingSay}>
            We will come back with a pack and a cost per unit.
          </p>
          <div className={s.linkRow}>
            <Link className={s.link} href="/contact">
              Start a private label →
            </Link>
            <Link className={s.link} href="/services/sustainable-packaging">
              Sustainable options →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
