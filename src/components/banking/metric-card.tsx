import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { cn } from '../../lib/utils'

interface BankingMetricCardProps { label: string; value: string; change: string; trend?: 'up' | 'down' | 'neutral'; icon: LucideIcon; className?: string }

/** Summarizes a high-value banking metric with a semantic trend state. */
export function BankingMetricCard({ label, value, change, trend = 'neutral', icon: Icon, className }: BankingMetricCardProps) {
  const TrendIcon = trend === 'down' ? ArrowDownRight : ArrowUpRight
  return <Card className={className}><CardContent><div className="flex items-start justify-between"><div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground"><Icon className="size-5" /></div><span className={cn('flex items-center gap-1 text-xs font-semibold', trend === 'up' && 'text-credit', trend === 'down' && 'text-debit', trend === 'neutral' && 'text-muted-foreground')}>{trend !== 'neutral' && <TrendIcon className="size-3" />}{change}</span></div><p className="mt-5 text-sm text-muted-foreground">{label}</p><p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">{value}</p></CardContent></Card>
}

