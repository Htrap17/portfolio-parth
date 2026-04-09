import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import TransitionProvider from '@/components/ui/TransitionProvider'
import FilmScrollIndicator from '@/components/ui/FilmScrollIndicator'
import FilmLight from '@/components/ui/FilmLight'
import NDCursor from '@/components/ui/NDCursor'
import '@/styles/globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Parth Porwal — Cinematographer | Director of Photography | Filmmaker',
    template: '%s — Parth Porwal',
  },
  description:
    'Parth Porwal is a Cinematographer, Director of Photography, and Filmmaker available for short films, music videos, and commercial work.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://parthporwal.com',
    siteName: 'Parth Porwal',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-bg text-text">
        <NDCursor />
        <Nav />
        <FilmLight />
        <FilmScrollIndicator />
        <main className="flex-1 pt-20">
          <TransitionProvider>{children}</TransitionProvider>
        </main>
        <Footer />
      </body>
    </html>
  )
}
