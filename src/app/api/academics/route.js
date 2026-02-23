import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { academicsCache } from '@/lib/cache'

export const dynamic = 'force-dynamic'

export async function GET() {
  const cached = academicsCache.get('all')
  if (cached) return NextResponse.json(cached)

  try {
    const [departments, courses, professors, semesters] = await prisma.$transaction([
      prisma.department.findMany({
        orderBy: { name: 'asc' },
      }),
      prisma.course.findMany({
        select: {
          id: true,
          name: true,
          code: true,
          departmentId: true,
          professorId: true,
        },
      }),
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

    const result = {
      departments,
      courses,
      professors,
      semesters: formattedSemesters,
    }

    academicsCache.set('all', result)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching academic data:', error)
    return NextResponse.json({ error: 'Failed to fetch academic data' }, { status: 500 })
  }
}
