'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// ACT I — Opening Frame
// The camera holds still. Identity arrives slowly, like focus being pulled.
// No hard cuts. The scene dissolves into what follows.
export default function Hero() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Parallax layers — video moves slower than text, creating depth
  const videoY   = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '18%'])
  const textY    = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '8%'])
  const grainY   = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '6%'])

  // Content fades out as you scroll — dissolve, not cut
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section
      ref={ref}
      id="hero-section"
      className="relative flex h-screen items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Background: video + grain + gradients ── */}
      <div className="absolute inset-0 bg-[#020202]">

        {/* Video — parallax slower than content */}
        <motion.div className="absolute inset-0 scale-[1.15]" style={{ y: videoY }}>
          <video
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.35 }}
            autoPlay muted loop playsInline aria-hidden="true"
          >
            <source src="/showreel.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Film grain — SVG noise, subtle, moves independently */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: grainY, opacity: 0.045 }}
          aria-hidden="true"
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain)" />
          </svg>
        </motion.div>

        {/* Vignette — radial darkening at edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(2,2,2,0.75) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Bottom dissolve — scene bleeds into next section, no hard line */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '45%',
            background: 'linear-gradient(to top, #020202 0%, rgba(2,2,2,0.85) 40%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Top fade — subtle, keeps nav readable */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: '20%',
            background: 'linear-gradient(to bottom, rgba(2,2,2,0.5) 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── Content — bottom left ── */}
      <motion.div
        className="absolute z-10 bottom-16 md:bottom-24 left-0 w-full px-6 md:px-10"
        style={{ y: textY, opacity: contentOpacity }}
      >
        <motion.h1
          className="font-serif text-display text-text leading-none mb-6"
          initial={reduced ? false : {
            opacity: 0,
            x: -24,
            filter: 'blur(18px)',
            letterSpacing: '0.14em',
          }}
          animate={{
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            letterSpacing: '0.01em',
          }}
          transition={{
            duration: reduced ? 0.15 : 2.0,
            delay:    reduced ? 0    : 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          Parth Porwal
        </motion.h1>

        <motion.p
          className="label text-muted tracking-[0.2em]"
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0.15 : 1.4,
            delay:    reduced ? 0    : 1.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          Cinematographer&nbsp;&nbsp;·&nbsp;&nbsp;Director of Photography&nbsp;&nbsp;·&nbsp;&nbsp;Filmmaker
        </motion.p>
      </motion.div>
    </section>
  )
}
