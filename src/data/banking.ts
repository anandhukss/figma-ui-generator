import { ArrowDownLeft, ArrowUpRight, Building2, CreditCard, Landmark, ReceiptText, Send, Smartphone, WalletCards, Zap } from 'lucide-react'

export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'refunded'
export type TransactionType = 'credit' | 'debit'

export interface Account {
  id: string; name: string; number: string; type: string; balance: number; change: string; accent: 'primary' | 'accent' | 'info'
}
export interface Transaction {
  id: string; merchant: string; category: string; date: string; amount: number; type: TransactionType; status: TransactionStatus; icon: typeof Building2
}

export const accounts: Account[] = [
  { id: 'checking', name: 'Everyday checking', number: '•••• 4821', type: 'Checking', balance: 24864.20, change: '+2.4% this month', accent: 'primary' },
  { id: 'savings', name: 'Growth savings', number: '•••• 9156', type: 'Savings · 4.25% APY', balance: 42120.84, change: '+$148.20 interest', accent: 'accent' },
  { id: 'business', name: 'Business reserve', number: '•••• 2048', type: 'Business', balance: 12890.00, change: 'Available now', accent: 'info' },
]

export const transactions: Transaction[] = [
  { id: 'TX-1048', merchant: 'Salary deposit', category: 'Income', date: 'Today, 9:42 AM', amount: 4800, type: 'credit', status: 'completed', icon: ArrowDownLeft },
  { id: 'TX-1047', merchant: 'Willow Market', category: 'Groceries', date: 'Today, 8:16 AM', amount: 84.60, type: 'debit', status: 'completed', icon: ReceiptText },
  { id: 'TX-1046', merchant: 'Northstar Energy', category: 'Utilities', date: 'Yesterday, 4:22 PM', amount: 146.20, type: 'debit', status: 'pending', icon: Zap },
  { id: 'TX-1045', merchant: 'Maya Chen', category: 'Transfer', date: 'Jul 28, 2026', amount: 650, type: 'debit', status: 'completed', icon: Send },
  { id: 'TX-1044', merchant: 'Cloudline Mobile', category: 'Phone', date: 'Jul 27, 2026', amount: 64.99, type: 'debit', status: 'failed', icon: Smartphone },
  { id: 'TX-1043', merchant: 'Blue Bottle Coffee', category: 'Dining', date: 'Jul 26, 2026', amount: 12.40, type: 'debit', status: 'refunded', icon: ArrowUpRight },
]

export const quickActions = [
  { label: 'Send money', description: 'Instant transfer', icon: Send },
  { label: 'Pay a bill', description: 'Schedule payment', icon: ReceiptText },
  { label: 'Deposit check', description: 'Use your camera', icon: Smartphone },
  { label: 'Manage cards', description: 'Controls & limits', icon: WalletCards },
]

export const paymentRecipients = [
  { name: 'Maya Chen', detail: 'maya@email.com', initials: 'MC' },
  { name: 'Alex Morgan', detail: '•••• 8742', initials: 'AM' },
  { name: 'Northstar Energy', detail: 'Autopay on', initials: 'NE' },
  { name: 'Harbor Internet', detail: 'Due Aug 4', initials: 'HI' },
]

export const navIconMap = { dashboard: Landmark, accounts: Building2, transactions: ReceiptText, payments: Send, cards: CreditCard }

