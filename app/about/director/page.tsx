import Link from "next/link";
import s from "@/components/story/story.module.css";

export const metadata = {
  title: "Meet a Director | Giantzfly Exim LLP",
  description:
    "The judgement, the standards and the accountability behind every Giantzfly Exim LLP shipment.",
};

const PHOTO_OFFICE =
  "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_NEGOTIATION =
  "https://images.pexels.com/photos/12885861/pexels-photo-12885861.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_AGREEMENT =
  "https://images.pexels.com/photos/33175650/pexels-photo-33175650.jpeg?auto=compress&cs=tinysrgb&w=2400";

export default function DirectorPage() {
  return (
    <main className={s.page}>
      <section
        className={s.opening}
        style={{ backgroundImage: `url("${PHOTO_OFFICE}")` }}
      >
        <div className={s.shell}>
          <div className={s.panel}>
            <span className={s.kicker}>Meet a Director</span>
            <h1 className={s.display}>
              Someone signs off on every container.
              <span className={s.displaySoft}>Here is who.</span>
            </h1>
            <p className={s.lede}>
              Not a department. A person you can call when a lot looks wrong.
            </p>
          </div>
        </div>
      </section>

      <section className={s.chapter}>
        <img
          src="/assets/decor/compass-arc.svg"
          alt=""
          aria-hidden="true"
          className={s.decorRight}
        />
        <div className={s.shell}>
          <div className={s.narrow}>
            <span className={s.kickerDark}>The habit</span>
            <h2 className={s.heading}>
              Every shipment is a chain of small refusals.
            </h2>
            <p className={s.say}>
              Most of the work is saying no early, while it is still cheap.
            </p>
          </div>

          <div className={s.spine}>
            <div className={s.beat}>
              <p className={s.beatLine}>No to a lot that smells tired.</p>
              <p className={s.beatNote}>
                Aroma fades before a lab report catches it.
              </p>
            </div>
            <div className={s.beat}>
              <p className={s.beatLine}>
                No to a price that only works on paper.
              </p>
              <p className={s.beatNote}>
                A cheap origin becomes an expensive claim.
              </p>
            </div>
            <div className={s.beat}>
              <p className={s.beatLine}>
                No to a sailing that leaves no margin.
              </p>
              <p className={s.beatNote}>
                Better a straight date than a hopeful one.
              </p>
            </div>
            <div className={s.beat}>
              <p className={s.beatLine}>Yes, once all three are clear.</p>
              <p className={s.beatNote}>Then it moves, and it moves fast.</p>
            </div>
          </div>
        </div>
      </section>

      <div
        className={s.strip}
        style={{ backgroundImage: `url("${PHOTO_NEGOTIATION}")` }}
        role="img"
        aria-label="Buyer and supplier settling terms across a table"
      />

      <section className={s.statement}>
        <div className={s.statementText}>
          <p className={s.quote}>
            A signature is a promise{" "}
            <span className={s.quoteStrong}>you can be called on.</span>
          </p>
          <p className={s.quoteBy}>Director, Giantzfly Exim LLP</p>
        </div>
        <div
          className={s.statementPhoto}
          style={{ backgroundImage: `url("${PHOTO_AGREEMENT}")` }}
          role="img"
          aria-label="Two people shaking hands on a trade agreement"
        />
      </section>

      <section className={s.chapterTint}>
        <img
          src="/assets/illustrations/about-network.svg"
          alt=""
          aria-hidden="true"
          className={s.decorLeft}
        />
        <div className={s.shell}>
          <div className={s.narrow}>
            <span className={s.kickerDark}>What that means for you</span>
            <h2 className={s.heading}>Short line. Straight answer.</h2>
          </div>
          <div className={s.counts}>
            <div className={s.count}>
              <span className={s.countValue}>1</span>
              <span className={s.countLabel}>Person on your file</span>
            </div>
            <div className={s.count}>
              <span className={s.countValue}>24h</span>
              <span className={s.countLabel}>Reply on enquiries</span>
            </div>
            <div className={s.count}>
              <span className={s.countValue}>0</span>
              <span className={s.countLabel}>Handovers mid shipment</span>
            </div>
          </div>
        </div>
      </section>

      <section className={s.closing}>
        <div className={s.shell}>
          <h2 className={s.closingHeading}>Ask the awkward question first.</h2>
          <p className={s.closingSay}>
            Origin, grade, moisture, date. Nothing is off limits.
          </p>
          <div className={s.linkRow}>
            <Link className={s.link} href="/contact">
              Talk to us →
            </Link>
            <Link className={s.link} href="/about/mission">
              Read our mission →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
