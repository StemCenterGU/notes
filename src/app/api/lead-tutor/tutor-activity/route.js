import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { SUPERVISOR_ROLES } from '@/lib/roles'

export const dynamic = 'force-dynamic'

// GET /api/lead-tutor/tutor-activity - Get tutor activity data
export async function GET() {
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
    // Fetch all tutors and lead tutors
    const tutors = await prisma.user.findMany({
      where: {
        role: { in: ['TUTOR', 'LEAD_TUTOR'] },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        _count: {
          select: { tutorReviews: true },
        },
        tutorReviews: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: { createdAt: true },
        },
      },
      orderBy: { name: 'asc' },
    })

    const tutorActivity = tutors.map((tutor) => ({
      id: tutor.id,
      name: tutor.name,
      email: tutor.email,
      role: tutor.role,
      reviewCount: tutor._count.tutorReviews,
      lastReviewDate: tutor.tutorReviews[0]?.createdAt || null,
    }))

    return NextResponse.json({ tutors: tutorActivity })
  } catch (error) {
    console.error('Failed to fetch tutor activity:', error)
    return NextResponse.json({ error: 'Failed to fetch tutor activity' }, { status: 500 })
  }
}
