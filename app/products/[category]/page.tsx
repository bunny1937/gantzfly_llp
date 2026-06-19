import { notFound } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types";
import { categories } from "@/data/products";
import { getCategoryMeta } from "@/lib/catalog";
import { client } from "@/sanity/lib/client";
import { productsByCategoryQuery } from "@/sanity/lib/queries";
import type { ProductCategory } from "@/types";
import styles from "../products.module.css";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: ProductCategory }>;
}) {
  const { category } = await params;
  const categoryMeta = getCategoryMeta(category);
  const items: Product[] = await client.fetch(productsByCategoryQuery, {
    category,
  });

  if (!categoryMeta) notFound();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{categoryMeta.name}</span>
          <h1 className={`hero-title ${styles.pageTitle}`}>
            {categoryMeta.name} for importers and distributors.
          </h1>
          <p className="hero-text">{categoryMeta.description}</p>
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
          <div className="product-grid">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
