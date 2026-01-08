import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const checks = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: 'unknown',
  }

  try {
    // Check database connectivity
    await prisma.$queryRaw`SELECT 1`
    checks.database = 'connected'
  } catch (error) {
    checks.status = 'unhealthy'
    checks.database = 'disconnected'
    console.error('Health check failed:', error.message)
    return NextResponse.json(checks, { status: 503 })
  }

  return NextResponse.json(checks)
}
