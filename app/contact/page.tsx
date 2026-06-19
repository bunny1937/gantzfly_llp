"use client";

import { useMemo, useState } from "react";
import { buildWhatsAppURL } from "@/lib/whatsapp";

type FormState = {
  name: string;
  company: string;
  country: string;
  email: string;
  whatsapp: string;
  productInterest: string;
  quantity: string;
  notes: string;
};

const initialState: FormState = {
  name: "",
  company: "",
  country: "",
  email: "",
  whatsapp: "",
  productInterest: "",
  quantity: "",
  notes: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialState);

  const enquiryUrl = useMemo(() => {
    return buildWhatsAppURL(
      {
        name: form.name,
        company: form.company,
        country: form.country,
        email: form.email,
        whatsapp: form.whatsapp,
        notes: `Product: ${form.productInterest}\nQuantity: ${form.quantity || "MOQ discussion"}\n${form.notes}`,
      },
      [],
    );
  }, [form]);

  function onChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <>
      <section className="section">
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1 className="text-display" style={{ marginTop: "var(--space-3)" }}>
            Start an export enquiry with practical details.
          </h1>
          <p
            className="text-muted"
            style={{
              marginTop: "var(--space-4)",
              maxWidth: "68ch",
              fontSize: "var(--text-lg)",
            }}
          >
            Share your product, destination market, quantity, and packaging
            requirement. This page is for trade buyers, distributors, sourcing
            teams, and private label enquiries.
          </p>

          <div
            className="contact-grid"
            style={{
              marginTop: "var(--space-10)",
              display: "grid",
              gridTemplateColumns: "0.9fr 1.1fr",
              gap: "var(--space-8)",
              alignItems: "start",
            }}
          >
            <div
              className="card"
              style={{
                padding: "var(--space-6)",
              }}
            >
              <p className="eyebrow">Trade Desk</p>

              <h2
                style={{
                  marginTop: "var(--space-3)",
                  fontSize: "var(--text-xl)",
                }}
              >
                What to include in your first message
              </h2>

              <ul
                role="list"
                style={{
                  marginTop: "var(--space-5)",
                  display: "grid",
                  gap: "var(--space-4)",
                }}
              >
                {[
                  "Product name or category",
                  "Required grade or quality preference",
                  "Quantity in MT or kg",
                  "Packaging requirement",
                  "Destination country and target market",
                  "Private label or bulk supply requirement",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      gap: "var(--space-3)",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "var(--blue)",
                        marginTop: 8,
                        flexShrink: 0,
                      }}
                    />
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>

              <hr className="divider" style={{ margin: "var(--space-6) 0" }} />

              <div style={{ display: "grid", gap: "var(--space-3)" }}>
                <div>
                  <p
                    className="text-faint"
                    style={{ fontSize: "var(--text-xs)" }}
                  >
                    Email
                  </p>
                  <a
                    href="mailto:giantzflyexim@gmail.com"
                    style={{
                      color: "var(--blue)",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    giantzflyexim@gmail.com
                  </a>
                </div>
                <div>
                  <p
                    className="text-faint"
                    style={{ fontSize: "var(--text-xs)" }}
                  >
                    Location
                  </p>
                  <p className="text-muted">Sindhudurg, Kudal, India</p>
                </div>
                <div>
                  <p
                    className="text-faint"
                    style={{ fontSize: "var(--text-xs)" }}
                  >
                    Trade Model
                  </p>
                  <p className="text-muted">
                    B2B export catalogue + quote enquiry
                  </p>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: "var(--space-8)" }}>
              <form
                onSubmit={(e) => e.preventDefault()}
                style={{ display: "grid", gap: "var(--space-5)" }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "var(--space-4)",
                  }}
                >
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">
                      Buyer Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      className="form-input"
                      value={form.name}
                      onChange={onChange}
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
                      value={form.company}
                      onChange={onChange}
                      placeholder="Carter Foods LLC"
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "var(--space-4)",
                  }}
                >
                  <div className="form-group">
                    <label className="form-label" htmlFor="country">
                      Country
                    </label>
                    <input
                      id="country"
                      name="country"
                      className="form-input"
                      value={form.country}
                      onChange={onChange}
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
                      value={form.email}
                      onChange={onChange}
                      placeholder="buyer@company.com"
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "var(--space-4)",
                  }}
                >
                  <div className="form-group">
                    <label className="form-label" htmlFor="whatsapp">
                      WhatsApp
                    </label>
                    <input
                      id="whatsapp"
                      name="whatsapp"
                      className="form-input"
                      value={form.whatsapp}
                      onChange={onChange}
                      placeholder="+44 7XXX XXXXXX"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="quantity">
                      Quantity
                    </label>
                    <input
                      id="quantity"
                      name="quantity"
                      className="form-input"
                      value={form.quantity}
                      onChange={onChange}
                      placeholder="5 MT"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="productInterest">
                    Product Interest
                  </label>
                  <select
                    id="productInterest"
                    name="productInterest"
                    className="form-select"
                    value={form.productInterest}
                    onChange={onChange}
                  >
                    <option value="">Select a product category or item</option>
                    <option value="Turmeric Finger">Turmeric Finger</option>
                    <option value="Cumin Seeds">Cumin Seeds</option>
                    <option value="Black Pepper">Black Pepper</option>
                    <option value="Red Chilli">Red Chilli</option>
                    <option value="Green Cardamom">Green Cardamom</option>
                    <option value="Fox Nuts Grade A">Fox Nuts Grade A</option>
                    <option value="Roasted Makhana">Roasted Makhana</option>
                    <option value="Cashew Nuts">Cashew Nuts</option>
                    <option value="Golden Raisins">Golden Raisins</option>
                    <option value="Walnuts">Walnuts</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="notes">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    className="form-textarea"
                    value={form.notes}
                    onChange={onChange}
                    placeholder="Mention grade, packaging, destination port, private label, documentation, or certification requirements."
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "var(--space-3)",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <a
                    href={enquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary btn--lg"
                  >
                    Send via WhatsApp
                  </a>

                  <a
                    href="mailto:giantzflyexim@gmail.com?subject=Export%20Enquiry%20%E2%80%94%20GiantzFly%20Exim%20LLP"
                    className="btn btn--ghost btn--lg"
                  >
                    Send by Email
                  </a>
                </div>

                <p
                  className="text-faint"
                  style={{ fontSize: "var(--text-xs)" }}
                >
                  Use WhatsApp for the fastest initial response. For structured
                  buying programs, include your country, product, quantity,
                  packaging, and target channel.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
