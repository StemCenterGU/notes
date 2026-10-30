"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Star rating, read-only or interactive.
 *
 * Interactive mode previews the value under the cursor, so you can see what
 * you are about to pick before committing. Filled stars use the `warning`
 * token — the same amber used for ratings everywhere else.
 */
export default function StarRating({
  rating = 0,
  setRating,
  isInteractive = true,
  size = "default",
}) {
  const [hovered, setHovered] = useState(0)
  const sizeClass = size === "small" ? "h-4 w-4" : "h-5 w-5"
  const shown = isInteractive && hovered > 0 ? hovered : rating

  return (
    <div
      className="flex items-center gap-0.5"
      onMouseLeave={() => isInteractive && setHovered(0)}
      role={isInteractive ? "radiogroup" : "img"}
      aria-label={isInteractive ? "Rating" : `Rated ${Number(rating).toFixed(1)} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = shown >= star
        const StarIcon = (
          <Star
            className={cn(
              sizeClass,
              "transition-colors",
              filled ? "fill-warning text-warning" : "fill-transparent text-muted-foreground/40"
            )}
          />
        )

        if (!isInteractive) return <span key={star}>{StarIcon}</span>

        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={rating === star}
            aria-label={`${star} star${star === 1 ? "" : "s"}`}
            className="cursor-pointer rounded-sm p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onMouseEnter={() => setHovered(star)}
            onFocus={() => setHovered(star)}
            onClick={() => setRating?.(star)}
          >
            {StarIcon}
          </button>
        )
      })}
    </div>
  )
}
