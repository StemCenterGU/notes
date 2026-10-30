"use client"

import Link from "next/link"
import { GannonWordmark } from "@/components/GannonWordmark"

/** Brand lockup for the app shell: the Gannon wordmark with "Notes" beside it. */
export function BrandMark({ onNavigate, className = "" }) {
  return (
    <Link
      href="/dashboard"
      onClick={onNavigate}
      className={`flex items-baseline gap-1.5 ${className}`}
      aria-label="Gannon University Notes, home"
    >
      <GannonWordmark />
      <span className="text-[15px] font-semibold tracking-tight text-sidebar-foreground">
        Notes
      </span>
    </Link>
  )
}
