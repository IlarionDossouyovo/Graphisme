'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Brain, Users, Code, Palette, Video, MessageSquare, TrendingUp, Shield, Database, Bot, Zap, Activity, X, Send, Loader2, Volume2, VolumeX, Play, Square, Mic, MicOff } from 'lucide-react'
import { AGENTS, AVAILABLE_MODELS } from '@/lib/ai/ollama'
import { voiceService } from '@/lib/voice'

// Map icons to agents
const getAgentIcon = (id: string) => {
  const icons: Record<string, any> = {
    CEO: Brain,
    Commercial: Users,
    Marketing: TrendingUp,
    Designer: Palette,
    Developer: Code,
    Motion: Video,
    CommunityManager: MessageSquare,
    Finance: Activity,
    Support: Bot,
    DevOps: Zap,
    CyberSecurity: Shield,
    DataAnalyst: Database,
  }
  return icons[id] || Bot
}

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

const aiAgents = [
  {
    id: 'CEO',
    name: 'CEO AI',
    role: 'Direction Stratégique',
    description: 'Supervision et décisions stratégiques pour l\'entreprise. Analyse des données marché et planification.',
    color: 'gold',
    icon: Brain,
    status: 'active',
    capabilities: ['Analyse stratégique', 'Prise de décision', 'Planification', 'Reporting'],
  },
  {
    id: 'Commercial',
    name: 'Commercial AI',
    role: 'CRM & Prospection',
    description: 'Gestion des relations clients et prospection automatique. Suivi des leads et conversion.',
    color: 'electric',
    icon: Users,
    status: 'active',
    capabilities: ['CRM automatique', 'Prospection', 'Suivi leads', 'Conversion'],
  },
  {
    id: 'Marketing',
    name: 'Marketing AI',
    role: 'SEO & Publicité',
    description: 'Stratégies marketing digital, SEO, SEA et campagnes publicitaires intelligentes.',
    color: 'violet',
    icon: TrendingUp,
    status: 'active',
    capabilities: ['SEO', 'Google Ads', 'Facebook Ads', 'Analytics'],
  },
  {
    id: 'Designer',
    name: 'Designer AI',
    role: 'Création Graphique',
    description: 'Création de logos, identités visuelles, charte graphique et designs adaptés à votre marque.',
    color: 'gold',
    icon: Palette,
    status: 'active',
    capabilities: ['Logo design', 'Identité visuelle', 'Charte graphique', 'UI/UX'],
  },
  {
    id: 'Developer',
    name: 'Developer AI',
    role: 'Développement',
    description: 'Développement frontend et backend pour sites web, applications et solutions personnalisées.',
    color: 'electric',
    icon: Code,
    status: 'active',
    capabilities: ['Frontend', 'Backend', 'API', 'Base de données'],
  },
  {
    id: 'Motion',
    name: 'Motion AI',
    role: 'Vidéo & Animation',
    description: 'Production vidéo, montage, motion design et animations 2D/3D pour tous vos supports.',
    color: 'violet',
    icon: Video,
    status: 'active',
    capabilities: ['Montage vidéo', 'Motion Design', 'Animation 3D', 'Voix IA'],
  },
  {
    id: 'CommunityManager',
    name: 'Community Manager AI',
    role: 'Réseaux Sociaux',
    description: 'Gestion complète des réseaux sociaux avec publication, engagement et croissance de communauté.',
    color: 'gold',
    icon: MessageSquare,
    status: 'active',
    capabilities: ['Publication', 'Engagement', 'Croissance', 'Calendrier éditorial'],
  },
  {
    id: 'Finance',
    name: 'Finance AI',
    role: 'Facturation & Comptabilité',
    description: 'Gestion des factures, devis, trésorerie et rapports financiers automatisés.',
    color: 'electric',
    icon: Activity,
    status: 'active',
    capabilities: ['Facturation', 'Devis', 'Trésorerie', 'Rapports'],
  },
  {
    id: 'Support',
    name: 'Support AI',
    role: 'Assistance Client',
    description: 'Support client 24/7 avec tickets, FAQ et résolution rapide des problèmes.',
    color: 'violet',
    icon: Bot,
    status: 'active',
    capabilities: ['Support 24/7', 'Tickets', 'FAQ', 'Chatbot'],
  },
  {
    id: 'DevOps',
    name: 'DevOps AI',
    role: 'Infrastructure & CI/CD',
    description: 'Gestion d\'infrastructure, déploiements automatisés et monitoring des applications.',
    color: 'gold',
    icon: Zap,
    status: 'active',
    capabilities: ['Docker', 'CI/CD', 'Monitoring', 'Cloud'],
  },
  {
    id: 'CyberSecurity',
    name: 'CyberSecurity AI',
    role: 'Sécurité & Audit',
    description: 'Sécurité des systèmes, audits et surveillance continue contre les menaces.',
    color: 'electric',
    icon: Shield,
    status: 'active',
    capabilities: ['Audit', 'Surveillance', 'Backups', 'Détection menaces'],
  },
  {
    id: 'DataAnalyst',
    name: 'Data Analyst AI',
    role: 'Business Intelligence',
    description: 'Analyse de données, rapports et tableaux de bord pour des décisions éclairées.',
    color: 'violet',
    icon: Database,
    status: 'active',
    capabilities: ['Analyse data', 'Dashboards', 'Rapports', 'Prévisions'],
  },
]

export default function AITeamPage() {
  const router = useRouter()
  const [selectedAgent, setSelectedAgent] = useState<typeof aiAgents[0] | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([])
  const [chatInput, setChatInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const handleAgentClick = (agent: typeof aiAgents[0]) => {
    setSelectedAgent(agent)
    setIsChatOpen(true)
    setChatMessages([])
  }

  // Speech Recognition for microphone input
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'fr-FR'
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setChatInput(transcript)
        setIsListening(false)
      }
      
      recognition.onerror = () => {
        setIsListening(false)
      }
      
      recognition.onend = () => {
        setIsListening(false)
      }
      
      // Expose recognition for button click
      ;(window as any).speechRecognition = recognition
    }
  }, [])

  const toggleMicrophone = () => {
    const recognition = (window as any).speechRecognition
    if (!recognition) {
      alert('Speech recognition not supported in this browser')
      return
    }
    
    // Check if recognition is already running by its state
    if (recognition.state === 'running') {
      recognition.stop()
      setIsListening(false)
    } else {
      try {
        recognition.start()
        setIsListening(true)
      } catch (e) {
        // If already started, try to stop and restart
        try {
          recognition.stop()
          setTimeout(() => {
            recognition.start()
            setIsListening(true)
          }, 100)
        } catch (e2) {
          console.error('Speech recognition error:', e2)
        }
      }
    }
  }

  const handleSendMessage = async () => {
    if (!chatInput.trim() || !selectedAgent || isLoading) return

    const userMessage = chatInput.trim()
    setChatInput('')
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      // Show connection status
      setChatMessages(prev => [...prev, { role: 'assistant', content: '🔄 Connexion à l\'IA en cours...' }])

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent: selectedAgent.id,
          message: userMessage,
          history: chatMessages.filter(m => m.role !== 'assistant' || m.content !== '🔄 Connexion à l\'IA en cours...')
        })
      })

      const data = await response.json()
      
      // Remove the "connecting" message
      setChatMessages(prev => prev.filter(m => m.content !== '🔄 Connexion à l\'IA en cours...'))
      
      let responseContent = ''
      if (data.response) {
        responseContent = data.response
        setChatMessages(prev => [...prev, { role: 'assistant', content: data.response }])
      } else if (data.error) {
        responseContent = `⚠️ ${data.error}. Solution: Ollama doit être démarré.`
        setChatMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `⚠️ ${data.error}\n\n💡 Solution : Assurez-vous qu'Ollama est démarré sur votre machine avec la commande :\n\`ollama serve\`\n\nPuis rechargez la page.` 
        }])
      } else {
        responseContent = 'Désolé, je rencontre un problème pour répondre.'
        setChatMessages(prev => [...prev, { role: 'assistant', content: 'Désolé, je rencontre un problème pour répondre.' }])
      }
      
      // Speak the response if voice is enabled
      if (voiceEnabled && responseContent) {
        setIsSpeaking(true)
        voiceService.speak(responseContent, selectedAgent?.name || 'Assistant', () => {
          setIsSpeaking(false)
        })
      }
    } catch (error) {
      // Remove the "connecting" message
      setChatMessages(prev => prev.filter(m => m.content !== '🔄 Connexion à l\'IA en cours...'))
      const errorContent = 'Erreur de connexion. Ollama doit être démarré.'
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `❌ Erreur de connexion.\n\nPour démarrer l'IA, ouvrez un terminal et exécutez :\n\`ollama serve\`\n\n Ensuite, vérifiez que les modèles sont installés :\n\`ollama list\`` 
      }])
      // Speak error message if voice enabled
      if (voiceEnabled) {
        setIsSpeaking(true)
        voiceService.speak(errorContent, selectedAgent?.name || 'Assistant', () => {
          setIsSpeaking(false)
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-premium-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-premium-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Logo />
              <div>
                <span className="text-xl font-bold gold-text">Graphisme</span>
                <span className="text-xs text-gray-400 block">by ELECTRON</span>
              </div>
            </Link>
            <Link href="/login" className="glass-button text-sm">
              Connexion
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold mb-8">
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Notre Équipe <span className="gold-text">IA</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              12 agents IA spécialisés qui travaillent ensemble pour transformer vos projets en réalité. 
              Une équipe disponible 24/7 pour vous accompagner.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { number: '12', label: 'Agents IA' },
              { number: '24/7', label: 'Disponibilité' },
              { number: '<1min', label: 'Temps de réponse' },
              { number: '90%', label: 'Automatisation' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="text-3xl font-bold gold-text mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* AI Agents Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-6 hover:border-gold/30 transition-all group cursor-pointer"
                onClick={() => handleAgentClick(agent)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    agent.color === 'gold' ? 'bg-gold/10' :
                    agent.color === 'electric' ? 'bg-electric/10' :
                    'bg-violet-IA/10'
                  }`}>
                    <agent.icon className={`w-7 h-7 ${
                      agent.color === 'gold' ? 'text-gold' :
                      agent.color === 'electric' ? 'text-electric' :
                      'text-violet-IA'
                    }`} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      agent.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                    }`}></span>
                    <span className="text-xs text-gray-400 capitalize">{agent.status}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-1">{agent.name}</h3>
                <p className="text-sm text-gold mb-3">{agent.role}</p>
                <p className="text-gray-400 text-sm mb-4">{agent.description}</p>

                {/* Capabilities */}
                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.map((cap, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 text-center glass-card p-12 bg-gradient-to-r from-violet-IA/10 to-electric/10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Échangez avec notre IA
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Discutez directement avec nos agents IA pour obtenir des conseils, des devis ou simplement poser vos questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="glass-button glow-gold inline-flex">
                Contacter l'IA
              </Link>
              <Link href="/login" className="px-8 py-4 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/5 transition-all inline-flex items-center justify-center gap-2">
                <Bot className="w-5 h-5" />
                Tableau de bord
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-premium-dark border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Graphisme by ELECTRON. Tous droits réservés.
          </p>
        </div>
      </footer>

      {/* Chat Modal */}
      {isChatOpen && selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsChatOpen(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-lg bg-premium-dark border border-white/10 rounded-2xl overflow-hidden"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  selectedAgent.color === 'gold' ? 'bg-gold/10' :
                  selectedAgent.color === 'electric' ? 'bg-electric/10' :
                  'bg-violet-IA/10'
                }`}>
                  <selectedAgent.icon className={`w-5 h-5 ${
                    selectedAgent.color === 'gold' ? 'text-gold' :
                    selectedAgent.color === 'electric' ? 'text-electric' :
                    'text-violet-IA'
                  }`} />
                </div>
                <div>
                  <h3 className="text-white font-bold">{selectedAgent.name}</h3>
                  <p className="text-xs text-gray-400">{selectedAgent.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Voice Toggle Button */}
                <button
                  onClick={() => {
                    if (isSpeaking) {
                      voiceService.stop()
                      setIsSpeaking(false)
                    } else {
                      setVoiceEnabled(!voiceEnabled)
                    }
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    voiceEnabled ? 'text-gold hover:bg-gold/10' : 'text-gray-400 hover:bg-white/10'
                  }`}
                  title={voiceEnabled ? 'Desactiver la voix' : 'Activer la voix'}
                >
                  {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                {/* Stop Speaking Button */}
                {isSpeaking && (
                  <button
                    onClick={() => {
                      voiceService.stop()
                      setIsSpeaking(false)
                    }}
                    className="p-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
                    title="Arreter la lecture"
                  >
                    <Square className="w-5 h-5" />
                  </button>
                )}
                <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white ml-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {chatMessages.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  <selectedAgent.icon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Discutez avec {selectedAgent.name}</p>
                  <p className="text-xs mt-2">Cet agent utilise l'IA pour vous répondre</p>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl ${
                    msg.role === 'user' 
                      ? 'bg-gold/20 text-white' 
                      : 'bg-white/5 text-gray-300'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-xl">
                    <Loader2 className="w-5 h-5 text-gold animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Tapez votre message..."
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none"
                />
                {/* Microphone Button */}
                <button
                  onClick={toggleMicrophone}
                  disabled={isLoading}
                  className={`p-2 rounded-xl transition-colors ${
                    isListening 
                      ? 'bg-red-500/20 text-red-400 animate-pulse' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                  title={isListening ? 'Arreter le micro' : 'Activer le micro'}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !chatInput.trim()}
                  className="px-4 py-2 bg-gold/20 text-gold rounded-xl hover:bg-gold/30 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
