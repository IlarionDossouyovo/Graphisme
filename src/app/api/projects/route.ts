import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const projectSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  description: z.string().optional(),
  service: z.enum([
    'DESIGN_GRAPHIC', 'WEB_DEVELOPMENT', 'MOBILE_DEVELOPMENT', 
    'AI_SERVICES', 'VIDEO_PRODUCTION', 'ECOMMERCE', 
    'MARKETING_DIGITAL', 'SEO_SEA', 'COMMUNITY_MANAGEMENT', 
    'CLOUD_DEVOPS', 'CYBERSECURITY', 'OTHER'
  ]),
  budget: z.number().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

// GET all projects (for admin) or user's projects (for client)
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const userRole = (session.user as any).role
    const userId = (session.user as any).id

    const where = userRole === 'ADMIN' 
      ? (status ? { status: status as any } : {})
      : { clientId: userId, ...(status ? { status: status as any } : {}) }

    const projects = await prisma.project.findMany({
      where,
      include: {
        client: {
          select: { id: true, name: true, email: true, company: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Projects GET error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST create new project
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = projectSchema.parse(body)
    const userId = (session.user as any).id
    const userRole = (session.user as any).role

    // Only admin can create project for a client
    const clientId = body.clientId || userId

    const project = await prisma.project.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        service: validatedData.service,
        budget: validatedData.budget,
        clientId,
        startDate: validatedData.startDate ? new Date(validatedData.startDate) : null,
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        status: 'PENDING',
      },
      include: {
        client: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Projects POST error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
