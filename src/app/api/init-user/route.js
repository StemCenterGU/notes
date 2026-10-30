import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { invalidateUser, getAuthedUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'

/**
 * Make sure the signed-in Supabase user has a row in our own user table.
 *
 * /api/bootstrap does this too, as part of the dashboard's first load. This
 * endpoint stays for callers that only need the row created (and for a client
 * that lands somewhere other than the dashboard first).
 */
export async function GET() {
  const { authUser, dbUser } = await getAuthedUser()

  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (dbUser) {
    return NextResponse.json({ user: dbUser })
  }

  try {
    const created = await prisma.user.create({
      data: {
        supabaseId: authUser.id,
        email: authUser.email,
        name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0],
        role: 'STUDENT',
        kudosPoints: 0,
      },
    })

    // The cache may hold a null for this id from a moment ago.
    invalidateUser(authUser.id)

    return NextResponse.json({ user: created })
  } catch (error) {
    // Raced with another request (or bootstrap) that created the row first.
    if (error.code === 'P2002') {
      const existing = await prisma.user.findUnique({ where: { email: authUser.email } })
      invalidateUser(authUser.id)
      return NextResponse.json({ user: existing })
    }

    console.error('Error initializing user:', error)
    return NextResponse.json({
      error: 'Failed to initialize user',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    }, { status: 500 })
  }
}
