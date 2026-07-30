export type ServiceDetail = {
  slug: string;
  label: string;
  title: string;
  tagline: string;
  background: string;
  decor: string;
  intro: string[];
  offer: { title: string; copy: string }[];
  deliverables: string[];
};

export const services: ServiceDetail[] = [
  {
    slug: "packaging-consultancy",
    label: "Packaging Consultancy Services",
    title: "Packaging that lowers cost and passes inspection.",
    tagline:
      "Concept development, structural design, material selection, testing and vendor qualification for food and FMCG exporters.",
    background: "/assets/backgrounds/services.jpg",
    decor: "/assets/decor/crate-lines.svg",
    intro: [
      "Packaging affects cost, shelf life, compliance, handling and whether a buyer trusts the product on arrival. Our consultancy practice works on all five at once rather than treating packaging as a print job at the end of the process.",
      "We start from the product, the destination market and the transport route, then work back to the format, material and specification that survive the journey at the lowest sensible cost.",
    ],
    offer: [
      {
        title: "Design & development",
        copy: "Concept development, structural design, material selection, specifications and optimisation studies.",
      },
      {
        title: "Cost reduction",
        copy: "Material consumption analysis, packaging redesign, vendor rationalisation and supply-chain optimisation.",
      },
      {
        title: "Compliance support",
        copy: "Food-contact requirements, labelling, export standards and sustainability requirements.",
      },
      {
        title: "Testing & validation",
        copy: "Transport simulation, performance assessment, shelf-life support and packaging audits.",
      },
      {
        title: "Vendor qualification",
        copy: "Supplier identification, vendor audits, qualification systems and approved-vendor management.",
      },
    ],
    deliverables: [
      "Packaging specification sheet",
      "Material and cost comparison",
      "Prototype and sample review",
      "Transport simulation report",
      "Approved vendor shortlist",
      "Compliance and labelling checklist",
    ],
  },
  {
    slug: "packaging-material-exports",
    label: "Packaging Material Exports",
    title: "Qualified Indian packaging material, shipped to your plant.",
    tagline:
      "Films, laminates, cartons, closures, jars and secondary packaging sourced from audited Indian manufacturers.",
    background: "/assets/backgrounds/about.jpg",
    decor: "/assets/decor/crate-lines.svg",
    intro: [
      "India has deep packaging manufacturing capacity across flexible films, rigid containers, corrugated boxes and closures. The difficulty for an overseas buyer is not availability, it is qualification: knowing which plant can hold specification at your volume.",
      "We identify, audit and manage that supply base for you, then handle the export process the same way we handle food consignments.",
    ],
    offer: [
      {
        title: "Flexible packaging",
        copy: "Laminates, pouches, stand-up formats, printed rolls and barrier structures.",
      },
      {
        title: "Rigid packaging",
        copy: "Jars, bottles, containers, caps and closures across food-grade resins.",
      },
      {
        title: "Secondary packaging",
        copy: "Corrugated cartons, shippers, trays, inserts and pallet configurations.",
      },
      {
        title: "Supply management",
        copy: "Vendor audits, pre-dispatch inspection, consolidated loading and shipment tracking.",
      },
    ],
    deliverables: [
      "Material specification and drawing approval",
      "Audited manufacturer shortlist",
      "Pre-production and bulk samples",
      "Pre-dispatch inspection report",
      "Consolidated container planning",
      "Full export documentation set",
    ],
  },
  {
    slug: "private-label",
    label: "Private Label Product Development",
    title: "Your brand, built from concept to first container.",
    tagline:
      "Product sourcing, formulation, packaging development, label design support, regulatory documentation and production coordination.",
    background: "/assets/backgrounds/director.jpg",
    decor: "/assets/decor/spice-burst.svg",
    intro: [
      "Retailers, distributors and new brands increasingly want their own label rather than a trading house label. That requires a partner who can hold the product, the packaging and the paperwork together.",
      "We run private-label programmes end to end: sourcing the product, developing the pack, preparing the documentation and coordinating production until the first container ships.",
    ],
    offer: [
      {
        title: "Product sourcing",
        copy: "Origin and processor selection matched to your grade, price point and volume.",
      },
      {
        title: "Formula development",
        copy: "Blends, roast profiles, flavour and grind specification developed against your samples.",
      },
      {
        title: "Packaging development",
        copy: "Format, material, artwork adaptation and shelf-life validation for the destination market.",
      },
      {
        title: "Regulatory documentation",
        copy: "Labelling, nutritional declaration, certification and export paperwork.",
      },
      {
        title: "Production coordination",
        copy: "Line planning, batch supervision, quality checks and dispatch scheduling.",
      },
    ],
    deliverables: [
      "Product and packaging brief",
      "Costed sourcing options",
      "Approved samples and artwork",
      "Regulatory and label documentation",
      "Production and inspection schedule",
      "First container dispatch plan",
    ],
  },
  {
    slug: "sustainable-packaging",
    label: "Sustainable Packaging",
    title: "Lower material, recyclable formats, same shelf life.",
    tagline:
      "Recyclable structures, mono-material transitions, material reduction and responsible sourcing without compromising protection.",
    background: "/assets/backgrounds/mission.jpg",
    decor: "/assets/decor/leaf-grid.svg",
    intro: [
      "Sustainability requirements now arrive from regulators, retailers and consumers at the same time. The practical challenge is meeting them without losing barrier performance or adding cost that the category cannot carry.",
      "We treat it as an engineering problem: reduce material where the pack allows, move to recyclable structures where the product allows, and validate that shelf life holds before the change is approved.",
    ],
    offer: [
      {
        title: "Material reduction",
        copy: "Gauge and grammage optimisation, right-sizing and pallet efficiency studies.",
      },
      {
        title: "Recyclable structures",
        copy: "Mono-material laminates, paper-based formats and recyclable rigid options.",
      },
      {
        title: "Responsible sourcing",
        copy: "Certified board, recycled content and audited supplier practice.",
      },
      {
        title: "Validation",
        copy: "Shelf-life testing, transport simulation and compliance review before rollout.",
      },
    ],
    deliverables: [
      "Current pack material audit",
      "Reduction and substitution options",
      "Recyclability assessment",
      "Shelf-life validation plan",
      "Cost impact comparison",
      "Phased rollout schedule",
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
