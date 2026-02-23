"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { FileText, Users, Eye, Clock } from "lucide-react"

const StatCardSkeleton = () => (
  <Card className="relative overflow-hidden">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-8 w-8 rounded-lg" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-9 w-16 mb-1" />
      <Skeleton className="h-3 w-32" />
    </CardContent>
  </Card>
)

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
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Management Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of notes, tutors, and review activity.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? [...Array(4)].map((_, i) => <StatCardSkeleton key={i} />)
          : statCards.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.title} className="relative overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
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
