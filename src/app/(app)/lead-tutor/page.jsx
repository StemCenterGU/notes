"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { FileText, Users, Eye, Clock } from "lucide-react"

const stats = [
  {
    title: "Pending Reviews",
    value: "--",
    description: "Notes awaiting review",
    icon: Clock,
  },
  {
    title: "Total Notes",
    value: "--",
    description: "Across all courses",
    icon: FileText,
  },
  {
    title: "Active Tutors",
    value: "--",
    description: "Currently active",
    icon: Users,
  },
  {
    title: "Public Notes",
    value: "--",
    description: "Accessible to students",
    icon: Eye,
  },
]

export default function LeadTutorOverview() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Lead Tutor Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
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
                <div className="text-2xl font-bold">{stat.value}</div>
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
