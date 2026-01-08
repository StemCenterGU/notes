// src/lib/supabase-admin.js
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_PROJECT_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    'Missing env vars: NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_PROJECT_URL) and/or SUPABASE_SERVICE_ROLE_KEY'
  )
}

export const supabaseAdmin = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Admin function to search users (replacement for Auth0 Management API)
export async function searchSupabaseUsers(emailQuery) {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 50,
    })

    if (error) throw error

    // Filter by email query (Supabase doesn't have built-in email search)
    const filteredUsers = data.users.filter(user =>
      user.email?.toLowerCase().includes(emailQuery.toLowerCase())
    )

    return filteredUsers
  } catch (error) {
    console.error('Failed to search users in Supabase:', error)
    return []
  }
}
