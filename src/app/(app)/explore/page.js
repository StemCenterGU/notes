"use client"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, Star, X } from "lucide-react"

import { useUser } from "@/contexts/AuthContext"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import VerifiedBadge from "@/components/VerifiedBadge"
import { noteStatus } from "@/lib/status-styles"
import { cn } from "@/lib/utils"
import {
  Page,
  PageHeader,
  DataTable,
  Td,
  EmptyState,
  TableSkeleton,
} from "@/components/page"

function FilterMenu({ title, options, selected, onChange }) {
  const active = selected.length > 0
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("h-8 font-normal", active && "border-foreground/30")}
        >
          {title}
          {active && (
            <span className="tabular ml-1.5 text-xs text-muted-foreground">{selected.length}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-80 w-60 overflow-y-auto">
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
          {title}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.length === 0 ? (
          <p className="px-2 py-3 text-xs text-muted-foreground">Nothing to filter by yet.</p>
        ) : (
          options.map((option) => (
            <DropdownMenuCheckboxItem
              key={option}
              checked={selected.includes(option)}
              onCheckedChange={() =>
                onChange(
                  selected.includes(option)
                    ? selected.filter((v) => v !== option)
                    : [...selected, option]
                )
              }
            >
              {option}
            </DropdownMenuCheckboxItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const COLUMNS = [
  { key: "note", label: "Note" },
  { key: "course", label: "Course", className: "hidden md:table-cell" },
  { key: "uploader", label: "Shared by", className: "hidden lg:table-cell" },
  { key: "status", label: "Status", className: "hidden sm:table-cell" },
  { key: "rating", label: "Rating", align: "right" },
]

export default function ExplorePage() {
  const { role } = useUser()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [notes, setNotes] = useState([])
  const [nextCursor, setNextCursor] = useState(null)
  const [hasMore, setHasMore] = useState(false)
  const [filterOptions, setFilterOptions] = useState({
    courses: [],
    professors: [],
    semesters: [],
  })
  const [activeFilters, setActiveFilters] = useState({
    course: [],
    semester: [],
    professor: [],
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  const isStudent = role === "STUDENT"

  /** Builds the query string the server filters on. */
  const buildQuery = useCallback(
    (cursor) => {
      const p = new URLSearchParams()
      if (searchQuery.trim()) p.set("q", searchQuery.trim())
      activeFilters.course.forEach((v) => p.append("course", v))
      activeFilters.professor.forEach((v) => p.append("professor", v))
      activeFilters.semester.forEach((v) => p.append("semester", v))
      if (verifiedOnly) p.set("verified", "1")
      if (cursor) p.set("cursor", cursor)
      return p.toString()
    },
    [searchQuery, activeFilters, verifiedOnly]
  )

  // Filters and search run on the server. Debounced so typing does not fire
  // a request per keystroke.
  useEffect(() => {
    let cancelled = false
    const handle = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/notes/explore?${buildQuery(null)}`)
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) router.replace("/dashboard")
          return
        }
        const data = await res.json()
        if (cancelled) return
        setNotes(data.notes || [])
        setNextCursor(data.nextCursor ?? null)
        setHasMore(Boolean(data.hasMore))
        if (data.filterOptions) setFilterOptions(data.filterOptions)
      } catch (err) {
        console.error("Fetch error:", err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }, 250)

    return () => {
      cancelled = true
      clearTimeout(handle)
    }
  }, [buildQuery, router])

  const loadMore = useCallback(async () => {
    if (!nextCursor || loadingMore) return
    setLoadingMore(true)
    try {
      const res = await fetch(`/api/notes/explore?${buildQuery(nextCursor)}`)
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

  const hasActiveFilters =
    activeFilters.course.length > 0 ||
    activeFilters.semester.length > 0 ||
    activeFilters.professor.length > 0 ||
    searchQuery.length > 0 ||
    verifiedOnly

  const clearFilters = () => {
    setSearchQuery("")
    setActiveFilters({ course: [], semester: [], professor: [] })
    setVerifiedOnly(false)
  }

  return (
    <Page wide>
      <PageHeader
        eyebrow="Library"
        title="Explore notes"
        description={
          isStudent
            ? "Approved notes shared publicly by the community."
            : "Every note shared across the platform."
        }
      />

      {/* Filters sit on one line with the search — no container around them. */}
      <div className="mt-7 flex flex-wrap items-center gap-2">
        <div className="relative min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by title or course code"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 pl-8 text-sm"
          />
        </div>

        <FilterMenu
          title="Course"
          options={filterOptions.courses}
          selected={activeFilters.course}
          onChange={(v) => setActiveFilters((p) => ({ ...p, course: v }))}
        />
        <FilterMenu
          title="Professor"
          options={filterOptions.professors}
          selected={activeFilters.professor}
          onChange={(v) => setActiveFilters((p) => ({ ...p, professor: v }))}
        />
        <FilterMenu
          title="Semester"
          options={filterOptions.semesters}
          selected={activeFilters.semester}
          onChange={(v) => setActiveFilters((p) => ({ ...p, semester: v }))}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => setVerifiedOnly((v) => !v)}
          aria-pressed={verifiedOnly}
          className={cn("h-8 font-normal", verifiedOnly && "border-foreground/30 bg-accent")}
        >
          Verified only
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 px-2 font-normal text-muted-foreground"
          >
            <X className="mr-1 h-3.5 w-3.5" />
            Clear
          </Button>
        )}
      </div>

      <p className="tabular mt-5 text-xs text-muted-foreground">
        {loading
          ? "Loading…"
          : `${notes.length}${hasMore ? "+" : ""} note${notes.length === 1 ? "" : "s"}`}
      </p>

      <div className="mt-2">
        {loading ? (
          <TableSkeleton rows={6} cols={4} />
        ) : notes.length === 0 ? (
          <EmptyState
            title={hasActiveFilters ? "No matching notes" : "Nothing shared yet"}
            description={
              hasActiveFilters
                ? "No notes match the current filters."
                : "When students share notes, they will appear here."
            }
            action={
              hasActiveFilters ? (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear filters
                </Button>
              ) : null
            }
          />
        ) : (
          <DataTable columns={COLUMNS}>
            {notes.map((note) => {
              const status = noteStatus(note.status)
              const rating = Number(note.averageRating) || 0
              return (
                <tr key={note.id} className="group">
                  <Td>
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/view/${note.id}`}
                        className="truncate font-medium text-foreground hover:text-primary"
                      >
                        {note.title}
                      </Link>
                      {note.isVerified && <VerifiedBadge size="small" compact />}
                    </div>
                    {note.semester && (
                      <p className="mt-0.5 text-xs text-muted-foreground md:hidden">
                        {note.course?.code} · {note.semester.name} {note.semester.year}
                      </p>
                    )}
                  </Td>
                  <Td className="hidden md:table-cell">
                    <span className="text-muted-foreground">{note.course?.code || "—"}</span>
                    {note.semester && (
                      <span className="ml-1.5 text-xs text-muted-foreground/70">
                        {note.semester.name} {note.semester.year}
                      </span>
                    )}
                  </Td>
                  <Td className="hidden lg:table-cell">
                    <span className="text-muted-foreground">{note.uploader?.name || "—"}</span>
                  </Td>
                  <Td className="hidden sm:table-cell">
                    <span className="inline-flex items-center gap-1.5">
                      <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
                      <span className="text-xs text-muted-foreground">{status.label}</span>
                    </span>
                  </Td>
                  <Td align="right">
                    {rating > 0 ? (
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3 w-3 fill-warning text-warning" />
                        <span className="tabular text-xs text-muted-foreground">
                          {rating.toFixed(1)}
                        </span>
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground/50">—</span>
                    )}
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
    </Page>
  )
}
