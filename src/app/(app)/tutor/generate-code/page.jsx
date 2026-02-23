'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Copy, Clock, FileText, Check, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function GenerateCodePage() {
  const { user, isLoading: authLoading } = useUser()
  const router = useRouter()

  const [notes, setNotes] = useState([])
  const [selectedNotes, setSelectedNotes] = useState([])
  const [durationType, setDurationType] = useState('duration')
  const [duration, setDuration] = useState(30)
  const [endTime, setEndTime] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCode, setGeneratedCode] = useState(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      const res = await fetch('/api/notes/explore')
      if (res.ok) {
        const data = await res.json()
        setNotes(data.notes || [])
      }
    } catch (err) {
      console.error('Failed to fetch notes:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleNote = (noteId) => {
    setSelectedNotes(prev =>
      prev.includes(noteId)
        ? prev.filter(id => id !== noteId)
        : [...prev, noteId]
    )
  }

  const handleGenerate = async () => {
    if (selectedNotes.length === 0) {
      setError('Please select at least one note')
      return
    }

    setError('')
    setIsGenerating(true)

    try {
      const body = {
        noteIds: selectedNotes,
        durationType,
      }

      if (durationType === 'duration') {
        body.duration = parseInt(duration)
      } else {
        body.expiresAt = new Date(endTime).toISOString()
      }

      const res = await fetch('/api/access-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to generate code')
        return
      }

      setGeneratedCode(data)
    } catch (err) {
      setError('Failed to generate code')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyCode = () => {
    if (generatedCode?.code) {
      navigator.clipboard.writeText(generatedCode.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.course?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <Skeleton className="h-7 w-52" />
              <Skeleton className="h-4 w-80 mt-1" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Skeleton className="h-5 w-32 mb-3" />
                <Card className="border-dashed">
                  <CardContent className="p-3 space-y-3">
                    <Skeleton className="h-10 w-full" />
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-14 w-full rounded-md" />
                    ))}
                  </CardContent>
                </Card>
              </div>
              <Skeleton className="h-px w-full" />
              <div>
                <Skeleton className="h-5 w-36 mb-3" />
                <div className="flex gap-2 mb-3">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-32" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-px w-full" />
              <Skeleton className="h-11 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (generatedCode) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-md mx-auto space-y-4">
          <Card className="border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20">
            <CardContent className="pt-6 text-center">
              <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3 w-fit mx-auto mb-4">
                <Check className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-sm text-muted-foreground">Access Code Generated</p>
              <p className="text-4xl font-mono font-bold tracking-wider my-4">{generatedCode.code}</p>

              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>Expires {new Date(generatedCode.expiresAt).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4" />
                  <span>{generatedCode.noteCount} note(s)</span>
                </div>
              </div>

              <Button onClick={copyCode} className="w-full transition-all duration-200">
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Code
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 transition-colors duration-200"
              onClick={() => setGeneratedCode(null)}
            >
              Generate Another
            </Button>
            <Button
              variant="outline"
              className="flex-1 transition-colors duration-200"
              asChild
            >
              <Link href="/tutor/codes">Manage Codes</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generate Access Code</CardTitle>
                <CardDescription>Create a temporary code for students to access specific notes</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/tutor/codes">
                  <ArrowLeft className="mr-1.5 h-4 w-4" />
                  My Codes
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Select Notes */}
            <div>
              <h3 className="font-medium mb-3">1. Select Notes</h3>
              <Card className="border-dashed">
                <CardContent className="p-3 space-y-3">
                  <Input
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
                    {filteredNotes.length === 0 ? (
                      <p className="text-center text-muted-foreground py-6 text-sm">No notes found</p>
                    ) : (
                      filteredNotes.map(note => (
                        <div
                          key={note.id}
                          className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors duration-150 ${
                            selectedNotes.includes(note.id)
                              ? 'bg-primary/10 border border-primary'
                              : 'hover:bg-muted border border-transparent'
                          }`}
                          onClick={() => toggleNote(note.id)}
                        >
                          <Checkbox
                            checked={selectedNotes.includes(note.id)}
                            onChange={() => {}}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{note.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {note.course?.name} {note.fileType ? `• ${note.fileType.toUpperCase()}` : ''}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground pt-1">
                    {selectedNotes.length} note(s) selected
                  </p>
                </CardContent>
              </Card>
            </div>

            <Separator />

            {/* Step 2: Set Duration */}
            <div>
              <h3 className="font-medium mb-3">2. Access Duration</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Button
                    variant={durationType === 'duration' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setDurationType('duration')}
                    className="transition-colors duration-150"
                  >
                    Set Duration
                  </Button>
                  <Button
                    variant={durationType === 'endTime' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setDurationType('endTime')}
                    className="transition-colors duration-150"
                  >
                    Set End Time
                  </Button>
                </div>

                {durationType === 'duration' ? (
                  <div className="space-y-3">
                    <Label>Duration (minutes)</Label>
                    <div className="flex flex-wrap gap-2">
                      {[15, 30, 60, 120].map(mins => (
                        <Button
                          key={mins}
                          variant={duration === mins ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setDuration(mins)}
                          className="transition-colors duration-150"
                        >
                          {mins} min
                        </Button>
                      ))}
                    </div>
                    <Input
                      type="number"
                      min="1"
                      max="480"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="Custom duration in minutes"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label>End Time</Label>
                    <Input
                      type="datetime-local"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      min={new Date().toISOString().slice(0, 16)}
                    />
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || selectedNotes.length === 0}
              className="w-full h-11 transition-all duration-200"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Access Code'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
