'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, ChevronDown, Mic, MicOff, Volume2, VolumeX, Settings, Briefcase, TrendingUp, Palette, Code, Headphones } from 'lucide-react'

// Agent info for the company AI
const agents = [
  { id: 'CEO', name: 'Direction', desc: 'Conseil stratégique' },
  { id: 'Commercial', name: 'Commercial', desc: 'Devis & projets' },
  { id: 'Marketing', name: 'Marketing', desc: 'Stratégie marketing' },
  { id: 'Designer', name: 'Designer', desc: 'Design & création' },
  { id: 'Developer', name: 'Technique', desc: 'Développement' },
  { id: 'Support', name: 'Support', desc: 'Assistance' },
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
      content: `Bonjour ! 👋\n\nJe suis l'assistant vocal de **Graphisme by ELECTRON**.\n\nJe peux vous aider avec :\n- 💼 Vos projets digitaux\n- 🎨 Design et création\n- 💻 Développement web\n- 📈 Marketing digital\n- 🔒 Sécurité informatique\n\n**Parlez-moi de votre projet ou posez-moi vos questions !**`,
      agent: 'Commercial'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState('')
  
  // Voice states
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [autoSpeak, setAutoSpeak] = useState(true)
  const [voiceSpeed, setVoiceSpeed] = useState(1)
  const [showSettings, setShowSettings] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  
  // Speech Recognition & Synthesis - only on client side
  const [speechRecognition, setSpeechRecognition] = useState<any>(null)
  const [speechSynthesis, setSpeechSynthesis] = useState<any>(null)

  // Check Ollama connection
  useEffect(() => {
    checkConnection()
    
    // Initialize Speech Recognition & Synthesis on client side
    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognitionAPI) {
        setSpeechRecognition(() => SpeechRecognitionAPI)
      }
      if (window.speechSynthesis) {
        setSpeechSynthesis(() => window.speechSynthesis)
      }
    }
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
      
      // Speak the response if autoSpeak is enabled
      if (autoSpeak) {
        speak(data.response)
      }
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

  // Text-to-Speech function
  const speak = (text: string) => {
    if (!speechSynthesis) {
      console.error('Speech synthesis not available')
      return
    }

    // Stop any current speech
    speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'fr-FR'
    utterance.rate = voiceSpeed
    utterance.pitch = 1
    
    // Try to get a French voice
    const voices = speechSynthesis.getVoices()
    const frenchVoice = voices.find((v: any) => v.lang.includes('fr'))
    if (frenchVoice) {
      utterance.voice = frenchVoice
    }

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    speechSynthesis.speak(utterance)
  }

  // Stop speaking
  const stopSpeaking = () => {
    speechSynthesis?.cancel()
    setIsSpeaking(false)
  }

  // Speech Recognition function
  const startListening = () => {
    if (!speechRecognition) {
      alert('La reconnaissance vocale n\'est pas supportée par votre navigateur.')
      return
    }

    const recognition = new speechRecognition()
    recognition.lang = 'fr-FR'
    recognition.continuous = false
    recognition.interimResults = true

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('')
      
      setInput(transcript)
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
      // Auto-send if we have input
      if (input.trim()) {
        sendMessage()
      }
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }

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
                  <h3 className="text-white font-semibold text-sm">Assistant</h3>
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
              <div className="p-4 border-t border-white/10 space-y-3">
                {/* Voice Controls & Settings */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {/* Mic Button */}
                    <button
                      onClick={isListening ? stopListening : startListening}
                      className={`p-2 rounded-lg transition-colors ${
                        isListening 
                          ? 'bg-red-500/20 text-red-400 animate-pulse' 
                          : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                      title={isListening ? 'Arrêter' : 'Parler'}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                    
                    {/* Speaker Button */}
                    <button
                      onClick={() => {
                        if (isSpeaking) {
                          stopSpeaking()
                        } else {
                          // Get last assistant message and speak it
                          const lastMsg = messages.filter(m => m.role === 'assistant').pop()
                          if (lastMsg) speak(lastMsg.content)
                        }
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        isSpeaking 
                          ? 'bg-gold/20 text-gold' 
                          : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                      title={isSpeaking ? 'Arrêter' : 'Écouter'}
                    >
                      {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  {/* Settings */}
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className={`p-2 rounded-lg transition-colors ${
                      showSettings 
                        ? 'bg-gold/20 text-gold' 
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                    title="Paramètres"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Settings Panel */}
                {showSettings && (
                  <div className="p-3 bg-black/30 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Synthèse vocale auto</span>
                      <button
                        onClick={() => setAutoSpeak(!autoSpeak)}
                        className={`w-10 h-5 rounded-full transition-colors ${
                          autoSpeak ? 'bg-gold' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          autoSpeak ? 'translate-x-5' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-gray-400">Vitesse: {voiceSpeed}x</span>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={voiceSpeed}
                        onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                        className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                )}
                
                {/* Message Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isListening ? 'Écoute en cours...' : 'Tapez votre message ou cliquez sur le micro...'}
                    disabled={isLoading || isListening}
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-gold/50 focus:outline-none text-sm disabled:opacity-50"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={isLoading || !input.trim() || isListening}
                    className="px-4 py-3 bg-gradient-to-r from-gold to-yellow-600 rounded-xl text-black hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
                
                {/* Listening Indicator */}
                {isListening && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <Mic className="w-4 h-4 animate-pulse" />
                    <span>Écoute en cours... Parlez maintenant</span>
                  </div>
                )}
                
                {/* Speaking Indicator */}
                {isSpeaking && (
                  <div className="flex items-center gap-2 text-gold text-sm">
                    <Volume2 className="w-4 h-4 animate-pulse" />
                    <span>L'IA parle...</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
