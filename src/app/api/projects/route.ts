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
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
  progress: z.number().min(0).max(100).optional(),
})

// GET all projects or single project
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const status = searchParams.get('status')
    const clientId = searchParams.get('clientId')
    
    let allProjects = projects.getAll()
    
    // Filter by ID
    if (id) {
      const project = projects.getById(id)
      if (!project) {
        return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 })
      }
      // Add client info
      const projectWithClient = {
        ...project,
        client: users.getById(project.clientId)
      }
      return NextResponse.json(projectWithClient)
    }
    
    // Filter by clientId
    if (clientId) {
      allProjects = allProjects.filter(p => p.clientId === clientId)
    }

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
    
    // Pour mode démonstration, permettre l'accès sans auth
    let userId = 'demo-user'
    if (session?.user) {
      userId = (session.user as any).id
    }

    const body = await request.json()
    const validatedData = projectSchema.parse(body)
    const clientId = body.clientId || userId

    const project = projects.create({
      name: validatedData.name,
      description: validatedData.description,
      service: validatedData.service,
      budget: validatedData.budget,
      clientId,
      status: validatedData.status || 'PENDING',
      progress: validatedData.progress || 0,
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

// PUT update project
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID du projet requis' }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = projectSchema.partial().parse(body)

    const updatedProject = projects.update(id, validatedData)
    
    if (!updatedProject) {
      return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 })
    }

    return NextResponse.json({
      ...updatedProject,
      client: users.getById(updatedProject.clientId)
    })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Projects PUT error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE project
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID du projet requis' }, { status: 400 })
    }

    // Check if project exists
    const project = projects.getById(id)
    if (!project) {
      return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 })
    }

    projects.delete(id)
    
    return NextResponse.json({ message: 'Projet supprimé avec succès' })
  } catch (error) {
    console.error('Projects DELETE error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
