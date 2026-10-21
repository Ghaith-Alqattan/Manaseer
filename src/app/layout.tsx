import type { Metadata, Viewport } from "next";
import { fontClassNames } from "@/lib/fonts";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { brand } from "@/lib/brand";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Manaseer Group: six strategic sectors, 20+ companies and 10,000 people building Jordan's industrial future since 1999.",
  icons: { icon: "/brand/favicon-25.png" },
  openGraph: {
    siteName: brand.name,
    title: `${brand.name} — ${brand.tagline}`,
    type: "website",
    locale: "en_US",
    images: [{ url: "/brand/logo.svg", width: 332, height: 111 }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: brand.colors.navy700,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" dir="ltr" className={`${fontClassNames} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
