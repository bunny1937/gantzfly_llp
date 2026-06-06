# PROJECT.md — GiantzFly Exim LLP
> Single source of truth for this project.  
> Read this before every session. Every decision traces back to this file.

***

## 1. PROJECT IDENTITY

| Field | Value |
|---|---|
| **Brand name** | GiantzFly Exim LLP |
| **Legal entity** | LLP (Limited Liability Partnership) |
| **Domain** | giantzfly.com |
| **Type** | B2B Export Catalog + Quote Cart Website |
| **Category** | Food Export / Agri-commodity / Import-Export |
| **Industry** | Indian Spices · Makhana · Dry Fruits — International Trade |
| **Base country** | India |
| **Export markets** | USA · UK · Germany · France · South Africa · Nigeria · UAE |
| **Stack** | Next.js (App Router) · React · CSS Modules · GSAP · Local product data |

***

## 2. THE MOTTO

> **"From Indian Origins to Global Markets."**

Secondary line:
> **"Farm-direct. Lab-certified. Export-ready for your shelf."**

These two lines define every copywriting decision. Every headline, CTA, and section label must be traceable to this positioning.

***

## 3. THE GOAL

**Primary goal:** Convert international buyers (importers, distributors, supermarket buyers, sourcing teams) into direct trade enquiries via WhatsApp and email — without any login, payment, or backend complexity.

**Secondary goal:** Establish GiantzFly as a credible, export-grade, internationally trustworthy supply partner — not a local Indian grocery shop.

**This is NOT:**
- A retail e-commerce site
- A COD/home-delivery platform
- A domestic Indian market site
- A generic brochure site
- A full SaaS product

**This IS:**
- A premium B2B catalog
- A quote cart / trade enquiry system
- A brand experience for international buyers
- A trust-building platform for distributors and retailers abroad

***

## 4. TARGET AUDIENCE

**Primary buyers (speak ONLY to these people):**

| Buyer type | What they need to see |
|---|---|
| Importers / sourcing teams | MOQ, export certifications, port of loading, lead time |
| Distributors | Private label options, bulk packaging, consistency |
| Supermarket / mart buyers | Retail-ready packaging, custom grades, shelf-ready products |
| Online grocery / D2C private label brands | Custom packaging, brand-neutral supply, flexible MOQ |
| International retailers | Export documentation, certifications, compliance |

**Audience is NOT:**
- Indian end consumers
- COD shoppers
- Local restaurant/food service buyers (unless international)
- Generic "everyone" — this site has one audience: foreign buyers

**Geographic targeting:** USA · UK · Europe (Germany, France) · Africa (South Africa, Nigeria) · UAE

***

## 5. PRODUCT CATALOG

### Category 1 — Spices
| Product | Origin | Grade/Type | MOQ | Certifications |
|---|---|---|---|---|
| Turmeric Finger | Erode, Tamil Nadu | Premium Export Grade | 5 MT | FSSAI · APEDA |
| Cumin Seeds | Unjha, Gujarat | Bold Export Grade | 5 MT | FSSAI · APEDA |
| Black Pepper | Wayanad, Kerala | MG1 Grade | 2 MT | FSSAI · APEDA |
| Coriander Seeds | Rajkot, Gujarat | Eagle Grade | 5 MT | FSSAI · APEDA |
| Red Chilli | Guntur, Andhra Pradesh | S4 / Teja | 5 MT | FSSAI · APEDA |
| Green Cardamom | Idukki, Kerala | 8mm Bold | 500 kg | FSSAI · APEDA |

### Category 2 — Makhana (Fox Nuts)
| Product | Origin | Type | MOQ | Certifications |
|---|---|---|---|---|
| Fox Nuts Grade A | Darbhanga, Bihar | Premium Sutta | 1 MT | FSSAI · APEDA |
| Fox Nuts Grade B | Madhubani, Bihar | Standard Sutta | 2 MT | FSSAI · APEDA |
| Roasted Makhana | Darbhanga, Bihar | Plain Roasted | 500 kg | FSSAI · APEDA |
| Flavoured Makhana | Bihar | 500 kg per flavour | 500 kg/flavour | FSSAI · APEDA |

### Category 3 — Dry Fruits
| Product | Origin | Grade | MOQ | Certifications |
|---|---|---|---|---|
| Cashew Nuts | Goa / Kerala / Odisha | W180 / W240 / W320 | 2 MT | FSSAI · APEDA |
| Almonds | Mamra — Import-grade India processing | Mamra / California | 2 MT | FSSAI · APEDA |
| Golden Raisins | Nashik, Maharashtra | Export Grade | 3 MT | FSSAI · APEDA |
| Walnuts | Jammu & Kashmir | Light Amber / Extra Light | 1 MT | FSSAI · APEDA |
| Pistachios | India Processing | Export Grade | 1 MT | FSSAI · APEDA |

### Product Data Shape (local constants)
```ts
type Product = {
  id: string;
  slug: string;
  name: string;
  category: 'spices' | 'makhana' | 'dry-fruits';
  subcategory?: string;
  origin: string;
  grade: string;
  shortDescription: string;
  description: string;
  packagingOptions: string[];
  moq: string;
  moqUnit: string;
  certifications: string[];
  tags: string[];
  exportMarkets: string[];
  featured: boolean;
  image: string;
  badge?: string;
}
```

***

## 6. SITE ARCHITECTURE

### Routes
```
/                            Home
/products                    Full catalog (all categories)
/products/spices             Category page — Spices
/products/makhana            Category page — Makhana
/products/dry-fruits         Category page — Dry Fruits
/products/[category]/[slug]  Individual product page
/about                       About + certifications + capabilities + team
/contact                     Contact + enquiry form
/quote-cart                  Full quote cart + buyer form + send
```

***

## 7. COMMERCE MODEL — TRADE ENQUIRY SYSTEM

Language rules (enforce everywhere):

| Banned term | Use instead |
|---|---|
| Cart | Quote Cart / Trade Enquiry |
| Add to Cart | Add to Quote |
| Checkout | Send Enquiry / Submit Quote |
| Buy Now | Request This |
| Price | Available on request |
| Stock | Seasonal availability |
| Delivery | Shipment / Export |
| Free shipping | Incoterms: EXW / FOB / CIF |

### WhatsApp Message Format
```
New Export Enquiry — GiantzFly Exim LLP
——————————————
Buyer: [Name] | [Company] | [Country]
Contact: [Email] | [WhatsApp]
——————————————
PRODUCTS REQUESTED:
1. [Product] — [Grade] — [Packaging] — Qty: [X] MT
2. [Product] — [Grade] — [Packaging] — Qty: [X] MT
——————————————
Notes: [Optional]
——————————————
Sent via giantzfly.com
```

***

## 8. TECH STACK

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 14+ App Router | Static-first |
| UI | React + CSS Modules | No Tailwind |
| Animation | GSAP + ScrollTrigger | Hero + scroll sections |
| Smooth scroll | Locomotive Scroll | Hero + featured sections only |
| Page transitions | Barba.js | Route changes |
| 3D (hero) | React Three Fiber | Only if performance target met |
| Motion (components) | Framer Motion | Component transitions |
| Product data | Local TypeScript constants | /data/products.ts |
| Cart state | React Context + localStorage | Persists across refresh |
| Email | Brevo API | POST from Next.js API route |
| WhatsApp | wa.me structured URL | No API needed |
| Fonts | Fontshare: Boska + Satoshi | NO Google Fonts — ever |
| Icons | Lucide React | No emoji as design elements |

***

## 9. DESIGN DIRECTION

### Palette
```css
--color-ink:        #1a1612;   /* Deep warm near-black (NOT pure black) */
--color-text:       #1f1c18;
--color-text-muted: #6b6560;
--color-bg:         #f5f3ee;   /* Porcelain (NOT pure white) */
--color-surface:    #f8f6f2;
--color-surface-2:  #faf9f6;
--color-accent:     #c8881a;   /* Saffron/turmeric gold — ONLY non-neutral */
--color-navy:       #0f1f38;   /* Used sparingly — export credibility */
/* No purple. No violet. No gradient buttons. */
```

### Typography
```
Display: Boska (Fontshare) — italic for emotional lines
Body:    Satoshi (Fontshare) — all UI, nav, body, labels

Display at: 24px+ only
Body at:    everything below 24px
All sizes:  clamp() only — no hardcoded px
Tracking:   -0.02em to -0.04em on large headings
            +0.12em on uppercase micro-labels
```

### Layout Principles
- Left-aligned by default. Center only for solo hero display lines.
- No 3-column identical card grids — ever.
- Asymmetric product grids (2+1, bento, varying sizes).
- Vary section padding — not uniform.
- Max 1-2 full-bleed breakout moments per page.
- Authored line-break headings (not automatic wrapping).

***

## 10. COPY RULES

### Voice
- Direct. Specific. Buyer-facing.
- Export terminology: MOQ, incoterms, port of loading, lead time, COA, COO, phytosanitary.

### BANNED copy
- "Welcome to GiantzFly"
- "Empowering your journey"
- "Your trusted partner in excellence"
- "We are passionate about spices"

### USE instead
- "For your shelves" not "for you"
- "Export-ready from farm to port"
- "Supplied to distributors in 7 countries" — specific
- "Minimum order: 5 MT. Lead time: 21 days." — operational

***

## 11. CERTIFICATIONS

| Cert | Full name | Market |
|---|---|---|
| FSSAI | Food Safety and Standards Authority of India | All |
| APEDA | Agricultural & Processed Food Products Export Development Authority | All export |
| ISO 22000 | Food Safety Management System | International |
| USDA Organic | US Dept of Agriculture — National Organic Program | USA |
| EU Organic | European Commission Organic Regulation | EU |
| Spices Board | Spices Board India — Export Certificate | All spice exports |

***

## 12. REFERENCE SITES

Read before EVERY design decision:

| Site | Key lesson |
|---|---|
| https://landonorris.com/ | Scroll-interlocked image+text, authored line-breaks, persistent CTA |
| https://cornrevolution.resn.global/ | 3D world as hero, discovery Easter eggs |
| https://theshift.tokyo/en/ | Real-time contextual element, magnetic headings |
| https://persepolis.getty.edu/ | Progressive disclosure, parallax depth, in-context annotation |
| https://watson.la/ | Extreme whitespace, hierarchy through weight only |
| https://obsidianassembly.com/ | Information withholding, log-format content, literary micro-copy |

***

## 13. WORKFLOW

### Every session start
```
mem-search → learn-codebase → smart-explore
```

### Planning
```
brainstorming → writing-plans → make-plan → GET APPROVAL → build
```

### Building UI
```
frontend-design → high-end-visual-design → brandkit → build → impeccable
```

### Motion/3D
```
web3d-integration-patterns → gsap-scrolltrigger → locomotive-scroll
→ react-three-fiber (hero only) → motion-framer → barba-js
```

### Before every commit
```
review → verification-before-completion → caveman-commit
```

***

## 14. HARD CONSTRAINTS (NEVER VIOLATE)

- NO Google Fonts — ever
- NO gradient buttons
- NO colored side borders on cards
- NO 3-column identical feature grids
- NO pure black (#000) or pure white (#fff)
- NO floating decorative blobs/orbs/wavy dividers
- NO hardcoded font sizes (clamp() only)
- NO black-box product images — real photography required
- NO MRP, COD, free delivery, or Indian retail language
- verification-before-completion runs before EVERY phase is marked done
- caveman-commit used for EVERY commit

***

## 15. CURRENT BUILD STATUS

| Area | Status | Notes |
|---|---|---|
| Routing / pages | Done | Home, Products, Category, Product, About, Contact, Quote Cart |
| Product data | Done | Local constants, all 15 products |
| Quote cart | Done | Drawer + localStorage + WhatsApp send |
| Contact form | Done | Brevo integration |
| Header / Footer | Done | NY/LDN clock, nav, certifications in footer |
| Design system | Weak | Functional but template-level. Full revamp needed. |
| Product images | Missing | All black boxes — real photography needed urgently |
| Hero | Basic | Static, no cinematic entrance, no signature moment |
| Motion / GSAP | Missing | Zero scroll-driven animation |
| Typography | Weak | No authored line-breaks, no magnetic headings |
| Awwwards bar | Not met | Functionally complete, visually generic |

### Next priority
Full design + motion revamp. Skeleton is done. Now make it unforgettable.

***

> Last updated: June 2026  
> Every session must start: read PROJECT.md + SKILLS.md + AWWWARDS_DESIGN_BIBLE.md