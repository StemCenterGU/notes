import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(req) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id },
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Security Check: Only allow certain roles to explore
    if (!['TUTOR', 'ADMIN', 'PROFESSOR'].includes(dbUser.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Single query with reviews included - no N+1
    const notes = await prisma.note.findMany({
      include: {
        course: {
          include: {
            professor: true,
          },
        },
        semester: true,
        uploader: {
          select: {
            name: true,
          },
        },
        reviews: {
          select: { rating: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Calculate averages in memory - much faster than N separate queries
    const notesWithRatings = notes.map((note) => {
      const ratings = note.reviews.map((r) => r.rating)
      const averageRating = ratings.length > 0
        ? ratings.reduce((a, b) => a + b, 0) / ratings.length
        : 0
      const { reviews, ...noteWithoutReviews } = note
      return { ...noteWithoutReviews, averageRating }
    })

    // Fetch all unique filter options in parallel
    const [courses, professors, semesters] = await prisma.$transaction([
      prisma.course.findMany({ distinct: ['name'] }),
      prisma.professor.findMany({ distinct: ['name'] }),
      prisma.semester.findMany({ distinct: ['name', 'year'] }),
    ])

    const filterOptions = {
      courses: courses.map(c => c.name),
      professors: professors.map(p => p.name),
      semesters: semesters.map(s => `${s.name} ${s.year}`),
    }

    return NextResponse.json({ notes: notesWithRatings, filterOptions })
  } catch (error) {
    console.error('Failed to fetch explore notes:', error)
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
  }
}
