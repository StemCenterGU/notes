"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Page, PageHeader, EmptyState, TableSkeleton } from "@/components/page"

const TABS = [
  { value: "active", label: "Active" },
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
]

function formatRange(raffle) {
  const start = raffle.start_time || raffle.startTime
  const end = raffle.end_time || raffle.endTime
  const fmt = (d) =>
    new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric" })
  if (!start || !end) return null
  return `${fmt(start)} – ${fmt(end)}`
}

function RaffleRow({ raffle }) {
  const prizes = raffle.raffle_prizes ?? []
  const entries = raffle._count?.entries ?? 0

  return (
    <Link href={`/raffles/${raffle.id}`} className="group block py-4">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="font-medium text-foreground group-hover:text-primary">{raffle.title}</p>
          {raffle.description && (
            <p className="mt-0.5 max-w-prose truncate text-sm text-muted-foreground">
              {raffle.description}
            </p>
          )}
          {prizes.length > 0 && (
            <p className="mt-1.5 text-xs text-muted-foreground">
              {prizes.slice(0, 3).map((p) => p.name).join(" · ")}
              {prizes.length > 3 && ` +${prizes.length - 3}`}
            </p>
          )}
        </div>

        <div className="shrink-0 text-right">
          <p className="tabular text-sm text-foreground">{entries}</p>
          <p className="text-xs text-muted-foreground">
            {entries === 1 ? "entry" : "entries"}
          </p>
          {formatRange(raffle) && (
            <p className="tabular mt-1.5 text-xs text-muted-foreground/70">
              {formatRange(raffle)}
            </p>
          )}
        </div>
      </div>
      <span className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground">
        View prizes & entries
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}

export default function RafflesPage() {
  const [raffles, setRaffles] = useState({ active: [], upcoming: [], past: [] })
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState("active")

  useEffect(() => {
    const fetchRaffles = async (status) => {
      const res = await fetch(`/api/raffles?status=${status}`)
      const data = await res.json()
      return data.raffles || []
    }

    const loadAll = async () => {
      setLoading(true)
      const [active, upcoming, past] = await Promise.all([
        fetchRaffles("active"),
        fetchRaffles("upcoming"),
        fetchRaffles("past"),
      ])
      setRaffles({ active, upcoming, past })
      setLoading(false)
    }

    loadAll()
  }, [])

  const list = raffles[tab]

  return (
    <Page>
      <PageHeader
        eyebrow="Rewards"
        title="Raffles"
        description="Upload a verified note to earn an entry."
      />

      <div className="mt-7 flex items-center gap-6 border-b border-border">
        {TABS.map((t) => {
          const active = tab === t.value
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => setTab(t.value)}
              className={cn(
                "-mb-px border-b-2 pb-2.5 text-sm transition-colors",
                active
                  ? "border-foreground font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
              {!loading && (
                <span className="tabular ml-1.5 text-xs text-muted-foreground">
                  {raffles[t.value].length}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-2">
        {loading ? (
          <TableSkeleton rows={3} cols={2} />
        ) : list.length === 0 ? (
          <EmptyState
            title={`No ${tab} raffles`}
            description={
              tab === "active"
                ? "Nothing is running right now — check the upcoming tab."
                : `Nothing in ${tab} raffles yet.`
            }
          />
        ) : (
          <div className="divide-y divide-border border-t border-border">
            {list.map((raffle) => (
              <RaffleRow key={raffle.id} raffle={raffle} />
            ))}
          </div>
        )}
      </div>
    </Page>
  )
}
