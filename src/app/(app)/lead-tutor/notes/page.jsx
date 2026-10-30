"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Search, Tags, Loader2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import TagSelector from "@/components/TagSelector"
import { noteStatus } from "@/lib/status-styles"
import { cn } from "@/lib/utils"
import {
  PageHeader,
  DataTable,
  Td,
  EmptyState,
  TableSkeleton,
} from "@/components/page"

const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "UNREVIEWED", label: "In review" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
]

const COLUMNS = [
  { key: "title", label: "Note" },
  { key: "uploader", label: "Uploader", className: "hidden lg:table-cell" },
  { key: "tags", label: "Tags", className: "hidden xl:table-cell" },
  { key: "public", label: "Public", className: "hidden sm:table-cell" },
  { key: "status", label: "Status", align: "right" },
]

export default function NotesManagementPage() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [updatingId, setUpdatingId] = useState(null)
  const [nextCursor, setNextCursor] = useState(null)
  const [hasMore, setHasMore] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [counts, setCounts] = useState({ all: 0 })

  // Tag editing state
  const [tagEditDialogOpen, setTagEditDialogOpen] = useState(false)
  const [allTags, setAllTags] = useState({ RESOURCE_TYPE: [], STUDY_CYCLE: [], GENERAL: [] })
  const [selectedTagIds, setSelectedTagIds] = useState(new Set())
  const [editingNoteId, setEditingNoteId] = useState(null)
  const [savingTags, setSavingTags] = useState(false)
  const [tagEditError, setTagEditError] = useState("")

  // Status filter and search run on the server; counts come from the DB.
  const buildQuery = useCallback(
    (cursor) => {
      const p = new URLSearchParams()
      if (searchQuery.trim()) p.set("q", searchQuery.trim())
      if (statusFilter !== "all") p.set("status", statusFilter)
      if (cursor) p.set("cursor", cursor)
      return p.toString()
    },
    [searchQuery, statusFilter]
  )

  const fetchNotes = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/lead-tutor/notes?${buildQuery(null)}`)
      if (res.ok) {
        const data = await res.json()
        setNotes(data.notes || [])
        setNextCursor(data.nextCursor ?? null)
        setHasMore(Boolean(data.hasMore))
        if (data.counts) setCounts(data.counts)
      }
    } catch (err) {
      console.error("Failed to fetch notes:", err)
    }
    setLoading(false)
  }, [buildQuery])

  const loadMore = useCallback(async () => {
    if (!nextCursor || loadingMore) return
    setLoadingMore(true)
    try {
      const res = await fetch(`/api/lead-tutor/notes?${buildQuery(nextCursor)}`)
      if (res.ok) {
        const data = await res.json()
        setNotes((prev) => [...prev, ...(data.notes || [])])
        setNextCursor(data.nextCursor ?? null)
        setHasMore(Boolean(data.hasMore))
      }
    } finally {
      setLoadingMore(false)
    }
  }, [nextCursor, loadingMore, buildQuery])

  useEffect(() => {
    const handle = setTimeout(fetchNotes, 250)
    return () => clearTimeout(handle)
  }, [fetchNotes])

  const handleStatusChange = async (noteId, newStatus) => {
    setUpdatingId(noteId)
    setError(null)
    try {
      const res = await fetch(`/api/notes/${noteId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setNotes((prev) =>
          prev.map((n) =>
            n.id === noteId
              ? { ...n, status: newStatus, isPublic: newStatus !== "APPROVED" ? false : n.isPublic }
              : n
          )
        )
      } else {
        const data = await res.json()
        setError(data.error || "Failed to update status")
      }
    } catch {
      setError("Failed to update status")
    }
    setUpdatingId(null)
  }

  const handlePublicToggle = async (noteId, isPublic) => {
    setUpdatingId(noteId)
    setError(null)
    try {
      const res = await fetch(`/api/notes/${noteId}/public`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublic }),
      })
      if (res.ok) {
        setNotes((prev) =>
          prev.map((n) => (n.id === noteId ? { ...n, isPublic } : n))
        )
      } else {
        const data = await res.json()
        setError(data.error || "Failed to update public status")
      }
    } catch {
      setError("Failed to update public status")
    }
    setUpdatingId(null)
  }

  // Fetch all tags on component mount
  useEffect(() => {
    const fetchTags = async () => {
      const res = await fetch('/api/tags')
      if (res.ok) {
        const data = await res.json()
        setAllTags(data)
      }
    }
    fetchTags()
  }, [])

  const handleEditTags = (note) => {
    setEditingNoteId(note.id)
    const tagIds = new Set(note.noteTags?.map(nt => nt.tag.id) || [])
    setSelectedTagIds(tagIds)
    setTagEditError("")
    setTagEditDialogOpen(true)
  }

  const toggleTag = (tagId) => {
    setSelectedTagIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(tagId)) {
        newSet.delete(tagId)
      } else {
        newSet.add(tagId)
      }
      return newSet
    })
  }

  const handleSaveTags = async () => {
    if (!editingNoteId) return

    setSavingTags(true)
    setTagEditError("")

    try {
      const res = await fetch(`/api/notes/${editingNoteId}/tags`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tagIds: Array.from(selectedTagIds) })
      })

      if (res.ok) {
        const { note: updatedNote } = await res.json()
        // Update the note in the list
        setNotes(prev =>
          prev.map(n => n.id === editingNoteId ? updatedNote : n)
        )
        setTagEditDialogOpen(false)
        setEditingNoteId(null)
      } else {
        const { error } = await res.json()
        setTagEditError(error || 'Failed to update tags')
      }
    } catch (error) {
      setTagEditError('Failed to update tags')
    } finally {
      setSavingTags(false)
    }
  }



  return (
    <>
      <PageHeader
        eyebrow="Administration"
        title="All notes"
        description="Every note on the platform. Set review status and control what students can see."
      />

      {error && (
        <div className="mt-5 rounded-md border border-destructive/25 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Status tabs double as the counts summary. */}
      <div className="mt-7 flex flex-wrap items-center gap-6 border-b border-border">
        {STATUS_TABS.map((tab) => {
          const count = tab.value === "all" ? counts.all || 0 : counts[tab.value] || 0
          const active = statusFilter === tab.value
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setStatusFilter(tab.value)}
              className={cn(
                "-mb-px border-b-2 pb-2.5 text-sm transition-colors",
                active
                  ? "border-foreground font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              <span className="tabular ml-1.5 text-xs text-muted-foreground">{count}</span>
            </button>
          )
        })}
      </div>

      <div className="relative mt-5 max-w-xs">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-8 pl-8 text-sm"
        />
      </div>

      <div className="mt-5">
        {loading ? (
          <TableSkeleton rows={8} cols={5} />
        ) : notes.length === 0 ? (
          <EmptyState
            title="No notes here"
            description={
              searchQuery || statusFilter !== "all"
                ? "Nothing matches the current filter."
                : "No notes have been uploaded yet."
            }
          />
        ) : (
          <DataTable columns={COLUMNS}>
            {notes.map((note) => {
              const status = noteStatus(note.status)
              return (
                <tr key={note.id}>
                  <Td>
                    <Link
                      href={`/view/${note.id}`}
                      className="font-medium text-foreground hover:text-primary"
                    >
                      {note.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {[note.course?.code, note.uploader?.name]
                        .filter(Boolean)
                        .join(" · ")}
                      {" · "}
                      {new Date(note.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </Td>

                  <Td className="hidden lg:table-cell">
                    <span className="text-muted-foreground">
                      {note.uploader?.name || "Unknown"}
                    </span>
                  </Td>

                  <Td className="hidden xl:table-cell">
                    <div className="flex items-center gap-1.5">
                      {note.noteTags?.length > 0 ? (
                        <>
                          {note.noteTags.slice(0, 2).map((nt) => (
                            <Badge
                              key={nt.tag.id}
                              variant="outline"
                              className="border-border bg-muted text-[11px] font-normal text-muted-foreground"
                            >
                              {nt.tag.name}
                            </Badge>
                          ))}
                          {note.noteTags.length > 2 && (
                            <span className="text-xs text-muted-foreground">
                              +{note.noteTags.length - 2}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-xs text-muted-foreground/60">None</span>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditTags(note)}
                        className="h-6 w-6 text-muted-foreground"
                      >
                        <Tags className="h-3.5 w-3.5" />
                        <span className="sr-only">Edit tags</span>
                      </Button>
                    </div>
                  </Td>

                  <Td className="hidden sm:table-cell">
                    {note.status === "APPROVED" ? (
                      <Switch
                        checked={note.isPublic}
                        onCheckedChange={(checked) => handlePublicToggle(note.id, checked)}
                        disabled={updatingId === note.id}
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground/60">—</span>
                    )}
                  </Td>

                  <Td align="right">
                    <div className="flex items-center justify-end gap-2">
                      <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
                      <Select
                        value={note.status}
                        onValueChange={(val) => handleStatusChange(note.id, val)}
                        disabled={updatingId === note.id}
                      >
                        <SelectTrigger className="h-8 w-[140px] text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UNREVIEWED">In review</SelectItem>
                          <SelectItem value="APPROVED">Approved</SelectItem>
                          <SelectItem value="REJECTED">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </Td>
                </tr>
              )
            })}
          </DataTable>
        )}

        {hasMore && !loading && (
          <div className="mt-6 flex justify-center">
            <Button variant="outline" size="sm" onClick={loadMore} disabled={loadingMore}>
              {loadingMore ? "Loading…" : "Load more"}
            </Button>
          </div>
        )}
      </div>

      <Dialog open={tagEditDialogOpen} onOpenChange={setTagEditDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit tags</DialogTitle>
            <DialogDescription>
              Tags help students find this note when browsing.
            </DialogDescription>
          </DialogHeader>

          <TagSelector tags={allTags} selectedTagIds={selectedTagIds} onTagToggle={toggleTag} />

          {tagEditError && (
            <div className="rounded-md border border-destructive/25 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {tagEditError}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setTagEditDialogOpen(false)}
              disabled={savingTags}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveTags} disabled={savingTags}>
              {savingTags && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save tags
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
