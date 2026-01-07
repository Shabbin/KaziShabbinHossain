// src/components/BangladeshMap.jsx
import React from "react";
import { motion } from "framer-motion";

// 🔴 Accent color for the globe
const ACCENT_HEX = "#ef4444"; // red-500
const GLOW_RED = "rgba(248,113,113,1)";

// Basic globe geometry
const CX = 120;
const CY = 120;
const R_MAIN = 72;

// Some orbit radii (inside the main globe)
const ORBIT_RADII = [32, 48, 62];

// How smooth the orbital paths are
const SAMPLES = 120;

// Precompute orbital paths (perfect circles, but we can offset angles)
const orbits = ORBIT_RADII.map((radius, orbitIndex) => {
  const cx = [];
  const cy = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const t = (i / SAMPLES) * Math.PI * 2;
    // add a small phase offset per orbit so they don't overlap exactly
    const angle = t + orbitIndex * 0.6;
    cx.push(CX + radius * Math.cos(angle));
    cy.push(CY + radius * Math.sin(angle));
  }
  return { radius, cx, cy };
});

// Some radial lines from center (like longitudes)
const RADIAL_COUNT = 8;
const radialLines = Array.from({ length: RADIAL_COUNT }).map((_, i) => {
  const angle = (i / RADIAL_COUNT) * Math.PI * 2;
  const x = CX + R_MAIN * Math.cos(angle);
  const y = CY + R_MAIN * Math.sin(angle);
  return { id: `rad-${i}`, x, y };
});

// Little static nodes on orbits (not too many, keep it clean)
const orbitNodes = ORBIT_RADII.flatMap((radius, orbitIndex) => {
  const count = 10; // 10 nodes per orbit
  const nodes = [];
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const angle = t + orbitIndex * 0.4;
    const x = CX + radius * Math.cos(angle);
    const y = CY + radius * Math.sin(angle);
    nodes.push({ id: `on-${orbitIndex}-${i}`, x, y });
  }
  return nodes;
});

// Pulse speed (smaller = faster)
const PULSE_DURATION = 6;

const BangladeshMap = () => {
  return (
    <svg
      viewBox="0 0 240 240"
      className="w-full h-full"
      style={{ overflow: "visible" }}
    >
      {/* spin the whole globe group */}
      <motion.g
        style={{ transformOrigin: "120px 120px" }}
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 1, rotate: 360 }}
        transition={{
          opacity: { duration: 0.8, ease: "easeOut" },
          rotate: { duration: 36, repeat: Infinity, ease: "linear" },
        }}
      >
        {/* 🔥 soft outer glow halo */}
        <motion.circle
          cx={CX}
          cy={CY}
          r={R_MAIN + 16}
          fill="none"
          stroke={ACCENT_HEX}
          strokeWidth={9}
          strokeOpacity={0.18}
          style={{ filter: `drop-shadow(0 0 26px ${GLOW_RED})` }}
          animate={{
            r: [R_MAIN + 12, R_MAIN + 20, R_MAIN + 12],
            strokeOpacity: [0.12, 0.32, 0.12],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* main globe circle */}
        <circle
          cx={CX}
          cy={CY}
          r={R_MAIN}
          fill="none"
          stroke={ACCENT_HEX}
          strokeOpacity={0.45}
          strokeWidth={1.6}
        />

        {/* inner rings to give depth */}
        <circle
          cx={CX}
          cy={CY}
          r={R_MAIN * 0.6}
          fill="none"
          stroke={ACCENT_HEX}
          strokeOpacity={0.22}
          strokeWidth={1.2}
        />
        <circle
          cx={CX}
          cy={CY}
          r={R_MAIN * 0.35}
          fill="none"
          stroke={ACCENT_HEX}
          strokeOpacity={0.15}
          strokeWidth={1}
        />

        {/* radial "longitude" lines */}
        <g stroke={ACCENT_HEX} strokeOpacity={0.3}>
          {radialLines.map((r) => (
            <line
              key={r.id}
              x1={CX}
              y1={CY}
              x2={r.x}
              y2={r.y}
              strokeWidth={0.8}
            />
          ))}
        </g>

        {/* diagonal-ish subtle arcs: ellipses rotated */}
        <g stroke={ACCENT_HEX} strokeOpacity={0.25} fill="none">
          <ellipse
            cx={CX}
            cy={CY}
            rx={R_MAIN * 0.95}
            ry={R_MAIN * 0.55}
            transform={`rotate(30 ${CX} ${CY})`}
            strokeWidth={1.2}
          />
          <ellipse
            cx={CX}
            cy={CY}
            rx={R_MAIN * 0.95}
            ry={R_MAIN * 0.55}
            transform={`rotate(-30 ${CX} ${CY})`}
            strokeWidth={1.2}
          />
        </g>

        {/* twinkling orbit nodes */}
        <motion.g
          animate={{ opacity: [0.85, 1, 0.9] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {orbitNodes.map((n) => (
            <circle
              key={n.id}
              cx={n.x}
              cy={n.y}
              r={3}
              fill="#fee2e2"
              stroke={ACCENT_HEX}
              strokeWidth={0.9}
              style={{
                filter: "drop-shadow(0 0 7px rgba(248,113,113,0.9))",
              }}
            />
          ))}
        </motion.g>

        {/* breathing core */}
        <motion.circle
          cx={CX}
          cy={CY}
          r={5}
          fill={ACCENT_HEX}
          style={{
            filter: "drop-shadow(0 0 18px rgba(248,113,113,1))",
          }}
          animate={{
            r: [4.2, 7.2, 4.2],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 🚀 Moving pulses along orbits (laminar, circular, fast) */}
        {orbits.map((orbit, idx) => (
          <React.Fragment key={`orbit-${idx}`}>
            {/* dim orbit line */}
            <circle
              cx={CX}
              cy={CY}
              r={orbit.radius}
              fill="none"
              stroke={ACCENT_HEX}
              strokeOpacity={0.18}
              strokeWidth={0.8}
            />

            {/* bright pulse */}
            <motion.circle
              r={4}
              fill="#fee2e2"
              stroke={ACCENT_HEX}
              strokeWidth={1.1}
              style={{
                filter: "drop-shadow(0 0 11px rgba(248,113,113,1))",
              }}
              animate={{
                cx: orbit.cx,
                cy: orbit.cy,
              }}
              transition={{
                duration: PULSE_DURATION,
                repeat: Infinity,
                ease: "linear",
                delay: (idx * PULSE_DURATION) / 4,
              }}
            />

            {/* follower pulse */}
            <motion.circle
              r={3}
              fill="#fecaca"
              stroke={ACCENT_HEX}
              strokeWidth={0.9}
              style={{
                opacity: 0.8,
                filter: "drop-shadow(0 0 8px rgba(248,113,113,0.85))",
              }}
              animate={{
                cx: orbit.cx,
                cy: orbit.cy,
              }}
              transition={{
                duration: PULSE_DURATION,
                repeat: Infinity,
                ease: "linear",
                delay: (idx * PULSE_DURATION) / 4 + PULSE_DURATION / 3,
              }}
            />
          </React.Fragment>
        ))}
      </motion.g>
    </svg>
  );
};

export default BangladeshMap;
