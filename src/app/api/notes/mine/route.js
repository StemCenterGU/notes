import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
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

    // Single query with reviews included - no N+1
    const notes = await prisma.note.findMany({
      where: { uploaderId: dbUser.id },
      include: {
        course: {
          include: {
            professor: true,
          },
        },
        semester: true,
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

    return NextResponse.json({ notes: notesWithRatings })
  } catch (error) {
    console.error('Failed to fetch user notes:', error)
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
  }
}
