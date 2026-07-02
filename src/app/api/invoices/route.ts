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
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const userRole = (session.user as any).role

    let allInvoices = invoices.getAll()
    let filteredInvoices = userRole === 'ADMIN' 
      ? allInvoices 
      : allInvoices.filter(i => i.clientId === userId)

    return NextResponse.json(filteredInvoices)
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
    const validatedData = invoiceSchema.parse(body)
    const userId = (session.user as any).id

    const taxAmount = validatedData.taxAmount || 0
    const totalAmount = validatedData.amount + taxAmount

    const invoice = invoices.create({
      ...validatedData,
      invoiceNumber: 'INV-' + Date.now(),
      taxAmount,
      totalAmount,
      status: 'PENDING',
      clientId: validatedData.clientId || userId,
    })

    return NextResponse.json(invoice, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
