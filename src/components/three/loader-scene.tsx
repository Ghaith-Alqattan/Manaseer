"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/utils";
import { FanLights } from "./fan-lights";
import { Pinwheel } from "./pinwheel";

/** The pinwheel turning at the centre of the loading screen, speeding up as progress climbs. */
export function LoaderScene({ progress }: { progress: React.RefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const reduce = useMemo(() => prefersReducedMotion(), []);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g || reduce) return;
    const p = Math.min(1, Math.max(0, progress.current ?? 0));
    g.rotation.z += Math.min(delta, 1 / 30) * (0.35 + 0.9 * p);
  });

  return (
    <>
      <FanLights />
      <group rotation={[0.3, -0.22, 0]} scale={1.35}>
        <Pinwheel ref={group} />
      </group>
    </>
  );
}
