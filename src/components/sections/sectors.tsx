"use client";

import Image from "next/image";
import { useRef } from "react";
import { brand } from "@/lib/brand";
import { gsap, useGSAP } from "@/lib/gsap";

const VISION =
  "To be the top player in each sector we are in, guided by our values, we will lead the way to deliver economic prosperity, improve social wellbeing and a healthy environment for future generations.";

/** Real photography: all six are the client's own site images. */
const PHOTOS: Record<string, { src: string; alt: string; credit?: string }> = {
  "building-materials": { src: "/images/sectors/building-materials.webp", alt: "A construction site at dusk with tower cranes and concrete pumps" },
  "industrial-minerals": { src: "/images/sectors/industrial-minerals.webp", alt: "Aerial view of an industrial complex in the Jordanian desert" },
  "life-sciences": { src: "/images/sectors/life-sciences.webp", alt: "A seedling growing in dark soil" },
  "energy-mobility": { src: "/images/sectors/energy-mobility.webp", alt: "A Manaseer Oil & Gas fuel station" },
  "commercial-services": { src: "/images/sectors/commercial-services.webp", alt: "The lattice facade of Manaseer Group headquarters" },
  vision: { src: "/images/sectors/vision.webp", alt: "The Amman skyline with the Jordanian flag" },
};

/**
 * Six full-viewport slides, pinned, each sliding in from the right over the previous one
 * as the visitor scrolls (one viewport of scroll per slide). Reduced motion: a plain
 * vertical stack, no pin.
 */
export function Sectors() {
  const root = useRef<HTMLElement>(null);
  const total = brand.sectors.reduce((n, s) => n + s.companies.length, 0);
  const count = brand.sectors.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const slides = gsap.utils.toArray<HTMLElement>("[data-slide]", root.current);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${(slides.length - 1) * window.innerHeight}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        slides.forEach((slide, i) => {
          if (i === 0) return;
          const photo = slide.querySelector<HTMLElement>("[data-photo]");
          tl.fromTo(slide, { xPercent: 100 }, { xPercent: 0, ease: "none", duration: 1 }, i - 1);
          if (photo) tl.fromTo(photo, { scale: 1.12, xPercent: -6 }, { scale: 1, xPercent: 0, ease: "none", duration: 1 }, i - 1);
          // The slide underneath drifts left a little as it is covered, for depth.
          tl.to(slides[i - 1], { xPercent: -12, ease: "none", duration: 1 }, i - 1);
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="sectors"
      aria-labelledby="sectors-title"
      className="relative h-dvh w-full overflow-hidden bg-[#03102e] text-white motion-reduce:h-auto"
    >
      <h2 id="sectors-title" className="sr-only">
        Six sectors, {total} companies
      </h2>
      {brand.sectors.map((s, i) => {
        const photo = PHOTOS[s.slug];
        return (
          <article
            key={s.slug}
            data-slide
            style={{ zIndex: i + 1 }}
            className="absolute inset-0 h-dvh w-full overflow-hidden motion-reduce:relative motion-reduce:h-auto motion-reduce:min-h-dvh"
          >
            <div data-photo className="absolute inset-0 will-change-transform">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="100vw"
                priority={i === 0}
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,#03102e_90%,transparent)_0%,color-mix(in_oklab,#03102e_55%,transparent)_48%,color-mix(in_oklab,#03102e_15%,transparent)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,color-mix(in_oklab,#03102e_85%,transparent)_100%)]" />
            {photo.credit && (
              <p className="absolute bottom-[calc(0.75rem+env(safe-area-inset-bottom))] right-4 z-10 text-[0.65rem] tracking-wide text-white/55">
                {photo.credit}
              </p>
            )}

            <div className="container-site relative flex h-full flex-col justify-end pb-[calc(3rem+env(safe-area-inset-bottom))] md:justify-center md:pb-0">
              <p className="font-display text-xs tracking-[0.22em] text-cyan-300">
                {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                <span className="mx-3 text-white/40">·</span>
                <span className="uppercase">{s.companies.length > 0 ? `${s.companies.length} companies` : "Group vision"}</span>
              </p>
              <h3 className="mt-4 max-w-4xl font-display text-[clamp(2.4rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.02em] text-balance">
                {s.name}
              </h3>
              <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-white/85 md:text-xl">
                {s.companies.length > 0 ? (
                  s.companies.map((c, k) => (
                    <span key={c}>
                      {c}
                      {k < s.companies.length - 1 && (
                        <span aria-hidden className="mx-2 text-cyan-300/70">
                          /
                        </span>
                      )}
                    </span>
                  ))
                ) : (
                  VISION
                )}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
