"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { FileText, Users, Eye, Clock, Loader2 } from "lucide-react"

export default function LeadTutorOverview() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [notesRes, tutorsRes] = await Promise.all([
          fetch("/api/lead-tutor/notes"),
          fetch("/api/lead-tutor/tutor-activity"),
        ])

        const notesData = notesRes.ok ? await notesRes.json() : { notes: [] }
        const tutorsData = tutorsRes.ok ? await tutorsRes.json() : { tutors: [] }

        const notes = notesData.notes || []
        const tutors = tutorsData.tutors || []

        setStats({
          pendingReviews: notes.filter((n) => n.status === "UNREVIEWED").length,
          totalNotes: notes.length,
          activeTutors: tutors.length,
          publicNotes: notes.filter((n) => n.isPublic).length,
        })
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      }
      setLoading(false)
    }
    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Pending Reviews",
      value: stats?.pendingReviews ?? "--",
      description: "Notes awaiting review",
      icon: Clock,
    },
    {
      title: "Total Notes",
      value: stats?.totalNotes ?? "--",
      description: "Across all courses",
      icon: FileText,
    },
    {
      title: "Active Tutors",
      value: stats?.activeTutors ?? "--",
      description: "Currently active",
      icon: Users,
    },
    {
      title: "Public Notes",
      value: stats?.publicNotes ?? "--",
      description: "Accessible to students",
      icon: Eye,
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Lead Tutor Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? (
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  ) : (
                    stat.value
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
