'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
}

// Aperture open: clip-path circle expands from center — like a lens iris opening.
// Use sparingly — hero and key hero-weight sections only.
export default function ApertureReveal({ children, className, delay = 0 }: Props) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      whileInView={{ clipPath: 'circle(75% at 50% 50%)' }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
