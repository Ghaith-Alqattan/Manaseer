"use client";

import { useEffect, useRef, useState } from "react";
import { SceneCanvas } from "@/components/three/scene-canvas";
import { LoaderScene } from "@/components/three/loader-scene";
import { cn } from "@/lib/utils";

type Props = {
  /** 0..1 */
  progress: number;
  /** true once every clip is in memory; triggers the exit */
  ready: boolean;
  onDone: () => void;
};

const MIN_SHOW_MS = 2600;
const EXIT_MS = 900;

/**
 * Loading screen. The whole viewport is the gauge: a lighter navy "water" rises from the
 * bottom as the clips download, its surface drawn as two drifting waves. The 3D pinwheel
 * turns at the centre (never the logo). The percentage sits bottom-left. Exit is an upward
 * wipe on timers and a CSS transition, so a throttled tab can never stall it.
 */
export function WorldPreloader({ progress, ready, onDone }: Props) {
  const shownAt = useRef<number>(0);
  const progressRef = useRef(0);
  const [leaving, setLeaving] = useState(false);
  const pct = Math.round(progress * 100);

  useEffect(() => {
    if (!shownAt.current) shownAt.current = performance.now();
  }, []);

  // Mirror progress into a ref for the render loop (refs are not read during render).
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  // External timing: hold for the minimum, then wipe and release.
  useEffect(() => {
    if (!ready) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wait = Math.max(0, MIN_SHOW_MS - (performance.now() - shownAt.current));
    const t1 = window.setTimeout(() => (reduce ? onDone() : setLeaving(true)), wait);
    const t2 = window.setTimeout(onDone, wait + (reduce ? 0 : EXIT_MS));
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [ready, onDone]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading the world, ${pct} percent`}
      className={cn(
        "theme-dark fixed inset-0 z-[100] overflow-hidden bg-[#03102e] text-fg transition-transform ease-[var(--ease-in-out-quart)] motion-reduce:transition-none",
        leaving ? "-translate-y-full" : "translate-y-0",
      )}
      style={{ transitionDuration: `${EXIT_MS}ms` }}
    >
      {/* Water: height follows progress; two wave layers drift across its surface */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 transition-[height] duration-500 ease-out"
        style={{ height: `${pct}%` }}
      >
        <div className="absolute inset-x-0 bottom-0 top-0 bg-[#153b8f]" />
        <svg
          className="absolute bottom-full left-0 h-[64px] w-[200%] animate-[wave_7s_linear_infinite] motion-reduce:animate-none md:h-[96px]"
          viewBox="0 0 2880 96"
          preserveAspectRatio="none"
        >
          <path
            fill="#153b8f"
            d="M0 56 C 180 20, 360 20, 540 56 S 900 92, 1080 56 S 1440 20, 1620 56 S 1980 92, 2160 56 S 2520 20, 2700 56 L 2880 56 L 2880 96 L 0 96 Z"
          />
        </svg>
        <svg
          className="absolute bottom-full left-0 h-[48px] w-[200%] animate-[wave_11s_linear_infinite_reverse] opacity-70 motion-reduce:animate-none md:h-[72px]"
          viewBox="0 0 2880 96"
          preserveAspectRatio="none"
        >
          <path
            fill="#1f4aa8"
            d="M0 60 C 240 30, 480 30, 720 60 S 1200 90, 1440 60 S 1920 30, 2160 60 S 2640 90, 2880 60 L 2880 96 L 0 96 Z"
          />
        </svg>
      </div>

      {/* The pinwheel, turning at the centre over the water */}
      <div
        className={cn(
          "absolute inset-0 transition-[opacity,transform] duration-300",
          leaving ? "scale-95 opacity-0" : "scale-100 opacity-100",
        )}
      >
        <SceneCanvas dpr={[1, 1.5]} camera={{ fov: 32, near: 0.1, far: 100, position: [0, 0, 7] }}>
          <LoaderScene progress={progressRef} />
        </SceneCanvas>
      </div>

      {/* Percentage, bottom-left */}
      <div
        className={cn(
          "absolute bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-[clamp(1.25rem,5vw,4rem)] transition-[opacity,transform] duration-300 md:bottom-10",
          leaving ? "-translate-y-4 opacity-0" : "translate-y-0 opacity-100",
        )}
      >
        <p className="eyebrow text-white/80">Preparing the world</p>
        <p className="mt-2 font-display text-[clamp(4rem,12vw,9rem)] font-bold leading-none tabular-nums text-white">
          {pct}
          <span className="text-[0.32em] font-light text-white/70">%</span>
        </p>
      </div>
    </div>
  );
}
