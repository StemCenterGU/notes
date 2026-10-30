import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthedUser } from '@/lib/auth'
import { cached } from '@/lib/ttl-cache'
import { TUTOR_LEVEL_ROLES } from '@/lib/roles'
import { cursorWhere, CURSOR_ORDER, buildPage, parsePageSize } from '@/lib/pagination'

export const dynamic = 'force-dynamic'

const FILTER_TTL_MS = 60_000

/**
 * Paginated, server-filtered note feed.
 *
 * Filtering and search run in SQL. They used to run in the browser over the
 * full table, which meant shipping every note on every page load — 20k notes
 * measured at 22 MB and 9 s before this was fixed.
 */
export async function GET(req) {
  const { authUser, dbUser } = await getAuthedUser()

  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!dbUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const isTutorLevel = TUTOR_LEVEL_ROLES.includes(dbUser.role)
  const isStudent = dbUser.role === 'STUDENT'

  if (!isTutorLevel && !isStudent) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const pageSize = parsePageSize(searchParams.get('limit'))
  const cursor = searchParams.get('cursor')
  const q = (searchParams.get('q') || '').trim()
  const courses = searchParams.getAll('course').filter(Boolean)
  const professors = searchParams.getAll('professor').filter(Boolean)
  const semesters = searchParams.getAll('semester').filter(Boolean)
  const verifiedOnly = searchParams.get('verified') === '1'

  const and = []

  // Students only ever see public, approved notes.
  if (isStudent) and.push({ isPublic: true, status: 'APPROVED' })
  if (verifiedOnly) and.push({ isVerified: true })
  if (courses.length) and.push({ course: { name: { in: courses } } })
  if (professors.length) and.push({ course: { professor: { name: { in: professors } } } })

  if (semesters.length) {
    // Filter values arrive as "Fall 2026"; the column pair is (name, year).
    const pairs = semesters
      .map((s) => {
        const m = /^(.*)\s+(\d{4})$/.exec(s)
        return m ? { name: m[1], year: Number(m[2]) } : null
      })
      .filter(Boolean)
    if (pairs.length) and.push({ OR: pairs.map((p) => ({ semester: p })) })
  }

  if (q) {
    and.push({
      OR: [
        { title: { contains: q, mode: 'insensitive' } },
        { course: { code: { contains: q, mode: 'insensitive' } } },
        { course: { name: { contains: q, mode: 'insensitive' } } },
      ],
    })
  }

  const after = cursorWhere(cursor)
  if (after) and.push(after)

  try {
    const rows = await prisma.note.findMany({
      relationLoadStrategy: 'join',
      where: and.length ? { AND: and } : {},
      // One extra row tells us whether another page exists, without a COUNT.
      take: pageSize + 1,
      orderBy: CURSOR_ORDER,
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        status: true,
        isPublic: true,
        isVerified: true,
        fileType: true,
        course: { select: { code: true, name: true, professor: { select: { name: true } } } },
        semester: { select: { name: true, year: true } },
        uploader: { select: { name: true } },
        reviews: { select: { rating: true } },
        noteTags: { select: { tag: { select: { id: true, name: true } } } },
      },
    })

    const { items, nextCursor, hasMore } = buildPage(rows, pageSize)

    const notes = items.map((note) => {
      const ratings = note.reviews.map((r) => r.rating)
      const { reviews, ...rest } = note
      return {
        ...rest,
        reviewCount: ratings.length,
        averageRating: ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0,
      }
    })

    // The catalogue barely changes, and is only needed for the filter menus.
    const filterOptions = await cached('explore:filters', FILTER_TTL_MS, async () => {
      const [c, p, s] = await Promise.all([
        prisma.course.findMany({ distinct: ['name'], select: { name: true } }),
        prisma.professor.findMany({ distinct: ['name'], select: { name: true } }),
        prisma.semester.findMany({
          distinct: ['name', 'year'],
          select: { name: true, year: true },
          orderBy: [{ year: 'desc' }, { name: 'asc' }],
        }),
      ])
      return {
        courses: c.map((x) => x.name),
        professors: p.map((x) => x.name),
        semesters: s.map((x) => `${x.name} ${x.year}`),
      }
    })

    return NextResponse.json({ notes, nextCursor, hasMore, filterOptions })
  } catch (error) {
    console.error('Failed to fetch explore notes:', error)
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
  }
}
