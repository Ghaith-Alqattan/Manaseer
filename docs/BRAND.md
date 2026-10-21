# Manaseer Group — Visual Identity (extracted 2026-10-21)

Source: https://www.manaseergroup.com/Home/?language=2 (live site, EN). Everything below was
read from the rendered DOM, the served stylesheets (`docs/extraction/source-css/`) and the
downloaded SVG/font binaries. Nothing is guessed.

## 1. Logo

| Asset | File | Notes |
|---|---|---|
| Primary lockup (colour) | `public/brand/logo.svg` | 332 x 111 viewBox. Pinwheel mark + "MANASEER GROUP" wordmark. |
| Lockup, white | `public/brand/logo-white.svg` | Footer / dark surfaces. All paths `#fff`. |
| Mark only, white | `public/brand/mark-white.svg` | Square 170 x 170. Used on the navy cookie banner. |
| Favicon | `public/brand/favicon-25.png` | 25 x 25 PNG (low-res, replace with SVG favicon). |
| Intro animation | `public/lottie/intro/intro.json` | Lottie 5.7.6, 1920 x 1080, 25 fps, 63 frames (2.5 s). 6 image layers (`images/img_0..5.png`) + 12 shape layers + two text layers named CORPORATE / HIGHLIGHTS. The pinwheel assembling itself. |

**Mark construction.** 8 blades arranged radially (pinwheel / sun / propeller). The colour
version is filled with a **radial gradient**: centre `#007cb4` (cyan-blue) to edge `#052b76`
(deep navy). The wordmark paths in the colour SVG are `#1a1818` (near black).

## 2. Colour

Raw values pulled from `main.css`, `order-button.css` and computed styles. Grouped by role.

### Navy (primary)
| Token | Hex | Where it appears |
|---|---|---|
| navy-950 | `#00216a` | gradient end stops |
| navy-900 | `#00266e` | section gradients (`to right bottom, #00266e -> #0079a8`) |
| navy-800 | `#052b76` | **logo gradient outer stop** |
| navy-700 | `#2a3886` | **primary brand navy**: Submit buttons, cookie banner bg, round icon buttons, stat value colour |
| navy-600 | `#095186` | "MANASEER GROUP AT A GLANCE" headline |

### Blue
| Token | Hex | Where |
|---|---|---|
| blue-700 | `#0074a5` | gradient start (`#0074a5 -> #00216a`) |
| blue-600 | `#007cb4` | **logo gradient inner stop** |
| blue-500 | `#008abe` | stat values ("20+ years", "Operating in 6") |

### Cyan (accent)
| Token | Hex | Where |
|---|---|---|
| cyan-500 | `#00b7e5` | **signature accent**: "HOW CAN WE HELP YOU?" headline, ORDER NOW tab, sector pills (`rgba(0,183,229,.55)`), search icon circle |
| cyan-300 | `#35c3e7` / `#2dc8ef` | hover variants |
| cyan-100 | `#afdefa` | side-menu headings |

### Neutrals
| Token | Hex | Where |
|---|---|---|
| ink-900 | `#231f20` / `#212529` | body text |
| ink-700 | `#626365` / `#636466` | secondary text, "Based in JORDAN" |
| ink-500 | `#707070` | captions |
| ink-300 | `#acacac` / `#c3c2c2` | borders, disabled |
| ink-100 | `#f2f2f2` / `#f7f5f5` | section backgrounds |
| paper | `#ffffff` | page background |

### Gradients in use
- Hero slogan box: `linear-gradient(to right, #0074a5 40%, #00216a 60%)`
- Sector card overlay: `linear-gradient(to right, rgb(0 111 161 / 60%), rgb(0 38 110))`
- Footer / dark band: `linear-gradient(to right bottom, #00266e, #003b80, #00508f, #00659d, #0079a8)`
- Reverse band: `linear-gradient(270deg, #0079a8, #006da2, #005492, #003a80, #002870, #00216a)`

### Not brand
- The green `rgba(38,122,72,.86)` spinner with Montserrat is the WAF challenge page ("One moment, please..."), not Manaseer.
- `#A44537` / `#6F3025` (rust) appear once in `main.css`, unused on the home page.

## 3. Typography

Self-hosted TTFs were served from `/Home/images/fonts/`. Converted to woff2 in `src/fonts/`
and loaded through `next/font/local` (`src/lib/fonts.ts`). Google Fonts Raleway 300/400/700 is
linked in the `<head>` but not applied anywhere on the home page.

| Role | Family (CSS name on site) | File | Weight mapping |
|---|---|---|---|
| Display / headings | `nexaBold`, `NexaRegular`, `NexaLight` | `nexa-{light,regular,bold}.woff2` | 300 / 400 / 700 |
| Body / UI | `HelveticaNeueLight`, `HelveticaNeue`, `HelveticaNeuemed`, `HelveticaNeueBold` | `helvetica-neue-{light,regular,medium,bold}.woff2` | 300 / 400 / 500 / 700 |
| Icons | FontAwesome 4.7 | not carried over (use Phosphor) | |

Observed scale on the live site (desktop):

| Element | Font | Size | Transform | Colour |
|---|---|---|---|---|
| Hero slogan "Building the Future" | Nexa Bold | 50px | none | white on navy gradient box |
| "HOW CAN WE HELP YOU?" | Nexa Bold | 40px | uppercase | cyan-500 |
| "MANASEER GROUP AT A GLANCE" | Nexa Light | 40px | uppercase | navy-600 |
| Sector names | Nexa Bold | 23px | uppercase | white |
| Stat values | Nexa Bold | 25px | none | navy-700 / blue-500 / ink-700 |
| Chairman quote | Nexa Bold | 32px | none | ink-900 |
| Body | Helvetica Neue Light | 16px / 24px line-height | | ink-900 |
| Paragraph (CSS default) | Helvetica Neue Light | 20px | | |

**Licensing.** Nexa (Fontfabric) and Helvetica Neue (Monotype) are commercial. The client is
already serving them publicly, so using them in their own proposal is consistent with current
practice, but confirm the licence covers a new web deployment before go-live.

**Arabic.** None of the seven font files contain Arabic glyphs (verified with fontTools; cmap
has no U+0600-06FF). The live site offers EN and RU only. If an AR version is proposed, pair
with a Google Arabic face that matches Nexa's geometric feel (candidates: IBM Plex Sans Arabic,
Tajawal, Cairo) and set `dir="rtl"` per locale.

## 4. Imagery and motion on the current site

| Image | Local copy | Dimensions | Use on the old site |
|---|---|---|---|
| Construction site at dusk, cranes and concrete pumps | `public/images/site-reference/construction-site-cranes.jpg` | 1872 x 1080 | About page hero |
| HQ lattice facade, low angle | `hero-building-future.jpg` | 1620 x 1080 | Home hero slide |
| Amman skyline with flag | `amman-skyline-quote.jpg` | 1620 x 1080 | Chairman quote band |
| Industrial complex aerial, desert | `industrial-complex-aerial.jpg` | 1920 x 936 | Sector card |
| Seedling in soil | `seedling-soil.jpg` | 1920 x 936 | Sector card (default) |
| Manaseer Oil & Gas station | `manaseer-fuel-station.jpg` | 1920 x 936 | Sector card |

Photography style: wide architectural and aerial shots, cool blue sky, heavy navy gradient
overlays. Motion: Flickity carousel, ScrollReveal fades, `css3-animate-it` pulse on the slogan,
Lottie intro. jQuery 3.2 + Bootstrap 4.

Icon set (white line icons on navy/cyan circles): `public/brand/sector-icons/` (Jordan map,
star, money bag, buildings, people) and `public/brand/icons/` (nav + social).

## 5. Voice and content

- Tagline: **"Building the Future"** (always in curly quotes on the site).
- Chairman quote: *"Our community deserves the best services and the highest quality of products"* (Eng. Ziad Al Manaseer).
- Vision: top player in each sector, economic prosperity, social wellbeing, healthy environment for future generations.
- Mission: value for customers, safe workplace, outstanding shareholder returns.
- Values: Safety, Society & Environment, Respect, Efficiency, Innovation, Employees.
- Key numbers: founded 1999 (15 employees, chemicals and fertilisers), 20+ companies, 10,000 employees, USD 3 billion capital, 6 strategic sectors, partnerships with 3 of Jordan's largest companies.
- Sectors and companies: see `src/lib/brand.ts`.
- Register: formal, corporate, first-person chairman voice on the About page. Headlines in ALL CAPS.

## 6. Tokens in code

- CSS: `src/app/globals.css` (`--brand-*` raw palette, semantic `--bg/--fg/--primary/--accent`, Tailwind `@theme` colours `navy-700`, `cyan-500`, etc.)
- TS: `src/lib/brand.ts` (for Three.js materials and copy)
- Fonts: `src/lib/fonts.ts` exposes `--font-nexa` and `--font-helvetica`; Tailwind classes `font-display` / `font-sans`.

## 7. Sector slide photos
All six slides in `public/images/sectors/` are 1920-wide webp derivatives of the client's own site photos above (no third-party imagery).
