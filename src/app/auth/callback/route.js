import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Automatically create user in database if they don't exist
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const existingUser = await prisma.user.findUnique({
            where: { supabaseId: user.id },
          })

          if (!existingUser) {
            await prisma.user.create({
              data: {
                supabaseId: user.id,
                email: user.email,
                name: user.user_metadata?.full_name || user.email?.split('@')[0],
                role: 'STUDENT',
                kudosPoints: 0,
              },
            })
          }
        }
      } catch (dbError) {
        // Log error but don't block the redirect - user can be created later via init-user
        console.error('Error creating user in database:', dbError)
      }

      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
