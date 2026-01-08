import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// POST /api/notes/[id]/verify - Verify a note (Professor/Admin only)
export async function POST(req, { params }) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
  })

  if (!dbUser || !['PROFESSOR', 'ADMIN'].includes(dbUser.role)) {
    return NextResponse.json({ error: 'Only professors and admins can verify notes' }, { status: 403 })
  }

  try {
    const { id } = await params

    const note = await prisma.note.findUnique({
      where: { id },
    })

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    if (note.isVerified) {
      return NextResponse.json({ error: 'Note is already verified' }, { status: 400 })
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        isVerified: true,
        verifiedAt: new Date(),
        verifiedById: dbUser.id,
      },
      include: {
        verifiedBy: {
          select: { name: true, email: true },
        },
      },
    })

    return NextResponse.json({
      message: 'Note verified successfully',
      note: {
        id: updatedNote.id,
        isVerified: updatedNote.isVerified,
        verifiedAt: updatedNote.verifiedAt,
        verifiedBy: updatedNote.verifiedBy,
      },
    })

  } catch (error) {
    console.error('Failed to verify note:', error)
    return NextResponse.json({ error: 'Failed to verify note' }, { status: 500 })
  }
}

// DELETE /api/notes/[id]/verify - Remove verification (Professor/Admin only)
export async function DELETE(req, { params }) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
  })

  if (!dbUser || !['PROFESSOR', 'ADMIN'].includes(dbUser.role)) {
    return NextResponse.json({ error: 'Only professors and admins can unverify notes' }, { status: 403 })
  }

  try {
    const { id } = await params

    const note = await prisma.note.findUnique({
      where: { id },
    })

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    if (!note.isVerified) {
      return NextResponse.json({ error: 'Note is not verified' }, { status: 400 })
    }

    await prisma.note.update({
      where: { id },
      data: {
        isVerified: false,
        verifiedAt: null,
        verifiedById: null,
      },
    })

    return NextResponse.json({ message: 'Verification removed successfully' })

  } catch (error) {
    console.error('Failed to unverify note:', error)
    return NextResponse.json({ error: 'Failed to remove verification' }, { status: 500 })
  }
}
