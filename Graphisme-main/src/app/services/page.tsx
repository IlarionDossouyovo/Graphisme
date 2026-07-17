'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Palette, Code, Smartphone, Brain, Video, ShoppingCart, 
  TrendingUp, Search, MessageCircle, Sparkles, ArrowLeft, Shield, Database
} from 'lucide-react'

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

const services = [
  { 
    icon: Palette, 
    title: 'Design Graphique', 
    description: 'Logo Premium, Identité visuelle, Charte graphique, Carte de visite, Flyers, Packaging...',
    features: ['Logo & Identité de marque', 'Charte graphique complète', 'Print Design', 'UI/UX Design', 'Packaging'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop'
  },
  { 
    icon: Code, 
    title: 'Développement Web', 
    description: 'Site vitrine, Landing Page, E-commerce, ERP, CRM, SaaS, Dashboard...',
    features: ['Sites vitrines professionnels', 'Applications web sur mesure', 'E-commerce & Boutique en ligne', 'Dashboards Analytics', 'API & Intégrations'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop'
  },
  { 
    icon: Smartphone, 
    title: 'Développement Mobile', 
    description: 'Android, iOS, Flutter, React Native, PWA...',
    features: ['Applications iOS & Android', 'PWA Progressive Web App', 'Flutter & React Native', 'Maintenance & Mise à jour', 'Publication App Store'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop'
  },
  { 
    icon: Brain, 
    title: 'Intelligence Artificielle', 
    description: 'Chatbots, Assistants IA, Agents IA, RAG, LLM, OCR, Vision AI...',
    features: ['Chatbots intelligents', 'Agents IA automatisés', 'Intégration LLM', 'OCR & Reconnaissance', 'Vision par ordinateur'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop'
  },
  { 
    icon: Video, 
    title: 'Production Vidéo', 
    description: 'Montage, Motion Design, Animation 2D/3D, Voix IA, Sous-titrage...',
    features: ['Vidéos corporatives', 'Motion Design', 'Animation 2D/3D', 'Voix IA & Sous-titrage', 'Montage vidéo'],
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=400&fit=crop'
  },
  { 
    icon: ShoppingCart, 
    title: 'E-commerce', 
    description: 'Boutique en ligne, Marketplace, Paiement sécurisé, Gestion stocks...',
    features: ['Boutiques Shopify/WooCommerce', 'Paiements sécurisés Stripe', 'Gestion des stocks', 'Marketplace intégration', 'SEO E-commerce'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop'
  },
  { 
    icon: TrendingUp, 
    title: 'Marketing Digital', 
    description: 'Facebook Ads, Google Ads, SEO, Email Marketing, Growth Hacking...',
    features: ['Publicités Facebook/Instagram', 'Google Ads & Display', 'Email Marketing', 'Stratégie de croissance', 'Analytics & Reporting'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop'
  },
  { 
    icon: Search, 
    title: 'SEO / SEA', 
    description: 'Référencement naturel, Google Ads, Analytics, Audit SEO...',
    features: ['Audit SEO complet', 'Optimisation On-Page', ' backlinks & Off-Page', 'Google Ads management', 'Suivi Analytics'],
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=400&fit=crop'
  },
  { 
    icon: MessageCircle, 
    title: 'Community Management', 
    description: 'Gestion des réseaux sociaux, Calendrier éditorial, Campagnes...',
    features: ['Gestion Facebook/Instagram', 'Contenu LinkedIn', 'Calendrier éditorial', 'Création de contenu', 'Rapports mensuels'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop'
  },
  { 
    icon: Sparkles, 
    title: 'Cloud & DevOps', 
    description: 'Docker, Kubernetes, CI/CD, Monitoring, Sauvegardes...',
    features: ['Infrastructure AWS/Azure', 'Docker & Kubernetes', 'CI/CD Pipeline', 'Monitoring 24/7', 'Sauvegardes automatisées'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop'
  },
  { 
    icon: Database, 
    title: 'Base de données', 
    description: 'PostgreSQL, Redis, Firebase, Migration, Optimisation...',
    features: ['Design de schéma', 'PostgreSQL & MySQL', 'Firebase & NoSQL', 'Migration de données', 'Optimisation performance'],
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop'
  },
  { 
    icon: Shield, 
    title: 'Cybersécurité', 
    description: 'Pare-feu, Surveillance, Backups, Audit, Détection menaces...',
    features: ['Audit de sécurité', 'Pare-feu & Protection', 'Surveillance continue', 'Sauvegardes sécurisées', 'Formation équipes'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop'
  },
]

export default function ServicesPage() {
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
              Nos <span className="gold-text">Services</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Une expertise complète. De la conception à la réalisation, nous couvrons tous vos besoins digitaux avec des solutions innovantes propulsées par l'IA.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link href={`/contact?service=${encodeURIComponent(service.title)}`} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card overflow-hidden hover:border-gold/30 transition-all cursor-pointer h-full group"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-premium-black to-transparent z-10" />
                    <div 
                      className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${service.image})` }}
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {service.features.slice(0, 3).map((feature, i) => (
                        <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">
                          {feature}
                        </span>
                      ))}
                      {service.features.length > 3 && (
                        <span className="px-2 py-1 bg-gold/10 rounded text-xs text-gold">
                          +{service.features.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
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
    </div>
  )
}
