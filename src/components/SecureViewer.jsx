'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Clock, AlertTriangle, Eye, EyeOff } from 'lucide-react'

export default function SecureViewer({ token, noteId, onExpire }) {
  const router = useRouter()
  const [content, setContent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isBlurred, setIsBlurred] = useState(false)
  const [remainingTime, setRemainingTime] = useState(null)
  const [watermark, setWatermark] = useState(null)

  // Fetch protected content
  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch(`/api/access-codes/view/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) {
        const data = await res.json()
        if (res.status === 403 || res.status === 401) {
          onExpire?.(data.error)
          return
        }
        setError(data.error || 'Failed to load content')
        return
      }

      const data = await res.json()
      setContent(data)
      setWatermark(data.watermark)
      setRemainingTime(data.remainingSeconds)
    } catch (err) {
      setError('Failed to load content')
    } finally {
      setIsLoading(false)
    }
  }, [noteId, token, onExpire])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  // Heartbeat every 30 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/access-codes/heartbeat', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) {
          const data = await res.json()
          onExpire?.(data.error)
          return
        }

        const data = await res.json()
        setRemainingTime(data.remainingSeconds)
      } catch (err) {
        console.error('Heartbeat failed:', err)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [token, onExpire])

  // Countdown timer
  useEffect(() => {
    if (remainingTime === null) return

    const interval = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          onExpire?.('Session expired')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [remainingTime, onExpire])

  // Disable copy/paste/screenshot
  useEffect(() => {
    const prevent = (e) => e.preventDefault()

    // Disable right-click
    document.addEventListener('contextmenu', prevent)
    // Disable copy
    document.addEventListener('copy', prevent)
    // Disable cut
    document.addEventListener('cut', prevent)
    // Disable text selection
    document.addEventListener('selectstart', prevent)
    // Disable drag
    document.addEventListener('dragstart', prevent)

    // Block keyboard shortcuts
    const blockKeys = (e) => {
      // Ctrl+S, Ctrl+P, Ctrl+C, Ctrl+U, Ctrl+Shift+I, F12
      if (
        (e.ctrlKey && ['s', 'p', 'c', 'u'].includes(e.key.toLowerCase())) ||
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') ||
        e.key === 'F12' ||
        e.key === 'PrintScreen'
      ) {
        e.preventDefault()
        return false
      }
    }
    document.addEventListener('keydown', blockKeys)

    return () => {
      document.removeEventListener('contextmenu', prevent)
      document.removeEventListener('copy', prevent)
      document.removeEventListener('cut', prevent)
      document.removeEventListener('selectstart', prevent)
      document.removeEventListener('dragstart', prevent)
      document.removeEventListener('keydown', blockKeys)
    }
  }, [])

  // Blur on tab switch
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsBlurred(document.hidden)
    }

    const handleBlur = () => setIsBlurred(true)
    const handleFocus = () => setIsBlurred(false)

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('blur', handleBlur)
    window.addEventListener('focus', handleFocus)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-red-600">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
          <p>{error}</p>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    if (!content) return null

    const dataUrl = `data:${content.mimeType};base64,${content.content}`

    // Render based on file type
    if (content.mimeType?.startsWith('image/')) {
      return (
        <img
          src={dataUrl}
          alt={content.title}
          className="max-w-full max-h-full object-contain"
          draggable="false"
        />
      )
    }

    if (content.mimeType === 'application/pdf') {
      // For PDFs, we embed but with restrictions
      return (
        <iframe
          src={`${dataUrl}#toolbar=0&navpanes=0&scrollbar=1`}
          className="w-full h-full"
          style={{ border: 'none' }}
          sandbox="allow-same-origin"
        />
      )
    }

    // For other types, show a message
    return (
      <div className="text-center text-muted-foreground">
        <p>This file type cannot be previewed securely.</p>
        <p className="text-sm">File: {content.title}</p>
      </div>
    )
  }

  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Timer */}
      <div className="absolute top-4 right-4 z-40 bg-background/90 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
        <Clock className="h-4 w-4" />
        <span className={`font-mono ${remainingTime < 60 ? 'text-red-600' : ''}`}>
          {formatTime(remainingTime || 0)}
        </span>
      </div>

      {/* Blur overlay when tab is inactive */}
      {isBlurred && (
        <div className="absolute inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center">
          <div className="text-center">
            <EyeOff className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Content Hidden</h2>
            <p className="text-muted-foreground">Click here to view the notes</p>
          </div>
        </div>
      )}

      {/* Watermark overlay */}
      {watermark && (
        <div
          className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
          style={{ opacity: 0.15 }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 100px,
                transparent 100px,
                transparent 200px
              )`,
            }}
          >
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute text-sm font-mono whitespace-nowrap"
                style={{
                  transform: 'rotate(-30deg)',
                  left: `${(i % 5) * 25 - 10}%`,
                  top: `${Math.floor(i / 5) * 25}%`,
                }}
              >
                {watermark.email} | {watermark.code} | {new Date(watermark.timestamp).toLocaleTimeString()}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="h-full flex items-center justify-center p-4 select-none">
        {renderContent()}
      </div>
    </div>
  )
}
