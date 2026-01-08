import { CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export default function VerifiedBadge({ verifiedBy, verifiedAt, size = 'default' }) {
  const sizeClasses = {
    small: 'text-xs px-1.5 py-0.5',
    default: 'text-sm px-2 py-1',
  }

  const iconSizes = {
    small: 'h-3 w-3',
    default: 'h-3.5 w-3.5',
  }

  const badge = (
    <Badge className={`bg-green-600 hover:bg-green-700 text-white ${sizeClasses[size]}`}>
      <CheckCircle className={`${iconSizes[size]} mr-1`} />
      Verified
    </Badge>
  )

  if (verifiedBy || verifiedAt) {
    const verifierName = verifiedBy?.name || verifiedBy?.email || 'Professor'
    const dateStr = verifiedAt ? new Date(verifiedAt).toLocaleDateString() : ''

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {badge}
          </TooltipTrigger>
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
