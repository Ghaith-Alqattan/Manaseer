import { brand } from "@/lib/brand";
import type { WorldConfig } from "./scrub-engine";

const vid = (name: string) => `/world/vid/${name}.mp4`;
const still = (name: string) => `/world/${name}.webp`;
/** Native 9:16 chain for phones (world/scripts/mobile.sh): 720-wide, GOP 4, own posters. */
const vidM = (name: string) => `/world/vid/${name}-m.mp4`;
const stillM = (name: string) => `/world/${name}-m.webp`;

/**
 * The five-scene journey (see docs/SCENARIO.md). Order matters: connectors[i] joins
 * sections[i] to sections[i+1]. A null connector means the engine crossfades directly.
 */
export const worldConfig: WorldConfig = {
  hint: "scroll to fly in",
  nav: false,
  atmosphere: true,
  // Pacing: more scroll per clip = slower, calmer flight. Connectors get almost as much
  // room as dives so the hop between islands never feels like a jump cut.
  diveScroll: 1.5,
  connScroll: 1.25,
  crossfade: 0.14,
  smoothing: 0.14,
  sections: [
    {
      id: "rock",
      label: "The Rock",
      still: still("rock"),
      stillMobile: stillM("rock"),
      clip: vid("rock"),
      clipMobile: vidM("rock"),
      accent: brand.colors.cyan500,
      scroll: 1.9,
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
      stillMobile: stillM("mix"),
      clip: vid("mix"),
      clipMobile: vidM("mix"),
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
      stillMobile: stillM("field"),
      clip: vid("field"),
      clipMobile: vidM("field"),
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
      stillMobile: stillM("flow"),
      clip: vid("flow"),
      clipMobile: vidM("flow"),
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
      stillMobile: stillM("future"),
      clip: vid("future"),
      clipMobile: vidM("future"),
      accent: brand.colors.cyan300,
      scroll: 2.0,
      linger: 0.5,
      eyebrow: "Vision",
      title: "Building the Future.",
      body: `“${brand.chairmanQuote}.” ${brand.chairman}, Chairman.`,
      tags: [],
      cta: {
        primary: { label: "Contact us", href: "#contact" },
        secondary: { label: "Our sectors", href: "#sectors" },
      },
    },
  ],
  connectors: [vid("conn1"), vid("conn2"), vid("conn3"), vid("conn4")],
  connectorsMobile: [vidM("conn1"), vidM("conn2"), vidM("conn3"), vidM("conn4")],
};
