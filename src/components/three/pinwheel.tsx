"use client";

import { forwardRef, useMemo } from "react";
import * as THREE from "three";
import { brand } from "@/lib/brand";

const BLADES = 8;
const DEPTH = 0.18;

/**
 * The Manaseer mark as eight extruded blades. The geometry is centred on its own
 * rotation axis (blade root at the origin, extrusion centred in z), so spinning the
 * group never wobbles. One shared geometry, two shared materials: 8 draw calls total.
 * Standard (not physical) material: no clearcoat pass, so the shader is cheap.
 */
export const Pinwheel = forwardRef<THREE.Group, { metalness?: number; roughness?: number }>(
  function Pinwheel({ metalness = 0.35, roughness = 0.4 }, ref) {
    const blade = useMemo(() => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.lineTo(1.6, 0.35);
      shape.lineTo(1.05, 0.95);
      shape.lineTo(0.2, 0.55);
      shape.closePath();
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: DEPTH,
        bevelEnabled: true,
        bevelThickness: 0.04,
        bevelSize: 0.04,
        bevelSegments: 3,
      });
      geo.translate(0, 0, -DEPTH / 2); // centre the extrusion on the axis
      geo.computeVertexNormals();
      return geo;
    }, []);

    const materials = useMemo(
      () => [
        new THREE.MeshStandardMaterial({ color: brand.colors.navy700, metalness, roughness }),
        new THREE.MeshStandardMaterial({ color: brand.colors.blue600, metalness, roughness }),
      ],
      [metalness, roughness],
    );

    return (
      <group ref={ref}>
        {Array.from({ length: BLADES }, (_, i) => (
          <mesh
            key={i}
            geometry={blade}
            material={materials[i % 2]}
            rotation={[0, 0, (i / BLADES) * Math.PI * 2]}
            frustumCulled={false}
          />
        ))}
      </group>
    );
  },
);
