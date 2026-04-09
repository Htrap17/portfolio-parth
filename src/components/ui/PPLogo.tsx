'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// ── Real iris: 6 blades, each rotates around its own pivot point ──────────────
// Each blade is large enough to cover the center when rotated inward.
// Pivot is on the outer ring. Blade sweeps inward on close.

const BLADES  = 6
const R       = 32   // aperture radius
const SIZE    = 72

// Each blade: a large sector/wedge anchored at the outer ring.
// When closed (angle=0): blade points inward covering center.
// When open (angle=MAX): blade rotates out, revealing center.
const OPEN_ANGLE  = 52   // degrees rotated when open
const BLADE_ARC   = 75   // angular width of each blade

function makeBlade(index: number) {
  const d2r  = (d: number) => d * Math.PI / 180
  const step = 360 / BLADES
  const base = index * step

  // Blade is a sector from center to outer radius, spanning BLADE_ARC degrees
  // Pivot point: on the outer ring at 'base' angle
  const px = R * Math.cos(d2r(base))
  const py = R * Math.sin(d2r(base))

  // Blade shape: large enough to cover center
  // Points: pivot, two outer arc points, sweeps inward
  const a1 = base - 5
  const a2 = base + BLADE_ARC

  const x1 = R * 1.05 * Math.cos(d2r(a1))
  const y1 = R * 1.05 * Math.sin(d2r(a1))
  const x2 = R * 1.05 * Math.cos(d2r(a2))
  const y2 = R * 1.05 * Math.sin(d2r(a2))

  // Inner tip — points toward center
  const tipAngle = base + BLADE_ARC * 0.4
  const tipR     = 4
  const tx = tipR * Math.cos(d2r(tipAngle))
  const ty = tipR * Math.sin(d2r(tipAngle))

  const path = [
    `M ${x1.toFixed(2)} ${y1.toFixed(2)}`,
    `A ${R * 1.05} ${R * 1.05} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`,
    `L ${tx.toFixed(2)} ${ty.toFixed(2)}`,
    'Z'
  ].join(' ')

  return { path, px, py }
}

const BLADES_DATA = Array.from({ length: BLADES }, (_, i) => makeBlade(i))

// ── Aperture SVG ──────────────────────────────────────────────────────────────
// progress: 0 = fully closed (blades cover center, PP hidden behind blades)
//           1 = fully open   (blades rotated out, center clear, PP visible)
interface ApertureProps { progress: number; size: number }

export function Aperture({ progress, size }: ApertureProps) {
  const vb         = R + 6
  const openAngle  = progress * OPEN_ANGLE
  // PP visible when open
  const ppOpacity  = Math.max(0, Math.min(1, (progress - 0.3) / 0.5))

  return (
    <svg
      width={size} height={size}
      viewBox={`${-vb} ${-vb} ${vb * 2} ${vb * 2}`}
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      <defs>
        <clipPath id="ap-clip">
          <circle cx={0} cy={0} r={R + 2} />
        </clipPath>
        <linearGradient id="blade-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#1a1a1a" />
          <stop offset="50%"  stopColor="#252525" />
          <stop offset="100%" stopColor="#0d0d0d" />
        </linearGradient>
      </defs>

      {/* Outer bezel */}
      <circle cx={0} cy={0} r={R + 5} fill="#060606" />
      <circle cx={0} cy={0} r={R + 5} fill="none" stroke="#252525" strokeWidth="1.5" />
      <circle cx={0} cy={0} r={R + 3} fill="none" stroke="#1a1a1a" strokeWidth="0.75" />

      {/* Dark background */}
      <circle cx={0} cy={0} r={R + 1} fill="#050505" clipPath="url(#ap-clip)" />

      {/* PP logo — behind blades, visible when open */}
      <image
        href="/pp-logo.png"
        x={-R * 1.6} y={-R * 1.6 + 3}
        width={R * 3.2} height={R * 3.2}
        preserveAspectRatio="xMidYMid meet"
        style={{ opacity: ppOpacity, transition: 'opacity 0.4s ease-out' }}
        clipPath="url(#ap-clip)"
      />

      {/* Blades — each rotates around its outer pivot */}
      <g clipPath="url(#ap-clip)">
        {BLADES_DATA.map(({ path, px, py }, i) => (
          <path
            key={i}
            d={path}
            fill="url(#blade-g)"
            stroke="#111"
            strokeWidth="0.4"
            style={{
              transform:       `rotate(${-openAngle}deg)`,
              transformOrigin: `${px.toFixed(2)}px ${py.toFixed(2)}px`,
              transition:      'transform 0.4s ease-out',
            }}
          />
        ))}
      </g>

      {/* Inner bezel ring on top */}
      <circle cx={0} cy={0} r={R + 1} fill="none" stroke="#1e1e1e" strokeWidth="1" />
    </svg>
  )
}

// ── Nav logo ──────────────────────────────────────────────────────────────────
export default function PPLogo() {
  const reduced             = useReducedMotion()
  const [prog, setProg]     = useState(0)   // start CLOSED
  const [locked, setLocked] = useState(false)
  const current             = useRef(0)
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const raf = useRef<number | null>(null)

  // Open on mount
  useEffect(() => {
    if (reduced) return
    const start = Date.now()
    const tick = () => {
      const t   = Math.min(1, (Date.now() - start) / 800)
      const val = 1 - Math.pow(1 - t, 3)
      current.current = val
      setProg(val)
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }
    const id = setTimeout(() => { raf.current = requestAnimationFrame(tick) }, 400)
    return () => clearTimeout(id)
  }, [reduced])

  useEffect(() => {
    if (reduced || locked) return
    let lastY = window.scrollY

    const onScroll = () => {
      const y     = window.scrollY
      const delta = y - lastY
      lastY       = y
      if (Math.abs(delta) < 3) return

      // Scroll down = close slightly
      const next = Math.max(0.4, Math.min(1, current.current - delta * 0.004))
      current.current = next
      setProg(next)

      clearTimeout(timeout.current)
      timeout.current = setTimeout(() => {
        const from  = current.current
        const start = Date.now()
        const tick  = () => {
          const t   = Math.min(1, (Date.now() - start) / 500)
          const val = from + (1 - from) * (1 - Math.pow(1 - t, 3))
          current.current = val
          setProg(val)
          if (t < 1) raf.current = requestAnimationFrame(tick)
        }
        raf.current = requestAnimationFrame(tick)
      }, 250)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timeout.current)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [reduced, locked])

  const animateTo = (target: number, duration: number) => {
    if (raf.current) cancelAnimationFrame(raf.current)
    const from  = current.current
    const start = Date.now()
    const tick  = () => {
      const t    = Math.min(1, (Date.now() - start) / duration)
      const ease = t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2, 2)/2
      const val  = from + (target - from) * ease
      current.current = val
      setProg(val)
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }

  const handleClick = () => {
    if (locked) {
      setLocked(false)
      animateTo(1, 600)
    } else {
      setLocked(true)
      animateTo(0, 520)
    }
  }

  return (
    <button
      onClick={handleClick}
      aria-label="PP Logo"
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'block' }}
    >
      <Aperture progress={reduced ? 1 : prog} size={SIZE} />
    </button>
  )
}
