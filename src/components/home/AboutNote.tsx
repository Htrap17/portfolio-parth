import Link from 'next/link'
import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'
import CinematicText from '@/components/ui/CinematicText'

export default function AboutNote() {
  return (
    <section id="section-about" className="py-32 md:py-48 bg-bg">
      <div className="mx-auto max-w-content px-6 md:px-10">

        {/* Three-column at md: statement | text | portrait */}
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1.4fr_1fr] gap-12 md:gap-16 items-start">

          {/* Statement */}
          <div>
            <FadeIn className="mb-4">
              <p className="label text-muted" style={{ letterSpacing: '0.25em' }}>About</p>
            </FadeIn>

            <CinematicText drift={20}>
              <h2 className="font-serif text-statement text-text leading-[1.05]">
                I work with light, time,<br />
                and the space<br />
                between cuts.
              </h2>
            </CinematicText>

            <FadeIn delay={0.4}>
              <div className="mt-14 w-12 h-px bg-accent/40" />
            </FadeIn>
          </div>

          {/* Prose */}
          <div className="md:pt-16">
            <FadeIn delay={0.1}>
              <p className="text-text/70 text-lg leading-[1.85] mb-7">
                I studied Economics at IIT Roorkee. Most of my real education happened
                in the dark, watching films, learning how light falls, understanding
                why a frame holds or doesn't.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-text/70 text-lg leading-[1.85] mb-7">
                The economics training wasn't wasted. It taught me to read systems,
                find what's essential, cut what isn't. I apply the same logic to a frame.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-text/70 text-lg leading-[1.85] mb-7">
                For the past 4 years, I've been part of Cinematic Section, IIT Roorkee
                where most of this work was made.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-text/70 text-lg leading-[1.85]">
                Cinematography, to me, is a form of listening. You read the script,
                talk to the director, and find the visual language that was already
                there, waiting to be uncovered.
              </p>
            </FadeIn>

            <FadeIn delay={0.45}>
              <div className="mt-14 flex items-center gap-6">
                <Link href="/about"
                  className="label text-muted hover:text-accent transition-colors duration-300">
                  Full profile
                </Link>
                <span className="w-px h-3 bg-border" />
                <Link href="/contact"
                  className="label text-muted hover:text-accent transition-colors duration-300">
                  Get in touch
                </Link>
                <span className="w-px h-3 bg-border" />
                <a href="https://instagram.com/parth_porwal_" target="_blank" rel="noopener noreferrer"
                  className="label text-muted hover:text-accent transition-colors duration-300">
                  Instagram
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Portrait — right */}
          <FadeIn>
            <div className="relative overflow-hidden md:mt-8"
              style={{ aspectRatio: '3/4', borderRadius: 12, maxWidth: 280 }}>
              <Image
                src="/portrait.png"
                alt="Parth Porwal"
                fill
                className="object-cover object-top"
                sizes="280px"
              />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.4) 0%, transparent 60%)' }}
                aria-hidden="true" />
            </div>
          </FadeIn>

        </div>

        <FadeIn delay={0.2}>
          <div className="mt-24 w-full h-px bg-border/20" />
        </FadeIn>

      </div>
    </section>
  )
}
