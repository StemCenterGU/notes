import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_APP_URL is not defined')
  }

  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  return NextResponse.redirect(`${baseUrl}/`, {
    status: 302,
  })
}
