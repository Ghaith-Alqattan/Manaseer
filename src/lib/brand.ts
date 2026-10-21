/**
 * Manaseer Group brand constants, usable from server and client code
 * (and inside Three.js materials, where CSS variables are unreachable).
 * Keep in sync with src/app/globals.css and docs/BRAND.md.
 */
export const brand = {
  name: "Manaseer Group",
  tagline: "Building the Future",
  chairmanQuote:
    "Our community deserves the best services and the highest quality of products",
  chairman: "Eng. Ziad Al Manaseer",
  founded: 1999,
  colors: {
    navy950: "#00216a",
    navy900: "#00266e",
    navy800: "#052b76",
    navy700: "#2a3886",
    navy600: "#095186",
    blue700: "#0074a5",
    blue600: "#007cb4",
    blue500: "#008abe",
    cyan500: "#00b7e5",
    cyan300: "#35c3e7",
    cyan100: "#afdefa",
    ink900: "#231f20",
    ink700: "#626365",
    paper: "#ffffff",
  },
  /** Radial gradient on the pinwheel mark: centre -> edge */
  logoGradient: ["#007cb4", "#052b76"] as const,
  stats: [
    { value: "Jordan", label: "Based in", detail: "With global outreach" },
    { value: "20+", label: "Years", detail: "Of experience" },
    { value: "USD 3B", label: "Capital", detail: "Capital investment" },
    { value: "6", label: "Sectors", detail: "Strategic sectors" },
    { value: "10,000", label: "People", detail: "Total workforce" },
  ],
  sectors: [
    {
      slug: "building-materials",
      name: "Building Materials",
      companies: [
        "ReadyMix",
        "Crushers",
        "Concrete Products",
        "Trust",
        "Marble & Granite",
        "Calcium Carbonate",
        "MIC Shield",
        "JV Natural Green",
        "Modern Mining",
      ],
    },
    {
      slug: "industrial-minerals",
      name: "Industrial Minerals",
      companies: ["Copper Project", "MIC Smart", "Afra Mining", "Magnesia", "Steel"],
    },
    {
      slug: "life-sciences",
      name: "Life Sciences",
      companies: ["Fertilizers & Chemicals", "Trade Supplier", "MNS"],
    },
    {
      slug: "energy-mobility",
      name: "Energy & Mobility",
      companies: ["Manaseer Oil & Gas", "Lumi Market", "Import - Export", "Machinery Trading"],
    },
    {
      slug: "commercial-services",
      name: "Commercial Services",
      companies: ["Information Technology", "Transport"],
    },
    { slug: "vision", name: "Vision", companies: [] },
  ],
  contact: {
    address:
      "Manaseer Group, 8th Circle, King Abdullah II St 302, P.O. Box 925988, Amman 11110, Jordan",
    phone: "+962 (6) 5800 600",
    fax: "+962 (6) 585-8549",
    email: "Feedback@manaseergroup.com",
  },
} as const;

export type Sector = (typeof brand.sectors)[number];
