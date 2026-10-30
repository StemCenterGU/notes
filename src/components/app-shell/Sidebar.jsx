"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { visibleGroups } from "./nav-items"
import { Plus } from "lucide-react"
import { BrandMark } from "./BrandMark"
import { UserMenu } from "@/components/app-header/UserMenu"
import { ThemeToggler } from "@/components/ThemeToggler"
import { Skeleton } from "@/components/ui/skeleton"

const ROLE_LABELS = {
  STUDENT: "Student",
  TUTOR: "Tutor",
  LEAD_TUTOR: "Lead tutor",
  STEMPASS_TUTOR: "STEMPass tutor",
  PROFESSOR: "Professor",
  ADMIN: "Admin",
}

function NavItem({ item, pathname }) {
  const target = item.match || item.href
  const isActive = pathname === target || pathname.startsWith(target + "/")
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors",
        isActive
          ? "bg-sidebar-accent font-medium text-sidebar-foreground"
          : "text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4 shrink-0",
          isActive ? "text-sidebar-foreground" : "text-sidebar-muted"
        )}
      />
      <span className="truncate">{item.label}</span>
    </Link>
  )
}

export function SidebarContent({ role, user, isLoading, onNavigate }) {
  const pathname = usePathname()
  const groups = visibleGroups(role)

  return (
    <div className="flex h-full flex-col bg-sidebar">
      {/* Brand */}
      <div className="flex h-14 shrink-0 items-center px-4">
        <BrandMark onNavigate={onNavigate} />
      </div>

      {/* Primary action. Upload is a mode of Home, not a destination, so it is
          an action here rather than a nav item that would double-highlight. */}
      <div className="px-2.5 pb-3">
        <Link
          href="/dashboard?tab=upload"
          onClick={onNavigate}
          className="flex w-full items-center gap-2 rounded-md bg-primary px-2.5 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Upload notes
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-5 overflow-y-auto px-2.5 pb-4" onClick={onNavigate}>
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="mx-0.5 h-8 rounded-md" />
            ))
          : groups.map((group) => (
              <div key={group.id} className="space-y-0.5">
                {group.label && (
                  <p className="px-2.5 pb-1.5 pt-1 text-[11px] font-medium uppercase tracking-wider text-sidebar-muted/70">
                    {group.label}
                  </p>
                )}
                {group.items.map((item) => (
                  <NavItem key={item.href} item={item} pathname={pathname} />
                ))}
              </div>
            ))}
      </nav>

      {/* Account */}
      <div className="shrink-0 border-t border-sidebar-border p-2.5">
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <UserMenu user={user} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-sidebar-foreground">
                  {user.user_metadata?.full_name || user.email?.split("@")[0]}
                </p>
                <p className="truncate text-xs text-sidebar-muted">
                  {ROLE_LABELS[role] || "Member"}
                </p>
              </div>
            </>
          ) : (
            <div className="flex-1" />
          )}
          <ThemeToggler />
        </div>
      </div>
    </div>
  )
}
