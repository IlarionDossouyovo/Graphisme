'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, Sparkles, CheckCircle } from 'lucide-react'

// Loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen bg-premium-black flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-400">Chargement...</p>
    </div>
  </div>
)

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
  'Design Graphique',
  'Développement Web',
  'Développement Mobile',
  'Intelligence Artificielle',
  'Production Vidéo',
  'E-commerce',
  'Marketing Digital',
  'SEO / SEA',
  'Community Management',
  'Cloud & DevOps',
  'Base de données',
  'Cybersécurité',
  'Autre'
]

export default function ContactPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ContactContent />
    </Suspense>
  )
}

function ContactContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Récupérer le service depuis l'URL
  useEffect(() => {
    const serviceParam = searchParams.get('service')
    if (serviceParam) {
      // Décoder le paramètre URL
      const decodedService = decodeURIComponent(serviceParam)
      setFormData(prev => ({ ...prev, service: decodedService }))
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        })
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    { icon: Phone, label: 'Téléphone', value: '+229 01 97 70 03 47' },
    { icon: Mail, label: 'Email', value: 'electronbusiness07@gmail.com' },
    { icon: MapPin, label: 'Adresse', value: 'Cotonou, Benin' },
    { icon: Clock, label: 'Disponibilité', value: '24h/24 - 7j/7' },
  ]

  return (
    <div className="min-h-screen bg-premium-black">
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
              Nous <span className="gold-text">Contacter</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Une question, un projet ou simplement besoin de conseils ? 
              Notre équipe IA est disponible 24/7 pour vous répondre.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="glass-card p-8 mb-8">
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
              </div>

              <div className="glass-card p-8 bg-gradient-to-r from-violet-IA/10 to-electric/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-IA/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-violet-IA" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Assistant IA</h4>
                    <p className="text-gray-400 text-sm">Réponse instantanée</p>
                  </div>
                </div>
                <p className="text-gray-400">
                  Notre intelligence artificielle analyse votre demande et vous répond immédiatement. 
                  Pour les cas complexes, un membre de notre équipe prendra le relais sous 24h.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="glass-card p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Message envoyé !</h3>
                    <p className="text-gray-400 mb-8">
                      Merci pour votre message. Notre IA va analyser votre demande et vous répondre rapidement.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-gold hover:text-gold-light transition-colors"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-white mb-8">Envoyez-nous un message</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Nom complet *</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none transition-colors"
                            placeholder="Votre nom"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Email *</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none transition-colors"
                            placeholder="votre@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Téléphone</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none transition-colors"
                            placeholder="+229 XX XXX XX XX"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Entreprise</label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none transition-colors"
                            placeholder="Nom de votre entreprise"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Service desired</label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({...formData, service: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl text-white focus:border-gold/50 focus:outline-none transition-colors"
                          style={{ 
                            backgroundColor: '#0f172a !important',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#ffffff'
                          }}
                        >
                          <option value="" style={{ backgroundColor: '#1e293b', color: '#94a3b8' }}>Sélectionnez un service</option>
                          {services.map((service) => (
                            <option key={service} value={service} style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>{service}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Message *</label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          required
                          rows={5}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none transition-colors resize-none"
                          placeholder="Décrivez votre projet ou posez vos questions..."
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full glass-button glow-gold py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>Traitement en cours...</>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              Envoyer le message
                            </>
                          )}
                        </span>
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gold" />
                Notre localisation
              </h3>
              <div className="aspect-video rounded-xl overflow-hidden bg-white/5">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.5!2d2.39!3d6.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjInMDAuMCJOwrAyNScwMC4wIkU!5e0!3m2!1sfr!2sbj!4v1600000000000!5m2!1sfr!2sbj"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation ELECTRON"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>Cotonou, Benin</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Phone className="w-4 h-4 text-gold" />
                  <span>+229 01 97 70 03 47</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail className="w-4 h-4 text-gold" />
                  <span>electronbusiness07@gmail.com</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

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
