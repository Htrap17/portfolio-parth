'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const STRIP_HEIGHT = 200
const HOLE_COUNT   = 10
const HOLE_W       = 8
const HOLE_H       = 5
const STRIP_W      = 18

export default function FilmScrollIndicator() {
  const reduced = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const rafRef  = useRef<number>(0)

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? window.scrollY / total : 0)
    }
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafRef.current) }
  }, [])

  if (reduced) return null

  const indicatorY = progress * (STRIP_HEIGHT - 12)

  return (
    <div
      className="fixed right-5 top-1/2 z-30 -translate-y-1/2 hidden md:flex flex-col items-center"
      aria-hidden="true"
    >
      <svg width={STRIP_W} height={STRIP_HEIGHT} viewBox={`0 0 ${STRIP_W} ${STRIP_HEIGHT}`}>
        {/* Strip background */}
        <rect x="0" y="0" width={STRIP_W} height={STRIP_HEIGHT} fill="#0a0a0a" />

        {/* Left border */}
        <line x1="0" y1="0" x2="0" y2={STRIP_HEIGHT} stroke="#1a1a1a" strokeWidth="1" />
        {/* Right border */}
        <line x1={STRIP_W} y1="0" x2={STRIP_W} y2={STRIP_HEIGHT} stroke="#1a1a1a" strokeWidth="1" />

        {/* Progress fill — accent line on left edge */}
        <line
          x1="1" y1="0" x2="1" y2={STRIP_HEIGHT * progress}
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          opacity="0.6"
          strokeLinecap="round"
        />

        {/* Sprocket holes */}
        {Array.from({ length: HOLE_COUNT }).map((_, i) => {
          const y = (i + 0.5) * (STRIP_HEIGHT / HOLE_COUNT) - HOLE_H / 2
          const x = (STRIP_W - HOLE_W) / 2
          const filled = i / HOLE_COUNT < progress
          return (
            <rect
              key={i}
              x={x} y={y}
              width={HOLE_W} height={HOLE_H}
              rx="1"
              fill={filled ? 'var(--color-accent)' : '#050505'}
              stroke="#1f1f1f"
              strokeWidth="0.5"
              opacity={filled ? 0.7 : 0.5}
            />
          )
        })}

        {/* Moving indicator — bright dot on the strip */}
        <motion.rect
          x={(STRIP_W - 4) / 2} y={indicatorY}
          width="4" height="12"
          rx="2"
          fill="var(--color-accent)"
          opacity="0.9"
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        />
      </svg>
    </div>
  )
}
