'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PPLogo from '@/components/ui/PPLogo'

const links = [
  { href: '/projects', label: 'Work' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
]

export default function Nav() {
  const pathname   = usePathname()
  const [open, setOpen] = useState(false)

  // lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // close on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-colors duration-500"
        style={{ backgroundColor: 'transparent' }}
      >
        <div className="flex h-20 items-center justify-end px-6 md:px-10">
          {/* Top-right: links + logo together */}
          <div className="hidden md:flex items-center gap-8">
            <nav aria-label="Primary navigation" className="flex items-center gap-10">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="label transition-colors duration-300"
                  style={{ color: pathname === href ? 'var(--color-accent)' : 'var(--color-muted)' }}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="w-px h-4 bg-border/40" />

            <Link href="/" aria-label="Parth Porwal — Home">
              <PPLogo />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex flex-col gap-[6px] p-2 -ml-2"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className="block h-px w-6 bg-text transition-transform duration-300 origin-center"
              style={{ transform: open ? 'translateY(4px) rotate(45deg)' : 'none' }} />
            <span className="block h-px w-6 bg-text transition-transform duration-300 origin-center"
              style={{ transform: open ? 'translateY(-4px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-30 flex flex-col justify-center px-10 bg-bg"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <nav className="flex flex-col gap-8">
              {links.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={href}
                    className="font-serif text-5xl text-text hover:text-accent transition-colors duration-300"
                    style={{ color: pathname === href ? 'var(--color-accent)' : undefined }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="absolute bottom-10 left-10 right-10 flex items-center justify-between"
            >
              <a
                href="https://instagram.com/parth_porwal_"
                target="_blank"
                rel="noopener noreferrer"
                className="label hover:text-accent transition-colors duration-300"
              >
                Instagram
              </a>
              <span className="label">© 2025 Parth Porwal</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
