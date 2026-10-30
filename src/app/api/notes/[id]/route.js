import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthedUser } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { signedUrlFor } from '@/lib/file-url'
import { SUPERVISOR_ROLES } from '@/lib/roles'

// GET /api/notes/[id] - Fetches a single note by its ID
export async function GET(req, { params }) {
  const { authUser, dbUser } = await getAuthedUser()

  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!dbUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  try {
    const { id } = await params

    // The note and its rating average are independent reads keyed on the same
    // id, so they go out together instead of one after the other.
    const [note, aggregate] = await Promise.all([
      prisma.note.findUnique({
        relationLoadStrategy: 'join',
        where: { id },
        include: {
          _count: {
            select: { reviews: true },
          },
          verifiedBy: {
            select: { name: true, email: true },
          },
          noteTags: {
            include: {
              tag: true,
            },
          },
        },
      }),
      prisma.review.aggregate({ _avg: { rating: true }, where: { noteId: id } }),
    ])

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    // SECURITY CHECK: User must be the uploader, a privileged user, or viewing a public+approved note
    const isOwner = note.uploaderId === dbUser.id
    const isPrivileged = ['TUTOR', 'ADMIN', 'PROFESSOR', 'LEAD_TUTOR', 'STEMPASS_TUTOR'].includes(dbUser.role)
    const isPublicApproved = note.isPublic && note.status === 'APPROVED'
    if (!isOwner && !isPrivileged && !isPublicApproved) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    note.averageRating = aggregate._avg.rating || 0

    // Add ownership info for download permission
    note.isOwner = note.uploaderId === dbUser.id
    note.canDownload = note.isOwner || isPrivileged

    // The bucket is private, so the stored public URL does not resolve. Mint a
    // short-lived signed URL now that the caller has passed the checks above.
    // Never ship the raw storage path or the stored URL to the browser.
    note.fileUrl = await signedUrlFor(note.filePath)
    delete note.filePath

    return NextResponse.json({ note })
  } catch (error) {
    console.error(`Failed to fetch note:`, error)
    return NextResponse.json({ error: 'Failed to fetch note' }, { status: 500 })
  }
}

// PUT /api/notes/[id] - Updates a note
export async function PUT(req, { params }) {
  const { authUser, dbUser } = await getAuthedUser()

  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!dbUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  try {
    const { id: noteId } = await params
    const note = await prisma.note.findUnique({ where: { id: noteId } })

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    // Security Check: Ensure the user owns the note
    if (note.uploaderId !== dbUser.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { title, description, courseId, semesterId } = await req.json()

    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: {
        title,
        description,
        courseId,
        semesterId,
      },
    })

    return NextResponse.json({ note: updatedNote })
  } catch (error) {
    console.error('Failed to update note:', error)
    return NextResponse.json({ error: 'Failed to update note' }, { status: 500 })
  }
}

// DELETE /api/notes/[id] - Deletes a note
export async function DELETE(req, { params }) {
  const { authUser, dbUser } = await getAuthedUser()

  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!dbUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  try {
    const { id: noteId } = await params
    const note = await prisma.note.findUnique({ where: { id: noteId } })

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    // The uploader can withdraw their own note; a lead tutor or admin can
    // remove anyone's. Without the second case there is no way to take a file
    // down at all -- rejecting a note only hides it from the feed.
    const canDelete = note.uploaderId === dbUser.id || SUPERVISOR_ROLES.includes(dbUser.role)
    if (!canDelete) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Start a transaction to delete the note and its related data
    await prisma.$transaction([
      prisma.noteTag.deleteMany({ where: { noteId } }),
      prisma.review.deleteMany({ where: { noteId } }),
      prisma.raffleEntry.deleteMany({ where: { noteId } }),
      prisma.note.delete({ where: { id: noteId } }),
    ])

    // Delete the associated file from Supabase Storage
    await supabaseAdmin.storage.from('notes').remove([note.filePath])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete note:', error)
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 })
  }
}
