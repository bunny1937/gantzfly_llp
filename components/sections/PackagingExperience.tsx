"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Box,
  ClipboardCheck,
  Factory,
  Leaf,
  PackageOpen,
  ScanLine,
  Ship,
} from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { featuredProducts } from "@/data/products";
import styles from "./PackagingExperience.module.css";

const services = [
  {
    n: "01",
    icon: ScanLine,
    title: "Structure before decoration",
    text: "Architecture, barrier and filling reality are resolved before artwork.",
    asset: "/assets/illustrations/service-structure.svg",
  },
  {
    n: "02",
    icon: ClipboardCheck,
    title: "Compliance built in",
    text: "Food contact, labels, export standards and validation become design constraints.",
    asset: "/assets/illustrations/service-compliance.svg",
  },
  {
    n: "03",
    icon: Factory,
    title: "Suppliers that deliver",
    text: "Vendor discovery, audits, qualification and production coordination across India.",
    asset: "/assets/illustrations/service-factory.svg",
  },
  {
    n: "04",
    icon: Leaf,
    title: "Less material. More value.",
    text: "Right-sizing and lower-impact routes without weakening pack performance.",
    asset: "/assets/illustrations/service-eco.svg",
  },
];

const materials = [
  {
    title: "Flexible",
    subtitle: "Pouches & laminates",
    text: "Stand-up, spout, vacuum, retort, three-side seal, four-side seal, zip-lock and printed laminated pouches.",
    asset: "/assets/materials/flexible.svg",
    code: "FLX-01",
    photo:
      "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Paper",
    subtitle: "Fibre-led systems",
    text: "Corrugated boxes, printed cartons, kraft bags, shopping bags and food-grade paper packaging.",
    asset: "/assets/materials/paper.svg",
    code: "PPR-02",
    photo:
      "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Rigid",
    subtitle: "Plastic formats",
    text: "PET bottles and jars, HDPE bottles, PP containers, dispensing systems, caps and closures.",
    asset: "/assets/materials/rigid.svg",
    code: "RGD-03",
    photo:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Glass & metal",
    subtitle: "Premium containment",
    text: "Cosmetic bottles, food jars, essential-oil bottles, pharmaceutical containers and decorative tins.",
    asset: "/assets/materials/glass-metal.svg",
    code: "GMT-04",
    photo:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Sustainable",
    subtitle: "Lower-impact routes",
    text: "Compostable, biodegradable, recyclable and paper-based alternatives selected against real use conditions.",
    asset: "/assets/materials/sustainable.svg",
    code: "ECO-05",
    photo:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1400&q=85",
  },
];

const process = [
  {
    title: "Decode the brief",
    text: "Product, filling line, destination, cost and shelf-life become one precise working brief.",
    icon: PackageOpen,
    photo:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2200&q=88",
    label: "Brief / constraints",
  },
  {
    title: "Engineer the system",
    text: "Structure, barrier, dimensions, closure, secondary pack and pallet logic resolve together.",
    icon: Box,
    photo:
      "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=2200&q=88",
    label: "Structure / materials",
  },
  {
    title: "Prototype & prove",
    text: "Samples, transport simulation, performance assessment and compliance checks remove launch risk.",
    icon: ClipboardCheck,
    photo:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=2200&q=88",
    label: "Prototype / validation",
  },
  {
    title: "Qualify & produce",
    text: "Approved suppliers, production coordination and quality checkpoints keep execution aligned.",
    icon: Factory,
    photo:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=2200&q=88",
    label: "Factory / quality",
  },
  {
    title: "Document & ship",
    text: "Inspection, export paperwork, freight, customs and destination requirements close the loop.",
    icon: Ship,
    photo:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2200&q=88",
    label: "Export / delivery",
  },
];

export default function PackagingExperience() {
  const root = useRef<HTMLDivElement>(null);
  const [activeMaterial, setActiveMaterial] = useState(0);

  useEffect(() => {
    if (!root.current) return;
    let ctx: { revert: () => void } | undefined;
    let removeScrollFallback: (() => void) | undefined;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled) return;
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((el) => {
          gsap.from(el, {
            y: 46,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        const scenes = gsap.utils.toArray<HTMLElement>(
          "[data-cinematic-scene]",
        );
        const meters = gsap.utils.toArray<HTMLElement>(
          "[data-cinematic-meter]",
        );
        gsap.set(scenes, { autoAlpha: 0, scale: 1.07 });
        gsap.set(scenes[0], { autoAlpha: 1, scale: 1 });
        gsap.set(meters, { scaleX: 0, transformOrigin: "left center" });

        const cinematic =
          root.current?.querySelector<HTMLElement>("[data-cinematic]");
        if (cinematic) {
          const renderProgress = (progress: number) => {
            const position = progress * (scenes.length - 1);
            const activeIndex = Math.min(
              scenes.length - 1,
              Math.floor(position),
            );
            const blend = position - activeIndex;

            scenes.forEach((scene, index) => {
              const alpha =
                index === activeIndex
                  ? 1 - blend
                  : index === activeIndex + 1
                    ? blend
                    : 0;
              gsap.set(scene, {
                autoAlpha: alpha,
                scale: 1.035 - alpha * 0.035,
              });
            });
            meters.forEach((meter, index) => {
              gsap.set(meter, {
                scaleX: gsap.utils.clamp(
                  0,
                  1,
                  progress * scenes.length - index,
                ),
              });
            });
          };

          const trigger = ScrollTrigger.create({
            trigger: cinematic,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => renderProgress(self.progress),
          });

          let frame = 0;
          const updateFromNativeScroll = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
              const rect = cinematic.getBoundingClientRect();
              const distance = Math.max(
                1,
                cinematic.offsetHeight - window.innerHeight,
              );
              renderProgress(gsap.utils.clamp(0, 1, -rect.top / distance));
            });
          };
          window.addEventListener("scroll", updateFromNativeScroll, {
            passive: true,
          });
          window.addEventListener("resize", updateFromNativeScroll);
          updateFromNativeScroll();
          removeScrollFallback = () => {
            trigger.kill();
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", updateFromNativeScroll);
            window.removeEventListener("resize", updateFromNativeScroll);
          };
        }

        gsap.to("[data-orbit]", {
          rotate: 360,
          duration: 24,
          repeat: -1,
          ease: "none",
        });
      }, root);
    })();
    return () => {
      cancelled = true;
      removeScrollFallback?.();
      ctx?.revert();
    };
  }, []);

  const active = materials[activeMaterial];
  return (
    <div ref={root} className={styles.root}>
      <section id="packaging" className={styles.services}>
        <div className={styles.photoWash} />
        <div className={styles.gridTexture} />
        <div className="container">
          <div className={styles.head} data-rise>
            <div>
              <p className={styles.kicker}>Packaging consultancy / exports</p>
              <h2>
                Not another box.
                <br />
                <em>A working system.</em>
              </h2>
            </div>
            <p>
              Structure, material, compliance, supply and logistics—resolved as
              one packaging programme.
            </p>
          </div>
          <div className={styles.serviceGrid}>
            {services.map(({ icon: Icon, ...s }) => (
              <article key={s.n} className={styles.serviceCard} data-rise>
                <img src={s.asset} alt="" />
                <div className={styles.serviceTop}>
                  <span>{s.n}</span>
                  <Icon size={19} />
                </div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </article>
            ))}
          </div>
          <Link href="/packaging" className={styles.explore}>
            Explore the complete packaging practice <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      <section className={styles.materials}>
        <div
          className={styles.materialPhoto}
          style={{ backgroundImage: `url(${active.photo})` }}
        />
        <div className="container">
          <div className={styles.head} data-rise>
            <div>
              <p className={styles.kicker}>Material exports</p>
              <h2>
                Five material families.
                <br />
                Five different jobs.
              </h2>
            </div>
            <p>
              Hover, focus or tap a material. Photography, illustration and
              specifications change together.
            </p>
          </div>
          <div className={styles.materialStage} data-rise>
            <div className={styles.materialVisual}>
              <div className={styles.orbit} data-orbit />
              <div className={styles.assetKey}>{active.code}</div>
              <img
                key={active.asset}
                src={active.asset}
                alt={`${active.title} packaging illustration`}
              />
              <div className={styles.assetCaption}>
                <span>{active.subtitle}</span>
                <strong>{active.title}</strong>
              </div>
            </div>
            <div className={styles.materialList}>
              {materials.map((m, i) => (
                <button
                  key={m.title}
                  onMouseEnter={() => setActiveMaterial(i)}
                  onFocus={() => setActiveMaterial(i)}
                  onClick={() => setActiveMaterial(i)}
                  className={i === activeMaterial ? styles.materialActive : ""}
                >
                  <span>0{i + 1}</span>
                  <div>
                    <strong>{m.title}</strong>
                    <small>{m.text}</small>
                  </div>
                  <ArrowUpRight size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.products}>
        <div className={styles.productsPhoto} />
        <div className="container">
          <div className={styles.head} data-rise>
            <div>
              <p className={styles.kicker}>Export catalogue</p>
              <h2>Compact cards. Useful decisions.</h2>
            </div>
            <Link href="/products">
              Open all products <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className={styles.productGrid}>
            {featuredProducts.slice(0, 10).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cinematic} data-cinematic>
        <div className={styles.cinematicStage} data-cinematic-stage>
          {process.map(({ icon: Icon, ...scene }, index) => (
            <article
              key={scene.title}
              className={styles.cinematicScene}
              data-cinematic-scene
              style={{
                backgroundImage: `linear-gradient(90deg,rgba(7,16,29,.94) 0%,rgba(7,16,29,.72) 45%,rgba(7,16,29,.18) 100%),url(${scene.photo})`,
              }}
            >
              <div className={styles.sceneGrid} />
              <div className={styles.sceneNumber}>0{index + 1}</div>
              <div className={`container ${styles.sceneContent}`}>
                <div className={styles.sceneCopy}>
                  <p className={styles.kicker}>
                    Cinematic GSAP story / {scene.label}
                  </p>
                  <Icon size={38} />
                  <h2>{scene.title}</h2>
                  <p>{scene.text}</p>
                </div>
                <div className={styles.sceneDiagram}>
                  <span>PACK SYSTEM</span>
                  <div className={styles.sceneBox}>
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </div>
            </article>
          ))}
          <div className={styles.cinematicNav}>
            {process.map((item, index) => (
              <div key={item.title}>
                <span>0{index + 1}</span>
                <i>
                  <b data-cinematic-meter />
                </i>
                <small>{item.title}</small>
              </div>
            ))}
          </div>
          <div className={styles.scrollCue}>
            Scroll to build the system <span>↓</span>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaBand} data-rise>
            <span className={styles.ctaIndex}>06 / NEXT</span>
            <div className={styles.ctaCopy}>
              <p>One product. One destination. One clear starting point.</p>
              <h2>Ready to build the pack?</h2>
            </div>
            <Link href="/contact" className={styles.ctaRound}>
              Start brief <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
