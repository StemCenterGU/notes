"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { FileText, Globe } from "lucide-react"

const statusConfig = {
  UNREVIEWED: { label: "Unreviewed", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800" },
  APPROVED: { label: "Approved", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800" },
  REJECTED: { label: "Rejected", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800" },
}

export default function RecentNoteCard({ note }) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-start gap-4">
            <FileText className="h-6 w-6 text-muted-foreground mt-1" />
            <div>
                <CardTitle className="text-lg">{note.title}</CardTitle>
                {(note.status || note.isPublic) && (
                  <div className="flex items-center gap-1 mt-1 flex-wrap">
                    {note.status && statusConfig[note.status] && (
                      <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${statusConfig[note.status].className}`}>
                        {statusConfig[note.status].label}
                      </Badge>
                    )}
                    {note.isPublic && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                        <Globe className="w-2.5 h-2.5 mr-0.5" />
                        Public
                      </Badge>
                    )}
                  </div>
                )}
                <p className="text-sm text-muted-foreground">{note.course.name}</p>
                <p className="text-xs text-muted-foreground">{note.semester.name} {note.semester.year}</p>
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
