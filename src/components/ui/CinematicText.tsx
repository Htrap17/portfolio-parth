'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  /** x overshoot in px — default 20 */
  drift?: number
}

/**
 * Blur-to-sharp entry with horizontal overshoot.
 * Feels like a camera pulling focus while panning to settle.
 */
export default function CinematicText({ children, className, delay = 0, drift = 20 }: Props) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : {
        opacity: 0,
        x: -drift,
        filter: 'blur(12px)',
        letterSpacing: '0.08em',
      }}
      whileInView={reduced ? { opacity: 1 } : {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        letterSpacing: '0.01em',
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduced ? 0.15 : 1.1,
        delay: reduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
