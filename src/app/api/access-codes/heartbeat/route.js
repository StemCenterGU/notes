import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const JWT_SECRET = process.env.SUPABASE_SERVICE_ROLE_KEY
const HEARTBEAT_TIMEOUT = 2 * 60 * 1000 // 2 minutes

// POST /api/access-codes/heartbeat - Keep session alive
export async function POST(req) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing token' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]

    let decoded
    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch (e) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 })
    }

    // Verify device ID
    const userAgent = req.headers.get('user-agent') || 'unknown'
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const deviceId = Buffer.from(`${userAgent}-${ip}`).toString('base64').slice(0, 32)

    if (decoded.deviceId !== deviceId) {
      return NextResponse.json({ error: 'Device mismatch' }, { status: 403 })
    }

    // Get access code
    const accessCode = await prisma.accessCode.findUnique({
      where: { id: decoded.codeId },
    })

    if (!accessCode) {
      return NextResponse.json({ error: 'Code not found' }, { status: 404 })
    }

    // Check if revoked
    if (accessCode.isRevoked) {
      return NextResponse.json({ error: 'Code has been revoked' }, { status: 403 })
    }

    // Check if expired
    if (new Date() > accessCode.expiresAt) {
      return NextResponse.json({ error: 'Session expired' }, { status: 403 })
    }

    // Update heartbeat
    await prisma.accessCode.update({
      where: { id: accessCode.id },
      data: { lastHeartbeat: new Date() },
    })

    const remainingMs = accessCode.expiresAt.getTime() - Date.now()

    return NextResponse.json({
      success: true,
      remainingSeconds: Math.floor(remainingMs / 1000),
      expiresAt: accessCode.expiresAt,
    })

  } catch (error) {
    console.error('Heartbeat failed:', error)
    return NextResponse.json({ error: 'Heartbeat failed' }, { status: 500 })
  }
}
