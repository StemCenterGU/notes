import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { invalidateUser, getAuthedUser } from '@/lib/auth'
import { cursorWhere, CURSOR_ORDER, buildPage, parsePageSize } from '@/lib/pagination'

// GET /api/admin/users?search=... - Fetches users for the admin dashboard
export async function GET(req) {
  const { authUser, dbUser } = await getAuthedUser()

  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (dbUser?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const searchQuery = (searchParams.get('search') || '').trim()
  const pageSize = parsePageSize(searchParams.get('limit'))
  const cursor = searchParams.get('cursor')

  const and = []
  if (searchQuery) {
    and.push({
      OR: [
        { name: { contains: searchQuery, mode: 'insensitive' } },
        { email: { contains: searchQuery, mode: 'insensitive' } },
      ],
    })
  }
  const after = cursorWhere(cursor)
  if (after) and.push(after)

  try {
    const [rows, grouped] = await Promise.all([
      prisma.user.findMany({
        where: and.length ? { AND: and } : {},
        take: pageSize + 1,
        orderBy: CURSOR_ORDER,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          kudosPoints: true,
        },
      }),
      // Role headcounts from the database — the page used to count a full
      // download of every user row.
      prisma.user.groupBy({ by: ['role'], _count: { _all: true } }),
    ])

    const { items, nextCursor, hasMore } = buildPage(rows, pageSize)
    const counts = Object.fromEntries(grouped.map((g) => [g.role, g._count._all]))

    return NextResponse.json({ users: items, nextCursor, hasMore, counts })
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

// PUT /api/admin/users - Updates a user's role
export async function PUT(req) {
  const { authUser, dbUser } = await getAuthedUser()

  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (dbUser?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const { userId, role } = await req.json()
    if (!userId || !role) {
      return NextResponse.json({ error: 'Missing userId or role' }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
    })

    // Drop the cached row immediately — a role change must take effect on the
    // user's very next request, not whenever the TTL happens to lapse.
    invalidateUser(updatedUser.supabaseId)

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Failed to update user role:', error)
    return NextResponse.json({ error: 'Failed to update user role' }, { status: 500 })
  }
}
