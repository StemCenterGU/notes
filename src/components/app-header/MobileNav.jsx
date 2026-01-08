"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { appNavItems, marketingNavItems } from "./NavLinks"

export function MobileNav({ variant = "app", role, user }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const items = variant === "marketing" ? marketingNavItems : appNavItems

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User"
  const userEmail = user?.email || ""
  const userAvatar = user?.user_metadata?.avatar_url

  const handleLogout = () => {
    const form = document.createElement("form")
    form.method = "POST"
    form.action = "/auth/signout"
    document.body.appendChild(form)
    form.submit()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="text-left text-2xl font-bold">
            GU<span className="text-primary">Notes</span>
          </SheetTitle>
        </SheetHeader>

        {user && (
          <>
            <div className="flex items-center gap-3 mt-6 p-3 rounded-lg bg-accent/50">
              <Avatar className="h-10 w-10">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{userName}</span>
                <span className="text-xs text-muted-foreground">{userEmail}</span>
              </div>
            </div>
            <Separator className="my-4" />
          </>
        )}

        <nav className="flex flex-col gap-1 mt-4">
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
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors",
                  "hover:bg-accent",
                  isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {user && (
          <>
            <Separator className="my-4" />
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </>
        )}

        {!user && (
          <div className="mt-6">
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button className="w-full">Login</Button>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
