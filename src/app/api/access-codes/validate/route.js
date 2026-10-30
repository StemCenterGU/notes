import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'
import { rateLimit, clientKey } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

const JWT_SECRET = process.env.SUPABASE_SERVICE_ROLE_KEY // Use existing secret

// POST /api/access-codes/validate - Validate and activate a code
export async function POST(req) {
  // A 6-character code is guessable in bulk without a brake on attempts.
  const limiter = rateLimit(clientKey(req, 'accesscode'), { limit: 10, windowMs: 60_000 })
  if (!limiter.allowed) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(limiter.retryAfterMs / 1000)) } }
    )
  }

  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Please log in to access notes' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { code } = body

    // Accept both the legacy numeric codes and the wider alphabet.
    const normalised = typeof code === 'string' ? code.trim().toUpperCase() : ''
    if (!/^[0-9A-HJKMNP-TV-Z]{6}$/.test(normalised)) {
      return NextResponse.json({ error: 'Invalid code format' }, { status: 400 })
    }

    // Find the access code
    const accessCode = await prisma.accessCode.findUnique({
      relationLoadStrategy: 'join',
      where: { code: normalised },
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
