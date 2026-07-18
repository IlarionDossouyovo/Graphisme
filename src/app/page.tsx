'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Palette, Code, Smartphone, Brain, Video, ShoppingCart, 
  TrendingUp, Search, MessageCircle, ChevronDown, Menu, X,
  CheckCircle, ArrowRight, Sparkles, Zap, Shield, Users,
  Mail, Phone, MapPin, ExternalLink, Download, Clock,
  Star, Award, Briefcase, Layers, Database, Cloud, Play
} from 'lucide-react'

// Logo Component
const Logo = () => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 animate-pulse"></div>
    <svg viewBox="0 0 100 100" className="w-16 h-16">
      {/* Outer ring */}
      <circle cx="50" cy="50" r="45" fill="none" stroke="url(#goldGradient)" strokeWidth="2" />
      {/* Inner ring */}
      <circle cx="50" cy="50" r="35" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" opacity="0.7" />
      {/* Pen/Feather */}
      <path 
        d="M35 65 L50 30 L65 65 M50 30 L50 55" 
        fill="none" 
        stroke="url(#goldGradient)" 
        strokeWidth="3" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Lightning bolt */}
      <path 
        d="M55 25 L45 40 L52 40 L47 55 L60 38 L53 38 Z" 
        fill="url(#goldGradient)"
      />
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

// Navigation Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Boutique', href: '/shop' },
    { name: 'Blog', href: '/blog' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Équipe IA', href: '/ai-team' },
    { name: 'Tarifs', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
    { name: 'Admin', href: '/admin' },
  ]

  const navItemsMobile = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Boutique', href: '/shop' },
    { name: 'Blog', href: '/blog' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Équipe IA', href: '/ai-team' },
    { name: 'Tarifs', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
    { name: 'Admin', href: '/admin' },
    { name: 'Rapport', href: '/client' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-premium-black/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <Logo />
            <div>
              <span className="text-xl font-bold gold-text">Graphisme</span>
              <span className="text-xs text-gray-400 block">by ELECTRON</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className="text-sm text-gray-300 hover:text-gold transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors">Connexion</Link>
            <Link href="/login" className="glass-button text-sm">
              Devis Gratuit
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden mt-4 pb-4"
          >
            {navItemsMobile.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-300 hover:text-gold transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex gap-4 mt-4">
              <Link href="/login" className="text-sm text-gray-300">Connexion</Link>
              <Link href="/login" className="glass-button text-sm">Devis Gratuit</Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

// Hero Section
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-IA/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gold-text">Graphisme</span>
            <br />
            <span className="text-white">by ELECTRON</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
            Là où la <span className="electric-text font-semibold">créativité</span> rencontre la <span className="violet-text font-semibold">technologie</span>
          </p>

          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            La première agence digitale intelligente fonctionnant avec une équipe d'Intelligences Artificielles collaboratives pour transformer vos projets en réalité.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="#services" className="glass-button text-lg glow-gold">
              <span className="flex items-center justify-center gap-2">
                Découvrir nos services <ArrowRight className="w-5 h-5" />
              </span>
            </a>
            <a href="/demo" className="px-8 py-4 rounded-xl font-semibold border border-gold/30 text-gold hover:bg-gold/10 transition-all flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Voir la démo
            </a>
            <a href="#contact" className="px-8 py-4 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Discuter avec notre IA
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '90%', label: 'Automatisation' },
              { number: '12+', label: 'Services' },
              { number: '24/7', label: 'Disponibilité' },
              { number: '100%', label: 'IA Powered' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="glass-card p-6"
              >
                <div className="text-3xl font-bold gold-text mb-1">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#services" className="text-gray-400 hover:text-gold transition-colors animate-bounce">
            <ChevronDown className="w-8 h-8" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// Services Section
const Services = () => {
  const [services, setServices] = useState([
    { icon: Palette, title: 'Design Graphique', desc: 'Logo Premium, Identité visuelle, Charte graphique, Carte de visite, Flyers, Packaging...', color: 'gold' },
    { icon: Code, title: 'Développement Web', desc: 'Site vitrine, Landing Page, E-commerce, ERP, CRM, SaaS, Dashboard...', color: 'electric' },
    { icon: Smartphone, title: 'Développement Mobile', desc: 'Android, iOS, Flutter, React Native, PWA...', color: 'violet' },
    { icon: Brain, title: 'Intelligence Artificielle', desc: 'Chatbots, Assistants IA, Agents IA, RAG, LLM, OCR, Vision AI...', color: 'gold' },
    { icon: Video, title: 'Production Vidéo', desc: 'Montage, Motion Design, Animation 2D/3D, Voix IA, Sous-titrage...', color: 'electric' },
    { icon: ShoppingCart, title: 'E-commerce', desc: 'Boutique en ligne, Marketplace, Paiement sécurisé, Gestion stocks...', color: 'violet' },
    { icon: TrendingUp, title: 'Marketing Digital', desc: 'Facebook Ads, Google Ads, SEO, Email Marketing, Growth Hacking...', color: 'gold' },
    { icon: Search, title: 'SEO / SEA', desc: 'Référencement naturel, Google Ads, Analytics, Audit SEO...', color: 'electric' },
    { icon: MessageCircle, title: 'Community Management', desc: 'Gestion des réseaux sociaux, Calendrier éditorial, Campagnes...', color: 'violet' },
    { icon: Cloud, title: 'Cloud & DevOps', desc: 'Docker, Kubernetes, CI/CD, Monitoring, Sauvegardes...', color: 'gold' },
    { icon: Database, title: 'Base de données', desc: 'PostgreSQL, Redis, Firebase, Migration, Optimisation...', color: 'electric' },
    { icon: Shield, title: 'Cybersécurité', desc: 'Pare-feu, Surveillance, Backups, Audit, Détection menaces...', color: 'violet' },
  ])

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-wider uppercase mb-4 block">Nos Services</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Une expertise <span className="gold-text">complète</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            De la conception à la réalisation, nous couvrons tous vos besoins digitaux avec des solutions innovantes propulsées par l'IA.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Link key={i} href={`/contact?service=${encodeURIComponent(service.title)}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 hover:border-gold/30 transition-all group cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  service.color === 'gold' ? 'bg-gold/10 text-gold' :
                  service.color === 'electric' ? 'bg-electric/10 text-electric' :
                  'bg-violet-IA/10 text-violet-IA'
                }`}>
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-gold transition-colors">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// AI Team Section
const AITeam = () => {
  const agents = [
    { name: 'Direction', role: 'Conseil strategique', icon: Briefcase, color: 'gold' },
    { name: 'Commercial', role: 'Devis et projets', icon: TrendingUp, color: 'electric' },
    { name: 'Marketing', role: 'Strategie marketing', icon: Search, color: 'violet' },
    { name: 'Designer', role: 'Design et creation', icon: Palette, color: 'gold' },
    { name: 'Technique', role: 'Developpement', icon: Code, color: 'electric' },
    { name: 'Video', role: 'Production video', icon: Video, color: 'violet' },
    { name: 'Community', role: 'Reseaux sociaux', icon: Users, color: 'gold' },
    { name: 'Finance', role: 'Devis et facturation', icon: Database, color: 'electric' },
    { name: 'Support', role: 'Assistance', icon: MessageCircle, color: 'violet' },
    { name: 'Infrastructure', role: 'Hebergement', icon: Cloud, color: 'gold' },
    { name: 'Securite', role: 'Protection', icon: Shield, color: 'electric' },
    { name: 'Data', role: 'Analyse de donnees', icon: Layers, color: 'violet' },
  ]

  return (
    <section id="ai-team" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-IA/5 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-violet-IA text-sm font-semibold tracking-wider uppercase mb-4 block">Notre Équipe IA</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Des agents <span className="violet-text">intelligents</span> à votre service
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            12 agents IA travaillent en synergie pour automatiser et optimiser chaque aspect de votre projet.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {agents.map((agent, i) => (
            <Link key={i} href="/ai-team">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-6 text-center hover:border-violet-IA/30 transition-all group cursor-pointer"
              >
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                  agent.color === 'gold' ? 'bg-gold/10' :
                  agent.color === 'electric' ? 'bg-electric/10' :
                  'bg-violet-IA/10'
                }`}>
                  <agent.icon className={`w-8 h-8 ${
                    agent.color === 'gold' ? 'text-gold' :
                    agent.color === 'electric' ? 'text-electric' :
                    'text-violet-IA'
                  }`} />
                </div>
                <h3 className="font-bold text-white mb-1 group-hover:text-violet-IA transition-colors">{agent.name}</h3>
                <p className="text-xs text-gray-400">{agent.role}</p>
                <div className={`mt-4 w-2 h-2 mx-auto rounded-full ${
                  agent.color === 'gold' ? 'bg-gold' :
                  agent.color === 'electric' ? 'bg-electric' :
                  'bg-violet-IA'
                } animate-pulse`}></div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// Portfolio Section
const Portfolio = () => {
  const [projects, setProjects] = useState([
    { title: 'Logo Premium', category: 'Design', image: '🎨' },
    { title: 'Site E-commerce', category: 'Développement', image: '🛒' },
    { title: 'Application Mobile', category: 'Mobile', image: '📱' },
    { title: 'Branding Complete', category: 'Identité', image: '✨' },
    { title: 'Video Marketing', category: 'Vidéo', image: '🎬' },
    { title: 'Dashboard ERP', category: 'SaaS', image: '📊' },
  ])

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const response = await fetch('/api/portfolio')
        if (response.ok) {
          const data = await response.json()
          if (data.length > 0) {
            setProjects(data.slice(0, 6).map((p: any) => ({
              title: p.title,
              category: p.category,
              image: p.image
            })))
          }
        }
      } catch (error) {
        console.error('Error loading portfolio:', error)
      }
    }
    loadPortfolio()
  }, [])

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-electric text-sm font-semibold tracking-wider uppercase mb-4 block">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nos <span className="electric-text">réalisations</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Découvrez nos projets récents et laissez-vous inspirer par la qualité de notre travail.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <Link key={i} href="/portfolio">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card overflow-hidden group cursor-pointer"
              >
                <div className="h-64 bg-gradient-to-br from-premium-card to-premium-dark flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500">
                  {project.image}
                </div>
                <div className="p-6">
                  <span className="text-xs text-electric uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-xl font-bold text-white mt-2 group-hover:text-electric transition-colors">{project.title}</h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors">
            Voir tous nos projets <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// Pricing Section
const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '49',
      period: 'mois',
      desc: 'Idéal pour les petits projets',
      features: [
        'Logo Basic',
        'Carte de visite',
        '1 design réseaux sociaux',
        'Support par email',
        'Livraison en 48h',
      ],
      featured: false,
    },
    {
      name: 'Premium',
      price: '149',
      period: 'mois',
      desc: 'Le plus populaire',
      features: [
        'Logo Premium',
        'Identité visuelle complète',
        '5 designs réseaux sociaux',
        'Site vitrine (1 page)',
        'Support prioritaire',
        'Livraison en 24h',
        'Révisions illimitées',
      ],
      featured: true,
    },
    {
      name: 'Enterprise',
      price: '349',
      period: 'mois',
      desc: 'Pour les grandes entreprises',
      features: [
        'Logo Premium + Animation',
        'Charte graphique complète',
        '10 designs réseaux sociaux',
        'Site e-commerce',
        'App mobile basic',
        'Support 24/7',
        'Chef de projet dédié',
        'Maintenance incluse',
      ],
      featured: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-wider uppercase mb-4 block">Tarifs</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Des prix <span className="gold-text">transparents</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choisissez le pack qui correspond le mieux à vos besoins. Tous les prix sont mensuels.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-8 relative ${plan.featured ? 'border-gold/50 glow-gold' : ''}`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-black text-xs font-bold rounded-full">
                  POPULAIRE
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold gold-text">€{plan.price}</span>
                <span className="text-gray-400">/{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`block text-center py-3 rounded-xl font-semibold transition-all ${
                plan.featured 
                  ? 'bg-gold text-black hover:bg-gold-light' 
                  : 'border border-gold/30 text-gold hover:bg-gold/10'
              }`}>
                Choisir ce pack
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section
const Contact = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi du message')
      }

      setStatus('success')
      setFormData({ name: '', email: '', service: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error: any) {
      setStatus('error')
      setErrorMessage(error.message || 'Une erreur est survenue')
    }
  }

  const contactInfo = [
    { icon: Phone, label: 'Téléphone', value: '+229 01 97 70 03 47' },
    { icon: Mail, label: 'Email', value: 'electronbusiness07@gmail.com' },
    { icon: MapPin, label: 'Adresse', value: 'Cotonou, Benin' },
  ]

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-wider uppercase mb-4 block">Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Parlons de votre <span className="gold-text">projet</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Prêt à transformer votre vision en réalité ?Contactez-nous dès maintenant.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-white mb-8">Nos coordonnées</h3>
              <div className="space-y-6">
                {contactInfo.map((info, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                      <info.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{info.label}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="text-lg font-semibold text-white mb-4">Horaires d'ouverture</h4>
                <p className="text-gray-400">24h/24 - 7j/7</p>
                <p className="text-sm text-gray-500 mt-2">Nos agents IA sont disponibles en permanence</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-white mb-8">Envoyez-nous un message</h3>
              
              {status === 'success' && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400">
                  Message envoyé avec succès ! Nous vous répondrons rapidement.
                </div>
              )}
              
              {status === 'error' && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400">
                  {errorMessage}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Nom</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none transition-colors" 
                      placeholder="Votre nom" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none transition-colors" 
                      placeholder="votre@email.com" 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Service souhaité</label>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none transition-colors"
                  >
                    <option value="">Sélectionner un service</option>
                    <option>Design Graphique</option>
                    <option>Développement Web</option>
                    <option>Développement Mobile</option>
                    <option>Marketing Digital</option>
                    <option>Intelligence Artificielle</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Message</label>
                  <textarea 
                    rows={4} 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none transition-colors resize-none" 
                    placeholder="Décrivez votre projet..." 
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full glass-button glow-gold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le message'}
                  </span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => {
  const footerLinks = {
    Services: ['Design Graphique', 'Développement Web', 'Marketing Digital', 'IA & Automatisation'],
    Espace: [
      { name: 'Admin', href: '/admin' },
      { name: 'Rapport Client', href: '/client' },
      { name: 'Centre IA', href: '/admin/ai-agents' },
    ],
    Entreprise: ['À propos', 'Carrières', 'Blog', 'Contact'],
    Legal: ['Mentions légales', 'CGV', 'Politique de confidentialité'],
  }

  return (
    <footer className="bg-premium-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <Logo />
              <div>
                <span className="text-xl font-bold gold-text">Graphisme</span>
                <span className="text-xs text-gray-400 block">by ELECTRON</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Première agence digitale intelligente du Benin avec une équipe de 12 agents IA pour transformer vos projets en réalité.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/electron" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-gold hover:bg-gold/10 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com/electron" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-gold hover:bg-gold/10 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {Array.isArray(links) && links.map((link: any, i: number) => (
                  <li key={i}>
                    {typeof link === 'object' && link.href ? (
                      <Link href={link.href} className="text-gray-400 hover:text-gold transition-colors text-sm">
                        {link.name}
                      </Link>
                    ) : (
                      <span className="text-gray-400 text-sm">{link}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 Graphisme by ELECTRON. Tous droits réservés.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-2">
            Fait avec <span className="text-gold">❤</span> et l'IA
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main Page Component
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <AITeam />
      <Portfolio />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  )
}
