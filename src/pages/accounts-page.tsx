import { ArrowDownToLine, Building2, Plus, ShieldCheck } from 'lucide-react'
import { AccountCard } from '../components/banking/account-card'
import { BankingMetricCard } from '../components/banking/metric-card'
import { PageHeader } from '../components/shared/page-header'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { accounts } from '../data/banking'

export function AccountsPage() {
  return <div className="space-y-6"><PageHeader eyebrow="Accounts" title="Your money, organized" description="Manage balances, account details, and statements in one place." actions={<><Button variant="outline"><ArrowDownToLine className="size-4" />Statements</Button><Button><Plus className="size-4" />Open account</Button></>} />
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{accounts.map((account) => <AccountCard key={account.id} account={account} />)}</section>
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"><BankingMetricCard label="Combined balance" value="$79,875.04" change="Available" icon={Building2} /><BankingMetricCard label="Interest earned" value="$1,284.12" change="12.4%" trend="up" icon={ShieldCheck} /><BankingMetricCard label="Protected funds" value="$79,875.04" change="FDIC insured" icon={ShieldCheck} /></section>
    <Card><CardContent><div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div className="flex items-start gap-4"><span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-info text-info-foreground"><ShieldCheck className="size-5" /></span><div><h2 className="text-base font-semibold">Your deposits are protected</h2><p className="mt-1 max-w-2xl text-sm text-muted-foreground">Eligible deposits are insured up to the legal limit. We use advanced security and continuous monitoring to protect your accounts.</p></div></div><Button variant="outline">Learn more</Button></div></CardContent></Card>
  </div>
}

