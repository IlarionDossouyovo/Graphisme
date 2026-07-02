'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Palette, Code, Smartphone, Brain, Video, ShoppingCart, 
  TrendingUp, Search, MessageCircle, ChevronDown, Menu, X,
  CheckCircle, ArrowRight, Sparkles, Zap, Shield, Users,
  Mail, Phone, MapPin, ExternalLink, Download, Clock,
  Star, Award, Briefcase, Layers, Database, Cloud
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
    { name: 'Accueil', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Équipe IA', href: '#ai-team' },
    { name: 'Tarifs', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-premium-black/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-4">
            <Logo />
            <div>
              <span className="text-xl font-bold gold-text">E-Graphisme</span>
              <span className="text-xs text-gray-400 block">by ELECTRON</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                className="text-sm text-gray-300 hover:text-gold transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="#login" className="text-sm text-gray-300 hover:text-white transition-colors">Connexion</a>
            <a href="#devis" className="glass-button text-sm">
              Devis Gratuit
            </a>
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
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-300 hover:text-gold transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex gap-4 mt-4">
              <a href="#login" className="text-sm text-gray-300">Connexion</a>
              <a href="#devis" className="glass-button text-sm">Devis Gratuit</a>
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
            <span className="gold-text">E-Graphisme</span>
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
  const services = [
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
  ]

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
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 hover:border-gold/30 transition-all group"
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
          ))}
        </div>
      </div>
    </section>
  )
}

// AI Team Section
const AITeam = () => {
  const agents = [
    { name: 'CEO AI', role: 'Supervision & Décisions', icon: Briefcase, color: 'gold' },
    { name: 'Commercial AI', role: 'CRM & Prospection', icon: TrendingUp, color: 'electric' },
    { name: 'Marketing AI', role: 'SEO & Campagnes', icon: Search, color: 'violet' },
    { name: 'Designer AI', role: 'Création Graphique', icon: Palette, color: 'gold' },
    { name: 'Developer AI', role: 'Frontend & Backend', icon: Code, color: 'electric' },
    { name: 'Motion AI', role: 'Vidéo & Animation', icon: Video, color: 'violet' },
    { name: 'Community Manager AI', role: 'Réseaux Sociaux', icon: Users, color: 'gold' },
    { name: 'Finance AI', role: 'Facturation & Comptabilité', icon: Database, color: 'electric' },
    { name: 'Support AI', role: 'Assistance & Tickets', icon: MessageCircle, color: 'violet' },
    { name: 'DevOps AI', role: 'Infrastructure & CI/CD', icon: Cloud, color: 'gold' },
    { name: 'CyberSecurity AI', role: 'Sécurité & Audit', icon: Shield, color: 'electric' },
    { name: 'Data Analyst AI', role: 'BI & Prévisions', icon: Layers, color: 'violet' },
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
            <motion.div
              key={i}
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
          ))}
        </div>
      </div>
    </section>
  )
}

// Portfolio Section
const Portfolio = () => {
  const projects = [
    { title: 'Logo Premium', category: 'Design', image: '🎨' },
    { title: 'Site E-commerce', category: 'Développement', image: '🛒' },
    { title: 'Application Mobile', category: 'Mobile', image: '📱' },
    { title: 'Branding Complete', category: 'Identité', image: '✨' },
    { title: 'Video Marketing', category: 'Vidéo', image: '🎬' },
    { title: 'Dashboard ERP', category: 'SaaS', image: '📊' },
  ]

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
            <motion.div
              key={i}
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
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#contact" className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors">
            Voir tous nos projets <ArrowRight className="w-4 h-4" />
          </a>
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
  const contactInfo = [
    { icon: Phone, label: 'Téléphone', value: '+229 01 97 70 03 47' },
    { icon: Phone, label: 'Téléphone', value: '+229 01 49 80 22 02' },
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
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Nom</label>
                    <input type="text" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none transition-colors" placeholder="Votre nom" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input type="email" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none transition-colors" placeholder="votre@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Service desired</label>
                  <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none transition-colors">
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
                  <textarea rows={4} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none transition-colors resize-none" placeholder="Décrivez votre projet..."></textarea>
                </div>
                <button type="submit" className="w-full glass-button glow-gold">
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Envoyer le message
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
                <span className="text-xl font-bold gold-text">E-Graphisme</span>
                <span className="text-xs text-gray-400 block">by ELECTRON</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              La première agence digitale intelligente fonctionnant avec une équipe d'Intelligences Artificielles collaboratives.
            </p>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'linkedin', 'twitter'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-gold hover:bg-gold/10 transition-all">
                  <span className="text-xs font-bold uppercase">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-gold transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 E-Graphisme by ELECTRON. Tous droits réservés.
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
