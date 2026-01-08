'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Copy, Clock, FileText, Check, Loader2 } from 'lucide-react'

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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Generate Access Code</h1>
          <Button variant="outline" onClick={() => router.push('/tutor/codes')}>
            View My Codes
          </Button>
        </div>

        {generatedCode ? (
          <Card className="border-green-500">
            <CardHeader>
              <CardTitle className="text-green-600">Code Generated!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Share this code with the student:</p>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-6xl font-mono font-bold tracking-widest">
                    {generatedCode.code}
                  </span>
                  <Button size="icon" variant="outline" onClick={copyCode}>
                    {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Expires: {new Date(generatedCode.expiresAt).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>{generatedCode.noteCount} note(s) included</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setGeneratedCode(null)} className="flex-1">
                  Generate Another
                </Button>
                <Button variant="outline" onClick={() => router.push('/tutor/codes')} className="flex-1">
                  Manage Codes
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Note Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className="max-h-64 overflow-y-auto space-y-2 border rounded-md p-2">
                  {filteredNotes.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">No notes found</p>
                  ) : (
                    filteredNotes.map(note => (
                      <div
                        key={note.id}
                        className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${
                          selectedNotes.includes(note.id)
                            ? 'bg-primary/10 border border-primary'
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => toggleNote(note.id)}
                      >
                        <Checkbox
                          checked={selectedNotes.includes(note.id)}
                          onChange={() => {}}
                        />
                        <div className="flex-1">
                          <p className="font-medium">{note.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {note.course?.name} • {note.fileType?.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <p className="text-sm text-muted-foreground">
                  {selectedNotes.length} note(s) selected
                </p>
              </CardContent>
            </Card>

            {/* Time Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Access Duration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Button
                    variant={durationType === 'duration' ? 'default' : 'outline'}
                    onClick={() => setDurationType('duration')}
                  >
                    Set Duration
                  </Button>
                  <Button
                    variant={durationType === 'endTime' ? 'default' : 'outline'}
                    onClick={() => setDurationType('endTime')}
                  >
                    Set End Time
                  </Button>
                </div>

                {durationType === 'duration' ? (
                  <div className="space-y-2">
                    <Label>Duration (minutes)</Label>
                    <div className="flex gap-2">
                      {[15, 30, 60, 120].map(mins => (
                        <Button
                          key={mins}
                          variant={duration === mins ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setDuration(mins)}
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
              </CardContent>
            </Card>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || selectedNotes.length === 0}
              className="w-full"
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
          </>
        )}
      </div>
    </div>
  )
}
