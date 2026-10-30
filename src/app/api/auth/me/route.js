import { NextResponse } from 'next/server'
import { getAuthedUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'

/** Session + role in one call, so the client shell needs a single hop. */
export async function GET() {
  const { authUser, dbUser } = await getAuthedUser()

  if (!authUser) {
    return NextResponse.json({ user: null, role: null }, { status: 200 })
  }

  return NextResponse.json({ user: authUser, role: dbUser?.role ?? null })
}
