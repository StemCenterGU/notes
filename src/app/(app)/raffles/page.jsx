"use client"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { Ticket, Trophy, Clock } from "lucide-react"

function RaffleCard({ raffle }) {
  return (
    <Card className="flex flex-col transition-all hover:shadow-md hover:-translate-y-0.5">
      <CardHeader>
        <CardTitle>{raffle.title}</CardTitle>
        <CardDescription>{raffle.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">
          {raffle.raffle_prizes.length} prize{raffle.raffle_prizes.length !== 1 ? "s" : ""} available.
        </p>
        <p className="text-sm text-muted-foreground">
          {raffle._count.entries} {raffle._count.entries === 1 ? "entry" : "entries"} so far.
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/raffles/${raffle.id}`} passHref>
          <Button>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

function RaffleSkeletonCard() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardContent className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-9 w-28" />
      </CardFooter>
    </Card>
  )
}

function EmptyTabState({ label, icon: Icon }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
      <Icon className="h-12 w-12 text-muted-foreground" />
      <div>
        <p className="text-lg font-semibold">No {label} raffles</p>
        <p className="text-sm text-muted-foreground mt-1">
          Check back later for {label.toLowerCase()} raffles.
        </p>
      </div>
    </div>
  )
}

const tabIcons = {
  active: Ticket,
  upcoming: Clock,
  past: Trophy,
}

export default function RafflesPage() {
  const [raffles, setRaffles] = useState({ active: [], upcoming: [], past: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRaffles = async (status) => {
      const res = await fetch(`/api/raffles?status=${status}`)
      const data = await res.json()
      return data.raffles || []
    }

    const loadAll = async () => {
      setLoading(true)
      const [active, upcoming, past] = await Promise.all([
        fetchRaffles("active"),
        fetchRaffles("upcoming"),
        fetchRaffles("past"),
      ])
      setRaffles({ active, upcoming, past })
      setLoading(false)
    }

    loadAll()
  }, [])

  const skeletonGrid = (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
      {[1, 2, 3].map((n) => (
        <RaffleSkeletonCard key={n} />
      ))}
    </div>
  )

  const renderTab = (key) => {
    const list = raffles[key]
    const label = key.charAt(0).toUpperCase() + key.slice(1)
    const Icon = tabIcons[key]

    if (loading) return skeletonGrid
    if (list.length === 0) return <EmptyTabState label={label} icon={Icon} />
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {list.map((raffle) => (
          <RaffleCard key={raffle.id} raffle={raffle} />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Raffles</h1>
          <p className="text-muted-foreground mt-1">
            Enter active raffles and browse upcoming and past events.
          </p>
        </div>

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="active">{renderTab("active")}</TabsContent>
          <TabsContent value="upcoming">{renderTab("upcoming")}</TabsContent>
          <TabsContent value="past">{renderTab("past")}</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
