import { readFileSync } from 'fs'

const SB = 'https://hodbzklmyvarnwdvdhle.supabase.co'
const ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvZGJ6a2xteXZhcm53ZHZkaGxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzMTA5NzQsImV4cCI6MjEwODg4Njk3NH0.OiXJ1c1XGJqAQBhzqHqW3qTN4e8xh0_gaHITzdXcjBQ'
const APP = 'http://localhost:3000'
const PW = 'GuNotes!2026'

const ACCOUNTS = {
  admin: 'admin@gannon.edu',
  lead: 'leadtutor@gannon.edu',
  tutor: 'tutor@gannon.edu',
  student: 'student@gannon.edu',
}

async function cookieFor(email) {
  const r = await fetch(`${SB}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { apikey: ANON, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: PW }),
  })
  const s = await r.json()
  if (!s.access_token) throw new Error(`login failed ${email}: ${JSON.stringify(s)}`)
  const v = 'base64-' + Buffer.from(JSON.stringify(s)).toString('base64')
  return `sb-hodbzklmyvarnwdvdhle-auth-token=${v}`
}

const results = []
async function check(name, role, cookie, path, opts = {}) {
  const { expect = 200, method = 'GET', body } = opts
  const t0 = Date.now()
  let status, text
  try {
    const r = await fetch(APP + path, {
      method,
      headers: { Cookie: cookie, ...(body ? { 'Content-Type': 'application/json' } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    })
    status = r.status
    text = await r.text()
  } catch (e) {
    status = 'ERR'
    text = e.message
  }
  const ms = Date.now() - t0
  const expected = Array.isArray(expect) ? expect : [expect]
  const ok = expected.includes(status)
  results.push({ name, role, path, method, status, expect: expected.join('/'), ok, ms,
                 sample: ok ? '' : String(text).slice(0, 90) })
  return { status, text }
}

const cookies = {}
for (const [k, email] of Object.entries(ACCOUNTS)) cookies[k] = await cookieFor(email)

// --- Reads, per role -------------------------------------------------------
const READS = [
  ['bootstrap', '/api/bootstrap'],
  ['auth/me', '/api/auth/me'],
  ['get-role', '/api/auth/get-role'],
  ['init-user', '/api/init-user'],
  ['academics', '/api/academics'],
  ['departments', '/api/departments'],
  ['notes/mine', '/api/notes/mine'],
  ['notes/recent', '/api/notes/recent'],
  ['raffles', '/api/raffles?status=active'],
  ['tags', '/api/tags'],
  ['health', '/api/health'],
]
for (const role of Object.keys(ACCOUNTS))
  for (const [name, path] of READS) await check(name, role, cookies[role], path)

// --- Role-gated ------------------------------------------------------------
await check('explore', 'student', cookies.student, '/api/notes/explore')
await check('explore', 'tutor', cookies.tutor, '/api/notes/explore')
await check('explore', 'admin', cookies.admin, '/api/notes/explore')
await check('lead-tutor/notes', 'admin', cookies.admin, '/api/lead-tutor/notes')
await check('lead-tutor/notes', 'lead', cookies.lead, '/api/lead-tutor/notes')
await check('lead-tutor/notes DENIED', 'student', cookies.student, '/api/lead-tutor/notes', { expect: 403 })
await check('lead-tutor/tutor-activity', 'lead', cookies.lead, '/api/lead-tutor/tutor-activity')
await check('admin/users', 'admin', cookies.admin, '/api/admin/users')
await check('admin/users DENIED', 'student', cookies.student, '/api/admin/users', { expect: 403 })
await check('admin/users DENIED', 'tutor', cookies.tutor, '/api/admin/users', { expect: 403 })
await check('access-codes', 'tutor', cookies.tutor, '/api/access-codes')
await check('access-codes DENIED', 'student', cookies.student, '/api/access-codes', { expect: [401, 403] })

// --- Unauthenticated -------------------------------------------------------
await check('bootstrap NOAUTH', 'anon', '', '/api/bootstrap', { expect: 401 })
await check('explore NOAUTH', 'anon', '', '/api/notes/explore', { expect: 401 })
await check('admin/users NOAUTH', 'anon', '', '/api/admin/users', { expect: 401 })
await check('lead-tutor NOAUTH', 'anon', '', '/api/lead-tutor/notes', { expect: 401 })

// --- Note detail -----------------------------------------------------------
const { text: boot } = await check('bootstrap(student)', 'student', cookies.student, '/api/bootstrap')
const noteId = JSON.parse(boot).notes?.[0]?.id
if (noteId) {
  await check('note detail', 'student', cookies.student, `/api/notes/${noteId}`)
  await check('note reviews', 'student', cookies.student, `/api/notes/${noteId}/reviews`)
  await check('note tutor-review', 'tutor', cookies.tutor, `/api/notes/${noteId}/tutor-review`)
  await check('note tags', 'lead', cookies.lead, `/api/notes/${noteId}/tags`)
  await check('note verify DENIED', 'student', cookies.student, `/api/notes/${noteId}/verify`,
              { method: 'POST', expect: [401, 403] })
  await check('note status DENIED', 'student', cookies.student, `/api/notes/${noteId}/status`,
              { method: 'PUT', body: { status: 'APPROVED' }, expect: [401, 403] })
}

// --- IDOR probe: can a student delete someone else's note? -----------------
const { text: all } = await check('lead notes(admin)', 'admin', cookies.admin, '/api/lead-tutor/notes')
const foreign = (JSON.parse(all).notes || []).find((n) => n.uploader?.name === 'Riley Reader')
if (foreign) {
  await check('DELETE foreign note (IDOR)', 'student', cookies.student, `/api/notes/${foreign.id}`,
              { method: 'DELETE', expect: [401, 403, 404] })
}

// --- Report ----------------------------------------------------------------
const pad = (s, n) => String(s).padEnd(n)
console.log('\n' + pad('RESULT', 7) + pad('ROLE', 9) + pad('MS', 7) + pad('STATUS', 12) + 'ENDPOINT')
console.log('-'.repeat(100))
for (const r of results) {
  console.log(pad(r.ok ? 'PASS' : 'FAIL', 7) + pad(r.role, 9) + pad(r.ms, 7) +
              pad(`${r.status} (want ${r.expect})`, 12) + `${r.method} ${r.path}  ${r.name}` +
              (r.sample ? `\n        ↳ ${r.sample}` : ''))
}
const fails = results.filter((r) => !r.ok)
console.log('-'.repeat(100))
console.log(`${results.length - fails.length}/${results.length} passed`)
const slow = results.filter((r) => r.ok && r.ms > 500).sort((a,b)=>b.ms-a.ms)
if (slow.length) console.log('\nSLOW (>500ms):\n' + slow.map(r=>`  ${r.ms}ms  ${r.path} [${r.role}]`).join('\n'))
