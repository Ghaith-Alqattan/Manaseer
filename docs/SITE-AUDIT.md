# Current Site Audit — manaseergroup.com (2026-10-21)

Why this exists: the proposal has to show the client what they are leaving behind, not just
what they are getting. Screenshots in `docs/extraction/screenshots/`.

## Stack
- PHP pages (`/Home/*.php`), author meta "Istanbul for information Technology".
- Bootstrap 4, jQuery 3.2.1, Flickity, ScrollReveal, Waypoints, css3-animate-it, Lottie, jVectorMap, FontAwesome 4.7.
- openresty behind a JS-challenge WAF ("One moment, please..." interstitial with a 5 s reload loop; blocks curl and first-visit bots, which also hurts link previews and some crawlers).
- Google Analytics 4 (`G-Q6WJJYYEWS`).
- Footer still says **(c) 2020**.

## Page structure (home)
1. Header: logo, Home / language / search / hamburger. Side drawer menu (About, News, Products & Services, Partnerships, Contact, Management, Careers). Languages: EN, RU only.
2. Hero: single Flickity slide, photo of the HQ facade, slogan "Building the Future" in a navy gradient box. Pulse animation.
3. "HOW CAN WE HELP YOU?" search box.
4. Sector grid (4 large photo tiles + pills): Building Materials, Industrial Minerals, Life Sciences, Energy & Mobility, plus Commercial Services and Vision further down.
5. "At a glance" stats (5 icons, counters animate on waypoint).
6. Chairman quote over Amman skyline.
7. Footer: address, newsletter, social, Download Center.
8. Persistent "ORDER NOW" tab on the right edge (opens a B2B order modal).
9. Cookie banner that covers 40 percent of the viewport until dismissed.

## Weaknesses to call out in the pitch
- **No depth, no motion story.** Static photo tiles with gradient overlays; the only animation is a fade-in and a pulse. For a group that builds, mines and manufactures, nothing on the page *moves* or *shows* the work.
- **Generic sector presentation.** 25 company names as uppercase pills with no imagery, numbers or hierarchy. The group's scale is invisible.
- **Hero wastes the viewport.** One slide, quotes around the slogan, no CTA, no supporting line.
- **Counters render blank** until scrolled (and show nothing if JS fails).
- **No Arabic** for a Jordanian group; fonts in use have no Arabic glyphs.
- **Social links point to the platform roots** (facebook.com, twitter.com), not Manaseer's pages.
- **WAF interstitial** on first visit delays every new visitor by about 5 seconds and shows a green spinner that is off-brand.
- **Accessibility gaps:** every nav icon `alt` is "About icon"; cookie banner traps the viewport; FontAwesome icon-only buttons without labels.
- **Performance:** jQuery + Bootstrap + 10 stylesheets + 7 unsubsetted TTF fonts (about 290 KB of fonts, no woff2); hero JPEGs 350 to 600 KB each.
- **Stale:** copyright 2020, chairman text says "2 Billion" in the meta description and "3 Billion" on the page.

## What to keep
- The pinwheel mark and the navy/cyan palette are strong and recognisable. Keep them exactly.
- "Building the Future" is a good spine for a scroll-driven narrative (foundations -> materials -> minerals -> energy -> people -> future).
- The real numbers (1999, 20+ companies, 10,000 people, USD 3B, 6 sectors) are impressive when given room.
- The chairman quote is a natural closing beat.
- The ORDER NOW flow is a real business need; keep the entry point, redesign the modal.
