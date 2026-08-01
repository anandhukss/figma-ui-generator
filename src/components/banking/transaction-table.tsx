import type { Transaction } from '../../data/banking'
import { AmountDisplay } from '../shared/amount-display'
import { StatusBadge } from '../shared/status-badge'

interface TransactionTableProps { transactions: Transaction[]; compact?: boolean }

/** Canonical responsive transaction list; use for recent and full activity views. */
export function TransactionTable({ transactions, compact = false }: TransactionTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-3xl border-collapse text-sm">
        <thead><tr className="border-b border-border bg-secondary/40 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"><th className="px-6 py-3">Transaction</th><th className="px-4 py-3">Date</th>{!compact && <th className="px-4 py-3">Status</th>}<th className="px-6 py-3 text-right">Amount</th></tr></thead>
        <tbody>{transactions.map((transaction) => { const Icon = transaction.icon; return <tr key={transaction.id} className="border-b border-border even:bg-muted/30 last:border-0 hover:bg-secondary"><td className="px-6 py-4"><div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground"><Icon className="size-4" /></span><div><p className="font-semibold">{transaction.merchant}</p><p className="text-xs text-muted-foreground">{transaction.category} · {transaction.id}</p></div></div></td><td className="px-4 py-4 text-muted-foreground">{transaction.date}</td>{!compact && <td className="px-4 py-4"><StatusBadge status={transaction.status} /></td>}<td className="px-6 py-4 text-right"><AmountDisplay amount={transaction.amount} type={transaction.type} /></td></tr> })}</tbody>
      </table>
    </div>
  )
}
