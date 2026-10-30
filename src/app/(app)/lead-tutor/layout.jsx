"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useUser } from "@/contexts/AuthContext"

const ALLOWED = ["LEAD_TUTOR", "STEMPASS_TUTOR", "ADMIN"]

/**
 * Role guard only. These pages used to carry a second sidebar of their own,
 * which duplicated the app nav now that every lead-tutor screen is listed
 * there — two navs competing for the same job.
 */
export default function LeadTutorLayout({ children }) {
  const { user, role, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || !ALLOWED.includes(role))) {
      router.push("/dashboard")
    }
  }, [user, role, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!ALLOWED.includes(role)) return null

  // Pages built on <Page> bring their own frame; the rest inherit this one.
  return <div className="mx-auto max-w-[1200px] px-6 py-9 lg:px-10">{children}</div>
}
