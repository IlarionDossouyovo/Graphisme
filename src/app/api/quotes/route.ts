import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const quoteItemSchema = z.object({
  description: z.string(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().positive(),
})

const quoteSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().optional(),
  service: z.enum([
    'DESIGN_GRAPHIC', 'WEB_DEVELOPMENT', 'MOBILE_DEVELOPMENT', 
    'AI_SERVICES', 'VIDEO_PRODUCTION', 'ECOMMERCE', 
    'MARKETING_DIGITAL', 'SEO_SEA', 'COMMUNITY_MANAGEMENT', 
    'CLOUD_DEVOPS', 'CYBERSECURITY', 'OTHER'
  ]),
  amount: z.number().positive(),
  validUntil: z.string().optional(),
  clientId: z.string().optional(),
  projectId: z.string().optional(),
  items: z.array(quoteItemSchema).optional(),
})

// Generate quote number
async function generateQuoteNumber(): Promise<string> {
  const year = new Date().getFullYear()
  const count = await prisma.quote.count()
  const sequence = String(count + 1).padStart(4, '0')
  return `DEV-${year}-${sequence}`
}

// GET all quotes
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

    const quotes = await prisma.quote.findMany({
      where,
      include: {
        client: {
          select: { id: true, name: true, email: true, company: true }
        },
        items: true,
        project: {
          select: { id: true, name: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(quotes)
  } catch (error) {
    console.error('Quotes GET error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST create new quote
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = quoteSchema.parse(body)
    const userId = (session.user as any).id
    const userRole = (session.user as any).role

    // Client can only create quote for themselves, admin can specify client
    const clientId = userRole === 'ADMIN' && validatedData.clientId 
      ? validatedData.clientId 
      : userId

    const quoteNumber = await generateQuoteNumber()

    // Calculate total from items if provided
    let totalAmount = validatedData.amount
    if (validatedData.items && validatedData.items.length > 0) {
      totalAmount = validatedData.items.reduce((sum, item) => 
        sum + (item.quantity * item.unitPrice), 0
      )
    }

    const quote = await prisma.quote.create({
      data: {
        quoteNumber,
        title: validatedData.title,
        description: validatedData.description,
        service: validatedData.service,
        amount: totalAmount,
        validUntil: validatedData.validUntil 
          ? new Date(validatedData.validUntil) 
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days default
        clientId,
        projectId: validatedData.projectId,
        status: 'PENDING',
        items: validatedData.items ? {
          create: validatedData.items.map(item => ({
            ...item,
            total: item.quantity * item.unitPrice
          }))
        } : undefined
      },
      include: {
        client: {
          select: { id: true, name: true, email: true }
        },
        items: true
      }
    })

    return NextResponse.json(quote, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Quotes POST error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
