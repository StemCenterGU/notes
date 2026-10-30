import { redirect } from "next/navigation"

// The old /admin page was a menu of two links the sidebar already shows.
// Send admins straight to the first real screen.
export default function AdminIndex() {
  redirect("/admin/users")
}
