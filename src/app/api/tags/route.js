import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { SUPERVISOR_ROLES } from '@/lib/roles'

export const dynamic = 'force-dynamic'

// GET /api/tags - List all tags grouped by category (public, no auth needed)
export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: [
        { category: 'asc' },
        { name: 'asc' },
      ],
    })

    // Group by category
    const grouped = {
      RESOURCE_TYPE: [],
      STUDY_CYCLE: [],
      GENERAL: [],
    }

    for (const tag of tags) {
      grouped[tag.category].push(tag)
    }

    return NextResponse.json(grouped)
  } catch (error) {
    console.error('Error fetching tags:', error)
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 })
  }
}

// POST /api/tags - Create a tag (LEAD_TUTOR/ADMIN only)
export async function POST(request) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
  })

  if (!dbUser || !SUPERVISOR_ROLES.includes(dbUser.role)) {
    return NextResponse.json({ error: 'Forbidden - Lead Tutors and Admins only' }, { status: 403 })
  }

  try {
    const { name, category } = await request.json()

    if (!name || !category) {
      return NextResponse.json({ error: 'Name and category are required' }, { status: 400 })
    }

    const validCategories = ['RESOURCE_TYPE', 'STUDY_CYCLE', 'GENERAL']
    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: 'Invalid category. Must be RESOURCE_TYPE, STUDY_CYCLE, or GENERAL' }, { status: 400 })
    }

    const tag = await prisma.tag.create({
      data: {
        name: name.trim(),
        category,
        createdById: dbUser.id,
      },
    })

    return NextResponse.json(tag, { status: 201 })
  } catch (error) {
    console.error('Error creating tag:', error)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'A tag with this name already exists in this category' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 })
  }
}
