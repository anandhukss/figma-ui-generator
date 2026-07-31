import { cn, formatCurrency } from '../../lib/utils'

export interface AmountDisplayProps { amount: number; type?: 'credit' | 'debit' | 'neutral'; size?: 'default' | 'large'; showSign?: boolean; className?: string }

/** Formats and colors monetary values consistently across banking screens. */
export function AmountDisplay({ amount, type = 'neutral', size = 'default', showSign = true, className }: AmountDisplayProps) {
  const prefix = showSign && type === 'credit' ? '+' : showSign && type === 'debit' ? '−' : ''
  return <span className={cn('font-semibold tabular-nums', size === 'large' && 'text-2xl', type === 'credit' && 'text-credit', type === 'debit' && 'text-debit', className)}>{prefix}{formatCurrency(amount)}</span>
}

