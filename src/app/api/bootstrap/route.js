import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { MY_NOTE_SELECT, shapeMyNotes } from '@/lib/note-select'
import { getAuthedUser } from '@/lib/auth'
import { invalidateUser } from '@/lib/auth'
import { cached } from '@/lib/ttl-cache'

export const dynamic = 'force-dynamic'

const CATALOGUE_TTL_MS = 60_000

/**
 * Everything the signed-in shell and dashboard need, in ONE request.
 *
 * The client used to make five calls in a waterfall — auth, role, init-user,
 * then notes + academics, then the active raffle — each paying full network
 * latency and the first three doing near-identical auth work.
 *
 * Here auth is resolved once and the independent reads run concurrently, so
 * the whole thing costs roughly one round-trip instead of four stacked ones.
 */
export async function GET() {
  const { authUser, dbUser: existing } = await getAuthedUser()

  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // First sign-in: create the row before anything reads against it.
    let dbUser = existing
    if (!dbUser) {
      try {
        dbUser = await prisma.user.create({
          data: {
            supabaseId: authUser.id,
            email: authUser.email,
            name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0],
            role: 'STUDENT',
            kudosPoints: 0,
          },
        })
      } catch (createError) {
        // Raced with another request, or the email already exists.
        if (createError.code === 'P2002') {
          dbUser = await prisma.user.findUnique({ where: { email: authUser.email } })
        } else {
          throw createError
        }
      }
      invalidateUser(authUser.id)
    }

    if (!dbUser) {
      return NextResponse.json({ error: 'Could not resolve user' }, { status: 500 })
    }

    const now = new Date()

    // Independent reads — nothing here depends on anything else here.
    const [notes, academics, activeRaffle] = await Promise.all([
      prisma.note.findMany({
        relationLoadStrategy: 'join',
        where: { uploaderId: dbUser.id },
        select: MY_NOTE_SELECT,
        orderBy: { createdAt: 'desc' },
      }),

      cached('bootstrap:academics', CATALOGUE_TTL_MS, async () => {
        const [departments, courses, professors, semesters] = await Promise.all([
          prisma.department.findMany({ orderBy: { name: 'asc' } }),
          prisma.course.findMany({
            select: { id: true, name: true, code: true, departmentId: true, professorId: true },
          }),
          prisma.professor.findMany(),
          prisma.semester.findMany({ orderBy: [{ year: 'desc' }, { name: 'asc' }] }),
        ])
        return {
          departments,
          courses,
          professors,
          semesters: semesters.map((s) => ({ ...s, name: `${s.name} ${s.year}` })),
        }
      }),

      prisma.raffle.findFirst({
        relationLoadStrategy: 'join',
        where: { startTime: { lte: now }, endTime: { gte: now } },
        include: { raffle_prizes: true, _count: { select: { entries: true } } },
        orderBy: { startTime: 'desc' },
      }),
    ])

    // Averages in memory — one pass, no extra queries.
    const notesWithRatings = shapeMyNotes(notes)

    return NextResponse.json({
      user: dbUser,
      role: dbUser.role,
      notes: notesWithRatings,
      academics,
      activeRaffle,
    })
  } catch (error) {
    console.error('Bootstrap failed:', error)
    return NextResponse.json({ error: 'Failed to load' }, { status: 500 })
  }
}
