import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { quotes, users } from '@/lib/db/json-db'
import { z } from 'zod'

const quoteSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().optional(),
  service: z.string(),
  amount: z.number().positive(),
  clientId: z.string().optional(),
  projectId: z.string().optional(),
  validUntil: z.string().optional(),
  status: z.enum(['PENDING', 'ACCEPTED', 'EXPIRED', 'REJECTED']).optional(),
})

// GET all quotes or single quote
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const status = searchParams.get('status')
    const clientId = searchParams.get('clientId')
    
    let allQuotes = quotes.getAll()
    
    // Filter by ID
    if (id) {
      const quote = quotes.getById(id)
      if (!quote) {
        return NextResponse.json({ error: 'Devis non trouvé' }, { status: 404 })
      }
      return NextResponse.json(quote)
    }
    
    // Filter by clientId
    if (clientId) {
      allQuotes = allQuotes.filter(q => q.clientId === clientId)
    }

    // Filter by status
    if (status) {
      allQuotes = allQuotes.filter(q => q.status === status)
    }

    return NextResponse.json(allQuotes)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST create new quote
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    // Mode démonstration
    let userId = 'demo-user'
    if (session?.user) {
      userId = (session.user as any).id
    }

    const body = await request.json()
    const validatedData = quoteSchema.parse(body)

    const quote = quotes.create({
      title: validatedData.title,
      description: validatedData.description,
      service: validatedData.service,
      amount: validatedData.amount,
      clientId: validatedData.clientId || userId,
      projectId: validatedData.projectId,
      validUntil: validatedData.validUntil,
      quoteNumber: 'QT-' + Date.now(),
      status: validatedData.status || 'PENDING',
    })

    return NextResponse.json(quote, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// PUT update quote
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID du devis requis' }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = quoteSchema.partial().parse(body)

    const updatedQuote = quotes.update(id, validatedData)
    
    if (!updatedQuote) {
      return NextResponse.json({ error: 'Devis non trouvé' }, { status: 404 })
    }

    return NextResponse.json(updatedQuote)
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE quote
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID du devis requis' }, { status: 400 })
    }

    // Check if quote exists
    const quote = quotes.getById(id)
    if (!quote) {
      return NextResponse.json({ error: 'Devis non trouvé' }, { status: 404 })
    }

    quotes.delete(id)
    
    return NextResponse.json({ message: 'Devis supprimé avec succès' })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
