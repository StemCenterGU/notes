import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { TUTOR_LEVEL_ROLES } from '@/lib/roles'

// POST /api/notes/[id]/tutor-review - Submit a tutor review
export async function POST(req, { params }) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({ where: { supabaseId: user.id } })
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

    // Update note status if decision is APPROVE or REJECT and note is currently UNREVIEWED
    if (decision !== 'COMMENT_ONLY' && note.status === 'UNREVIEWED') {
      const newStatus = decision === 'APPROVE' ? 'APPROVED' : 'REJECTED'
      await prisma.note.update({
        where: { id: noteId },
        data: { status: newStatus },
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
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({ where: { supabaseId: user.id } })
  if (!dbUser || !TUTOR_LEVEL_ROLES.includes(dbUser.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const { id: noteId } = await params

    const reviews = await prisma.tutorReview.findMany({
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
