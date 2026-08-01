import { Bell, ChevronDown, HelpCircle, Menu, Search, ShieldCheck, Sparkles, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { navIconMap } from '../../data/banking'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const navItems = [
  { label: 'Overview', href: '/', icon: navIconMap.dashboard },
  { label: 'Accounts', href: '/accounts', icon: navIconMap.accounts },
  { label: 'Transactions', href: '/transactions', icon: navIconMap.transactions },
  { label: 'Payments', href: '/payments', icon: navIconMap.payments },
  { label: 'Cards', href: '/cards', icon: navIconMap.cards },
]

export interface AppLayoutProps { children: ReactNode; currentPath: string; navigate: (path: string) => void }

/** Shared application shell for every banking and design-system route. */
export function AppLayout({ children, currentPath, navigate }: AppLayoutProps) {
  const [open, setOpen] = useState(false)
  const go = (path: string) => { navigate(path); setOpen(false) }
  return (
    <div className="min-h-screen bg-background">
      {open && <button className="fixed inset-0 z-30 bg-background/80 lg:hidden" aria-label="Close navigation" onClick={() => setOpen(false)} />}
      <aside className={cn('fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform lg:translate-x-0', open ? 'translate-x-0' : '-translate-x-full')}>
        <div className="flex h-20 items-center justify-between px-6"><button className="flex items-center gap-3" onClick={() => go('/')}><span className="flex size-9 items-center justify-center rounded-lg bg-sidebar-active text-sidebar-active-foreground"><Sparkles className="size-5" /></span><span className="text-xl font-semibold tracking-tight">verdant</span></button><Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-foreground/10 lg:hidden" onClick={() => setOpen(false)}><X className="size-5" /></Button></div>
        <nav className="flex-1 px-4 py-4"><p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-sidebar-muted">Banking</p><div className="space-y-1">{navItems.map(({ label, href, icon: Icon }) => <button key={href} onClick={() => go(href)} className={cn('flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition', currentPath === href ? 'bg-sidebar-active/10 text-sidebar-active' : 'text-sidebar-muted hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground')}><Icon className="size-4" />{label}</button>)}</div></nav>
        <div className="px-4 pb-4"><div className="rounded-xl bg-sidebar-foreground/10 p-4"><div className="flex size-9 items-center justify-center rounded-lg bg-sidebar-foreground/10"><ShieldCheck className="size-4" /></div><p className="mt-3 text-sm font-semibold">Secure & protected</p><p className="mt-1 text-xs leading-5 text-sidebar-muted">Your accounts are monitored around the clock.</p></div><button onClick={() => go('/design-system')} className="mt-4 flex items-center gap-3 px-3 py-2 text-xs text-sidebar-muted hover:text-sidebar-foreground"><HelpCircle className="size-4" />Design system</button></div>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-20 items-center gap-4 border-b border-border bg-card px-4 md:px-6 lg:px-8"><Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)}><Menu className="size-5" /></Button><div className="relative hidden max-w-md flex-1 sm:block"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="border-border bg-muted pl-9" placeholder="Search transactions, accounts..." /></div><div className="ml-auto flex items-center gap-2"><Button variant="ghost" size="icon" aria-label="Notifications" className="relative"><Bell className="size-5" /><span className="absolute right-2 top-2 size-2 rounded-full border-2 border-card bg-debit" /></Button><div className="mx-1 hidden h-8 w-px bg-border sm:block" /><button className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-muted"><span className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">AJ</span><span className="hidden text-left md:block"><span className="block text-sm font-semibold">Anand J.</span><span className="block text-xs text-muted-foreground">Personal</span></span><ChevronDown className="hidden size-4 text-muted-foreground md:block" /></button></div></header>
        <main className="mx-auto w-full max-w-screen-2xl p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
