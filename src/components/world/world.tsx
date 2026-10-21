"use client";

import { useEffect, useRef, useState } from "react";
import { mountScrollWorld } from "./scrub-engine";
import { worldConfig } from "./world-config";
import { WorldPreloader } from "./world-preloader";
import { isMobileViewport, preloadClips, worldClipUrls } from "./preload";
import { getLenis } from "@/components/providers/smooth-scroll";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * 1. Preload every clip for this device into memory (progress shown by WorldPreloader).
 * 2. Mount the scrub engine with those blobs, so scrolling never waits on a download.
 * The engine reads window.scrollY, so Lenis's smoothed native scroll drives it directly.
 * Scrolling is held while the preloader is up.
 */
export function World() {
  const ref = useRef<HTMLDivElement>(null);
  const [blobs, setBlobs] = useState<Map<string, Blob> | null>(null);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  // External-system sync: fetch the clips once, on the client.
  useEffect(() => {
    let cancelled = false;
    document.documentElement.classList.add("is-preloading");
    getLenis()?.stop();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const urls = reduce ? [] : worldClipUrls(worldConfig, isMobileViewport());
    preloadClips(urls, (f) => {
      if (!cancelled) setProgress(f);
    }).then((map) => {
      if (!cancelled) setBlobs(map);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Mount the engine once the clips are in memory. No destroy() upstream, so unmount
  // clears the DOM it built and its stylesheet (enough for strict-mode remounts).
  useEffect(() => {
    const node = ref.current;
    if (!blobs || !node) return;
    mountScrollWorld(node, { ...worldConfig, preloaded: blobs });
    // The engine just added a ~14-viewport scroll track; every ScrollTrigger below the
    // world (nav reveal, pinned slides, contact backdrop) measured the page before it.
    ScrollTrigger.refresh();
    return () => {
      node.replaceChildren();
      node.classList.remove("sw-root");
      document.getElementById("sw-css")?.remove();
    };
  }, [blobs]);

  const release = () => {
    setDone(true);
    document.documentElement.classList.remove("is-preloading");
    window.scrollTo(0, 0);
    getLenis()?.start();
    ScrollTrigger.refresh();
  };

  return (
    <>
      <div
        ref={ref}
        id="world"
        className="world-theme min-h-dvh"
        aria-label="Scroll to fly through the world of Manaseer Group"
      />
      {!done && <WorldPreloader progress={progress} ready={blobs !== null} onDone={release} />}
    </>
  );
}
