import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

const JWT_SECRET = process.env.SUPABASE_SERVICE_ROLE_KEY
const HEARTBEAT_TIMEOUT = 2 * 60 * 1000 // 2 minutes - session invalidated if no heartbeat

// GET /api/access-codes/view/[noteId] - Get protected note content
export async function GET(req, { params }) {
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
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 })
    }

    // Verify device ID
    const userAgent = req.headers.get('user-agent') || 'unknown'
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const deviceId = Buffer.from(`${userAgent}-${ip}`).toString('base64').slice(0, 32)

    if (decoded.deviceId !== deviceId) {
      return NextResponse.json({ error: 'Access denied - device mismatch' }, { status: 403 })
    }

    const { noteId } = await params

    // Get access code with notes
    const accessCode = await prisma.accessCode.findUnique({
      where: { id: decoded.codeId },
      include: {
        notes: {
          where: { noteId },
          include: {
            note: true,
          },
        },
      },
    })

    if (!accessCode) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 404 })
    }

    // Check if revoked
    if (accessCode.isRevoked) {
      return NextResponse.json({ error: 'Access has been revoked' }, { status: 403 })
    }

    // Check if expired
    if (new Date() > accessCode.expiresAt) {
      return NextResponse.json({ error: 'Session expired' }, { status: 403 })
    }

    // Check heartbeat timeout (2 minutes of inactivity)
    if (accessCode.lastHeartbeat) {
      const timeSinceHeartbeat = Date.now() - accessCode.lastHeartbeat.getTime()
      if (timeSinceHeartbeat > HEARTBEAT_TIMEOUT) {
        return NextResponse.json({ error: 'Session timed out due to inactivity' }, { status: 403 })
      }
    }

    // Check if note is in this access code
    if (accessCode.notes.length === 0) {
      return NextResponse.json({ error: 'Note not found in this access code' }, { status: 404 })
    }

    const note = accessCode.notes[0].note

    // Download file from Supabase
    const { data: fileData, error: downloadError } = await supabaseAdmin.storage
      .from('notes')
      .download(note.filePath)

    if (downloadError) {
      console.error('Download error:', downloadError)
      return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 })
    }

    // Convert to base64
    const arrayBuffer = await fileData.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')

    // Update heartbeat
    await prisma.accessCode.update({
      where: { id: accessCode.id },
      data: { lastHeartbeat: new Date() },
    })

    return NextResponse.json({
      noteId: note.id,
      title: note.title,
      fileType: note.fileType,
      mimeType: fileData.type,
      content: base64,
      watermark: {
        email: accessCode.studentEmail,
        code: accessCode.code,
        timestamp: new Date().toISOString(),
      },
      remainingSeconds: Math.floor((accessCode.expiresAt.getTime() - Date.now()) / 1000),
    })

  } catch (error) {
    console.error('Failed to get protected content:', error)
    return NextResponse.json({ error: 'Failed to get content' }, { status: 500 })
  }
}
