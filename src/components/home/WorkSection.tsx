'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { getFeaturedProjects } from '@/data/projects'
import type { Project } from '@/data/projects'

// ── Individual project cell ──────────────────────────────────────────────────
// Sizes vary by position to break grid monotony — feels editorial, not templated
// Asymmetric but balanced — alternating rhythm of square, portrait, landscape
const SIZES = [
  'md:col-span-1',              // 0 — square
  'md:col-span-2 md:row-span-2', // 1 — double, spans rows 1-2
  'md:col-span-1',              // 2 — fills row 1 col 3 (next to index 1)
  'md:col-span-1',              // 3 — fills row 2 col 3 (next to index 1)
  'md:col-span-2',              // 4 — wide, row 3
  'md:col-span-1',              // 5 — row 3 col 3, same row as index 4
]

const ASPECTS: Record<number, string> = {
  0: '1/1',
  1: '4/3',
  2: '3/2',
  3: '3/2',
  4: '16/7',
  5: '3/2',
}

function WorkCell({ project, index, hoveredIndex, onHover }: {
  project: Project
  index: number
  hoveredIndex: number | null
  onHover: (i: number | null) => void
}) {
  const reduced = useReducedMotion()
  const ref     = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-5%', '5%'])

  const aspect  = ASPECTS[index] ?? '3/2'
  const dimmed  = hoveredIndex !== null && hoveredIndex !== index

  // Each cell floats at a different phase — organic, not uniform
  const floatDuration = 4 + (index % 3)
  const floatDelay    = -(index * 0.9)

  return (
    <div className={`${SIZES[index] ?? ''}`}
      style={{ opacity: dimmed ? 0.3 : 1, transition: 'opacity 0.4s ease' }}
    >
      <motion.div
        ref={ref}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.9, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={reduced ? {} : { y: [0, -8, 0] }}
          transition={reduced ? {} : { duration: floatDuration, delay: floatDelay, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ rotateX: 4, rotateY: -4, scale: 1.02 }}
          onHoverStart={() => onHover(index)}
          onHoverEnd={() => onHover(null)}
          style={{ transformStyle: 'preserve-3d', perspective: 800 }}
        >
      <Link href={`/projects/${project.slug}`} className="group block">
        {/* Frame — curved edges + 3D shadow */}
        <div
          className="relative overflow-hidden bg-surface"
          style={{
            aspectRatio: aspect,
            borderRadius: 16,
            boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)',
          }}
        >
          {/* Wipe reveal */}
          {!reduced && (
            <motion.div
              className="absolute inset-0 z-10 bg-surface origin-left"
              initial={{ scaleX: 1 }}
              whileInView={{ scaleX: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: (index % 3) * 0.08, ease: [0.76, 0, 0.24, 1] }}
            />
          )}

          {/* Image — parallax within frame, zooms on hover */}
          <motion.div
            className="absolute inset-0 scale-[1.1]"
            style={{ y: imageY }}
            whileHover={{ scale: 1.18 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0}
            />
          </motion.div>

          {/* Hover overlay — darkens slightly, reveals synopsis */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 md:p-6
            bg-gradient-to-t from-black/70 via-black/0 to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p className="text-text/70 text-sm leading-relaxed line-clamp-2">{project.synopsis}</p>
          </div>

          {/* Frame number — always visible, top-left */}
          <span className="absolute top-3 left-4 z-30 label text-white/25"
            style={{ fontVariantNumeric: 'tabular-nums' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Meta — below frame */}
        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <p className="label text-muted mb-1">{project.category} · {project.year}</p>
            <h3 className="font-serif text-2xl md:text-3xl text-text leading-tight
              group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
          </div>
          {project.mood && (
            <span className="label shrink-0" style={{ color: 'var(--color-accent)', opacity: 0.4 }}>
              {project.mood}
            </span>
          )}
        </div>

        {/* Underline reveal */}
        <div className="mt-3 h-px bg-border overflow-hidden">
          <div className="h-full w-0 bg-accent group-hover:w-full
            transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
        </div>
      </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── Section header — enters from left like a camera pan ─────────────────────
function SectionHeader() {
  const reduced = useReducedMotion()
  const ref     = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.4'] })
  const x       = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-32, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div ref={ref} className="mb-14 flex items-end justify-between" style={{ x, opacity }}>
      <div>
        <p className="label text-muted mb-3" style={{ letterSpacing: '0.25em' }}>Selected Work</p>
        <h2 className="font-serif text-headline text-text leading-none mb-4">Filmography</h2>
        <div className="flex items-center gap-3 flex-wrap">
          {['Short Films', 'Documentaries', 'Music Videos', 'Advertisements'].map((cat) => (
            <span key={cat} className="label text-muted/50"
              style={{ letterSpacing: '0.15em' }}>
              {cat}
            </span>
          ))}
        </div>
      </div>
      <Link href="/projects"
        className="label text-muted hover:text-accent transition-colors duration-300 hidden md:block">
        Full archive →
      </Link>
    </motion.div>
  )
}

// ── Main export ──────────────────────────────────────────────────────────────
export default function WorkSection() {
  const projects     = getFeaturedProjects()
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="section-work" className="relative py-24 md:py-36 bg-bg">
      {/* Top dissolve — blends from Chapters above */}
      <div className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #020202 0%, transparent 100%)' }}
        aria-hidden="true" />

      <div className="mx-auto max-w-content px-6 md:px-10">
        <SectionHeader />

        {/* Asymmetric grid — editorial, not uniform */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 md:grid-rows-[auto_auto]">
          {projects.map((project, i) => (
            <WorkCell key={project.id} project={project} index={i}
              hoveredIndex={hovered} onHover={setHovered} />
          ))}
        </div>

        {/* Mobile "all work" link */}
        <div className="mt-12 md:hidden">
          <Link href="/projects" className="label text-muted hover:text-accent transition-colors duration-300">
            Full archive →
          </Link>
        </div>
      </div>
    </section>
  )
}
