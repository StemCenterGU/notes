"use client"

import Link from "next/link"

export function BrandLogo() {
  return (
    <Link href="/" className="text-2xl font-bold text-foreground hover:opacity-80 transition-opacity">
      GU<span className="text-primary">Notes</span>
    </Link>
  )
}
