import {
  BriefcaseBusiness,
  Check,
  ChevronsUpDown,
  MapPin,
  Minus,
  Pencil,
  Phone,
  SquareCheckBig,
  Trash2,
  UserRound,
} from 'lucide-react'
import { StatusBadge } from '../components/shared/status-badge'
import { Card } from '../components/ui/card'

type UserStatus = 'Online' | 'Offline'

interface DirectoryUser {
  name: string
  email: string
  phone: string
  location: string
  company: string
  companyMark: string
  status: UserStatus
  selected: boolean
  avatarClass: string
  companyClass: string
}

const users: DirectoryUser[] = [
  { name: 'John Carter', email: 'john@google.com', phone: '(414) 907 - 1274', location: 'United States', company: 'Google', companyMark: 'G', status: 'Online', selected: true, avatarClass: 'from-accent to-primary', companyClass: 'bg-card text-primary' },
  { name: 'Sophie Moore', email: 'sophie@webflow.com', phone: '(240) 480 - 4277', location: 'United Kingdom', company: 'Webflow', companyMark: 'W', status: 'Offline', selected: false, avatarClass: 'from-primary to-info', companyClass: 'bg-primary text-primary-foreground' },
  { name: 'Matt Cannon', email: 'matt@facebook.com', phone: '(318) 698 - 9889', location: 'Australia', company: 'Facebook', companyMark: 'f', status: 'Offline', selected: false, avatarClass: 'from-info to-accent', companyClass: 'bg-info text-primary-foreground' },
  { name: 'Graham Hills', email: 'graham@twitter.com', phone: '(540) 627 - 3890', location: 'India', company: 'Twitter', companyMark: 't', status: 'Online', selected: true, avatarClass: 'from-primary to-accent', companyClass: 'bg-info text-primary-foreground' },
  { name: 'Sandy Houston', email: 'sandy@youtube.com', phone: '(440) 410 - 3848', location: 'Canada', company: 'YouTube', companyMark: '▶', status: 'Offline', selected: false, avatarClass: 'from-warning to-accent', companyClass: 'bg-destructive text-primary-foreground' },
  { name: 'Andy Smith', email: 'andy@reddit.com', phone: '(504) 458 - 3268', location: 'United States', company: 'Reddit', companyMark: 'r', status: 'Online', selected: true, avatarClass: 'from-accent to-info', companyClass: 'bg-accent text-primary-foreground' },
  { name: 'Lilly Woods', email: 'lilly@spotify.com', phone: '(361) 692 - 1819', location: 'Australia', company: 'Spotify', companyMark: 'S', status: 'Offline', selected: false, avatarClass: 'from-info to-primary', companyClass: 'bg-success text-success-foreground' },
  { name: 'Patrick Meyer', email: 'patrick@pinterest.com', phone: '(760) 582 - 5670', location: 'United Kingdom', company: 'Pinterest', companyMark: 'P', status: 'Online', selected: true, avatarClass: 'from-destructive to-accent', companyClass: 'bg-destructive text-primary-foreground' },
  { name: 'Frances Willen', email: 'frances@twitch.com', phone: '(216) 496 - 5864', location: 'Canada', company: 'Twitch', companyMark: 'T', status: 'Offline', selected: false, avatarClass: 'from-primary to-accent', companyClass: 'bg-primary text-primary-foreground' },
  { name: 'Ernest Houston', email: 'ernest@linkedin.com', phone: '(704) 339 - 8813', location: 'India', company: 'LinkedIn', companyMark: 'in', status: 'Offline', selected: false, avatarClass: 'from-primary to-info', companyClass: 'bg-info text-primary-foreground' },
]

function SelectionBox({ checked, mixed = false, label }: { checked?: boolean; mixed?: boolean; label: string }) {
  const active = checked || mixed
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={mixed ? 'mixed' : Boolean(checked)}
      aria-label={label}
      className={`inline-flex size-3 items-center justify-center rounded-[2px] border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card ${active ? 'border-accent bg-accent text-primary-foreground' : 'border-input bg-transparent text-transparent hover:border-muted-foreground'}`}
    >
      {mixed ? <Minus className="size-2.5" strokeWidth={3} /> : <Check className="size-2.5" strokeWidth={3} />}
    </button>
  )
}

const HeaderLabel = ({ icon: Icon, children }: { icon: typeof UserRound; children: string }) => (
  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted-foreground">
    <Icon className="size-3" aria-hidden="true" />
    <span>{children}</span>
    <ChevronsUpDown className="ml-0.5 size-2.5 opacity-70" aria-hidden="true" />
  </span>
)

export function FigmaTestPage() {
  return (
    <Card className="w-full max-w-[1060px] overflow-hidden rounded-xl shadow-sm">
      <div className="flex h-[68px] min-w-[1060px] items-center justify-between border-b border-border px-[34px]">
        <h1 className="text-base font-medium text-card-foreground">All Users</h1>
        <p className="text-sm tabular-nums text-muted-foreground"><span className="font-semibold text-accent">1 - 10</span> of 256</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-[1060px] table-fixed border-collapse text-xs" aria-label="All users">
          <colgroup>
            <col className="w-[66px]" />
            <col className="w-[187px]" />
            <col className="w-[191px]" />
            <col className="w-[200px]" />
            <col className="w-[207px]" />
            <col className="w-[124px]" />
            <col className="w-[85px]" />
          </colgroup>
          <thead>
            <tr className="h-[47px] border-b border-border bg-secondary/20 text-left">
              <th className="p-0 text-center"><SelectionBox mixed label="Select all users" /></th>
              <th className="p-0"><HeaderLabel icon={UserRound}>Name</HeaderLabel></th>
              <th className="p-0"><HeaderLabel icon={Phone}>Phone</HeaderLabel></th>
              <th className="p-0"><HeaderLabel icon={MapPin}>Location</HeaderLabel></th>
              <th className="p-0"><HeaderLabel icon={BriefcaseBusiness}>Company</HeaderLabel></th>
              <th className="p-0"><HeaderLabel icon={SquareCheckBig}>Status</HeaderLabel></th>
              <th className="p-0"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email} className="h-[62px] border-b border-border bg-card even:bg-muted/30 last:border-0 hover:bg-secondary/40">
                <td className="p-0 text-center"><SelectionBox checked={user.selected} label={`Select ${user.name}`} /></td>
                <td className="p-0">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className={`flex size-[29px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${user.avatarClass} text-[10px] font-semibold text-primary-foreground ring-1 ring-border`} aria-hidden="true">
                      {user.name.split(' ').map((part) => part[0]).join('')}
                    </span>
                    <span className="min-w-0 leading-4">
                      <span className="block truncate font-medium text-card-foreground">{user.name}</span>
                      <span className="block truncate text-[10px] text-muted-foreground">{user.email}</span>
                    </span>
                  </div>
                </td>
                <td className="p-0 tabular-nums text-muted-foreground">{user.phone}</td>
                <td className="p-0 text-muted-foreground">{user.location}</td>
                <td className="p-0">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${user.companyClass}`} aria-hidden="true">{user.companyMark}</span>
                    <span>{user.company}</span>
                  </div>
                </td>
                <td className="p-0">
                  <StatusBadge
                    status={user.status === 'Online' ? 'active' : 'inactive'}
                    className={user.status === 'Online' ? 'rounded-sm bg-success/20 px-1.5 py-0.5 text-[10px] font-medium normal-case text-success' : 'rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-medium normal-case text-muted-foreground'}
                  >
                    {user.status}
                  </StatusBadge>
                </td>
                <td className="p-0">
                  <div className="flex items-center gap-1">
                    <button type="button" className="rounded-sm p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`Edit ${user.name}`}><Pencil className="size-3.5" /></button>
                    <button type="button" className="rounded-sm p-1.5 text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`Delete ${user.name}`}><Trash2 className="size-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
