import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { cached } from '@/lib/ttl-cache'

export const dynamic = 'force-dynamic'

const TTL_MS = 60_000

/**
 * The four newest notes, for the signed-out marketing page.
 *
 * This endpoint takes no session, so it must only ever expose notes that are
 * already public: it previously returned the newest notes of ANY status, which
 * put unreviewed and rejected student work -- plus the storage path of every
 * file -- on the public home page.
 *
 * Selected fields are limited to what the card renders, for the same reason.
 */
export async function GET() {
  try {
    const notes = await cached('notes:recent', TTL_MS, () =>
      prisma.note.findMany({
        relationLoadStrategy: 'join',
        where: { isPublic: true, status: 'APPROVED' },
        take: 4,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          createdAt: true,
          isVerified: true,
          course: { select: { name: true } },
          semester: { select: { name: true, year: true } },
          noteTags: { select: { tag: { select: { id: true, name: true } } } },
        },
      })
    )

    return NextResponse.json({ notes })
  } catch (error) {
    console.error('Failed to fetch recent notes:', error)
    return NextResponse.json({ error: 'Failed to fetch recent notes' }, { status: 500 })
  }
}
