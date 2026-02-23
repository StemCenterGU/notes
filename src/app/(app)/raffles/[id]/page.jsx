"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import { Trophy, Gift } from "lucide-react"

export default function RaffleDetailPage() {
  const [raffle, setRaffle] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const { id } = params

  useEffect(() => {
    if (id) {
      const fetchRaffle = async () => {
        setLoading(true)
        const res = await fetch(`/api/raffles/${id}`)
        const data = await res.json()
        setRaffle(data)
        setLoading(false)
      }
      fetchRaffle()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Title card skeleton */}
          <Card>
            <CardHeader className="space-y-3">
              <Skeleton className="h-9 w-2/3" />
              <Skeleton className="h-5 w-1/2" />
            </CardHeader>
          </Card>

          {/* Prizes section skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-7 w-24" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <Card key={n}>
                  <Skeleton className="h-48 w-full rounded-t-xl rounded-b-none" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-5 w-24 rounded-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!raffle || raffle.error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-sm w-full text-center">
          <CardContent className="pt-10 pb-8 flex flex-col items-center gap-4">
            <Trophy className="h-12 w-12 text-muted-foreground" />
            <div>
              <p className="text-lg font-semibold">Raffle not found</p>
              <p className="text-sm text-muted-foreground mt-1">
                This raffle may have been removed or the link is incorrect.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const winners = raffle.entries.filter((entry) => entry.isWinner)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">

        {/* Title section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{raffle.title}</CardTitle>
            {raffle.description && (
              <CardDescription className="text-base mt-1">
                {raffle.description}
              </CardDescription>
            )}
          </CardHeader>
        </Card>

        {/* Prizes */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Prizes</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {raffle.raffle_prizes.map((prize) => (
              <Card
                key={prize.id}
                className="flex flex-col overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                {prize.imageUrl && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={prize.imageUrl}
                      alt={prize.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-base">{prize.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground text-sm mb-3">
                    {prize.description}
                  </p>
                  <Badge variant="secondary">
                    {prize.quantity} available
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Winners */}
        {winners.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Winners</CardTitle>
              </div>
              <CardDescription>
                {winners.length} winner{winners.length !== 1 ? "s" : ""} selected
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {winners.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">
                        {entry.user.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{entry.user.email}</Badge>
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
