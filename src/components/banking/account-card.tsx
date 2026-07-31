import { ArrowUpRight, MoreHorizontal, Waves } from 'lucide-react'
import type { Account } from '../../data/banking'
import { cn, formatCurrency } from '../../lib/utils'
import { Button } from '../ui/button'

const accents = { primary: 'bg-primary text-primary-foreground', accent: 'bg-accent text-accent-foreground', info: 'bg-info text-info-foreground' }

/** Displays a bank account summary using a fixed set of semantic surface variants. */
export function AccountCard({ account, compact = false }: { account: Account; compact?: boolean }) {
  return <article className={cn('relative overflow-hidden rounded-xl p-6 shadow-sm', accents[account.accent])}><div className="absolute -right-8 -top-8 size-32 rounded-full border border-current opacity-10" /><div className="flex items-start justify-between"><div className="flex size-10 items-center justify-center rounded-full bg-card/15"><Waves className="size-5" /></div><Button variant="ghost" size="icon" className="text-current hover:bg-card/15" aria-label={`More options for ${account.name}`}><MoreHorizontal className="size-5" /></Button></div><p className="mt-6 text-sm font-medium opacity-80">{account.name}</p><p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">{formatCurrency(account.balance)}</p><div className="mt-6 flex items-end justify-between gap-4 text-xs"><div><p className="opacity-70">{account.number}</p><p className="mt-1 font-medium">{account.type}</p></div>{!compact && <span className="flex items-center gap-1 font-semibold">Details <ArrowUpRight className="size-3" /></span>}</div></article>
}

