"use client"

import { useState, useEffect, useCallback } from "react"
import { FileText, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"

const statusConfig = {
  UNREVIEWED: { label: "Unreviewed", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800" },
  APPROVED: { label: "Approved", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800" },
  REJECTED: { label: "Rejected", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800" },
}

export default function NotesManagementPage() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [updatingId, setUpdatingId] = useState(null)

  const fetchNotes = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/lead-tutor/notes")
      if (res.ok) {
        const data = await res.json()
        setNotes(data.notes || [])
      }
    } catch (err) {
      console.error("Failed to fetch notes:", err)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchNotes()
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

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      !searchQuery ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || note.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Skeleton className="h-10 flex-grow" />
            <Skeleton className="h-10 w-[180px]" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Uploader</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Public</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-36" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-10" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-[140px] ml-auto" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Notes Management</CardTitle>
            <CardDescription>{notes.length} total note{notes.length !== 1 ? "s" : ""}</CardDescription>
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive mt-4">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="UNREVIEWED">Unreviewed</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {searchQuery || statusFilter !== "all"
                ? "No notes match your filters."
                : "No notes found."}
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Uploader</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Public</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotes.map((note) => (
                <TableRow key={note.id}>
                  <TableCell>
                    <Link
                      href={`/view/${note.id}`}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {note.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {note.uploader?.name || "Unknown"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {note.course?.name || "N/A"}
                    {note.course?.code && (
                      <span className="text-xs ml-1">({note.course.code})</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusConfig[note.status]?.className || ""}
                    >
                      {statusConfig[note.status]?.label || note.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {note.status === "APPROVED" ? (
                      <Switch
                        checked={note.isPublic}
                        onCheckedChange={(checked) =>
                          handlePublicToggle(note.id, checked)
                        }
                        disabled={updatingId === note.id}
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        N/A
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Select
                      value={note.status}
                      onValueChange={(val) => handleStatusChange(note.id, val)}
                      disabled={updatingId === note.id}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UNREVIEWED">Unreviewed</SelectItem>
                        <SelectItem value="APPROVED">Approved</SelectItem>
                        <SelectItem value="REJECTED">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
