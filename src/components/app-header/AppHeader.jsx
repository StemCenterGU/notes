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

export function AppHeader({ variant = "app" }) {
  const { user, role, isLoading } = useUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
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
          <ThemeToggler />

          {isLoading && (
            <div className="hidden md:flex items-center gap-3">
              <Skeleton className="h-8 w-20 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
          )}

          {!isLoading && user && (
            <UserMenu user={user} className="hidden md:flex" />
          )}

          {!isLoading && !user && (
            <Link href="/login" className="hidden md:block">
              <Button>Login</Button>
            </Link>
          )}

          <MobileNav variant={variant} role={role} user={user} />
        </div>
      </div>
    </header>
  )
}
