import Link from "next/link";
import s from "@/components/story/story.module.css";

export const metadata = {
  title: "Packaging Consultancy | Giantzfly Exim LLP",
  description:
    "We design packaging around the journey your product actually takes, not the one on paper.",
};

const PHOTO_PACK_DESIGN =
  "https://images.pexels.com/photos/9594428/pexels-photo-9594428.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_PACK_TABLE =
  "https://images.pexels.com/photos/6958443/pexels-photo-6958443.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_CARTON =
  "https://images.pexels.com/photos/4498125/pexels-photo-4498125.jpeg?auto=compress&cs=tinysrgb&w=2400";

export default function ConsultancyPage() {
  return (
    <main className={s.page}>
      <section
        className={s.opening}
        style={{ backgroundImage: `url("${PHOTO_PACK_DESIGN}")` }}
      >
        <div className={s.shell}>
          <div className={s.panel}>
            <span className={s.kicker}>Packaging Consultancy</span>
            <h1 className={s.display}>
              Packaging fails in transit.
              <span className={s.displaySoft}>So we design for transit.</span>
            </h1>
            <p className={s.lede}>
              Route, climate, stacking height and handling come first.
              Aesthetics come after they are satisfied.
            </p>
          </div>
        </div>
      </section>

      <section className={s.chapter}>
        <img
          src="/assets/illustrations/packaging-blueprint.svg"
          alt=""
          aria-hidden="true"
          className={s.decorRight}
        />
        <div className={s.shell}>
          <div className={s.narrow}>
            <span className={s.kickerDark}>First conversation</span>
            <h2 className={s.heading}>
              Five questions before a single drawing.
            </h2>
          </div>

          <div className={s.spine}>
            <div className={s.beat}>
              <p className={s.beatLine}>
                Where does it land, and how long at sea?
              </p>
              <p className={s.beatNote}>
                Transit time sets barrier and moisture limits.
              </p>
            </div>
            <div className={s.beat}>
              <p className={s.beatLine}>How high will it be stacked?</p>
              <p className={s.beatNote}>
                Compression strength follows from the pallet plan.
              </p>
            </div>
            <div className={s.beat}>
              <p className={s.beatLine}>Who opens it, and with what?</p>
              <p className={s.beatNote}>
                A warehouse blade and a home kitchen are not the same.
              </p>
            </div>
            <div className={s.beat}>
              <p className={s.beatLine}>What must be printed by law there?</p>
              <p className={s.beatNote}>
                Labels are cheaper to fix before the plates are cut.
              </p>
            </div>
            <div className={s.beat}>
              <p className={s.beatLine}>What has failed for you before?</p>
              <p className={s.beatNote}>
                Old claims are the fastest brief we can get.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={s.statement}>
        <div className={s.statementText}>
          <p className={s.quote}>
            Every millimetre saved{" "}
            <span className={s.quoteStrong}>is paid back per container.</span>
          </p>
          <p className={s.quoteBy}>Why dimensions come first</p>
        </div>
        <div
          className={s.statementPhoto}
          style={{ backgroundImage: `url("${PHOTO_CARTON}")` }}
          role="img"
          aria-label="Corrugated carton being closed for shipment"
        />
      </section>

      <section className={s.chapterTint}>
        <img
          src="/assets/illustrations/consultancy-tools.svg"
          alt=""
          aria-hidden="true"
          className={s.decorLeft}
        />
        <div className={s.shell}>
          <div className={s.narrow}>
            <span className={s.kickerDark}>The engagement</span>
            <h2 className={s.heading}>Brief to signed-off spec.</h2>
          </div>

          <div className={s.ledger}>
            <div className={s.entry}>
              <span className={s.entryNum}>01</span>
              <div>
                <p className={s.entryTitle}>Audit what you ship today</p>
                <p className={s.entryNote}>
                  Costs, damages and wasted headspace, measured.
                </p>
              </div>
            </div>
            <div className={s.entry}>
              <span className={s.entryNum}>02</span>
              <div>
                <p className={s.entryTitle}>Map the real route</p>
                <p className={s.entryNote}>
                  Every handover from plant to shelf.
                </p>
              </div>
            </div>
            <div className={s.entry}>
              <span className={s.entryNum}>03</span>
              <div>
                <p className={s.entryTitle}>Draw two or three options</p>
                <p className={s.entryNote}>
                  With material, cost and yield beside each.
                </p>
              </div>
            </div>
            <div className={s.entry}>
              <span className={s.entryNum}>04</span>
              <div>
                <p className={s.entryTitle}>Sample and abuse them</p>
                <p className={s.entryNote}>
                  Drop, stack, seal, and a humidity soak.
                </p>
              </div>
            </div>
            <div className={s.entry}>
              <span className={s.entryNum}>05</span>
              <div>
                <p className={s.entryTitle}>Fix the specification</p>
                <p className={s.entryNote}>
                  Grammage, gauge, seal width, tolerances.
                </p>
              </div>
            </div>
            <div className={s.entry}>
              <span className={s.entryNum}>06</span>
              <div>
                <p className={s.entryTitle}>Hand it to production</p>
                <p className={s.entryNote}>
                  Yours, or ours, with the same document.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={s.closing}>
        <div className={s.shell}>
          <h2 className={s.closingHeading}>
            Bring us your worst-performing pack.
          </h2>
          <p className={s.closingSay}>
            That is usually where the money is hiding.
          </p>
          <div className={s.linkRow}>
            <Link className={s.link} href="/contact">
              Book a review →
            </Link>
            <Link
              className={s.link}
              href="/services/packaging-material-exports"
            >
              Packaging materials →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
