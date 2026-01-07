import React, { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

import CanvasLoader from "../Loader";

// 🎨 lightning palette
const GLOW_COLOR = "#22c55e";   // main lightning green
const RIM_COLOR = "#4ade80";    // secondary line color
const NODE_COLOR = "#bbf7d0";   // minty node fill

/**
 * Rotating node cage with:
 *  - glowing nodes
 *  - glowing edges (lines) connecting them
 *  - a traveling green light hopping node to node
 */
const NodeCageScene = () => {
  const group = useRef();
  const glowLight = useRef();
  const edgesRef = useRef();

  // geometry for cage + nodes
  const { nodePositions, edgesGeometry } = useMemo(() => {
    // base poly
    const geo = new THREE.IcosahedronGeometry(1.55, 1);

    // unique vertices for nodes
    const posAttr = geo.attributes.position;
    const map = new Map();
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = posAttr.getZ(i);
      const key = `${x.toFixed(3)},${y.toFixed(3)},${z.toFixed(3)}`;
      if (!map.has(key)) {
        map.set(key, new THREE.Vector3(x, y, z));
      }
    }
    const nodePositions = Array.from(map.values());

    // edges for line segments
    const edgesGeometry = new THREE.EdgesGeometry(geo);
    geo.dispose();

    return { nodePositions, edgesGeometry };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // float + slow rotation
    if (group.current) {
      group.current.position.y = Math.sin(t * 0.7) * 0.15;
      group.current.rotation.y = t * 0.25;
      group.current.rotation.x = Math.sin(t * 0.15) * 0.1;
    }

    // pulsing edges -> feels like energy running along lines
    if (edgesRef.current && edgesRef.current.material) {
      const base = 0.35;
      const pulse = 0.25 * Math.sin(t * 3.0) + 0.25 * Math.sin(t * 5.3);
      edgesRef.current.material.opacity = base + pulse; // between ~0.1–0.8
    }

    // traveling point light hopping across nodes
    if (glowLight.current && nodePositions.length > 0) {
      const speed = 2.0;
      const idx = Math.floor((t * speed) % nodePositions.length);
      const nextPos = nodePositions[idx];
      const out = nextPos.clone().multiplyScalar(1.05);
      glowLight.current.position.set(out.x, out.y, out.z);
    }
  });

  return (
    <group ref={group}>
      {/* 1️⃣ edges: green glowing lines connecting nodes */}
      <lineSegments ref={edgesRef}>
        <primitive object={edgesGeometry} attach="geometry" />
        <lineBasicMaterial
          color={GLOW_COLOR}
          transparent
          opacity={0.5}
        />
      </lineSegments>

      {/* 2️⃣ glowing nodes at each vertex */}
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial
            color={NODE_COLOR}
            emissive={GLOW_COLOR}
            emissiveIntensity={1.6}
            metalness={0.3}
            roughness={0.25}
          />
        </mesh>
      ))}

      {/* 3️⃣ traveling green light moving along the network */}
      <pointLight
        ref={glowLight}
        color={GLOW_COLOR}
        intensity={2.2}
        distance={3}
      />
    </group>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 100,
        position: [0, 0, 8],
      }}
      gl={{
        preserveDrawingBuffer: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* dark background so green glow pops */}
        <color attach="background" args={["#020617"]} />

        <ambientLight intensity={0.25} />

        {/* soft base lights */}
        <pointLight
          color={GLOW_COLOR}
          intensity={1.0}
          distance={10}
          position={[2, 2, 2]}
        />
        <pointLight
          color={"#0ea5e9"}
          intensity={0.35}
          distance={8}
          position={[-2, -1, -3]}
        />

        {/* 🧠⚡ node + line lightning network */}
        <NodeCageScene />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
