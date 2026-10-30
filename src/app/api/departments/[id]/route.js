import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthedUser } from '@/lib/auth'
import { cacheDelete } from '@/lib/ttl-cache'
import { SUPERVISOR_ROLES } from '@/lib/roles'
import { departmentsCache, academicsCache } from '@/lib/cache'

// PUT /api/departments/[id] - Update department (LEAD_TUTOR/ADMIN only)
export async function PUT(request, { params }) {
  // Catalogue changed: drop the cached explore filter options.
  cacheDelete('explore:filters')

  const { authUser, dbUser } = await getAuthedUser()

  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

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

    departmentsCache.invalidate('all')
    academicsCache.invalidate('all')
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
  // Catalogue changed: drop the cached explore filter options.
  cacheDelete('explore:filters')

  const { authUser, dbUser } = await getAuthedUser()

  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

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

    departmentsCache.invalidate('all')
    academicsCache.invalidate('all')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting department:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to delete department' }, { status: 500 })
  }
}
