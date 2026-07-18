'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  ArrowLeft, Home, Bot, ShoppingCart, MessageSquare, Users,
  Settings, FileText, CreditCard, BarChart3, CheckCircle
} from 'lucide-react'

const demoSteps = [
  {
    title: 'Bienvenue chez Graphisme by ELECTRON',
    description: 'Decouvrez notre plateforme digitale intelligente au Benin',
    category: 'intro'
  },
  {
    title: '1. Chat IA - Conversation avec les agents',
    description: 'Discutez avec nos agents IA : CEO, Commercial, Designer, Developpeur et bien plus...',
    category: 'chat'
  },
  {
    title: '2. Parametres Vocaux',
    description: 'Choisissez le genre et la qualite de la voix pour les reponses vocales',
    category: 'voice'
  },
  {
    title: '3. Admin - Tableau de bord',
    description: 'Gestion complete : Projets, Factures, Support, Parametres...',
    category: 'admin'
  },
  {
    title: '4. Admin - Projets',
    description: 'Creez, modifiez et suivez vos projets en temps reel',
    category: 'projects'
  },
  {
    title: '5. Admin - Factures',
    description: 'Gestion des factures avec suivi des paiements',
    category: 'invoices'
  },
  {
    title: '6. Admin - Support',
    description: 'Systeme de tickets pour le support client',
    category: 'support'
  },
  {
    title: '7. Admin - Parametres',
    description: 'Configurez votre profil et la securite',
    category: 'settings'
  },
  {
    title: '8. Centre IA - Acces Reserve',
    description: 'Zone exclusive pour le fondateur avec la cle : ELECTRON2025',
    category: 'ai-agents'
  },
  {
    title: 'Finition - Design Moderne',
    description: 'Arriere-plan anime, effets visuels, interface responsive',
    category: 'design'
  }
]

const categoryIcons: Record<string, any> = {
  intro: Home,
  chat: MessageSquare,
  voice: Volume2,
  admin: BarChart3,
  projects: FileText,
  invoices: CreditCard,
  support: Users,
  settings: Settings,
  'ai-agents': Bot,
  design: Play
}

const categoryColors: Record<string, string> = {
  intro: 'from-gold to-yellow-500',
  chat: 'from-violet-IA to-purple-500',
  voice: 'from-electric to-cyan-500',
  admin: 'from-blue-500 to-indigo-500',
  projects: 'from-green-500 to-emerald-500',
  invoices: 'from-orange-500 to-red-500',
  support: 'from-pink-500 to-rose-500',
  settings: 'from-gray-500 to-slate-500',
  'ai-agents': 'from-gold to-yellow-500',
  design: 'from-violet-IA to-electric'
}

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const handleNext = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleAutoPlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Auto-advance
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < demoSteps.length - 1) return prev + 1
          return prev
        })
      }, 8000)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  const step = demoSteps[currentStep]
  const Icon = categoryIcons[step.category] || Play
  const colorClass = categoryColors[step.category] || 'from-gold to-yellow-500'

  return (
    <div className="min-h-screen bg-premium-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-premium-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Retour</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">
              Demonstration <span className="text-gold">Graphisme</span>
            </h1>
          </div>
          <Link href="/client/chat" className="glass-button text-sm">
            Aller au Chat IA
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-32">
        <div className="max-w-6xl mx-auto px-6">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Progression</span>
              <span className="text-gold text-sm">{currentStep + 1} / {demoSteps.length}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full bg-gradient-to-r ${colorClass}`}
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Video/Slide Area */}
          <div className="relative">
            {/* Simulated Video Content */}
            <div className="aspect-video bg-premium-dark rounded-2xl overflow-hidden relative border border-white/10">
              {/* Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-20`} />
              
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-32 h-32 bg-gold/10 rounded-full animate-pulse" />
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-electric/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              </div>

              {/* Content */}
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center p-8">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-4">{step.title}</h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">{step.description}</p>
                  </motion.div>
                </div>
              </div>

              {/* Video Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-center gap-4">
                  <button 
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-50"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleAutoPlay}
                    className="p-4 rounded-full bg-gold hover:bg-gold/80 text-black"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={currentStep === demoSteps.length - 1}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-50"
                  >
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {demoSteps.map((s, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentStep ? 'bg-gold w-8' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Features List with Links */}
          <div className="grid md:grid-cols-5 gap-4 mt-12">
            {[
              { step: demoSteps[1], href: '/client/chat', icon: MessageSquare },
              { step: demoSteps[3], href: '/admin', icon: BarChart3 },
              { step: demoSteps[4], href: '/admin?tab=projects', icon: FileText },
              { step: demoSteps[5], href: '/admin?tab=invoices', icon: CreditCard },
              { step: demoSteps[7], href: '/admin?tab=settings', icon: Settings },
            ].map((item, i) => {
              const CatIcon = item.icon
              return (
                <Link
                  key={i}
                  href={item.href}
                  className={`p-4 rounded-xl text-left transition-all ${
                    i === 0 ? 'bg-gold/20 border border-gold/30' : 'bg-white/5 border border-white/10 hover:border-white/20'
                  }`}
                >
                  <CatIcon className="w-6 h-6 text-gold mb-2" />
                  <p className="text-white text-sm font-medium">{item.step.title}</p>
                </Link>
              )
            })}
          </div>

          {/* Additional Quick Links */}
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <Link href="/client/chat" className="p-4 rounded-xl bg-violet-IA/20 border border-violet-IA/30 text-center hover:bg-violet-IA/30 transition-all">
              <MessageSquare className="w-6 h-6 text-violet-IA mx-auto mb-2" />
              <p className="text-white text-sm font-medium">Chat IA</p>
            </Link>
            <Link href="/admin/conversations" className="p-4 rounded-xl bg-blue-500/20 border border-blue-500/30 text-center hover:bg-blue-500/30 transition-all">
              <Bot className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-white text-sm font-medium">Conversations</p>
            </Link>
            <Link href="/admin" className="p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-center hover:bg-green-500/30 transition-all">
              <BarChart3 className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-white text-sm font-medium">Admin</p>
            </Link>
            <Link href="/shop" className="p-4 rounded-xl bg-orange-500/20 border border-orange-500/30 text-center hover:bg-orange-500/30 transition-all">
              <ShoppingCart className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <p className="text-white text-sm font-medium">Boutique</p>
            </Link>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-premium-black/90 backdrop-blur-xl border-t border-white/5 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {currentStep > 0 && (
              <button onClick={handlePrev} className="flex items-center gap-2 text-gray-400 hover:text-white">
                <ArrowLeft className="w-4 h-4" />
                Precedent
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-white font-medium">{step.title}</p>
              <p className="text-gray-400 text-sm">{step.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {currentStep < demoSteps.length - 1 ? (
              <button onClick={handleNext} className="glass-button flex items-center gap-2">
                Suivant
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            ) : (
              <Link href="/client/chat" className="glass-button flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Commencer l'experience
              </Link>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}
