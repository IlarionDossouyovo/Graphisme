'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, ChevronDown } from 'lucide-react'

// Agent info for the company AI
const agents = [
  { id: 'CEO', name: 'CEO AI', desc: 'Conseil stratégique' },
  { id: 'Commercial', name: 'Commercial AI', desc: 'Devis & projets' },
  { id: 'Marketing', name: 'Marketing AI', desc: 'Stratégie marketing' },
  { id: 'Designer', name: 'Designer AI', desc: 'Design & création' },
  { id: 'Developer', name: 'Developer AI', desc: 'Technique & dev' },
  { id: 'Support', name: 'Support AI', desc: 'Assistance' },
]

interface Message {
  role: 'user' | 'assistant'
  content: string
  agent?: string
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState('Commercial')
  const [showAgentSelect, setShowAgentSelect] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Bonjour ! 👋\n\nJe suis l\'assistant AI de **Graphisme by ELECTRON**.\n\nJe peux vous aider avec :\n- 📊 Conseils stratégiques\n- 💼 Devis pour vos projets\n- 🎨 Création graphique\n- 💻 Développement web\n- 📱 Applications mobiles\n- 📈 Marketing digital\n\n**Comment puis-je vous aider aujourd\'hui ?**',
      agent: 'Commercial'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Check Ollama connection
  useEffect(() => {
    checkConnection()
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

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

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent: selectedAgent,
          message: userMessage,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la réponse')
      }

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response,
        agent: selectedAgent
      }])
    } catch (error: any) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `❌ ${error.message}\n\nVérifiez que **Ollama** est démarré sur votre machine.\n\nCommande: \`ollama serve\``,
        agent: selectedAgent
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const currentAgent = agents.find(a => a.id === selectedAgent)

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => { setIsOpen(true); setIsMinimized(false) }}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-gold to-yellow-600 rounded-full shadow-lg shadow-gold/30 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer ${
          isOpen ? 'hidden' : 'flex'
        }`}
        aria-label="Ouvrir l'assistant AI"
      >
        <MessageCircle className="w-8 h-8 text-black" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-50 w-96 bg-gray-900/95 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isMinimized ? 'h-16' : 'h-[600px]'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-gold/20 to-yellow-600/20 p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gold to-yellow-600 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Assistant AI</h3>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="text-xs text-gray-400">
                      {isConnected ? 'En ligne' : 'Hors ligne'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronDown className={`w-5 h-5 transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Agent Selector */}
            {!isMinimized && (
              <div className="mt-3 relative">
                <button
                  onClick={() => setShowAgentSelect(!showAgentSelect)}
                  className="w-full flex items-center justify-between px-3 py-2 bg-black/30 rounded-lg text-sm hover:bg-black/40 transition-colors"
                >
                  <span className="text-white">{currentAgent?.name}</span>
                  <span className="text-gray-400 text-xs">{currentAgent?.desc}</span>
                </button>
                
                {showAgentSelect && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-white/10 rounded-lg overflow-hidden z-10">
                    {agents.map(agent => (
                      <button
                        key={agent.id}
                        onClick={() => {
                          setSelectedAgent(agent.id)
                          setShowAgentSelect(false)
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-colors ${
                          selectedAgent === agent.id ? 'bg-gold/20' : ''
                        }`}
                      >
                        <div className="text-white text-sm font-medium">{agent.name}</div>
                        <div className="text-gray-400 text-xs">{agent.desc}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 h-[380px] overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'user' 
                        ? 'bg-blue-500/20 border border-blue-500/50' 
                        : 'bg-gold/20 border border-gold/50'
                    }`}>
                      {msg.role === 'user' 
                        ? <User className="w-4 h-4 text-blue-400" />
                        : <Bot className="w-4 h-4 text-gold" />
                      }
                    </div>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.role === 'user' 
                        ? 'bg-blue-500/20 border border-blue-500/30 text-white' 
                        : 'bg-white/5 border border-white/10 text-white'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-gold" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                      <Loader2 className="w-5 h-5 text-gold animate-spin" />
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Connection Error */}
              {!isConnected && connectionError && (
                <div className="px-4 py-2 bg-red-500/10 border-t border-red-500/20">
                  <p className="text-xs text-red-400">{connectionError}</p>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tapez votre message..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-gold/50 focus:outline-none text-sm disabled:opacity-50"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={isLoading || !input.trim()}
                    className="px-4 py-3 bg-gradient-to-r from-gold to-yellow-600 rounded-xl text-black hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
