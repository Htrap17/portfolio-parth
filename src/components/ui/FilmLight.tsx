'use client'

import { useScroll, useTransform, useSpring, motion, useReducedMotion } from 'framer-motion'

// Beam rotates with scroll, locked to section boundaries:
// Hero (0–25%)       → -10° to 25°   opening, wide
// Filmography (25–55%) → 25° to 55°  into the reel
// Showreel (55–80%)  → 55° to 75°    expressive
// About (80–100%)    → 75° to 85°    settled, quiet

const ORIGIN_X = 52
const ORIGIN_Y = 32
const BEAM_LEN = 1100
const HALF_ANG = 28

function conePoints(ox: number, oy: number, len: number, half: number) {
  const r = (d: number) => (d * Math.PI) / 180
  return [
    `${ox - 60},${oy}`,
    `${ox + Math.cos(r(-half)) * len},${oy + Math.sin(r(-half)) * len}`,
    `${ox + Math.cos(r(half))  * len},${oy + Math.sin(r(half))  * len}`,
  ].join(' ')
}

export default function FilmLight() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()

  const rotateRaw = useTransform(
    scrollYProgress,
    [0,    0.25,  0.55,  0.80,  1.0],
    [-10,  25,    55,    75,    85]
  )
  const rotate = useSpring(rotateRaw, { stiffness: 40, damping: 25, mass: 0.8 })

  if (reduced) return null

  return (
    <motion.div
      className="fixed inset-0 z-20 pointer-events-none"
      aria-hidden="true"
      style={{ rotate, transformOrigin: `${ORIGIN_X}px ${ORIGIN_Y}px` }}
    >
      <svg
        width="100%" height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMinYMin slice"
        overflow="visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="fl-blur" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="36" />
          </filter>
          <filter id="fl-haze-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <radialGradient id="fl-beam" cx="0%" cy="0%" r="100%" gradientUnits="userSpaceOnUse"
            gradientTransform={`translate(${ORIGIN_X} ${ORIGIN_Y})`}>
            <stop offset="0%"   stopColor="#c8b89a" stopOpacity="0.18" />
            <stop offset="20%"  stopColor="#c8b89a" stopOpacity="0.10" />
            <stop offset="55%"  stopColor="#c8b89a" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#c8b89a" stopOpacity="0"    />
          </radialGradient>
          <radialGradient id="fl-haze" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#d4c4a8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#c8b89a" stopOpacity="0"    />
          </radialGradient>
        </defs>

        <g filter="url(#fl-blur)">
          <polygon points={conePoints(ORIGIN_X, ORIGIN_Y, BEAM_LEN, HALF_ANG)} fill="url(#fl-beam)" />
        </g>
        <g filter="url(#fl-haze-blur)">
          <ellipse cx={ORIGIN_X} cy={ORIGIN_Y} rx="40" ry="28" fill="url(#fl-haze)" />
        </g>

        {/* ── Studio Fresnel light ── */}
        {/* Yoke arm — mounts to the PP logo */}
        <line x1={ORIGIN_X - 18} y1={ORIGIN_Y} x2={ORIGIN_X - 10} y2={ORIGIN_Y}
          stroke="#2a2a2a" strokeWidth="2" strokeLinecap="round" />
        {/* Yoke pivot knob */}
        <circle cx={ORIGIN_X - 10} cy={ORIGIN_Y} r="2.5" fill="#222" stroke="#333" strokeWidth="0.5" />

        {/* Housing body — tapered cylinder (trapezoid) */}
        <polygon
          points={`
            ${ORIGIN_X - 8},${ORIGIN_Y - 9}
            ${ORIGIN_X + 10},${ORIGIN_Y - 7}
            ${ORIGIN_X + 10},${ORIGIN_Y + 7}
            ${ORIGIN_X - 8},${ORIGIN_Y + 9}
          `}
          fill="#181818" stroke="#2c2c2c" strokeWidth="0.75"
        />
        {/* Housing back cap */}
        <rect x={ORIGIN_X - 10} y={ORIGIN_Y - 9} width="4" height="18" rx="1"
          fill="#111" stroke="#252525" strokeWidth="0.5" />

        {/* Fresnel lens face — concentric rings */}
        <circle cx={ORIGIN_X + 10} cy={ORIGIN_Y} r="7" fill="#0e0e0e" stroke="#2a2a2a" strokeWidth="0.75" />
        <circle cx={ORIGIN_X + 10} cy={ORIGIN_Y} r="5.5" fill="none" stroke="#222" strokeWidth="0.5" />
        <circle cx={ORIGIN_X + 10} cy={ORIGIN_Y} r="4"   fill="none" stroke="#222" strokeWidth="0.5" />
        <circle cx={ORIGIN_X + 10} cy={ORIGIN_Y} r="2.5" fill="none" stroke="#252525" strokeWidth="0.5" />
        {/* Lens hot spot — warm glow at center */}
        <circle cx={ORIGIN_X + 10} cy={ORIGIN_Y} r="1.8" fill="#c8b89a" opacity="0.6" />
        <circle cx={ORIGIN_X + 10} cy={ORIGIN_Y} r="0.8" fill="#e0d0b8" opacity="0.8" />

        {/* Barn door — top */}
        <rect x={ORIGIN_X + 10} y={ORIGIN_Y - 14} width="9" height="4" rx="0.5"
          fill="#141414" stroke="#252525" strokeWidth="0.5"
          transform={`rotate(-12 ${ORIGIN_X + 10} ${ORIGIN_Y - 14})`} />
        {/* Barn door — bottom */}
        <rect x={ORIGIN_X + 10} y={ORIGIN_Y + 10} width="9" height="4" rx="0.5"
          fill="#141414" stroke="#252525" strokeWidth="0.5"
          transform={`rotate(12 ${ORIGIN_X + 10} ${ORIGIN_Y + 10})`} />

        {/* Handle on top of housing */}
        <path d={`M ${ORIGIN_X - 4} ${ORIGIN_Y - 9} Q ${ORIGIN_X} ${ORIGIN_Y - 15} ${ORIGIN_X + 4} ${ORIGIN_Y - 9}`}
          fill="none" stroke="#252525" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </motion.div>
  )
}
