"use client";

import { useRef, useState } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SceneCanvas } from "./scene-canvas";
import { FanScene } from "./fan-scene";

/**
 * Backdrop for the contact section, built for a steady frame rate:
 * - The WebGL context and shaders are created early (when the slides begin), while the
 *   visitor is reading, never during the slide transitions or the fan's own entrance.
 * - The render loop runs only while the contact section is within 130% of the viewport;
 *   off-screen the canvas is frozen (frameloop "never"), so it costs nothing elsewhere.
 * - Device pixel ratio is capped at 1.5.
 */
export function FanBackdrop({ trigger }: { trigger: string }) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const progress = useRef(0);
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({ trigger: "#sectors", start: "top bottom", once: true, onEnter: () => setMounted(true) });
    ScrollTrigger.create({
      trigger,
      start: "top 130%",
      end: "bottom top",
      onToggle: (self) => setActive(self.isActive),
      onRefresh: (self) => setActive(self.isActive),
    });
    ScrollTrigger.create({
      trigger,
      start: "top bottom",
      end: "top 10%",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });
  }, [trigger]);

  return (
    <div ref={root} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {mounted && (
        <SceneCanvas
          dpr={[1, 1.5]}
          frameloop={active ? "always" : "never"}
          camera={{ fov: 32, near: 0.1, far: 100, position: [0, 0, 7] }}
        >
          <FanScene progress={progress} />
        </SceneCanvas>
      )}
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_75%_35%,color-mix(in_oklab,var(--brand-blue-600)_28%,transparent),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,#03102e_88%,transparent)_0%,color-mix(in_oklab,#03102e_62%,transparent)_45%,color-mix(in_oklab,#03102e_38%,transparent)_100%)]" />
    </div>
  );
}
