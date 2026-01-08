import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// DELETE /api/access-codes/[id] - Revoke an access code
export async function DELETE(req, { params }) {
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
    const { id } = await params

    // Find the access code
    const accessCode = await prisma.accessCode.findUnique({
      where: { id },
    })

    if (!accessCode) {
      return NextResponse.json({ error: 'Access code not found' }, { status: 404 })
    }

    // Only the creator or an admin can revoke
    if (accessCode.createdById !== dbUser.id && dbUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Cannot revoke this code' }, { status: 403 })
    }

    // Revoke the code
    await prisma.accessCode.update({
      where: { id },
      data: { isRevoked: true },
    })

    return NextResponse.json({ success: true, message: 'Code revoked successfully' })

  } catch (error) {
    console.error('Failed to revoke access code:', error)
    return NextResponse.json({ error: 'Failed to revoke code' }, { status: 500 })
  }
}

// GET /api/access-codes/[id] - Get details of a specific code
export async function GET(req, { params }) {
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
    const { id } = await params

    const accessCode = await prisma.accessCode.findUnique({
      where: { id },
      include: {
        notes: {
          include: {
            note: {
              select: { id: true, title: true, fileType: true },
            },
          },
        },
        createdBy: {
          select: { name: true, email: true },
        },
      },
    })

    if (!accessCode) {
      return NextResponse.json({ error: 'Access code not found' }, { status: 404 })
    }

    // Only creator or admin can view details
    if (accessCode.createdById !== dbUser.id && dbUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Cannot view this code' }, { status: 403 })
    }

    return NextResponse.json({
      id: accessCode.id,
      code: accessCode.code,
      notes: accessCode.notes.map(n => n.note),
      createdAt: accessCode.createdAt,
      expiresAt: accessCode.expiresAt,
      duration: accessCode.duration,
      isUsed: accessCode.isUsed,
      isRevoked: accessCode.isRevoked,
      studentEmail: accessCode.studentEmail,
      activatedAt: accessCode.activatedAt,
      lastHeartbeat: accessCode.lastHeartbeat,
      createdBy: accessCode.createdBy,
    })

  } catch (error) {
    console.error('Failed to fetch access code:', error)
    return NextResponse.json({ error: 'Failed to fetch code' }, { status: 500 })
  }
}
