"use client";

import { useEffect, useRef } from "react";
import { mountScrollWorld } from "./scrub-engine";
import { worldConfig } from "./world-config";

/**
 * Mounts the scroll-world scrub engine (vanilla JS, builds its own fixed-position
 * stage + a tall scroll track) into a container. The engine reads window.scrollY,
 * so Lenis's smoothed native scroll drives it with no extra wiring.
 *
 * The engine has no destroy(); on unmount we clear the DOM it built and its
 * injected stylesheet, which is enough for React strict-mode remounts in dev.
 */
export function World() {
  const ref = useRef<HTMLDivElement>(null);

  // External-system sync (imperative engine), not derived state.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    mountScrollWorld(node, worldConfig);
    return () => {
      node.replaceChildren();
      node.classList.remove("sw-root");
      document.getElementById("sw-css")?.remove();
    };
  }, []);

  return (
    <div
      ref={ref}
      id="world"
      className="world-theme"
      aria-label="Scroll to fly through the world of Manaseer Group"
    />
  );
}
