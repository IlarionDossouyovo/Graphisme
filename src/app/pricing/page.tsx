'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Check, Sparkles, Zap, Crown, Building2 } from 'lucide-react'

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

const plans = [
  {
    name: 'Starter',
    description: 'Parfait pour les petites entreprises',
    price: '29,900',
    period: 'FCFA/mois',
    icon: Zap,
    color: 'electric',
    features: [
      'Site web vitrine',
      'Design graphique basique',
      '5 créations mensuelles',
      'Support par email',
      'Hébergement inclus',
      'Certificat SSL',
    ],
    notIncluded: [
      'E-commerce',
      'App mobile',
      'SEO avancé',
      'API personnalisée',
    ],
    cta: 'Commencer',
    popular: false,
  },
  {
    name: 'Professionnel',
    description: 'Pour les entreprises en croissance',
    price: '79,900',
    period: 'FCFA/mois',
    icon: Crown,
    color: 'gold',
    features: [
      'Site web complet',
      'E-commerce basique',
      'Design graphique illimité',
      'SEO & Marketing',
      'Support prioritaire',
      'API personnalisée',
      'Analytics avancés',
      'Formation incluse',
    ],
    notIncluded: [
      'App mobile native',
      'Développement sur mesure',
    ],
    cta: 'Commencer',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'Solution complète pour les grandes entreprises',
    price: 'Sur devis',
    period: '',
    icon: Building2,
    color: 'violet',
    features: [
      'Tout inclus',
      'Applications mobiles',
      'Développement sur mesure',
      'IA personnalisée',
      'Manager de compte dédié',
      'Support 24/7',
      'Formation complète',
      'Maintenanceprioritaire',
      'CI/CD & DevOps',
      'Audit de sécurité',
    ],
    notIncluded: [],
    cta: 'Contactez-nous',
    popular: false,
  },
]

const services = [
  { name: 'Logo Premium', price: '25,000 - 150,000', description: 'Création de logo avec identité visuelle complète' },
  { name: 'Site Vitrine', price: '150,000 - 500,000', description: 'Site web professionnel avec design personnalisé' },
  { name: 'E-commerce', price: '350,000 - 1,500,000', description: 'Boutique en ligne avec paiement sécurisé' },
  { name: 'Application Mobile', price: '500,000 - 3,000,000', description: 'App iOS et Android native ou cross-platform' },
  { name: 'SEO & Marketing', price: '50,000 - 200,000', description: 'Référencement et campagnes publicitaires' },
  { name: 'Chatbot IA', price: '100,000 - 500,000', description: 'Assistant virtuel propulsé par LLM' },
]

export default function PricingPage() {
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
              Nos <span className="gold-text">Tarifs</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Des tarifs transparents et adaptés à tous les budgets. 
              Choisissez la formule qui correspond le mieux à vos besoins.
            </p>
          </motion.div>

          {/* Plans */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative glass-card p-8 ${
                  plan.popular ? 'border-gold/50 glow-gold' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-gold text-black text-sm font-bold rounded-full">
                      Plus populaire
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                    plan.color === 'gold' ? 'bg-gold/10' :
                    plan.color === 'electric' ? 'bg-electric/10' :
                    'bg-violet-IA/10'
                  }`}>
                    <plan.icon className={`w-8 h-8 ${
                      plan.color === 'gold' ? 'text-gold' :
                      plan.color === 'electric' ? 'text-electric' :
                      'text-violet-IA'
                    }`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-gray-400 ml-2">{plan.period}</span>}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 opacity-40">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-400 text-sm line-through">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/contact"
                  className={`block text-center py-4 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gold text-black hover:bg-gold-light'
                      : 'border border-white/20 text-white hover:bg-white/5'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Services */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Services <span className="gold-text">à la carte</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Besoin d'un service spécifique ? Découvrez nos tarifs pour chaque prestations.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card p-6"
                >
                  <h3 className="text-lg font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-gold font-semibold mb-2">{service.price}</p>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-12 text-center bg-gradient-to-r from-gold/5 to-violet-IA/5"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Des questions ?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Notre équipe IA est disponible pour répondre à toutes vos questions et vous aider à choisir la meilleure solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="glass-button glow-gold inline-flex">
                <Sparkles className="w-5 h-5 mr-2" />
                Discuter avec l'IA
              </Link>
              <Link href="/login" className="px-8 py-4 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/5 transition-all inline-flex items-center justify-center">
                Demander un devis
              </Link>
            </div>
          </motion.div>
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
