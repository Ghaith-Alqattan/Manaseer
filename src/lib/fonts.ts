import localFont from "next/font/local";

/**
 * Brand typefaces, self-hosted (extracted from manaseergroup.com, see docs/BRAND.md).
 * Nexa = display / headings. Helvetica Neue = body / UI.
 * Neither family ships Arabic glyphs; see docs/BRAND.md -> "Arabic" before adding RTL.
 */
export const nexa = localFont({
  variable: "--font-nexa",
  display: "swap",
  preload: true,
  src: [
    { path: "../fonts/nexa-light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/nexa-regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/nexa-bold.woff2", weight: "700", style: "normal" },
  ],
});

export const helvetica = localFont({
  variable: "--font-helvetica",
  display: "swap",
  preload: true,
  src: [
    { path: "../fonts/helvetica-neue-light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/helvetica-neue-regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/helvetica-neue-medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/helvetica-neue-bold.woff2", weight: "700", style: "normal" },
  ],
});

export const fontClassNames = `${nexa.variable} ${helvetica.variable}`;
