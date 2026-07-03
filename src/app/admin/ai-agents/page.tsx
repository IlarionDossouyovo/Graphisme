'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  Bot, Brain, Code, Palette, Video, ShoppingCart, TrendingUp, Search,
  Users, MessageSquare, Cloud, Shield, Database, Mail, Phone, MapPin,
  ChevronRight, Play, Pause, Settings, Activity, Clock, CheckCircle,
  AlertCircle, BarChart3, DollarSign, FileText, Zap, Target, Lightbulb,
  ArrowLeft, Lock, Eye, Edit, Trash2, Plus, RefreshCw
} from 'lucide-react'

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen bg-premium-black flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-400">Chargement...</p>
    </div>
  </div>
)

const Logo = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 animate-pulse"></div>
    <svg viewBox="0 0 100 100" className="w-10 h-10">
      <circle cx="50" cy="50" r="45" fill="none" stroke="url(#goldGradient)" strokeWidth="2" />
      <circle cx="50" cy="50" r="35" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" opacity="0.7" />
      <path d="M35 65 L50 30 L65 65 M50 30 L50 55" fill="none" stroke="url(#goldGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M55 25 L45 40 L52 40 L47 55 L60 38 L53 38 Z" fill="url(#goldGradient)" />
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFA500" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
      </defs>
    </svg>
  </div>
)

// Types
interface Agent {
  id: string
  name: string
  role: string
  department: string
  description: string
  capabilities: string[]
  instructions: string[]
  status: 'active' | 'idle' | 'error' | 'paused'
  tasksCompleted: number
  tasksPending: number
  lastActive: string
  avatar: string
  color: string
  icon: any
}

// Departments data
const departments = [
  {
    id: 'direction',
    name: 'Direction',
    icon: Brain,
    color: 'gold',
    description: 'Supervision stratégique et prise de décision',
    agents: ['CEO AI']
  },
  {
    id: 'commercial',
    name: 'Commercial & Marketing',
    icon: TrendingUp,
    color: 'electric',
    description: 'Prospection, vente et marketing digital',
    agents: ['Commercial AI', 'Marketing AI']
  },
  {
    id: 'creation',
    name: 'Création & Design',
    icon: Palette,
    color: 'violet',
    description: 'Design graphique, vidéo et contenu visuel',
    agents: ['Designer AI', 'Motion AI']
  },
  {
    id: 'technique',
    name: 'Technique & Développement',
    icon: Code,
    color: 'blue',
    description: 'Développement web, mobile et solutions techniques',
    agents: ['Developer AI', 'DevOps AI']
  },
  {
    id: 'communication',
    name: 'Communication & Support',
    icon: MessageSquare,
    color: 'green',
    description: 'Gestion des réseaux sociaux et support client',
    agents: ['Community Manager AI', 'Support AI']
  },
  {
    id: 'gestion',
    name: 'Gestion & Finance',
    icon: DollarSign,
    color: 'orange',
    description: 'Facturation, comptabilité et gestion des données',
    agents: ['Finance AI', 'Data Analyst AI']
  },
  {
    id: 'securite',
    name: 'Sécurité & Infrastructure',
    icon: Shield,
    color: 'red',
    description: 'Cybersécurité et infrastructure cloud',
    agents: ['CyberSecurity AI']
  }
]

// Agents data
const allAgents: Agent[] = [
  // Direction
  {
    id: 'ceo',
    name: 'CEO AI',
    role: 'Supervision & Décisions',
    department: 'direction',
    description: 'Assistant IA de direction qui supervise l\'entreprise, analyse les données stratégiques et aide à la prise de décision.',
    capabilities: [
      'Analyse des performances globales',
      'Génération de rapports stratégiques',
      'Coordination des autres agents IA',
      'Prise de décision basée sur les données',
      'Gestion des objectifs company',
      'Suivi des KPI'
    ],
    instructions: [
      'Toujours commencer par saluer professionnellement',
      'Analyser les données avant de recommander',
      'Proposer des solutions concrètes et actionnables',
      'Coordonner avec les autres agents pour les tâches complexes',
      'Prioriser les actions à fort impact',
      'Rappeler les valeurs de l\'entreprise: Innovation, Excellence, Service'
    ],
    status: 'active',
    tasksCompleted: 145,
    tasksPending: 3,
    lastActive: 'Maintenant',
    avatar: '👔',
    color: 'gold',
    icon: Brain
  },
  // Commercial & Marketing
  {
    id: 'commercial',
    name: 'Commercial AI',
    role: 'CRM & Prospection',
    department: 'commercial',
    description: 'Agent commercial qui gère la prospection, les devis et la relation client.',
    capabilities: [
      'Génération de devis automatiques',
      'Suivi des prospects',
      'Analyse du comportement client',
      'Recommandation de services',
      'Gestion du pipeline commercial',
      'Prise de rendez-vous'
    ],
    instructions: [
      'être persuasif mais professionnel',
      'Bien comprendre les besoins du client avant de proposer',
      'Mettre en avant les avantages uniques de ELECTRON',
      'Suivre les prospects régulièrement',
      'Travailler avec le Marketing AI pour les campagnes',
      'Respecter les délais de réponse (moins de 2h)'
    ],
    status: 'active',
    tasksCompleted: 89,
    tasksPending: 8,
    lastActive: 'Maintenant',
    avatar: '💼',
    color: 'electric',
    icon: TrendingUp
  },
  {
    id: 'marketing',
    name: 'Marketing AI',
    role: 'SEO & Campagnes',
    department: 'commercial',
    description: 'Expert marketing digital qui gère les campagnes publicitaires, le SEO et l\'analyse marketing.',
    capabilities: [
      'Création de campagnes publicitaires',
      'Optimisation SEO',
      'Analyse des performances marketing',
      'Création de contenu marketing',
      'Gestion des budgets publicitaires',
      'Rapports analytics'
    ],
    instructions: [
      'Prioriser le ROI des campagnes',
      'Suivre les tendances marketing actuelles',
      'Adapter les messages au public cible',
      'Collaborer avec le Designer AI pour les visuels',
      'Analyser les concurrents régulièrement',
      'Proposer des améliorations continues'
    ],
    status: 'active',
    tasksCompleted: 67,
    tasksPending: 4,
    lastActive: 'Maintenant',
    avatar: '📈',
    color: 'electric',
    icon: Search
  },
  // Création & Design
  {
    id: 'designer',
    name: 'Designer AI',
    role: 'Création Graphique',
    department: 'creation',
    description: 'Designer IA spécialisé dans la création visuelle, logos et identité de marque.',
    capabilities: [
      'Création de logos',
      'Design d\'identité visuelle',
      'Création de chartes graphiques',
      'Design print (flyers, cartes visite)',
      'Mockups et présentations',
      'Adaptation aux supports'
    ],
    instructions: [
      'Comprendre d\'abord l\'entreprise et ses valeurs',
      'Proposer plusieurs concepts créatifs',
      'Respecter les tendances actuelles du design',
      'Privilégier la simplicité et l\'impact',
      'Demander des feedback réguliers',
      'Livrer en plusieurs formats (PNG, SVG, PDF)'
    ],
    status: 'active',
    tasksCompleted: 156,
    tasksPending: 5,
    lastActive: 'Maintenant',
    avatar: '🎨',
    color: 'violet',
    icon: Palette
  },
  {
    id: 'motion',
    name: 'Motion AI',
    role: 'Vidéo & Animation',
    department: 'creation',
    description: 'Expert en production vidéo, motion design et animation pour le contenu visuel.',
    capabilities: [
      'Montage vidéo',
      'Motion design 2D/3D',
      'Animation de logos',
      'Création de trailers',
      'Sous-titrage automatique',
      'Voice-over IA'
    ],
    instructions: [
      'Demander le brief créatif avant de commencer',
      'Proposer plusieurs styles si nécessaire',
      'Respecter la durée demandée',
      'Livrer en haute résolution',
      'Ajouter des options de musique',
      'Demander validation avant livraison finale'
    ],
    status: 'idle',
    tasksCompleted: 34,
    tasksPending: 2,
    lastActive: 'Il y a 2h',
    avatar: '🎬',
    color: 'violet',
    icon: Video
  },
  // Technique & Développement
  {
    id: 'developer',
    name: 'Developer AI',
    role: 'Frontend & Backend',
    department: 'technique',
    description: 'Développeur full-stack capable de créer des applications web et mobiles.',
    capabilities: [
      'Développement web (Next.js, React)',
      'Développement mobile (React Native)',
      'Backend (Node.js, Python)',
      'Base de données',
      'API REST/GraphQL',
      'Debugging et optimisation'
    ],
    instructions: [
      'Écrire du code propre et documenté',
      'Suivre les bonnes pratiques de sécurité',
      'Tester le code avant livraison',
      'Privilégier les solutions modernes',
      'Documenter les fonctionnalités',
      'Collaborer avec DevOps AI pour le déploiement'
    ],
    status: 'active',
    tasksCompleted: 78,
    tasksPending: 6,
    lastActive: 'Maintenant',
    avatar: '💻',
    color: 'blue',
    icon: Code
  },
  {
    id: 'devops',
    name: 'DevOps AI',
    role: 'Infrastructure & CI/CD',
    department: 'technique',
    description: 'Expert DevOps qui gère l\'infrastructure, le déploiement et l\'automatisation.',
    capabilities: [
      'Configuration serveur',
      'Docker & Kubernetes',
      'CI/CD pipelines',
      'Monitoring',
      'Sauvegardes automatisées',
      'Optimisation performance'
    ],
    instructions: [
      'Prioriser la sécurité des infrastructures',
      'Automatiser les tâches répétitives',
      'Maintenir une documentation à jour',
      'Surveiller les coûts cloud',
      'Prévoir les scalings nécessaires',
      'Tester les déploiements en staging'
    ],
    status: 'active',
    tasksCompleted: 45,
    tasksPending: 2,
    lastActive: 'Maintenant',
    avatar: '☁️',
    color: 'blue',
    icon: Cloud
  },
  // Communication & Support
  {
    id: 'community',
    name: 'Community Manager AI',
    role: 'Réseaux Sociaux',
    department: 'communication',
    description: 'Gestionnaire des réseaux sociaux qui crée et planifie le contenu.',
    capabilities: [
      'Planification de contenu',
      'Gestion de calendrier éditorial',
      'Création de posts',
      'Analyse des performances',
      'Gestion de communauté',
      'Veille concurrentielle'
    ],
    instructions: [
      'Respecter la voix de la marque ELECTRON',
      'Adapter le contenu à chaque plateforme',
      'Répondre rapidement aux messages',
      'Proposer du contenu engageant',
      'Analyser les métriques weekly',
      'Collaborer avec Designer AI pour les visuels'
    ],
    status: 'active',
    tasksCompleted: 234,
    tasksPending: 12,
    lastActive: 'Maintenant',
    avatar: '📱',
    color: 'green',
    icon: Users
  },
  {
    id: 'support',
    name: 'Support AI',
    role: 'Assistance & Tickets',
    department: 'communication',
    description: 'Agent de support client qui répond aux demandes et résout les problèmes.',
    capabilities: [
      'Réponse aux demandes',
      'Création de tickets',
      'FAQ automatique',
      'Escalade vers équipe humaine',
      'Suivi des demandes',
      'Satisfaction client'
    ],
    instructions: [
      'être patient et empathique',
      'Bien comprendre le problème avant de répondre',
      'Proposer des solutions claires',
      'Escalader si nécessaire vers un humain',
      'Suivre les dossiers jusqu\'à résolution',
      'Maintenir un ton professionnel'
    ],
    status: 'active',
    tasksCompleted: 312,
    tasksPending: 15,
    lastActive: 'Maintenant',
    avatar: '🎧',
    color: 'green',
    icon: MessageSquare
  },
  // Gestion & Finance
  {
    id: 'finance',
    name: 'Finance AI',
    role: 'Facturation & Comptabilité',
    department: 'gestion',
    description: 'Gestionnaire financier qui s\'occupe de la facturation et du suivi comptable.',
    capabilities: [
      'Génération de factures',
      'Suivi des paiements',
      'Relances automatiques',
      'Rapports financiers',
      'Gestion des devis',
      'Prévision budgétaire'
    ],
    instructions: [
      'Vérifier l\'exactitude des montants',
      'Respecter les délais de facturation',
      'Relancer les factures en retard',
      'Travailler avec le CEO AI pour les budgets',
      'Maintenir une bonne organisation',
      'Signer les documents correctement'
    ],
    status: 'active',
    tasksCompleted: 189,
    tasksPending: 7,
    lastActive: 'Maintenant',
    avatar: '💰',
    color: 'orange',
    icon: DollarSign
  },
  {
    id: 'data',
    name: 'Data Analyst AI',
    role: 'BI & Prévisions',
    department: 'gestion',
    description: 'Analyste данных qui génère des rapports et des prévisions.',
    capabilities: [
      'Analyse de données',
      'Tableaux de bord',
      'Prévisions',
      'Visualisation de données',
      'Rapports automatisés',
      'Insights actionnables'
    ],
    instructions: [
      'Utiliser des données fiables',
      'Présenter les données clairement',
      'Proposer des insights actionnables',
      'Automatiser les rapports récurrents',
      'Collaborer avec tous les départements',
      'Former le CEO AI à l\'utilisation des données'
    ],
    status: 'active',
    tasksCompleted: 56,
    tasksPending: 3,
    lastActive: 'Maintenant',
    avatar: '📊',
    color: 'orange',
    icon: BarChart3
  },
  // Sécurité & Infrastructure
  {
    id: 'security',
    name: 'CyberSecurity AI',
    role: 'Sécurité & Audit',
    department: 'securite',
    description: 'Expert cybersécurité qui protège l\'entreprise et ses données.',
    capabilities: [
      'Audit de sécurité',
      'Détection de menaces',
      'Gestion des pare-feux',
      'Surveillance 24/7',
      'Formation sécurité',
      'Réponse aux incidents'
    ],
    instructions: [
      'Prioriser la protection des données',
      'Effectuer des audits réguliers',
      'Mettre à jour les protocoles',
      'Former les utilisateurs aux bonnes pratiques',
      'Travailler avec DevOps AI',
      'Rester vigilant face aux nouvelles menaces'
    ],
    status: 'active',
    tasksCompleted: 23,
    tasksPending: 1,
    lastActive: 'Maintenant',
    avatar: '🔒',
    color: 'red',
    icon: Shield
  }
]

export default function AIAgentsPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AIAgentsContent />
    </Suspense>
  )
}

// Main content component
function AIAgentsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [founderKey, setFounderKey] = useState('')

  // Configuration state
  const [agentName, setAgentName] = useState('')
  const [agentRole, setAgentRole] = useState('')
  const [agentPrompt, setAgentPrompt] = useState('')
  const [agentCapabilities, setAgentCapabilities] = useState<string[]>([])
  const [newCapability, setNewCapability] = useState('')

  // Update config form when agent is selected
  useEffect(() => {
    if (selectedAgent) {
      setAgentName(selectedAgent.name)
      setAgentRole(selectedAgent.role)
      setAgentPrompt(selectedAgent.instructions.join('\n'))
      setAgentCapabilities(selectedAgent.capabilities)
    }
  }, [selectedAgent])

  const handleSaveConfig = () => {
    alert(`Configuration de ${selectedAgent?.name} enregistrée avec succès!`)
    setShowConfigModal(false)
    setShowModal(false)
  }

  const addCapability = () => {
    if (newCapability.trim() && !agentCapabilities.includes(newCapability.trim())) {
      setAgentCapabilities([...agentCapabilities, newCapability.trim()])
      setNewCapability('')
    }
  }

  const removeCapability = (cap: string) => {
    setAgentCapabilities(agentCapabilities.filter(c => c !== cap))
  }

  // Check authorization
  useEffect(() => {
    const checkAuth = () => {
      // Simuler vérification - en production, cela vérifierait la session
      const stored = localStorage.getItem('founder_auth')
      if (stored === 'electron_founder_2025') {
        setIsAuthorized(true)
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const handleLogin = () => {
    // Clé secrète du fondateur (à changer en production)
    if (founderKey === 'ELECTRON2025') {
      localStorage.setItem('founder_auth', 'electron_founder_2025')
      setIsAuthorized(true)
    } else {
      alert('Clé incorrecte')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('founder_auth')
    setIsAuthorized(false)
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-premium-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-premium-black flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 max-w-md w-full"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-gold" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Accès Réservé</h1>
            <p className="text-gray-400">Cette page est réservée au fondateur de ELECTRON</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Clé d'accès fondateur</label>
              <input
                type="password"
                value={founderKey}
                onChange={(e) => setFounderKey(e.target.value)}
                placeholder="Entrez votre clé secrète"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full glass-button glow-gold"
            >
              Accéder
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <Link href="/" className="flex items-center justify-center gap-2 text-gray-400 hover:text-gold transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  // Filter agents
  const filteredAgents = activeTab === 'all' 
    ? allAgents 
    : allAgents.filter(agent => agent.department === activeTab)

  return (
    <div className="min-h-screen bg-premium-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-premium-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-white/10"></div>
              <Link href="/admin" className="flex items-center gap-3">
                <Logo />
                <div>
                  <span className="text-xl font-bold gold-text">Admin</span>
                  <span className="text-xs text-gray-400 block">Graphisme</span>
                </div>
              </Link>
              <span className="px-3 py-1 bg-gold/20 text-gold text-xs rounded-full hidden sm:inline">Centre de Commande IA</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-gold transition-colors">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors"
              >
                <Lock className="w-4 h-4" />
                <span className="text-sm">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Centre de Commande <span className="gold-text">IA</span>
                </h1>
                <p className="text-gray-400">
                  Gérez et supervisez tous vos agents IA par département
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="glass-card px-4 py-2 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm">{allAgents.filter(a => a.status === 'active').length} agents actifs</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Agents', value: allAgents.length, icon: Bot, color: 'gold' },
              { label: 'Tâches terminées', value: allAgents.reduce((a, b) => a + b.tasksCompleted, 0), icon: CheckCircle, color: 'green' },
              { label: 'En attente', value: allAgents.reduce((a, b) => a + b.tasksPending, 0), icon: Clock, color: 'yellow' },
              { label: 'Départements', value: departments.length, icon: Target, color: 'violet' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-4 flex items-center gap-4"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  stat.color === 'gold' ? 'bg-gold/10 text-gold' :
                  stat.color === 'green' ? 'bg-green-500/10 text-green-500' :
                  stat.color === 'yellow' ? 'bg-yellow-500/10 text-yellow-500' :
                  'bg-violet-IA/10 text-violet-IA'
                }`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Department Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeTab === 'all' ? 'bg-gold text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              Tous les départements
            </button>
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveTab(dept.id)}
                className={`px-4 py-2 rounded-full text-sm transition-all flex items-center gap-2 ${
                  activeTab === dept.id ? 'bg-gold text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                <dept.icon className="w-4 h-4" />
                {dept.name}
              </button>
            ))}
          </div>

          {/* Agents Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent, index) => {
              const IconComponent = agent.icon
              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card overflow-hidden hover:border-gold/30 transition-all cursor-pointer group"
                  onClick={() => {
                    setSelectedAgent(agent)
                    setShowModal(true)
                  }}
                >
                  {/* Agent Header */}
                  <div className={`p-4 bg-gradient-to-r ${
                    agent.color === 'gold' ? 'from-gold/20 to-transparent' :
                    agent.color === 'electric' ? 'from-electric/20 to-transparent' :
                    agent.color === 'violet' ? 'from-violet-IA/20 to-transparent' :
                    agent.color === 'blue' ? 'from-blue-500/20 to-transparent' :
                    agent.color === 'green' ? 'from-green-500/20 to-transparent' :
                    agent.color === 'orange' ? 'from-orange-500/20 to-transparent' :
                    'from-red-500/20 to-transparent'
                  } border-b border-white/5`}>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{agent.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white">{agent.name}</h3>
                          <div className={`w-2 h-2 rounded-full ${
                            agent.status === 'active' ? 'bg-green-500' :
                            agent.status === 'idle' ? 'bg-yellow-500' :
                            agent.status === 'error' ? 'bg-red-500' :
                            'bg-gray-500'
                          }`}></div>
                        </div>
                        <p className="text-sm text-gray-400">{agent.role}</p>
                      </div>
                      <IconComponent className={`w-6 h-6 ${
                        agent.color === 'gold' ? 'text-gold' :
                        agent.color === 'electric' ? 'text-electric' :
                        agent.color === 'violet' ? 'text-violet-IA' :
                        agent.color === 'blue' ? 'text-blue-500' :
                        agent.color === 'green' ? 'text-green-500' :
                        agent.color === 'orange' ? 'text-orange-500' :
                        'text-red-500'
                      }`} />
                    </div>
                  </div>

                  {/* Agent Stats */}
                  <div className="p-4">
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{agent.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-green-500 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          {agent.tasksCompleted}
                        </span>
                        <span className="text-yellow-500 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {agent.tasksPending}
                        </span>
                      </div>
                      <span className="text-gray-500 text-xs">{agent.lastActive}</span>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-gold text-sm font-medium">Voir les détails</span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 glass-card p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gold" />
              Localisation - ELECTRON Cotonou
            </h3>
            <div className="aspect-video rounded-xl overflow-hidden bg-white/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.5!2d2.39!3d6.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjInMDAuMCJOwrAyNScwMC4wIkU!5e0!3m2!1sfr!2sbj!4v1600000000000!5m2!1sfr!2sbj"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation ELECTRON"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-gold" />
                <span>Cotonou, Benin</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-gold" />
                <span>+229 01 97 70 03 47</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-gold" />
                <span>electronbusiness07@gmail.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Agent Detail Modal */}
      {showModal && selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className={`p-6 bg-gradient-to-r ${
              selectedAgent.color === 'gold' ? 'from-gold/20' :
              selectedAgent.color === 'electric' ? 'from-electric/20' :
              selectedAgent.color === 'violet' ? 'from-violet-IA/20' :
              selectedAgent.color === 'blue' ? 'from-blue-500/20' :
              selectedAgent.color === 'green' ? 'from-green-500/20' :
              selectedAgent.color === 'orange' ? 'from-orange-500/20' :
              'from-red-500/20'
            } to-transparent border-b border-white/5`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{selectedAgent.avatar}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold text-white">{selectedAgent.name}</h2>
                      <div className={`w-3 h-3 rounded-full ${
                        selectedAgent.status === 'active' ? 'bg-green-500' :
                        selectedAgent.status === 'idle' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}></div>
                    </div>
                    <p className="text-gray-400">{selectedAgent.role}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-green-500">{selectedAgent.tasksCompleted}</p>
                  <p className="text-xs text-gray-400">Terminées</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-yellow-500">{selectedAgent.tasksPending}</p>
                  <p className="text-xs text-gray-400">En attente</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-gold">{selectedAgent.lastActive}</p>
                  <p className="text-xs text-gray-400">Dernière activité</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Description</h3>
                <p className="text-gray-400">{selectedAgent.description}</p>
              </div>

              {/* Capabilities */}
              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-gold" />
                  Capacités
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedAgent.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-gold" />
                  Instructions
                </h3>
                <div className="space-y-2">
                  {selectedAgent.instructions.map((inst, i) => (
                    <div key={i} className="flex items-start gap-2 text-gray-300 bg-white/5 p-3 rounded-lg">
                      <span className="text-gold font-bold">{i + 1}.</span>
                      <span className="text-sm">{inst}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t border-white/5">
                <button 
                  onClick={() => {
                    // Toggle agent status
                    const updatedAgents = allAgents.map(a => 
                      a.id === selectedAgent.id 
                        ? { ...a, status: a.status === 'active' ? 'paused' as const : 'active' as const }
                        : a
                    )
                    alert(`${selectedAgent.name} ${selectedAgent.status === 'active' ? 'mis en pause' : 'activé'} avec succès!`)
                    setShowModal(false)
                  }}
                  className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                    selectedAgent.status === 'active' 
                      ? 'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30'
                      : 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                  }`}
                >
                  {selectedAgent.status === 'active' ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Mettre en pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Activer
                    </>
                  )}
                </button>
                <button 
                  onClick={() => {
                    // Show configuration modal
                    setShowConfigModal(true)
                  }}
                  className="flex-1 px-4 py-3 bg-white/5 rounded-xl text-gray-300 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Configurer
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Configuration Modal */}
      {showConfigModal && selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Config Header */}
            <div className="p-6 bg-gradient-to-r from-gold/20 to-transparent border-b border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{selectedAgent.avatar}</span>
                  <div>
                    <h2 className="text-xl font-bold text-white">Configuration</h2>
                    <p className="text-gray-400">{selectedAgent.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowConfigModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Config Content */}
            <div className="p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Nom de l'agent</label>
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Rôle</label>
                <input
                  type="text"
                  value={agentRole}
                  onChange={(e) => setAgentRole(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none"
                />
              </div>

              {/* Instructions/Prompt */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Instructions (une par ligne)</label>
                <textarea
                  value={agentPrompt}
                  onChange={(e) => setAgentPrompt(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none resize-none"
                  placeholder="Entrez les instructions pour l'agent..."
                />
              </div>

              {/* Capabilities */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Capacités</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {agentCapabilities.map((cap, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300 flex items-center gap-2">
                      {cap}
                      <button onClick={() => removeCapability(cap)} className="text-red-400 hover:text-red-300">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCapability}
                    onChange={(e) => setNewCapability(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addCapability()}
                    placeholder="Ajouter une capacité..."
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none"
                  />
                  <button
                    onClick={addCapability}
                    className="px-4 py-2 bg-gold/20 text-gold rounded-xl hover:bg-gold/30"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t border-white/5">
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="flex-1 py-3 bg-white/5 rounded-xl text-gray-300 hover:bg-white/10 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveConfig}
                  className="flex-1 py-3 bg-gold text-black rounded-xl font-semibold hover:bg-gold-light transition-colors"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
