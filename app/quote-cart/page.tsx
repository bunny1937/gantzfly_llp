"use client";

import Link from "next/link";
import { useMemo, useState, ChangeEvent, SetStateAction } from "react";
import { useQuoteCart } from "@/context/QuoteCartContext";
import QuantityPicker from "@/components/product/QuantityPicker";
import { buildWhatsAppURL } from "@/lib/whatsapp";
import type { QuoteRequestItem } from "@/types";
import styles from "./page.module.css";

type QuoteLine = {
  productId?: string;
  product: string;
  grade: string;
  packaging: string;
  quantity: string;
};

type BuyerForm = {
  name: string;
  company: string;
  country: string;
  email: string;
  whatsapp: string;
  notes: string;
};

const emptyLine = (): QuoteLine => ({
  product: "",
  grade: "",
  packaging: "",
  quantity: "",
});

const initialBuyer: BuyerForm = {
  name: "",
  company: "",
  country: "",
  email: "",
  whatsapp: "",
  notes: "",
};

const tradeRules = [
  "Use Quote Cart / Trade Enquiry wording only",
  "Mention quantity in MT or kg where possible",
  "Include packaging and grade requirements",
  "Discuss EXW / FOB / CIF during trade confirmation",
];

export default function QuoteCartPage() {
  const { items, removeItem, updateItem } = useQuoteCart();
  const [customLines, setCustomLines] = useState<QuoteLine[]>([]);
  const [buyer, setBuyer] = useState<BuyerForm>(initialBuyer);

  function updateCustomLine(
    index: number,
    key: keyof QuoteLine,
    value: string,
  ) {
    setCustomLines((prev) =>
      prev.map((line, i) => (i === index ? { ...line, [key]: value } : line)),
    );
  }

  function addCustomLine() {
    setCustomLines((prev) => [...prev, emptyLine()]);
  }

  function removeCustomLine(index: number) {
    setCustomLines((prev) => prev.filter((_, i) => i !== index));
  }

  function removeCartLine(productId: string) {
    removeItem(productId);
  }

  function handleQuantityChange(
    productId: string,
    currentQuantity: number,
    nextQuantity: SetStateAction<number>,
  ) {
    const quantity =
      typeof nextQuantity === "number"
        ? nextQuantity
        : nextQuantity(currentQuantity);

    updateItem(productId, { quantity });
  }

  function updateBuyer(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setBuyer((prev) => ({ ...prev, [name]: value }));
  }

  const whatsappUrl = useMemo(() => {
    const cartItems: QuoteRequestItem[] = items.map((item) => ({
      product: {
        name: item.product.name,
        grade: item.product.grade || "As required",
        moqUnit: item.product.moqUnit,
      },
      packaging: item.packaging || "To be discussed",
      quantity: item.quantity
        ? `${item.quantity} ${item.product.moqUnit}`.trim()
        : "MOQ discussion",
    }));

    const manualItems: QuoteRequestItem[] = customLines
      .filter((line) => line.product.trim().length > 0)
      .map((line) => ({
        product: {
          name: line.product,
          grade: line.grade || "As required",
          moqUnit: "",
        },
        packaging: line.packaging || "To be discussed",
        quantity: line.quantity || "MOQ discussion",
      }));

    return buildWhatsAppURL(buyer, [...cartItems, ...manualItems]);
  }, [items, customLines, buyer]);

  return (
    <section className="section">
      <div className="container">
        <div className={styles.hero}>
          <p className="eyebrow">Quote Cart</p>
          <h1 className={styles.heroTitle}>
            Build a trade enquiry with the products you want quoted.
          </h1>
          <p className={styles.heroText}>
            Add products, mention grade and packaging, then send the enquiry to
            GiantzFly by WhatsApp or email. This is a B2B quote flow, not a
            retail checkout.
          </p>
        </div>

        <div className={styles.pageGrid}>
          <section className={`card ${styles.quotePanel}`}>
            <div className={styles.sectionHead}>
              <div>
                <p className="eyebrow">Products Requested</p>
                <h2 className={styles.sectionTitle}>Enquiry lines</h2>
              </div>

              <button
                type="button"
                className="btn btn--outline"
                onClick={addCustomLine}
              >
                Add Custom Line
              </button>
            </div>

            <div className={styles.lineList}>
              {items.length > 0 ? (
                items.map((item) => (
                  <div key={item.product.id} className={styles.cartItem}>
                    <div className={styles.cartItemMeta}>
                      <p className={styles.cartTitle}>{item.product.name}</p>
                      <p className={styles.cartSub}>
                        {item.product.grade} • {item.packaging}
                      </p>
                    </div>

                    <div className={styles.cartItemActions}>
                      <QuantityPicker
                        value={item.quantity}
                        onChange={(nextQuantity) =>
                          handleQuantityChange(
                            item.product.id,
                            item.quantity,
                            nextQuantity,
                          )
                        }
                      />
                      <button
                        type="button"
                        onClick={() => removeCartLine(item.product.id)}
                        className="btn btn--ghost btn--sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyState}>
                  <p>
                    Your quote cart is empty. Add products from the catalog.
                  </p>
                  <Link href="/products" className="btn btn-primary">
                    Browse Products
                  </Link>
                </div>
              )}

              <div className={styles.manualSection}>
                <div className={styles.sectionHead}>
                  <div>
                    <p className="eyebrow">Custom Enquiry</p>
                    <p className={styles.sectionSubTitle}>
                      Add a line manually for custom requests.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn--outline"
                    onClick={addCustomLine}
                  >
                    Add Custom Line
                  </button>
                </div>

                {customLines.map((line, index) => (
                  <div key={index} className={styles.lineCard}>
                    <div className={styles.lineCardHead}>
                      <p className={styles.lineCardTitle}>
                        Custom line {index + 1}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeCustomLine(index)}
                        className="btn btn--ghost btn--sm"
                      >
                        Remove
                      </button>
                    </div>

                    <div className={styles.lineGridTop}>
                      <div className="form-group">
                        <label
                          className="form-label"
                          htmlFor={`product-${index}`}
                        >
                          Product
                        </label>
                        <input
                          id={`product-${index}`}
                          className="form-input"
                          value={line.product}
                          onChange={(e) =>
                            updateCustomLine(index, "product", e.target.value)
                          }
                          placeholder="Cumin Seeds"
                        />
                      </div>

                      <div className="form-group">
                        <label
                          className="form-label"
                          htmlFor={`grade-${index}`}
                        >
                          Grade
                        </label>
                        <input
                          id={`grade-${index}`}
                          className="form-input"
                          value={line.grade}
                          onChange={(e) =>
                            updateCustomLine(index, "grade", e.target.value)
                          }
                          placeholder="Bold Export Grade"
                        />
                      </div>
                    </div>

                    <div className={styles.lineGridBottom}>
                      <div className="form-group">
                        <label
                          className="form-label"
                          htmlFor={`packaging-${index}`}
                        >
                          Packaging
                        </label>
                        <input
                          id={`packaging-${index}`}
                          className="form-input"
                          value={line.packaging}
                          onChange={(e) =>
                            updateCustomLine(index, "packaging", e.target.value)
                          }
                          placeholder="25 kg PP bags"
                        />
                      </div>

                      <div className="form-group">
                        <label
                          className="form-label"
                          htmlFor={`quantity-${index}`}
                        >
                          Quantity
                        </label>
                        <input
                          id={`quantity-${index}`}
                          className="form-input"
                          value={line.quantity}
                          onChange={(e) =>
                            updateCustomLine(index, "quantity", e.target.value)
                          }
                          placeholder="5 MT"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className={styles.sideRail}>
            <section className={`card ${styles.buyerPanel}`}>
              <p className="eyebrow">Buyer Details</p>

              <div className={styles.buyerFields}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Buyer Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="form-input"
                    value={buyer.name}
                    onChange={updateBuyer}
                    placeholder="John Carter"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="company">
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    className="form-input"
                    value={buyer.company}
                    onChange={updateBuyer}
                    placeholder="Carter Foods LLC"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="country">
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    className="form-input"
                    value={buyer.country}
                    onChange={updateBuyer}
                    placeholder="United Kingdom"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    value={buyer.email}
                    onChange={updateBuyer}
                    placeholder="buyer@company.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="whatsapp">
                    WhatsApp
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    className="form-input"
                    value={buyer.whatsapp}
                    onChange={updateBuyer}
                    placeholder="+44 7XXX XXXXXX"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="notes">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    className={`form-textarea ${styles.notesField}`}
                    value={buyer.notes}
                    onChange={updateBuyer}
                    placeholder="Mention destination port, certifications, private label, or shipment terms."
                  />
                </div>
              </div>
            </section>
          </aside>
          <section className={`${styles.ctaPanel} ${styles.full}`}>
            <p className={`${styles.ctaEyebrow} eyebrow`}>Send Enquiry</p>
            <h2 className={styles.ctaTitle}>
              Move this quote request into conversation.
            </h2>
            <p className={styles.ctaText}>
              Use WhatsApp for the fastest handoff, or send your requirement by
              email for structured procurement communication.
            </p>

            <div className={styles.actionGroup}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--lg"
              >
                Send via WhatsApp
              </a>

              <a
                href="mailto:giantzflyexim@gmail.com?subject=Trade%20Enquiry%20%E2%80%94%20GiantzFly%20Exim%20LLP"
                className="btn btn--ghost btn--lg"
              >
                Send by Email
              </a>

              <Link href="/products" className="btn btn--outline btn--lg">
                Browse More Products
              </Link>
            </div>

            <hr className={styles.ruleDivider} />

            <ul role="list" className={styles.ruleList}>
              {tradeRules.map((item) => (
                <li key={item} className={styles.ruleItem}>
                  <span aria-hidden="true" className={styles.ruleDot} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
