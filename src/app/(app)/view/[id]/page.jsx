"use client"
import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import NoteViewer from "@/components/Dashboard/note-viewer"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, CheckCircle, XCircle } from "lucide-react"
import { useUser } from "@/contexts/AuthContext"
import VerifiedBadge from "@/components/VerifiedBadge"

// A simple star rating component
const StarRating = ({ rating, setRating, isInteractive = true }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${isInteractive ? 'cursor-pointer' : ''} ${
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
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [verifying, setVerifying] = useState(false)
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const { role, user } = useUser()

  const canVerify = ['PROFESSOR', 'ADMIN'].includes(role)
  // Allow download if note indicates user can download (from API)
  const canDownload = note?.canDownload ?? false

  const fetchNoteAndReviews = useCallback(async () => {
    if (id) {
      setLoading(true)
      const [noteRes, reviewsRes] = await Promise.all([
        fetch(`/api/notes/${id}`),
        fetch(`/api/notes/${id}/reviews`),
      ])
      
      if (!noteRes.ok) {
        // If the note can't be fetched (e.g., forbidden), redirect
        router.replace("/dashboard")
        return
      }

      const noteData = await noteRes.json()
      const reviewsData = await reviewsRes.json()

      setNote(noteData.note || null)
      setReviews(reviewsData.reviews || [])
      setLoading(false)
    }
  }, [id, router])

  useEffect(() => {
    fetchNoteAndReviews()
  }, [fetchNoteAndReviews])

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`/api/notes/${id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comment }),
    })
    if (res.ok) {
      // Refresh reviews and note data (for average rating)
      fetchNoteAndReviews()
      setRating(0)
      setComment("")
    } else {
      const { error } = await res.json()
      alert(`Error: ${error}`)
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
            <p className="text-muted-foreground mt-2">{note.description}</p>
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
