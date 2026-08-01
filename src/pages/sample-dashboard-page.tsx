import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CirclePlus,
  CreditCard,
  Ellipsis,
  EyeOff,
  Landmark,
  ReceiptText,
  Send,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  WalletCards,
  Zap,
  Coffee,
  BriefcaseBusiness,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { AmountDisplay } from '../components/shared/amount-display'
import { PageHeader } from '../components/shared/page-header'
import { StatusBadge } from '../components/shared/status-badge'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'

type TransactionStatus = 'completed' | 'pending' | 'failed'

const metrics: Array<{
  label: string
  value: string
  icon: LucideIcon
  detail: ReactNode
}> = [
  { label: 'Total balance', value: '$79,875.04', icon: WalletCards, detail: <span className="rounded-md border border-border bg-background px-2 py-1 text-xs text-muted-foreground">3 accounts</span> },
  { label: 'Monthly income', value: '$8,420.00', icon: TrendingUp, detail: <span className="flex items-center gap-1 text-xs font-medium text-credit"><ArrowUp className="size-3.5" />8.2%</span> },
  { label: 'Monthly spending', value: '$3,148.72', icon: CreditCard, detail: <span className="flex items-center gap-1 text-xs font-medium text-debit"><ArrowDown className="size-3.5" />2.1%</span> },
  { label: 'Savings goal', value: '68%', icon: Landmark, detail: <span className="text-xs font-medium text-primary">$8,120 to go</span> },
]

const accounts = [
  { name: 'Everyday Checking', number: '4821', balance: 24680.42 },
  { name: 'Growth Savings', number: '9156', balance: 47120.18 },
]

const quickActions: Array<{ title: string; description: string; icon: LucideIcon }> = [
  { title: 'Move money', description: 'Transfer between accounts', icon: Send },
  { title: 'Pay a bill', description: 'Schedule or pay now', icon: ReceiptText },
  { title: 'Add account', description: 'Open a new product', icon: CirclePlus },
  { title: 'Manage cards', description: 'View details and settings', icon: CreditCard },
]

const transactions: Array<{
  name: string
  account: string
  date: string
  status: TransactionStatus
  amount: number
  type: 'credit' | 'debit'
  icon: LucideIcon
}> = [
  { name: 'Apple Store', account: 'Checking', date: 'Aug 1', status: 'completed', amount: 149, type: 'debit', icon: ShoppingBag },
  { name: 'Salary Deposit', account: 'Savings', date: 'July 31', status: 'completed', amount: 4210, type: 'credit', icon: BriefcaseBusiness },
  { name: 'Starbucks', account: 'Checking', date: 'July 31', status: 'pending', amount: 12.4, type: 'debit', icon: Coffee },
  { name: 'Amazon', account: 'Checking', date: 'July 30', status: 'failed', amount: 84.2, type: 'debit', icon: ShoppingCart },
  { name: 'Utilities', account: 'Checking', date: 'July 29', status: 'completed', amount: 115, type: 'debit', icon: Zap },
]

export function SampleDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Friday, August 1"
        title="Good morning, Anand"
        description="Here’s what’s happening with your money today."
        actions={<Button className="px-6"><Send className="size-4" />Move money</Button>}
      />

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4" aria-label="Account overview">
        {metrics.map(({ label, value, icon: Icon, detail }) => (
          <Card key={label} className="transition-colors hover:border-primary/50">
            <CardContent>
              <div className="mb-4 flex items-start justify-between gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground"><Icon className="size-5" /></span>
                {detail}
              </div>
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums tracking-tight">{value}</p>
              {label === 'Savings goal' && <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary"><div className="h-full w-2/3 rounded-full bg-primary" /></div>}
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">Your accounts</h2>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground"><EyeOff className="size-4" />Hide</Button>
              <Button variant="ghost" size="sm" className="text-primary">View all</Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {accounts.map((account) => (
              <Card key={account.number} className="transition-colors hover:border-primary/50">
                <CardContent>
                  <div className="mb-8 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{account.name}</h3>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground"><span className="size-1.5 rounded-full bg-completed" />Active ···· {account.number}</div>
                    </div>
                    <Button variant="outline" size="icon" className="size-8 rounded-full" aria-label={`More options for ${account.name}`}><Ellipsis className="size-4" /></Button>
                  </div>
                  <AmountDisplay amount={account.balance} size="large" showSign={false} className="text-3xl" />
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button variant="secondary" size="sm">Transfer</Button>
                    <Button variant="secondary" size="sm">Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Quick actions</h2>
          <Card>
            <CardContent className="p-2">
              {quickActions.map(({ title, description, icon: Icon }, index) => (
                <div key={title} className={index > 0 ? 'border-t border-border' : undefined}>
                  <button className="group flex w-full items-center gap-4 rounded-lg p-4 text-left transition-colors hover:bg-muted">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary transition-colors group-hover:border-primary/50"><Icon className="size-5" /></span>
                    <span><span className="block text-sm font-medium">{title}</span><span className="block text-xs text-muted-foreground">{description}</span></span>
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between gap-4 border-b border-border p-6">
          <div><h2 className="text-lg font-semibold">Recent activity</h2><p className="mt-1 text-xs text-muted-foreground">Your latest account movements</p></div>
          <Button variant="ghost" size="sm" className="text-primary">All transactions<ArrowRight className="size-4" /></Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-3xl text-left text-sm">
            <thead className="border-b border-border bg-secondary/30 text-xs uppercase tracking-wider text-secondary-foreground">
              <tr><th className="px-6 py-4 font-semibold">Transaction</th><th className="px-6 py-4 font-semibold">Account</th><th className="px-6 py-4 font-semibold">Date</th><th className="px-6 py-4 font-semibold">Status</th><th className="px-6 py-4 text-right font-semibold">Amount</th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((transaction) => {
                const Icon = transaction.icon
                return (
                  <tr key={`${transaction.name}-${transaction.date}`} className="transition-colors hover:bg-muted">
                    <td className="px-6 py-4"><span className="flex items-center gap-3 font-medium"><span className="flex size-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground"><Icon className="size-4" /></span>{transaction.name}</span></td>
                    <td className="px-6 py-4 text-muted-foreground">{transaction.account}</td>
                    <td className="px-6 py-4 text-muted-foreground">{transaction.date}</td>
                    <td className="px-6 py-4"><StatusBadge status={transaction.status} className="uppercase tracking-wide">{transaction.status}</StatusBadge></td>
                    <td className="px-6 py-4 text-right"><AmountDisplay amount={transaction.amount} type={transaction.type} /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
