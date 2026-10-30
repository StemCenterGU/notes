"use client"

import Link from "next/link"
import { GannonWordmark } from "@/components/GannonWordmark"

export function BrandLogo() {
  return (
    <Link
      href="/"
      className="flex items-baseline gap-1.5 transition-opacity hover:opacity-80"
      aria-label="Gannon University Notes, home"
    >
      <GannonWordmark />
      <span className="text-[15px] font-semibold tracking-tight text-foreground">Notes</span>
    </Link>
  )
}
