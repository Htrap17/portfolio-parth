import FadeIn from '@/components/ui/FadeIn'

// FINAL FRAME — Contact
// The page ends here. No footer chrome, no nav echoes.
// Just an address and an invitation. Then black.
export default function ContactSection() {
  return (
    <section
      id="section-contact"
      className="relative flex flex-col justify-center min-h-[70vh] py-32 md:py-48"
      style={{ background: 'linear-gradient(to bottom, #020202 0%, #000000 100%)' }}
    >
      {/* Top dissolve — bleeds from About above */}
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #020202 0%, transparent 100%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-content px-6 md:px-10">

        {/* The invitation — one line, large, unhurried */}
        <FadeIn>
          <p className="label text-muted mb-10" style={{ letterSpacing: '0.25em' }}>
            Contact
          </p>
        </FadeIn>

        <FadeIn delay={0.12}>
          <h2 className="font-serif text-headline text-text leading-none mb-16">
            Available for<br />collaborations.
          </h2>
        </FadeIn>

        {/* Contact lines — sparse, no buttons */}
        <FadeIn delay={0.24}>
          <div className="flex flex-col gap-5">
            <a
              href="mailto:parthporwal.79@gmail.com"
              className="group inline-flex items-center gap-4 w-fit"
            >
              <span className="label text-muted/50" style={{ letterSpacing: '0.2em' }}>Email</span>
              <span className="w-px h-3 bg-border/50" />
              <span className="font-serif text-xl md:text-2xl text-text/70
                group-hover:text-text transition-colors duration-500">
                parthporwal.79@gmail.com
              </span>
            </a>

            <a
              href="https://instagram.com/parth_porwal_"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 w-fit"
            >
              <span className="label text-muted/50" style={{ letterSpacing: '0.2em' }}>Instagram</span>
              <span className="w-px h-3 bg-border/50" />
              <span className="font-serif text-xl md:text-2xl text-text/70
                group-hover:text-text transition-colors duration-500">
                @parth_porwal_
              </span>
            </a>
          </div>
        </FadeIn>

        {/* Final mark — the very last thing on the page */}
        <FadeIn delay={0.5}>
          <p
            className="label mt-32 md:mt-48"
            style={{ color: 'rgba(255,255,255,0.08)', letterSpacing: '0.4em' }}
          >
            Parth Porwal · Roorkee · 2025
          </p>
        </FadeIn>

      </div>
    </section>
  )
}
