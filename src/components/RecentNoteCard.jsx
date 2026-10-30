"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { FileText, Globe } from "lucide-react"
import { NOTE_STATUS } from "@/lib/status-styles"

const statusConfig = {
  UNREVIEWED: { label: "Unreviewed", className: NOTE_STATUS.UNREVIEWED.badge },
  APPROVED: { label: "Approved", className: NOTE_STATUS.APPROVED.badge },
  REJECTED: { label: "Rejected", className: NOTE_STATUS.REJECTED.badge },
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
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-border bg-muted text-muted-foreground">
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
