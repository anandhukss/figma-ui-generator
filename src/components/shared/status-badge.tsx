import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const statusVariants = cva('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize', {
  variants: { status: {
    completed: 'bg-success text-success-foreground',
    pending: 'bg-warning text-warning-foreground',
    failed: 'bg-destructive text-destructive-foreground',
    refunded: 'bg-info text-info-foreground',
    active: 'bg-success text-success-foreground',
    inactive: 'bg-muted text-muted-foreground',
  } },
  defaultVariants: { status: 'completed' },
})

export type StatusBadgeProps = { className?: string; children?: string } & VariantProps<typeof statusVariants>

/** Displays transaction and account statuses; reuse instead of styling badges per page. */
export function StatusBadge({ status, className, children }: StatusBadgeProps) {
  return <span className={cn(statusVariants({ status }), className)}><span className="mr-1.5 size-1.5 rounded-full bg-current" />{children ?? status}</span>
}

