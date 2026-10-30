/**
 * Single source of truth for status colour.
 *
 * Everything here resolves to design tokens, never raw Tailwind palette
 * values — so status badges follow the theme (and the dark mode) instead of
 * drifting to whatever green/blue each page happened to pick.
 */

export const NOTE_STATUS = {
  UNREVIEWED: {
    label: "In review",
    badge: "border-warning/25 bg-warning/10 text-warning",
    dot: "bg-warning",
  },
  APPROVED: {
    label: "Approved",
    badge: "border-success/25 bg-success/10 text-success",
    dot: "bg-success",
  },
  REJECTED: {
    label: "Rejected",
    badge: "border-destructive/25 bg-destructive/10 text-destructive",
    dot: "bg-destructive",
  },
}

export const REVIEW_DECISION = {
  APPROVE: { label: "Approved", badge: "border-success/25 bg-success/10 text-success" },
  REJECT: { label: "Rejected", badge: "border-destructive/25 bg-destructive/10 text-destructive" },
  COMMENT_ONLY: { label: "Comment", badge: "border-border bg-muted text-muted-foreground" },
}

/** Visibility is metadata, not a state to celebrate — keep it neutral. */
export const VISIBILITY_BADGE = "border-border bg-muted text-muted-foreground"

export function noteStatus(status) {
  return NOTE_STATUS[status] || NOTE_STATUS.UNREVIEWED
}
