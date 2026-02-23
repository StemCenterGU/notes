"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { FileText } from "lucide-react"

export default function RecentNoteCard({ note }) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-start gap-4">
            <FileText className="h-6 w-6 text-gray-400 mt-1" />
            <div>
                <CardTitle className="text-lg">{note.title}</CardTitle>
                <p className="text-sm text-gray-500">{note.course.name}</p>
                <p className="text-xs text-gray-400">{note.semester.name} {note.semester.year}</p>
                {note.noteTags && note.noteTags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {note.noteTags.map((nt) => (
                      <Badge
                        key={nt.tag.id}
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0"
                      >
                        {nt.tag.name}
                      </Badge>
                    ))}
                  </div>
                )}
            </div>
        </div>
      </CardHeader>
      <CardFooter>
        <Link href={`/view/${note.id}`} passHref className="w-full">
          <Button variant="secondary" className="w-full">View Note</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
