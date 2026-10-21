"use client";

import { brand } from "@/lib/brand";

/**
 * Three-point rig for the pinwheel. No environment map: the drei presets download an
 * HDR from a CDN and build a PMREM on arrival, which is a network wait plus a frame
 * hitch at exactly the wrong moment. Lights alone are deterministic and cost nothing.
 */
export function FanLights() {
  return (
    <>
      <hemisphereLight args={["#dfe8ff", "#03102e", 0.55]} />
      <directionalLight position={[4, 6, 5]} intensity={1.7} />
      <directionalLight position={[-6, -2, -3]} intensity={1.1} color={brand.colors.cyan500} />
      <directionalLight position={[0, -5, 6]} intensity={0.5} color="#ffffff" />
    </>
  );
}
