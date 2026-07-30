import Link from "next/link";
import s from "@/components/story/story.module.css";

export const metadata = {
  title: "Our Mission | Giantzfly Exim LLP",
  description:
    "The standard Giantzfly Exim LLP holds itself to on every lot, every document and every sailing.",
};

const PHOTO_SEALING =
  "https://images.pexels.com/photos/6169036/pexels-photo-6169036.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_TURMERIC =
  "https://images.pexels.com/photos/6220708/pexels-photo-6220708.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_PALLETS =
  "https://images.pexels.com/photos/4487363/pexels-photo-4487363.jpeg?auto=compress&cs=tinysrgb&w=2400";

export default function MissionPage() {
  return (
    <main className={s.page}>
      <section
        className={s.opening}
        style={{ backgroundImage: `url("${PHOTO_SEALING}")` }}
      >
        <div className={s.shell}>
          <div className={s.panel}>
            <span className={s.kicker}>Our Mission</span>
            <h1 className={s.display}>
              Make the boring part reliable.
              <span className={s.displaySoft}>That is the whole job.</span>
            </h1>
            <p className={s.lede}>
              Nobody celebrates paperwork that was right. They only remember the
              time it was not.
            </p>
          </div>
        </div>
      </section>

      <section className={s.chapter}>
        <img
          src="/assets/illustrations/service-compliance.svg"
          alt=""
          aria-hidden="true"
          className={s.decorRight}
        />
        <div className={s.shell}>
          <div className={s.narrow}>
            <span className={s.kickerDark}>The standard</span>
            <h2 className={s.heading}>
              Six checks, in the same order, every time.
            </h2>
          </div>

          <div className={s.ledger}>
            <div className={s.entry}>
              <span className={s.entryNum}>01</span>
              <div>
                <p className={s.entryTitle}>Buy at origin, never off a list.</p>
                <p className={s.entryNote}>
                  The crop decides the region, not the other way round.
                </p>
              </div>
            </div>
            <div className={s.entry}>
              <span className={s.entryNum}>02</span>
              <div>
                <p className={s.entryTitle}>Grade before price.</p>
                <p className={s.entryNote}>
                  A discount on the wrong grade is not a discount.
                </p>
              </div>
            </div>
            <div className={s.entry}>
              <span className={s.entryNum}>03</span>
              <div>
                <p className={s.entryTitle}>
                  Pack for the journey, not the photo.
                </p>
                <p className={s.entryNote}>
                  Humidity, stacking and transit time set the specification.
                </p>
              </div>
            </div>
            <div className={s.entry}>
              <span className={s.entryNum}>04</span>
              <div>
                <p className={s.entryTitle}>
                  Documents ready before the vessel.
                </p>
                <p className={s.entryNote}>
                  Phyto, origin, invoice, packing list. No scramble at the port.
                </p>
              </div>
            </div>
            <div className={s.entry}>
              <span className={s.entryNum}>05</span>
              <div>
                <p className={s.entryTitle}>Say the real date.</p>
                <p className={s.entryNote}>
                  A hard truth on Monday beats a soft lie all month.
                </p>
              </div>
            </div>
            <div className={s.entry}>
              <span className={s.entryNum}>06</span>
              <div>
                <p className={s.entryTitle}>Own the problem when it lands.</p>
                <p className={s.entryNote}>
                  Photographs, cause, remedy. In that order, without argument.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={s.statement}>
        <div className={s.statementText}>
          <p className={s.quote}>
            Quality is what survives{" "}
            <span className={s.quoteStrong}>thirty days at sea.</span>
          </p>
          <p className={s.quoteBy}>How we score ourselves</p>
        </div>
        <div
          className={s.statementPhoto}
          style={{ backgroundImage: `url("${PHOTO_PALLETS}")` }}
          role="img"
          aria-label="Wrapped export pallets staged for loading"
        />
      </section>

      <section className={s.chapterTint}>
        <img
          src="/assets/decor/dot-grid.svg"
          alt=""
          aria-hidden="true"
          className={s.decorCorner}
        />
        <div className={s.shell}>
          <div className={s.narrow}>
            <span className={s.kickerDark}>Held to it</span>
            <h2 className={s.heading}>The numbers we watch.</h2>
          </div>
          <div className={s.counts}>
            <div className={s.count}>
              <span className={s.countValue}>6</span>
              <span className={s.countLabel}>Checks per lot</span>
            </div>
            <div className={s.count}>
              <span className={s.countValue}>100%</span>
              <span className={s.countLabel}>Docs before loading</span>
            </div>
            <div className={s.count}>
              <span className={s.countValue}>41</span>
              <span className={s.countLabel}>Lines under one standard</span>
            </div>
          </div>
        </div>
      </section>

      <section className={s.closing}>
        <div className={s.shell}>
          <h2 className={s.closingHeading}>Hold us to all six.</h2>
          <p className={s.closingSay}>
            Send a spec and check the answers against this list.
          </p>
          <div className={s.linkRow}>
            <Link className={s.link} href="/contact">
              Send a spec →
            </Link>
            <Link className={s.link} href="/about/vision">
              Where this is heading →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
