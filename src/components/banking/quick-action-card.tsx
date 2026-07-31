import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '../../lib/utils'

export function QuickActionCard({ icon: Icon, label, description, onClick, className }: { icon: LucideIcon; label: string; description: string; onClick?: () => void; className?: string }) {
  return <button onClick={onClick} className={cn('group flex w-full items-center gap-3 rounded-xl border border-border bg-card p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-ring hover:shadow-md', className)}><span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground"><Icon className="size-5" /></span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold">{label}</span><span className="block truncate text-xs text-muted-foreground">{description}</span></span><ArrowUpRight className="size-4 text-muted-foreground transition group-hover:text-foreground" /></button>
}
