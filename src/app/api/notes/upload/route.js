import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { randomUUID } from 'crypto'
import prisma from '@/lib/prisma'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { writeLimiter } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

export async function POST(req) {
  const { success } = writeLimiter.check(req)
  if (!success) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
    select: { id: true },
  })

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

  // Validate file type
  const ALLOWED_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ]
  const ALLOWED_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'doc', 'docx', 'ppt', 'pptx']

  const fileExt = file.name.split('.').pop()?.toLowerCase()

  if (!ALLOWED_TYPES.includes(file.type) || !ALLOWED_EXTENSIONS.includes(fileExt)) {
    return NextResponse.json({ error: 'Invalid file type. Allowed: PDF, images, Word, PowerPoint' }, { status: 400 })
  }

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
      contentType: file.type,
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
