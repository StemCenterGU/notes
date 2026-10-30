import {
  Home,
  Compass,
  KeyRound,
  Ticket,
  ClipboardCheck,
  Users,
  Shield,
  Tags,
  BookOpen,
} from "lucide-react"

const TUTOR_ROLES = ["TUTOR", "LEAD_TUTOR", "STEMPASS_TUTOR", "PROFESSOR", "ADMIN"]
const MANAGER_ROLES = ["LEAD_TUTOR", "STEMPASS_TUTOR", "ADMIN"]

/**
 * Sidebar navigation, grouped. `roles: null` means everyone sees it.
 * Groups whose items are all filtered out render nothing — so a STUDENT
 * never sees an empty "Review" heading.
 */
export const navGroups = [
  {
    id: "main",
    label: null,
    items: [
      { href: "/dashboard", label: "Home", icon: Home, roles: null },
      { href: "/explore", label: "Explore", icon: Compass, roles: TUTOR_ROLES },
      { href: "/access", label: "Enter code", icon: KeyRound, roles: ["STUDENT"] },
      { href: "/raffles", label: "Raffles", icon: Ticket, roles: null },
    ],
  },
  {
    id: "review",
    label: "Review",
    items: [
      { href: "/lead-tutor/notes", label: "All notes", icon: ClipboardCheck, roles: MANAGER_ROLES },
      { href: "/lead-tutor/tutors", label: "Tutors", icon: Users, roles: MANAGER_ROLES },
      { href: "/lead-tutor/courses", label: "Courses", icon: BookOpen, roles: MANAGER_ROLES },
      { href: "/lead-tutor/tags", label: "Tags", icon: Tags, roles: MANAGER_ROLES },
      { href: "/tutor/codes", label: "Access codes", icon: KeyRound, roles: TUTOR_ROLES },
    ],
  },
  {
    id: "admin",
    label: "Administration",
    items: [
      { href: "/admin/users", label: "Users & roles", icon: Shield, roles: ["ADMIN"] },
      { href: "/admin/raffles", label: "Manage raffles", icon: Ticket, roles: ["ADMIN"] },
    ],
  },
]

export function visibleGroups(role) {
  return navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => !item.roles || item.roles.includes(role)),
    }))
    .filter((group) => group.items.length > 0)
}
