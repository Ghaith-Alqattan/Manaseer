export type WorldSection = {
  id: string;
  label: string;
  still: string;
  stillMobile?: string;
  clip: string;
  clipMobile?: string;
  accent?: string;
  /** Per-section override of diveScroll (viewport-heights). More = longer dwell. */
  scroll?: number;
  /** 0..1, keep <= 0.6. Camera settles mid-scene while the copy peaks. */
  linger?: number;
  eyebrow?: string;
  title: string;
  body?: string;
  tags?: string[];
  cta?: {
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
};

export type WorldConfig = {
  brand?: { name: string; href?: string };
  cta?: { label: string; href: string };
  hint?: string;
  nav?: boolean;
  atmosphere?: boolean;
  diveScroll?: number;
  connScroll?: number;
  crossfade?: number;
  /** Per-frame lerp factor toward the scroll target (default 0.18; lower = softer) */
  smoothing?: number;
  /** Clips already fetched by a preloader, keyed by URL; the engine skips its own fetch */
  preloaded?: Map<string, Blob>;
  sections: WorldSection[];
  /** length = sections.length - 1; null entries crossfade directly */
  connectors: (string | null)[];
  connectorsMobile?: (string | null)[];
};

export function mountScrollWorld(container: HTMLElement, config: WorldConfig): unknown;
