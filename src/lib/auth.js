import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { cached, cacheDelete } from '@/lib/ttl-cache'

// getUser() is a network round-trip to Supabase Auth on every request (~300ms
// measured). The access token it validates is itself signed and lives for an
// hour, so holding the verified result for a few seconds costs nothing in
// practice and removes that round-trip from the hot path.
const AUTH_TTL_MS = 30_000
const DB_USER_TTL_MS = 30_000

/**
 * Resolve the caller once: the Supabase auth user and the matching row in our
 * own user table. Returns { authUser, dbUser } with either possibly null.
 */
export async function getAuthedUser() {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const token = session?.access_token
  if (!token) return { authUser: null, dbUser: null }

  // Key on the token: a different or refreshed token re-verifies.
  const authUser = await cached(`auth:${token}`, AUTH_TTL_MS, async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    return error ? null : user
  })

  if (!authUser) return { authUser: null, dbUser: null }

  const dbUser = await cached(`dbuser:${authUser.id}`, DB_USER_TTL_MS, () =>
    prisma.user.findUnique({ where: { supabaseId: authUser.id } })
  )

  return { authUser, dbUser }
}

/** Call after anything that changes a user row (role change, first sign-in). */
export function invalidateUser(supabaseId) {
  cacheDelete(`dbuser:${supabaseId}`)
}

/** Call after a role change when you only have our own user id. */
export function invalidateAllUsers() {
  cacheDelete('dbuser:')
}
