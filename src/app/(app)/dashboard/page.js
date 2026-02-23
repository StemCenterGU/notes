'use client'
import React, { useState, useEffect, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NotesGrid from "@/components/Dashboard/notes-grid"
import UploadSection from "@/components/Dashboard/upload-section"
import EditNoteModal from "@/components/Dashboard/EditNoteModal"
import RaffleHighlightCard from "@/components/Dashboard/RaffleHighlightCard"
import Link from "next/link"
import { Award, FileText, Lock, Loader2, Trash2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const NotesGridSkeleton = () => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
    {[...Array(8)].map((_, i) => (
      <Card key={i} className="overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-3 w-3/5" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)

export default function Dashboard() {
  const [notes, setNotes] = useState([])
  const [user, setUser] = useState(null)
  const [editingNote, setEditingNote] = useState(null)
  const [academics, setAcademics] = useState({ courses: [], semesters: [] })
  const [loading, setLoading] = useState(true)
  const [pendingDeleteId, setPendingDeleteId] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState(null)

  const fetchAcademics = useCallback(async () => {
    const res = await fetch("/api/academics")
    if (res.ok) {
      setAcademics(await res.json())
    }
  }, [])

  const fetchNotes = useCallback(async () => {
    try {
      const res = await fetch("/api/notes/mine")
      if (res.ok) {
        const data = await res.json()
        setNotes(data.notes || [])
      } else {
        const errorData = await res.json()
        if (errorData.error !== 'User not found') {
          console.error("Failed to fetch notes:", errorData)
        }
      }
    } catch (err) {
      console.error("Error fetching user notes:", err)
    }
  }, [])

  useEffect(() => {
    const initializeUserAndFetchData = async () => {
      setLoading(true)
      const userRes = await fetch('/api/init-user');
      if (userRes.ok) {
        const { user } = await userRes.json();
        setUser(user);
      }
      await Promise.all([fetchNotes(), fetchAcademics()])
      setLoading(false)
    }
    initializeUserAndFetchData()
  }, [fetchNotes, fetchAcademics])

  const handleNoteUploaded = useCallback(() => {
    fetchNotes()
    setUser(prev => prev ? { ...prev, kudosPoints: prev.kudosPoints + 10 } : null)
  }, [fetchNotes])

  const handleDeleteNote = (noteId) => {
    setPendingDeleteId(noteId)
  }

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return
    setIsDeleting(true)
    setDeleteError(null)
    const res = await fetch(`/api/notes/${pendingDeleteId}`, { method: 'DELETE' })
    setIsDeleting(false)
    if (res.ok) {
      fetchNotes()
      setPendingDeleteId(null)
    } else {
      setPendingDeleteId(null)
      setDeleteError("Failed to delete the note. Please try again.")
    }
  }

  const handleCancelDelete = () => {
    setPendingDeleteId(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">

        {/* Welcome banner */}
        <Card className="mb-8 overflow-hidden border-border/50">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Welcome back{user?.name ? `, ${user.name}` : ""}
                </h1>
                <p className="text-muted-foreground mt-1 text-sm">
                  Manage your notes, track uploads, and earn rewards for contributing.
                </p>
              </div>
              {user && (
                <Badge
                  variant="secondary"
                  className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium"
                >
                  <Award className="h-4 w-4 text-amber-500" />
                  {user.kudosPoints} Kudos Points
                </Badge>
              )}
            </div>
          </div>
        </Card>

        <Tabs defaultValue="my-notes" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="my-notes" className="flex items-center gap-2">
              My Notes
              {!loading && notes.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 h-5 min-w-5 px-1.5 text-xs font-semibold leading-none"
                >
                  {notes.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="upload">Upload Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="my-notes">
            {deleteError && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive mb-4">
                {deleteError}
              </div>
            )}
            {loading ? (
              <NotesGridSkeleton />
            ) : (
              <NotesGrid
                notes={notes}
                currentUserId={user?.id}
                onEdit={setEditingNote}
                onDelete={handleDeleteNote}
              />
            )}
          </TabsContent>

          <TabsContent value="upload">
            {/* Upload CTA — full width at the top */}
            <div className="mb-6">
              <UploadSection onNoteUploaded={handleNoteUploaded} />
            </div>

            {/* Supporting cards in a 3-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <RaffleHighlightCard />

              {/* STEM Tutoring Resources card */}
              <Card className="transition-all hover:shadow-md hover:-translate-y-0.5">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <FileText className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-medium">STEM Tutoring Resources</CardTitle>
                      <CardDescription>Access study materials</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Browse resources from tutors and other students
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/explore">Browse Resources</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Enter Access Code card — students only */}
              {user?.role === 'STUDENT' && (
                <Card className="transition-all hover:shadow-md hover:-translate-y-0.5">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-secondary/10 p-2 rounded-full">
                        <Lock className="text-secondary w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-medium">Enter Access Code</CardTitle>
                        <CardDescription>View notes with code</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Got a code from your tutor? Enter it here to access secure notes.
                    </p>
                    <Button asChild className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                      <Link href="/access">Enter Code</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {editingNote && (
        <EditNoteModal
          note={editingNote}
          academics={academics}
          isOpen={!!editingNote}
          onClose={() => setEditingNote(null)}
          onNoteUpdated={fetchNotes}
        />
      )}

      {/* Delete confirmation dialog */}
      <Dialog open={!!pendingDeleteId} onOpenChange={(open) => { if (!open) handleCancelDelete() }}>
        <DialogContent>
          <DialogHeader>
            <div className="flex flex-col items-center gap-3 mb-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <Trash2 className="h-6 w-6 text-destructive" />
              </div>
            </div>
            <DialogTitle className="text-center">Delete Note</DialogTitle>
            <DialogDescription className="text-center text-sm text-muted-foreground">
              Are you sure you want to delete this note? This action is permanent and cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-2">
            <Button variant="outline" onClick={handleCancelDelete} disabled={isDeleting}>
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
