'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { type Project } from '@/data/projects'

type Props = { project: Project; index: number }

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const wipeVariants = {
  hidden:  { scaleX: 1 },
  visible: { scaleX: 0,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
  },
}

export default function FeaturedCard({ project, index }: Props) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Image drifts ~6% within the frame — subtle tracking shot feel
  const imageY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-3%', '3%'])

  return (
    <motion.div variants={reduced ? undefined : cardVariants} ref={ref}>
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="relative aspect-video overflow-hidden bg-surface">
          {!reduced && (
            <motion.div
              className="absolute inset-0 z-10 bg-surface origin-left"
              variants={wipeVariants}
            />
          )}
          {/* Image tracks within the frame on scroll */}
          <motion.div className="absolute inset-0" style={{ y: imageY, scale: 1.08 }}>
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-bg/0 group-hover:bg-bg/30 transition-colors duration-500 z-20" />
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="label text-muted mb-2">
              <span className="text-accent" style={{ fontVariantNumeric: 'tabular-nums' }}>
                0{index + 1}
              </span>
              {' '}· {project.category} · {project.year}
            </p>
            <h3 className="font-serif text-2xl text-text group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            {project.mood && (
              <p className="label text-muted mt-1">{project.mood}</p>
            )}
          </div>
        </div>

        <div className="mt-3 h-px bg-border overflow-hidden">
          <div className="h-full w-0 bg-accent group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
        </div>
      </Link>
    </motion.div>
  )
}
