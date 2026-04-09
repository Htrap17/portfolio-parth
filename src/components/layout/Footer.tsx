import Link from 'next/link'
import PPLogo from '@/components/ui/PPLogo'

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6 md:px-10">
        <span className="label text-muted">Parth Porwal</span>

        <Link
          href="/"
          className="text-muted hover:text-accent transition-colors duration-300"
          aria-label="Back to top"
        >
          <PPLogo />
        </Link>

        <a
          href="https://instagram.com/parth_porwal_"
          target="_blank"
          rel="noopener noreferrer"
          className="label text-muted hover:text-accent transition-colors duration-300"
        >
          Instagram
        </a>
      </div>
    </footer>
  )
}
