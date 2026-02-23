import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { SUPERVISOR_ROLES } from '@/lib/roles'

// PUT /api/departments/[id] - Update department (LEAD_TUTOR/ADMIN only)
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
    const { name, code } = await request.json()

    if (!name || !code) {
      return NextResponse.json({ error: 'Name and code are required' }, { status: 400 })
    }

    const department = await prisma.department.update({
      where: { id },
      data: {
        name: name.trim(),
        code: code.trim().toUpperCase(),
      },
    })

    return NextResponse.json(department)
  } catch (error) {
    console.error('Error updating department:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 })
    }
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'A department with this code already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to update department' }, { status: 500 })
  }
}

// DELETE /api/departments/[id] - Delete department (LEAD_TUTOR/ADMIN only)
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
    // Check if department has courses
    const coursesCount = await prisma.course.count({
      where: { departmentId: id },
    })

    if (coursesCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete department with ${coursesCount} course(s). Remove or reassign courses first.` },
        { status: 400 }
      )
    }

    await prisma.department.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting department:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to delete department' }, { status: 500 })
  }
}
