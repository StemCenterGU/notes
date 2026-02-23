"use client"

import { useState, useEffect, useCallback } from "react"
import { Loader2, Users, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function TutorsActivityPage() {
  const [tutors, setTutors] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTutors = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/lead-tutor/tutor-activity")
      if (res.ok) {
        const data = await res.json()
        setTutors(data.tutors || [])
      }
    } catch (error) {
      console.error("Failed to fetch tutor activity:", error)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchTutors()
  }, [fetchTutors])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Tutor Activity</h1>
        <Badge variant="secondary" className="text-sm">
          {tutors.length} tutor{tutors.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {tutors.length === 0 ? (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No tutors found.</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-center">Reviews</TableHead>
                <TableHead>Last Review</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tutors.map((tutor) => (
                <TableRow key={tutor.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {tutor.role === "LEAD_TUTOR" && (
                        <ShieldCheck className="h-4 w-4 text-primary" />
                      )}
                      {tutor.name || "Unnamed"}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {tutor.email}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={tutor.role === "LEAD_TUTOR" ? "default" : "secondary"}
                    >
                      {tutor.role === "LEAD_TUTOR" ? "Lead Tutor" : "Tutor"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-semibold">{tutor.reviewCount}</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {tutor.lastReviewDate
                      ? new Date(tutor.lastReviewDate).toLocaleDateString()
                      : "Never"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
