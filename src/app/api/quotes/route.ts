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
})

export async function GET() {
  try {
    // Pour mode démonstration, permettre l'accès sans auth
    const allQuotes = quotes.getAll()
    return NextResponse.json(allQuotes)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = quoteSchema.parse(body)
    const userId = (session.user as any).id

    const quote = quotes.create({
      ...validatedData,
      quoteNumber: 'QT-' + Date.now(),
      status: 'PENDING',
      clientId: validatedData.clientId || userId,
    })

    return NextResponse.json(quote, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
