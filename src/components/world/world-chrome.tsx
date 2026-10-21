import { Logo } from "@/components/brand/logo";

/**
 * Brand header pinned to the top of the world (absolute, not fixed): it greets on landing
 * and scrolls away with the first scene, so it never collides with the sections' copy.
 * The finale CTAs and the footer carry navigation from there on.
 */
export function WorldChrome() {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-[80]">
      <div className="container-site flex items-center justify-between py-5 md:py-6">
        <a href="#top" className="pointer-events-auto" aria-label="Manaseer Group, back to top">
          <Logo variant="white" className="w-32 md:w-40" />
        </a>
        <nav
          aria-label="Primary"
          className="pointer-events-auto hidden gap-8 font-display text-xs uppercase tracking-[0.2em] text-white md:flex"
        >
          <a href="#sectors" className="transition-opacity hover:opacity-70">Sectors</a>
          <a href="#contact" className="transition-opacity hover:opacity-70">Order now</a>
        </nav>
      </div>
    </header>
  );
}
