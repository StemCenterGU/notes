import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { SUPERVISOR_ROLES } from '@/lib/roles'

export const dynamic = 'force-dynamic'

// GET /api/notes/[id]/tags - Fetch current tags for a note
export async function GET(req, { params }) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id }
  })

  if (!dbUser || !SUPERVISOR_ROLES.includes(dbUser.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const { id: noteId } = await params

    // Verify note exists
    const note = await prisma.note.findUnique({
      where: { id: noteId }
    })

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    // Fetch note tags with tag details
    const noteTags = await prisma.noteTag.findMany({
      where: { noteId },
      include: {
        tag: true
      }
    })

    return NextResponse.json({ tags: noteTags })
  } catch (error) {
    console.error('Failed to fetch note tags:', error)
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 })
  }
}

// PUT /api/notes/[id]/tags - Update tags on a note
export async function PUT(req, { params }) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id }
  })

  if (!dbUser || !SUPERVISOR_ROLES.includes(dbUser.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const { id: noteId } = await params
    const { tagIds } = await req.json()

    // Validate input
    if (!Array.isArray(tagIds)) {
      return NextResponse.json({ error: 'tagIds must be an array' }, { status: 400 })
    }

    // Verify note exists
    const note = await prisma.note.findUnique({
      where: { id: noteId }
    })

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    // Verify all tags exist if any provided
    if (tagIds.length > 0) {
      const existingTags = await prisma.tag.findMany({
        where: { id: { in: tagIds } }
      })

      if (existingTags.length !== tagIds.length) {
        return NextResponse.json(
          { error: 'One or more invalid tag IDs' },
          { status: 400 }
        )
      }
    }

    // Update tags in transaction
    await prisma.$transaction(async (tx) => {
      // Delete existing tags
      await tx.noteTag.deleteMany({
        where: { noteId }
      })

      // Create new tags if any provided
      if (tagIds.length > 0) {
        await tx.noteTag.createMany({
          data: tagIds.map(tagId => ({
            noteId,
            tagId
          })),
          skipDuplicates: true
        })
      }
    })

    // Fetch updated note with tags
    const updatedNote = await prisma.note.findUnique({
      where: { id: noteId },
      include: {
        noteTags: {
          include: {
            tag: true
          }
        }
      }
    })

    return NextResponse.json({ note: updatedNote })
  } catch (error) {
    console.error('Failed to update note tags:', error)
    return NextResponse.json({ error: 'Failed to update tags' }, { status: 500 })
  }
}
