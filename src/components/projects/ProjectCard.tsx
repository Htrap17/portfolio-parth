'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { type Project } from '@/data/projects'

type Props = { project: Project; index: number }

// Card inherits stagger timing from ProjectGrid parent
const cardVariants = {
  hidden:   { opacity: 0, y: 40 },
  visible:  { opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const wipeVariants = {
  hidden:   { scaleX: 1 },
  visible:  { scaleX: 0,
    transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] as const },
  },
}

export default function ProjectCard({ project, index }: Props) {
  const reduced = useReducedMotion()

  return (
    <motion.article
      variants={reduced ? undefined : cardVariants}
      whileHover={{ rotateX: 3, rotateY: -3, scale: 1.02 }}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">

        {/* Frame thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-surface"
          style={{ borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)' }}
        >
          {!reduced && (
            <motion.div
              className="absolute inset-0 z-10 bg-surface origin-left"
              variants={wipeVariants}
            />
          )}
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-bg/0 group-hover:bg-bg/25 transition-colors duration-500 z-20" />

          {/* Frame number — top-left, like a slate counter */}
          <span
            className="absolute top-3 left-3 z-30 label text-text/40"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Hierarchy: category (small) → title (dominant) → synopsis (quiet) */}
        <div className="mt-4">
          <p className="label text-muted mb-2">{project.category} · {project.year}</p>
          <h2 className="font-serif text-2xl md:text-3xl text-text group-hover:text-accent transition-colors duration-300 leading-tight">
            {project.title}
          </h2>
          <p className="text-muted/60 text-sm mt-2 leading-relaxed line-clamp-2">{project.synopsis}</p>
        </div>

        {/* Underline reveal */}
        <div className="mt-4 h-px bg-border overflow-hidden">
          <div className="h-full w-0 bg-accent group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
        </div>

      </Link>
    </motion.article>
  )
}
