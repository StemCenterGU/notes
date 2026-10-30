"use client"

import Link from "next/link"
import { Star, MoreHorizontal, Pencil, Trash2, Eye, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import VerifiedBadge from "@/components/VerifiedBadge"

const STATUS = {
  APPROVED: { label: "Approved", dot: "bg-success", text: "text-success" },
  UNREVIEWED: { label: "In review", dot: "bg-warning", text: "text-warning" },
  REJECTED: { label: "Rejected", dot: "bg-destructive", text: "text-destructive" },
}

function formatDate(value) {
  if (!value) return "—"
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" })
}

/**
 * The tutor's verdict, shown to the student who uploaded the note.
 *
 * A rejected note without its reason is a dead end: the student cannot tell
 * what to fix, so they re-upload the same file. Rejections are always shown.
 * An approval only earns a line if the tutor actually wrote something.
 */
function TutorFeedback({ feedback, status }) {
  if (!feedback) return null
  if (status === "APPROVED" && !feedback.comment) return null

  const rejected = status === "REJECTED"

  return (
    <p
      className={cn(
        "mb-3.5 border-l-2 pl-3 text-xs leading-relaxed",
        rejected ? "border-destructive/40" : "border-border"
      )}
    >
      <span className={cn("font-medium", rejected ? "text-destructive" : "text-foreground")}>
        {rejected ? "Needs changes" : "Tutor note"}
      </span>
      <span className="text-muted-foreground">
        {" — "}
        {feedback.comment}
        {feedback.reviewer?.name ? ` (${feedback.reviewer.name})` : ""}
      </span>
    </p>
  )
}

function NoteRow({ note, onEdit, onDelete }) {
  const status = STATUS[note.status] || STATUS.UNREVIEWED
  const rating = Number(note.averageRating) || 0

  return (
    <div className="group">
    <div className="flex items-center gap-4 py-3.5">
      {/* Title + context */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <Link
            href={`/view/${note.id}`}
            className="truncate text-sm font-medium text-foreground hover:text-primary"
          >
            {note.title}
          </Link>
          {note.isVerified && <VerifiedBadge size="small" compact />}
        </div>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {[
            note.course?.code,
            note.semester ? `${note.semester.name} ${note.semester.year}` : null,
          ]
            .filter(Boolean)
            .join(" · ") || "No course"}
        </p>
      </div>

      {/* Status */}
      <div className="hidden w-24 shrink-0 items-center gap-1.5 sm:flex">
        <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
        <span className={cn("text-xs", status.text)}>{status.label}</span>
      </div>

      {/* Rating */}
      <div className="hidden w-12 shrink-0 items-center gap-1 md:flex">
        {rating > 0 ? (
          <>
            <Star className="h-3 w-3 fill-warning text-warning" />
            <span className="tabular text-xs text-muted-foreground">{rating.toFixed(1)}</span>
          </>
        ) : (
          <span className="text-xs text-muted-foreground/60">—</span>
        )}
      </div>

      {/* Date */}
      <div className="hidden w-14 shrink-0 md:block">
        <span className="tabular text-xs text-muted-foreground">{formatDate(note.createdAt)}</span>
      </div>

      {/* Actions — revealed on hover, always reachable by keyboard. */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Actions for {note.title}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem asChild>
            <Link href={`/view/${note.id}`}>
              <Eye className="mr-2 h-4 w-4" /> View
            </Link>
          </DropdownMenuItem>
          {onEdit && (
            <DropdownMenuItem onClick={() => onEdit(note)}>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
          )}
          {onDelete && (
            <DropdownMenuItem
              onClick={() => onDelete(note.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <TutorFeedback feedback={note.tutorFeedback} status={note.status} />
    </div>
  )
}

export default function NotesList({ notes, onEdit, onDelete, onUploadClick }) {
  if (!notes?.length) {
    return (
      <div className="border-t border-border py-14 text-center">
        <p className="text-sm font-medium text-foreground">No notes yet</p>
        <p className="mx-auto mt-1 max-w-xs text-sm text-muted-foreground">
          Upload your first set of notes to earn kudos and a raffle entry.
        </p>
        {onUploadClick && (
          <Button onClick={onUploadClick} variant="outline" className="mt-5" size="sm">
            Upload notes
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="divide-y divide-border border-t border-border">
      {notes.map((note) => (
        <NoteRow key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
