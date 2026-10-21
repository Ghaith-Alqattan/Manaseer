"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { REDUCED_MOTION_QUERY } from "@/lib/utils";

let instance: Lenis | null = null;

/** Programmatic access (e.g. nav links): getLenis()?.scrollTo("#sectors") */
export function getLenis() {
  return instance;
}

/**
 * Lenis smooth scroll driven by GSAP's ticker so ScrollTrigger and Lenis share
 * one clock (no double-RAF, no scrub jitter). Disabled for reduced-motion users,
 * who get native scrolling. ScrollTrigger still works without Lenis.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  // External-system sync: the one legitimate useEffect in the app shell.
  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
    if (mq.matches) return;

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      anchors: true,
    });
    instance = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return children;
}
