import Link from "next/link";
import s from "@/components/story/story.module.css";

export const metadata = {
  title: "About Us | Giantzfly Exim LLP",
  description:
    "How Giantzfly Exim LLP moves Indian spices, dry fruits, vegetables and makhana from origin to overseas shelves.",
};

const PHOTO_YARD =
  "https://images.pexels.com/photos/4256976/pexels-photo-4256976.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_SPICE_SACKS =
  "https://images.pexels.com/photos/17978110/pexels-photo-17978110.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_PORT =
  "https://images.pexels.com/photos/2231742/pexels-photo-2231742.jpeg?auto=compress&cs=tinysrgb&w=2400";

export default function AboutPage() {
  return (
    <main className={s.page}>
      <section
        className={s.opening}
        style={{ backgroundImage: `url("${PHOTO_YARD}")` }}
      >
        <div className={s.shell}>
          <div className={s.panel}>
            <span className={s.kicker}>Giantzfly Exim LLP</span>
            <h1 className={s.display}>
              One shipment begins at a farm gate.
              <span className={s.displaySoft}>
                It ends on someone&apos;s shelf.
              </span>
            </h1>
            <p className={s.lede}>
              We stand between those two points and take responsibility for
              every hour in between.
            </p>
          </div>
        </div>
      </section>

      <section className={s.chapter}>
        <img
          src="/assets/illustrations/india-origins.svg"
          alt=""
          aria-hidden="true"
          className={s.decorRight}
        />
        <div className={s.shell}>
          <div className={s.narrow}>
            <span className={s.kickerDark}>Where it starts</span>
            <h2 className={s.heading}>
              India does not have one harvest. It has hundreds.
            </h2>
            <p className={s.say}>
              We buy where the crop is actually good, not where it is easy.
            </p>
          </div>

          <div className={s.spine}>
            <div className={s.beat}>
              <p className={s.beatLine}>
                Kashmir and Kerala for the aromatics.
              </p>
              <p className={s.beatNote}>
                Saffron, cardamom, black pepper, clove.
              </p>
            </div>
            <div className={s.beat}>
              <p className={s.beatLine}>
                Gujarat and Rajasthan for the volume spices.
              </p>
              <p className={s.beatNote}>Cumin, fennel, coriander, chilli.</p>
            </div>
            <div className={s.beat}>
              <p className={s.beatLine}>
                Bihar for makhana, ponds to popping floor.
              </p>
              <p className={s.beatNote}>Plain, roasted and flavoured grades.</p>
            </div>
            <div className={s.beat}>
              <p className={s.beatLine}>
                Maharashtra and the north for produce.
              </p>
              <p className={s.beatNote}>
                Onion, garlic, ginger, potato, green chilli.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={s.statement}>
        <div className={s.statementText}>
          <p className={s.quote}>
            Connecting markets.{" "}
            <span className={s.quoteStrong}>Delivering growth.</span>
          </p>
          <p className={s.quoteBy}>The line we are judged against</p>
        </div>
        <div
          className={s.statementPhoto}
          style={{ backgroundImage: `url("${PHOTO_PORT}")` }}
          role="img"
          aria-label="Loaded container vessel alongside a working port"
        />
      </section>

      <section className={s.chapterTint}>
        <img
          src="/assets/illustrations/global-trade.svg"
          alt=""
          aria-hidden="true"
          className={s.decorLeft}
        />
        <div className={s.shell}>
          <div className={s.narrow}>
            <span className={s.kickerDark}>What we carry</span>
            <h2 className={s.heading}>Five families. Forty-one products.</h2>
          </div>

          <div className={s.trail}>
            <div className={s.stop}>
              <span className={s.stopIndex}>01</span>
              <p className={s.stopTitle}>Whole spices</p>
              <p className={s.stopNote}>
                Nineteen lines, sorted and graded at source.
              </p>
            </div>
            <div className={s.stop}>
              <span className={s.stopIndex}>02</span>
              <p className={s.stopTitle}>Ground spices</p>
              <p className={s.stopNote}>Eight powders, milled to your mesh.</p>
            </div>
            <div className={s.stop}>
              <span className={s.stopIndex}>03</span>
              <p className={s.stopTitle}>Fresh vegetables</p>
              <p className={s.stopNote}>Seven lines moving on tight clocks.</p>
            </div>
            <div className={s.stop}>
              <span className={s.stopIndex}>04</span>
              <p className={s.stopTitle}>Dry fruits</p>
              <p className={s.stopNote}>Five origins, counted by calibre.</p>
            </div>
            <div className={s.stop}>
              <span className={s.stopIndex}>05</span>
              <p className={s.stopTitle}>Makhana</p>
              <p className={s.stopNote}>Bihar fox nuts, plain and flavoured.</p>
            </div>
          </div>

          <div className={s.counts}>
            <div className={s.count}>
              <span className={s.countValue}>41</span>
              <span className={s.countLabel}>Export lines</span>
            </div>
            <div className={s.count}>
              <span className={s.countValue}>5</span>
              <span className={s.countLabel}>Product families</span>
            </div>
            <div className={s.count}>
              <span className={s.countValue}>1</span>
              <span className={s.countLabel}>Point of contact</span>
            </div>
          </div>
        </div>
      </section>

      <section className={s.closing}>
        <div className={s.shell}>
          <h2 className={s.closingHeading}>
            Tell us the port. We will work backwards from it.
          </h2>
          <p className={s.closingSay}>
            Volume, grade, packing, date. That is all we need to start.
          </p>
          <div className={s.linkRow}>
            <Link className={s.link} href="/products">
              See the catalogue →
            </Link>
            <Link className={s.link} href="/contact">
              Send an enquiry →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
