'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
} from 'lucide-react'
import Link from 'next/link'

const CodesTableSkeleton = () => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>
    </CardHeader>
    <CardContent className="p-0">
      <div className="px-4 pb-4 space-y-3 pt-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-32 flex-1" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-16 ml-auto" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

export default function ManageCodesPage() {
  const { user, isLoading: authLoading } = useUser()
  const router = useRouter()

  const [codes, setCodes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [copiedId, setCopiedId] = useState(null)
  const [revokingId, setRevokingId] = useState(null)
  const [pendingRevokeId, setPendingRevokeId] = useState(null)

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

  const handleRevokeClick = (id) => {
    setPendingRevokeId(id)
  }

  const handleConfirmRevoke = async () => {
    if (!pendingRevokeId) return

    const id = pendingRevokeId
    setPendingRevokeId(null)
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

  const handleCancelRevoke = () => {
    setPendingRevokeId(null)
  }

  const getStatusBadge = (status) => {
    const variantMap = {
      active: { variant: 'default', label: 'Active' },
      pending: { variant: 'secondary', label: 'Pending' },
      expired: { variant: 'outline', label: 'Expired' },
      revoked: { variant: 'destructive', label: 'Revoked' },
    }

    const config = variantMap[status] || variantMap.pending

    return (
      <Badge variant={config.variant}>
        {config.label}
      </Badge>
    )
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <CodesTableSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {codes.length === 0 ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Access Codes</CardTitle>
                  <CardDescription>Manage temporary note access for students</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/tutor/generate-code">
                    <Plus className="mr-2 h-4 w-4" />
                    Generate New Code
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No codes yet</h3>
              <p className="text-muted-foreground mb-4">
                Generate your first access code to share notes with students
              </p>
              <Button asChild>
                <Link href="/tutor/generate-code">Generate Code</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Access Codes</CardTitle>
                  <CardDescription>Manage temporary note access for students</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/tutor/generate-code">
                    <Plus className="mr-2 h-4 w-4" />
                    Generate New Code
                  </Link>
                </Button>
              </div>
            </CardHeader>
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
                        <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                          {code.code}
                        </span>
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
                              <Check className="h-4 w-4 text-emerald-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                          {code.status !== 'revoked' && code.status !== 'expired' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRevokeClick(code.id)}
                              disabled={revokingId === code.id}
                            >
                              {revokingId === code.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4 text-destructive" />
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

      {/* Revoke confirmation dialog */}
      <Dialog open={!!pendingRevokeId} onOpenChange={(open) => { if (!open) handleCancelRevoke() }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke Access Code</DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke this code? The student will lose access immediately.
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelRevoke}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmRevoke}>
              Revoke
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
