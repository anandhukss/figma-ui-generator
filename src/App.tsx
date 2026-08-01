import { useEffect, useState } from 'react'
import { AppLayout } from './components/layout/app-layout'
import { AccountsPage } from './pages/accounts-page'
import { CardsPage } from './pages/cards-page'
import { DashboardPage } from './pages/dashboard-page'
import { DesignSystemPage } from './pages/design-system-page'
import { FigmaTestPage } from './pages/figma-test-page'
import { PaymentsPage } from './pages/payments-page'
import { TransactionsPage } from './pages/transactions-page'

const normalizePath = () => window.location.pathname.replace(/\/$/, '') || '/'

export default function App() {
  const [path, setPath] = useState(normalizePath)
  useEffect(() => { const onPopState = () => setPath(normalizePath()); window.addEventListener('popstate', onPopState); return () => window.removeEventListener('popstate', onPopState) }, [])
  const navigate = (nextPath: string) => { if (nextPath !== path) window.history.pushState({}, '', nextPath); setPath(nextPath) }
  const pages: Record<string, React.ReactNode> = {
    '/': <DashboardPage navigate={navigate} />,
    '/accounts': <AccountsPage />,
    '/transactions': <TransactionsPage />,
    '/payments': <PaymentsPage />,
    '/cards': <CardsPage />,
    '/design-system': <DesignSystemPage />,
    '/figma-test': <FigmaTestPage />,
  }
  return <AppLayout currentPath={path} navigate={navigate}>{pages[path] ?? <DashboardPage navigate={navigate} />}</AppLayout>
}
