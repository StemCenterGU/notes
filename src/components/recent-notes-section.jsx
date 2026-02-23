"use client"
import { useState, useEffect } from "react"
import RecentNoteCard from "./RecentNoteCard"
import { Skeleton } from "@/components/ui/skeleton"

export function RecentNotesSection() {
  const [recentNotes, setRecentNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentNotes = async () => {
      try {
        const res = await fetch("/api/notes/recent")
        const data = await res.json()
        if (res.ok) {
          setRecentNotes(data.notes || [])
        }
      } catch (error) {
        console.error("Failed to fetch recent notes:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchRecentNotes()
  }, [])

  return (
    <section className="py-20 px-4 bg-card">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          Latest Uploads
        </h2>
        <p className="text-muted-foreground text-center mb-12">
          Check out the latest study materials shared by your peers.
        </p>
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3 p-4 rounded-lg border border-border">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-9 w-full mt-2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {recentNotes.map((note) => (
              <RecentNoteCard key={note.id} note={note} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
