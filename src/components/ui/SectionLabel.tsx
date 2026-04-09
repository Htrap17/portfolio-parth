import { cn } from '@/lib/utils'

type Props = {
  children: string
  className?: string
}

/** Uppercase tracked label — used as section eyebrows and metadata */
export default function SectionLabel({ children, className }: Props) {
  return (
    <span className={cn('label', className)}>
      {children}
    </span>
  )
}
