// Full lifecycle: student uploads -> tutor reviews -> publish -> student sees it -> access code view
const SB = 'https://hodbzklmyvarnwdvdhle.supabase.co'
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const APP = 'http://localhost:3000'
const PW = 'GuNotes!2026'

async function login(email) {
  const r = await fetch(`${SB}/auth/v1/token?grant_type=password`, {
    method: 'POST', headers: { apikey: ANON, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: PW }) })
  const s = await r.json()
  if (!s.access_token) throw new Error(`login ${email}: ${JSON.stringify(s)}`)
  return `sb-hodbzklmyvarnwdvdhle-auth-token=base64-${Buffer.from(JSON.stringify(s)).toString('base64')}`
}
const J = async (cookie, path, opts={}) => {
  const r = await fetch(APP+path, { method: opts.method||'GET',
    headers: { Cookie: cookie, ...(opts.body?{'Content-Type':'application/json'}:{}) },
    body: opts.body?JSON.stringify(opts.body):undefined })
  const t = await r.text()
  let j; try { j = JSON.parse(t) } catch { j = t.slice(0,200) }
  return { status: r.status, j }
}
const step = (n, ok, extra='') => console.log(`${ok?'PASS':'FAIL'}  ${n}${extra?'  -> '+extra:''}`)

// minimal valid PDF
function pdf(label) {
  const body = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 300 100]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj
4 0 obj<</Length 60>>stream
BT /F1 18 Tf 20 50 Td (${label}) Tj ET
endstream endobj
5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj
trailer<</Root 1 0 R>>`
  return Buffer.from(body, 'latin1')
}

const student = await login('student@gannon.edu')
const tutor   = await login('tutor@gannon.edu')
const lead    = await login('leadtutor@gannon.edu')

// 0. what can a student pick from?
const boot = await J(student, '/api/bootstrap')
const ac = boot.j.academics || {}
console.log('academics keys:', Object.keys(ac), 'courses:', (ac.courses||[]).length, 'semesters:', (ac.semesters||[]).length)
const course = (ac.courses||[])[0]
const semester = (ac.semesters||[])[0]
step('bootstrap gives student a course+semester to upload against', !!(course&&semester),
     `${course?.code||'NO COURSE'} / ${semester?.name||'NO SEMESTER'}`)
if (!course||!semester) process.exit(1)

// 1. UPLOAD as student
const fd = new FormData()
const title = 'Flow test ' + Date.now()
fd.set('title', title)
fd.set('description', 'uploaded by automated flow test')
fd.set('courseId', course.id)
fd.set('semesterId', semester.id)
fd.set('file', new Blob([pdf('FLOW TEST NOTE')], { type: 'application/pdf' }), 'flow.pdf')
let r = await fetch(APP+'/api/notes/upload', { method:'POST', headers:{Cookie:student}, body: fd })
const upText = await r.text(); let up; try{up=JSON.parse(upText)}catch{up={raw:upText,len:upText.length}}
step('student uploads a PDF', r.status===201, `${r.status} ${JSON.stringify(up).slice(0,120)}`)
if (r.status!==201) process.exit(1)
const noteId = up.note.id
console.log('   noteId:', noteId, 'status:', up.note.status, 'isPublic:', up.note.isPublic)

// 2. does it show in the student's own list?
let mine = await J(student, '/api/notes/mine')
step('note appears in student\'s own notes', (mine.j.notes||[]).some(n=>n.id===noteId))

// 3. is the public file URL reachable without any auth? (access-code bypass check)
const fileUrl = up.note.fileUrl
const anonFetch = await fetch(fileUrl)
step('file is NOT readable anonymously via stored URL', anonFetch.status!==200,
     `anon GET ${fileUrl.slice(0,70)}... -> ${anonFetch.status}`)

// 4. does it reach the tutor review queue?
let queue = await J(lead, '/api/lead-tutor/notes?status=UNREVIEWED')
step('note lands in the review queue', (queue.j.notes||[]).some(n=>n.id===noteId),
     `counts=${JSON.stringify(queue.j.counts)}`)

// 5. TUTOR approves it
let rev = await J(tutor, `/api/notes/${noteId}/tutor-review`, { method:'POST',
  body: { comment:'Clear and complete. Approved.', rating:5, decision:'APPROVE' } })
step('tutor approves the note', rev.status===201, `${rev.status} ${JSON.stringify(rev.j).slice(0,100)}`)

// 6. after approval, is it visible to OTHER students in explore?
let exp = await J(student, '/api/notes/explore')
const inExploreAfterApprove = (exp.j.notes||[]).some(n=>n.id===noteId)
step('approved note is visible in explore (no extra step needed)', inExploreAfterApprove,
     inExploreAfterApprove?'':'APPROVED but isPublic=false -> invisible to students')

// 7. does the student learn the outcome of the review?
let mine2 = await J(student, '/api/notes/mine')
const myNote = (mine2.j.notes||[]).find(n=>n.id===noteId)
step('student can see their note\'s review status', myNote?.status==='APPROVED', `status=${myNote?.status}`)
const hasFeedback = JSON.stringify(myNote||{}).includes('Approved')
step('student can see the tutor\'s feedback comment', hasFeedback,
     hasFeedback?'':'tutor comment stored but never surfaced to uploader')

// 8. lead tutor publishes
let pub = await J(lead, `/api/notes/${noteId}/public`, { method:'PUT', body:{ isPublic:true } })
step('lead tutor publishes the note', pub.status===200, `${pub.status}`)
let exp2 = await J(student, '/api/notes/explore')
step('published note now visible in explore', (exp2.j.notes||[]).some(n=>n.id===noteId))

// 9. access code flow
let code = await J(tutor, '/api/access-codes', { method:'POST',
  body:{ noteIds:[noteId], durationType:'duration', duration:30 } })
step('tutor generates an access code', code.status===201, `${code.status} code=${code.j.code}`)
if (code.status===201) {
  const student2 = await login('student2@gannon.edu')
  let val = await fetch(APP+'/api/access-codes/validate', { method:'POST',
    headers:{'Content-Type':'application/json', Cookie: student2}, body: JSON.stringify({ code: code.j.code }) })
  const vj = await val.json()
  step('walk-in student redeems the code', val.status===200, `${val.status} ${JSON.stringify(vj).slice(0,160)}`)
  if (vj.sessionToken) {
    let view = await fetch(APP+`/api/access-codes/view/${noteId}`, { headers:{ Authorization:`Bearer ${vj.sessionToken}` } })
    const vv = await view.json()
    step('code holder can view the note content', view.status===200,
         `${view.status} mime=${vv.mimeType} bytes=${vv.content?vv.content.length:0}`)
  }
}

// 10. detail route must hand back a working, signed, non-public URL
const det = await J(student, `/api/notes/${noteId}`)
const u = det.j.note?.fileUrl || ''
step('detail route returns a signed (not public) URL', u.includes('/object/sign/') && u.includes('token='), u.slice(0,80))
step('detail route does not leak the raw storage path', !('filePath' in (det.j.note||{})))
if (u) { const g = await fetch(u); step('signed URL actually serves the file', g.status===200, `GET -> ${g.status} ${g.headers.get('content-type')}`) }

// 11. a student who should NOT see a non-public note
console.log('\n--- cleanup ---')
const del = await J(lead, `/api/notes/${noteId}`, { method:'DELETE' })
console.log('delete test note:', del.status)
