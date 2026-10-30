"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"
import { PageHeader, Section } from "@/components/page"

function Figure({ label, value, href, loading }) {
  const body = (
    <>
      {loading ? (
        <Skeleton className="h-8 w-10" />
      ) : (
        <p className="font-display tabular text-[28px] text-foreground">{value}</p>
      )}
      <p className="mt-0.5 text-[13px] text-muted-foreground">{label}</p>
    </>
  )

  if (!href) return <div>{body}</div>
  return (
    <Link href={href} className="group block">
      {body}
    </Link>
  )
}

export default function LeadTutorOverview() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [notesRes, tutorsRes] = await Promise.all([
          fetch("/api/lead-tutor/notes"),
          fetch("/api/lead-tutor/tutor-activity"),
        ])
        const notesData = notesRes.ok ? await notesRes.json() : { notes: [] }
        const tutorsData = tutorsRes.ok ? await tutorsRes.json() : { tutors: [] }
        const notes = notesData.notes || []
        const tutors = tutorsData.tutors || []

        setStats({
          pendingReviews: notes.filter((n) => n.status === "UNREVIEWED").length,
          totalNotes: notes.length,
          activeTutors: tutors.length,
          publicNotes: notes.filter((n) => n.isPublic).length,
        })
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      }
      setLoading(false)
    }
    fetchStats()
  }, [])

  const pending = stats?.pendingReviews ?? 0

  return (
    <>
      <PageHeader
        eyebrow="Review"
        title="Overview"
        description="Where the note queue stands right now."
      />

      <div className="mt-7 flex flex-wrap gap-x-12 gap-y-6">
        <Figure
          label="Awaiting review"
          value={stats?.pendingReviews ?? "—"}
          href="/lead-tutor/notes"
          loading={loading}
        />
        <Figure label="Total notes" value={stats?.totalNotes ?? "—"} href="/lead-tutor/notes" loading={loading} />
        <Figure label="Visible to students" value={stats?.publicNotes ?? "—"} loading={loading} />
        <Figure label="Active tutors" value={stats?.activeTutors ?? "—"} href="/lead-tutor/tutors" loading={loading} />
      </div>

      {!loading && pending > 0 && (
        <Section title="Next up">
          <Link
            href="/lead-tutor/notes"
            className="group flex items-center justify-between py-3 text-sm"
          >
            <span className="text-foreground">
              <span className="tabular font-medium">{pending}</span>{" "}
              {pending === 1 ? "note is" : "notes are"} waiting on a review decision.
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Section>
      )}
    </>
  )
}
