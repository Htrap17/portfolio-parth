'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'


type Chapter = {
  title:       string
  description: string
  video:       string
  /** tint overlay — each chapter has a distinct colour temperature */
  tint:        string
  /** where the title sits — varies per chapter for compositional variety */
  align:       'left' | 'right' | 'center'
}

const CHAPTERS: Chapter[] = [
  {
    title:       'Documentaries',
    description: 'Capturing real moments with honesty and depth.',
    video:       '/Documentary.mp4',
    tint:        'rgba(8,6,4,0.52)',
    align:       'left',
  },
  {
    title:       'Short Films',
    description: 'Narrative tension built frame by frame.',
    video:       '/Short Films.mp4',
    tint:        'rgba(4,6,10,0.55)',
    align:       'right',
  },
  {
    title:       'Advertisement',
    description: 'Precision and beauty in every commercial second.',
    video:       '/Advertisement.mp4',
    tint:        'rgba(6,4,2,0.50)',
    align:       'center',
  },
  {
    title:       'Music Videos',
    description: 'Rhythm made visible. Sound translated into light.',
    video:       '/Music Video.mp4',
    tint:        'rgba(4,4,8,0.54)',
    align:       'left',
  },
]

function Chapter({ chapter, index }: { chapter: Chapter; index: number }) {
  const reduced = useReducedMotion()
  const ref     = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const videoY   = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-8%', '8%'])
  const opacity  = useTransform(scrollYProgress, [0, 0.08, 0.82, 1], [0, 1, 1, 0])

  // Title: grows from 0.6x to 1x as section enters, shrinks back as it leaves
  const titleScale   = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], reduced ? [1,1,1,1] : [0.55, 1, 1, 0.55])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.22, 0.65, 1], [0, 1, 1, 0])
  const titleY       = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], reduced ? [0,0,0,0] : [-120, 0, 0, 120])

  const alignClass = {
    left:   'items-start text-left   pl-6 md:pl-20',
    right:  'items-end   text-right  pr-6 md:pr-20',
    center: 'items-center text-center px-6',
  }[chapter.align]

  return (
    <section
      ref={ref}
      className="relative h-screen flex flex-col justify-center"
      aria-label={chapter.title}
    >
      {/* Background video — parallax, clipped to section */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div className="absolute inset-0 scale-[1.18]" style={{ y: videoY }}>
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted loop playsInline aria-hidden="true"
          preload={index === 0 ? 'auto' : 'none'}
        >
          <source src={chapter.video} type="video/mp4" />
        </video>
      </motion.div>
      </div>

      {/* Colour-temperature tint — unique per chapter */}
      <div className="absolute inset-0" style={{ background: chapter.tint }} aria-hidden="true" />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 20%, rgba(2,2,2,0.68) 100%)' }}
        aria-hidden="true"
      />

      {/* Top + bottom dissolve — no hard edges between chapters */}
      <div className="absolute inset-x-0 top-0 h-[28%] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #020202 0%, transparent 100%)' }} aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-[28%] pointer-events-none"
        style={{ background: 'linear-gradient(to top, #020202 0%, transparent 100%)' }} aria-hidden="true" />

      {/* Foreground */}
      <motion.div
        className={`relative z-10 w-full flex flex-col gap-5 ${alignClass}`}
        style={{ opacity }}
      >
        {/* Slate number */}
        <span className="label" style={{ color: 'rgba(200,184,154,0.32)', letterSpacing: '0.3em' }}>
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Title — scale + opacity driven by scroll position */}
        <motion.h2
          className="font-serif text-headline text-text leading-none"
          style={{
            scale:       titleScale,
            opacity:     titleOpacity,
            y:           titleY,
            transformOrigin: chapter.align === 'right' ? 'right center' : chapter.align === 'center' ? 'center center' : 'left center',
          }}
        >
          {chapter.title}
        </motion.h2>

        {/* Description */}
        <p className="text-text/50 max-w-sm" style={{ fontSize: '0.9375rem', lineHeight: 1.65 }}>
          {chapter.description}
        </p>

        {/* Accent line */}
        <div className="h-px bg-accent/30" style={{ width: 48 }} />
      </motion.div>
    </section>
  )
}

export default function Chapters() {
  return (
    <div aria-label="Creative chapters">
      {CHAPTERS.map((chapter, i) => (
        <Chapter key={chapter.title} chapter={chapter} index={i} />
      ))}
    </div>
  )
}
