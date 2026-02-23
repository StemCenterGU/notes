import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { SUPERVISOR_ROLES } from '@/lib/roles'
import { writeLimiter } from '@/lib/rate-limit'
import { academicsCache } from '@/lib/cache'

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

  const { type, data } = await request.json()

  if (!type || !data) {
    return NextResponse.json({ error: 'Missing type or data' }, { status: 400 })
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id },
      select: { id: true, role: true },
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found in database' }, { status: 404 })
    }

    let result
    const createData = { ...data, createdById: dbUser.id }

    switch (type) {
      case 'course':
        // Course creation restricted to LEAD_TUTOR and ADMIN
        if (!SUPERVISOR_ROLES.includes(dbUser.role)) {
          return NextResponse.json(
            { error: 'Only Lead Tutors and Admins can create courses' },
            { status: 403 }
          )
        }
        if (!createData.departmentId) {
          return NextResponse.json(
            { error: 'Department is required when creating a course' },
            { status: 400 }
          )
        }
        result = await prisma.course.create({ data: createData })
        break
      case 'professor':
        result = await prisma.professor.create({ data: createData })
        break
      case 'semester':
        result = await prisma.semester.create({ data: createData })
        // Format semester name as "Spring 2025" for display consistency
        result = {
          ...result,
          name: `${result.name} ${result.year}`,
        }
        break
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    academicsCache.invalidate('all')
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error(`Error creating ${type}:`, error)
    // Provide a more specific error message if possible (e.g., unique constraint violation)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: `A ${type} with these details already exists.` }, { status: 409 })
    }
    return NextResponse.json({ error: `Failed to create ${type}` }, { status: 500 })
  }
}
