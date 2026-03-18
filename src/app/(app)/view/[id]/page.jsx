"use client"
import { useState, useEffect, useCallback, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import NoteViewer from "@/components/Dashboard/note-viewer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Star,
  CheckCircle,
  XCircle,
  ShieldCheck,
  Globe,
  Loader2,
  FileQuestion,
  Tags,
} from "lucide-react"
import { useUser } from "@/contexts/AuthContext"
import VerifiedBadge from "@/components/VerifiedBadge"
import TagSelector from "@/components/TagSelector"
import { SUPERVISOR_ROLES } from "@/lib/roles"

const TUTOR_LEVEL_ROLES = ["TUTOR", "LEAD_TUTOR", "STEMPASS_TUTOR", "PROFESSOR", "ADMIN"]

const statusConfig = {
  UNREVIEWED: {
    label: "Unreviewed",
    className:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  },
  APPROVED: {
    label: "Approved",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  REJECTED: {
    label: "Rejected",
    className:
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
}

const decisionConfig = {
  APPROVE: {
    label: "Approved",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  REJECT: {
    label: "Rejected",
    className:
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
  COMMENT_ONLY: {
    label: "Comment Only",
    className: "bg-muted text-muted-foreground",
  },
}

const StarRating = ({ rating, setRating, isInteractive = true, size = "default" }) => {
  const sizeClass = size === "small" ? "w-4 h-4" : "w-5 h-5"
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClass} ${isInteractive ? "cursor-pointer" : ""} ${
            rating >= star
              ? "text-secondary fill-secondary"
              : "text-muted-foreground/50"
          }`}
          onClick={() => isInteractive && setRating(star)}
        />
      ))}
    </div>
  )
}

export default function ViewNotePage() {
  const [note, setNote] = useState(null)
  const [reviews, setReviews] = useState([])
  const [tutorReviews, setTutorReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [verifyError, setVerifyError] = useState("")
  const [reviewError, setReviewError] = useState("")

  const [trComment, setTrComment] = useState("")
  const [trRating, setTrRating] = useState(0)
  const [trDecision, setTrDecision] = useState("COMMENT_ONLY")
  const [trSubmitting, setTrSubmitting] = useState(false)
  const [trError, setTrError] = useState("")

  // Tag editing state
  const [tagEditDialogOpen, setTagEditDialogOpen] = useState(false)
  const [allTags, setAllTags] = useState({ RESOURCE_TYPE: [], STUDY_CYCLE: [], GENERAL: [] })
  const [selectedTagIds, setSelectedTagIds] = useState(new Set())
  const [savingTags, setSavingTags] = useState(false)
  const [tagEditError, setTagEditError] = useState("")

  const params = useParams()
  const router = useRouter()
  const { id } = params
  const { role, user } = useUser()

  const canVerify = ["PROFESSOR", "ADMIN"].includes(role)
  const isTutorLevel = useMemo(() => TUTOR_LEVEL_ROLES.includes(role), [role])
  const isSupervisor = useMemo(() => SUPERVISOR_ROLES.includes(role), [role])
  const canDownload = note?.canDownload ?? false

  const fetchNoteAndReviews = useCallback(async () => {
    if (id) {
      setLoading(true)
      const fetches = [
        fetch(`/api/notes/${id}`),
        fetch(`/api/notes/${id}/reviews`),
      ]

      if (isTutorLevel) {
        fetches.push(fetch(`/api/notes/${id}/tutor-review`))
      }

      const results = await Promise.all(fetches)
      const [noteRes, reviewsRes] = results

      if (!noteRes.ok) {
        router.replace("/dashboard")
        return
      }

      const noteData = await noteRes.json()
      const reviewsData = await reviewsRes.json()

      setNote(noteData.note || null)
      setReviews(reviewsData.reviews || [])

      if (isTutorLevel && results[2]) {
        const tutorReviewsData = await results[2].json()
        setTutorReviews(tutorReviewsData.reviews || [])
      }

      setLoading(false)
    }
  }, [id, router, isTutorLevel])

  useEffect(() => {
    fetchNoteAndReviews()
  }, [fetchNoteAndReviews])

  const currentUserTutorReview = tutorReviews.find(
    (tr) => tr.reviewer?.email === user?.email
  )

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    setReviewError("")
    const res = await fetch(`/api/notes/${id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comment }),
    })
    if (res.ok) {
      fetchNoteAndReviews()
      setRating(0)
      setComment("")
    } else {
      const { error } = await res.json()
      setReviewError(error || "Failed to submit review.")
    }
  }

  const handleTutorReviewSubmit = async (e) => {
    e.preventDefault()
    setTrError("")
    if (!trComment.trim() || trRating < 1 || trRating > 5) {
      setTrError(
        "Please fill in all fields (comment, rating 1-5, and decision)."
      )
      return
    }

    setTrSubmitting(true)
    try {
      const res = await fetch(`/api/notes/${id}/tutor-review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment: trComment,
          rating: trRating,
          decision: trDecision,
        }),
      })
      if (res.ok) {
        fetchNoteAndReviews()
        setTrComment("")
        setTrRating(0)
        setTrDecision("COMMENT_ONLY")
      } else {
        const { error } = await res.json()
        setTrError(error || "Failed to submit tutor review.")
      }
    } finally {
      setTrSubmitting(false)
    }
  }

  const handleVerify = async () => {
    setVerifying(true)
    setVerifyError("")
    try {
      const res = await fetch(`/api/notes/${id}/verify`, {
        method: note.isVerified ? "DELETE" : "POST",
      })
      if (res.ok) {
        fetchNoteAndReviews()
      } else {
        const { error } = await res.json()
        setVerifyError(error || "Failed to update verification status.")
      }
    } finally {
      setVerifying(false)
    }
  }

  // Fetch all tags when component mounts (for supervisors)
  useEffect(() => {
    if (isSupervisor) {
      const fetchTags = async () => {
        const res = await fetch('/api/tags')
        if (res.ok) {
          const data = await res.json()
          setAllTags(data)
        }
      }
      fetchTags()
    }
  }, [isSupervisor])

  // Update selectedTagIds when note changes
  useEffect(() => {
    if (note?.noteTags) {
      const tagIds = new Set(note.noteTags.map(nt => nt.tag.id))
      setSelectedTagIds(tagIds)
    }
  }, [note])

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
    setSavingTags(true)
    setTagEditError("")

    try {
      const res = await fetch(`/api/notes/${id}/tags`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tagIds: Array.from(selectedTagIds) })
      })

      if (res.ok) {
        await fetchNoteAndReviews() // Refresh note data
        setTagEditDialogOpen(false)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Note viewer skeleton */}
            <div className="lg:col-span-2">
              <Skeleton className="h-[80vh] w-full rounded-lg" />
            </div>
            {/* Sidebar skeleton — mirrors Card layout */}
            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader className="space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <div className="flex gap-1.5">
                    <Skeleton className="h-5 w-14 rounded-full" />
                    <Skeleton className="h-5 w-18 rounded-full" />
                    <Skeleton className="h-5 w-12 rounded-full" />
                  </div>
                  <Skeleton className="h-px w-full" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-20 w-full rounded-md" />
                  <Skeleton className="h-9 w-32" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-16" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-16 w-full rounded-md" />
                  <Skeleton className="h-9 w-28" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-sm w-full">
          <CardContent className="pt-10 pb-8 flex flex-col items-center gap-4 text-center">
            <FileQuestion className="h-12 w-12 text-muted-foreground" />
            <div>
              <p className="text-lg font-semibold">Note not found</p>
              <p className="text-sm text-muted-foreground mt-1">
                This note may have been removed or the link is incorrect.
              </p>
            </div>
            <Button variant="outline" onClick={() => router.back()}>
              Go back
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Note viewer */}
          <div className="lg:col-span-2 h-[80vh]">
            <NoteViewer
              filePath={note.fileUrl}
              onClose={() => router.back()}
              allowDownload={canDownload}
            />
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">

            {/* Card 1 — Note Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-2 flex-wrap">
                  <CardTitle className="text-xl leading-snug">
                    {note.title}
                  </CardTitle>
                  {note.isVerified && (
                    <VerifiedBadge
                      verifiedBy={note.verifiedBy}
                      verifiedAt={note.verifiedAt}
                    />
                  )}
                </div>
                {note.description && (
                  <CardDescription>{note.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Status + Public badges */}
                <div className="flex flex-wrap gap-2">
                  {note.status && statusConfig[note.status] && (
                    <Badge
                      variant="outline"
                      className={statusConfig[note.status].className}
                    >
                      {statusConfig[note.status].label}
                    </Badge>
                  )}
                  {note.isPublic && (
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                      <Globe className="w-3 h-3 mr-1" />
                      Public
                    </Badge>
                  )}
                </div>

                {/* Tags */}
                <div>
                  {note.noteTags && note.noteTags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {note.noteTags.map((nt) => (
                        <Badge
                          key={nt.tag.id}
                          variant="secondary"
                          className="text-xs"
                        >
                          {nt.tag.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {isSupervisor && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTagEditDialogOpen(true)}
                      className="w-full"
                    >
                      <Tags className="w-4 h-4 mr-2" />
                      {note.noteTags && note.noteTags.length > 0 ? 'Edit Tags' : 'Add Tags'}
                    </Button>
                  )}
                </div>

                <Separator />

                {/* Rating row */}
                <div className="flex items-center justify-between">
                  <StarRating rating={note.averageRating} isInteractive={false} />
                  <span className="text-sm text-muted-foreground">
                    ({note._count.reviews} review{note._count.reviews !== 1 ? "s" : ""})
                  </span>
                </div>

                {/* Verify button */}
                {canVerify && (
                  <>
                    <Separator />
                    <div className="flex flex-col gap-2">
                      <Button
                        variant={note.isVerified ? "outline" : "default"}
                        onClick={handleVerify}
                        disabled={verifying}
                        className={
                          note.isVerified
                            ? ""
                            : "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white"
                        }
                      >
                        {verifying ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : note.isVerified ? (
                          <XCircle className="w-4 h-4 mr-2" />
                        ) : (
                          <CheckCircle className="w-4 h-4 mr-2" />
                        )}
                        {note.isVerified ? "Remove Verification" : "Verify Note"}
                      </Button>
                      {verifyError && (
                        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                          {verifyError}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Card 2 — Tutor Review (only for TUTOR_LEVEL_ROLES) */}
            {isTutorLevel && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Tutor Review</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Existing tutor reviews */}
                  {tutorReviews.length > 0 && (
                    <>
                      {tutorReviews.map((tr, idx) => (
                        <div key={tr.id}>
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <p className="font-semibold text-sm">
                              {tr.reviewer?.name || "Unknown"}
                            </p>
                            <div className="flex items-center gap-2">
                              <StarRating
                                rating={tr.rating}
                                isInteractive={false}
                                size="small"
                              />
                              {decisionConfig[tr.decision] && (
                                <Badge
                                  variant="outline"
                                  className={decisionConfig[tr.decision].className}
                                >
                                  {decisionConfig[tr.decision].label}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {tr.comment}
                          </p>
                          <p className="text-xs text-muted-foreground/60 mt-1">
                            {new Date(tr.createdAt).toLocaleDateString()} at{" "}
                            {new Date(tr.createdAt).toLocaleTimeString()}
                          </p>
                          {idx < tutorReviews.length - 1 && (
                            <Separator className="mt-4" />
                          )}
                        </div>
                      ))}
                      <Separator />
                    </>
                  )}

                  {/* Review form or already-reviewed message */}
                  {currentUserTutorReview ? (
                    <p className="text-sm text-muted-foreground">
                      You have already submitted a tutor review for this note.
                    </p>
                  ) : (
                    <form onSubmit={handleTutorReviewSubmit} className="space-y-4">
                      <div>
                        <Label className="mb-2 block font-medium">
                          Quality Rating
                        </Label>
                        <StarRating rating={trRating} setRating={setTrRating} />
                      </div>
                      <div>
                        <Label className="mb-2 block font-medium">Decision</Label>
                        <div className="flex gap-2 flex-wrap">
                          {[
                            {
                              value: "APPROVE",
                              label: "Approve",
                              className:
                                "border-emerald-300/50 hover:bg-emerald-50 dark:hover:bg-emerald-950",
                            },
                            {
                              value: "REJECT",
                              label: "Reject",
                              className:
                                "border-destructive/30 hover:bg-destructive/5",
                            },
                            {
                              value: "COMMENT_ONLY",
                              label: "Comment Only",
                              className: "border-border hover:bg-muted",
                            },
                          ].map((opt) => (
                            <Button
                              key={opt.value}
                              type="button"
                              variant={
                                trDecision === opt.value ? "default" : "outline"
                              }
                              size="sm"
                              className={
                                trDecision !== opt.value ? opt.className : ""
                              }
                              onClick={() => setTrDecision(opt.value)}
                            >
                              {opt.label}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label
                          htmlFor="tr-comment"
                          className="mb-2 block font-medium"
                        >
                          Comment
                        </Label>
                        <Textarea
                          id="tr-comment"
                          value={trComment}
                          onChange={(e) => setTrComment(e.target.value)}
                          placeholder="Provide your feedback on this note..."
                          required
                        />
                      </div>
                      {trError && (
                        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                          {trError}
                        </div>
                      )}
                      <Button
                        type="submit"
                        disabled={
                          trSubmitting || trRating < 1 || !trComment.trim()
                        }
                      >
                        {trSubmitting && (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        )}
                        {trSubmitting ? "Submitting..." : "Submit Tutor Review"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Card 3 — Community Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reviews</CardTitle>
                <CardDescription>
                  {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Leave a review form */}
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <Label className="mb-2 block font-medium">Your Rating</Label>
                    <StarRating rating={rating} setRating={setRating} />
                  </div>
                  <div>
                    <Label
                      htmlFor="review-comment"
                      className="mb-2 block font-medium"
                    >
                      Your Comment
                    </Label>
                    <Textarea
                      id="review-comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Tell others what you thought of this note..."
                    />
                  </div>
                  {reviewError && (
                    <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                      {reviewError}
                    </div>
                  )}
                  <Button type="submit">Submit Review</Button>
                </form>

                {reviews.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      {reviews.map((review, idx) => (
                        <div key={review.id}>
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-sm">
                              {review.user.name}
                            </p>
                            <StarRating
                              rating={review.rating}
                              isInteractive={false}
                              size="small"
                            />
                          </div>
                          {review.comment && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {review.comment}
                            </p>
                          )}
                          {idx < reviews.length - 1 && (
                            <Separator className="mt-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Tag Edit Dialog */}
      <Dialog open={tagEditDialogOpen} onOpenChange={setTagEditDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Note Tags</DialogTitle>
            <DialogDescription>
              Select tags to categorize this note. Changes will be saved when you click Save.
            </DialogDescription>
          </DialogHeader>

          <TagSelector
            tags={allTags}
            selectedTagIds={selectedTagIds}
            onTagToggle={toggleTag}
          />

          {tagEditError && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
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
              {savingTags && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Tags
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
