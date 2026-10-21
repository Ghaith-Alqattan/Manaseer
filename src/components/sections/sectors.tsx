import Image from "next/image";
import { brand } from "@/lib/brand";

const VISION =
  "To be the top player in each sector we are in, guided by our values, we will lead the way to deliver economic prosperity, improve social wellbeing and a healthy environment for future generations.";

/**
 * A ledger, not a card grid: six sectors in the order the camera visited them, each with
 * its company roster set as running text. The swatch beside each row is a crop from that
 * sector's rendered scene, so the page's imagery is the world the visitor just flew through.
 */
export function Sectors() {
  const total = brand.sectors.reduce((n, s) => n + s.companies.length, 0);
  return (
    <section
      id="sectors"
      aria-labelledby="sectors-title"
      className="theme-stone bg-bg text-fg"
    >
      <div className="container-site py-28 md:py-40">
        <header className="max-w-3xl">
          <p className="eyebrow mb-6">What we build, mine, grow and move</p>
          <h2
            id="sectors-title"
            className="font-display text-[clamp(2.25rem,5.2vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.02em]"
          >
            Six sectors.
            <br />
            {total} companies.
          </h2>
        </header>

        <ol className="mt-20 border-t border-line">
          {brand.sectors.map((s) => (
            <li
              key={s.slug}
              className="grid grid-cols-[4.5rem_1fr] gap-x-5 gap-y-3 border-b border-line py-8 md:grid-cols-[7rem_minmax(0,18rem)_1fr] md:gap-x-10 md:py-10"
            >
              <Image
                src={`/world/crops/${s.slug}.webp`}
                alt=""
                width={800}
                height={800}
                sizes="(min-width: 768px) 7rem, 4.5rem"
                className="aspect-square w-full rounded-sm object-cover"
              />
              <h3 className="self-start font-display text-2xl font-bold leading-tight tracking-[-0.01em] md:text-[1.75rem]">
                {s.name}
                {s.companies.length > 0 && (
                  <span className="mt-1 block font-sans text-sm font-normal tracking-normal text-fg-muted">
                    {s.companies.length} companies
                  </span>
                )}
              </h3>
              <p className="col-span-2 self-start text-[1.0625rem] leading-relaxed text-fg md:col-span-1 md:text-lg">
                {s.companies.length > 0 ? (
                  s.companies.map((c, i) => (
                    <span key={c}>
                      {c}
                      {i < s.companies.length - 1 && (
                        <span aria-hidden className="mx-2 text-stone-400">
                          /
                        </span>
                      )}
                    </span>
                  ))
                ) : (
                  <span className="text-fg-muted">{VISION}</span>
                )}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
