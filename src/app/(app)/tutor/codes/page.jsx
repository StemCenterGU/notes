'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Loader2,
  Plus,
  Copy,
  Trash2,
  Check,
  Clock,
  User,
  FileText,
  AlertCircle,
} from 'lucide-react'

export default function ManageCodesPage() {
  const { user, isLoading: authLoading } = useUser()
  const router = useRouter()

  const [codes, setCodes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [copiedId, setCopiedId] = useState(null)
  const [revokingId, setRevokingId] = useState(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    fetchCodes()
  }, [])

  const fetchCodes = async () => {
    try {
      const res = await fetch('/api/access-codes')
      if (res.ok) {
        const data = await res.json()
        setCodes(data.codes || [])
      }
    } catch (err) {
      console.error('Failed to fetch codes:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const revokeCode = async (id) => {
    if (!confirm('Are you sure you want to revoke this code? The student will lose access immediately.')) {
      return
    }

    setRevokingId(id)
    try {
      const res = await fetch(`/api/access-codes/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setCodes(prev =>
          prev.map(c => (c.id === id ? { ...c, isRevoked: true, status: 'revoked' } : c))
        )
      }
    } catch (err) {
      console.error('Failed to revoke code:', err)
    } finally {
      setRevokingId(null)
    }
  }

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      expired: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
      revoked: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Access Codes</h1>
            <p className="text-muted-foreground">Manage and track access codes you've generated</p>
          </div>
          <Button onClick={() => router.push('/tutor/generate-code')}>
            <Plus className="h-4 w-4 mr-2" />
            Generate New Code
          </Button>
        </div>

        {codes.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No codes yet</h3>
              <p className="text-muted-foreground mb-4">
                Generate your first access code to share notes with students
              </p>
              <Button onClick={() => router.push('/tutor/generate-code')}>
                Generate Code
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {codes.map(code => (
                    <TableRow key={code.id}>
                      <TableCell>
                        <code className="font-mono text-lg font-bold">{code.code}</code>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{code.notes.length} note(s)</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(code.status)}</TableCell>
                      <TableCell>
                        {code.studentEmail ? (
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{code.studentEmail}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">Not used</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {new Date(code.createdAt).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {new Date(code.expiresAt).toLocaleString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyCode(code.code, code.id)}
                          >
                            {copiedId === code.id ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                          {code.status !== 'revoked' && code.status !== 'expired' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => revokeCode(code.id)}
                              disabled={revokingId === code.id}
                            >
                              {revokingId === code.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4 text-red-600" />
                              )}
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
