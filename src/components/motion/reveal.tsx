"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay before the first word moves, in seconds */
  delay?: number;
  /** When true, plays on scroll into view instead of on mount */
  onScroll?: boolean;
};

/**
 * Masked line/word reveal. Mark text inside with `data-split` to animate it.
 * Respects prefers-reduced-motion via gsap.matchMedia (text simply shows).
 */
export function Reveal({ children, className, delay = 0, onScroll = false }: RevealProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = scope.current!.querySelectorAll<HTMLElement>("[data-split]");
        if (!targets.length) return;
        const split = SplitText.create(targets, {
          type: "lines,words",
          mask: "lines",
          autoSplit: true,
        });
        gsap.from(split.words, {
          yPercent: 115,
          opacity: 0,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.035,
          delay,
          scrollTrigger: onScroll
            ? { trigger: scope.current, start: "top 80%", once: true }
            : undefined,
        });
        return () => split.revert();
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
