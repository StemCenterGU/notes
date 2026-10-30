/**
 * prisma/seed.mjs
 *
 * Seeds a development database with realistic GUNotes data.
 *
 * Idempotent: safe to re-run. Everything is upserted on a natural key.
 *
 * Creates matching Supabase Auth users (email pre-confirmed) when
 * SUPABASE_SERVICE_ROLE_KEY is present, so every seeded role can actually
 * log in. Without it the DB rows are still created with synthetic
 * supabaseIds and the seed prints a warning.
 *
 * Usage: npx prisma db seed
 */

import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma-client/index.js'

// Prefer the session-mode connection (DIRECT_URL). The pooled DATABASE_URL
// runs pgbouncer in transaction mode, which cannot hold prepared statements —
// re-running the seed over it fails with `prepared statement "s0" already
// exists`. Fall back to the pooled URL with pgbouncer mode declared.
function seedDatabaseUrl() {
  if (process.env.DIRECT_URL) return process.env.DIRECT_URL
  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('pgbouncer', 'true')
  return url.toString()
}

const prisma = new PrismaClient({
  datasources: { db: { url: seedDatabaseUrl() } },
})

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_PROJECT_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const SEED_PASSWORD = process.env.SEED_PASSWORD || 'GuNotes!2026'
const NOTES_BUCKET = 'notes'

const PEOPLE = [
  { key: 'admin', email: 'admin@gannon.edu', name: 'Avery Admin', role: 'ADMIN' },
  { key: 'lead', email: 'leadtutor@gannon.edu', name: 'Logan Lead', role: 'LEAD_TUTOR' },
  { key: 'tutor', email: 'tutor@gannon.edu', name: 'Tina Tutor', role: 'TUTOR' },
  { key: 'student', email: 'student@gannon.edu', name: 'Sam Student', role: 'STUDENT' },
  { key: 'student2', email: 'student2@gannon.edu', name: 'Riley Reader', role: 'STUDENT' },
]

// ---------------------------------------------------------------------------
// Supabase Auth (admin API) — create/confirm a login for each seeded user
// ---------------------------------------------------------------------------

async function sbAdmin(path, init = {}) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${SERVICE_KEY}`,
      apikey: SERVICE_KEY,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })
  const body = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, body }
}

/** Returns the auth user's id for `email`, creating it if needed. */
async function ensureAuthUser({ email, name }) {
  const created = await sbAdmin('/admin/users', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password: SEED_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: name },
    }),
  })
  if (created.ok && created.body?.id) return created.body.id

  // Already registered — look it up instead.
  const found = await sbAdmin(`/admin/users?page=1&per_page=200`)
  const match = found.body?.users?.find(
    (u) => u.email?.toLowerCase() === email.toLowerCase()
  )
  if (match) return match.id

  throw new Error(
    `could not create or find auth user ${email}: ${JSON.stringify(created.body)}`
  )
}

// ---------------------------------------------------------------------------
// Storage — upload a real file per note so the viewer has something to render
// ---------------------------------------------------------------------------

/** A minimal, valid single-page PDF containing `text`. */
function buildPdf(text) {
  const safe = text.replace(/([()\\])/g, '\\$1')
  const content = `BT /F1 18 Tf 60 700 Td (${safe}) Tj ET`
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ]

  let pdf = '%PDF-1.4\n'
  const offsets = []
  objects.forEach((body, i) => {
    offsets.push(pdf.length)
    pdf += `${i + 1} 0 obj\n${body}\nendobj\n`
  })

  const xrefStart = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  for (const off of offsets) {
    pdf += `${String(off).padStart(10, '0')} 00000 n \n`
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`
  return Buffer.from(pdf, 'latin1')
}

/** Uploads `bytes` to the notes bucket and returns { filePath, fileUrl }. */
async function uploadNoteFile(filePath, bytes, contentType) {
  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${NOTES_BUCKET}/${filePath}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SERVICE_KEY}`,
        'Content-Type': contentType,
        'x-upsert': 'true',
      },
      body: bytes,
    }
  )
  if (!res.ok) {
    throw new Error(`upload ${filePath} failed: ${res.status} ${await res.text()}`)
  }
  return {
    filePath,
    fileUrl: `${SUPABASE_URL}/storage/v1/object/public/${NOTES_BUCKET}/${filePath}`,
  }
}

// ---------------------------------------------------------------------------
// Upsert helpers for models without a unique constraint to upsert on
// ---------------------------------------------------------------------------

async function findOrCreate(model, where, data) {
  const existing = await prisma[model].findFirst({ where })
  if (existing) return existing
  return prisma[model].create({ data })
}

// ---------------------------------------------------------------------------

async function main() {
  if (!SUPABASE_URL) throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set')

  const canUseAuth = Boolean(SERVICE_KEY)
  if (!canUseAuth) {
    console.warn(
      '⚠  SUPABASE_SERVICE_ROLE_KEY missing — seeding DB rows only.\n' +
        '   Seeded users will NOT be able to log in, and notes will have no files.'
    )
  }

  console.log('→ users')
  const users = {}
  for (const person of PEOPLE) {
    const supabaseId = canUseAuth
      ? await ensureAuthUser(person)
      : `seed-${person.key}`

    users[person.key] = await prisma.user.upsert({
      where: { email: person.email },
      update: { name: person.name, role: person.role, supabaseId },
      create: {
        email: person.email,
        name: person.name,
        role: person.role,
        supabaseId,
        kudosPoints: person.key === 'student' ? 120 : 0,
      },
    })
    console.log(`   ${person.role.padEnd(10)} ${person.email}`)
  }

  const admin = users.admin
  const lead = users.lead

  console.log('→ departments')
  const departments = {}
  for (const d of [
    { code: 'CIS', name: 'Computer and Information Science' },
    { code: 'MATH', name: 'Mathematics' },
    { code: 'BIOL', name: 'Biology' },
  ]) {
    departments[d.code] = await prisma.department.upsert({
      where: { code: d.code },
      update: { name: d.name },
      create: { ...d, createdById: admin.id },
    })
  }

  console.log('→ professors')
  const professors = {}
  for (const p of [
    { name: 'Dr. Alan Shepard', email: 'shepard@gannon.edu' },
    { name: 'Dr. Maria Chen', email: 'chen@gannon.edu' },
    { name: 'Dr. Priya Raman', email: 'raman@gannon.edu' },
  ]) {
    professors[p.name] = await findOrCreate('professor', { name: p.name }, {
      ...p,
      createdById: admin.id,
    })
  }

  console.log('→ courses')
  const courses = {}
  for (const c of [
    { code: 'CIS 180', name: 'Introduction to Programming', dept: 'CIS', prof: 'Dr. Alan Shepard' },
    { code: 'CIS 221', name: 'Data Structures', dept: 'CIS', prof: 'Dr. Alan Shepard' },
    { code: 'MATH 140', name: 'Calculus I', dept: 'MATH', prof: 'Dr. Maria Chen' },
    { code: 'BIOL 121', name: 'General Biology I', dept: 'BIOL', prof: 'Dr. Priya Raman' },
  ]) {
    courses[c.code] = await findOrCreate('course', { code: c.code }, {
      code: c.code,
      name: c.name,
      departmentId: departments[c.dept].id,
      professorId: professors[c.prof].id,
      createdById: admin.id,
    })
  }

  console.log('→ semesters')
  const semesters = {}
  for (const s of [
    { name: 'Fall', year: 2026 },
    { name: 'Spring', year: 2026 },
  ]) {
    const key = `${s.name} ${s.year}`
    semesters[key] = await findOrCreate('semester', { name: s.name, year: s.year }, {
      ...s,
      createdById: admin.id,
    })
  }

  console.log('→ tags')
  const tags = {}
  for (const t of [
    { name: 'Lecture Notes', category: 'RESOURCE_TYPE' },
    { name: 'Practice Exam', category: 'RESOURCE_TYPE' },
    { name: 'Study Guide', category: 'RESOURCE_TYPE' },
    { name: 'Midterm Prep', category: 'STUDY_CYCLE' },
    { name: 'Finals Prep', category: 'STUDY_CYCLE' },
    { name: 'Highly Rated', category: 'GENERAL' },
  ]) {
    tags[t.name] = await prisma.tag.upsert({
      where: { name_category: { name: t.name, category: t.category } },
      update: {},
      create: { ...t, createdById: lead.id },
    })
  }

  console.log('→ notes' + (canUseAuth ? ' (uploading files)' : ' (no files)'))
  const NOTES = [
    {
      slug: 'cis180-week1',
      title: 'CIS 180 — Week 1: Variables & Control Flow',
      description: 'Full lecture notes from the first week, with worked examples.',
      course: 'CIS 180',
      prof: 'Dr. Alan Shepard',
      semester: 'Fall 2026',
      uploader: 'student',
      status: 'APPROVED',
      isVerified: true,
      isPublic: true,
      tags: ['Lecture Notes', 'Highly Rated'],
    },
    {
      slug: 'cis221-midterm',
      title: 'CIS 221 — Midterm Review: Trees & Graphs',
      description: 'Condensed review sheet covering traversals and complexity.',
      course: 'CIS 221',
      prof: 'Dr. Alan Shepard',
      semester: 'Fall 2026',
      uploader: 'student',
      status: 'APPROVED',
      isVerified: true,
      isPublic: true,
      tags: ['Study Guide', 'Midterm Prep'],
    },
    {
      slug: 'math140-practice',
      title: 'MATH 140 — Practice Exam with Solutions',
      description: 'Two full practice exams plus step-by-step solutions.',
      course: 'MATH 140',
      prof: 'Dr. Maria Chen',
      semester: 'Spring 2026',
      uploader: 'student2',
      status: 'UNREVIEWED',
      isVerified: false,
      isPublic: false,
      tags: ['Practice Exam', 'Finals Prep'],
    },
    {
      slug: 'biol121-lab',
      title: 'BIOL 121 — Lab Notes: Cell Structure',
      description: 'Lab write-up with labelled diagrams.',
      course: 'BIOL 121',
      prof: 'Dr. Priya Raman',
      semester: 'Fall 2026',
      uploader: 'student2',
      status: 'REJECTED',
      isVerified: false,
      isPublic: false,
      tags: ['Lecture Notes'],
    },
  ]

  const notes = {}
  for (const n of NOTES) {
    let file = { filePath: `seed/${n.slug}.pdf`, fileUrl: '' }
    if (canUseAuth) {
      file = await uploadNoteFile(
        `seed/${n.slug}.pdf`,
        buildPdf(n.title),
        'application/pdf'
      )
    }

    const uploader = users[n.uploader]
    const existing = await prisma.note.findFirst({ where: { title: n.title } })
    const data = {
      title: n.title,
      description: n.description,
      courseId: courses[n.course].id,
      professorId: professors[n.prof].id,
      semesterId: semesters[n.semester].id,
      uploaderId: uploader.id,
      filePath: file.filePath,
      fileUrl: file.fileUrl,
      fileType: 'application/pdf',
      status: n.status,
      isPublic: n.isPublic,
      isVerified: n.isVerified,
      verifiedAt: n.isVerified ? new Date() : null,
      verifiedById: n.isVerified ? lead.id : null,
    }

    notes[n.slug] = existing
      ? await prisma.note.update({ where: { id: existing.id }, data })
      : await prisma.note.create({ data })

    for (const tagName of n.tags) {
      await prisma.noteTag.upsert({
        where: { noteId_tagId: { noteId: notes[n.slug].id, tagId: tags[tagName].id } },
        update: {},
        create: { noteId: notes[n.slug].id, tagId: tags[tagName].id },
      })
    }
    console.log(`   ${n.status.padEnd(10)} ${n.title}`)
  }

  console.log('→ reviews')
  const REVIEWS = [
    { note: 'cis180-week1', user: 'student2', rating: 5, comment: 'Clearest notes I have found for this class.' },
    { note: 'cis221-midterm', user: 'student2', rating: 4, comment: 'Great summary, wish it covered heaps too.' },
    { note: 'cis180-week1', user: 'tutor', rating: 5, comment: 'Accurate and well organised.' },
  ]
  for (const r of REVIEWS) {
    await prisma.review.upsert({
      where: { noteId_userId: { noteId: notes[r.note].id, userId: users[r.user].id } },
      update: { rating: r.rating, comment: r.comment },
      create: {
        noteId: notes[r.note].id,
        userId: users[r.user].id,
        rating: r.rating,
        comment: r.comment,
      },
    })
  }

  console.log('→ tutor reviews')
  const TUTOR_REVIEWS = [
    { note: 'cis180-week1', rating: 5, decision: 'APPROVE', comment: 'Verified against the syllabus. Approved.' },
    { note: 'biol121-lab', rating: 2, decision: 'REJECT', comment: 'Diagrams are unreadable — please re-scan.' },
  ]
  for (const tr of TUTOR_REVIEWS) {
    await prisma.tutorReview.upsert({
      where: { noteId_reviewerId: { noteId: notes[tr.note].id, reviewerId: users.tutor.id } },
      update: { rating: tr.rating, decision: tr.decision, comment: tr.comment },
      create: {
        noteId: notes[tr.note].id,
        reviewerId: users.tutor.id,
        rating: tr.rating,
        decision: tr.decision,
        comment: tr.comment,
      },
    })
  }

  console.log('→ raffle')
  const now = Date.now()
  const raffle = await findOrCreate(
    'raffle',
    { title: 'Fall 2026 Note Drop' },
    {
      title: 'Fall 2026 Note Drop',
      description: 'Upload a verified note to earn an entry.',
      startTime: new Date(now - 7 * 864e5),
      endTime: new Date(now + 21 * 864e5),
    }
  )

  await findOrCreate(
    'rafflePrize',
    { raffleId: raffle.id, name: 'GUNotes Hoodie' },
    { raffleId: raffle.id, name: 'GUNotes Hoodie', description: 'Embroidered, unisex fit.', quantity: 2, size: 'L', color: 'Maroon' }
  )
  await findOrCreate(
    'rafflePrize',
    { raffleId: raffle.id, name: '$50 Bookstore Credit' },
    { raffleId: raffle.id, name: '$50 Bookstore Credit', quantity: 1 }
  )

  for (const slug of ['cis180-week1', 'cis221-midterm']) {
    const note = notes[slug]
    await findOrCreate(
      'raffleEntry',
      { raffleId: raffle.id, userId: note.uploaderId, noteId: note.id },
      { raffleId: raffle.id, userId: note.uploaderId, noteId: note.id }
    )
  }

  console.log('→ access code')
  const expiresAt = new Date(now + 7 * 864e5)
  const code = await prisma.accessCode.upsert({
    where: { code: 'SEED-DEMO-01' },
    update: { expiresAt, isUsed: false, isRevoked: false },
    create: {
      code: 'SEED-DEMO-01',
      createdById: users.tutor.id,
      duration: 60,
      expiresAt,
    },
  })
  await prisma.accessCodeNote.upsert({
    where: { accessCodeId_noteId: { accessCodeId: code.id, noteId: notes['cis180-week1'].id } },
    update: {},
    create: { accessCodeId: code.id, noteId: notes['cis180-week1'].id },
  })

  console.log('\n✅ Seed complete.')
  if (canUseAuth) {
    console.log(`\n   Log in with any of these (password: ${SEED_PASSWORD}):`)
    for (const p of PEOPLE) console.log(`     ${p.role.padEnd(10)} ${p.email}`)
  }
  console.log('\n   Demo access code: SEED-DEMO-01')
}

main()
  .catch((e) => {
    console.error('\n❌ Seed failed:', e.message)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
