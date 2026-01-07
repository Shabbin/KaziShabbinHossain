// src/components/NetworkGlobe.jsx
"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const NODE_RADIUS = 0.05;

// Colors
const GREEN_NODE = "#16a34a";
const GREEN_LINE = "#14532d";
const GREEN_GLOW = "#22c55e";

const RED_NODE = "#dc2626";
const RED_LINE = "#991b1b";
const RED_GLOW = "#f87171";

// ⭐ Spiral color (complements green on black)
const SPIRAL_COLOR = "#38bdf8"; // cyan / sky blue

// Generate random nodes (like city lights)
const generateNodes = (count = 120, radius = 2) => {
  const nodes = [];
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    nodes.push(new THREE.Vector3(x, y, z));
  }
  return nodes;
};

const GREEN_NODES = generateNodes(100);
const RED_NODES = generateNodes(80);

// Particle moving along a curve
const Particle = ({ curve, color = GREEN_GLOW, speed = 0.2 }) => {
  const ref = useRef();
  useFrame((state) => {
    const t = (state.clock.elapsedTime * speed) % 1;
    const pos = curve.getPoint(t);
    if (ref.current) ref.current.position.set(pos.x, pos.y, pos.z);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.02, 6, 6]} />
      <meshStandardMaterial color={color} emissive={color} />
    </mesh>
  );
};

// Compute connections to closest neighbors
const computeConnections = (nodes, neighbors = 3) => {
  const curves = [];
  for (let i = 0; i < nodes.length; i++) {
    const start = nodes[i];
    const distances = nodes
      .map((n, idx) => ({ idx, dist: start.distanceTo(n) }))
      .filter(d => d.idx !== i)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, neighbors);

    distances.forEach(d => {
      const end = nodes[d.idx];
      const mid = start.clone().add(end).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(2.2);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      curves.push(curve);
    });
  }
  return curves;
};

/* ===========================
   🌪️ SPIRAL GRAVITY EFFECT
=========================== */
const SpiralGravity = ({ count = 1200 }) => {
  const pointsRef = useRef();

  const particles = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      radius: 2.6 + Math.random() * 0.6,
      angle: Math.random() * Math.PI * 2,
      y: (Math.random() - 0.5) * 1.5,
      speed: 0.002 + Math.random() * 0.003,
    }));
  }, [count]);

  const positions = useMemo(() => new Float32Array(count * 3), [count]);

  useFrame(() => {
    particles.forEach((p, i) => {
      p.angle += p.speed;        // rotation
      p.radius -= 0.0009;        // gravity pull

      if (p.radius < 2.15) {
        p.radius = 3.2;
      }

      positions[i * 3]     = Math.cos(p.angle) * p.radius;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = Math.sin(p.angle) * p.radius;
    });

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={SPIRAL_COLOR}
        transparent
        opacity={0.55}
      />
    </points>
  );
};

const Globe = () => {
  const globeRef = useRef();

  const greenCurves = computeConnections(GREEN_NODES, 3);
  const redCurves = computeConnections(RED_NODES, 3);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
      globeRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime / 10) * 0.05;
    }
  });

  return (
    <group ref={globeRef}>
      {/* 🖤 Black Globe */}
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#000000"
          roughness={0.8}
          metalness={0.1}
        />
      </Sphere>

      {/* 🌪️ Spiral Gravity */}
      <SpiralGravity />

      {/* Green Nodes */}
      {GREEN_NODES.map((pos, idx) => (
        <mesh key={`green-${idx}`} position={pos}>
          <sphereGeometry args={[NODE_RADIUS, 8, 8]} />
          <meshStandardMaterial color={GREEN_NODE} emissive={GREEN_GLOW} />
        </mesh>
      ))}

      {/* Red Nodes */}
      {RED_NODES.map((pos, idx) => (
        <mesh key={`red-${idx}`} position={pos}>
          <sphereGeometry args={[NODE_RADIUS, 8, 8]} />
          <meshStandardMaterial color={RED_NODE} emissive={RED_GLOW} />
        </mesh>
      ))}

      {/* Green Lines */}
      {greenCurves.map((curve, idx) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(
          curve.getPoints(50)
        );
        return (
          <line key={`greenLine-${idx}`} geometry={geometry}>
            <lineBasicMaterial
              color={GREEN_LINE}
              opacity={0.3}
              transparent
            />
          </line>
        );
      })}

      {/* Red Lines */}
      {redCurves.map((curve, idx) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(
          curve.getPoints(50)
        );
        return (
          <line key={`redLine-${idx}`} geometry={geometry}>
            <lineBasicMaterial
              color={RED_LINE}
              opacity={0.3}
              transparent
            />
          </line>
        );
      })}

      {/* Flowing Particles */}
      {greenCurves.map((curve, idx) => (
        <Particle
          key={`greenParticle-${idx}`}
          curve={curve}
          color={GREEN_GLOW}
          speed={0.2 + Math.random() * 0.3}
        />
      ))}

      {redCurves.map((curve, idx) => (
        <Particle
          key={`redParticle-${idx}`}
          curve={curve}
          color={RED_GLOW}
          speed={0.2 + Math.random() * 0.3}
        />
      ))}
    </group>
  );
};

const NetworkGlobe = () => (
  <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
    <ambientLight intensity={0.3} />
    <pointLight position={[5, 5, 5]} intensity={0.6} color={GREEN_GLOW} />
    <Globe />
    <OrbitControls
      enableZoom
      enablePan={false}
      minDistance={5}
      maxDistance={7}
    />
  </Canvas>
);

export default NetworkGlobe;
