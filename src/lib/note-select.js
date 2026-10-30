/**
 * The field selection for "a note belonging to the signed-in user".
 *
 * Shared by /api/bootstrap and /api/notes/mine so the dashboard sees the same
 * shape whichever one it reads. Both routes previously spelled this out
 * separately and had already drifted.
 *
 * Note the omissions: filePath and fileUrl are NOT selected. The bucket is
 * private and reading a file goes through /api/notes/[id], which signs a
 * short-lived URL only after authorizing the caller.
 */
export const MY_NOTE_SELECT = {
  id: true,
  title: true,
  description: true,
  fileType: true,
  createdAt: true,
  status: true,
  isPublic: true,
  isVerified: true,
  course: {
    select: { id: true, code: true, name: true, professor: { select: { id: true, name: true } } },
  },
  semester: { select: { id: true, name: true, year: true } },
  reviews: { select: { rating: true } },
  noteTags: { select: { tag: { select: { id: true, name: true } } } },
  // Only the latest decision: that is the one the student has to act on.
  tutorReviews: {
    orderBy: { createdAt: 'desc' },
    take: 1,
    select: {
      comment: true,
      rating: true,
      decision: true,
      createdAt: true,
      reviewer: { select: { name: true } },
    },
  },
}

/**
 * Collapse the raw rows into what the dashboard renders: an average rating and
 * the single piece of tutor feedback, with the helper arrays dropped.
 */
export function shapeMyNotes(notes) {
  return notes.map((note) => {
    const ratings = note.reviews.map((r) => r.rating)
    const { reviews, tutorReviews, ...rest } = note
    return {
      ...rest,
      averageRating: ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0,
      reviewCount: ratings.length,
      tutorFeedback: tutorReviews[0] ?? null,
    }
  })
}
