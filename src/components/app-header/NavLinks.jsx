"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const appNavItems = [
  { href: "/dashboard", label: "Dashboard", roles: null },
  { href: "/explore", label: "Explore", roles: ["TUTOR", "PROFESSOR", "ADMIN"] },
  { href: "/access", label: "Enter Access Code", roles: ["STUDENT"] },
  { href: "/tutor/generate-code", label: "Generate Code", roles: ["TUTOR", "PROFESSOR", "ADMIN"] },
  { href: "/admin", label: "Admin", roles: ["ADMIN"] },
  { href: "/raffles", label: "Raffles", roles: null },
]

const marketingNavItems = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "https://www.gannon.edu/about-gannon/", label: "About Us", external: true },
]

export function NavLinks({ variant = "app", role, className }) {
  const pathname = usePathname()

  const items = variant === "marketing" ? marketingNavItems : appNavItems

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {items.map((item) => {
        // Check role-based access for app nav
        if (variant === "app" && item.roles && !item.roles.includes(role)) {
          return null
        }

        const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

        return (
          <Link
            key={item.href}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className={cn(
              "px-3 py-2 text-sm font-medium rounded-md transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              isActive && variant === "app"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}

export { appNavItems, marketingNavItems }
