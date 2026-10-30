import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthedUser } from '@/lib/auth'
import { SUPERVISOR_ROLES } from '@/lib/roles'

// PUT /api/notes/[id]/public - Toggle isPublic (LEAD_TUTOR/ADMIN only)
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
    const { isPublic } = await req.json()

    if (typeof isPublic !== 'boolean') {
      return NextResponse.json({ error: 'isPublic must be a boolean' }, { status: 400 })
    }

    const note = await prisma.note.findUnique({ where: { id: noteId } })
    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    // Only allow making public if note is APPROVED
    if (isPublic && note.status !== 'APPROVED') {
      return NextResponse.json({ error: 'Only approved notes can be made public' }, { status: 400 })
    }

    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: { isPublic },
    })

    return NextResponse.json({ note: updatedNote })
  } catch (error) {
    console.error('Failed to update note public status:', error)
    return NextResponse.json({ error: 'Failed to update public status' }, { status: 500 })
  }
}
