import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import FadeIn from '@/components/ui/FadeIn'
import ContactForm from '@/components/ui/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Parth Porwal.',
}

export default function ContactPage() {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <FadeIn>
              <h1 className="font-serif text-5xl md:text-6xl text-text leading-tight mb-8">
                Get in touch
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-muted text-base leading-relaxed mb-10">
                If you're working on something and think we'd be a good fit — a short film,
                a music video, anything that needs a considered eye — I'd like to hear about it.
              </p>
            </FadeIn>
            <FadeIn delay={0.18}>
              <a
                href="https://instagram.com/parth_porwal_"
                target="_blank"
                rel="noopener noreferrer"
                className="label text-muted hover:text-accent transition-colors duration-300"
              >
                Instagram →
              </a>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <ContactForm />
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}
