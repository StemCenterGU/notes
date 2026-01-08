import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { randomInt } from 'crypto'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// Generate a 6-digit code
function generateCode() {
  return String(randomInt(100000, 999999))
}

// POST /api/access-codes - Generate new access code (Tutor/Admin/Professor only)
export async function POST(req) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
  })

  if (!dbUser || !['TUTOR', 'ADMIN', 'PROFESSOR'].includes(dbUser.role)) {
    return NextResponse.json({ error: 'Forbidden - Tutors only' }, { status: 403 })
  }

  try {
    const body = await req.json()
    const { noteIds, durationType, duration, expiresAt } = body

    if (!noteIds || !Array.isArray(noteIds) || noteIds.length === 0) {
      return NextResponse.json({ error: 'At least one note is required' }, { status: 400 })
    }

    if (!durationType || !['duration', 'endTime'].includes(durationType)) {
      return NextResponse.json({ error: 'Invalid duration type' }, { status: 400 })
    }

    // Calculate expiry time
    let calculatedExpiresAt
    if (durationType === 'duration') {
      if (!duration || duration < 1) {
        return NextResponse.json({ error: 'Duration must be at least 1 minute' }, { status: 400 })
      }
      calculatedExpiresAt = new Date(Date.now() + duration * 60 * 1000)
    } else {
      if (!expiresAt) {
        return NextResponse.json({ error: 'End time is required' }, { status: 400 })
      }
      calculatedExpiresAt = new Date(expiresAt)
      if (calculatedExpiresAt <= new Date()) {
        return NextResponse.json({ error: 'End time must be in the future' }, { status: 400 })
      }
    }

    // Verify all notes exist and user has access
    const notes = await prisma.note.findMany({
      where: { id: { in: noteIds } },
      select: { id: true },
    })

    if (notes.length !== noteIds.length) {
      return NextResponse.json({ error: 'One or more notes not found' }, { status: 404 })
    }

    // Generate unique code
    let code
    let codeExists = true
    while (codeExists) {
      code = generateCode()
      const existing = await prisma.accessCode.findUnique({ where: { code } })
      codeExists = !!existing
    }

    // Create access code with notes
    const accessCode = await prisma.accessCode.create({
      data: {
        code,
        createdById: dbUser.id,
        duration: durationType === 'duration' ? duration : null,
        expiresAt: calculatedExpiresAt,
        notes: {
          create: noteIds.map(noteId => ({ noteId })),
        },
      },
      include: {
        notes: {
          include: {
            note: {
              select: { id: true, title: true },
            },
          },
        },
      },
    })

    return NextResponse.json({
      code: accessCode.code,
      expiresAt: accessCode.expiresAt,
      noteCount: accessCode.notes.length,
      notes: accessCode.notes.map(n => ({ id: n.note.id, title: n.note.title })),
    }, { status: 201 })

  } catch (error) {
    console.error('Failed to create access code:', error)
    return NextResponse.json({ error: 'Failed to create access code' }, { status: 500 })
  }
}

// GET /api/access-codes - List all codes created by the current tutor
export async function GET(req) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
  })

  if (!dbUser || !['TUTOR', 'ADMIN', 'PROFESSOR'].includes(dbUser.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const codes = await prisma.accessCode.findMany({
      where: { createdById: dbUser.id },
      include: {
        notes: {
          include: {
            note: {
              select: { id: true, title: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    const formattedCodes = codes.map(c => ({
      id: c.id,
      code: c.code,
      notes: c.notes.map(n => ({ id: n.note.id, title: n.note.title })),
      createdAt: c.createdAt,
      expiresAt: c.expiresAt,
      duration: c.duration,
      isUsed: c.isUsed,
      isRevoked: c.isRevoked,
      studentEmail: c.studentEmail,
      activatedAt: c.activatedAt,
      status: c.isRevoked
        ? 'revoked'
        : new Date() > c.expiresAt
        ? 'expired'
        : c.isUsed
        ? 'active'
        : 'pending',
    }))

    return NextResponse.json({ codes: formattedCodes })
  } catch (error) {
    console.error('Failed to fetch access codes:', error)
    return NextResponse.json({ error: 'Failed to fetch access codes' }, { status: 500 })
  }
}
