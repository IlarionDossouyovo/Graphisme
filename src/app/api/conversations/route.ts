import { NextResponse } from 'next/server'
import { conversations } from '@/lib/db/json-db'
import { z } from 'zod'

const conversationSchema = z.object({
  agent: z.string(),
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })),
  clientName: z.string().optional(),
  clientEmail: z.string().optional(),
  projectId: z.string().optional(),
})

// GET all conversations
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const agent = searchParams.get('agent')
    const id = searchParams.get('id')
    
    if (id) {
      const conversation = conversations.getById(id)
      if (!conversation) {
        return NextResponse.json({ error: 'Conversation non trouvee' }, { status: 404 })
      }
      return NextResponse.json(conversation)
    }
    
    let allConversations = conversations.getAll()
    
    if (agent) {
      allConversations = allConversations.filter(c => c.agent === agent)
    }
    
    // Sort by most recent
    allConversations.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    
    return NextResponse.json(allConversations)
  } catch (error) {
    console.error('Conversations GET error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST create new conversation
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = conversationSchema.parse(body)

    const conversation = conversations.create({
      agent: validatedData.agent,
      messages: validatedData.messages,
      clientName: validatedData.clientName,
      clientEmail: validatedData.clientEmail,
      projectId: validatedData.projectId,
    })

    return NextResponse.json(conversation, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Conversations POST error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// PUT update conversation
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    const body = await request.json()
    
    // Add message to conversation
    if (body.message) {
      const conversation = conversations.addMessage(id, body.message)
      if (!conversation) {
        return NextResponse.json({ error: 'Conversation non trouvee' }, { status: 404 })
      }
      return NextResponse.json(conversation)
    }
    
    // Update conversation status
    if (body.status) {
      const conversation = conversations.update(id, { status: body.status })
      if (!conversation) {
        return NextResponse.json({ error: 'Conversation non trouvee' }, { status: 404 })
      }
      return NextResponse.json(conversation)
    }
    
    return NextResponse.json({ error: 'Aucune donnee a mettre a jour' }, { status: 400 })
  } catch (error) {
    console.error('Conversations PUT error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE conversation
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    conversations.delete(id)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Conversations DELETE error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
