import { notFound } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { categories, products } from "@/data/products";
import { getCategoryMeta } from "@/lib/catalog";
import type { ProductCategory } from "@/types";
import styles from "../products.module.css";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: ProductCategory }>;
}) {
  const { category } = await params;
  const meta = getCategoryMeta(category);
  if (!meta) notFound();
  const items = products.filter((item) => item.category === category);
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{meta.name}</span>
          <h1 className={`hero-title ${styles.pageTitle}`}>
            {meta.name} for importers and distributors.
          </h1>
          <p className="hero-text">{meta.description}</p>
          <div className="hero-actions">
            <Link href="/products" className="btn btn-secondary">
              View Full Catalog
            </Link>
            <Link href="/quote-cart" className="btn btn-primary">
              Open Quote Cart
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className={styles.productGrid}>
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
