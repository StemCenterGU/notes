'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUser } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Loader2, KeyRound, AlertCircle } from 'lucide-react'
import Link from 'next/link'

function AccessCodeContent() {
  const { user, isLoading: authLoading } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [isValidating, setIsValidating] = useState(false)
  const [error, setError] = useState('')
  const inputRefs = useRef([])

  const expired = searchParams.get('expired') === 'true'

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/access')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (expired) {
      setError('Your session has expired')
    }
  }, [expired])

  const handleChange = (index, value) => {
    if (value.length > 1) {
      // Handle paste
      const digits = value.replace(/\D/g, '').slice(0, 6).split('')
      const newCode = [...code]
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newCode[index + i] = digit
        }
      })
      setCode(newCode)
      const lastIndex = Math.min(index + digits.length, 5)
      inputRefs.current[lastIndex]?.focus()
    } else {
      const newCode = [...code]
      newCode[index] = value.replace(/\D/g, '')
      setCode(newCode)
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
    setError('')
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const fullCode = code.join('')
    if (fullCode.length !== 6) {
      setError('Please enter a 6-digit code')
      return
    }

    setIsValidating(true)
    setError('')

    try {
      const res = await fetch('/api/access-codes/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: fullCode }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Invalid code')
        return
      }

      // Store session token and redirect to secure viewer
      sessionStorage.setItem('accessToken', data.sessionToken)
      sessionStorage.setItem('accessNotes', JSON.stringify(data.notes))
      sessionStorage.setItem('accessExpiry', data.expiresAt)

      router.push('/access/view')
    } catch (err) {
      setError('Failed to validate code')
    } finally {
      setIsValidating(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <KeyRound className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Enter Access Code</CardTitle>
          <CardDescription>
            Enter the 6-digit code provided by your tutor to view the notes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-2">
              {code.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-2xl font-mono"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm justify-center">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isValidating || code.some(d => !d)}
            >
              {isValidating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Validating...
                </>
              ) : (
                'Access Notes'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Need a code? Visit the STEM Center and ask a tutor.</p>
            <Link href="/dashboard" className="text-primary hover:underline mt-2 inline-block">
              Back to Dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AccessCodePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <AccessCodeContent />
    </Suspense>
  )
}
