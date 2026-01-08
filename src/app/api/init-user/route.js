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
    // Try to find the user in the database
    let dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id },
    })

    // If the user doesn't exist, create them
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          supabaseId: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || user.email?.split('@')[0],
          role: 'STUDENT', // Default role
          kudosPoints: 0,
        },
      })
    }

    return NextResponse.json({ user: dbUser })
  } catch (error) {
    console.error('Error initializing user:', error)
    return NextResponse.json({ error: 'Failed to initialize user' }, { status: 500 })
  }
}
