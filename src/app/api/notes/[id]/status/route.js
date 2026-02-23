import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { SUPERVISOR_ROLES } from '@/lib/roles'

// PUT /api/notes/[id]/status - Override note status (LEAD_TUTOR/ADMIN only)
export async function PUT(req, { params }) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({ where: { supabaseId: user.id } })
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

    // If status is being changed away from APPROVED, also set isPublic to false
    const updateData = { status }
    if (status !== 'APPROVED' && note.isPublic) {
      updateData.isPublic = false
    }

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
