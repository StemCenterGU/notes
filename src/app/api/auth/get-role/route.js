import { NextResponse } from 'next/server'
import { getAuthedUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { authUser, dbUser } = await getAuthedUser()

  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // A brand-new user has no row yet; init-user creates it on first load.
  return NextResponse.json({ role: dbUser?.role ?? null })
}
