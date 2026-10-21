import localFont from "next/font/local";
import { Manrope } from "next/font/google";

/**
 * Nexa (the client's display face, self-hosted) for headings; Manrope for body and UI.
 * Helvetica Neue Light, the current site's body face, read thin and ragged at the sizes
 * this page uses, so the body face was swapped (docs/BRAND.md keeps the original files).
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

export const manrope = Manrope({
  variable: "--font-manrope",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const fontClassNames = `${nexa.variable} ${manrope.variable}`;
