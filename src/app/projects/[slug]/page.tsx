import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectBySlug, projects } from '@/data/projects'
import Container from '@/components/ui/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import FadeIn from '@/components/ui/FadeIn'
import VideoEmbed from '@/components/projects/VideoEmbed'
import ProjectCard from '@/components/projects/ProjectCard'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return { title: project.title, description: project.synopsis }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const related = projects.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <div className="py-section-sm md:py-section">
      <Container>
        {/* Video */}
        <FadeIn>
          <VideoEmbed youtubeId={project.youtubeId} title={project.title} />
        </FadeIn>

        {/* Title block */}
        <div className="mt-10 max-w-prose">
          <FadeIn delay={0.1}>
            <SectionLabel className="block mb-3">
              {`${project.category} · ${project.year}${project.format ? ` · ${project.format}` : ''}`}
            </SectionLabel>
          </FadeIn>
          <FadeIn delay={0.18}>
            <h1 className="font-serif text-5xl md:text-6xl text-text leading-tight">{project.title}</h1>
          </FadeIn>
          <FadeIn delay={0.26}>
            <p className="label text-muted mt-3">{project.role}</p>
          </FadeIn>
        </div>

        {/* Synopsis */}
        <FadeIn delay={0.34} className="mt-8 max-w-prose">
          <p className="text-text/80 text-lg leading-[1.8]">{project.synopsis}</p>
        </FadeIn>

        <div className="divider my-12" />

        {/* Credits */}
        {project.credits && Object.keys(project.credits).length > 0 && (
          <FadeIn className="mb-12">
            <SectionLabel className="block mb-6">Credits</SectionLabel>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
              {Object.entries(project.credits).map(([role, name]) => (
                <div key={role} className="flex gap-4">
                  <dt className="label text-muted w-32 shrink-0">{role}</dt>
                  <dd className="text-text text-sm">{name}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        )}

        <div className="divider mb-12" />

        {/* More work */}
        <FadeIn>
          <div className="flex items-center justify-between mb-8">
            <SectionLabel>More Work</SectionLabel>
            <Link href="/projects" className="label text-muted hover:text-accent transition-colors duration-300">
              All projects →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {related.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}
