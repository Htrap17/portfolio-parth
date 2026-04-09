'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { type ReactNode } from 'react'

// Cinematic cut: a solid panel sweeps across the screen — inspired by the
// hard, decisive action of a clapboard. No literal imagery, just the rhythm.
const CUT_EASE = [0.76, 0, 0.24, 1] as const   // sharp deceleration — like a shutter closing
const REVEAL_EASE = [0.16, 1, 0.3, 1] as const  // organic settle — like a lens pulling focus

export default function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className="relative">
      {/* ── Cut panel: sweeps in (exit) then out (enter) ── */}
      <motion.div
        className="fixed inset-0 z-50 bg-bg origin-left pointer-events-none"
        initial={{ scaleX: 1 }}          // enter: panel starts covering screen
        animate={{ scaleX: 0 }}          // enter: panel retracts right → reveals page
        exit={{ scaleX: 1 }}             // exit:  panel sweeps in left → covers page
        transition={{
          duration: 0.55,
          ease: CUT_EASE,
        }}
        style={{ transformOrigin: 'right' }}  // retract from right edge on enter
      />

      {/* ── Page content: fades in slightly after panel clears ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.25,   // wait for panel to clear before content appears
          ease: REVEAL_EASE,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
