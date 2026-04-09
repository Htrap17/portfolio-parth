'use client'

import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

type Props = {
  children: string
  className?: string
}

/**
 * Full-width kinetic statement.
 * On scroll-enter: letters spread apart then snap together — like a cut landing.
 */
export default function StatementText({ children, className }: Props) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.3'],
  })

  const rawTracking = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0.25, 0])
  const tracking    = useSpring(rawTracking, { stiffness: 80, damping: 20 })

  const rawBlur  = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [8, 0])
  const rawOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.6, 1])

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ''}`}>
      <motion.p
        className="font-serif text-statement text-text leading-none"
        style={{
          letterSpacing: tracking as unknown as string,
          filter: useTransform(rawBlur, (v) => `blur(${v}px)`),
          opacity: rawOpacity,
        }}
      >
        {children}
      </motion.p>
    </div>
  )
}
