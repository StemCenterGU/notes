"use client"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

/** Standard page frame. Every app page uses this so gutters never drift. */
export function Page({ children, className, wide = false }) {
  return (
    <div className={cn("mx-auto px-6 py-9 lg:px-10", wide ? "max-w-[1400px]" : "max-w-5xl", className)}>
      {children}
    </div>
  )
}

/** Page title block. `actions` sits right, on the title's optical line. */
export function PageHeader({ eyebrow, title, description, actions, className }) {
  return (
    <header className={cn("flex flex-wrap items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        {eyebrow && (
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display mt-1 text-[28px] text-foreground">{title}</h1>
        {description && (
          <p className="mt-1.5 max-w-prose text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  )
}

/** A labelled region. Hairline rule, never a card. */
export function Section({ title, description, actions, children, className }) {
  return (
    <section className={cn("mt-8", className)}>
      {(title || actions) && (
        <div className="mb-3 flex items-end justify-between gap-4 border-b border-border pb-2">
          <div>
            {title && <h2 className="text-[13px] font-medium text-foreground">{title}</h2>}
            {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  )
}

/** Dense table shell: hairlines, tabular figures, no outer box. */
export function DataTable({ columns, children, className }) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full min-w-[520px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th
                key={col.key ?? col.label}
                scope="col"
                className={cn(
                  "whitespace-nowrap py-2 pr-4 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground",
                  col.align === "right" && "pr-0 text-right",
                  col.className
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">{children}</tbody>
      </table>
    </div>
  )
}

export function Td({ children, className, align }) {
  return (
    <td className={cn("py-3 pr-4 align-middle", align === "right" && "pr-0 text-right", className)}>
      {children}
    </td>
  )
}

/** Nothing-here state. Text and one action, no dashed box. */
export function EmptyState({ title, description, action, className }) {
  return (
    <div className={cn("border-t border-border py-14 text-center", className)}>
      <p className="text-sm font-medium text-foreground">{title}</p>
      {description && (
        <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  )
}

export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="divide-y divide-border border-t border-border">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-6 py-3.5">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className={cn("h-3.5", c === 0 ? "w-1/3" : "w-20")} />
          ))}
        </div>
      ))}
    </div>
  )
}
