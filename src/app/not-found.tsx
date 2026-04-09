import Link from 'next/link'
import Container from '@/components/ui/Container'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center">
      <Container>
        <p className="label text-muted mb-4">404</p>
        <h1 className="font-serif text-5xl text-text mb-8">Page not found.</h1>
        <Link href="/" className="label text-muted hover:text-accent transition-colors duration-300">
          ← Back home
        </Link>
      </Container>
    </div>
  )
}
