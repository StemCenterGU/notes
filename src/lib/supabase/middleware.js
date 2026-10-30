import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

/** Refresh this long before the access token actually expires. */
const REFRESH_WINDOW_SECONDS = 120

/**
 * Keep the Supabase session cookie fresh on page navigations.
 *
 * The obvious implementation calls `supabase.auth.getUser()` here, which is a
 * network round-trip to Supabase Auth *before any HTML is sent* -- measured at
 * ~1s of TTFB on every single page load, whether or not the token needed
 * refreshing.
 *
 * Access tokens are signed and last an hour, so almost every request arrives
 * with a token that is nowhere near expiry. `getSession()` reads it straight
 * out of the cookie with no network call, which is enough to answer the only
 * question this middleware actually has: does the token need renewing yet?
 *
 * This is deliberately NOT an authorization check. The claims read here are
 * unverified, and nothing downstream trusts them -- routes authorize through
 * getAuthedUser(), which verifies the token properly.
 */
export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Local cookie read, no network.
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return { supabase, user: null, response: supabaseResponse }
  }

  const secondsLeft = (session.expires_at ?? 0) - Math.floor(Date.now() / 1000)

  // Still comfortably valid: hand back the response without touching the
  // network. This is the case for essentially every request.
  if (secondsLeft > REFRESH_WINDOW_SECONDS) {
    return { supabase, user: session.user, response: supabaseResponse }
  }

  // Close to expiry (or past it): this call refreshes and rewrites the cookie.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return { supabase, user, response: supabaseResponse }
}
