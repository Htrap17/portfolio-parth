import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import ProjectGrid from '@/components/projects/ProjectGrid'
import CinematicText from '@/components/ui/CinematicText'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected projects by Parth Porwal — short films, music videos, and experimental work.',
}

export default function ProjectsPage() {
  return (
    <Section>
      <Container>
        <CinematicText className="mb-12">
          <h1 className="font-serif text-headline text-text mb-3">Filmography</h1>
          <p className="label text-muted">Short Films · Documentaries · Music Videos · Advertisements</p>
        </CinematicText>
        <ProjectGrid />
      </Container>
    </Section>
  )
}
