import { CreditCard, Inbox, Landmark, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { AccountCard } from '../components/banking/account-card'
import { BankingMetricCard } from '../components/banking/metric-card'
import { TransactionTable } from '../components/banking/transaction-table'
import { AmountDisplay } from '../components/shared/amount-display'
import { EmptyState } from '../components/shared/empty-state'
import { PageHeader } from '../components/shared/page-header'
import { StatusBadge } from '../components/shared/status-badge'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Dialog } from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { Select } from '../components/ui/select'
import { accounts, transactions } from '../data/banking'

const colors = [
  ['Background', 'bg-background'], ['Card', 'bg-card'], ['Primary', 'bg-primary'], ['Secondary', 'bg-secondary'], ['Accent', 'bg-accent'], ['Success', 'bg-success'], ['Warning', 'bg-warning'], ['Destructive', 'bg-destructive'], ['Info', 'bg-info'], ['Muted', 'bg-muted'],
]

const spacingBars = [
  ['2', 'h-2'], ['3', 'h-3'], ['4', 'h-4'], ['5', 'h-5'], ['6', 'h-6'], ['8', 'h-8'], ['10', 'h-10'], ['12', 'h-12'],
]

export function DesignSystemPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  return <div className="space-y-10"><PageHeader eyebrow="Development reference" title="Verdant design system" description="Semantic tokens, reusable components, and canonical layout patterns for product teams and UI agents." />
    <section className="space-y-4"><div><h2 className="text-lg font-semibold">Color tokens</h2><p className="text-sm text-muted-foreground">Purpose-led colors mapped through CSS variables and Tailwind.</p></div><div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">{colors.map(([name, color]) => <Card key={name}><div className={`h-20 rounded-t-xl border-b border-border ${color}`} /><div className="p-3"><p className="text-sm font-semibold">{name}</p><p className="text-xs text-muted-foreground">{color}</p></div></Card>)}</div></section>
    <section className="grid gap-6 lg:grid-cols-2"><Card><CardHeader><CardTitle>Typography hierarchy</CardTitle></CardHeader><CardContent className="space-y-5"><div><p className="text-xs text-muted-foreground">Page title</p><p className="text-2xl font-semibold tracking-tight">Manage your accounts</p></div><div><p className="text-xs text-muted-foreground">Section title</p><p className="text-lg font-semibold">Recent activity</p></div><div><p className="text-xs text-muted-foreground">Card title</p><p className="text-base font-semibold">Everyday checking</p></div><div><p className="text-sm">Body text communicates core product content.</p><p className="text-sm text-muted-foreground">Supporting text adds context without competing.</p></div><AmountDisplay amount={24864.20} size="large" showSign={false} /></CardContent></Card><Card><CardHeader><CardTitle>Spacing & shape</CardTitle></CardHeader><CardContent><div className="space-y-4"><div className="flex items-end gap-2">{spacingBars.map(([label, height]) => <div key={label} className="text-center"><div className={`w-5 rounded-sm bg-primary ${height}`} /><span className="mt-1 block text-xs text-muted-foreground">{label}</span></div>)}</div><p className="text-sm text-muted-foreground">Controls use rounded-md, cards use rounded-xl, and badges use rounded-full. Standard section spacing is gap-6.</p></div></CardContent></Card></section>
    <section className="space-y-4"><h2 className="text-lg font-semibold">Actions & states</h2><Card><CardContent className="space-y-6"><div className="flex flex-wrap gap-3"><Button>Default</Button><Button variant="secondary">Secondary</Button><Button variant="accent">Accent</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button><Button variant="destructive">Destructive</Button></div><div className="flex flex-wrap gap-3"><StatusBadge status="completed" /><StatusBadge status="pending" /><StatusBadge status="failed" /><StatusBadge status="refunded" /><StatusBadge status="active" /><StatusBadge status="inactive" /></div><div className="flex flex-wrap gap-6"><AmountDisplay amount={4500} type="credit" /><AmountDisplay amount={1200} type="debit" /><AmountDisplay amount={318.42} showSign={false} /></div></CardContent></Card></section>
    <section className="grid gap-6 lg:grid-cols-2"><Card><CardHeader><CardTitle>Form controls</CardTitle></CardHeader><CardContent className="space-y-4"><label className="grid gap-2 text-sm font-medium">Account name<Input placeholder="Enter account name" /></label><label className="grid gap-2 text-sm font-medium">Account type<Select><option>Everyday checking</option><option>Growth savings</option></Select></label><div className="flex gap-3"><Button onClick={() => setDialogOpen(true)}>Open dialog</Button><Button variant="outline" disabled>Disabled</Button></div></CardContent></Card><AccountCard account={accounts[0]} /></section>
    <section className="space-y-4"><h2 className="text-lg font-semibold">Cards & metrics</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><BankingMetricCard label="Total balance" value="$79,875.04" change="8.2%" trend="up" icon={Landmark} /><BankingMetricCard label="Monthly spend" value="$3,148.72" change="2.1%" trend="down" icon={CreditCard} /><BankingMetricCard label="Portfolio growth" value="+$1,248.20" change="This month" icon={TrendingUp} /></div></section>
    <section className="space-y-4"><h2 className="text-lg font-semibold">Transaction table</h2><Card><TransactionTable transactions={transactions.slice(0, 3)} /></Card></section>
    <section className="space-y-4"><h2 className="text-lg font-semibold">Empty state & layout pattern</h2><EmptyState icon={Inbox} title="Nothing here yet" description="New activity will appear here when it becomes available." action={<Button variant="outline">Explore accounts</Button>} /></section>
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="Example dialog" description="Dialogs use the shared overlay, shape, and elevation tokens."><p className="text-sm text-muted-foreground">Place focused workflows here and keep actions clear.</p><div className="mt-6 flex justify-end gap-3"><Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={() => setDialogOpen(false)}>Confirm</Button></div></Dialog>
  </div>
}
