import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import FadeIn from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'About',
  description: 'Parth Porwal — Cinematographer and Director of Photography.',
}

export default function AboutPage() {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_420px] gap-12 md:gap-20 items-start max-w-5xl">

          {/* Left — text */}
          <div>
            <FadeIn>
              <h1 className="font-serif text-5xl md:text-6xl text-text leading-tight mb-10">
                Parth Porwal
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-text/80 text-lg leading-[1.8] mb-6">
                I&apos;m a cinematographer and DOP based in Roorkee. I studied Economics at IIT Roorkee,
                but most of my real education happened in the dark, watching films, learning how
                light falls, understanding why a frame holds or doesn&apos;t.
              </p>
            </FadeIn>

            <FadeIn delay={0.16}>
              <p className="text-text/80 text-lg leading-[1.8] mb-6">
                I work on short films and music videos. The scale doesn&apos;t matter much to me, what
                matters is whether the image is honest. Whether it earns its place in the cut.
              </p>
            </FadeIn>

            <FadeIn delay={0.22}>
              <p className="text-text/80 text-lg leading-[1.8] mb-6">
                For the past 4 years, I&apos;ve been part of Cinematic Section, IIT Roorkee
                where most of this work was made.
              </p>
            </FadeIn>

            <FadeIn delay={0.22}>
              <p className="text-text/80 text-lg leading-[1.8]">
                I think about cinematography as a form of listening. You read the script, you talk
                to the director, and then you try to find the visual language that was already there,
                waiting to be uncovered.
              </p>
            </FadeIn>

            <div className="divider my-12" />

            <FadeIn delay={0.1}>
              <div className="flex flex-wrap gap-6">
                <Link href="/contact"
                  className="label text-muted hover:text-accent transition-colors duration-300">
                  Get in touch
                </Link>
                <a href="https://instagram.com/parth_porwal_" target="_blank" rel="noopener noreferrer"
                  className="label text-muted hover:text-accent transition-colors duration-300">
                  Instagram
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right — portrait */}
          <FadeIn>
            <div className="relative overflow-hidden"
              style={{ width: '100%', aspectRatio: '3/4', borderRadius: 12 }}>
              <Image
                src="/portrait.png"
                alt="Parth Porwal"
                fill
                className="object-cover object-top"
                sizes="380px"
                priority
              />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.4) 0%, transparent 60%)' }}
                aria-hidden="true" />
            </div>
          </FadeIn>

        </div>
      </Container>
    </Section>
  )
}
