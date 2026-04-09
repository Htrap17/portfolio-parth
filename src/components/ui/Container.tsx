import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  className?: string
  /** Constrain to max-w-content with horizontal padding */
  narrow?: boolean
}

export default function Container({ children, className, narrow }: Props) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-content px-6 md:px-10',
        narrow && 'max-w-prose',
        className,
      )}
    >
      {children}
    </div>
  )
}
