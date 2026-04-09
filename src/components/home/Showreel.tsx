import Container from '@/components/ui/Container'
import FadeIn from '@/components/ui/FadeIn'
import ApertureReveal from '@/components/ui/ApertureReveal'

// ACT IV — The reel. The work speaking for itself.
export default function Showreel() {
  return (
    <section id="section-showreel" className="relative py-24 md:py-32">
      {/* Top dissolve */}
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #020202 0%, transparent 100%)' }}
        aria-hidden="true"
      />

      <Container>
        <div className="mb-8 flex items-end justify-between">
          <FadeIn>
            <span className="label text-muted">Showreel</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <span className="label text-border">2025</span>
          </FadeIn>
        </div>

        <ApertureReveal delay={0.05}>
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: '16/9', border: '1px solid var(--color-border)' }}
          >
            <video
              className="absolute inset-0 w-full h-full object-cover"
              controls
              playsInline
              preload="metadata"
            >
              <source src="/showreel.mp4" type="video/mp4" />
            </video>
          </div>
        </ApertureReveal>
      </Container>
    </section>
  )
}
