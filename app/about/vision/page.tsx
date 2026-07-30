import Link from "next/link";
import s from "@/components/story/story.module.css";

export const metadata = {
  title: "Our Vision | Giantzfly Exim LLP",
  description:
    "Where Giantzfly Exim LLP is taking Indian spices, produce and makhana next.",
};

const PHOTO_SUNSET_PORT =
  "https://images.pexels.com/photos/36652827/pexels-photo-36652827.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_FARMERS =
  "https://images.pexels.com/photos/30320066/pexels-photo-30320066.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_AERIAL_PORT =
  "https://images.pexels.com/photos/35459333/pexels-photo-35459333.jpeg?auto=compress&cs=tinysrgb&w=2400";

export default function VisionPage() {
  return (
    <main className={s.page}>
      <section
        className={s.opening}
        style={{ backgroundImage: `url("${PHOTO_SUNSET_PORT}")` }}
      >
        <div className={s.shell}>
          <div className={s.panel}>
            <span className={s.kicker}>Our Vision</span>
            <h1 className={s.display}>
              An Indian crop should not lose its name at the border.
              <span className={s.displaySoft}>We keep it attached.</span>
            </h1>
            <p className={s.lede}>
              Origin, grade and grower stay on the pack all the way to the
              shelf.
            </p>
          </div>
        </div>
      </section>

      <section className={s.chapter}>
        <img
          src="/assets/illustrations/shipping-route.svg"
          alt=""
          aria-hidden="true"
          className={s.decorRight}
        />
        <div className={s.shell}>
          <div className={s.narrow}>
            <span className={s.kickerDark}>The horizon</span>
            <h2 className={s.heading}>Four moves, in order.</h2>
            <p className={s.say}>
              Each one only starts when the last one is boring.
            </p>
          </div>

          <div className={s.trail}>
            <div className={s.stop}>
              <span className={s.stopIndex}>Now</span>
              <p className={s.stopTitle}>Bulk done properly</p>
              <p className={s.stopNote}>
                Clean lots, honest grades, dates that hold.
              </p>
            </div>
            <div className={s.stop}>
              <span className={s.stopIndex}>Next</span>
              <p className={s.stopTitle}>Retail-ready packs</p>
              <p className={s.stopNote}>Your brand, our line, one shipment.</p>
            </div>
            <div className={s.stop}>
              <span className={s.stopIndex}>Then</span>
              <p className={s.stopTitle}>Traceable lots</p>
              <p className={s.stopNote}>
                Region and season readable on the carton.
              </p>
            </div>
            <div className={s.stop}>
              <span className={s.stopIndex}>Ahead</span>
              <p className={s.stopTitle}>Lighter packaging</p>
              <p className={s.stopNote}>
                Less material, same protection, fewer claims.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className={s.statement}>
        <div className={s.statementText}>
          <p className={s.quote}>
            Sell the crop,{" "}
            <span className={s.quoteStrong}>not the commodity.</span>
          </p>
          <p className={s.quoteBy}>The direction of travel</p>
        </div>
        <div
          className={s.statementPhoto}
          style={{ backgroundImage: `url("${PHOTO_AERIAL_PORT}")` }}
          role="img"
          aria-label="Aerial view of a working container port"
        />
      </section>

      <section className={s.chapterTint}>
        <img
          src="/assets/decor/world-routes.svg"
          alt=""
          aria-hidden="true"
          className={s.decorLeft}
        />
        <div className={s.shell}>
          <div className={s.narrow}>
            <span className={s.kickerDark}>Why it matters</span>
            <h2 className={s.heading}>A named origin survives a price war.</h2>
            <p className={s.say}>
              Anonymous cargo competes on cents. Named cargo competes on trust.
            </p>
          </div>
          <div className={s.counts}>
            <div className={s.count}>
              <span className={s.countValue}>4</span>
              <span className={s.countLabel}>Moves planned</span>
            </div>
            <div className={s.count}>
              <span className={s.countValue}>5</span>
              <span className={s.countLabel}>Families in scope</span>
            </div>
            <div className={s.count}>
              <span className={s.countValue}>1</span>
              <span className={s.countLabel}>Standard across all</span>
            </div>
          </div>
        </div>
      </section>

      <section className={s.closing}>
        <div className={s.shell}>
          <h2 className={s.closingHeading}>Build the next shelf with us.</h2>
          <p className={s.closingSay}>
            Bulk today, your own label next season.
          </p>
          <div className={s.linkRow}>
            <Link className={s.link} href="/services/private-label">
              Private label →
            </Link>
            <Link className={s.link} href="/contact">
              Start a conversation →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
