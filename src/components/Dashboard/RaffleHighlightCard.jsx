"use client"
import { useState, useEffect } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { Award } from "lucide-react"

export default function RaffleHighlightCard() {
  const [activeRaffle, setActiveRaffle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActiveRaffle = async () => {
      try {
        const res = await fetch("/api/raffles?status=active")
        const data = await res.json()
        if (data.raffles && data.raffles.length > 0) {
          setActiveRaffle(data.raffles[0])
        }
      } catch (error) {
        console.error("Failed to fetch active raffle", error)
      } finally {
        setLoading(false)
      }
    }
    fetchActiveRaffle()
  }, [])

  if (loading) {
    return (
      <Card className="transition-all hover:shadow-md hover:-translate-y-0.5">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <Skeleton className="h-3 w-full mb-1.5" />
          <Skeleton className="h-3 w-2/3" />
        </CardContent>
        <CardFooter className="pt-0">
          <Skeleton className="h-9 w-full" />
        </CardFooter>
      </Card>
    )
  }

  if (!activeRaffle) {
    return (
      <Card className="transition-all hover:shadow-md hover:-translate-y-0.5 bg-secondary/10 border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20 shrink-0">
              <Award className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <CardTitle className="text-base font-medium">No Active Raffles</CardTitle>
              <CardDescription>Check back later for new events!</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="pt-0">
          <Button asChild className="w-full" variant="outline">
            <Link href="/raffles">View Past Raffles</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="transition-all hover:shadow-md hover:-translate-y-0.5 bg-secondary/10 border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20 shrink-0">
            <Award className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <CardTitle className="text-base font-medium">{activeRaffle.title}</CardTitle>
            <CardDescription>A new raffle is underway!</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground">
          Prizes include: {activeRaffle.raffle_prizes.slice(0, 2).map(p => p.name).join(', ')}...
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild className="w-full">
          <Link href="/raffles">View All Raffles & Prizes</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
