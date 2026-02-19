import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_APP_URL is not defined')
  }

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

      return NextResponse.redirect(`${baseUrl}${next}`)
    }
  }

  return NextResponse.redirect(`${baseUrl}/login?error=auth_failed`)
}
