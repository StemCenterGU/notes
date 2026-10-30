/** Human labels + one-line meanings for each role. Used wherever a role is shown. */
export const ROLE_META = {
  STUDENT: { label: "Student", description: "Uploads notes, reads approved ones." },
  TUTOR: { label: "Tutor", description: "Reviews notes and issues access codes." },
  LEAD_TUTOR: { label: "Lead tutor", description: "Manages the note queue, tutors and tags." },
  STEMPASS_TUTOR: { label: "STEMPass tutor", description: "Manages the note queue and tags." },
  PROFESSOR: { label: "Professor", description: "Reads and verifies course notes." },
  ADMIN: { label: "Admin", description: "Full access, including user roles and raffles." },
}

export const ROLE_ORDER = [
  "STUDENT",
  "TUTOR",
  "LEAD_TUTOR",
  "STEMPASS_TUTOR",
  "PROFESSOR",
  "ADMIN",
]

export const roleLabel = (role) => ROLE_META[role]?.label ?? role
