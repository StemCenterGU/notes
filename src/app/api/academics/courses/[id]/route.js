import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { SUPERVISOR_ROLES } from '@/lib/roles'

// PUT /api/academics/courses/[id] - Update course (LEAD_TUTOR/ADMIN only)
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
    const { name, code, departmentId, professorId } = await request.json()

    if (!name || !code) {
      return NextResponse.json({ error: 'Name and code are required' }, { status: 400 })
    }

    const course = await prisma.course.update({
      where: { id },
      data: {
        name: name.trim(),
        code: code.trim().toUpperCase(),
        departmentId: departmentId || null,
        professorId: professorId || null,
      },
    })

    return NextResponse.json(course)
  } catch (error) {
    console.error('Error updating course:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 })
  }
}

// DELETE /api/academics/courses/[id] - Delete course (LEAD_TUTOR/ADMIN only)
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
    // Check if course has notes
    const notesCount = await prisma.note.count({
      where: { courseId: id },
    })

    if (notesCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete course with ${notesCount} note(s). Remove notes first.` },
        { status: 400 }
      )
    }

    await prisma.course.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting course:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 })
  }
}
