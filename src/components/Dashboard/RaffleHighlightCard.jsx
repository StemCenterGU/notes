"use client"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Compact active-raffle summary for the dashboard rail.
 * Sized to sit beside the notes list, so it stays a single quiet block.
 *
 * `raffle` is always supplied by the parent: undefined while it loads, null
 * when there is none. The card used to fall back to fetching /api/raffles for
 * itself, but `undefined` on the first render looks identical to "no prop",
 * so it fired that request on every dashboard load for data /api/bootstrap
 * was already returning.
 */
export default function RaffleHighlightCard({ raffle }) {
  const loading = raffle === undefined
  const activeRaffle = raffle

  if (loading) {
    return (
      <div>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="mt-2.5 h-3 w-full" />
        <Skeleton className="mt-1.5 h-3 w-1/2" />
      </div>
    )
  }

  if (!activeRaffle) {
    return (
      <div>
        <p className="text-sm text-muted-foreground">No raffle running right now.</p>
        <Link href="/raffles" className="mt-1 inline-block text-sm text-muted-foreground hover:text-foreground">
          See past raffles
        </Link>
      </div>
    )
  }

  const prizes = activeRaffle.raffle_prizes ?? []
  const entries = activeRaffle._count?.entries ?? 0
  const endsAt = activeRaffle.end_time || activeRaffle.endTime

  return (
    <Link href="/raffles" className="group block">
      <p className="text-sm font-medium leading-snug text-foreground group-hover:underline">
        {activeRaffle.title}
      </p>
      <p className="tabular mt-1 text-[13px] text-muted-foreground">
        {entries} {entries === 1 ? "entry" : "entries"}
        {endsAt &&
          ` · ends ${new Date(endsAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })}`}
      </p>

      {prizes.length > 0 && (
        <ul className="mt-2.5 space-y-0.5">
          {prizes.slice(0, 2).map((prize) => (
            <li key={prize.id} className="truncate text-[13px] text-muted-foreground">
              {prize.name}
            </li>
          ))}
          {prizes.length > 2 && (
            <li className="text-[13px] text-muted-foreground/70">+{prizes.length - 2} more</li>
          )}
        </ul>
      )}

      <span className="mt-2.5 inline-flex items-center gap-1 text-[13px] text-muted-foreground group-hover:text-foreground">
        View raffle
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}
