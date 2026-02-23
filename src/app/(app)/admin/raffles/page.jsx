"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, Plus, Ticket } from "lucide-react"
import RaffleForm from "@/components/Admin/RaffleForm"

function getStatusBadge(status) {
  switch (status) {
    case "Active":
      return (
        <Badge className="bg-green-500/15 text-green-700 dark:text-green-400 hover:bg-green-500/20 border-green-500/20">
          {status}
        </Badge>
      )
    case "Upcoming":
      return <Badge variant="outline">{status}</Badge>
    case "Past":
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function AdminRafflesPage() {
  const [raffles, setRaffles] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingRaffle, setEditingRaffle] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: null,
    raffleId: null,
    raffleName: "",
  })

  const [actionLoading, setActionLoading] = useState({})

  const fetchRaffles = async () => {
    setLoading(true)
    const res = await fetch("/api/raffles")
    const data = await res.json()
    setRaffles(data.raffles || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchRaffles()
  }, [])

  const handleFormSubmit = () => {
    fetchRaffles()
    setIsFormOpen(false)
    setEditingRaffle(null)
  }

  const openDrawDialog = (raffle) => {
    setConfirmDialog({
      open: true,
      type: "draw",
      raffleId: raffle.id,
      raffleName: raffle.title,
    })
  }

  const openDeleteDialog = (raffle) => {
    setConfirmDialog({
      open: true,
      type: "delete",
      raffleId: raffle.id,
      raffleName: raffle.title,
    })
  }

  const closeDialog = () => {
    setConfirmDialog({ open: false, type: null, raffleId: null, raffleName: "" })
  }

  const handleConfirmAction = async () => {
    const { type, raffleId } = confirmDialog
    closeDialog()

    setActionLoading((prev) => ({ ...prev, [raffleId]: type }))

    if (type === "draw") {
      await fetch(`/api/raffles/${raffleId}/draw`, { method: "POST" })
    } else if (type === "delete") {
      await fetch(`/api/raffles/${raffleId}`, { method: "DELETE" })
    }

    setActionLoading((prev) => ({ ...prev, [raffleId]: null }))
    fetchRaffles()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-6">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Raffles</h1>
            <p className="text-muted-foreground mt-1">
              Create, edit, and draw winners for raffles.
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingRaffle(null)
              setIsFormOpen((prev) => !prev)
            }}
            className="gap-2 self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            {isFormOpen ? "Cancel" : "Create New Raffle"}
          </Button>
        </div>

        {/* Create / Edit form */}
        {isFormOpen && (
          <RaffleForm
            raffle={editingRaffle}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setIsFormOpen(false)
              setEditingRaffle(null)
            }}
          />
        )}

        {/* Raffles table wrapped in a Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">All Raffles</CardTitle>
              {!loading && (
                <CardDescription>
                  {raffles.length} raffle{raffles.length !== 1 ? "s" : ""} total
                </CardDescription>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="space-y-3 p-6">
                {/* Skeleton header row */}
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-32 ml-auto" />
                </div>
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="flex gap-4 items-center py-2 border rounded-md px-3"
                  >
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-4 w-10" />
                    <div className="flex gap-2 ml-auto">
                      <Skeleton className="h-8 w-12" />
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            ) : raffles.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                <Ticket className="h-12 w-12 text-muted-foreground" />
                <div>
                  <p className="text-lg font-semibold">No raffles yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create your first raffle to get started.
                  </p>
                </div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Entries</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {raffles.map((raffle) => {
                    const now = new Date()
                    const startTime = new Date(raffle.startTime)
                    const endTime = new Date(raffle.endTime)
                    const status =
                      now < startTime
                        ? "Upcoming"
                        : now > endTime
                        ? "Past"
                        : "Active"
                    const rowLoading = actionLoading[raffle.id]

                    return (
                      <TableRow key={raffle.id}>
                        <TableCell className="font-medium">
                          {raffle.title}
                        </TableCell>
                        <TableCell>{getStatusBadge(status)}</TableCell>
                        <TableCell>{raffle._count.entries}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditingRaffle(raffle)
                                setIsFormOpen(true)
                              }}
                              disabled={!!rowLoading}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openDrawDialog(raffle)}
                              disabled={status !== "Past" || !!rowLoading}
                            >
                              {rowLoading === "draw" ? (
                                <>
                                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                  Drawing...
                                </>
                              ) : (
                                "Draw Winners"
                              )}
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => openDeleteDialog(raffle)}
                              disabled={!!rowLoading}
                            >
                              {rowLoading === "delete" ? (
                                <>
                                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                  Deleting...
                                </>
                              ) : (
                                "Delete"
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onOpenChange={(open) => !open && closeDialog()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmDialog.type === "draw" ? "Draw Winners" : "Delete Raffle"}
            </DialogTitle>
            <DialogDescription>
              {confirmDialog.type === "draw"
                ? `Are you sure you want to draw winners for "${confirmDialog.raffleName}"? This action cannot be undone.`
                : `Are you sure you want to delete "${confirmDialog.raffleName}"? This action cannot be undone.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmAction}>
              {confirmDialog.type === "draw" ? "Draw Winners" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
