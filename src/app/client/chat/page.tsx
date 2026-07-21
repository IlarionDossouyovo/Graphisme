'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Bot, Send, X, ChevronDown, Loader2, Phone, Mail, MapPin,
  ArrowLeft, Sparkles, MessageSquare, Lightbulb, CheckCircle, AlertCircle,
  Volume2, VolumeX, Mic, MicOff, User, Zap, Settings, Paperclip, 
  Image as ImageIcon, FileText, Download, Trash2, Eye
} from 'lucide-react'
import { voiceService, VoiceGender, VoiceQuality } from '@/lib/voice'

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
  attachments?: Attachment[]
}

interface Attachment {
  id: string
  name: string
  type: 'image' | 'file'
  url: string
  size: number
  preview?: string
}

export default function ChatPage() {
  const [selectedAgent, setSelectedAgent] = useState<typeof AVAILABLE_AGENTS[0] | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showAgentSelect, setShowAgentSelect] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState('')
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)
  const [voiceGender, setVoiceGender] = useState<VoiceGender>('male')
  const [voiceQuality, setVoiceQuality] = useState<VoiceQuality>('premium')
  const [showVoiceSettings, setShowVoiceSettings] = useState(false)
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [showFilePreview, setShowFilePreview] = useState(false)
  const [selectedAttachment, setSelectedAttachment] = useState<Attachment | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // File upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    const newAttachments: Attachment[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`Le fichier ${file.name} est trop volumineux (max 10MB)`)
        continue
      }

      // Determine file type
      const isImage = file.type.startsWith('image/')
      
      // Create local URL for preview
      const url = URL.createObjectURL(file)
      
      const attachment: Attachment = {
        id: Date.now().toString() + i,
        name: file.name,
        type: isImage ? 'image' : 'file',
        url: url,
        size: file.size,
        preview: isImage ? url : undefined
      }
      
      newAttachments.push(attachment)
    }

    setAttachments(prev => [...prev, ...newAttachments])
    setIsUploading(false)
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Remove attachment
  const removeAttachment = (id: string) => {
    setAttachments(prev => {
      const att = prev.find(a => a.id === id)
      if (att) {
        URL.revokeObjectURL(att.url)
      }
      return prev.filter(a => a.id !== id)
    })
  }

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognizer = new SpeechRecognition()
      recognizer.continuous = false
      recognizer.interimResults = false
      recognizer.lang = 'fr-FR'
      
      recognizer.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(prev => prev + ' ' + transcript)
        setIsListening(false)
      }
      
      recognizer.onerror = () => {
        setIsListening(false)
      }
      
      recognizer.onend = () => {
        setIsListening(false)
      }
      
      setRecognition(recognizer)
    }
  }, [])

  const toggleVoiceInput = () => {
    if (!recognition) return
    
    // Check if recognition is already running
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

  // Check Ollama connection on mount - Demo mode if not connected
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const res = await fetch('/api/ollama/status')
        const data = await res.json()
        setIsConnected(data.connected)
        if (!data.connected) {
          // Demo mode - allow testing voice features
          setIsConnected(true) 
          setConnectionError('')
        }
      } catch {
        // Demo mode - allow testing voice features
        setIsConnected(true)
        setConnectionError('')
      }
    }
    checkConnection()
  }, [])

  // Speak incoming messages with voice settings
  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage && lastMessage.role === 'assistant' && voiceEnabled) {
      setIsSpeaking(true)
      // Apply voice settings
      voiceService.setGender(voiceGender)
      voiceService.setQuality(voiceQuality)
      voiceService.speak(lastMessage.content, selectedAgent?.name || 'Support', () => {
        setIsSpeaking(false)
      })
    }
    
    return () => {
      if (!voiceEnabled) {
        voiceService.stop()
      }
    }
  }, [messages, voiceEnabled, selectedAgent, voiceGender, voiceQuality])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      voiceService.stop()
    }
  }, [])

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() && attachments.length === 0 || !selectedAgent || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input || (attachments.length > 0 ? `J'ai partagé ${attachments.length} fichier(s)` : ''),
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setAttachments([])
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
      // Demo mode - generate a response based on the agent
      const demoResponses: Record<string, string[]> = {
        CEO: [
          "Je suis le CEO de Graphisme by ELECTRON. Notre mission est de revolutionner le digital au Benin avec l'IA.",
          "Bienvenue chez Graphisme by ELECTRON! Nous combinons creativity et technologie pour des solutions inovantes.",
        ],
        Commercial: [
          "Je peux vous aider a elaborer un devis pour vos projets digitaux. Quels sont vos besoins?",
          "Nos services incluent: creation de sites web, design graphique, marketing digital, et solutions IA.",
        ],
        Marketing: [
          "Notre strategie marketing combine SEO, reseaux sociaux et publicite en ligne pour maximiser votre visibilite.",
          "Je peux vous aider a ameliorer votre presence en ligne et attract de nouveaux clients.",
        ],
        Designer: [
          "Je suis specialize dans la creation d'identites visuelles, logos, et designs graphiques professionnels.",
          "Voici quelques conseils pour un design efficace: simplicite, coherence des couleurs, et lisibilite.",
        ],
        Developer: [
          "En tant que developpeur, je peux vous aider avec Next.js, React, Node.js, et bien plus encore.",
          "Les technologies modernes que nous utilisons incluent: TypeScript, Tailwind CSS, et les API REST.",
        ],
        Support: [
          "Je suis la pour vous aider! Posez-moi vos questions sur nos services ou signalez un probleme.",
          "Pour toute assistance technique, n'hesitez pas a nous contacter. Nous repondons rapidement.",
        ],
      }
      
      const agentResponses = demoResponses[selectedAgent.id] || demoResponses.Support
      const randomResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)]
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse + "\n\n(Note: Mode demo - Ollama non connecte)",
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
                <div className="flex items-center gap-2">
                  {/* Voice Settings Button */}
                  <button
                    onClick={() => setShowVoiceSettings(!showVoiceSettings)}
                    className={`p-2 rounded-lg transition-colors ${
                      showVoiceSettings 
                        ? 'text-gold bg-gold/10 hover:bg-gold/20' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                    title="Paramètres vocaux"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                  {/* Voice Controls */}
                  <button
                    onClick={() => {
                      if (voiceEnabled) {
                        voiceService.stop()
                        setVoiceEnabled(false)
                      } else {
                        setVoiceEnabled(true)
                      }
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      voiceEnabled 
                        ? 'text-gold bg-gold/10 hover:bg-gold/20' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                    title={voiceEnabled ? 'Désactiver la voix' : 'Activer la voix'}
                  >
                    {voiceEnabled ? (
                      <Volume2 className="w-5 h-5" />
                    ) : (
                      <VolumeX className="w-5 h-5" />
                    )}
                  </button>
                  {/* Speaking indicator */}
                  {isSpeaking && (
                    <div className="flex items-center gap-1 text-gold">
                      <div className="flex gap-0.5">
                        <span className="w-1 h-3 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-1 h-4 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-1 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => setShowAgentSelect(true)}
                    className="text-gray-400 hover:text-gold transition-colors ml-2"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>
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
                      
                      {/* Attachments Display */}
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {msg.attachments.map((att) => (
                            <div key={att.id}>
                              {att.type === 'image' ? (
                                <button
                                  onClick={() => {
                                    setSelectedAttachment(att)
                                    setShowFilePreview(true)
                                  }}
                                  className="relative w-20 h-20 rounded-lg overflow-hidden border border-black/20 hover:opacity-90 transition-opacity"
                                >
                                  <img 
                                    src={att.url} 
                                    alt={att.name}
                                    className="w-full h-full object-cover"
                                  />
                                </button>
                              ) : (
                                <div className="flex items-center gap-2 bg-black/10 rounded-lg px-3 py-2">
                                  <FileText className="w-4 h-4" />
                                  <span className="text-xs max-w-[80px] truncate">{att.name}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      
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

              {/* Voice Settings Toggle */}
              <div className="px-4 py-2 bg-gradient-to-r from-gold/10 to-violet-IA/10 border-b border-white/5">
                <button
                  onClick={() => setShowVoiceSettings(!showVoiceSettings)}
                  className="flex items-center justify-center gap-2 w-full py-2 text-white hover:text-gold transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {showVoiceSettings ? 'Masquer les paramètres vocaux' : 'Afficher les paramètres vocaux'}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({voiceGender === 'male' ? '👨' : '👩'} {voiceQuality === 'premium' ? '👑' : voiceQuality === 'optimized' ? '⚡' : '📊'})
                  </span>
                </button>
              </div>

              {/* Voice Settings Panel */}
              {showVoiceSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border-b border-white/10 bg-white/5 p-4 space-y-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">⚙️ Paramètres Vocaux</span>
                    <button
                      onClick={() => voiceService.testVoice(voiceGender, voiceQuality)}
                      disabled={isSpeaking}
                      className="text-xs text-gold hover:text-gold-light flex items-center gap-1 bg-gold/10 px-3 py-1 rounded-full"
                    >
                      <Volume2 className="w-3 h-3" />
                      Tester
                    </button>
                  </div>
                  
                  {/* Genre de voix */}
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">🎤 Genre de voix</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setVoiceGender('male')}
                        className={`px-3 py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 ${
                          voiceGender === 'male' 
                            ? 'bg-gold/20 text-gold border border-gold/30' 
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        👨 Masculin
                      </button>
                      <button
                        onClick={() => setVoiceGender('female')}
                        className={`px-3 py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 ${
                          voiceGender === 'female' 
                            ? 'bg-violet-IA/20 text-violet-IA border border-violet-IA/30' 
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        👩 Féminin
                      </button>
                    </div>
                  </div>

                  {/* Qualité vocale */}
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">📊 Qualité de voix</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setVoiceQuality('normal')}
                        className={`px-2 py-3 rounded-lg text-sm transition-colors flex flex-col items-center gap-1 ${
                          voiceQuality === 'normal' 
                            ? 'bg-electric/20 text-electric border border-electric/30' 
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        <span>📊</span>
                        <span>Normal</span>
                      </button>
                      <button
                        onClick={() => setVoiceQuality('optimized')}
                        className={`px-2 py-3 rounded-lg text-sm transition-colors flex flex-col items-center gap-1 ${
                          voiceQuality === 'optimized' 
                            ? 'bg-green-500/20 text-green-500 border border-green-500/30' 
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        <span>⚡</span>
                        <span>Optimisé</span>
                      </button>
                      <button
                        onClick={() => setVoiceQuality('premium')}
                        className={`px-2 py-3 rounded-lg text-sm transition-colors flex flex-col items-center gap-1 ${
                          voiceQuality === 'premium' 
                            ? 'bg-gold/20 text-gold border border-gold/30' 
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        <span>👑</span>
                        <span>Premium</span>
                      </button>
                    </div>
                  </div>

                  {/* Status info */}
                  <div className="text-xs text-gray-500 pt-2 border-t border-white/5 text-center">
                    🎧 Voix actuelle: <span className="text-white font-medium">
                      {voiceGender === 'male' ? 'Masculine' : 'Féminine'}
                    </span> • Qualité: <span className="text-white font-medium">
                      {voiceQuality === 'normal' ? 'Normale' : voiceQuality === 'optimized' ? 'Optimisée' : 'Premium'}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                {/* Attachment Preview */}
                {attachments.length > 0 && (
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {attachments.map((att) => (
                      <div key={att.id} className="relative group">
                        {att.type === 'image' ? (
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/10">
                            <img 
                              src={att.url} 
                              alt={att.name}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() => removeAttachment(att.id)}
                              className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3 text-white" />
                            </button>
                          </div>
                        ) : (
                          <div className="relative flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                            <FileText className="w-4 h-4 text-gold" />
                            <span className="text-xs text-white max-w-[100px] truncate">{att.name}</span>
                            <span className="text-xs text-gray-500">{formatFileSize(att.size)}</span>
                            <button
                              onClick={() => removeAttachment(att.id)}
                              className="text-gray-400 hover:text-red-400"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-2">
                  {/* File Upload Button */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*,.pdf,.doc,.docx,.txt,.xls,.xlsx"
                    multiple
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={!isConnected || isLoading || isUploading}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                    title="Joindre un fichier"
                  >
                    {isUploading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Paperclip className="w-5 h-5" />
                    )}
                  </button>
                  
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={`Message ${selectedAgent.name}...`}
                    disabled={!isConnected || isLoading}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-gold/50 focus:outline-none disabled:opacity-50"
                  />
                  {/* Microphone Button - Voice Input */}
                  {recognition && (
                    <button
                      onClick={toggleVoiceInput}
                      disabled={!isConnected || isLoading}
                      className={`p-3 rounded-xl transition-colors flex items-center gap-2 ${
                        isListening 
                          ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                          : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
                      }`}
                      title={isListening ? 'Arrêter l\'écoute' : 'Dictée vocale'}
                    >
                      <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
                    </button>
                  )}
                  <button
                    onClick={handleSend}
                    disabled={(!input.trim() && attachments.length === 0) || !isConnected || isLoading}
                    className="bg-gold hover:bg-gold/80 text-black px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                
                {/* File upload hint */}
                <div className="text-xs text-gray-500 mt-2 text-center">
                  Images (PNG, JPG, GIF) • Documents (PDF, DOC, TXT) • Tableurs (XLS, XLSX)
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

      {/* File Preview Modal */}
      <AnimatePresence>
        {showFilePreview && selectedAttachment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowFilePreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowFilePreview(false)}
                className="absolute -top-12 right-0 text-white hover:text-gold transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              
              {/* Image preview */}
              {selectedAttachment.type === 'image' && (
                <div className="flex flex-col items-center">
                  <img
                    src={selectedAttachment.url}
                    alt={selectedAttachment.name}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  />
                  <div className="mt-4 text-center">
                    <p className="text-white font-medium">{selectedAttachment.name}</p>
                    <p className="text-gray-400 text-sm">{formatFileSize(selectedAttachment.size)}</p>
                  </div>
                </div>
              )}
              
              {/* File info */}
              {selectedAttachment.type === 'file' && (
                <div className="glass-card p-8 text-center">
                  <FileText className="w-16 h-16 text-gold mx-auto mb-4" />
                  <p className="text-white font-medium text-lg mb-2">{selectedAttachment.name}</p>
                  <p className="text-gray-400 mb-4">{formatFileSize(selectedAttachment.size)}</p>
                  <a
                    href={selectedAttachment.url}
                    download={selectedAttachment.name}
                    className="inline-flex items-center gap-2 bg-gold text-black px-6 py-3 rounded-xl font-medium hover:bg-gold/80 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Télécharger
                  </a>
                </div>
              )}
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
