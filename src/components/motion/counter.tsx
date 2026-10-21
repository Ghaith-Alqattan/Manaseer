"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type CounterProps = {
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

/** Scroll-triggered number count-up. Proves ScrollTrigger and Lenis stay in sync. */
export function Counter({ to, prefix = "", suffix = "", className }: CounterProps) {
  const el = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const obj = { v: 0 };
      const fmt = new Intl.NumberFormat("en-US");
      const render = () => {
        if (el.current) el.current.textContent = `${prefix}${fmt.format(Math.round(obj.v))}${suffix}`;
      };
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(obj, {
          v: to,
          duration: 1.8,
          ease: "expo.out",
          onUpdate: render,
          scrollTrigger: { trigger: el.current, start: "top 85%", once: true },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        obj.v = to;
        render();
      });
    },
    { scope: el },
  );

  return (
    <span ref={el} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
