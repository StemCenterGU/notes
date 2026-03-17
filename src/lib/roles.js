// Centralized role constants to avoid scattered inline arrays
export const ROLES = {
  STUDENT: 'STUDENT',
  TUTOR: 'TUTOR',
  LEAD_TUTOR: 'LEAD_TUTOR',
  STEMPASS_TUTOR: 'STEMPASS_TUTOR',
  PROFESSOR: 'PROFESSOR',
  ADMIN: 'ADMIN',
}

// Role groups for permission checks
export const TUTOR_LEVEL_ROLES = ['TUTOR', 'LEAD_TUTOR', 'STEMPASS_TUTOR', 'PROFESSOR', 'ADMIN']
export const SUPERVISOR_ROLES = ['LEAD_TUTOR', 'STEMPASS_TUTOR', 'ADMIN']
export const VERIFY_ROLES = ['PROFESSOR', 'ADMIN']
export const ADMIN_ROLES = ['ADMIN']

// All valid roles (for server-side validation)
export const ALL_ROLES = ['STUDENT', 'TUTOR', 'LEAD_TUTOR', 'STEMPASS_TUTOR', 'PROFESSOR', 'ADMIN']
