'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  className?: string
  variant?: 'fade' | 'clip' | 'label' | 'expose'
}

export default function FadeIn({ children, delay = 0, className, variant = 'fade' }: Props) {
  const reduced = useReducedMotion()

  const getVariants = () => {
    if (reduced) return {
      hidden:  { opacity: 0 },
      visible: { opacity: 1 },
    }
    if (variant === 'clip') return {
      hidden:  { opacity: 0, y: '100%' },
      visible: { opacity: 1, y: '0%' },
    }
    if (variant === 'label') return {
      hidden:  { opacity: 0, letterSpacing: '0.3em' },
      visible: { opacity: 1, letterSpacing: '0.15em' },
    }
    // Exposure: fades in slightly overexposed then settles — like film catching light
    if (variant === 'expose') return {
      hidden:  { opacity: 0, filter: 'brightness(1.8)' },
      visible: { opacity: 1, filter: 'brightness(1)'   },
    }
    return {
      hidden:  { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0 },
    }
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduced ? 0.15 : variant === 'label' ? 0.5 : variant === 'expose' ? 1.0 : 0.7,
        delay:    reduced ? 0 : delay,
        ease:     [0.16, 1, 0.3, 1],
      }}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  )
}
