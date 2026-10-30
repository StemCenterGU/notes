import { cn } from "@/lib/utils"

/**
 * A still of the real notes list, shown under the hero.
 *
 * The landing page used to describe the product in four feature cards. Showing
 * one honest screen of it says more and reads as a real tool rather than a
 * template. These rows are deliberately the same shape as the ones the app
 * actually renders -- same columns, same status language -- so the page does
 * not promise an interface that does not exist.
 */
const ROWS = [
  { title: "Organic Chemistry II — Reaction mechanisms", course: "CHEM 242", when: "Oct 28", status: "approved" },
  { title: "Statics — Free body diagrams, worked set", course: "MECH 215", when: "Oct 27", status: "approved" },
  { title: "Anatomy & Physiology — Nervous system", course: "BIOL 134", when: "Oct 27", status: "review" },
  { title: "Calculus II — Integration by parts", course: "MATH 222", when: "Oct 24", status: "approved" },
]

const STATUS = {
  approved: { label: "Tutor approved", dot: "bg-success", text: "text-success" },
  review: { label: "In review", dot: "bg-warning", text: "text-warning" },
}

export function ProductPreview() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      {/* Window bar, kept to a single hairline rather than a stack of chrome. */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
        <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
        <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
        <span className="ml-2 text-xs text-muted-foreground">Fall 2026 · your courses</span>
      </div>

      <div className="divide-y divide-border">
        {ROWS.map((row) => {
          const status = STATUS[row.status]
          return (
            <div key={row.title} className="flex items-center gap-4 px-4 py-3 sm:px-5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{row.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{row.course}</p>
              </div>
              <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
                <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
                <span className={cn("text-xs", status.text)}>{status.label}</span>
              </div>
              <span className="tabular hidden w-12 shrink-0 text-right text-xs text-muted-foreground md:block">
                {row.when}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
