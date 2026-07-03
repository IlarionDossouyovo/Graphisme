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
    // Pour mode démonstration, permettre l'accès sans auth
    let allProjects = projects.getAll()
    
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    // Filter by status if provided
    if (status) {
      allProjects = allProjects.filter(p => p.status === status)
    }

    // Add client info if available
    const projectsWithClient = allProjects.map(p => ({
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
      progress: 0,
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
