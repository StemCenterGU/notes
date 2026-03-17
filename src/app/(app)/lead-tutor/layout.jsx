"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useUser } from "@/contexts/AuthContext"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Loader2, LayoutDashboard, BookOpen, Tags, FileText, Users } from "lucide-react"

const sidebarLinks = [
  { href: "/lead-tutor", label: "Overview", icon: LayoutDashboard },
  { href: "/lead-tutor/courses", label: "Courses", icon: BookOpen },
  { href: "/lead-tutor/tags", label: "Tags", icon: Tags },
  { href: "/lead-tutor/notes", label: "Notes", icon: FileText },
  { href: "/lead-tutor/tutors", label: "Tutors", icon: Users },
]

export default function LeadTutorLayout({ children }) {
  const { user, role, isLoading } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && (!user || !['LEAD_TUTOR', 'STEMPASS_TUTOR', 'ADMIN'].includes(role))) {
      router.push('/dashboard')
    }
  }, [user, role, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!['LEAD_TUTOR', 'STEMPASS_TUTOR', 'ADMIN'].includes(role)) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-56 shrink-0">
            <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible">
              {sidebarLinks.map((link) => {
                const Icon = link.icon
                const isActive =
                  link.href === "/lead-tutor"
                    ? pathname === "/lead-tutor"
                    : pathname.startsWith(link.href)

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
