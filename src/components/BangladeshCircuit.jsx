// src/components/BangladeshCircuit.jsx
import React from "react";
import { motion } from "framer-motion";

const ACCENT = "#22c55e";   // neon green
const DARK_BG = "#020617";
const TRACK = "#064e3b";   // dark circuit green
const RED = "#ef4444";

const circuits = [
  // simple “towers” radiating out from the chip
  "M160 205 L160 135",
  "M160 205 L190 150",
  "M160 205 L130 155",
  "M160 205 L205 190",
  "M160 205 L115 190",
  "M160 205 L190 240",
  "M160 205 L130 245",
];

const lineVariants = {
  initial: { pathLength: 0, stroke: TRACK },
  animate: (i) => ({
    pathLength: [0, 1, 1],
    stroke: [RED, ACCENT, ACCENT],
    transition: {
      duration: 1.9,
      times: [0, 0.45, 1],
      repeat: Infinity,
      repeatDelay: 0.9,
      delay: i * 0.14,
      ease: "easeInOut",
    },
  }),
};

const beamVariants = {
  initial: { pathLength: 0, stroke: RED },
  animate: {
    pathLength: [0, 1, 1],
    stroke: [RED, ACCENT, ACCENT],
    transition: {
      duration: 1.4,
      times: [0, 0.4, 1],
      repeat: Infinity,
      repeatDelay: 0.8,
      ease: "easeInOut",
    },
  },
};

const BangladeshCircuit = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.svg
        viewBox="0 0 320 420"
        className="w-full h-full max-h-[520px]"
        initial="initial"
        animate="animate"
      >
        {/* gradients + glow filters */}
        <defs>
          <radialGradient id="bgGlow" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.35" />
            <stop offset="40%" stopColor={ACCENT} stopOpacity="0.12" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="outlineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.4" />
            <stop offset="50%" stopColor={ACCENT} stopOpacity="0.9" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.4" />
          </linearGradient>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0.6
                      0 0 0 0 0.3
                      0 0 0 0.9 0"
            />
          </filter>
        </defs>

        {/* background card */}
        <rect
          x="25"
          y="25"
          width="270"
          height="370"
          rx="34"
          fill={DARK_BG}
          stroke="#020617"
        />
        {/* soft green aura behind everything */}
        <circle
          cx="160"
          cy="210"
          r="150"
          fill="url(#bgGlow)"
          opacity="0.9"
        />

        {/* map outline glow */}
        <motion.path
          d="
            M170 60
            L188 90
            L184 120
            L201 145
            L192 178
            L212 208
            L203 245
            L178 258
            L163 290
            L145 280
            L132 252
            L122 228
            L112 205
            L118 178
            L102 158
            L112 135
            L107 110
            L124 85
            L137 68
            Z
          "
          fill="#020617"
          stroke="url(#outlineGrad)"
          strokeWidth="3"
          initial={{ opacity: 0.35 }}
          animate={{ opacity: [0.3, 0.9, 0.35] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* faint static inner outline for solidity */}
        <path
          d="
            M170 60
            L188 90
            L184 120
            L201 145
            L192 178
            L212 208
            L203 245
            L178 258
            L163 290
            L145 280
            L132 252
            L122 228
            L112 205
            L118 178
            L102 158
            L112 135
            L107 110
            L124 85
            L137 68
            Z
          "
          fill="none"
          stroke={TRACK}
          strokeWidth="2"
        />

        {/* central chip glow */}
        <motion.rect
          x="140"
          y="190"
          width="40"
          height="50"
          rx="6"
          fill={ACCENT}
          opacity="0.28"
          filter="url(#softGlow)"
          initial={{ opacity: 0.15, scale: 0.9 }}
          animate={{ opacity: [0.15, 0.7, 0.15], scale: [0.9, 1.08, 0.9] }}
          transform-origin="160 215"
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* central chip body */}
        <rect
          x="140"
          y="190"
          width="40"
          height="50"
          rx="6"
          fill="#022c22"
          stroke={ACCENT}
          strokeWidth="2"
        />
        <rect
          x="148"
          y="198"
          width="24"
          height="34"
          rx="4"
          fill="#020617"
          stroke={ACCENT}
          strokeWidth="1.5"
        />

        {/* chip “pins” */}
        {Array.from({ length: 6 }).map((_, i) => {
          const offset = 6 + i * 4;
          return (
            <g key={i}>
              {/* left side */}
              <rect
                x={136}
                y={194 + offset}
                width="4"
                height="2"
                fill={ACCENT}
              />
              {/* right side */}
              <rect
                x={180}
                y={194 + offset}
                width="4"
                height="2"
                fill={ACCENT}
              />
            </g>
          );
        })}

        {/* big “power beams” – red from top & bottom into the chip */}
        <motion.path
          d="M160 120 L160 190"
          stroke={RED}
          strokeWidth="4"
          strokeLinecap="round"
          variants={beamVariants}
        />
        <motion.path
          d="M160 240 L160 305"
          stroke={RED}
          strokeWidth="4"
          strokeLinecap="round"
          variants={beamVariants}
        />

        {/* smaller circuit towers lighting up from the chip */}
        <motion.g>
          {circuits.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke={ACCENT}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              variants={lineVariants}
              custom={i}
            />
          ))}
        </motion.g>

        {/* tiny pulses travelling outwards – small circles that ride the beams */}
        <motion.circle
          cx="160"
          cy="190"
          r="3"
          fill={RED}
          initial={{ cy: 205, opacity: 0 }}
          animate={{
            cy: [205, 135],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            repeatDelay: 0.8,
            ease: "easeOut",
          }}
        />
        <motion.circle
          cx="160"
          cy="220"
          r="3"
          fill={RED}
          initial={{ cy: 205, opacity: 0 }}
          animate={{
            cy: [205, 295],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            repeatDelay: 0.8,
            ease: "easeOut",
          }}
        />
      </motion.svg>
    </div>
  );
};

export default BangladeshCircuit;
