import { Logo } from "@/components/brand/logo";
import { Reveal } from "@/components/motion/reveal";
import { SceneCanvas } from "@/components/three/scene-canvas";
import { HeroScene } from "@/components/three/hero-scene";
import { brand } from "@/lib/brand";

/**
 * Placeholder hero that proves the full stack: server-rendered copy, GSAP SplitText
 * reveal, Lenis-driven scroll, and an SSR-safe R3F scene. Art direction TBD.
 */
export function Hero() {
  return (
    <section className="theme-dark relative isolate flex min-h-dvh flex-col overflow-hidden bg-bg text-fg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_70%_40%,color-mix(in_oklab,var(--brand-blue-600)_35%,transparent),transparent_70%)]"
      />
      <div className="absolute inset-0 -z-10">
        <SceneCanvas>
          <HeroScene />
        </SceneCanvas>
      </div>

      <header className="container-site flex items-center justify-between py-6">
        <Logo variant="white" className="w-36 md:w-44" />
        <nav aria-label="Primary" className="hidden gap-8 font-display text-sm uppercase tracking-[0.18em] md:flex">
          <a href="#sectors" className="text-fg-muted transition-colors hover:text-fg">Sectors</a>
          <a href="#glance" className="text-fg-muted transition-colors hover:text-fg">At a glance</a>
          <a href="#contact" className="text-fg-muted transition-colors hover:text-fg">Contact</a>
        </nav>
      </header>

      <div className="container-site flex flex-1 flex-col justify-end pb-16 md:pb-24">
        <Reveal className="max-w-4xl">
          <p data-split className="eyebrow mb-6">
            Amman, Jordan · Since {brand.founded}
          </p>
          <h1 data-split className="text-display">
            {brand.tagline}
          </h1>
          <p data-split className="mt-8 max-w-xl text-lg leading-relaxed text-fg-muted md:text-xl">
            Six strategic sectors, more than twenty companies, and ten thousand people
            building Jordan&rsquo;s industrial backbone.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
