'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Users, DollarSign, Link as LinkIcon, QrCode, 
  TrendingUp, Download, Copy, Check, Star,
  ChevronRight, Gift, Target, Award, Wallet,
  BarChart3, ArrowUpRight, ArrowDownRight
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

// Stats Card
const StatsCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon,
  positive = true 
}: { 
  title: string
  value: string
  change?: string
  icon: any
  positive?: boolean
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-premium rounded-2xl p-6 card-premium-hover"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-gold" />
      </div>
      {change && (
        <div className={`flex items-center gap-1 text-sm ${positive ? 'text-green-400' : 'text-red-400'}`}>
          {positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {change}
        </div>
      )}
    </div>
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-gray-400 text-sm">{title}</div>
  </motion.div>
)

// Referral Link Section
const ReferralLinkSection = () => {
  const [copied, setCopied] = useState(false)
  const referralLink = 'https://graphisme.electron?ref=AF12345'
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="glass-premium rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Lien de Parrainage</h3>
      <p className="text-gray-400 text-sm mb-4">
        Partagez ce lien pour earn des commissions sur chaque vente réalisée.
      </p>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="input-premium flex-1"
        />
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 rounded-xl bg-gold/20 text-gold hover:bg-gold/30 transition-colors"
        >
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass-premium rounded-xl p-4 text-center">
          <QrCode className="w-12 h-12 mx-auto text-gold mb-2" />
          <p className="text-gray-400 text-sm">QR Code</p>
        </div>
        <div className="glass-premium rounded-xl p-4 text-center">
          <LinkIcon className="w-12 h-12 mx-auto text-gold mb-2" />
          <p className="text-gray-400 text-sm">Bannières</p>
        </div>
      </div>
    </div>
  )
}

// Commission Rates
const CommissionRates = () => {
  const tiers = [
    { tier: 'Bronze', rate: '5%', sales: '0-5', color: 'from-amber-700 to-amber-600' },
    { tier: 'Argent', rate: '10%', sales: '6-20', color: 'from-gray-400 to-gray-300' },
    { tier: 'Or', rate: '15%', sales: '21-50', color: 'from-yellow-400 to-yellow-300' },
    { tier: 'Platine', rate: '20%', sales: '51+', color: 'from-purple-400 to-purple-300' },
  ]

  return (
    <div className="glass-premium rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Taux de Commission</h3>
      <p className="text-gray-400 text-sm mb-6">
        Augmentez votre taux de commission en atteignant plus de ventes.
      </p>
      
      <div className="space-y-3">
        {tiers.map((tier, index) => (
          <div
            key={tier.tier}
            className="flex items-center justify-between p-4 rounded-xl bg-white/5"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
                <span className="text-black font-bold text-sm">{index + 1}</span>
              </div>
              <div>
                <div className="text-white font-medium">{tier.tier}</div>
                <div className="text-gray-500 text-sm">{tier.sales} ventes</div>
              </div>
            </div>
            <div className="text-gold font-bold text-xl">{tier.rate}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Payout History
const PayoutHistory = () => {
  const payouts = [
    { id: '1', date: '15 Jan 2026', amount: '150.00€', status: 'completed' },
    { id: '2', date: '01 Jan 2026', amount: '220.00€', status: 'completed' },
    { id: '3', date: '15 Dec 2025', amount: '85.00€', status: 'completed' },
    { id: '4', date: '01 Dec 2025', amount: '180.00€', status: 'completed' },
  ]

  return (
    <div className="glass-premium rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Historique des Paiements</h3>
        <button className="text-gold text-sm hover:text-gold-light transition-colors flex items-center gap-1">
          <Download className="w-4 h-4" />
          Exporter
        </button>
      </div>
      
      <div className="space-y-3">
        {payouts.map((payout) => (
          <div
            key={payout.id}
            className="flex items-center justify-between p-4 rounded-xl bg-white/5"
          >
            <div>
              <div className="text-white font-medium">{payout.amount}</div>
              <div className="text-gray-500 text-sm">{payout.date}</div>
            </div>
            <span className="badge-gold">{payout.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Leaderboard
const Leaderboard = () => {
  const leaders = [
    { rank: 1, name: 'Marie D.', sales: 156, earnings: '2,340€', avatar: 'M' },
    { rank: 2, name: 'Jean K.', sales: 134, earnings: '2,010€', avatar: 'J' },
    { rank: 3, name: 'Sarah B.', sales: 98, earnings: '1,470€', avatar: 'S' },
    { rank: 4, name: 'Vous', sales: 45, earnings: '675€', avatar: 'V', isUser: true },
    { rank: 5, name: 'Pierre M.', sales: 42, earnings: '630€', avatar: 'P' },
  ]

  return (
    <div className="glass-premium rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Classement</h3>
      <p className="text-gray-400 text-sm mb-6">Top affiliés du mois</p>
      
      <div className="space-y-3">
        {leaders.map((leader) => (
          <div
            key={leader.rank}
            className={`flex items-center justify-between p-4 rounded-xl ${
              leader.isUser ? 'bg-gold/10 border border-gold/30' : 'bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                leader.rank <= 3 ? 'bg-gold text-black' : 'bg-white/10 text-white'
              }`}>
                {leader.rank}
              </div>
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-gold font-bold">{leader.avatar}</span>
              </div>
              <div>
                <div className={`font-medium ${leader.isUser ? 'text-gold' : 'text-white'}`}>
                  {leader.name}
                </div>
                <div className="text-gray-500 text-sm">{leader.sales} ventes</div>
              </div>
            </div>
            <div className="text-gold font-bold">{leader.earnings}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Marketing Resources
const MarketingResources = () => {
  const resources = [
    { name: 'Bannière 728x90', size: 'Leaderboard', downloads: 234 },
    { name: 'Bannière 300x250', size: 'Medium Rectangle', downloads: 189 },
    { name: 'Bannière 160x600', size: 'Wide Skyscraper', downloads: 156 },
    { name: 'Carré 300x300', size: 'Medium Square', downloads: 143 },
  ]

  return (
    <div className="glass-premium rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Ressources Marketing</h3>
      <p className="text-gray-400 text-sm mb-6">Téléchargez des bannières promotionnelles</p>
      
      <div className="space-y-3">
        {resources.map((resource) => (
          <div
            key={resource.name}
            className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div>
              <div className="text-white font-medium">{resource.name}</div>
              <div className="text-gray-500 text-sm">{resource.size}</div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">{resource.downloads} DL</span>
              <Download className="w-5 h-5 text-gold" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

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
          <Link href="/services" className="text-sm text-gray-300 hover:text-gold transition-colors">Services</Link>
          <Link href="/marketplace" className="text-sm text-gray-300 hover:text-gold transition-colors">Boutique</Link>
          <Link href="/affiliate" className="text-sm text-gold transition-colors">Affiliation</Link>
        </div>
        <Link href="/login" className="glass-button text-sm">Connexion</Link>
      </div>
    </div>
  </nav>
)

// Hero Section
const Hero = () => (
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
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold mb-6">
          <Gift className="w-4 h-4" />
          Programme d'Affiliation
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="gold-text">Gagnez</span>
          <br />
          <span className="text-white">avec Nous</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Rejoignez notre programme d'affiliation et gagnez des commissions en 
          recommandant nos services et produits.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-premium">
            <span className="flex items-center justify-center gap-2">
              Devenir affilié
              <ChevronRight className="w-5 h-5" />
            </span>
          </button>
          <Link href="/login" className="btn-premium-outline">
            Connexion
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
)

// Footer
const Footer = () => (
  <footer className="bg-premium-dark border-t border-white/5 py-12 mt-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Logo />
          <div>
            <span className="text-lg font-bold gold-text">Graphisme</span>
            <span className="text-xs text-gray-400 block">by ELECTRON</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm">
          © 2026 Graphisme by ELECTRON. Tous droits réservés.
        </p>
      </div>
    </div>
  </footer>
)

export default function AffiliatePage() {
  return (
    <main className="min-h-screen bg-premium-black">
      <Navbar />
      <div className="pt-24">
        <Hero />
        
        <section className="py-10 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatsCard
                title="Total Gagné"
                value="675€"
                change="+12%"
                icon={DollarSign}
                positive={true}
              />
              <StatsCard
                title="Ventes"
                value="45"
                change="+8%"
                icon={TrendingUp}
                positive={true}
              />
              <StatsCard
                title="Clics"
                value="1,234"
                change="+25%"
                icon={Target}
                positive={true}
              />
              <StatsCard
                title="Taux de conversion"
                value="3.6%"
                change="-0.5%"
                icon={BarChart3}
                positive={false}
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                <ReferralLinkSection />
                <CommissionRates />
                <MarketingResources />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <PayoutHistory />
                <Leaderboard />
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </main>
  )
}
