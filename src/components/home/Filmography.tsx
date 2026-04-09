'use client'

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion, useSpring, MotionValue } from 'framer-motion'
import { getFeaturedProjects } from '@/data/projects'

const FRAME_W    = 400
const FRAME_GAP  = 28   // matches PerforationDivider width
const RAIL_H     = 22
const HOLE_W     = 8
const HOLE_H     = 5
const HOLES_PER  = 6

// Vertical perforation strip between frames — like film gate dividers
function PerforationDivider({ height }: { height: number }) {
  const holeCount = Math.floor(height / 18)
  return (
    <div
      className="flex-shrink-0 flex flex-col items-center justify-around"
      style={{ width: FRAME_GAP, background: '#080808', borderLeft: '1px solid #161616', borderRight: '1px solid #161616', height }}
    >
      {Array.from({ length: holeCount }).map((_, i) => (
        <div key={i} className="rounded-[1px]" style={{ width: 6, height: 10, background: '#141414', border: '0.5px solid #222' }} />
      ))}
    </div>
  )
}

// Continuous sprocket rail — one strip across all frames
function SprocketRail({ totalFrames }: { totalFrames: number }) {
  const totalW     = totalFrames * (FRAME_W + FRAME_GAP)
  const holeSpacing = (FRAME_W + FRAME_GAP) / HOLES_PER
  const totalHoles  = Math.ceil(totalW / holeSpacing)
  return (
    <svg width={totalW} height={RAIL_H} style={{ display: 'block', flexShrink: 0 }}>
      <rect x={0} y={0} width={totalW} height={RAIL_H} fill="#080808" />
      {Array.from({ length: totalHoles }).map((_, i) => (
        <rect key={i} x={i * holeSpacing + holeSpacing / 2 - HOLE_W / 2} y={(RAIL_H - HOLE_H) / 2}
          width={HOLE_W} height={HOLE_H} rx="1" fill="#1a1a1a" />
      ))}
    </svg>
  )
}

function FrameOpacity({
  scrollYProgress, index, total, children,
}: {
  scrollYProgress: MotionValue<number>; index: number; total: number; children: React.ReactNode
}) {
  const seg    = 1 / (total - 1)
  const active = index * seg
  const prev   = Math.max(0, active - seg)
  const next   = Math.min(1, active + seg)

  const opacity = useTransform(scrollYProgress, [prev, active, next], [0.18, 1, 0.18])
  const scale   = useTransform(scrollYProgress, [prev, active, next], [0.84, 1, 0.84])

  return (
    <motion.div
      className="flex-shrink-0"
      style={{ width: FRAME_W, opacity, scale }}
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 4 + index * 0.5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 0.4,
      }}
    >
      {children}
    </motion.div>
  )
}

export default function Filmography() {
  const reduced  = useReducedMotion()
  const projects = getFeaturedProjects().slice(0, 4)
  const frames   = [...projects, null]
  const total    = frames.length

  const sectionRef = useRef<HTMLDivElement>(null)
  const [viewW, setViewW] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1280
  )

  useEffect(() => {
    const update = () => setViewW(window.innerWidth)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const totalTravel = (total - 1) * (FRAME_W + FRAME_GAP)  // FRAME_GAP = PerforationDivider width
  const startX = 0
  const endX   = -(totalTravel - (viewW - FRAME_W))

  const xRaw = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [startX, endX])
  const x    = useSpring(xRaw, { stiffness: 200, damping: 35, mass: 0.2 })

  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])
  // Section header pans in from left as scroll begins
  const headerX = useTransform(scrollYProgress, [0, 0.15], reduced ? [0, 0] : [-40, 0])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: reduced ? 'auto' : `${total * 50}vh` }}
    >
      <div className={reduced ? 'py-16' : 'sticky top-0 h-screen overflow-hidden flex flex-col justify-center'}>

        <div className="px-6 md:px-10 mb-8 flex items-center justify-between max-w-content mx-auto w-full">
          <motion.span
            className="font-serif text-headline text-text leading-none"
            style={{ x: headerX, opacity: headerOpacity }}
          >
            Filmography
          </motion.span>
        </div>

        {reduced ? (
          <div className="flex flex-col gap-12 px-6">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: '3/2' }}>
                  <Image src={project.thumbnail} alt={project.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" sizes="90vw" />
                </div>
                <div className="mt-4">
                  <h3 className="font-serif text-xl text-text group-hover:text-accent transition-colors duration-300">{project.title}</h3>
                  <p className="label text-muted mt-1">{project.category} · {project.year}</p>
                </div>
              </Link>
            ))}
            <Link href="/projects" className="label text-muted hover:text-accent transition-colors duration-300">All work →</Link>
          </div>
        ) : (
          <div className="relative overflow-visible">
            {/* The entire reel moves as one unit */}
            <motion.div className="absolute flex flex-col" style={{ x, top: 0 }}>

              {/* Top continuous sprocket rail */}
              <SprocketRail totalFrames={total} />

              <div className="flex" style={{ background: '#060606' }}>
                {frames.map((project, i) => (
                  <React.Fragment key={i}>
                    <FrameOpacity scrollYProgress={scrollYProgress} index={i} total={total}>
                      {project ? (
                        <Link href={`/projects/${project.slug}`} className="group block" style={{ width: FRAME_W }}>
                          <div className="relative overflow-hidden" style={{ aspectRatio: '3/2', borderRadius: 6 }}>
                            <Image src={project.thumbnail} alt={project.title} fill
                              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                              sizes="400px" priority={i === 0} />
                            <div className="absolute inset-0 pointer-events-none"
                              style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />
                            <span className="absolute top-2 left-3 label text-white/20 text-[9px]"
                              style={{ fontVariantNumeric: 'tabular-nums' }}>
                              {String(i + 1).padStart(3, '0')}
                            </span>
                          </div>
                          <div className="pt-3 pb-1">
                            <h3 className="font-serif text-lg text-text group-hover:text-accent transition-colors duration-300 leading-tight mb-1">
                              {project.title}
                            </h3>
                            <p className="label text-muted">{project.category} · {project.year}</p>
                            {project.mood && (
                              <p className="label mt-1" style={{ color: 'var(--color-accent)', opacity: 0.45 }}>{project.mood}</p>
                            )}
                          </div>
                        </Link>
                      ) : (
                        <Link href="/projects" className="group flex flex-col items-center justify-center"
                          style={{ width: FRAME_W, aspectRatio: '3/2', borderRadius: 6, border: '1px solid #1a1a1a' }}>
                          <span className="font-serif text-3xl text-text group-hover:text-accent transition-colors duration-300 mb-2">All Work</span>
                          <span className="label text-muted group-hover:text-accent transition-colors duration-300">View full archive →</span>
                        </Link>
                      )}
                    </FrameOpacity>
                    {i < frames.length - 1 && <PerforationDivider height={320} />}
                  </React.Fragment>
                ))}
              </div>

              {/* Bottom continuous sprocket rail */}
              <SprocketRail totalFrames={total} />

            </motion.div>
          </div>
        )}

        {!reduced && (
          <motion.p
            className="absolute bottom-8 left-1/2 -translate-x-1/2 label"
            style={{ opacity: scrollCueOpacity, color: 'var(--color-border)' }}
          >
            Scroll to advance
          </motion.p>
        )}
      </div>
    </div>
  )
}
