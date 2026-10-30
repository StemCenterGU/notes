'use client'

import { createContext, useContext, useEffect, useState, useMemo, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

const AuthContext = createContext({
  user: null,
  role: null,
  isLoading: true,
  error: null,
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const supabase = useMemo(() => createClient(), [])

  // The id we have already resolved a role for. onAuthStateChange fires an
  // INITIAL_SESSION event on mount that duplicates the /api/auth/me call
  // below; without this guard the dashboard issued /api/auth/get-role twice
  // on every single page load, for an answer it already had.
  const resolvedFor = useRef(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        // One request resolves the session AND the role.
        const res = await fetch('/api/auth/me')
        if (cancelled) return

        if (res.ok) {
          const { user, role } = await res.json()
          setUser(user)
          setRole(role)
          resolvedFor.current = user?.id ?? null
        } else {
          setUser(null)
          setRole(null)
          resolvedFor.current = null
        }
      } catch (err) {
        if (!cancelled) setError(err)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    load()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const nextUser = session?.user ?? null
      setUser(nextUser)

      if (!nextUser) {
        setRole(null)
        resolvedFor.current = null
        setIsLoading(false)
        return
      }

      // Already have this user's role (including from the fetch above, and
      // from token refreshes, which do not change who you are).
      if (resolvedFor.current === nextUser.id) {
        setIsLoading(false)
        return
      }

      try {
        const res = await fetch('/api/auth/get-role')
        if (res.ok) {
          const data = await res.json()
          setRole(data.role)
          resolvedFor.current = nextUser.id
        }
      } catch (err) {
        console.error('Failed to fetch role:', err)
      } finally {
        setIsLoading(false)
      }
    })

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [supabase])

  const value = useMemo(() => ({ user, role, isLoading, error }), [user, role, isLoading, error])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useUser = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useUser must be used within an AuthProvider')
  }
  return context
}
