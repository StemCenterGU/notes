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
      select: { role: true },
    })

    if (!dbUser) {
      // This can happen if the user is new and hasn't been initialized yet.
      // The middleware will let them pass, and the init-user route will create them.
      return NextResponse.json({ role: null })
    }

    return NextResponse.json({ role: dbUser.role })
  } catch (error) {
    console.error('Failed to get user role:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
