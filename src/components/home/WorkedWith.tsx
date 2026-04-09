'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { collaborators } from '@/data/projects'

export default function WorkedWith() {
  const reduced = useReducedMotion()
  const ref     = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'start 0.3'] })
  const headerX  = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-24, 0])
  const headerOp = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={ref} className="py-24 md:py-32 bg-bg" aria-label="Collaborators">
      <div className="mx-auto max-w-content px-6 md:px-10">

        <motion.div className="mb-16" style={{ x: headerX, opacity: headerOp }}>
          <p className="label text-muted mb-3" style={{ letterSpacing: '0.25em' }}>Collaborations</p>
          <h2 className="font-serif text-headline text-text leading-none">Worked With</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {collaborators.map((c, i) => (
            <motion.div
              key={c.name}
              className="flex items-center py-6 border-b border-border/40 group"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: reduced ? 0 : (i % 5) * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Logo + name */}
              <div className="flex items-center gap-4">
                {c.logo && (
                  <Image
                    src={c.logo}
                    alt={c.name}
                    width={48}
                    height={32}
                    className="object-contain opacity-50 group-hover:opacity-90 transition-opacity duration-400"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                )}
                <span className="font-serif text-2xl md:text-3xl text-text/70
                  group-hover:text-text transition-colors duration-400 leading-none">
                  {c.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
