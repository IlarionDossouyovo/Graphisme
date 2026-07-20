'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Eye, Target, Users, Award, Clock, Zap, Shield, 
  Globe, MapPin, Mail, Phone, ChevronRight,
  Star, Quote, Sparkles, Brain, Rocket, Heart
} from 'lucide-react'

// Logo Component
const Logo = () => (
  <div className="relative w-16 h-16 flex items-center justify-center">
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 animate-pulse"></div>
    <svg viewBox="0 0 100 100" className="w-12 h-12">
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

// Navbar
const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-premium-black/90 backdrop-blur-xl border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <Logo />
          <div>
            <span className="text-xl font-bold gold-text">Graphisme</span>
            <span className="text-xs text-gray-400 block">by ELECTRON</span>
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className="text-sm text-gray-300 hover:text-gold transition-colors">Accueil</Link>
          <Link href="/about" className="text-sm text-gold transition-colors">À propos</Link>
          <Link href="/services" className="text-sm text-gray-300 hover:text-gold transition-colors">Services</Link>
          <Link href="/portfolio" className="text-sm text-gray-300 hover:text-gold transition-colors">Portfolio</Link>
          <Link href="/contact" className="text-sm text-gray-300 hover:text-gold transition-colors">Contact</Link>
        </div>
        <Link href="/login" className="glass-button text-sm">Connexion</Link>
      </div>
    </div>
  </nav>
)

// Stats Component
const Stats = () => {
  const stats = [
    { label: 'Projets réalisés', value: '500+', icon: Rocket },
    { label: 'Clients satisfaits', value: '200+', icon: Users },
    { label: 'Années d\'expérience', value: '5+', icon: Clock },
    { label: 'Prix & Récompenses', value: '15+', icon: Award },
  ]

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-premium rounded-2xl p-6 text-center card-premium-hover"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-gold" />
              <div className="text-3xl font-bold gold-text mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Values Component
const Values = () => {
  const values = [
    {
      icon: Brain,
      title: 'Innovation IA',
      description: 'Intelligence artificielle de pointe pour des solutions créatives et performantes.'
    },
    {
      icon: Shield,
      title: 'Excellence',
      description: 'Engagement envers la qualité premium dans chaque projet que nous délivrons.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Passion pour la création et le design qui transparaît dans chaque réalisation.'
    },
    {
      icon: Globe,
      title: 'Accessibilité',
      description: 'Solutions digitales accessibles à tous, partout dans le monde.'
    }
  ]

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="gold-text">Nos Valeurs</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Les principes qui guident chacune de nos actions et décisions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-premium rounded-2xl p-6 text-center card-premium-hover"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                <value.icon className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{value.title}</h3>
              <p className="text-gray-400 text-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Timeline Component
const Timeline = () => {
  const milestones = [
    { year: '2021', title: 'Fondation', description: 'Création de Graphisme by ELECTRON' },
    { year: '2022', title: 'Expansion', description: 'Lancement des services de développement web' },
    { year: '2023', title: 'Innovation', description: 'Intégration de l\'IA dans nos services' },
    { year: '2024', title: 'Croissance', description: '200+ clients satisfaits' },
    { year: '2025', title: 'Leadership', description: 'Meilleure agence digitale au Benin' },
    { year: '2026', title: 'Excellence', description: 'Plateforme Enterprise AI Studio' },
  ]

  return (
    <section className="py-20 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="gold-text">Notre Parcours</span>
          </h2>
          <p className="text-gray-400">Les étapes clés de notre réussite</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-transparent via-gold/50 to-transparent"></div>
          
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <div className="glass-premium rounded-xl p-4 card-premium-hover">
                  <div className="text-gold font-bold text-lg mb-1">{milestone.year}</div>
                  <h3 className="text-white font-semibold mb-1">{milestone.title}</h3>
                  <p className="text-gray-400 text-sm">{milestone.description}</p>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gold shadow-glow-gold"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials
const Testimonials = () => {
  const testimonials = [
    {
      name: 'Marie Dupont',
      role: 'CEO, TechCorp',
      quote: 'Une équipe exceptionnelle qui a transformé notre vision en réalité. Le résultat dépasse nos attentes.',
      rating: 5
    },
    {
      name: 'Jean Kouassi',
      role: 'Directeur Marketing, AfricaBiz',
      quote: 'Professionalisme et créativité au rendez-vous. Je recommande fortement leurs services.',
      rating: 5
    },
    {
      name: 'Sarah Benali',
      role: 'Fondatrice, DesignLab',
      quote: 'Graphisme by ELECTRON a créé une identité visuelle parfaite pour notre marque.',
      rating: 5
    }
  ]

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="gold-text">Témoignages</span>
          </h2>
          <p className="text-gray-400">Ce que nos clients disent de nous</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-premium rounded-2xl p-6 card-premium-hover"
            >
              <Quote className="w-10 h-10 text-gold/30 mb-4" />
              <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold font-bold">{testimonial.name[0]}</span>
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
              <div className="flex gap-1 mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
const CTA = () => (
  <section className="py-20 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-violet-IA/10"></div>
    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-6">
          <span className="text-white">Prêt à transformer votre </span>
          <span className="gold-text">projet</span>
          <span className="text-white"> ?</span>
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Discutons de votre projet et découvrons comment nous pouvons vous aider à atteindre vos objectifs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn-premium">
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Démarrer un projet
            </span>
          </Link>
          <Link href="/portfolio" className="btn-premium-outline">
            Voir notre portfolio
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
)

// Footer
const Footer = () => (
  <footer className="bg-premium-dark border-t border-white/5 py-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <Logo />
            <div>
              <span className="text-xl font-bold gold-text">Graphisme</span>
              <span className="text-xs text-gray-400 block">by ELECTRON</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            La première agence digitale intelligente du Benin avec une équipe de 12 agents IA.
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
        
        <div>
          <h4 className="text-white font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/services" className="hover:text-gold transition-colors">Design Graphique</a></li>
            <li><a href="/services" className="hover:text-gold transition-colors">Développement Web</a></li>
            <li><a href="/services" className="hover:text-gold transition-colors">Marketing Digital</a></li>
            <li><a href="/services" className="hover:text-gold transition-colors">IA & Automatisation</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Entreprise</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/about" className="hover:text-gold transition-colors">À propos</a></li>
            <li><a href="/portfolio" className="hover:text-gold transition-colors">Portfolio</a></li>
            <li><a href="/blog" className="hover:text-gold transition-colors">Blog</a></li>
            <li><a href="/contact" className="hover:text-gold transition-colors">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold" />
              Cotonou, Benin
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold" />
              +229 01 97 70 03 47
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gold" />
              electronbusiness07@gmail.com
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">
          © 2026 Graphisme by ELECTRON. Tous droits réservés.
        </p>
        <p className="text-gray-500 text-sm flex items-center gap-2">
          Fait avec <span className="text-gold">❤</span> et l'IA
        </p>
      </div>
    </div>
  </footer>
)

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-premium-black">
      <Navbar />
      <div className="pt-24">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-IA/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="gold-text">À Propos</span>
                <br />
                <span className="text-white">de Nous</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Nous sommes la première agence digitale intelligente du Benin, 
                combinant créativité humaine et puissance de l'intelligence artificielle.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-premium rounded-2xl p-8"
              >
                <Eye className="w-12 h-12 text-gold mb-6" />
                <h2 className="text-2xl font-bold mb-4 text-white">Notre Vision</h2>
                <p className="text-gray-400">
                  Devenir le leader de la transformation digitale en Afrique, 
                  en democratisant l'acces aux technologies de pointe et en 
                  redefinissant les standards de l'excellence créative grace a l'IA.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-premium rounded-2xl p-8"
              >
                <Target className="w-12 h-12 text-gold mb-6" />
                <h2 className="text-2xl font-bold mb-4 text-white">Notre Mission</h2>
                <p className="text-gray-400">
                  Offrir des solutions digitales premium qui depassent les attentes 
                  de nos clients, en combinant innovation technologique, kreativite 
                  et intelligence artificielle pour des resultats exceptionnels.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <Stats />
        <Values />
        <Timeline />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </main>
  )
}
