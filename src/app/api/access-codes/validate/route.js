import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const JWT_SECRET = process.env.SUPABASE_SERVICE_ROLE_KEY // Use existing secret

// POST /api/access-codes/validate - Validate and activate a code
export async function POST(req) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Please log in to access notes' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { code } = body

    if (!code || code.length !== 6) {
      return NextResponse.json({ error: 'Invalid code format' }, { status: 400 })
    }

    // Find the access code
    const accessCode = await prisma.accessCode.findUnique({
      where: { code },
      include: {
        notes: {
          include: {
            note: {
              select: { id: true, title: true, fileType: true },
            },
          },
        },
      },
    })

    if (!accessCode) {
      return NextResponse.json({ error: 'Invalid code' }, { status: 404 })
    }

    // Check if revoked
    if (accessCode.isRevoked) {
      return NextResponse.json({ error: 'This code has been revoked' }, { status: 403 })
    }

    // Check if expired
    if (new Date() > accessCode.expiresAt) {
      return NextResponse.json({ error: 'This code has expired' }, { status: 403 })
    }

    // Generate device ID from request headers
    const userAgent = req.headers.get('user-agent') || 'unknown'
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const deviceId = Buffer.from(`${userAgent}-${ip}`).toString('base64').slice(0, 32)

    // Check if already used by different device
    if (accessCode.isUsed && accessCode.deviceId !== deviceId) {
      return NextResponse.json({
        error: 'This code is already in use on another device'
      }, { status: 403 })
    }

    // Activate the code if not already
    if (!accessCode.isUsed) {
      await prisma.accessCode.update({
        where: { id: accessCode.id },
        data: {
          isUsed: true,
          activatedAt: new Date(),
          deviceId,
          studentEmail: user.email,
          lastHeartbeat: new Date(),
        },
      })
    } else {
      // Update heartbeat
      await prisma.accessCode.update({
        where: { id: accessCode.id },
        data: { lastHeartbeat: new Date() },
      })
    }

    // Generate JWT session token
    const sessionToken = jwt.sign(
      {
        codeId: accessCode.id,
        code: accessCode.code,
        deviceId,
        userId: user.id,
        exp: Math.floor(accessCode.expiresAt.getTime() / 1000),
      },
      JWT_SECRET
    )

    return NextResponse.json({
      valid: true,
      sessionToken,
      expiresAt: accessCode.expiresAt,
      notes: accessCode.notes.map(n => ({
        id: n.note.id,
        title: n.note.title,
        fileType: n.note.fileType,
      })),
    })

  } catch (error) {
    console.error('Failed to validate access code:', error)
    return NextResponse.json({ error: 'Failed to validate code' }, { status: 500 })
  }
}
