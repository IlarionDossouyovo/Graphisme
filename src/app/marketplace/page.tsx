'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Users, Plus, DollarSign, Package, TrendingUp, Star,
  Eye, Edit, Trash2, MoreVertical, Search, Filter, Upload,
  Wallet, Percent, Calendar, Clock, CheckCircle, AlertCircle,
  Image, Palette, Award, Heart, Share2, MessageCircle
} from 'lucide-react'

// Featured Artists
const artists = [
  {
    id: '1',
    name: 'Marie Kouassi',
    specialty: 'Art Abstrait',
    avatar: '👩‍🎨',
    sales: 156,
    rating: 4.9,
    works: 45,
    revenue: 2450000,
    verified: true,
    cover: 'abstract',
  },
  {
    id: '2',
    name: 'Jean-Pierre Dohou',
    specialty: 'Art Africain',
    avatar: '👨‍🎨',
    sales: 234,
    rating: 4.8,
    works: 67,
    revenue: 3890000,
    verified: true,
    cover: 'african',
  },
  {
    id: '3',
    name: 'Sophie Mensah',
    specialty: 'Design Moderne',
    avatar: '👩‍🎨',
    sales: 89,
    rating: 4.7,
    works: 32,
    revenue: 1280000,
    verified: true,
    cover: 'modern',
  },
  {
    id: '4',
    name: 'Kwame Akakpo',
    specialty: 'Pop Art',
    avatar: '👨‍🎨',
    sales: 178,
    rating: 4.9,
    works: 51,
    revenue: 2670000,
    verified: true,
    cover: 'pop',
  },
  {
    id: '5',
    name: 'Aminata Salami',
    specialty: 'Calligraphie',
    avatar: '👩‍🎨',
    sales: 67,
    rating: 4.6,
    works: 28,
    revenue: 890000,
    verified: false,
    cover: 'calligraphy',
  },
  {
    id: '6',
    name: 'David Houngbédji',
    specialty: 'Street Art',
    avatar: '👨‍🎨',
    sales: 145,
    rating: 4.8,
    works: 38,
    revenue: 1980000,
    verified: true,
    cover: 'street',
  },
]

// Stats
const stats = [
  { label: 'Artistes partenaires', value: '156', icon: Users, change: '+12%' },
  { label: 'Œuvres vendues', value: '2,456', icon: Package, change: '+8%' },
  { label: 'Revenus générés', value: '45M XOF', icon: DollarSign, change: '+23%' },
  { label: 'Note moyenne', value: '4.8', icon: Star, change: '+0.2' },
]

// Benefits
const benefits = [
  {
    icon: Users,
    title: 'Visibilité internationale',
    description: 'Accédez à des clients du monde entier',
  },
  {
    icon: DollarSign,
    title: 'Commission compétitive',
    description: 'Seulement 10% de commission sur vos ventes',
  },
  {
    icon: TrendingUp,
    title: 'Outils analytics',
    description: 'Suivez vos performances en temps réel',
  },
  {
    icon: Wallet,
    title: 'Paiements sécurisés',
    description: 'Retraits rapides et sécurisés',
  },
]

// How it works
const steps = [
  {
    number: '01',
    title: 'Créez votre profil',
    description: 'Inscrivez-vous et vérifiez votre identité',
  },
  {
    number: '02',
    title: 'Ajoutez vos œuvres',
    description: 'Téléchargez vos créations avec descriptions',
  },
  {
    number: '03',
    title: 'Vendez vos créations',
    description: 'Recevez des commandes et gérez-les facilement',
  },
  {
    number: '04',
    title: 'Recevez vos revenus',
    description: 'Withdraw your earnings securely',
  },
]

// Artist Card
const ArtistCard = ({ artist }: { artist: typeof artists[0] }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="glass-card overflow-hidden group"
  >
    {/* Cover */}
    <div className="h-32 bg-gradient-to-br from-gold/20 to-electric/20 relative">
      <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
        {artist.cover === 'abstract' && '🎨'}
        {artist.cover === 'african' && '🌍'}
        {artist.cover === 'modern' && '✨'}
        {artist.cover === 'pop' && '🔥'}
        {artist.cover === 'calligraphy' && '✒️'}
        {artist.cover === 'street' && '🏙️'}
      </div>
    </div>
    
    {/* Content */}
    <div className="p-4 relative">
      {/* Avatar */}
      <div className="absolute -top-10 left-4">
        <div className="w-20 h-20 rounded-full bg-premium-black border-4 border-premium-dark flex items-center justify-center text-4xl">
          {artist.avatar}
        </div>
      </div>
      
      {/* Verified badge */}
      {artist.verified && (
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 bg-gold/20 text-gold text-xs rounded-full flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Vérifié
          </span>
        </div>
      )}
      
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-bold text-white group-hover:text-gold transition-colors">{artist.name}</h3>
        </div>
        <p className="text-gray-400 text-sm mb-3">{artist.specialty}</p>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-center py-3 border-t border-white/10">
          <div>
            <p className="text-gold font-bold">{artist.sales}</p>
            <p className="text-gray-500 text-xs">Ventes</p>
          </div>
          <div>
            <p className="text-gold font-bold">{artist.works}</p>
            <p className="text-gray-500 text-xs">Œuvres</p>
          </div>
          <div>
            <p className="text-gold font-bold flex items-center justify-center gap-1">
              {artist.rating} <Star className="w-3 h-3 fill-gold text-gold" />
            </p>
            <p className="text-gray-500 text-xs">Note</p>
          </div>
        </div>
        
        {/* Revenue */}
        <div className="mt-3 p-2 bg-gold/10 rounded-lg">
          <p className="text-xs text-gray-400">Revenus totaux</p>
          <p className="text-gold font-bold">{(artist.revenue / 1000000).toFixed(1)}M XOF</p>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Link 
            href={`/marketplace/artist/${artist.id}`}
            className="flex-1 py-2 bg-gold text-black text-center rounded-lg text-sm font-semibold hover:bg-white transition-colors"
          >
            Voir le profil
          </Link>
          <button className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20">
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </motion.div>
)

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')

  const specialties = ['all', ...Array.from(new Set(artists.map(a => a.specialty)))]

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty = selectedSpecialty === 'all' || artist.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="min-h-screen bg-premium-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-premium-black/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-gold/5"></div>
                <svg viewBox="0 0 100 100" className="w-10 h-10">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="url(#goldGradient)" strokeWidth="2" />
                  <path d="M35 65 L50 30 L65 65 M50 30 L50 55" fill="none" stroke="url(#goldGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="100%" stopColor="#FFA500" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold gold-text">Graphisme</span>
                <span className="text-xs text-gray-400 block">Marketplace</span>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/shop" className="text-gray-400 hover:text-gold transition-colors">
                Boutique
              </Link>
              <Link href="/login" className="px-4 py-2 bg-gold text-black text-sm font-semibold rounded-lg hover:bg-white transition-colors">
                Connexion
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-gold/20 text-gold rounded-full text-sm mb-6">
              🎨 Marketplace d'Artistes
            </span>
            <h1 className="text-5xl font-bold text-white mb-6">
              Vendez vos œuvres <span className="gold-text">mondialement</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Rejoignez notre communauté d'artistes et accédez à des milliers de clients. 
              Création, vente, revenus - tout en un seul endroit.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link 
                href="/marketplace/become-artist" 
                className="px-8 py-4 bg-gold text-black font-bold rounded-lg hover:bg-white transition-colors"
              >
                Devenir artiste
              </Link>
              <Link 
                href="#artists" 
                className="px-8 py-4 glass-button rounded-lg hover:bg-white/10"
              >
                Découvrir les artistes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-4 text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-gold" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <span className="text-green-400 text-xs">{stat.change}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Pourquoi nous rejoindre ?</h2>
            <p className="text-gray-400">Les avantages de notre marketplace</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-white font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-premium-dark/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Comment ça marche ?</h2>
            <p className="text-gray-400">4 étapes pour commencer à vendre</p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center relative"
              >
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-gold/50 to-transparent" />
                )}
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gold">{step.number}</span>
                </div>
                <h3 className="text-white font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Artists */}
      <section id="artists" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-center justify-between mb-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-white">Nos Artistes</h2>
              <p className="text-gray-400">Découvrez les talents de notre communauté</p>
            </div>
            
            {/* Filters */}
            <div className="flex gap-4 mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-gold/50 focus:outline-none"
                />
              </div>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-gold/50 focus:outline-none"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty === 'all' ? 'Toutes spécialités' : specialty}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtists.map((artist, i) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ArtistCard artist={artist} />
              </motion.div>
            ))}
          </div>
          
          {filteredArtists.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">Aucun artiste trouvé</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-gold/20 to-electric/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Prêt à partager vos créations ?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Rejoignez notre communauté d'artistes et commencez à vendre vos œuvres 
              à des clients du monde entier.
            </p>
            <Link 
              href="/marketplace/become-artist"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-black font-bold rounded-lg hover:bg-white transition-colors"
            >
              <Plus className="w-5 h-5" />
              Créer mon compte artiste
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8">
                <svg viewBox="0 0 100 100" className="w-8 h-8">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#D4AF37" strokeWidth="2" />
                  <path d="M35 65 L50 30 L65 65 M50 30 L50 55" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-gray-400">© 2026 E-Graphisme. Tous droits réservés.</span>
            </div>
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-gold transition-colors">Conditions</a>
              <a href="#" className="hover:text-gold transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-gold transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
