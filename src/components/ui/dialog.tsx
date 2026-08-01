import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from './button'

interface DialogProps { open: boolean; onClose: () => void; title: string; description?: string; children: ReactNode }

/** Accessible semantic overlay used for focused banking workflows. */
export function Dialog({ open, onClose, title, description, children }: DialogProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4" role="presentation" onMouseDown={onClose}>
      <div className="w-full max-w-md rounded-xl border border-border bg-popover p-6 text-popover-foreground shadow-lg" role="dialog" aria-modal="true" aria-labelledby="dialog-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div><h2 id="dialog-title" className="text-lg font-semibold">{title}</h2>{description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}</div>
          <Button variant="ghost" size="icon" className="-mr-2 -mt-2" onClick={onClose} aria-label="Close dialog"><X className="size-4" /></Button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}
