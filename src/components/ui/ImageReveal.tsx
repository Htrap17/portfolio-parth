'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { type ReactNode } from 'react'

type Props = {
  src: string
  alt: string
  /** Aspect ratio class e.g. "aspect-video" or "aspect-[4/5]" */
  aspectClass?: string
  className?: string
  priority?: boolean
  /** Render a custom child instead of next/image (e.g. for bg thumbnails) */
  children?: ReactNode
}

export default function ImageReveal({ src, alt, aspectClass = 'aspect-video', className, priority, children }: Props) {
  const reduced = useReducedMotion()

  return (
    <div className={`relative overflow-hidden ${aspectClass} ${className ?? ''}`}>
      {/* Cover layer — wipes left to right */}
      {!reduced && (
        <motion.div
          className="absolute inset-0 z-10 bg-surface origin-left"
          initial={{ scaleX: 1 }}
          whileInView={{ scaleX: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        />
      )}

      {/* Image — subtle Ken Burns settle */}
      <motion.div
        className="absolute inset-0"
        initial={reduced ? {} : { scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        {children ?? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
          />
        )}
      </motion.div>
    </div>
  )
}
