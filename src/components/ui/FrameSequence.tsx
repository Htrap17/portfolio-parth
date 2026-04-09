'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { type ReactNode } from 'react'

type Props = { children: ReactNode; className?: string }

// Orchestrates staggered entry for child frames (cards, images, etc.)
const sequenceVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren:   0.05,
    },
  },
}

export default function FrameSequence({ children, className }: Props) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={sequenceVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  )
}
