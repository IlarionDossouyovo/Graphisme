import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = contactSchema.parse(body)
    
    // Create contact submission
    const submission = await prisma.contactSubmission.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        service: validatedData.service,
        message: validatedData.message,
        status: 'NEW',
      }
    })
    
    return NextResponse.json({
      message: 'Message envoyé avec succès',
      id: submission.id
    }, { status: 201 })
    
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    
    console.error('Contact error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    )
  }
}

// GET - List submissions (admin only - should be protected)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const where = status ? { status: status as any } : {}

    const submissions = await prisma.contactSubmission.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Contact GET error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
