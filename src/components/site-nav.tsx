"use client";

import { useRef, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Fixed navigation that appears once the visitor has flown past the islands (the start of
 * the sections sheet, #after-world) and hides again when they scroll back into the world.
 */
export function SiteNav() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    // isActive-based so a later ScrollTrigger.refresh() (the world engine adds its scroll
    // track after mount) re-evaluates visibility instead of leaving a stale onEnter state.
    ScrollTrigger.create({
      trigger: "#after-world",
      start: "top 80px",
      end: "max",
      onToggle: (self) => setVisible(self.isActive),
      onRefresh: (self) => setVisible(self.isActive),
    });
  }, []);

  return (
    <header
      ref={ref}
      aria-hidden={!visible}
      className={cn(
        "theme-dark fixed inset-x-0 top-0 z-[90] border-b border-line bg-[#03102e]/85 text-fg backdrop-blur-md transition-transform duration-500 ease-[var(--ease-out-expo)]",
        visible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="container-site flex items-center justify-between py-3 md:py-4">
        <a href="#top" aria-label="Manaseer Group, back to top" tabIndex={visible ? 0 : -1}>
          <Logo variant="white" className="w-28 md:w-36" />
        </a>
        <nav aria-label="Site" className="flex gap-6 font-display text-xs uppercase tracking-[0.2em] md:gap-8">
          <a href="#sectors" className="transition-opacity hover:opacity-70" tabIndex={visible ? 0 : -1}>
            Sectors
          </a>
          <a href="#contact" className="transition-opacity hover:opacity-70" tabIndex={visible ? 0 : -1}>
            Contact us
          </a>
        </nav>
      </div>
    </header>
  );
}
