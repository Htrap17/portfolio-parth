import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:      '#050505',
        surface: '#0d0d0d',
        border:  '#1a1a1a',
        text:    '#f0ece4',
        muted:   '#6b6560',
        accent:  '#c8b89a',
      },
      fontFamily: {
        serif:  ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:   ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display:   ['clamp(5rem, 13vw, 10rem)',  { lineHeight: '0.95' }],
        headline:  ['clamp(3rem, 7vw, 6rem)',    { lineHeight: '1' }],
        statement: ['clamp(2.5rem, 5.5vw, 4.5rem)', { lineHeight: '1.05' }],
        title:     ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.1' }],
        label:     ['0.6875rem', { lineHeight: '1', letterSpacing: '0.15em' }],
      },
      spacing: {
        section: '7.5rem',
        'section-sm': '4rem',
      },
      maxWidth: {
        content: '1280px',
        prose:   '640px',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.76, 0, 0.24, 1)',
        reveal:    'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
