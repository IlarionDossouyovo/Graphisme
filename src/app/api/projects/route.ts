import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { projects, users } from '@/lib/db/json-db'
import { z } from 'zod'

const projectSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  description: z.string().optional(),
  service: z.string(),
  budget: z.number().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

// GET all projects
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

    let allProjects = projects.getAll()
    
    // Filter by role
    let filteredProjects = userRole === 'ADMIN' 
      ? allProjects 
      : allProjects.filter(p => p.clientId === userId)

    // Filter by status if provided
    if (status) {
      filteredProjects = filteredProjects.filter(p => p.status === status)
    }

    // Add client info
    const projectsWithClient = filteredProjects.map(p => ({
      ...p,
      client: users.getById(p.clientId)
    }))

    return NextResponse.json(projectsWithClient)
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

    const clientId = body.clientId || userId

    const project = projects.create({
      name: validatedData.name,
      description: validatedData.description,
      service: validatedData.service,
      budget: validatedData.budget,
      clientId,
      status: 'PENDING',
    })

    return NextResponse.json({
      ...project,
      client: users.getById(clientId)
    }, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Projects POST error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
