import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthedUser } from '@/lib/auth'
import { SUPERVISOR_ROLES } from '@/lib/roles'
import { cursorWhere, CURSOR_ORDER, buildPage, parsePageSize } from '@/lib/pagination'

export const dynamic = 'force-dynamic'

const STATUSES = ['UNREVIEWED', 'APPROVED', 'REJECTED']

/**
 * The review queue: paginated, filtered and counted in SQL.
 *
 * Also returns per-status totals so the tabs can show counts without pulling
 * every row down to count them in the browser.
 */
export async function GET(req) {
  const { authUser, dbUser } = await getAuthedUser()

  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!dbUser || !SUPERVISOR_ROLES.includes(dbUser.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const pageSize = parsePageSize(searchParams.get('limit'))
  const cursor = searchParams.get('cursor')
  const q = (searchParams.get('q') || '').trim()
  const status = searchParams.get('status')

  const and = []
  if (status && STATUSES.includes(status)) and.push({ status })
  if (q) {
    and.push({
      OR: [
        { title: { contains: q, mode: 'insensitive' } },
        { course: { code: { contains: q, mode: 'insensitive' } } },
      ],
    })
  }
  const after = cursorWhere(cursor)
  if (after) and.push(after)

  try {
    const [rows, grouped] = await Promise.all([
      prisma.note.findMany({
        relationLoadStrategy: 'join',
        where: and.length ? { AND: and } : {},
        take: pageSize + 1,
        orderBy: CURSOR_ORDER,
        select: {
          id: true,
          title: true,
          createdAt: true,
          status: true,
          isPublic: true,
          isVerified: true,
          uploader: { select: { name: true } },
          course: { select: { name: true, code: true } },
          noteTags: { select: { tag: { select: { id: true, name: true } } } },
        },
      }),
      // Counts come from the database, not from counting a downloaded array.
      prisma.note.groupBy({ by: ['status'], _count: { _all: true } }),
    ])

    const { items, nextCursor, hasMore } = buildPage(rows, pageSize)

    const counts = { all: 0 }
    for (const s of STATUSES) counts[s] = 0
    for (const g of grouped) {
      counts[g.status] = g._count._all
      counts.all += g._count._all
    }

    return NextResponse.json({ notes: items, nextCursor, hasMore, counts })
  } catch (error) {
    console.error('Failed to fetch notes for management:', error)
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
  }
}
