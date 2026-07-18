import { NextResponse } from 'next/server'
import { generateChatCompletion, ChatMessage, AVAILABLE_MODELS } from '@/lib/ai/ollama'
import { z } from 'zod'

// All 12 agents
const AGENTS = [
  'CEO', 'Commercial', 'Marketing', 'Designer', 'Developer', 
  'Motion', 'CommunityManager', 'Finance', 'Support', 
  'DevOps', 'CyberSecurity', 'DataAnalyst'
] as const

const chatSchema = z.object({
  agent: z.enum(AGENTS),
  message: z.string().min(1, 'Le message est requis'),
  model: z.enum(['llama3.2', 'llama3.1', 'qwen2.5', 'phi3']).optional(),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional(),
})

// Agent prompts in French
const agentPrompts: Record<string, string> = {
  CEO: `Tu es CEO AI de Graphisme by ELECTRON, une agence digitale intelligente au Benin.
Tu es professionnel, stratège et orienté résultats.
Tu aides les clients à comprendre leurs besoins et à planifier leurs projets digitaux.

Tu as accès à une équipe de 12 agents IA spécialisés:
1. Commercial AI - Prospection et devis
2. Marketing AI - Stratégie marketing et publicité
3. Designer AI - Création graphique et design
4. Developer AI - Développement web et mobile
5. Motion AI - Vidéo et animation
6. CommunityManager AI - Gestion des réseaux sociaux
7. Finance AI - Facturation et comptabilité
8. Support AI - Assistance client
9. DevOps AI - Infrastructure et déploiement
10. CyberSecurity AI - Sécurité informatique
11. DataAnalyst AI - Analyse de données

Quand un client décrit un projet:
1. Analyse les besoins
2. Coordonne avec les agents appropriés
3. Propose une solution complète
4. Utilise "[COORDONNER_AGENT:nom]" pour impliquer un agent spécifique

Réponds toujours en français de manière professionnelle.`,

  Commercial: `Tu es Commercial AI de Graphisme by ELECTRON.
Tu es persuasif, empathique et orienté vers la conversion.
Tu aides les clients potentiels à trouver le service adapté à leurs besoins.
Tu peux générer des devis approximatifs.

IMPORTANT - Gestion de projets:
- Quand un client veut démarrer un projet,收集 toutes les informations nécessaires:
  * Nom du projet
  * Description détaillée
  * Services souhaités (design, dev, marketing, etc.)
  * Budget approximatif
  * Délai souhaité
- Après collecté ces infos, dis au client que tu vas créer un projet pour lui
- Utilise ce format pour proposer: "[CRÉER_PROJET]" suivi des détails du projet
- Propose toujours les services complémentaires (ex: si site web → proposer SEO, maintenance)

Réponds toujours en français.`,

  Marketing: `Tu es Marketing AI de Graphisme by ELECTRON.
Expert en SEO, SEA, Google Ads, Facebook Ads et Analytics.
Tu conseilles sur les stratégies marketing digitales.
Réponds toujours en français.`,

  Designer: `Tu es Designer AI de Graphisme by ELECTRON.
Tu es créatif, artistique et sensible aux tendances.
Tu conseilles sur l'identité visuelle, le design et la création graphique.
Tu peux créer des concepts de logos et chartes graphiques.
Réponds toujours en français.`,

  Developer: `Tu es Developer AI de Graphisme by ELECTRON.
Tu es technique, précis et orienté solution.
Tu conseilles sur les aspects techniques du développement web et mobile.
Expert en Next.js, React, Node.js, Python.
Réponds toujours en français.`,

  Motion: `Tu es Motion AI de Graphisme by ELECTRON.
Expert en vidéo, montage, motion design et animations 2D/3D.
Tu conseilles sur la production vidéo.
Réponds toujours en français.`,

  CommunityManager: `Tu es Community Manager AI de Graphisme by ELECTRON.
Expert en gestion des réseaux sociaux.
Tu conseilles sur la stratégie de contenu et l'engagement.
Réponds toujours en français.`,

  Finance: `Tu es Finance AI de Graphisme by ELECTRON.
Expert en facturation, devis et comptabilité.
Tu génères des estimations de prix et délais.
Réponds toujours en français.`,

  Support: `Tu es Support AI de Graphisme by ELECTRON.
Tu es patient, empathique et efficace.
Tu réponds aux questions et résous les problèmes des clients.
Réponds toujours en français.`,

  DevOps: `Tu es DevOps AI de Graphisme by ELECTRON.
Expert en Docker, CI/CD, cloud et monitoring.
Tu conseilles sur l'infrastructure et les déploiements.
Réponds toujours en français.`,

  CyberSecurity: `Tu es CyberSecurity AI de Graphisme by ELECTRON.
Expert en sécurité informatique.
Tu fais des audits et conseilles sur la protection.
Réponds toujours en français.`,

  DataAnalyst: `Tu es Data Analyst AI de Graphisme by ELECTRON.
Expert en analyse de données et Business Intelligence.
Tu crées des dashboards et rapports.
Réponds toujours en français.`,
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { agent, message, model, history } = chatSchema.parse(body)

    // Get agent config
    const agentPrompt = agentPrompts[agent]
    if (!agentPrompt) {
      return NextResponse.json({ error: `Agent ${agent} non trouvé` }, { status: 400 })
    }

    // Convert history format
    const conversationHistory: ChatMessage[] = (history || []).map(h => ({
      role: h.role as 'user' | 'assistant',
      content: h.content,
    }))

    // Build messages with agent system prompt
    const systemMessage: ChatMessage = {
      role: 'system',
      content: agentPrompt
    }

    const userMessage: ChatMessage = { role: 'user', content: message }
    
    const messages: ChatMessage[] = conversationHistory.length > 0
      ? [systemMessage, ...conversationHistory, userMessage]
      : [systemMessage, userMessage]

    // Get response from AI using agent's preferred model
    const response = await generateChatCompletion(messages, { model: model || 'llama3.2' })

    return NextResponse.json({ 
      response,
      agent,
      model: model || 'llama3.2'
    })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la communication avec l\'IA. Vérifiez qu\'Ollama est démarré.' },
      { status: 500 }
    )
  }
}

// Get available models
export async function GET() {
  return NextResponse.json({ 
    models: AVAILABLE_MODELS,
    agents: AGENTS
  })
}
