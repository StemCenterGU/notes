/**
 * seed-catalog.mjs
 *
 * Parses List.txt and populates the database with GU courses and professors.
 *
 * Usage:
 *   node scripts/seed-catalog.mjs
 *   node scripts/seed-catalog.mjs --user-email admin@gannon.edu
 *
 * List.txt format:
 *   Line 1: description (skip)
 *   Line 2: empty (skip)
 *   Line 3: comma-delimited courses: CODE_NUM (Course Name)
 *   Line 4: empty (skip)
 *   Line 5: comma-delimited professors: LastName FirstName (Department): ID
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { PrismaClient } from '../src/generated/prisma-client/index.js'

// ---------------------------------------------------------------------------
// Resolve paths relative to this script file
// ---------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const LIST_TXT_PATH = resolve(__dirname, '../List.txt')

// ---------------------------------------------------------------------------
// Department code → human-readable name mapping
// ---------------------------------------------------------------------------
const DEPT_NAME_MAP = {
  // Accounting / Business
  ACCT: 'Accounting',
  AVBM: 'Aviation & Business Management',
  BCOR: 'Business Core',
  ECON: 'Economics',
  ENTR: 'Entrepreneurship',
  FINC: 'Finance',
  GAML: 'Anti-Money Laundering',
  HCMG: 'Healthcare Management',
  IMGT: 'International Management',
  IS: 'Information Systems',
  MGMT: 'Management',
  MIC: 'Magis Innovation Center',
  MKTG: 'Marketing',
  RISK: 'Risk Management & Insurance',
  SCMG: 'Supply Chain Management',
  SMGT: 'Sport Management',

  // Sciences
  BIOL: 'Biology',
  BME: 'Biomedical Engineering',
  CHEM: 'Chemistry & Biochemistry',
  DIET: 'Dietetics',
  ENV: 'Environmental Science & Engineering',
  PHYS: 'Physics',

  // Computer / Engineering
  CIS: 'Computer & Information Science',
  CSC: 'Computer Science',
  CYENG: 'Cyber Engineering',
  CYSEC: 'Cybersecurity',
  ECE: 'Electrical & Cyber Engineering',
  ENG: 'Engineering (General)',
  IE: 'Industrial Engineering',
  ME: 'Mechanical Engineering',
  SOFT: 'Software Engineering',

  // Health Professions
  AT: 'Athletic Training',
  CSD: 'Communication Sciences & Disorders',
  DNURS: 'Doctor of Nursing Practice',
  DOCCT: 'Doctor of Occupational Therapy',
  HLS: 'Health Leadership & Sciences',
  MDTC: 'Medical Technology & Clinical Sciences',
  MORT: 'Mortuary Science',
  NURS: 'Nursing',
  NUTR: 'Nutrition',
  NHP: 'Nutrition & Health Promotion',
  OCCT: 'Occupational Therapy',
  ELOCCT: 'Entry-Level Occupational Therapy',
  PHAS: 'Physician Assistant Studies',
  PT: 'Physical Therapy',
  PUBH: 'Public Health',
  RADS: 'Radiologic Sciences',
  RSPC: 'Respiratory Care',
  SPRT: 'Sport & Exercise Science',

  // Humanities / Social Sciences
  ARABI: 'Arabic Language & Culture',
  ARCH: 'Archaeology',
  ARTS: 'Arts & Theatre',
  COMM: 'Communication',
  CRJS: 'Criminal Justice',
  EDCR: 'Education - Curriculum & Instruction',
  EDFL: 'Education - Field Experience',
  EDUC: 'Education',
  ECED: 'Early Childhood Education',
  ENGL: 'English',
  ESL: 'English as a Second Language',
  FREN: 'French',
  FRSC: 'Forensic Science',
  FRSH: 'Freshman Studies',
  GANNON: 'Gannon University',
  GEOG: 'Geography',
  GERO: 'Gerontology',
  GLBCIT: 'Global Citizenship',
  GLOBL: 'Global Studies',
  HIST: 'History',
  HNRS: 'Honors Program',
  INTEL: 'Applied Intelligence',
  LATN: 'Latin',
  LBST: 'Liberal Studies',
  LEGL: 'Legal Studies',
  LENG: 'Learning English',
  LHES: 'Leadership - Health & Exercise Science',
  LHPS: 'Leadership - Health Professions',
  LIBR: 'Library & Information Literacy',
  MATH: 'Mathematics',
  MDFL: 'Modern Foreign Languages',
  MLED: 'Middle Level Education',
  MLTS: 'Military Science',
  PHIL: 'Philosophy',
  PLAW: 'Pre-Law',
  POLI: 'Political Science',
  PPRO: 'Pre-Professional',
  PRFEL: 'Professional Ethics & Leadership',
  PSGA: 'Political Science & Government Administration',
  PSYC: 'Psychology',
  SOCI: 'Sociology',
  SPAN: 'Spanish',
  SPCH: 'Speech Communication',
  SPED: 'Special Education',
  THEO: 'Theology',
  WMST: "Women's & Gender Studies",
  GRMN: 'German',
  UPMC: 'UPMC Collaboration',
  SEECS: 'School of Engineering & Engineering Computer Science',

  // Graduate prefixes - grouped with undergraduate counterparts where sensible
  GBME: 'Biomedical Engineering',
  GCIS: 'Computer & Information Science',
  GCOMM: 'Communication',
  GCOU: 'Clinical Mental Health Counseling',
  GCRIM: 'Criminal Justice',
  GCYSEC: 'Cybersecurity',
  GDPT: 'Doctor of Physical Therapy',
  GGDPT: 'Doctor of Physical Therapy',
  GECE: 'Electrical & Cyber Engineering',
  GEDU: 'Education',
  GENG: 'Engineering (Graduate)',
  GENV: 'Environmental Science & Engineering',
  GGPHAS: 'Physician Assistant Studies',
  GGSLP: 'Speech-Language Pathology',
  GLIBR: 'Library & Information Literacy',
  GMAT: 'Master of Athletic Training',
  GMBA: 'Master of Business Administration',
  GME: 'Mechanical Engineering',
  GMHA: 'Master of Healthcare Administration',
  GMPA: 'Master of Public Administration',
  GMPH: 'Master of Public Health',
  GNURS: 'Nursing (Graduate)',
  GOCCT: 'Occupational Therapy (Graduate)',
  GOLL: 'Online Learning & Leadership',
  GPAST: 'Pastoral Studies',
  GPHAS: 'Physician Assistant Studies',
  GSLP: 'Speech-Language Pathology',
  GSPRT: 'Sport & Exercise Science (Graduate)',
  GTHEO: 'Theology (Graduate)',
  PPOTD: 'Post-Professional Doctor of Occupational Therapy',
}

// ---------------------------------------------------------------------------
// Parse CLI arguments
// ---------------------------------------------------------------------------
function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--user-email' && argv[i + 1]) {
      args.userEmail = argv[i + 1]
      i++
    }
  }
  return args
}

// ---------------------------------------------------------------------------
// Smart tokenizer: re-joins fragments that don't start a valid record.
//
// A valid course token starts with: ALPHA_DIGITS
// A valid professor token starts with: AlphaName AlphaName (
//
// When a token is a continuation fragment (no valid start pattern), it is
// appended to the previous token before parsing.
// ---------------------------------------------------------------------------

/** Returns true if the trimmed token looks like the start of a course entry. */
function looksLikeCourseStart(token) {
  return /^[A-Z]+_\d/.test(token.trim())
}

/** Returns true if the trimmed token looks like the start of a professor entry. */
function looksLikeProfessorStart(token) {
  // e.g. "Adams Heather (" or "Staff ("
  return /^[A-Za-z].*\(/.test(token.trim())
}

function rejoinFragments(rawTokens, isStartFn) {
  const rejoined = []
  for (const raw of rawTokens) {
    const token = raw.trim()
    if (!token) continue
    if (isStartFn(token) || rejoined.length === 0) {
      rejoined.push(token)
    } else {
      // This is a continuation fragment - append to the last token
      rejoined[rejoined.length - 1] += ', ' + token
    }
  }
  return rejoined
}

// ---------------------------------------------------------------------------
// Parse List.txt
// ---------------------------------------------------------------------------
function parseListFile(filePath) {
  const content = readFileSync(filePath, 'utf8')
  const lines = content.split('\n')

  const courseLine = (lines[2] || '').trim()
  const professorLine = (lines[4] || '').trim()

  if (!courseLine) throw new Error('Course line (line 3) is empty or missing in List.txt')
  if (!professorLine) throw new Error('Professor line (line 5) is empty or missing in List.txt')

  // ---- Parse courses -------------------------------------------------------
  const courseTokens = rejoinFragments(courseLine.split(','), looksLikeCourseStart)
  const courses = []

  for (const token of courseTokens) {
    // Expect: CODE_NUM (Course Name)
    const match = token.match(/^([A-Z]+_\d+[A-Z0-9]*)\s+\((.+)\)$/)
    if (!match) {
      console.warn(`  [WARN] Could not parse course entry: "${token}"`)
      continue
    }
    courses.push({ code: match[1], name: match[2].trim() })
  }

  // ---- Parse professors ----------------------------------------------------
  const profTokens = rejoinFragments(professorLine.split(','), looksLikeProfessorStart)
  const professors = []

  for (const token of profTokens) {
    // Expect: LastName FirstName (Department): ID
    // Department and ID are both optional/can be empty.
    // Handles trailing ":"-with-no-ID like "Clark Gerald ():"
    const match = token.match(/^(.+?)\s+\(([^)]*)\)(?::(?:\s*(\S+))?)?$/)
    if (!match) {
      console.warn(`  [WARN] Could not parse professor entry: "${token}"`)
      continue
    }

    const name = match[1].trim()
    const department = match[2].trim() || null
    const externalId = match[3] ? match[3].trim() : null

    // Skip "Staff" or fully unnamed entries
    if (!name || name === 'Staff') {
      console.log(`  [SKIP] Skipping staff/unnamed professor entry: "${token}"`)
      continue
    }

    professors.push({ name, department, externalId })
  }

  return { courses, professors }
}

// ---------------------------------------------------------------------------
// Extract department code from course code (e.g. "ACCT_313" -> "ACCT")
// ---------------------------------------------------------------------------
function getDeptCode(courseCode) {
  const idx = courseCode.lastIndexOf('_')
  return idx < 0 ? courseCode : courseCode.substring(0, idx)
}

// ---------------------------------------------------------------------------
// Resolve human-readable department name from code
// ---------------------------------------------------------------------------
function resolveDeptName(code) {
  return DEPT_NAME_MAP[code] || code
}

// ---------------------------------------------------------------------------
// Main seeding function
// ---------------------------------------------------------------------------
async function seed() {
  const args = parseArgs(process.argv.slice(2))
  const prisma = new PrismaClient()

  try {
    console.log('=== GU Course Catalog Seed ===')
    console.log(`Parsing: ${LIST_TXT_PATH}`)

    const { courses, professors } = parseListFile(LIST_TXT_PATH)
    console.log(`Parsed ${courses.length} courses and ${professors.length} professors.`)

    // -----------------------------------------------------------------------
    // 1. Resolve creator user
    // -----------------------------------------------------------------------
    let creatorUser

    if (args.userEmail) {
      creatorUser = await prisma.user.findUnique({ where: { email: args.userEmail } })
      if (!creatorUser) {
        throw new Error(`No user found with email: ${args.userEmail}`)
      }
      console.log(`\nUsing specified user as creator: ${creatorUser.email} (${creatorUser.id})`)
    } else {
      // Fall back to first ADMIN user
      creatorUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } })
      if (!creatorUser) {
        throw new Error(
          'No ADMIN user found in the database. ' +
          'Please create one first or pass --user-email <email> to specify a creator.'
        )
      }
      console.log(`\nUsing first ADMIN user as creator: ${creatorUser.email} (${creatorUser.id})`)
    }

    const createdById = creatorUser.id

    // -----------------------------------------------------------------------
    // 2. Upsert departments
    // -----------------------------------------------------------------------
    console.log('\n--- Upserting departments ---')

    const deptCodes = [...new Set(courses.map(c => getDeptCode(c.code)))].sort()
    console.log(`Found ${deptCodes.length} unique department codes.`)

    const departmentMap = {} // code -> Department record

    for (const code of deptCodes) {
      const name = resolveDeptName(code)
      const dept = await prisma.department.upsert({
        where: { code },
        update: {},         // Do not overwrite existing name on re-runs
        create: { code, name, createdById },
      })
      departmentMap[code] = dept
    }

    console.log(`Upserted ${Object.keys(departmentMap).length} departments.`)

    // -----------------------------------------------------------------------
    // 3. Batch create professors (skip existing by name)
    // -----------------------------------------------------------------------
    console.log('\n--- Creating professors ---')

    // Deduplicate parsed professors by name
    const uniqueProfNames = [...new Set(professors.map(p => p.name))]

    // Fetch all existing professor names in one query
    const existingProfs = await prisma.professor.findMany({
      select: { name: true },
    })
    const existingProfNames = new Set(existingProfs.map(p => p.name))

    const newProfs = uniqueProfNames
      .filter(name => !existingProfNames.has(name))
      .map(name => ({ name, createdById }))

    if (newProfs.length > 0) {
      await prisma.professor.createMany({
        data: newProfs,
        skipDuplicates: true,
      })
    }

    console.log(`Professors: ${newProfs.length} created, ${uniqueProfNames.length - newProfs.length} already existed.`)

    // -----------------------------------------------------------------------
    // 4. Batch create courses (skip existing by code)
    // -----------------------------------------------------------------------
    console.log('\n--- Creating courses ---')

    // Fetch all existing course codes in one query
    const existingCourses = await prisma.course.findMany({
      select: { code: true },
    })
    const existingCourseCodes = new Set(existingCourses.map(c => c.code))

    const newCourses = courses
      .filter(c => !existingCourseCodes.has(c.code))
      .map(c => {
        const deptCode = getDeptCode(c.code)
        const dept = departmentMap[deptCode]
        return {
          code: c.code,
          name: c.name,
          departmentId: dept ? dept.id : null,
          createdById,
        }
      })

    if (newCourses.length > 0) {
      await prisma.course.createMany({
        data: newCourses,
        skipDuplicates: true,
      })
    }

    const courseSkipped = courses.length - newCourses.length
    console.log(`Courses: ${newCourses.length} created, ${courseSkipped} already existed.`)

    // -----------------------------------------------------------------------
    // Summary
    // -----------------------------------------------------------------------
    console.log('\n=== Seed complete ===')
    console.log(`Departments : ${Object.keys(departmentMap).length}`)
    console.log(`Professors  : ${newProfs.length} created, ${uniqueProfNames.length - newProfs.length} already existed`)
    console.log(`Courses     : ${newCourses.length} created, ${courseSkipped} already existed`)

  } catch (err) {
    console.error('\n[FATAL] Seed failed:', err.message)
    if (process.env.DEBUG) console.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
