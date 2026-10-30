import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthedUser } from '@/lib/auth'
import { MY_NOTE_SELECT, shapeMyNotes } from '@/lib/note-select'

export const dynamic = 'force-dynamic'

/**
 * The uploader's own notes.
 *
 * Returns the review outcome *and* the tutor's comment. Without the comment a
 * rejected note is a dead end: the student has no idea what to fix and
 * re-uploads the same file.
 *
 * Deliberately does not return filePath or fileUrl. Reading a file goes
 * through /api/notes/[id], which signs a short-lived URL after authorizing.
 */
export async function GET() {
  const { authUser, dbUser } = await getAuthedUser()

  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!dbUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  try {
    const notes = await prisma.note.findMany({
      relationLoadStrategy: 'join',
      where: { uploaderId: dbUser.id },
      orderBy: { createdAt: 'desc' },
      select: MY_NOTE_SELECT,
    })

    const withRatings = shapeMyNotes(notes)

    return NextResponse.json({ notes: withRatings })
  } catch (error) {
    console.error('Failed to fetch user notes:', error)
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
  }
}
