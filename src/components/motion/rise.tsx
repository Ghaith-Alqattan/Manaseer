"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type RiseProps = {
  children: ReactNode;
  className?: string;
  /** Elements inside marked data-rise animate in sequence; otherwise the wrapper itself */
  stagger?: number;
  start?: string;
};

/** Scroll-triggered rise-in (translate + fade) for blocks of content. Reduced motion: shown as-is. */
export function Rise({ children, className, stagger = 0.1, start = "top 75%" }: RiseProps) {
  const scope = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = scope.current!.querySelectorAll<HTMLElement>("[data-rise]");
        const targets = items.length ? items : [scope.current!];
        gsap.from(targets, {
          y: 44,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger,
          scrollTrigger: { trigger: scope.current, start, once: true },
        });
      });
    },
    { scope },
  );
  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
