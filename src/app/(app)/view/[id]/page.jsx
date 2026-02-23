"use client"
import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import NoteViewer from "@/components/Dashboard/note-viewer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Star, CheckCircle, XCircle, ShieldCheck, Globe } from "lucide-react"
import { useUser } from "@/contexts/AuthContext"
import VerifiedBadge from "@/components/VerifiedBadge"

const TUTOR_LEVEL_ROLES = ['TUTOR', 'LEAD_TUTOR', 'PROFESSOR', 'ADMIN']

const statusConfig = {
  UNREVIEWED: { label: "Unreviewed", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
  APPROVED: { label: "Approved", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  REJECTED: { label: "Rejected", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
}

const decisionConfig = {
  APPROVE: { label: "Approved", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  REJECT: { label: "Rejected", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
  COMMENT_ONLY: { label: "Comment Only", className: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" },
}

// A simple star rating component
const StarRating = ({ rating, setRating, isInteractive = true, size = "default" }) => {
  const sizeClass = size === "small" ? "w-4 h-4" : "w-5 h-5"
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClass} ${isInteractive ? 'cursor-pointer' : ''} ${
            rating >= star ? "text-secondary fill-secondary" : "text-muted-foreground/50"
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

  // Tutor review form state
  const [trComment, setTrComment] = useState("")
  const [trRating, setTrRating] = useState(0)
  const [trDecision, setTrDecision] = useState("COMMENT_ONLY")
  const [trSubmitting, setTrSubmitting] = useState(false)

  const params = useParams()
  const router = useRouter()
  const { id } = params
  const { role, user } = useUser()

  const canVerify = ['PROFESSOR', 'ADMIN'].includes(role)
  const isTutorLevel = TUTOR_LEVEL_ROLES.includes(role)
  // Allow download if note indicates user can download (from API)
  const canDownload = note?.canDownload ?? false

  const fetchNoteAndReviews = useCallback(async () => {
    if (id) {
      setLoading(true)
      const fetches = [
        fetch(`/api/notes/${id}`),
        fetch(`/api/notes/${id}/reviews`),
      ]

      // Only fetch tutor reviews if user has tutor-level role
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

  // Check if the current user has already submitted a tutor review
  const currentUserTutorReview = tutorReviews.find(
    (tr) => tr.reviewer?.email === user?.email
  )

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
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
      alert(`Error: ${error}`)
    }
  }

  const handleTutorReviewSubmit = async (e) => {
    e.preventDefault()
    if (!trComment.trim() || trRating < 1 || trRating > 5) {
      alert("Please fill in all fields (comment, rating 1-5, and decision).")
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
        alert(`Error: ${error}`)
      }
    } finally {
      setTrSubmitting(false)
    }
  }

  const handleVerify = async () => {
    setVerifying(true)
    try {
      const res = await fetch(`/api/notes/${id}/verify`, {
        method: note.isVerified ? "DELETE" : "POST",
      })
      if (res.ok) {
        fetchNoteAndReviews()
      } else {
        const { error } = await res.json()
        alert(`Error: ${error}`)
      }
    } finally {
      setVerifying(false)
    }
  }

  if (loading) {
    return <div className="text-center py-24">Loading...</div>
  }

  if (!note) {
    return <div className="text-center py-24">Note not found.</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-[80vh]">
            <NoteViewer filePath={note.fileUrl} onClose={() => router.back()} allowDownload={canDownload} />
          </div>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-bold">{note.title}</h1>
              {note.isVerified && (
                <VerifiedBadge
                  verifiedBy={note.verifiedBy}
                  verifiedAt={note.verifiedAt}
                />
              )}
            </div>

            {/* Status and Public badges */}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {note.status && statusConfig[note.status] && (
                <Badge variant="outline" className={statusConfig[note.status].className}>
                  {statusConfig[note.status].label}
                </Badge>
              )}
              {note.isPublic && (
                <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  <Globe className="w-3 h-3 mr-1" />
                  Public
                </Badge>
              )}
            </div>

            <p className="text-muted-foreground mt-2">{note.description}</p>
            {note.noteTags && note.noteTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
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
            <div className="flex items-center gap-2 mt-2">
                <StarRating rating={note.averageRating} isInteractive={false} />
                <span className="text-muted-foreground">({note._count.reviews} reviews)</span>
            </div>

            {canVerify && (
              <div className="mt-4">
                <Button
                  variant={note.isVerified ? "outline" : "default"}
                  onClick={handleVerify}
                  disabled={verifying}
                  className={note.isVerified ? "" : "bg-green-600 hover:bg-green-700"}
                >
                  {note.isVerified ? (
                    <>
                      <XCircle className="w-4 h-4 mr-2" />
                      Remove Verification
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Verify Note
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Tutor Review Section - only visible to TUTOR_LEVEL_ROLES */}
            {isTutorLevel && (
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-bold">Tutor Review</h2>
                </div>

                {/* Existing tutor reviews */}
                {tutorReviews.length > 0 && (
                  <div className="space-y-3 mb-6">
                    {tutorReviews.map((tr) => (
                      <div key={tr.id} className="p-4 border rounded-lg bg-card">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <h3 className="font-semibold">{tr.reviewer?.name || "Unknown"}</h3>
                          <div className="flex items-center gap-2">
                            <StarRating rating={tr.rating} isInteractive={false} size="small" />
                            {decisionConfig[tr.decision] && (
                              <Badge variant="outline" className={decisionConfig[tr.decision].className}>
                                {decisionConfig[tr.decision].label}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-muted-foreground mt-2">{tr.comment}</p>
                        <p className="text-xs text-muted-foreground/60 mt-1">
                          {new Date(tr.createdAt).toLocaleDateString()} at {new Date(tr.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tutor review form (disabled if already reviewed) */}
                {currentUserTutorReview ? (
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">
                      You have already submitted a tutor review for this note.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleTutorReviewSubmit} className="space-y-4 p-4 border rounded-lg bg-card">
                    <div>
                      <label className="block font-medium mb-2">Quality Rating</label>
                      <StarRating rating={trRating} setRating={setTrRating} />
                    </div>
                    <div>
                      <label className="block font-medium mb-2">Decision</label>
                      <div className="flex gap-2 flex-wrap">
                        {[
                          { value: "APPROVE", label: "Approve", className: "border-green-300 hover:bg-green-50 dark:hover:bg-green-900/20" },
                          { value: "REJECT", label: "Reject", className: "border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20" },
                          { value: "COMMENT_ONLY", label: "Comment Only", className: "border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900/20" },
                        ].map((opt) => (
                          <Button
                            key={opt.value}
                            type="button"
                            variant={trDecision === opt.value ? "default" : "outline"}
                            size="sm"
                            className={trDecision !== opt.value ? opt.className : ""}
                            onClick={() => setTrDecision(opt.value)}
                          >
                            {opt.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block font-medium mb-2">Comment</label>
                      <Textarea
                        value={trComment}
                        onChange={(e) => setTrComment(e.target.value)}
                        placeholder="Provide your feedback on this note..."
                        required
                      />
                    </div>
                    <Button type="submit" disabled={trSubmitting || trRating < 1 || !trComment.trim()}>
                      {trSubmitting ? "Submitting..." : "Submit Tutor Review"}
                    </Button>
                  </form>
                )}
              </div>
            )}

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
                <form onSubmit={handleReviewSubmit} className="space-y-4 p-4 border-border rounded-lg bg-card">
                    <div>
                        <label className="block font-medium mb-2">Your Rating</label>
                        <StarRating rating={rating} setRating={setRating} />
                    </div>
                    <div>
                        <label className="block font-medium mb-2">Your Comment</label>
                        <Textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Tell others what you thought of this note..."
                        />
                    </div>
                    <Button type="submit">Submit Review</Button>
                </form>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                <div className="space-y-4">
                    {reviews.map(review => (
                        <div key={review.id} className="p-4 border-border rounded-lg bg-card">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold">{review.user.name}</h3>
                                <StarRating rating={review.rating} isInteractive={false} />
                            </div>
                            <p className="text-muted-foreground mt-2">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
