"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { useUser } from "@/contexts/AuthContext"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { BrandMark } from "./BrandMark"
import { SidebarContent } from "./Sidebar"

/**
 * Navigation is a hamburger at every breakpoint: the sidebar is an overlay,
 * never a permanent column. Content therefore always gets the full width,
 * which matters most on the document and table pages.
 */
export function AppShell({ children }) {
  const { user, role, isLoading } = useUser()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="flex min-h-screen flex-col bg-background">
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-xl">
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="-ml-2 h-9 w-9">
              <Menu className="h-[18px] w-[18px]" />
              <span className="sr-only">Open navigation</span>
            </Button>
          </SheetTrigger>
          <BrandMark />
        </header>

        <SheetContent side="left" className="w-[260px] border-sidebar-border p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SidebarContent
            role={role}
            user={user}
            isLoading={isLoading}
            onNavigate={() => setOpen(false)}
          />
        </SheetContent>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </Sheet>
  )
}
