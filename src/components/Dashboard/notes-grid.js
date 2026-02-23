"use client"
import { FileText, Eye, Star, Trash2, Pencil, Globe, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import VerifiedBadge from "@/components/VerifiedBadge"

const statusConfig = {
  UNREVIEWED: { label: "Unreviewed", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800" },
  APPROVED: { label: "Approved", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800" },
  REJECTED: { label: "Rejected", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800" },
}

export default function NotesGrid({ notes, showUploader = false, currentUserId, onEdit, onDelete }) {
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="h-4 w-4 text-destructive" />
      case "docx":
        return <FileText className="h-4 w-4 text-primary" />
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />
    }
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="p-4">
        <Card className="border-dashed border-2 border-border/60">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-1">No Notes Yet</h3>
            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              You haven't uploaded any notes. Start contributing to earn kudos and raffle entries!
            </p>
            <Button asChild variant="outline">
              <Link href="/explore">Browse Notes</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
      {notes.map((note) => (
        <Card
          key={note.id}
          className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 border-border/50"
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="shrink-0 rounded-lg bg-primary/10 p-2.5 transition-colors group-hover:bg-primary/20">
                  {getFileIcon(note.fileType)}
                </div>
                <div className="space-y-0.5 min-w-0">
                  <CardTitle
                    className={cn(
                      "text-base font-semibold leading-tight line-clamp-1 transition-colors group-hover:text-primary",
                      "flex items-center gap-1.5"
                    )}
                  >
                    <span className="truncate">{note.title}</span>
                    {note.isVerified && <VerifiedBadge size="small" />}
                  </CardTitle>
                  {note.course && (
                    <CardDescription className="text-xs leading-tight truncate">
                      {note.course.name}
                      {note.course.code && ` (${note.course.code})`}
                    </CardDescription>
                  )}
                </div>
              </div>

              {/* Star rating top-right */}
              <div className="flex items-center gap-0.5 text-sm font-medium shrink-0">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-muted-foreground">{note.averageRating.toFixed(1)}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pb-3">
            {/* Status + Public badges row */}
            {(note.status || note.isPublic) && (
              <div className="flex items-center gap-1 mb-2 flex-wrap">
                {note.status && statusConfig[note.status] && (
                  <Badge
                    variant="outline"
                    className={cn("text-[10px] px-1.5 py-0", statusConfig[note.status].className)}
                  >
                    {statusConfig[note.status].label}
                  </Badge>
                )}
                {note.isPublic && (
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                  >
                    <Globe className="w-2.5 h-2.5 mr-0.5" />
                    Public
                  </Badge>
                )}
              </div>
            )}

            {/* Tags row */}
            {note.noteTags && note.noteTags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
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

            {/* Metadata: professor, semester, uploader, date */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs text-muted-foreground mt-1">
              {note.course?.professor && (
                <span className="truncate">Prof. {note.course.professor.name}</span>
              )}
              {note.semester && (
                <span className="truncate">{note.semester.name} {note.semester.year}</span>
              )}
              {showUploader && note.uploader && (
                <span className="truncate col-span-2">By {note.uploader.name}</span>
              )}
              <span className="col-span-2 italic text-muted-foreground/70">
                Uploaded {new Date(note.createdAt).toLocaleDateString()}
              </span>
            </div>
          </CardContent>

          <CardFooter className="pt-0 gap-2">
            <Button asChild variant="default" size="sm" className="flex-1">
              <Link href={`/view/${note.id}`}>
                <Eye className="w-3.5 h-3.5 mr-1.5" />
                View
              </Link>
            </Button>
            {note.uploaderId === currentUserId && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => onEdit(note)}
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => onDelete(note.id)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
