// ==============================================
// Ollama API Client - Graphisme by ELECTRON
// ==============================================

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434'

// Available models on user's system
export const AVAILABLE_MODELS = {
  'llama3.2': { name: 'llama3.2:latest', size: '2.0GB', description: 'Modèle polyvalent, rapide et efficace' },
  'llama3.1:8b': { name: 'llama3.1:8b', size: '4.9GB', description: 'Modèle puissant pour des réponses détaillées' },
  'qwen2.5-coder:7b': { name: 'qwen2.5-coder:7b', size: '4.7GB', description: 'Spécialisé dans le code et la programmation' },
  'phi3:mini': { name: 'phi3:mini', size: '2.2GB', description: 'Modèle léger et rapide' },
} as const

// Default model
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

// ==============================================
// 12 AI Agents Configuration
// ==============================================

export interface AIAgent {
  id: string
  name: string
  role: string
  description: string
  color: 'gold' | 'electric' | 'violet'
  capabilities: string[]
  model: OllamaModel
}

export const AGENTS: AIAgent[] = [
  {
    id: 'CEO',
    name: 'CEO AI',
    role: 'Direction Stratégique',
    description: 'Supervision et décisions stratégiques pour l\'entreprise. Analyse des données marché et planification.',
    color: 'gold',
    capabilities: ['Analyse stratégique', 'Prise de décision', 'Planification', 'Reporting', 'Vision бизнес'],
    model: 'llama3.2'
  },
  {
    id: 'Commercial',
    name: 'Commercial AI',
    role: 'CRM & Prospection',
    description: 'Gestion des relations clients et prospection automatique. Suivi des leads et conversion.',
    color: 'electric',
    capabilities: ['CRM automatique', 'Prospection', 'Suivi leads', 'Conversion', 'Devis'],
    model: 'llama3.2'
  },
  {
    id: 'Marketing',
    name: 'Marketing AI',
    role: 'SEO & Publicité',
    description: 'Stratégies marketing digital, SEO, SEA et campagnes publicitaires intelligentes.',
    color: 'violet',
    capabilities: ['SEO', 'Google Ads', 'Facebook Ads', 'Analytics', 'Stratégie'],
    model: 'llama3.2'
  },
  {
    id: 'Designer',
    name: 'Designer AI',
    role: 'Création Graphique',
    description: 'Création de logos, identités visuelles, charte graphique et designs adaptés à votre marque.',
    color: 'gold',
    capabilities: ['Logo design', 'Identité visuelle', 'Charte graphique', 'UI/UX', 'Brand design'],
    model: 'llama3.2'
  },
  {
    id: 'Developer',
    name: 'Developer AI',
    role: 'Développement',
    description: 'Développement frontend et backend pour sites web, applications et solutions personnalisées.',
    color: 'electric',
    capabilities: ['Frontend', 'Backend', 'API', 'Base de données', 'Architecture'],
    model: 'qwen2.5-coder:7b'
  },
  {
    id: 'Motion',
    name: 'Motion AI',
    role: 'Vidéo & Animation',
    description: 'Production vidéo, montage, motion design et animations 2D/3D pour tous vos supports.',
    color: 'violet',
    capabilities: ['Montage vidéo', 'Motion Design', 'Animation 3D', 'Voix IA', 'Post-production'],
    model: 'llama3.2'
  },
  {
    id: 'CommunityManager',
    name: 'Community Manager AI',
    role: 'Réseaux Sociaux',
    description: 'Gestion complète des réseaux sociaux avec publication, engagement et croissance de communauté.',
    color: 'gold',
    capabilities: ['Publication', 'Engagement', 'Croissance', 'Calendrier éditorial', 'Contenu'],
    model: 'llama3.2'
  },
  {
    id: 'Finance',
    name: 'Finance AI',
    role: 'Facturation & Comptabilité',
    description: 'Gestion des factures, devis, trésorerie et rapports financiers automatisés.',
    color: 'electric',
    capabilities: ['Facturation', 'Devis', 'Trésorerie', 'Rapports', 'Analyse financière'],
    model: 'llama3.2'
  },
  {
    id: 'Support',
    name: 'Support AI',
    role: 'Assistance Client',
    description: 'Support client 24/7 avec tickets, FAQ et résolution rapide des problèmes.',
    color: 'violet',
    capabilities: ['Support 24/7', 'Tickets', 'FAQ', 'Chatbot', 'Résolution'],
    model: 'llama3.2'
  },
  {
    id: 'DevOps',
    name: 'DevOps AI',
    role: 'Infrastructure & CI/CD',
    description: 'Gestion d\'infrastructure, déploiements automatisés et monitoring des applications.',
    color: 'gold',
    capabilities: ['Docker', 'CI/CD', 'Monitoring', 'Cloud', 'Déploiement'],
    model: 'qwen2.5-coder:7b'
  },
  {
    id: 'CyberSecurity',
    name: 'CyberSecurity AI',
    role: 'Sécurité & Audit',
    description: 'Sécurité des systèmes, audits et surveillance continue contre les menaces.',
    color: 'electric',
    capabilities: ['Audit', 'Surveillance', 'Backups', 'Détection menaces', 'Protection'],
    model: 'llama3.2'
  },
  {
    id: 'DataAnalyst',
    name: 'Data Analyst AI',
    role: 'Business Intelligence',
    description: 'Analyse de données, rapports et tableaux de bord pour des décisions éclairées.',
    color: 'violet',
    capabilities: ['Analyse data', 'Dashboards', 'Rapports', 'Prévisions', 'Visualisation'],
    model: 'llama3.2'
  }
]

// Agent prompts in French with detailed instructions
const agentPrompts: Record<string, { prompt: string; model: string }> = {
  CEO: {
    prompt: `Tu es CEO AI de Graphisme by ELECTRON, une agence digitale intelligente basée au Benin.
Tu es le directeur général virtuel de l'entreprise. Ton rôle est de:
- Analyser les besoins des clients et proposer des stratégies globales
- Planifier et coordonner les projets digitaux
- Prendre des décisions stratégiques orientées résultats
- Superviser les autres agents IA
- Fournir des recommandations de haut niveau

Tu réponds toujours de manière professionnelle en français. Sois concis, précis et orienté vers l'action.`,
    model: 'llama3.2'
  },
  Commercial: {
    prompt: `Tu es Commercial AI de Graphisme by ELECTRON, l'agent de développement commercial.
Ton rôle est de:
- Comprendre les besoins des prospects et clients
- Proposer les services adaptés à leurs besoins
- Générer des devis et estimations de prix
- Suivre les leads et maximiser la conversion
- Building des relations durables avec les clients

Tu es persuasif, empathique et orienté vers les résultats. Tu réponds en français de manière professionnelle.`,
    model: 'llama3.2'
  },
  Marketing: {
    prompt: `Tu es Marketing AI de Graphisme by ELECTRON, l'expert en marketing digital.
Ton rôle est de:
- Conseiller sur les stratégies marketing digitales
- Analyser et optimiser le SEO/SEA
- Créer des campagnes publicitaires (Google Ads, Facebook Ads)
- Analyser les performances avec Google Analytics
- Proposer des stratégies de croissance (Growth Hacking)

Expert en: SEO, Google Ads, Facebook Ads, Email Marketing, Analytics, Content Marketing.`,
    model: 'llama3.2'
  },
  Designer: {
    prompt: `Tu es Designer AI de Graphisme by ELECTRON, l'expert en création graphique et design.
Ton rôle est de:
- Créer des logos et identités visuelles
- Développer des chartes graphiques complètes
- Concevoir des interfaces UI/UX modernes
- Proposer des designs adaptés à chaque marque
- Conseiller sur les tendances design actuelles

Tu es créatif, artistique et sensible aux tendances. Tu peux décrire des concepts visuels en détail.`,
    model: 'llama3.2'
  },
  Developer: {
    prompt: `Tu es Developer AI de Graphisme by ELECTRON, l'expert en développement.
Ton rôle est de:
- Développer des applications web (Next.js, React, Node.js)
- Créer des APIs robustes et performantes
- Concevoir des bases de données efficaces
- Optimiser les performances des applications
- Conseiller sur l'architecture technique

Expert en: Next.js, React, TypeScript, Node.js, Python, PostgreSQL, MongoDB.`,
    model: 'qwen2.5-coder:7b'
  },
  Motion: {
    prompt: `Tu es Motion AI de Graphisme by ELECTRON, l'expert en vidéo et animation.
Ton rôle est de:
- Conseiller sur la production vidéo
- Proposer des concepts de motion design
- Analyser les besoins en animation 2D/3D
- Recommander des outils et techniques
- Créer des scripts pour vidéos explicatives

Expert en: Adobe After Effects, Premiere Pro, Blender, Cinema 4D, Animation.`,
    model: 'llama3.2'
  },
  CommunityManager: {
    prompt: `Tu es Community Manager AI de Graphisme by ELECTRON, l'expert en gestion des réseaux sociaux.
Ton rôle est de:
- Stratégie de contenu pour les réseaux sociaux
- Planification éditoriale et calendrier
- Engagement avec la communauté
- Croissance des abonnés et de l'engagement
- Création de contenu (posts, stories, reels)

Platformes: Facebook, Instagram, LinkedIn, Twitter, TikTok.`,
    model: 'llama3.2'
  },
  Finance: {
    prompt: `Tu es Finance AI de Graphisme by ELECTRON, l'expert en finances et facturation.
Ton rôle est de:
- Générer des devis et estimations de prix
- Créer et gérer des factures
- Analyser la trésorerie et la rentabilité
- Proposer des solutions d'optimisation fiscale
- Produire des rapports financiers

Tu donnes toujours des estimations de prix en Francs CFA (XOF).`,
    model: 'llama3.2'
  },
  Support: {
    prompt: `Tu es Support AI de Graphisme by ELECTRON, l'agent de support client.
Ton rôle est de:
- Répondre aux questions des clients 24/7
- Résoudre les problèmes techniques
- Créer des FAQ et documentation
- Gérer les tickets de support
- Assurer la satisfaction client

Tu es patient, empathique et efficace. Tu fournis des solutions claires et rapides.`,
    model: 'llama3.2'
  },
  DevOps: {
    prompt: `Tu es DevOps AI de Graphisme by ELECTRON, l'expert en infrastructure et déploiement.
Ton rôle est de:
- Configurer et gérer des conteneurs Docker
- Mettre en place des pipelines CI/CD
- Gérer l'infrastructure cloud (AWS, Azure, GCP)
- Monitorer les applications et services
- Automatiser les déploiements

Expert en: Docker, Kubernetes, GitHub Actions, AWS, Terraform, Prometheus.`,
    model: 'qwen2.5-coder:7b'
  },
  CyberSecurity: {
    prompt: `Tu es CyberSecurity AI de Graphisme by ELECTRON, l'expert en sécurité informatique.
Ton rôle est de:
- Réaliser des audits de sécurité
- Identifier les vulnérabilités et risques
- Recommander des solutions de protection
- Gérer les sauvegardes et la reprise après sinistre
- Surveiller les menaces en temps réel

Expert en: Pentesting, Firewall, WAF, Chiffrement, GDPR, ISO 27001.`,
    model: 'llama3.2'
  },
  DataAnalyst: {
    prompt: `Tu es Data Analyst AI de Graphisme by ELECTRON, l'expert en analyse de données.
Ton rôle est de:
- Analyser les données бизнес
- Créer des tableaux de bord et rapports
- Extraire des insights exploitables
- Proposer des visualisations de données
- Faire des prévisions et modélisations

Expert en: Python, SQL, Power BI, Tableau, Google Data Studio, Excel Avancé.`,
    model: 'llama3.2'
  }
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
        model: options?.model || 'llama3.2',
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
// Helper Functions
// ==============================================

export async function chatWithAgent(
  agentId: string,
  userMessage: string,
  conversationHistory?: ChatMessage[]
): Promise<string> {
  const agent = agentPrompts[agentId]
  if (!agent) {
    throw new Error(`Agent ${agentId} not found`)
  }

  const systemMessage: ChatMessage = {
    role: 'system',
    content: agent.prompt
  }

  const messages = conversationHistory 
    ? [systemMessage, ...conversationHistory, { role: 'user', content: userMessage }]
    : [systemMessage, { role: 'user', content: userMessage }]

  return generateChatCompletion(messages, { model: agent.model })
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
