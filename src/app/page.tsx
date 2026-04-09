import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import Chapters from '@/components/home/Chapters'
import WorkSection from '@/components/home/WorkSection'
import WorkedWith from '@/components/home/WorkedWith'
import StatementText from '@/components/ui/StatementText'
import Container from '@/components/ui/Container'
import Showreel from '@/components/home/Showreel'
import AboutNote from '@/components/home/AboutNote'
import ContactSection from '@/components/home/ContactSection'

export const metadata: Metadata = {
  title: 'Parth Porwal — Cinematographer | Director of Photography | Filmmaker',
  description: 'Cinematographer, Director of Photography, and Filmmaker. Short films, music videos, and visual work.',
}

export default function Home() {
  return (
    // Single continuous dark surface — no bg changes between sections
    <div className="relative" style={{ background: '#020202' }}>

      {/* ACT I — Identity arrives */}
      <Hero />

      {/* ACT II — Four worlds, four disciplines */}
      <Chapters />

      {/* ACT III — The work itself */}
      <WorkSection />

      {/* Credibility — typographic, quiet */}
      <WorkedWith />

      {/* Breath — one kinetic line between work and reel */}
      <div className="py-20 md:py-32">
        <Container>
          <StatementText>Light is the only language.</StatementText>
        </Container>
      </div>

      {/* ACT IV — The reel. Uninterrupted. */}
      <Showreel />

      {/* ACT V — The person behind the camera */}
      <AboutNote />

      {/* FINAL FRAME — Fade to black */}
      <ContactSection />

    </div>
  )
}
