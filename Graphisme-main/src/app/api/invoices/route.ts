import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { invoices, users } from '@/lib/db/json-db'
import { z } from 'zod'

const invoiceSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().optional(),
  amount: z.number().positive(),
  taxAmount: z.number().optional(),
  dueDate: z.string().optional(),
  clientId: z.string().optional(),
  projectId: z.string().optional(),
  status: z.enum(['PENDING', 'PAID', 'OVERDUE', 'CANCELLED']).optional(),
})

// GET all invoices or single invoice
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const status = searchParams.get('status')
    const clientId = searchParams.get('clientId')
    
    let allInvoices = invoices.getAll()
    
    // Filter by ID
    if (id) {
      const invoice = invoices.getById(id)
      if (!invoice) {
        return NextResponse.json({ error: 'Facture non trouvée' }, { status: 404 })
      }
      return NextResponse.json(invoice)
    }
    
    // Filter by clientId
    if (clientId) {
      allInvoices = allInvoices.filter(i => i.clientId === clientId)
    }

    // Filter by status
    if (status) {
      allInvoices = allInvoices.filter(i => i.status === status)
    }

    return NextResponse.json(allInvoices)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST create new invoice
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    // Mode démonstration
    let userId = 'demo-user'
    if (session?.user) {
      userId = (session.user as any).id
    }

    const body = await request.json()
    const validatedData = invoiceSchema.parse(body)

    const taxAmount = validatedData.taxAmount || 0
    const totalAmount = validatedData.amount + taxAmount

    const invoice = invoices.create({
      title: validatedData.title,
      description: validatedData.description,
      amount: validatedData.amount,
      taxAmount,
      totalAmount,
      dueDate: validatedData.dueDate,
      clientId: validatedData.clientId || userId,
      projectId: validatedData.projectId,
      invoiceNumber: 'INV-' + Date.now(),
      status: validatedData.status || 'PENDING',
    })

    return NextResponse.json(invoice, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// PUT update invoice
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID de la facture requis' }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = invoiceSchema.partial().parse(body)

    // Recalculate total if amount changes
    let totalAmount = undefined
    if (validatedData.amount !== undefined) {
      const taxAmount = validatedData.taxAmount || 0
      totalAmount = validatedData.amount + taxAmount
    }

    const updatedInvoice = invoices.update(id, {
      ...validatedData,
      ...(totalAmount !== undefined && { totalAmount })
    })
    
    if (!updatedInvoice) {
      return NextResponse.json({ error: 'Facture non trouvée' }, { status: 404 })
    }

    return NextResponse.json(updatedInvoice)
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE invoice
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID de la facture requis' }, { status: 400 })
    }

    // Check if invoice exists
    const invoice = invoices.getById(id)
    if (!invoice) {
      return NextResponse.json({ error: 'Facture non trouvée' }, { status: 404 })
    }

    invoices.delete(id)
    
    return NextResponse.json({ message: 'Facture supprimée avec succès' })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
