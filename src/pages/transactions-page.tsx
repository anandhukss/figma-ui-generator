import { Download, Search, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { TransactionTable } from '../components/banking/transaction-table'
import { EmptyState } from '../components/shared/empty-state'
import { PageHeader } from '../components/shared/page-header'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Select } from '../components/ui/select'
import { transactions } from '../data/banking'

export function TransactionsPage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const visible = transactions.filter((item) => (status === 'all' || item.status === status) && item.merchant.toLowerCase().includes(query.toLowerCase()))
  return <div className="space-y-6"><PageHeader eyebrow="Activity" title="Transactions" description="Search, filter, and review activity across all your accounts." actions={<Button variant="outline"><Download className="size-4" />Export CSV</Button>} />
    <Card><CardContent className="p-4"><div className="flex flex-col gap-3 md:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9" placeholder="Search by merchant or recipient" /></div><Select className="md:w-44" value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">All statuses</option><option value="completed">Completed</option><option value="pending">Pending</option><option value="failed">Failed</option><option value="refunded">Refunded</option></Select><Button variant="outline"><SlidersHorizontal className="size-4" />More filters</Button></div></CardContent></Card>
    {visible.length ? <Card><TransactionTable transactions={visible} /></Card> : <EmptyState icon={Search} title="No transactions found" description="Try adjusting your search or filters to find what you’re looking for." action={<Button variant="outline" onClick={() => { setQuery(''); setStatus('all') }}>Clear filters</Button>} />}
  </div>
}
