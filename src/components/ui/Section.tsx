import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  className?: string
  /** Remove default vertical padding */
  flush?: boolean
}

export default function Section({ children, className, flush }: Props) {
  return (
    <section
      className={cn(
        !flush && 'py-section-sm md:py-section',
        className,
      )}
    >
      {children}
    </section>
  )
}
