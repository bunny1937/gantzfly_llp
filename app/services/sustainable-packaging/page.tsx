import Link from "next/link";
import s from "@/components/story/story.module.css";

export const metadata = {
  title: "Sustainable Packaging | Giantzfly Exim LLP",
  description:
    "Less material, recyclable structures and packs that still survive the journey.",
};

const PHOTO_KRAFT =
  "https://images.pexels.com/photos/29914090/pexels-photo-29914090.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_PAPER_BAG =
  "https://images.pexels.com/photos/30913798/pexels-photo-30913798.jpeg?auto=compress&cs=tinysrgb&w=2400";
const PHOTO_ECO_PACK =
  "https://images.pexels.com/photos/8015893/pexels-photo-8015893.jpeg?auto=compress&cs=tinysrgb&w=2400";

export default function SustainablePage() {
  return (
    <main className={s.page}>
      <section
        className={s.opening}
        style={{ backgroundImage: `url("${PHOTO_KRAFT}")` }}
      >
        <div className={s.shell}>
          <div className={s.panel}>
            <span className={s.kicker}>Sustainable Packaging</span>
            <h1 className={s.display}>
              A pack that fails is the least green pack there is.
              <span className={s.displaySoft}>
                Protection first, then less.
              </span>
            </h1>
            <p className={s.lede}>
              Damaged goods waste the crop, the freight and the packaging all at
              once.
            </p>
          </div>
        </div>
      </section>

      <section className={s.chapter}>
        <img
          src="/assets/illustrations/service-eco.svg"
          alt=""
          aria-hidden="true"
          className={s.decorRight}
        />
        <div className={s.shell}>
          <div className={s.narrow}>
            <span className={s.kickerDark}>The rules</span>
            <h2 className={s.heading}>
              Take material out only where nothing breaks.
            </h2>
          </div>

          <div className={s.spine}>
            <div className={s.beat}>
              <p className={s.beatLine}>Reduce before you replace.</p>
              <p className={s.beatNote}>
                Thinner gauge and tighter sizing come first.
              </p>
            </div>
            <div className={s.beat}>
              <p className={s.beatLine}>One material beats three.</p>
              <p className={s.beatNote}>
                Mono-structures actually get recycled.
              </p>
            </div>
            <div className={s.beat}>
              <p className={s.beatLine}>Fibre where the barrier allows.</p>
              <p className={s.beatNote}>
                Paper and board for dry, stable goods.
              </p>
            </div>
            <div className={s.beat}>
              <p className={s.beatLine}>Test before you commit.</p>
              <p className={s.beatNote}>
                A greener pack must still land intact.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={s.statement}>
        <div className={s.statementText}>
          <p className={s.quote}>
            The greenest gram of plastic{" "}
            <span className={s.quoteStrong}>is the one never used.</span>
          </p>
          <p className={s.quoteBy}>Where we start every review</p>
        </div>
        <div
          className={s.statementPhoto}
          style={{ backgroundImage: `url("${PHOTO_ECO_PACK}")` }}
          role="img"
          aria-label="Fibre-based packaging set with minimal plastic"
        />
      </section>

      <section className={s.chapterTint}>
        <img
          src="/assets/decor/leaf-grid.svg"
          alt=""
          aria-hidden="true"
          className={s.decorCorner}
        />
        <div className={s.shell}>
          <div className={s.narrow}>
            <span className={s.kickerDark}>In practice</span>
            <h2 className={s.heading}>
              Four moves that usually pay for themselves.
            </h2>
          </div>

          <div className={s.trail}>
            <div className={s.stop}>
              <span className={s.stopIndex}>01</span>
              <p className={s.stopTitle}>Right-size the pack</p>
              <p className={s.stopNote}>
                Less headspace, more units per container.
              </p>
            </div>
            <div className={s.stop}>
              <span className={s.stopIndex}>02</span>
              <p className={s.stopTitle}>Down-gauge the film</p>
              <p className={s.stopNote}>
                Only after the seal survives testing.
              </p>
            </div>
            <div className={s.stop}>
              <span className={s.stopIndex}>03</span>
              <p className={s.stopTitle}>Switch to mono-material</p>
              <p className={s.stopNote}>
                Recyclable in the market you sell into.
              </p>
            </div>
            <div className={s.stop}>
              <span className={s.stopIndex}>04</span>
              <p className={s.stopTitle}>Simplify the secondary</p>
              <p className={s.stopNote}>
                Fewer inserts, less tape, cleaner corrugate.
              </p>
            </div>
          </div>

          <div className={s.counts}>
            <div className={s.count}>
              <span className={s.countValue}>4</span>
              <span className={s.countLabel}>Rules applied</span>
            </div>
            <div className={s.count}>
              <span className={s.countValue}>0</span>
              <span className={s.countLabel}>Compromise on protection</span>
            </div>
            <div className={s.count}>
              <span className={s.countValue}>1</span>
              <span className={s.countLabel}>Spec, tested end to end</span>
            </div>
          </div>
        </div>
      </section>

      <section className={s.closing}>
        <div className={s.shell}>
          <h2 className={s.closingHeading}>
            Show us the pack you want to shrink.
          </h2>
          <p className={s.closingSay}>
            We will tell you what can go and what must stay.
          </p>
          <div className={s.linkRow}>
            <Link className={s.link} href="/contact">
              Start a review →
            </Link>
            <Link className={s.link} href="/services/packaging-consultancy">
              Packaging consultancy →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
