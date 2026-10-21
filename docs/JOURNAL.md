# Project journal — Manaseer Group proposal

What was done, in order, with the decisions and costs behind it. Newest entries last.
Companion docs: `BRAND.md` (identity), `SITE-AUDIT.md` (their current site), `SCENARIO.md`
(the camera flight), `ARCHITECTURE.md` (code map and rules).

## 2026-10-21 — Setup and brand extraction

**Goal set.** A USD 2,500 pitch build: an immersive landing page to present to Manaseer
Group (Amman, Jordan; six industrial sectors, 23 companies, 10,000 people) so they accept
the offer. Three personas on every design call: front-end artist, UI/UX designer, 3D web
designer. Stack fixed by the brief: Next.js + TypeScript, GSAP for smooth scrolling, Three.js
only where it earns its place.

**Scaffold.** Next.js 16.4 (App Router, Turbopack, React Compiler, Cache Components),
TypeScript strict, Tailwind v4, pnpm. Added GSAP 3.15 (ScrollTrigger, SplitText) + Lenis
driven by one ticker, three / React Three Fiber / drei behind an SSR-safe dynamic canvas,
Phosphor icons, zod. Brand tokens as CSS variables with light and dark semantic roles.

**Extraction from manaseergroup.com.** The site sits behind a JavaScript challenge wall, so
every asset was pulled through the browser pane rather than curl: logo lockups (colour and
white), the square mark, favicon, 20 icons, 6 photos, the Lottie intro and its sprites, all
stylesheets, and screenshots of every section. Findings: pinwheel mark with a radial
gradient (#007cb4 to #052b76); navy #2a3886 primary, cyan #00b7e5 accent; Nexa for display,
Helvetica Neue for body (self-hosted TTFs, converted to woff2); no Arabic glyphs in either;
site offers only English and Russian; copyright still 2020; social links point at platform
roots. Written up in `BRAND.md` and `SITE-AUDIT.md`.

**Skills loaded.** scroll-world, ui-ux-pro-max, frontend-design, superpowers-protocol,
next-best-practices, vercel-react-best-practices, threejs-r3f. The ui-ux-pro-max engine
proposed a generic industrial-grey-and-orange palette with Lexend; replaced with the real
brand in `design-system/manaseer-group/MASTER.md`.

**Higgsfield.** First account had 10 credits on a free plan. User switched to a second
account (starter plan, 217 credits); the CLI was updated to 1.2.2, logged in through the
Terminal panel, and the eight Higgsfield companion skills were installed into the repo.

## 2026-10-22 — The camera flight

**Scenario.** A "corporate scale model" of Manaseer's Jordan: precision maquette islands
in limestone, concrete, steel and navy on a deep-navy table, tilt-shift aerial view.
Fly-through camera (dive into each island, pull up, hop to the next). Six scenes drafted,
cut to five to fit the balance: The Rock (quarry, crushers, steel), The Mix (cement,
ready-mix, precast), The Field (fertilizer plant and farms), The Flow (interchange, fuel
station, depot, data centre), The Future (the HQ tower with its lattice facade, Amman, the
flag). The finale holds the chairman's quote and the CTA.

**Model and price discovery** (free `higgsfield generate cost` estimates on this plan):
gpt_image_2 still 6.5; Seedance 2.0 36 (720p) to 96 (1080p) per 8 s clip; Seedance Mini
"Not found" on this account; Kling 3.0 std 7.5 / 12 / 15 credits for 5 / 8 / 10 s; Kling
pro and 4k rejected ("Pro or Ultimate plan required"). Chain model: Kling 3.0 std
(start + end image, 720p-class, 1176 x 780 following the 3:2 still).

**Desktop chain.** 5 stills (one calibration first, all cohesive on the first try), 5 dives
at 10 s, 4 connectors at 5 s from the dives' actual first/last frames. All seams measured
26.7 to 37.9 dB (frame-locked). Kling renders connectors as the island transforming in place
rather than an aerial hop; user chose to keep them. Spend about 137 credits. The CLI twice
lost its response to a Cloudflare page while jobs completed server-side; recovered from
the job list, then automated (`recover_job` in `world/scripts/lib.sh`).

**Page.** The engine (vendored scroll-world scrub engine, ES-module tail) mounted as the
home route, themed with brand tokens; Lenis drives it through native scroll events.
Verified: blob-loaded seekable clips, scrub tracks scroll, finale copy and CTAs.

**Sections below the world.** A one-sentence scale statement with counting numbers (not
stat tiles), a limestone ledger of six sectors with swatches cropped from the renders, a
navy contact band with a zod-validated form and footer. The sheet overlaps the engine's
trailing viewport so there is no empty sky. Count corrected: 23 companies on their site.

**First commits.** 57bc889 (the build) and 8f01ccc (`.gitattributes`: LF for scripts).

**Mobile chain.** Native 9:16: stills knocked out and recomposed on 1080 x 1920 navy
gradient canvases, five 5-second portrait dives (to fit the 79.5 balance), four portrait
connectors, seams 24.8 to 38 dB, encoded 720 wide. Spend 67.5 credits; balance 12.
Lesson: the app's browser pane throttles animation frames when hidden, so scroll-scrub
checks there are only valid while the pane is visible.

## 2026-10-22 — Second round (eleven requests)

1. **Scroll performance**: all clips preloaded into memory before the page opens
   (full-screen loader with byte progress); the engine seeks at most once per video frame
   instead of several sub-frame seeks; clips re-encoded GOP 3, no B-frames, fastdecode
   (desktop chain 76 MB, mobile 24 MB).
2. **Pacing**: connectors 1.25 viewports (was 0.9), dives 1.5, quarry 1.9, finale 2.0,
   softer smoothing, wider crossfade.
3. **Body font**: Manrope (Google) replaces Helvetica Neue Light for body and UI; Nexa stays
   for display.
4. **"Contact us" everywhere**: no "Order now" anywhere; the form became a contact form
   (name, organisation, phone or email, topic, message) with a new server action.
5. **Route chip**: navy pill with white text.
6. **Fixed nav** appears after the world (`#after-world`) and hides when scrolling back;
   its state is re-evaluated after the engine adds its scroll track.
7. **Finale CTAs**: white primary with navy text, outlined secondary, shorter quote, tighter
   spacing and reduced sizes on short viewports.
8. **Sectors** rebuilt as six pinned full-viewport slides, each sliding in from the right
   over the previous one with photo parallax. Photos are the client's own: construction
   site with cranes, desert industrial complex, seedling, their Oil & Gas station, the HQ
   lattice, Amman with the flag. Three of these files had been mislabelled on day one and
   were renamed and documented correctly.
9. **Contact backdrop**: the 3D pinwheel mounts as the section approaches, fills the frame,
   zooms out on scroll into a slow-turning backdrop; details and form rise in over it.
10. **Social links** verified and added: Facebook /ManaseerG, Instagram @manaseerg,
    LinkedIn /company/manaseer-group. No confirmed X or YouTube account.
11. **Preloader** built, then rebuilt on request (see next entry).

Two dev-server lessons recorded in memory: Turbopack sometimes serves a stale stylesheet
after `globals.css` edits (restart before judging CSS), and ScrollTriggers created before the
engine mounts must be refreshed.

## 2026-10-22 — Third round (fan and loader)

- **Footer** spacing tightened under the form.
- **Fan wobble**: the blade extrusion sat entirely in front of the rotation plane and the
  group was pushed around per frame. Geometry is now centred on its axis; tilt on a fixed
  outer group; only the inner group spins.
- **Fan performance audit**: standard materials instead of physical clearcoat; the drei
  environment preset removed from every scene (it downloaded an HDR from a CDN and built a
  reflection map mid-scroll) in favour of a fixed three-point light rig; pixel ratio capped
  at 1.5; the contact canvas and shaders created when the slides begin, not during the fan's
  entrance; render loop frozen while the contact section is more than 1.3 viewports away;
  scroll-driven zoom smoothed per frame with clamped delta.
- **Preloader** rebuilt: the whole screen is the gauge, a lighter navy water rising with two
  drifting waves; the 3D pinwheel turns at the centre; percentage bottom-left; exit on timers
  and a CSS transition so a throttled tab can never stall it.
- **Standing rule from the user: never rotate or spin the logo.** Recorded in `CLAUDE.md`
  and in memory.

## Open items

- Real-phone test of the mobile chain and the preloader (the dev server is reachable on
  the LAN at http://172.20.10.4:3000 while running).
- Remote repository and deploy preview URL (no remote configured yet; GitHub CLI not
  installed on this machine).
- Form delivery (email or CRM) is a go-live item; the action validates and logs only.
- Arabic version would need a matching Arabic typeface; Nexa has no Arabic glyphs.
- Higgsfield balance: 12 credits. Any re-roll or new scene needs a top-up.
