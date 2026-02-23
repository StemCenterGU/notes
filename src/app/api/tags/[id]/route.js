import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { SUPERVISOR_ROLES } from '@/lib/roles'

// PUT /api/tags/[id] - Update a tag (LEAD_TUTOR/ADMIN only)
export async function PUT(request, { params }) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
  })

  if (!dbUser || !SUPERVISOR_ROLES.includes(dbUser.role)) {
    return NextResponse.json({ error: 'Forbidden - Lead Tutors and Admins only' }, { status: 403 })
  }

  const { id } = await params

  try {
    const { name, category } = await request.json()

    if (!name || !category) {
      return NextResponse.json({ error: 'Name and category are required' }, { status: 400 })
    }

    const validCategories = ['RESOURCE_TYPE', 'STUDY_CYCLE', 'GENERAL']
    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: 'Invalid category. Must be RESOURCE_TYPE, STUDY_CYCLE, or GENERAL' }, { status: 400 })
    }

    const tag = await prisma.tag.update({
      where: { id },
      data: {
        name: name.trim(),
        category,
      },
    })

    return NextResponse.json(tag)
  } catch (error) {
    console.error('Error updating tag:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Tag not found' }, { status: 404 })
    }
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'A tag with this name already exists in this category' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to update tag' }, { status: 500 })
  }
}

// DELETE /api/tags/[id] - Delete a tag (LEAD_TUTOR/ADMIN only)
export async function DELETE(request, { params }) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
  })

  if (!dbUser || !SUPERVISOR_ROLES.includes(dbUser.role)) {
    return NextResponse.json({ error: 'Forbidden - Lead Tutors and Admins only' }, { status: 403 })
  }

  const { id } = await params

  try {
    // Check if any notes use this tag
    const noteTagCount = await prisma.noteTag.count({
      where: { tagId: id },
    })

    if (noteTagCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete tag that is used by ${noteTagCount} note(s). Remove the tag from those notes first.` },
        { status: 400 }
      )
    }

    await prisma.tag.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting tag:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Tag not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to delete tag' }, { status: 500 })
  }
}
