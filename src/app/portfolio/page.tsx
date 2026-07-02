'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, Figma, Palette, Code, Smartphone, Brain, Video, ShoppingCart } from 'lucide-react'

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

const portfolioItems = [
  {
    id: 1,
    title: 'TechCorp E-commerce',
    category: 'E-commerce',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    description: 'Plateforme e-commerce complète avec paiement sécurisé',
    tags: ['Next.js', 'Stripe', 'Tailwind'],
    icon: ShoppingCart,
  },
  {
    id: 2,
    title: 'AfriTech Logo',
    category: 'Design Graphique',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop',
    description: 'Identité visuelle complète pour startup technologique',
    tags: ['Logo', 'Brand', 'Figma'],
    icon: Palette,
  },
  {
    id: 3,
    title: 'Finance Dashboard',
    category: 'Développement Web',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    description: 'Dashboard analytics pour gestion financière',
    tags: ['React', 'D3.js', 'API'],
    icon: Code,
  },
  {
    id: 4,
    title: 'HealthApp Mobile',
    category: 'Développement Mobile',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    description: 'Application mobile de suivi santé',
    tags: ['React Native', 'Firebase', 'Health API'],
    icon: Smartphone,
  },
  {
    id: 5,
    title: 'AI Chatbot',
    category: 'Intelligence Artificielle',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    description: 'Assistant virtuel propulsé par LLM',
    tags: ['LLM', 'RAG', 'Vector DB'],
    icon: Brain,
  },
  {
    id: 6,
    title: 'Brand Video',
    category: 'Production Vidéo',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop',
    description: 'Vidéo corporate avec motion design',
    tags: ['After Effects', 'Motion', '3D'],
    icon: Video,
  },
]

const categories = ['Tous', 'Design Graphique', 'Développement Web', 'Développement Mobile', 'E-commerce', 'Intelligence Artificielle', 'Production Vidéo']

export default function PortfolioPage() {
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
              Notre <span className="gold-text">Portfolio</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Découvrez nos réalisations récentes. Chaque projet est une opportunité de créer quelque chose d'unique et d'impactant.
            </p>
          </motion.div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  index === 0
                    ? 'bg-gold text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group glass-card overflow-hidden hover:border-gold/30 transition-all"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-premium-black to-transparent z-10" />
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 bg-gold/20 backdrop-blur-sm rounded-full text-xs text-gold">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="flex items-center gap-2 text-gold text-sm hover:text-gold-light transition-colors">
                    Voir le projet <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 text-center glass-card p-12 bg-gradient-to-r from-gold/10 to-violet-IA/10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Vous avez un projet en tête ?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Discutons de votre prochain projet. Notre équipe IA est prête à transformer votre vision en réalité.
            </p>
            <Link href="/contact" className="glass-button glow-gold inline-flex">
              Démarrer un projet
            </Link>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-premium-dark border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Graphisme by ELECTRON. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}
