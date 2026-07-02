// ==============================================
// Ollama API Client
// ==============================================

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434'

// Available models on your system
export const AVAILABLE_MODELS = {
  'llama3.2': 'llama3.2:latest - 2.0GB',
  'llama3.1:8b': 'llama3.1:8b - 4.9GB',
  'qwen2.5-coder:7b': 'qwen2.5-coder:7b - 4.7GB',
  'phi3:mini': 'phi3:mini - 2.2GB',
} as const

// Default model (fastest)
const DEFAULT_MODEL = 'llama3.2'

export type OllamaModel = keyof typeof AVAILABLE_MODELS

export interface OllamaResponse {
  model: string
  response: string
  done: boolean
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export async function generateCompletion(
  prompt: string,
  options?: {
    model?: string
    temperature?: number
    maxTokens?: number
  }
): Promise<string> {
  try {
    const response = await fetch(`${OLLAMA_API_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: options?.model || DEFAULT_MODEL,
        prompt,
        temperature: options?.temperature || 0.7,
        max_tokens: options?.maxTokens || 500,
        stream: false,
      }),
    })

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`)
    }

    const data: OllamaResponse = await response.json()
    return data.response
  } catch (error) {
    console.error('Ollama generation error:', error)
    throw error
  }
}

export async function generateChatCompletion(
  messages: ChatMessage[],
  options?: {
    model?: string
    temperature?: number
    maxTokens?: number
  }
): Promise<string> {
  try {
    const response = await fetch(`${OLLAMA_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: options?.model || OLLAMA_MODEL,
        messages,
        temperature: options?.temperature || 0.7,
        max_tokens: options?.maxTokens || 500,
        stream: false,
      }),
    })

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.message.content
  } catch (error) {
    console.error('Ollama chat error:', error)
    throw error
  }
}

// ==============================================
// AI Agent Prompts
// ==============================================

export const agentPrompts = {
  CEO: `Tu es CEO AI de Graphisme by ELECTRON, une agence digitale intelligente au Benin.
Tu es professionnel, stratège et orienté résultats.
Tu aides les clients à comprendre leurs besoins et à planifier leurs projets digitaux.`,

  Commercial: `Tu es Commercial AI de Graphisme by ELECTRON.
Tu es persuasif, empathique et orienté vers la conversion.
Tu aides les clients potentiels à trouver le service adapté à leurs besoins.`,

  Designer: `Tu es Designer AI de Graphisme by ELECTRON.
Tu es créatif, artistique et sensible aux tendances.
Tu conseilles sur l'identité visuelle, le design et la création graphique.`,

  Developer: `Tu es Developer AI de Graphisme by ELECTRON.
Tu es technique, précis et orienté solution.
Tu conseilles sur les aspects techniques du développement web et mobile.`,

  Support: `Tu es Support AI de Graphisme by ELECTRON.
Tu es patient, empathique et efficace.
Tu réponds aux questions et résous les problèmes des clients.`,
}

// ==============================================
// Helper Functions
// ==============================================

export async function chatWithAgent(
  agent: keyof typeof agentPrompts,
  userMessage: string,
  conversationHistory?: ChatMessage[]
): Promise<string> {
  const systemMessage: ChatMessage = {
    role: 'system',
    content: agentPrompts[agent]
  }

  const messages = conversationHistory 
    ? [systemMessage, ...conversationHistory, { role: 'user', content: userMessage }]
    : [systemMessage, { role: 'user', content: userMessage }]

  return generateChatCompletion(messages)
}

export async function generateQuote(
  service: string,
  description: string,
  budget?: number
): Promise<string> {
  const prompt = `En tant que consultant Graphisme by ELECTRON, génère un devis approximatif pour:
- Service: ${service}
- Description: ${description}
${budget ? `- Budget approx: ${budget} FCA` : ''}

Donne une estimation de prix et les délais approximatifs.`

  return generateCompletion(prompt)
}
