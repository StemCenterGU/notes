import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import prisma from '@/lib/prisma'
import { getAuthedUser } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { writeLimiter } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

export async function POST(req) {
  const { success } = writeLimiter.check(req)
  if (!success) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const { authUser, dbUser } = await getAuthedUser()

  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!dbUser) {
    return NextResponse.json({ error: 'User not found in database' }, { status: 404 })
  }

  const formData = await req.formData()
  const title = formData.get('title')
  const description = formData.get('description')
  const courseId = formData.get('courseId')
  const semesterId = formData.get('semesterId')
  const professorId = formData.get('professorId')
  const file = formData.get('file')
  const tagIdsRaw = formData.get('tagIds')

  if (!file || !title || !courseId || !semesterId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Validate file type.
  //
  // Extension is the source of truth and the MIME type is only cross-checked,
  // because browsers disagree about MIME for Office files (.xlsx arrives as
  // application/octet-stream or an empty string from some clients) and a
  // strict MIME check silently rejected valid uploads.
  //
  // Spreadsheets and plain text are allowed because the viewer already renders
  // them; they were missing from this list, so students could not upload the
  // one format a lab or problem set most often comes in.
  const ALLOWED_EXTENSIONS = {
    pdf: ['application/pdf'],
    jpg: ['image/jpeg'],
    jpeg: ['image/jpeg'],
    png: ['image/png'],
    gif: ['image/gif'],
    webp: ['image/webp'],
    doc: ['application/msword'],
    docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    xls: ['application/vnd.ms-excel'],
    xlsx: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    csv: ['text/csv', 'application/csv'],
    txt: ['text/plain'],
    ppt: ['application/vnd.ms-powerpoint'],
    pptx: ['application/vnd.openxmlformats-officedocument.presentationml.presentation'],
  }
  const GENERIC_TYPES = ['', 'application/octet-stream', 'binary/octet-stream']

  const fileExt = file.name.split('.').pop()?.toLowerCase()
  const expectedTypes = ALLOWED_EXTENSIONS[fileExt]

  if (!expectedTypes) {
    return NextResponse.json({
      error: `Unsupported file type ".${fileExt ?? ''}". Allowed: PDF, Word, Excel, PowerPoint, images, CSV and text.`,
    }, { status: 400 })
  }

  // A declared MIME type that contradicts the extension is a mismatch worth
  // rejecting; a generic or absent one just means the browser did not know.
  const declaredType = (file.type || '').toLowerCase()
  if (!GENERIC_TYPES.includes(declaredType) && !expectedTypes.includes(declaredType)) {
    return NextResponse.json({
      error: `This file says it is ${declaredType} but is named ".${fileExt}". Re-save it and try again.`,
    }, { status: 400 })
  }

  // Normalise what we store so the viewer gets a type it recognises, whatever
  // the browser claimed.
  const contentType = expectedTypes[0]

  // Validate file size (max 10MB)
  const MAX_SIZE = 10 * 1024 * 1024
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large. Maximum size is 10MB' }, { status: 400 })
  }

  // 1. Upload file to Supabase Storage
  const filePath = `${dbUser.id}/${randomUUID()}.${fileExt}`

  const { error: uploadError } = await supabaseAdmin.storage
    .from('notes')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType,
    })

  if (uploadError) {
    console.error('[Upload Error]', uploadError)
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 })
  }

  // 2. Get the public URL of the uploaded file
  const { data: publicUrlData } = supabaseAdmin.storage
    .from('notes')
    .getPublicUrl(filePath)

  const fileUrl = publicUrlData.publicUrl

  // Parse tag IDs if provided
  let tagIds = []
  if (tagIdsRaw) {
    try {
      tagIds = JSON.parse(tagIdsRaw)
      if (!Array.isArray(tagIds)) tagIds = []
    } catch {
      tagIds = []
    }
  }

  // 3. Create the Note record, NoteTag records, and award Kudos points in a transaction
  try {
    const result = await prisma.$transaction(async (tx) => {
      const newNote = await tx.note.create({
        data: {
          title,
          description,
          filePath,
          fileType: fileExt,
          fileUrl, // Save the public URL
          uploaderId: dbUser.id,
          courseId: courseId,
          semesterId: semesterId,
          ...(professorId ? { professorId } : {}),
        },
      })

      // Create NoteTag records if tags were selected
      if (tagIds.length > 0) {
        await tx.noteTag.createMany({
          data: tagIds.map((tagId) => ({
            noteId: newNote.id,
            tagId,
          })),
          skipDuplicates: true,
        })
      }

      await tx.user.update({
        where: { id: dbUser.id },
        data: {
          kudosPoints: {
            increment: 10,
          },
        },
      })

      return newNote
    })

    return NextResponse.json({ note: result }, { status: 201 })
  } catch (error) {
    console.error('[DB Insert Error]', error)
    // Cleanup the uploaded file if the DB insert fails
    await supabaseAdmin.storage.from('notes').remove([filePath])
    console.log(`Cleaned up failed upload: ${filePath}`)

    return NextResponse.json({ error: 'Database insert failed' }, { status: 500 })
  }
}
