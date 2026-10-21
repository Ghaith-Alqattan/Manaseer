"use client";

import dynamic from "next/dynamic";
import type { CanvasProps } from "@react-three/fiber";

/**
 * SSR-safe entry point for any 3D scene. Usage from a server component:
 *   <div className="relative h-dvh"><SceneCanvas><HeroScene /></SceneCanvas></div>
 * The WebGL bundle is split out and only ships to the client.
 */
export const SceneCanvas = dynamic<CanvasProps>(() => import("./canvas-root"), {
  ssr: false,
  loading: () => null,
});
