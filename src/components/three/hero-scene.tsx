"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { brand } from "@/lib/brand";
import { prefersReducedMotion } from "@/lib/utils";

const BLADES = 8;

/**
 * Placeholder signature object: the Manaseer pinwheel mark rebuilt as 3D blades.
 * Proves the R3F pipeline end-to-end (lighting, env map, frame loop, reduced motion).
 * Replace with the real hero scene once art direction is approved.
 */
export function HeroScene() {
  const group = useRef<THREE.Group>(null);
  const reduce = useMemo(() => prefersReducedMotion(), []);

  const blade = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(1.6, 0.35);
    shape.lineTo(1.05, 0.95);
    shape.lineTo(0.2, 0.55);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.18,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 4,
    });
  }, []);

  useFrame((_, delta) => {
    if (reduce || !group.current) return;
    group.current.rotation.z += delta * 0.25;
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} />
      <directionalLight position={[-5, -2, -4]} intensity={0.8} color={brand.colors.cyan500} />
      <Environment preset="city" />
      <Float
        speed={reduce ? 0 : 1.2}
        rotationIntensity={reduce ? 0 : 0.35}
        floatIntensity={reduce ? 0 : 0.6}
      >
        <group ref={group} rotation={[0.35, -0.3, 0]}>
          {Array.from({ length: BLADES }, (_, i) => (
            <mesh key={i} geometry={blade} rotation={[0, 0, (i / BLADES) * Math.PI * 2]}>
              <meshPhysicalMaterial
                color={i % 2 === 0 ? brand.colors.navy700 : brand.colors.blue600}
                metalness={0.35}
                roughness={0.3}
                clearcoat={0.6}
                clearcoatRoughness={0.2}
              />
            </mesh>
          ))}
        </group>
      </Float>
    </>
  );
}
