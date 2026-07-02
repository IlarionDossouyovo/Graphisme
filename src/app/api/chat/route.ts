import { NextResponse } from 'next/server'
import { chatWithAgent, ChatMessage } from '@/lib/ai/ollama'
import { z } from 'zod'

const chatSchema = z.object({
  agent: z.enum(['CEO', 'Commercial', 'Designer', 'Developer', 'Support']),
  message: z.string().min(1, 'Le message est requis'),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { agent, message, history } = chatSchema.parse(body)

    // Convert history format
    const conversationHistory: ChatMessage[] = history?.map(h => ({
      role: h.role as 'user' | 'assistant',
      content: h.content,
    }))

    // Get response from AI
    const response = await chatWithAgent(agent, message, conversationHistory)

    return NextResponse.json({ response })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la communication avec l\'IA' },
      { status: 500 }
    )
  }
}
