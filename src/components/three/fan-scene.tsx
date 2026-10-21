"use client";

import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/utils";
import { FanLights } from "./fan-lights";
import { Pinwheel } from "./pinwheel";

type FanSceneProps = {
  /** 0 = section still below the fold, 1 = section fully entered. Driven by ScrollTrigger. */
  progress: RefObject<number>;
};

const SCALE_FAR = 2.4; // filling the frame as the section arrives
const SCALE_REST = 0.9; // resting backdrop size

/**
 * The pinwheel as a backdrop: large and close as the contact section enters, zooming out
 * to a slow-turning background object. Scroll progress is smoothed per frame (critically
 * damped lerp) so a fast scroll never snaps the scale, and the group only ever rotates
 * about its own centre on a fixed tilt, so there is no wobble.
 */
export function FanScene({ progress }: FanSceneProps) {
  const group = useRef<THREE.Group>(null);
  const smoothed = useRef(0);
  const reduce = useMemo(() => prefersReducedMotion(), []);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const target = reduce ? 1 : Math.min(1, Math.max(0, progress.current ?? 0));
    const dt = Math.min(delta, 1 / 30);
    smoothed.current += (target - smoothed.current) * Math.min(1, dt * 7);
    const eased = 1 - Math.pow(1 - smoothed.current, 3);
    g.scale.setScalar(SCALE_FAR - (SCALE_FAR - SCALE_REST) * eased);
    if (!reduce) g.rotation.z += dt * (0.1 + 0.3 * (1 - eased));
  });

  return (
    <>
      <FanLights />
      {/* Fixed tilt on an outer group; the inner group only spins. */}
      <group position={[1.15, 0.1, 0]} rotation={[0.42, -0.28, 0]}>
        <Pinwheel ref={group} />
      </group>
    </>
  );
}
