import Link from 'next/link'
import { getFeaturedProjects } from '@/data/projects'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import FadeIn from '@/components/ui/FadeIn'
import FeaturedCard from './FeaturedCard'
import FrameSequence from '@/components/ui/FrameSequence'

export default function FeaturedWork() {
  const featured = getFeaturedProjects().slice(0, 3)

  return (
    <Section>
      <Container>
        <FadeIn className="mb-10">
          <span className="label text-muted">Selected Work</span>
        </FadeIn>

        <FrameSequence className="grid grid-cols-1 md:grid-cols-[3fr_4fr_2.5fr] gap-8 md:gap-6 items-end">
          {featured.map((project, i) => (
            <FeaturedCard key={project.id} project={project} index={i} />
          ))}
        </FrameSequence>

        <FadeIn delay={0.2} className="mt-10 flex justify-end">
          <Link
            href="/projects"
            className="group label text-muted hover:text-accent transition-colors duration-300 flex items-center gap-2"
          >
            All work
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </FadeIn>
      </Container>
    </Section>
  )
}
