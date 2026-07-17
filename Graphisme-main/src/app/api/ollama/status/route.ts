import { NextResponse } from 'next/server'

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://127.0.0.1:11434'

export async function GET() {
  try {
    // Try to connect to Ollama
    const response = await fetch(`${OLLAMA_API_URL}/api/tags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: AbortSignal.timeout(5000) // 5 second timeout
    })

    if (!response.ok) {
      return NextResponse.json({
        connected: false,
        error: 'Ollama ne répond pas',
        message: 'Démarrez Ollama avec: ollama serve',
        url: OLLAMA_API_URL
      })
    }

    const data = await response.json()
    
    // Extract model names
    const models = data.models?.map((m: any) => ({
      name: m.name,
      size: m.size,
      modified: m.modified_at
    })) || []

    return NextResponse.json({
      connected: true,
      url: OLLAMA_API_URL,
      models,
      modelCount: models.length,
      status: 'Ollama est connecté et prêt'
    })

  } catch (error: any) {
    return NextResponse.json({
      connected: false,
      error: 'Impossible de se connecter à Ollama',
      message: 'Assurez-vous que Ollama est installé et démarré sur votre machine',
      url: OLLAMA_API_URL,
      hint: 'Windows: Ouvrez PowerShell et tapez "ollama serve"'
    })
  }
}
