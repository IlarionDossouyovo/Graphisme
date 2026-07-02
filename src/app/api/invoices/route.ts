import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const invoiceItemSchema = z.object({
  description: z.string(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().positive(),
})

const invoiceSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().optional(),
  amount: z.number().positive(),
  taxAmount: z.number().optional(),
  dueDate: z.string().optional(),
  clientId: z.string().optional(),
  projectId: z.string().optional(),
  items: z.array(invoiceItemSchema).optional(),
})

// Generate invoice number
async function generateInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear()
  const count = await prisma.invoice.count()
  const sequence = String(count + 1).padStart(4, '0')
  return `FAC-${year}-${sequence}`
}

// GET all invoices
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

    const invoices = await prisma.invoice.findMany({
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

    return NextResponse.json(invoices)
  } catch (error) {
    console.error('Invoices GET error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST create new invoice
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    // Only admin can create invoices
    if ((session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Action non autorisée' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = invoiceSchema.parse(body)

    const invoiceNumber = await generateInvoiceNumber()

    // Calculate totals
    let subtotal = validatedData.amount
    if (validatedData.items && validatedData.items.length > 0) {
      subtotal = validatedData.items.reduce((sum, item) => 
        sum + (item.quantity * item.unitPrice), 0
      )
    }
    const taxAmount = validatedData.taxAmount ?? (subtotal * 0.18) // 18% TVA default
    const totalAmount = subtotal + taxAmount

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        title: validatedData.title,
        description: validatedData.description,
        amount: subtotal,
        taxAmount,
        totalAmount,
        dueDate: validatedData.dueDate 
          ? new Date(validatedData.dueDate) 
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days default
        clientId: validatedData.clientId!,
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

    return NextResponse.json(invoice, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Invoices POST error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
