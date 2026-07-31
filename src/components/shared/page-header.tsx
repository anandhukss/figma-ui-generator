import type { ReactNode } from 'react'

export interface PageHeaderProps { eyebrow?: string; title: string; description: string; actions?: ReactNode }

/** Shared page heading establishes the application-wide type and spacing hierarchy. */
export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>{eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>}<h1 className="text-2xl font-semibold tracking-tight">{title}</h1><p className="mt-1 text-sm text-muted-foreground">{description}</p></div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </header>
  )
}

