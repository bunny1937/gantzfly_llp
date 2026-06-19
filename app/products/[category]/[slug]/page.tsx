import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { client } from "@/sanity/lib/client";
import { productBySlugQuery } from "@/sanity/lib/queries";
import ProductQuoteActions from "@/components/product/ProductQuoteActions";
import type { Product } from "@/types";
import ProductImageCarousel from "./ProductImageCarousel";
import styles from "../../products.module.css";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const products = await client.fetch(`
    *[_type=="product"]{
      category,
      "slug": slug.current
    }
  `);

  return products;
}

function getRelatedProducts(category: string, slug: string) {
  return products
    .filter((item) => item.category === category && item.slug !== slug)
    .slice(0, 3);
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const product: Product = await client.fetch(productBySlugQuery, {
    category,
    slug,
  });
  if (!product) notFound();

  const relatedProducts = getRelatedProducts(category, slug);

  const productHighlights = [
    `Origin: ${product.origin}`,
    `Grade: ${product.grade}`,
    `MOQ: ${product.moq} ${product.moqUnit}`,
    "Trade pricing: Available on request",
    "Shipment terms: EXW / FOB / CIF",
    "Documentation support available",
  ];

  const buyerNotes = [
    "Suitable for importers, distributors, private label buyers, and retail sourcing teams.",
    "Packaging can be aligned to wholesale, distributor, or shelf-ready requirements.",
    "Final pricing depends on grade, packaging, quantity, and shipment term.",
    "COA, COO, phytosanitary, and other export documents can be discussed during confirmation.",
  ];

  return (
    <>
      <section className="section">
        <div className="container">
          <div className={styles.layoutGrid}>
            <div className={styles.imageSticky}>
              <ProductImageCarousel
                images={[
                  product.image,
                  product.image,
                  product.image,
                  product.image,
                ]}
                name={product.name}
              />
            </div>

            <div className={styles.detailColumn}>
              <div className={`card ${styles.mainCard}`}>
                <span className="eyebrow">
                  {product.category.replace("-", " ")}
                </span>

                <h1 className={`text-display ${styles.title}`}>
                  {product.name}
                </h1>

                <p className={`text-description ${styles.shortDesc}`}>
                  {product.shortDescription}
                </p>

                <div className={styles.metaChips}>
                  <span className="chip">{product.origin}</span>
                  <span className="chip">{product.grade}</span>
                  <span className="chip">
                    MOQ: {product.moq} {product.moqUnit}
                  </span>
                </div>

                <div className={styles.highlightList}>
                  {productHighlights.map((item) => (
                    <div key={item} className={styles.highlightItem}>
                      <span aria-hidden="true" className={styles.bullet} />
                      <span
                        className={`text-highlights ${styles.highlightText}`}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className={styles.quoteBox}>
                  <ProductQuoteActions product={product} />
                </div>
              </div>

              <div className={styles.specGrid}>
                <div className={`card ${styles.cardPad}`}>
                  <p className="eyebrow">Export Summary</p>
                  <h2 className={styles.cardHeading}>Product description</h2>
                  <p className={`text-desc ${styles.descBody}`}>
                    {product.description}
                  </p>
                </div>

                <div className={`card ${styles.cardPad}`}>
                  <p className="eyebrow">Trade Specifications</p>
                  <div className={styles.specBody}>
                    <div className="table-wrap">
                      <table className="table">
                        <tbody>
                          <tr>
                            <th>Origin</th>
                            <td>{product.origin}</td>
                          </tr>
                          <tr>
                            <th>Grade</th>
                            <td>{product.grade}</td>
                          </tr>
                          <tr>
                            <th>MOQ</th>
                            <td>
                              {product.moq} {product.moqUnit}
                            </td>
                          </tr>
                          <tr>
                            <th>Price</th>
                            <td>Available on request</td>
                          </tr>
                          <tr>
                            <th>Shipment</th>
                            <td>EXW / FOB / CIF</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className={`card ${styles.cardPad}`}>
                  <p className="eyebrow">Packaging Options</p>
                  <ul className={`clean-list ${styles.packList}`}>
                    {product.packagingOptions.map((pack) => (
                      <li key={pack}>{pack}</li>
                    ))}
                  </ul>
                </div>

                <div className={`card ${styles.cardPad}`}>
                  <p className="eyebrow">Certifications & Markets</p>
                  <div className={styles.certBody}>
                    <div>
                      <p className="kicker">Certifications</p>
                      <div className={`chip-row ${styles.chipRowTight}`}>
                        {product.certifications.map((cert) => (
                          <span key={cert} className="chip">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="kicker">Export markets</p>
                      <div className={`chip-row ${styles.chipRowTight}`}>
                        {product.exportMarkets.map((market) => (
                          <span key={market} className="chip">
                            {market}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`card ${styles.cardPad}`}>
                <p className="eyebrow">Buyer Notes</p>
                <h2 className={styles.cardHeading}>Trade enquiry guidance</h2>

                <div className={styles.noteList}>
                  {buyerNotes.map((item) => (
                    <div key={item} className={styles.noteItem}>
                      <span aria-hidden="true" className={styles.bullet} />
                      <span className={`text-buyernotes ${styles.noteText}`}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="section-sm">
          <div className="container">
            <div className={styles.relatedHead}>
              <div>
                <p className="eyebrow">Related Products</p>
                <h2 className={styles.relatedTitle}>
                  Explore more from this category
                </h2>
              </div>

              <Link
                href={`/products/${product.category}`}
                className="btn btn-secondary"
              >
                View Category
              </Link>
            </div>

            <div className={styles.relatedGrid}>
              {relatedProducts.map((item) => (
                <article key={item.id} className="card">
                  <div className={styles.relatedThumb}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      className={styles.imgCover}
                    />
                  </div>

                  <div className={styles.cardPad}>
                    <span className="eyebrow">
                      {item.category.replace("-", " ")}
                    </span>
                    <h3 className={styles.relatedName}>{item.name}</h3>
                    <p className={`text-muted ${styles.relatedDesc}`}>
                      {item.shortDescription}
                    </p>

                    <div className={`chip-row ${styles.chipRowMt}`}>
                      <span className="chip">{item.grade}</span>
                      <span className="chip">
                        MOQ: {item.moq} {item.moqUnit}
                      </span>
                    </div>

                    <div className={styles.relatedActions}>
                      <Link
                        href={`/products/${item.category}/${item.slug}`}
                        className="btn btn-primary"
                      >
                        View Product
                      </Link>
                      <Link href="/quote-cart" className="btn btn-secondary">
                        Add to Quote
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
