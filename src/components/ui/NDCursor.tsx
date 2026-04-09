'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// ND filter cursor — circular dark glass disc
// Default: ND8 (medium density)
// Hover over interactive: ND64 (darker, denser)

export default function NDCursor() {
  const reduced = useReducedMotion()
  const [pos, setPos]       = useState({ x: -100, y: -100 })
  const [dense, setDense]   = useState(false)
  const [visible, setVisible] = useState(false)
  const raf = useRef<number | null>(null)
  const target = useRef({ x: -100, y: -100 })
  const current = useRef({ x: -100, y: -100 })

  useEffect(() => {
    if (reduced) return

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)

      // Detect interactive element
      const el = e.target as HTMLElement
      const interactive = el.closest('a, button, [role="button"], input, textarea, select, label')
      setDense(!!interactive)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    // Smooth follow via RAF
    const tick = () => {
      const dx = target.current.x - current.current.x
      const dy = target.current.y - current.current.y
      current.current.x += dx * 0.18
      current.current.y += dy * 0.18
      setPos({ x: current.current.x, y: current.current.y })
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      if (raf.current !== null) {
       cancelAnimationFrame(raf.current)
      }
    }
  }, [reduced, visible])

  if (reduced) return null

  const size   = dense ? 28 : 24
  const half   = size / 2
  const r      = half - 1.5   // glass radius inside metal ring

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      <svg
        width={size} height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          position:      'fixed',
          left:          pos.x - half,
          top:           pos.y - half,
          pointerEvents: 'none',
          zIndex:        9999,
          opacity:       visible ? 1 : 0,
          transition:    'opacity 0.2s ease',
        }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="nd-glass" cx="38%" cy="35%" r="65%">
            <stop offset="0%"   stopColor={dense ? '#030303' : '#0e0e0e'} stopOpacity={dense ? 0.95 : 0.80} />
            <stop offset="100%" stopColor={dense ? '#080808' : '#1a1a1a'} stopOpacity={dense ? 0.90 : 0.70} />
          </radialGradient>
          <radialGradient id="nd-spec" cx="30%" cy="28%" r="45%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)"    />
          </radialGradient>
          {/* Metal ring gradient */}
          <linearGradient id="nd-metal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#4a4a4a" />
            <stop offset="35%"  stopColor="#2a2a2a" />
            <stop offset="65%"  stopColor="#3a3a3a" />
            <stop offset="100%" stopColor="#1e1e1e" />
          </linearGradient>
        </defs>

        {/* Outer metal ring — thicker */}
        <circle cx={half} cy={half} r={half - 0.5}
          fill="url(#nd-metal)" />

        {/* Metal ring inner edge */}
        <circle cx={half} cy={half} r={r + 1.5}
          fill="none" stroke="#555" strokeWidth="0.5" />

        {/* Tick marks on metal ring */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a   = (i * 30 - 90) * Math.PI / 180
          const r1  = half - 1.5
          const r2  = half - (i % 3 === 0 ? 4.5 : 3)
          return (
            <line key={i}
              x1={half + r1 * Math.cos(a)} y1={half + r1 * Math.sin(a)}
              x2={half + r2 * Math.cos(a)} y2={half + r2 * Math.sin(a)}
              stroke={i % 3 === 0 ? '#777' : '#555'} strokeWidth={i % 3 === 0 ? 1 : 0.6}
            />
          )
        })}

        {/* Glass disc */}
        <circle cx={half} cy={half} r={r}
          fill="url(#nd-glass)" />

        {/* Light glare — crescent arc top-left */}
        <path
          d={`M ${half - r * 0.55} ${half - r * 0.45} A ${r * 0.7} ${r * 0.7} 0 0 1 ${half + r * 0.1} ${half - r * 0.65}`}
          fill="none"
          stroke={dense ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.28)'}
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Specular sheen */}
        <circle cx={half} cy={half} r={r} fill="url(#nd-spec)" />
      </svg>
    </>
  )
}
