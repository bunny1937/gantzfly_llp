import Link from "next/link";
import s from "@/components/story/story.module.css";

export const metadata = {
  title: "Packaging Material Exports | Giantzfly Exim LLP",
  description:
    "Films, laminates, cartons, jars and closures shipped to specification from India.",
};

const PHOTO_BOX_STACKS =
  "https://images.pexels.com/photos/34221998/pexels-photo-34221998.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_WAREHOUSE =
  "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_RACKING =
  "https://images.pexels.com/photos/27111449/pexels-photo-27111449.jpeg?auto=compress&cs=tinysrgb&w=2400";

export default function MaterialsPage() {
  return (
    <main className={s.page}>
      <section
        className={s.opening}
        style={{ backgroundImage: `url("${PHOTO_BOX_STACKS}")` }}
      >
        <div className={s.shell}>
          <div className={s.panel}>
            <span className={s.kicker}>Packaging Material Exports</span>
            <h1 className={s.display}>
              A pack is only as good as the roll it came from.
              <span className={s.displaySoft}>We ship the roll.</span>
            </h1>
            <p className={s.lede}>
              Films, laminates, cartons, jars, closures and cases, made to your
              gauge and sent to your plant.
            </p>
          </div>
        </div>
      </section>

      <section className={s.chapter}>
        <img
          src="/assets/illustrations/export-materials.svg"
          alt=""
          aria-hidden="true"
          className={s.decorRight}
        />
        <div className={s.shell}>
          <div className={s.narrow}>
            <span className={s.kickerDark}>The path</span>
            <h2 className={s.heading}>
              Five stops between the mill and your machine.
            </h2>
          </div>

          <div className={s.trail}>
            <div className={s.stop}>
              <span className={s.stopIndex}>01</span>
              <p className={s.stopTitle}>Specification</p>
              <p className={s.stopNote}>
                Structure, gauge, barrier and seal window.
              </p>
            </div>
            <div className={s.stop}>
              <span className={s.stopIndex}>02</span>
              <p className={s.stopTitle}>Mill selection</p>
              <p className={s.stopNote}>
                Matched to volume, not to convenience.
              </p>
            </div>
            <div className={s.stop}>
              <span className={s.stopIndex}>03</span>
              <p className={s.stopTitle}>Trial roll</p>
              <p className={s.stopNote}>
                Run on your machine before bulk is cut.
              </p>
            </div>
            <div className={s.stop}>
              <span className={s.stopIndex}>04</span>
              <p className={s.stopTitle}>Production</p>
              <p className={s.stopNote}>
                Batch records held against the spec sheet.
              </p>
            </div>
            <div className={s.stop}>
              <span className={s.stopIndex}>05</span>
              <p className={s.stopTitle}>Loading</p>
              <p className={s.stopNote}>
                Palletised so the last roll is still round.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={s.statement}>
        <div className={s.statementText}>
          <p className={s.quote}>
            The container is the last{" "}
            <span className={s.quoteStrong}>quality control step.</span>
          </p>
          <p className={s.quoteBy}>Why we plan the load</p>
        </div>
        <div
          className={s.statementPhoto}
          style={{ backgroundImage: `url("${PHOTO_RACKING}")` }}
          role="img"
          aria-label="Cartons stacked on industrial storage racking"
        />
      </section>

      <section className={s.chapterTint}>
        <img
          src="/assets/illustrations/packaging-stack.svg"
          alt=""
          aria-hidden="true"
          className={s.decorLeft}
        />
        <div className={s.shell}>
          <div className={s.narrow}>
            <span className={s.kickerDark}>What we ship</span>
            <h2 className={s.heading}>
              Six families, one specification language.
            </h2>
          </div>

          <div className={s.ledger}>
            <div className={s.entry}>
              <span className={s.entryNum}>01</span>
              <div>
                <p className={s.entryTitle}>Flexible films and laminates</p>
                <p className={s.entryNote}>
                  Mono-material options where the barrier allows.
                </p>
              </div>
            </div>
            <div className={s.entry}>
              <span className={s.entryNum}>02</span>
              <div>
                <p className={s.entryTitle}>Pouches and sachets</p>
                <p className={s.entryNote}>Stand-up, flat, spouted, zipped.</p>
              </div>
            </div>
            <div className={s.entry}>
              <span className={s.entryNum}>03</span>
              <div>
                <p className={s.entryTitle}>Folding cartons and corrugate</p>
                <p className={s.entryNote}>
                  Flute and grammage set by stack height.
                </p>
              </div>
            </div>
            <div className={s.entry}>
              <span className={s.entryNum}>04</span>
              <div>
                <p className={s.entryTitle}>Rigid jars and containers</p>
                <p className={s.entryNote}>
                  Food-grade resins, tested closures.
                </p>
              </div>
            </div>
            <div className={s.entry}>
              <span className={s.entryNum}>05</span>
              <div>
                <p className={s.entryTitle}>Caps, closures and liners</p>
                <p className={s.entryNote}>
                  Torque and seal integrity checked on line.
                </p>
              </div>
            </div>
            <div className={s.entry}>
              <span className={s.entryNum}>06</span>
              <div>
                <p className={s.entryTitle}>Labels and secondary print</p>
                <p className={s.entryNote}>
                  Compliance text proofed for the destination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={s.closing}>
        <div className={s.shell}>
          <h2 className={s.closingHeading}>
            Send the drawing or the old sample.
          </h2>
          <p className={s.closingSay}>Either one is enough to quote against.</p>
          <div className={s.linkRow}>
            <Link className={s.link} href="/contact">
              Request a quote →
            </Link>
            <Link className={s.link} href="/services/private-label">
              Private label →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
