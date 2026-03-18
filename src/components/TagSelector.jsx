"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export default function TagSelector({ tags, selectedTagIds, onTagToggle }) {
  const hasTags = tags && (
    tags.RESOURCE_TYPE?.length > 0 ||
    tags.STUDY_CYCLE?.length > 0 ||
    tags.GENERAL?.length > 0
  )

  if (!hasTags) {
    return (
      <div className="text-sm text-muted-foreground py-4">
        No tags available. Create tags in the Tag Management page first.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Resource Type Tags */}
      {tags.RESOURCE_TYPE?.length > 0 && (
        <div>
          <p className="text-sm font-medium text-foreground mb-2">
            Resource Type
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.RESOURCE_TYPE.map((tag) => (
              <label
                key={tag.id}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs cursor-pointer transition-colors",
                  selectedTagIds.has(tag.id)
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                )}
              >
                <Checkbox
                  checked={selectedTagIds.has(tag.id)}
                  onCheckedChange={() => onTagToggle(tag.id)}
                  className="h-3 w-3"
                />
                {tag.name}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Study Cycle Tags */}
      {tags.STUDY_CYCLE?.length > 0 && (
        <div>
          <p className="text-sm font-medium text-foreground mb-2">
            Study Cycle
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.STUDY_CYCLE.map((tag) => (
              <label
                key={tag.id}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs cursor-pointer transition-colors",
                  selectedTagIds.has(tag.id)
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                )}
              >
                <Checkbox
                  checked={selectedTagIds.has(tag.id)}
                  onCheckedChange={() => onTagToggle(tag.id)}
                  className="h-3 w-3"
                />
                {tag.name}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* General Tags */}
      {tags.GENERAL?.length > 0 && (
        <div>
          <p className="text-sm font-medium text-foreground mb-2">
            General
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.GENERAL.map((tag) => (
              <label
                key={tag.id}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs cursor-pointer transition-colors",
                  selectedTagIds.has(tag.id)
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                )}
              >
                <Checkbox
                  checked={selectedTagIds.has(tag.id)}
                  onCheckedChange={() => onTagToggle(tag.id)}
                  className="h-3 w-3"
                />
                {tag.name}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
