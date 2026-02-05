import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const [courses, professors, semesters] = await prisma.$transaction([
      prisma.course.findMany(),
      prisma.professor.findMany(),
      prisma.semester.findMany({
        orderBy: [
          { year: 'desc' },  // Latest year first
          { name: 'asc' },   // Fall before Spring within same year (Fall < Spring alphabetically)
        ],
      }),
    ])

    // Format semesters as "Spring 2026" for display
    const formattedSemesters = semesters.map(semester => ({
      ...semester,
      name: `${semester.name} ${semester.year}`,
    }))

    return NextResponse.json({
      courses,
      professors,
      semesters: formattedSemesters,
    })
  } catch (error) {
    console.error('Error fetching academic data:', error)
    return NextResponse.json({ error: 'Failed to fetch academic data' }, { status: 500 })
  }
}
