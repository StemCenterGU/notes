import { BadgeCheck } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

/**
 * Professor/lead-tutor verification mark.
 *
 * Deliberately quiet: in a list a note already shows its review status, so
 * this must read as a second-order signal, not compete with the title.
 * `compact` drops the label and shows the mark alone.
 */
export default function VerifiedBadge({ verifiedBy, verifiedAt, size = 'default', compact = false }) {
  const iconSize = size === 'small' ? 'h-3.5 w-3.5' : 'h-4 w-4'

  const badge = compact ? (
    <span className="inline-flex shrink-0 items-center text-success">
      <BadgeCheck className={iconSize} />
      <span className="sr-only">Verified</span>
    </span>
  ) : (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1 rounded-full border border-success/25 bg-success/10 font-medium text-success',
        size === 'small' ? 'px-1.5 py-0.5 text-[11px]' : 'px-2 py-0.5 text-xs'
      )}
    >
      <BadgeCheck className={iconSize} />
      Verified
    </span>
  )

  if (verifiedBy || verifiedAt) {
    const verifierName = verifiedBy?.name || verifiedBy?.email || 'a reviewer'
    const dateStr = verifiedAt ? new Date(verifiedAt).toLocaleDateString() : ''

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{badge}</TooltipTrigger>
          <TooltipContent>
            <p>Verified by {verifierName}</p>
            {dateStr && <p className="text-xs text-muted-foreground">{dateStr}</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return badge
}
