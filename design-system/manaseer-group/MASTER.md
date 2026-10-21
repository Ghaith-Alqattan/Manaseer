# Design System: Manaseer Group (MASTER)

Global source of truth for the proposal build. Page-specific overrides go in `pages/<page>.md`.
Colour and type come from the client's real identity (`docs/BRAND.md`), not from a generic
industry preset. The pattern and style recommendations below came from the ui-ux-pro-max
engine and were kept; its colour and font suggestions were replaced with the brand's own.

## Pattern
- **Name:** Immersive / Interactive Experience
- **Why:** The pitch is "we make your scale visible". A scroll-driven camera journey through the sectors is the product. Provide a skip / jump rail and a stills-only fallback (reduced motion, low-end devices).
- **Section order:** 1. Full-viewport hero with the signature 3D / video moment, 2. Guided sector journey (6 beats), 3. Scale revealed (numbers), 4. Chairman voice, 5. CTA (contact / order).
- **CTA placement:** after the journey completes, plus a persistent quiet entry point in the header.

## Style
- **Name:** Exaggerated Minimalism
- **Keywords:** oversized Nexa headlines, generous negative space, high contrast navy on white and white on deep navy, one accent (cyan) used sparingly, photographic / rendered material rather than illustration.
- **Mode:** light page surfaces with dark (`.theme-dark`) immersive bands. Design both together.

## Colours (semantic tokens, see `src/app/globals.css`)
| Role | Light | Dark band |
|---|---|---|
| Background `bg` | `#ffffff` | `#03102e` |
| Elevated `bg-elevated` | `#f2f2f2` | `#071a44` |
| Foreground `fg` | `#231f20` | `#eef3fb` |
| Muted `fg-muted` | `#626365` | `#9fb0cf` |
| Primary `primary` | `#2a3886` navy | `#00b7e5` cyan |
| Accent `accent` | `#00b7e5` cyan | `#35c3e7` |
| Line `line` | ink 12 percent | white 14 percent |
| Ring `ring` | `#00b7e5` | `#00b7e5` |

Contrast checks: navy-700 on white 9.9:1, cyan-500 on white 2.7:1 (**never body text on white**; use cyan for eyebrows at 12px uppercase with letter-spacing, or on navy), white on navy-700 9.9:1, cyan-500 on `#03102e` 8.1:1.

## Typography
- **Display:** Nexa Bold / Light (`font-display`). Hero `clamp(2.75rem, 7vw, 7.5rem)`, line-height 0.95, tracking -0.02em. Section titles 2.5 to 4rem.
- **Body:** Helvetica Neue Light / Regular (`font-sans`). 16 to 20px, line-height 1.5 to 1.6, max 65ch.
- **Eyebrow:** Nexa Regular 12px, uppercase, tracking 0.22em, accent colour.
- **Numbers:** Nexa Bold, `tabular-nums`.
- Headlines in sentence case for the new site (the old site shouts in ALL CAPS; reserve caps for eyebrows and nav).

## Motion
- Lenis lerp 0.09. GSAP ease `expo.out` for reveals, `power3.out` default. Durations 0.6 to 1.3 s for hero reveals, 150 to 300 ms for UI.
- One orchestrated moment per section. Text reveals use masked lines (SplitText).
- Every effect has a `prefers-reduced-motion` branch that shows the final state.
- 3D: `dpr=[1,2]`, stop idle rotation on reduced motion, `frameloop="demand"` for static scenes.

## Layout
- Container `container-site`: `min(100% - 4rem, 90rem)`; 2rem gutters under 768px.
- Breakpoints: 375 / 768 / 1024 / 1440 / 1600.
- Spacing scale 4/8; section rhythm 8 to 12rem desktop, 5 to 7rem mobile.
- `min-h-dvh` not `100vh`; `viewport-fit=cover` and safe-area insets on fixed UI.

## Avoid
- 2D-only photo tiles with gradient overlays (that is the current site).
- AI purple/pink gradients; any accent other than cyan.
- Emoji or FontAwesome icons; use Phosphor.
- Uppercase paragraphs; cyan body text on white.
- Autoplaying audio; blocking intro animations without a skip.

## Pre-delivery checklist
- [ ] Contrast 4.5:1 body, 3:1 large text, both light and dark bands
- [ ] Keyboard focus visible (ring token); skip link to main
- [ ] Reduced motion tested; stills shown instead of video / 3D
- [ ] 375 px with no horizontal scroll; URL-bar resize does not jump
- [ ] LCP element is the hero still / headline, not the canvas
- [ ] Fonts preloaded, images via next/image with dimensions
