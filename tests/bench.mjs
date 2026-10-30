const SB='https://hodbzklmyvarnwdvdhle.supabase.co', ANON=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const APP='http://localhost:3000', PW='GuNotes!2026'
async function login(e){const r=await fetch(`${SB}/auth/v1/token?grant_type=password`,{method:'POST',headers:{apikey:ANON,'Content-Type':'application/json'},body:JSON.stringify({email:e,password:PW})});const s=await r.json();return `sb-hodbzklmyvarnwdvdhle-auth-token=base64-${Buffer.from(JSON.stringify(s)).toString('base64')}`}
const lead=await login('leadtutor@gannon.edu'), student=await login('student@gannon.edu')
const boot=await (await fetch(APP+'/api/bootstrap',{headers:{Cookie:student}})).json()
const exp=await (await fetch(APP+'/api/notes/explore',{headers:{Cookie:student}})).json()
const noteId=(exp.notes||[])[0]?.id
const raffleId=boot.activeRaffle?.id
const ROUTES=[
  ['GET','/api/notes/explore',student],
  ['GET','/api/bootstrap',student],
  ['GET','/api/notes/mine',student],
  ['GET',`/api/notes/${noteId}`,student],
  ['GET',`/api/notes/${noteId}/reviews`,student],
  ['GET','/api/lead-tutor/notes',lead],
  ['GET','/api/lead-tutor/tutor-activity',lead],
  ['GET','/api/admin/users',lead],
  ['GET','/api/access-codes',lead],
  ['GET','/api/raffles',student],
  ...(raffleId?[['GET',`/api/raffles/${raffleId}`,student]]:[]),
  ['GET','/api/academics',student],
  ['GET','/api/tags',student],
  ['GET','/api/departments',student],
]
console.log('route'.padEnd(42),'p50','p90','bytes')
for(const [m,p,c] of ROUTES){
  // warm
  await fetch(APP+p,{method:m,headers:{Cookie:c}})
  const ts=[]; let bytes=0
  for(let i=0;i<7;i++){const t=Date.now();const r=await fetch(APP+p,{method:m,headers:{Cookie:c}});const b=await r.arrayBuffer();bytes=b.byteLength;ts.push(Date.now()-t)}
  ts.sort((a,b)=>a-b)
  console.log(p.padEnd(42),String(ts[3]).padStart(4),String(ts[6]).padStart(4),(bytes/1024).toFixed(1)+'KB')
}
