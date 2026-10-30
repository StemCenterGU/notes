import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthedUser } from '@/lib/auth'
import { TUTOR_LEVEL_ROLES } from '@/lib/roles'

// POST /api/notes/[id]/tutor-review - Submit a tutor review
export async function POST(req, { params }) {
  const { authUser, dbUser } = await getAuthedUser()

  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!dbUser || !TUTOR_LEVEL_ROLES.includes(dbUser.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const { id: noteId } = await params
    const { comment, rating, decision } = await req.json()

    // Validate inputs
    if (!comment || typeof comment !== 'string' || !comment.trim()) {
      return NextResponse.json({ error: 'Comment is required' }, { status: 400 })
    }

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    if (!['APPROVE', 'REJECT', 'COMMENT_ONLY'].includes(decision)) {
      return NextResponse.json({ error: 'Decision must be APPROVE, REJECT, or COMMENT_ONLY' }, { status: 400 })
    }

    // Verify note exists
    const note = await prisma.note.findUnique({ where: { id: noteId } })
    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    // Create the review
    const review = await prisma.tutorReview.create({
      data: {
        noteId,
        reviewerId: dbUser.id,
        comment: comment.trim(),
        rating,
        decision,
      },
      include: {
        reviewer: {
          select: { name: true, email: true },
        },
      },
    })

    // Approving publishes the note in the same action.
    //
    // These used to be two steps: a tutor approved, and a lead tutor then had
    // to flip a separate "public" switch before students could see anything.
    // Nothing in the UI told the tutor that second step existed, so approved
    // notes silently never reached students. A lead tutor can still unpublish
    // from the review queue, so approving by mistake stays reversible.
    if (decision !== 'COMMENT_ONLY' && note.status === 'UNREVIEWED') {
      const approved = decision === 'APPROVE'
      await prisma.note.update({
        where: { id: noteId },
        data: {
          status: approved ? 'APPROVED' : 'REJECTED',
          isPublic: approved,
        },
      })
    }

    return NextResponse.json({ review }, { status: 201 })
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'You have already reviewed this note' }, { status: 409 })
    }
    console.error('Failed to create tutor review:', error)
    return NextResponse.json({ error: 'Failed to create tutor review' }, { status: 500 })
  }
}

// GET /api/notes/[id]/tutor-review - Get all tutor reviews for a note
export async function GET(req, { params }) {
  const { authUser, dbUser } = await getAuthedUser()

  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!dbUser || !TUTOR_LEVEL_ROLES.includes(dbUser.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const { id: noteId } = await params

    const reviews = await prisma.tutorReview.findMany({
      relationLoadStrategy: 'join',
      where: { noteId },
      include: {
        reviewer: {
          select: { name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ reviews })
  } catch (error) {
    console.error('Failed to fetch tutor reviews:', error)
    return NextResponse.json({ error: 'Failed to fetch tutor reviews' }, { status: 500 })
  }
}
