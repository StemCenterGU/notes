'use client'
import React, { Suspense, useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowRight, Compass, KeyRound, Loader2, Trash2 } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NotesList from "@/components/Dashboard/notes-list"
import UploadSection from "@/components/Dashboard/upload-section"
import EditNoteModal from "@/components/Dashboard/EditNoteModal"
import RaffleHighlightCard from "@/components/Dashboard/RaffleHighlightCard"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function greeting(date = new Date()) {
  const h = date.getHours()
  if (h < 12) return "Good morning"
  if (h < 18) return "Good afternoon"
  return "Good evening"
}

/** A single figure. No container — whitespace separates these, not borders. */
function Stat({ label, value, loading }) {
  return (
    <div>
      {loading ? (
        <Skeleton className="h-7 w-8" />
      ) : (
        <p className="font-display tabular text-[28px] text-foreground">{value}</p>
      )}
      <p className="mt-0.5 text-[13px] text-muted-foreground">{label}</p>
    </div>
  )
}

function QuickLink({ href, icon: Icon, title }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{title}</span>
      <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-60" />
    </Link>
  )
}

function DashboardContent() {
  const [notes, setNotes] = useState([])
  const [user, setUser] = useState(null)
  const [editingNote, setEditingNote] = useState(null)
  const [academics, setAcademics] = useState({ courses: [], semesters: [] })
  const [activeRaffle, setActiveRaffle] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const [tab, setTab] = useState(searchParams.get("tab") === "upload" ? "upload" : "notes")
  const [pendingDeleteId, setPendingDeleteId] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState(null)

  // Everything below comes from one request. Re-fetching after a mutation
  // re-reads the whole bundle, which is still a single round-trip.
  const loadAll = useCallback(async () => {
    try {
      const res = await fetch("/api/bootstrap")
      if (!res.ok) {
        console.error("Bootstrap failed:", await res.text())
        return
      }
      const data = await res.json()
      setUser(data.user)
      setNotes(data.notes || [])
      setAcademics(data.academics || { courses: [], semesters: [] })
      setActiveRaffle(data.activeRaffle ?? null)
    } catch (err) {
      console.error("Error loading dashboard:", err)
    }
  }, [])

  const fetchNotes = loadAll

  // Keep the tab in step with the sidebar's "Upload notes" action.
  useEffect(() => {
    setTab(searchParams.get("tab") === "upload" ? "upload" : "notes")
  }, [searchParams])

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      await loadAll()
      setLoading(false)
    }
    init()
  }, [loadAll])

  const stats = useMemo(
    () => ({
      total: notes.length,
      verified: notes.filter((n) => n.isVerified).length,
      inReview: notes.filter((n) => n.status === "UNREVIEWED").length,
    }),
    [notes]
  )

  const handleNoteUploaded = useCallback(() => {
    loadAll()
    setUser((prev) => (prev ? { ...prev, kudosPoints: prev.kudosPoints + 10 } : null))
    setTab("notes")
  }, [loadAll])

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return
    setIsDeleting(true)
    setDeleteError(null)
    const res = await fetch(`/api/notes/${pendingDeleteId}`, { method: "DELETE" })
    setIsDeleting(false)
    setPendingDeleteId(null)
    if (res.ok) {
      loadAll()
    } else {
      setDeleteError("Failed to delete the note. Please try again.")
    }
  }

  const firstName = user?.name?.split(" ")[0]

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
      {/* ---------------- Header ---------------- */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="font-display mt-1.5 text-4xl text-foreground">
            {greeting()}
            {firstName ? `, ${firstName}` : ""}
          </h1>
        </div>

        {user && (
          <p className="text-sm text-muted-foreground">
            <span className="tabular font-medium text-foreground">{user.kudosPoints}</span> kudos
          </p>
        )}
      </header>

      {/* ---------------- Stat strip ---------------- */}
      <div className="mt-7 flex gap-12">
        <Stat label="Uploaded" value={stats.total} loading={loading} />
        <Stat label="Verified" value={stats.verified} loading={loading} />
        <Stat label="In review" value={stats.inReview} loading={loading} />
      </div>

      {/* ---------------- Body ---------------- */}
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <section className="min-w-0">
          <Tabs value={tab} onValueChange={setTab}>
            {/* Understated underline tabs — chrome should not outshout content. */}
            <TabsList className="h-auto w-full justify-start gap-6 rounded-none border-b border-border bg-transparent p-0">
              <TabsTrigger
                value="notes"
                className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-2.5 pt-0 text-sm font-medium text-muted-foreground shadow-none data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Your notes
                {!loading && notes.length > 0 && (
                  <span className="tabular ml-2 text-xs text-muted-foreground">{notes.length}</span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="upload"
                className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-2.5 pt-0 text-sm font-medium text-muted-foreground shadow-none data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Upload
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notes" className="mt-6">
              {deleteError && (
                <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {deleteError}
                </div>
              )}

              {loading ? (
                <div className="divide-y divide-border border-t border-border">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 py-3.5">
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-3.5 w-1/2" />
                        <Skeleton className="h-3 w-1/4" />
                      </div>
                      <Skeleton className="h-3 w-20 shrink-0" />
                    </div>
                  ))}
                </div>
              ) : (
                <NotesList
                  notes={notes}
                  onEdit={setEditingNote}
                  onDelete={setPendingDeleteId}
                  onUploadClick={() => setTab("upload")}
                />
              )}
            </TabsContent>

            <TabsContent value="upload" className="mt-6">
              <UploadSection onNoteUploaded={handleNoteUploaded} />
            </TabsContent>
          </Tabs>
        </section>

        {/* ---------------- Right rail ---------------- */}
        <aside className="space-y-8 lg:pt-[42px]">
          <section>
            <h2 className="mb-3 border-b border-border pb-2 text-[13px] font-medium text-foreground">
              Active raffle
            </h2>
            <RaffleHighlightCard raffle={activeRaffle} />
          </section>

          <section>
            <h2 className="mb-2 border-b border-border pb-2 text-[13px] font-medium text-foreground">
              Shortcuts
            </h2>
            <QuickLink href="/explore" icon={Compass} title="Explore notes" />
            {user?.role === "STUDENT" && (
              <QuickLink href="/access" icon={KeyRound} title="Enter access code" />
            )}
          </section>
        </aside>
      </div>

      {editingNote && (
        <EditNoteModal
          note={editingNote}
          academics={academics}
          isOpen={!!editingNote}
          onClose={() => setEditingNote(null)}
          onNoteUpdated={loadAll}
        />
      )}

      <Dialog
        open={!!pendingDeleteId}
        onOpenChange={(open) => {
          if (!open) setPendingDeleteId(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <div className="mb-1 flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <Trash2 className="h-6 w-6 text-destructive" />
              </div>
            </div>
            <DialogTitle className="text-center">Delete note</DialogTitle>
            <DialogDescription className="text-center text-sm text-muted-foreground">
              This permanently removes the note and its file. It cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-2">
            <Button variant="outline" onClick={() => setPendingDeleteId(null)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete} disabled={isDeleting}>
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

/** Skeleton shown while the search params resolve on first paint. */
function DashboardFallback() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
      <Skeleton className="h-3 w-40" />
      <Skeleton className="mt-3 h-9 w-72" />
      <div className="mt-7 flex gap-12">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-7 w-8" />
            <Skeleton className="mt-1.5 h-3 w-16" />
          </div>
        ))}
      </div>
      <div className="mt-10 divide-y divide-border border-t border-border">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="py-3.5">
            <Skeleton className="h-3.5 w-1/3" />
            <Skeleton className="mt-2 h-3 w-1/5" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <Suspense fallback={<DashboardFallback />}>
      <DashboardContent />
    </Suspense>
  )
}
