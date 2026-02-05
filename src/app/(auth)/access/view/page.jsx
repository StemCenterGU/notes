'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Loader2, FileText, LogOut, AlertCircle } from 'lucide-react'
import SecureViewer from '@/components/SecureViewer'

export default function SecureViewPage() {
  const { user, isLoading: authLoading } = useUser()
  const router = useRouter()

  const [token, setToken] = useState(null)
  const [notes, setNotes] = useState([])
  const [selectedNoteId, setSelectedNoteId] = useState(null)
  const [expiresAt, setExpiresAt] = useState(null)
  const [error, setError] = useState('')

  // Add global styles to prevent selection and dragging (must be before conditional returns)
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      * {
        -webkit-touch-callout: none !important;
        -webkit-user-select: none !important;
        -khtml-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      img, iframe {
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
        pointer-events: auto !important;
      }
    `
    document.head.appendChild(style)
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  useEffect(() => {
    // Get session data from storage
    const storedToken = sessionStorage.getItem('accessToken')
    const storedNotes = sessionStorage.getItem('accessNotes')
    const storedExpiry = sessionStorage.getItem('accessExpiry')

    if (!storedToken || !storedNotes) {
      router.push('/access')
      return
    }

    // Check if expired
    if (storedExpiry && new Date(storedExpiry) < new Date()) {
      handleExpire('Session expired')
      return
    }

    setToken(storedToken)
    const parsedNotes = JSON.parse(storedNotes)
    setNotes(parsedNotes)
    setExpiresAt(storedExpiry)
    if (parsedNotes.length > 0) {
      setSelectedNoteId(parsedNotes[0].id)
    }
  }, [router])

  const handleExpire = (message) => {
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('accessNotes')
    sessionStorage.removeItem('accessExpiry')
    router.push(`/access?expired=true`)
  }

  const handleExit = () => {
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('accessNotes')
    sessionStorage.removeItem('accessExpiry')
    router.push('/dashboard')
  }

  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    router.push('/login?redirect=/access')
    return null
  }

  if (!token) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <span className="font-semibold">Secure Note Viewer</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleExit}>
          <LogOut className="h-4 w-4 mr-2" />
          Exit
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Note list */}
        <div className="w-64 border-r bg-muted/30 overflow-y-auto">
          <div className="p-3">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Available Notes</h3>
            <div className="space-y-1">
              {notes.map(note => (
                <button
                  key={note.id}
                  onClick={() => setSelectedNoteId(note.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedNoteId === note.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <p className="font-medium truncate">{note.title}</p>
                  <p className="text-xs opacity-70 uppercase">{note.fileType}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content area */}
        {selectedNoteId && (
          <SecureViewer
            token={token}
            noteId={selectedNoteId}
            onExpire={handleExpire}
          />
        )}
      </div>

      {/* Security notice */}
      <div className="px-4 py-1 border-t bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-xs flex items-center gap-2">
        <AlertCircle className="h-3 w-3" />
        <span>This content is protected. Copying, downloading, and screenshots are disabled.</span>
      </div>
    </div>
  )
}
