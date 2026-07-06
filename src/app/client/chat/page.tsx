'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Bot, Send, X, ChevronDown, Loader2, Phone, Mail, MapPin,
  ArrowLeft, Sparkles, MessageSquare, Lightbulb, CheckCircle, AlertCircle
} from 'lucide-react'

// Agent list available for chat
const AVAILABLE_AGENTS = [
  { id: 'CEO', name: 'CEO AI', role: 'Direction', avatar: '👔', color: 'gold', description: 'Stratégie et décisions' },
  { id: 'Commercial', name: 'Commercial', role: 'Commercial', avatar: '💼', color: 'electric', description: 'Devis et projets' },
  { id: 'Marketing', name: 'Marketing', role: 'Marketing', avatar: '📈', color: 'violet', description: 'SEO etPub' },
  { id: 'Designer', name: 'Designer', role: 'Design', avatar: '🎨', color: 'gold', description: 'Logo et identité' },
  { id: 'Developer', name: 'Developer', role: 'Technique', avatar: '💻', color: 'blue', description: 'Développement' },
  { id: 'Support', name: 'Support', role: 'Support', avatar: '🎧', color: 'green', description: 'Aide et FAQ' },
]

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  agent?: string
  timestamp: Date
}

export default function ChatPage() {
  const [selectedAgent, setSelectedAgent] = useState<typeof AVAILABLE_AGENTS[0] | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showAgentSelect, setShowAgentSelect] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Check Ollama connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const res = await fetch('/api/ollama/status')
        const data = await res.json()
        setIsConnected(data.connected)
        if (!data.connected) {
          setConnectionError(data.message || 'Ollama non connecté')
        }
      } catch {
        setIsConnected(false)
        setConnectionError('Erreur de connexion')
      }
    }
    checkConnection()
  }, [])

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || !selectedAgent || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId: selectedAgent.id,
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erreur de réponse')
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        agent: selectedAgent.name,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `❌ Erreur: ${error.message}. Assurez-vous que Ollama est démarré sur votre machine.`,
        agent: selectedAgent.name,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const selectAgent = (agent: typeof AVAILABLE_AGENTS[0]) => {
    setSelectedAgent(agent)
    setShowAgentSelect(false)
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: `Bonjour! Je suis ${agent.name} de Graphisme by ELECTRON. Comment puis-je vous aider aujourd'hui?`,
      agent: agent.name,
      timestamp: new Date()
    }])
  }

  return (
    <div className="min-h-screen bg-premium-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-premium-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <span className="text-xl font-bold gold-text">Chat IA</span>
                  <span className="text-xs text-gray-400 block">Graphisme by ELECTRON</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              <span className="text-xs text-gray-400">
                {isConnected ? 'IA Connectée' : 'IA Hors ligne'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Agent Selector */}
          {!selectedAgent ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-6">
                <Sparkles className="w-10 h-10 text-gold" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">
                Choisissez un <span className="gold-text">Assistant IA</span>
              </h1>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Nos agents IA sont spécialisés dans chaque domaine. Sélectionnez celui qui peut répondre à vos besoins.
              </p>
              
              {!isConnected && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 max-w-md mx-auto">
                  <div className="flex items-center gap-2 text-red-400 mb-2">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">IA Non Connectée</span>
                  </div>
                  <p className="text-gray-400 text-sm">{connectionError || 'Démarrez Ollama pour utiliser les agents'}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {AVAILABLE_AGENTS.map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => selectAgent(agent)}
                    disabled={!isConnected}
                    className="glass-card p-6 text-left hover:border-gold/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="text-4xl mb-3">{agent.avatar}</div>
                    <h3 className="text-white font-bold mb-1">{agent.name}</h3>
                    <p className="text-gold text-sm mb-2">{agent.role}</p>
                    <p className="text-gray-500 text-xs">{agent.description}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Chat Interface */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card overflow-hidden"
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedAgent.avatar}</span>
                  <div>
                    <h3 className="text-white font-bold">{selectedAgent.name}</h3>
                    <p className="text-gray-400 text-sm">{selectedAgent.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAgentSelect(true)}
                  className="text-gray-400 hover:text-gold transition-colors"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="h-[500px] overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${
                      msg.role === 'user' 
                        ? 'bg-gold text-black px-4 py-2 rounded-2xl rounded-br-md'
                        : 'bg-white/5 text-white px-4 py-2 rounded-2xl rounded-bl-md'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-black/50' : 'text-gray-500'}`}>
                        {msg.agent && <span className="mr-2">🤖 {msg.agent}</span>}
                      </p>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 text-white px-4 py-2 rounded-2xl rounded-bl-md">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-gold" />
                        <span className="text-gray-400">En train d'écrire...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={`Message ${selectedAgent.name}...`}
                    disabled={!isConnected || isLoading}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-gold/50 focus:outline-none disabled:opacity-50"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || !isConnected || isLoading}
                    className="bg-gold hover:bg-gold/80 text-black px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Agent Select Modal */}
      <AnimatePresence>
        {showAgentSelect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAgentSelect(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Changer d'agent</h2>
                <button onClick={() => setShowAgentSelect(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {AVAILABLE_AGENTS.map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => selectAgent(agent)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      selectedAgent?.id === agent.id 
                        ? 'bg-gold/20 border-2 border-gold' 
                        : 'bg-white/5 hover:bg-white/10 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{agent.avatar}</span>
                      <div>
                        <h3 className="text-white font-medium">{agent.name}</h3>
                        <p className="text-gray-400 text-sm">{agent.role}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-premium-black/90 backdrop-blur-xl border-t border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Graphisme by ELECTRON - Powered by Ollama (Local AI)
          </p>
        </div>
      </footer>
    </div>
  )
}
