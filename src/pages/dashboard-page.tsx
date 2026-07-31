import { ArrowRight, Eye, EyeOff, PiggyBank, Plus, TrendingUp, Wallet } from 'lucide-react'
import { useState } from 'react'
import { AccountCard } from '../components/banking/account-card'
import { BankingMetricCard } from '../components/banking/metric-card'
import { QuickActionCard } from '../components/banking/quick-action-card'
import { TransactionTable } from '../components/banking/transaction-table'
import { PageHeader } from '../components/shared/page-header'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Dialog } from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { Select } from '../components/ui/select'
import { accounts, quickActions, transactions } from '../data/banking'
import { formatCurrency } from '../lib/utils'

export function DashboardPage({ navigate }: { navigate: (path: string) => void }) {
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [transferOpen, setTransferOpen] = useState(false)
  return <div className="space-y-6">
    <PageHeader eyebrow="Friday, July 31" title="Good morning, Anand" description="Here’s what’s happening with your money today." actions={<Button variant="accent" onClick={() => setTransferOpen(true)}><Plus className="size-4" />Move money</Button>} />
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <BankingMetricCard label="Total balance" value={balanceVisible ? formatCurrency(79875.04) : '••••••••'} change="3 accounts" icon={Wallet} />
      <BankingMetricCard label="Monthly income" value="$8,420.00" change="8.2%" trend="up" icon={TrendingUp} />
      <BankingMetricCard label="Monthly spending" value="$3,148.72" change="2.1%" trend="down" icon={Eye} />
      <BankingMetricCard label="Savings goal" value="68%" change="$8,120 to go" icon={PiggyBank} />
    </section>
    <section className="grid gap-6 xl:grid-cols-3">
      <div className="space-y-4 xl:col-span-2"><div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Your accounts</h2><div className="flex items-center gap-2"><Button variant="ghost" size="sm" onClick={() => setBalanceVisible((value) => !value)}>{balanceVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}{balanceVisible ? 'Hide' : 'Show'}</Button><Button variant="ghost" size="sm" onClick={() => navigate('/accounts')}>View all <ArrowRight className="size-4" /></Button></div></div><div className="grid gap-4 lg:grid-cols-2"><AccountCard account={{ ...accounts[0], balance: balanceVisible ? accounts[0].balance : 0 }} /><AccountCard account={{ ...accounts[1], balance: balanceVisible ? accounts[1].balance : 0 }} /></div></div>
      <div className="space-y-4"><h2 className="text-lg font-semibold">Quick actions</h2><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">{quickActions.map((action, index) => <QuickActionCard key={action.label} {...action} onClick={() => index < 2 ? setTransferOpen(true) : navigate(index === 3 ? '/cards' : '/accounts')} />)}</div></div>
    </section>
    <Card><CardHeader className="flex-row items-center justify-between"><div><CardTitle>Recent activity</CardTitle><p className="mt-1 text-sm text-muted-foreground">Your latest account movements</p></div><Button variant="outline" size="sm" onClick={() => navigate('/transactions')}>All transactions <ArrowRight className="size-4" /></Button></CardHeader><CardContent className="p-0 pt-4"><TransactionTable compact transactions={transactions.slice(0, 5)} /></CardContent></Card>
    <Dialog open={transferOpen} onClose={() => setTransferOpen(false)} title="Move money" description="Transfer securely between your accounts."><form className="space-y-4" onSubmit={(event) => { event.preventDefault(); setTransferOpen(false) }}><label className="grid gap-2 text-sm font-medium">From<Select><option>Everyday checking · •••• 4821</option><option>Growth savings · •••• 9156</option></Select></label><label className="grid gap-2 text-sm font-medium">To<Select><option>Growth savings · •••• 9156</option><option>Business reserve · •••• 2048</option></Select></label><label className="grid gap-2 text-sm font-medium">Amount<Input type="number" min="1" placeholder="$0.00" required /></label><div className="flex justify-end gap-3 pt-2"><Button type="button" variant="ghost" onClick={() => setTransferOpen(false)}>Cancel</Button><Button type="submit">Continue</Button></div></form></Dialog>
  </div>
}
