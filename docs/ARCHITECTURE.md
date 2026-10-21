# Architecture

## Stack
| Layer | Choice | Version | Why |
|---|---|---|---|
| Framework | Next.js App Router | 16.4 | RSC by default, Turbopack, Cache Components on, React Compiler on |
| Language | TypeScript strict | 5.9 | |
| Styling | Tailwind CSS v4 | 4.3 | `@theme` tokens from `globals.css`; no config file |
| Smooth scroll | Lenis | 1.3 | Driven by GSAP ticker (one clock) |
| Animation | GSAP + ScrollTrigger + SplitText | 3.15 | All plugins are free since 3.13 |
| 3D | three + @react-three/fiber + drei | 0.186 / 9.8 / 10.7 | Loaded client-only via `next/dynamic` |
| Icons | @phosphor-icons/react | 2.1 | One icon family, no emoji |
| Validation | zod | 4 | For the contact / order forms later |

## Folder map
```
src/
  app/
    layout.tsx         fonts, metadata, <SmoothScroll> provider
    page.tsx           home: composes sections (server component)
    globals.css        brand tokens + base layer + utilities
  app/actions/
    order.ts           Server Action for the Order now form (zod-validated; delivery is a go-live item)
  components/
    brand/             Logo and other identity primitives (server)
    forms/             OrderForm (client, useActionState)
    motion/            GSAP client islands: Reveal, Counter
    providers/         SmoothScroll (Lenis + ScrollTrigger sync)
    sections/          Glance (statement band), Sectors (ledger), Contact (form + footer); Hero kept for later
    three/             SceneCanvas (dynamic, ssr:false) -> CanvasRoot -> scenes
    world/             scroll-world engine, wrapper, config, chrome header
  fonts/               woff2 brand fonts (served by next/font)
  lib/
    brand.ts           brand constants usable in TS and in Three.js materials
    fonts.ts           next/font/local definitions
    gsap.ts            single GSAP registration point (client-only)
    utils.ts           cn(), reduced-motion helpers
public/
  brand/               logos, favicon, icon SVGs
  images/site-reference/  photos from the current site (reference / textures)
  lottie/intro/        current site intro animation
docs/
  BRAND.md             extracted visual identity (source of truth)
  SITE-AUDIT.md        what is wrong with the current site (pitch material)
  extraction/          raw screenshots and source CSS
design-system/
  manaseer-group/MASTER.md   UI/UX rules for the build
```

## Rules
1. **Server first.** A component is a server component until it needs a hook, an event handler or the browser. Promote the smallest subtree, not the page.
2. **GSAP only through `@/lib/gsap`.** Never import `gsap` directly. Use `useGSAP` with a `scope` so cleanup is automatic; wrap motion in `gsap.matchMedia()` with a reduced-motion branch.
3. **One `<Canvas>`.** All 3D goes through `SceneCanvas` -> `CanvasRoot`. Scenes are plain client components rendered as its children. `.glb` files live in `public/models/` and load by URL.
4. **Tokens, not hex.** Components use `bg-bg`, `text-fg`, `text-accent`, `bg-navy-700`, etc. Raw hex only in `globals.css` and `brand.ts`.
5. **Lenis owns scroll.** Do not set `scroll-behavior: smooth` or call `window.scrollTo`; use `getLenis()?.scrollTo()`.
6. **Dark surfaces are opt-in** with the `.theme-dark` class on a section; the semantic tokens flip underneath.
7. **No polling, no `useEffect` for derived state.** The only `useEffect` in the shell is the Lenis lifecycle.
8. **Assets:** images through `next/image`, fonts through `next/font`, videos (scroll-world scrub chain) as blob-loaded `<video>` elements with still posters.

## Scroll-world (the home page)
The home route is the scroll-scrubbed camera flight from `docs/SCENARIO.md`:
- `src/components/world/scrub-engine.js` — vendored engine (ES-module tail added, otherwise upstream).
- `src/components/world/world.tsx` — client wrapper; mounts the engine, clears it on unmount.
- `src/components/world/world-config.ts` — the five sections, copy, pacing, connectors.
- `.world-theme` in `globals.css` maps brand tokens onto the engine's `--sw-*` variables.
- Render chain: `world/scripts/` (prompts -> stills -> dives -> seam frames -> connectors -> encode -> QA).
The engine reads `window.scrollY` from page top, so the world must be the first thing on the
route. Lenis drives it through native scroll events. Mobile currently gets the same 3:2 clips
cover-fitted; a native 9:16 chain is a separate render (about 2x credits).
Three.js stays available in `components/three` for later pages but is not on the home route.

## Verification
- `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build` must all pass before a handoff.
- Visual check in the app's browser pane via `.claude/launch.json` -> `dev` on port 3000.
- Test 375 px, reduced motion, and keyboard focus before calling a section done.
