import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { SUPERVISOR_ROLES } from '@/lib/roles'
import { writeLimiter } from '@/lib/rate-limit'
import { departmentsCache, academicsCache } from '@/lib/cache'

export const dynamic = 'force-dynamic'

// GET /api/departments - List all departments (public)
export async function GET() {
  const cached = departmentsCache.get('all')
  if (cached) return NextResponse.json(cached)

  try {
    const departments = await prisma.department.findMany({
      include: {
        courses: {
          select: {
            id: true,
            name: true,
            code: true,
            professorId: true,
            professor: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { name: 'asc' },
    })

    departmentsCache.set('all', departments)
    return NextResponse.json(departments)
  } catch (error) {
    console.error('Error fetching departments:', error)
    return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 })
  }
}

// POST /api/departments - Create department (LEAD_TUTOR/ADMIN only)
export async function POST(request) {
  const { success } = writeLimiter.check(request)
  if (!success) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

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

  try {
    const { name, code } = await request.json()

    if (!name || !code) {
      return NextResponse.json({ error: 'Name and code are required' }, { status: 400 })
    }

    const department = await prisma.department.create({
      data: {
        name: name.trim(),
        code: code.trim().toUpperCase(),
        createdById: dbUser.id,
      },
    })

    departmentsCache.invalidate('all')
    academicsCache.invalidate('all')
    return NextResponse.json(department, { status: 201 })
  } catch (error) {
    console.error('Error creating department:', error)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'A department with this code already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to create department' }, { status: 500 })
  }
}
