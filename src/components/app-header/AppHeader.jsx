"use client"

import { useUser } from "@/contexts/AuthContext"
import Link from "next/link"
import { BrandLogo } from "./BrandLogo"
import { NavLinks } from "./NavLinks"
import { UserMenu } from "./UserMenu"
import { MobileNav } from "./MobileNav"
import { ThemeToggler } from "@/components/ThemeToggler"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"

export function AppHeader({ variant = "app" }) {
  const { user, role, isLoading } = useUser()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
      suppressHydrationWarning
    >
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Left side: Logo + Nav */}
        <div className="flex items-center gap-6">
          <BrandLogo />
          {!isLoading && (
            <nav className="hidden md:flex items-center">
              <NavLinks variant={variant} role={role} />
            </nav>
          )}
        </div>

        {/* Right side: Theme + User + Mobile Menu */}
        <div className="flex items-center gap-3">
          {mounted ? (
            <ThemeToggler />
          ) : (
            <div className="h-10 w-10" /> // Placeholder to prevent layout shift
          )}

          {isLoading && (
            <div className="hidden md:flex items-center gap-3">
              <Skeleton className="h-8 w-20 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
          )}

          {!isLoading && user && mounted && (
            <UserMenu user={user} className="hidden md:flex" />
          )}

          {!isLoading && !user && (
            <Link href="/login" className="hidden md:block">
              <Button>Login</Button>
            </Link>
          )}

          {mounted ? (
            <MobileNav variant={variant} role={role} user={user} />
          ) : (
            <div className="h-10 w-10 md:hidden" /> // Placeholder for mobile menu
          )}
        </div>
      </div>
    </header>
  )
}
