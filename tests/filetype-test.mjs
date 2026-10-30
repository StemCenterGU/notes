const SB='https://hodbzklmyvarnwdvdhle.supabase.co', ANON=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const APP='http://localhost:3000', PW='GuNotes!2026'
async function login(e){const r=await fetch(`${SB}/auth/v1/token?grant_type=password`,{method:'POST',headers:{apikey:ANON,'Content-Type':'application/json'},body:JSON.stringify({email:e,password:PW})});const s=await r.json();return `sb-hodbzklmyvarnwdvdhle-auth-token=base64-${Buffer.from(JSON.stringify(s)).toString('base64')}`}
const student=await login('student@gannon.edu'), lead=await login('leadtutor@gannon.edu')
const boot=await (await fetch(APP+'/api/bootstrap',{headers:{Cookie:student}})).json()
const course=boot.academics.courses[0], semester=boot.academics.semesters[0]

// Real-ish minimal files. zip-based Office files need a valid zip header.
const zip = (name) => { // minimal (invalid-content but well-formed-enough) zip
  const b=Buffer.alloc(22); b.write('PK\x05\x06',0,'latin1'); return b }
const files = [
  ['pdf',  'application/pdf', Buffer.from('%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\ntrailer<</Root 1 0 R>>','latin1')],
  ['png',  'image/png', Buffer.from('89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c63000100000500010d0a2db40000000049454e44ae426082','hex')],
  ['jpg',  'image/jpeg', Buffer.from('ffd8ffe000104a46494600010100000100010000ffdb004300ffd9','hex')],
  ['gif',  'image/gif', Buffer.from('474946383961010001000000002c00000000010001000002003b','hex')],
  ['txt',  'text/plain', Buffer.from('Lecture notes: week 1\nNewton\'s laws.\n')],
  ['csv',  'text/csv', Buffer.from('x,y\n1,2\n3,4\n')],
  ['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', zip()],
  ['xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', zip()],
  ['pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', zip()],
  // browser sent no MIME type at all -- must still be accepted
  ['xlsx', '', zip(), 'xlsx (browser sent no MIME)'],
  // extension/MIME mismatch -- must be REJECTED
  ['pdf',  'image/png', Buffer.from('x'), 'pdf claiming image/png (expect reject)', 400],
  // disallowed type -- must be REJECTED
  ['exe',  'application/x-msdownload', Buffer.from('MZ'), 'exe (expect reject)', 400],
]
const created=[]
for (const [ext,mime,buf,label,expect=201] of files) {
  const fd=new FormData()
  fd.set('title',`type test ${label||ext} ${Date.now()}`)
  fd.set('courseId',course.id); fd.set('semesterId',semester.id)
  fd.set('file', new Blob([buf],{type:mime}), `sample.${ext}`)
  const r=await fetch(APP+'/api/notes/upload',{method:'POST',headers:{Cookie:student},body:fd})
  const t=await r.text(); let j; try{j=JSON.parse(t)}catch{j={raw:t.slice(0,80)}}
  const ok=r.status===expect
  console.log(`${ok?'PASS':'FAIL'}  ${(label||ext).padEnd(32)} ${r.status} ${ok?'':JSON.stringify(j).slice(0,110)}`)
  if(r.status===201){created.push(j.note.id)
    // verify it is readable back through the authorized detail route
    const d=await (await fetch(APP+`/api/notes/${j.note.id}`,{headers:{Cookie:student}})).json()
    const u=d.note?.fileUrl
    const g=u?await fetch(u):{status:'no-url'}
    console.log(`      serve-back: fileType=${d.note?.fileType} signedGET=${g.status} ct=${g.headers?.get?.('content-type')}`)
  }
}
for(const id of created) await fetch(APP+`/api/notes/${id}`,{method:'DELETE',headers:{Cookie:lead}})
console.log(`\ncleaned up ${created.length} test notes`)
