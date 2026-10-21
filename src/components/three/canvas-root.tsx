"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { cn } from "@/lib/utils";

/**
 * The only place a <Canvas> is created. Always loaded through SceneCanvas
 * (next/dynamic, ssr:false). Never import this file from a server component.
 */
export default function CanvasRoot({ className, children, ...props }: CanvasProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      camera={{ fov: 32, near: 0.1, far: 100, position: [0, 0, 7] }}
      className={cn("!absolute inset-0", className)}
      {...props}
    >
      {children}
    </Canvas>
  );
}
