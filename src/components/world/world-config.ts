import { brand } from "@/lib/brand";
import type { WorldConfig } from "./scrub-engine";

const vid = (name: string) => `/world/vid/${name}.mp4`;
const still = (name: string) => `/world/${name}.webp`;

/**
 * The five-scene journey (see docs/SCENARIO.md). Order matters: connectors[i] joins
 * sections[i] to sections[i+1]. A null connector means the engine crossfades directly.
 */
export const worldConfig: WorldConfig = {
  hint: "scroll to fly in",
  nav: false,
  atmosphere: true,
  diveScroll: 1.3,
  connScroll: 0.9,
  crossfade: 0.12,
  sections: [
    {
      id: "rock",
      label: "The Rock",
      still: still("rock"),
      clip: vid("rock"),
      accent: brand.colors.cyan500,
      scroll: 1.7,
      linger: 0.4,
      eyebrow: "From the ground up",
      title: "It starts in the rock.",
      body: "Quarries, crushers, calcium carbonate and steel: the raw material under every road and wall in Jordan.",
      tags: ["Crushers", "Marble & Granite", "Steel"],
    },
    {
      id: "mix",
      label: "The Mix",
      still: still("mix"),
      clip: vid("mix"),
      accent: brand.colors.cyan500,
      eyebrow: "Building materials",
      title: "Cement, concrete, and the roads between.",
      body: "The country's largest building-materials network, from kiln to pour.",
      tags: ["Cement", "ReadyMix", "Concrete Products"],
    },
    {
      id: "field",
      label: "The Field",
      still: still("field"),
      clip: vid("field"),
      accent: brand.colors.cyan500,
      eyebrow: "Life sciences",
      title: "Feeding the land.",
      body: "Where the group began in 1999: fertilizers and chemicals for Jordan's farms.",
      tags: ["Fertilizers & Chemicals", "Trade Supplier", "MNS"],
    },
    {
      id: "flow",
      label: "The Flow",
      still: still("flow"),
      clip: vid("flow"),
      accent: brand.colors.cyan500,
      eyebrow: "Energy & mobility",
      title: "Keeping Jordan moving.",
      body: "Fuel, retail, transport and IT: the services that connect every sector.",
      tags: ["Oil & Gas", "Lumi Market", "Transport"],
    },
    {
      id: "future",
      label: "The Future",
      still: still("future"),
      clip: vid("future"),
      accent: brand.colors.cyan300,
      scroll: 1.8,
      linger: 0.5,
      eyebrow: "Vision",
      title: "Building the Future.",
      body: `20+ companies, 10,000 people, USD 3 billion invested. "${brand.chairmanQuote}." ${brand.chairman}, Chairman.`,
      tags: [],
      cta: {
        primary: { label: "Talk to us", href: "#contact" },
        secondary: { label: "Our sectors", href: "#sectors" },
      },
    },
  ],
  connectors: [vid("conn1"), vid("conn2"), vid("conn3"), vid("conn4")],
};
