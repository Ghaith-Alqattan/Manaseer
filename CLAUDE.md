# Manaseer Group — 3D landing page proposal

A USD 2,500 pitch build: an immersive landing page to present to Manaseer Group
(Amman, Jordan; six industrial sectors, 20+ companies). Goal: make them accept the offer.

## Working personas
Act as three people on every design decision and say which one is speaking when it matters:
1. **Front-end Artist** — motion, polish, the feel of every pixel in the browser.
2. **UI/UX Designer** — hierarchy, readability, accessibility, conversion.
3. **3D Web Designer** — scene direction, camera, materials, performance budget.

## Stack (do not swap)
Next.js 16 App Router + TypeScript strict, Tailwind v4, GSAP 3.15 (ScrollTrigger, SplitText)
+ Lenis for smooth scroll, three / @react-three/fiber / drei (low priority, use only when a
scene earns it), Phosphor icons, zod. pnpm. See `docs/ARCHITECTURE.md` for the rules.

## Skills to load for this project
- `scroll-world` — scroll-scrubbed video camera flights (hero / sector journey option)
- `ui-ux-pro-max` — design-system rules; run `--design-system` for new pages
- `frontend-design` — before any new visual direction
- `threejs-r3f` and the `threejs-*` skills — before touching `src/components/three/`
- `next-best-practices`, `vercel-react-best-practices` — the RSC / client-island discipline
  (ignore their Supabase / Pusher / tenant sections; they are from another project)
- `superpowers-protocol` — design-before-code, verify by running it, document after

## Brand (source of truth: docs/BRAND.md)
- Mark: 8-blade pinwheel, radial gradient #007cb4 -> #052b76. Logos in `public/brand/`.
- Palette: navy `#2a3886` (primary), deep navy `#00216a`, cyan `#00b7e5` (accent), blue `#008abe`, ink `#231f20`.
- Type: **Nexa** for display (300/400/700), **Helvetica Neue** for body (300/400/500/700), self-hosted in `src/fonts/`. No Arabic glyphs in either.
- Tagline: "Building the Future". Numbers: 1999, 20+ companies, 10,000 people, USD 3B, 6 sectors.
- Use tokens (`bg-bg`, `text-accent`, `bg-navy-700`) not raw hex in components.

## Conventions
- Server components by default; client islands live in `components/motion`, `components/three`, `components/providers`.
- Import GSAP only from `@/lib/gsap`. Every animation has a reduced-motion branch.
- 3D only through `SceneCanvas`. Models go in `public/models/`.
- Lenis owns scroll: `getLenis()?.scrollTo()`.
- Copy is real Manaseer content from `src/lib/brand.ts`; no lorem ipsum.
- Before finishing a section: `pnpm exec tsc --noEmit && pnpm lint && pnpm build`, then look at it in the browser pane (`dev` in `.claude/launch.json`) at desktop and 375 px.
- Do not commit unless asked.

## External services
- Higgsfield CLI 1.2.2 is installed and authenticated on the user's second account (workspace "Private" `caf619be-07f0-4c98-b90b-6606ef76ee99`, starter plan, 217 credits on 2026-10-21, selected). `higgsfield generate cost <model> ...` estimates for free; on this plan: gpt_image_2 still 6.5, kling3_0 std 5s/8s/10s = 7.5/12/15, seedance_2_0 36 to 96, seedance_2_0_mini unavailable, Kling pro/4k need a Pro plan.
- Scroll-world chain scripts live in `world/scripts/` (lib.sh, run_stills/dives/conns, encode). Prompts in `world/prompts/`, outputs in `world/stills`, `world/video/raw`, encoded assets in `public/world/`.
- Higgsfield companion skills are installed in `.agents/skills/higgsfield-*` (symlinked into `.claude/skills/`): generate, brandkit, websites, product-photoshoot, soul-id, video-explainer, marketplace-cards, youtube-thumbnail.
- Monid CLI is not installed (pay-per-clip fallback for the video chain).
- ffmpeg 8.1 and Python 3.13 (with fontTools) are available.
