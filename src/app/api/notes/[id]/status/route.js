import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthedUser } from '@/lib/auth'
import { SUPERVISOR_ROLES } from '@/lib/roles'

// PUT /api/notes/[id]/status - Override note status (LEAD_TUTOR/ADMIN only)
export async function PUT(req, { params }) {
  const { authUser, dbUser } = await getAuthedUser()

  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!dbUser || !SUPERVISOR_ROLES.includes(dbUser.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const { id: noteId } = await params
    const { status } = await req.json()

    if (!['UNREVIEWED', 'APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json({ error: 'Status must be UNREVIEWED, APPROVED, or REJECTED' }, { status: 400 })
    }

    const note = await prisma.note.findUnique({ where: { id: noteId } })
    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    // Visibility follows the status so the two can never disagree: approving
    // publishes, anything else unpublishes. Matches the tutor review action.
    const updateData = { status, isPublic: status === 'APPROVED' }

    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: updateData,
    })

    return NextResponse.json({ note: updatedNote })
  } catch (error) {
    console.error('Failed to update note status:', error)
    return NextResponse.json({ error: 'Failed to update note status' }, { status: 500 })
  }
}
