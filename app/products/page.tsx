import { categories } from "@/data/products";
import type { Product } from "@/types";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import ProductCard from "@/components/product/ProductCard";
import styles from "./products.module.css";

export const dynamic = "force-dynamic";

const query = `*[_type == "product"]{
  id,
  "slug": slug.current,
  name,
  category,
  origin,
  grade,
  shortDescription,
  description,
  packagingOptions,
  moq,
  moqUnit,
  certifications,
  tags,
  exportMarkets,
  featured,
  badge,
  "image": image.asset->url
}`;

async function getProducts(): Promise<Product[]> {
  return client.fetch(query);
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Full Catalog</span>
          <h1 className={`hero-title ${styles.pageTitle}`}>
            Export catalog for international buyers.
          </h1>
          <p className="hero-text">
            Browse all categories or move directly into origin-led product pages
            with grade, MOQ, packaging, and quote actions.
          </p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="grid-3">
            {categories.map((category) => (
              <div key={category.slug} className="panel">
                <div className="kicker">{category.name}</div>
                <h2 className={styles.categoryName}>{category.name}</h2>
                <p className={styles.categoryDesc}>{category.description}</p>
                <Link
                  href={`/products/${category.slug}`}
                  className={`btn btn-secondary ${styles.categoryLink}`}
                >
                  Open Category
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
