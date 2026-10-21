"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/utils";
import { FanLights } from "./fan-lights";
import { Pinwheel } from "./pinwheel";

/** Earlier R3F hero (not on the home route). Kept for other pages. */
export function HeroScene() {
  const group = useRef<THREE.Group>(null);
  const reduce = useMemo(() => prefersReducedMotion(), []);

  useFrame((_, delta) => {
    if (reduce || !group.current) return;
    group.current.rotation.z += delta * 0.25;
  });

  return (
    <>
      <FanLights />
      <Float speed={reduce ? 0 : 1.2} rotationIntensity={reduce ? 0 : 0.35} floatIntensity={reduce ? 0 : 0.6}>
        <group rotation={[0.35, -0.3, 0]}>
          <Pinwheel ref={group} />
        </group>
      </Float>
    </>
  );
}
