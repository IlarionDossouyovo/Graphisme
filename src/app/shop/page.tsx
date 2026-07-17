'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Search, Filter, Grid, List, ShoppingCart, Heart, 
  Eye, Star, ChevronDown, X, ShoppingBag, ArrowRight, Home,
  Sparkles, Palette, Zap, Truck, Shield, CreditCard,
  ChevronLeft, ChevronRight, Instagram, Twitter, Facebook,
  MessageCircle, Bot, Wand2
} from 'lucide-react'
import { AddToCartButton } from '@/components/cart-button'
import CartButton from '@/components/cart-button'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  price: number
  originalPrice?: number | null
  category: string
  subcategory: string
  images: string[]
  stock: number
  inStock: boolean
  featured: boolean
  newArrival: boolean
  bestseller?: boolean
  tags: string[]
  dimensions?: string
  material?: string
  colors?: string[]
  artist?: string
  createdAt: string
}

// Premium Categories with subcategories
const premiumCategories = [
  { 
    id: 'tableaux', 
    name: 'Tableaux', 
    icon: '🎨',
    subcategories: ['Art abstrait', 'Art moderne', 'Art contemporain', 'Art africain', 'Paysages', 'Portraits', 'Nature', 'Animaux', 'Architecture', 'Urbain', 'Minimaliste', 'Luxe', 'Pop Art', 'Street Art', 'Calligraphie', 'Art religieux', 'Art personnalisé']
  },
  { 
    id: 'decoration', 
    name: 'Décoration', 
    icon: '🏠',
    subcategories: ['Cadres', 'Posters', 'Toiles', 'Sculptures', 'Décoration murale', 'Horloges', 'Miroirs', 'Stickers', 'Lampes', 'Objets', 'Bureau', 'Salon', 'Chambre', 'Hôtel', 'Restaurant']
  },
  { 
    id: 'creations', 
    name: 'Créations Numériques', 
    icon: '💻',
    subcategories: ['Logos', 'Illustrations', 'Icônes', 'Packs graphiques', 'Templates Canva', 'Templates Photoshop', 'UI Kits', 'Mockups', 'Branding Kit']
  },
  { 
    id: 'cadeaux', 
    name: 'Cadeaux Personnalisés', 
    icon: '🎁',
    subcategories: ['Portraits', 'Tableau famille', 'Tableau entreprise', 'Mariage', 'Anniversaire', 'Corporate']
  },
]

// Collections
const collections = [
  { id: 'exclusives', name: 'Exclusivités', description: 'Œuvres uniques', image: '✨' },
  { id: 'nouveautes', name: 'Nouveautés', description: 'Dernières créations', image: '🆕' },
  { id: 'bestsellers', name: 'Meilleures Ventes', description: 'Les plus populaires', image: '🔥' },
  { id: 'artistes', name: 'Artistes Partenaires', description: 'Créateurs exclusifs', image: '👨‍🎨' },
  { id: 'promotions', name: 'Promotions', description: 'Offres spéciales', image: '💰' },
  { id: 'personnalises', name: 'Sur Mesure', description: 'Créations uniques', image: '🎯' },
]

const sortOptions = [
  { id: 'newest', name: 'Plus récents' },
  { id: 'price-asc', name: 'Prix: Croissant' },
  { id: 'price-desc', name: 'Prix: Décroissant' },
  { id: 'name-asc', name: 'Nom: A-Z' },
  { id: 'bestsellers', name: 'Meilleures ventes' },
]

// Featured Artists
const featuredArtists = [
  { id: '1', name: 'Marie K.', specialty: 'Art Abstrait', image: '👩‍🎨' },
  { id: '2', name: 'Jean-Pierre D.', specialty: 'Art Africain', image: '👨‍🎨' },
  { id: '3', name: 'Sophie M.', specialty: 'Design Moderne', image: '👩‍🎨' },
  { id: '4', name: 'Kwame A.', specialty: 'Pop Art', image: '👨‍🎨' },
]

// Materials for customization
const materials = [
  { id: 'toile', name: 'Toile Canvas', price: 1 },
  { id: 'aluminium', name: 'Aluminium Dibond', price: 1.3 },
  { id: 'verre', name: 'Verre Trempé', price: 1.5 },
  { id: 'bois', name: 'Bois Massif', price: 1.2 },
  { id: 'pvc', name: 'PVC Expandé', price: 0.8 },
]

// Frame options
const frameOptions = [
  { id: 'none', name: 'Sans cadre', price: 0 },
  { id: 'simple', name: 'Cadre simple', price: 5000 },
  { id: 'premium', name: 'Cadre premium', price: 15000 },
  { id: 'luxe', name: 'Cadre luxe', price: 35000 },
]

// AI Recommendation Component
const AIRecommendation = ({ onClose }: { onClose: () => void }) => {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<string[]>([])

  const handleSearch = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    // Simulated AI recommendations
    setTimeout(() => {
      setRecommendations([
        'Tableau abstrait doré - Horizon',
        'Paysage africain - Savane',
        'Composition moderne - Équilibre',
        'Art contemporain - Fusion',
      ])
      setLoading(false)
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-electric" />
          <span className="font-semibold text-white">Assistant IA</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Décrivez votre projet..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-gold"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-4 py-2 bg-electric text-black rounded-lg hover:bg-gold transition-colors disabled:opacity-50"
        >
          {loading ? <Sparkles className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
        </button>
      </div>
      {recommendations.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-400">Recommandations:</p>
          {recommendations.map((rec, i) => (
            <div key={i} className="p-2 bg-white/5 rounded-lg text-white text-sm hover:bg-white/10 cursor-pointer">
              {rec}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

// Premium Banner
const PremiumBanner = () => (
  <div className="relative h-[500px] overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-premium-black via-premium-dark to-premium-black" />
    <div className="absolute inset-0">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric/10 rounded-full blur-3xl animate-pulse delay-1000" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-2 bg-gold/20 text-gold rounded-full text-sm mb-6">
            🏆 Marketplace d'Art Premium
          </span>
          <h1 className="text-5xl font-bold text-white mb-4">
            Créez votre <span className="text-gold">espace</span> unique
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Découvrez notre collection exclusive d'œuvres d'art, de créations numériques et de personnalisation sur mesure.
          </p>
          <div className="flex gap-4">
            <Link href="#collections" className="px-8 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-white transition-colors">
              Découvrir
            </Link>
            <Link href="#categories" className="px-8 py-3 glass-button rounded-lg hover:bg-white/10">
              Personnaliser
            </Link>
          </div>
        </motion.div>
      </div>
      <div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-9xl"
        >
          🎨
        </motion.div>
      </div>
    </div>
  </div>
)

// Collection Card
const CollectionCard = ({ collection }: { collection: typeof collections[0] }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="glass-card p-6 cursor-pointer group"
  >
    <div className="text-4xl mb-3">{collection.image}</div>
    <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors">{collection.name}</h3>
    <p className="text-gray-400 text-sm">{collection.description}</p>
  </motion.div>
)

// Artist Card
const ArtistCard = ({ artist }: { artist: typeof featuredArtists[0] }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="glass-card p-4 text-center cursor-pointer group"
  >
    <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-gold/20 to-electric/20 flex items-center justify-center text-4xl">
      {artist.image}
    </div>
    <h3 className="font-semibold text-white group-hover:text-gold transition-colors">{artist.name}</h3>
    <p className="text-xs text-gray-400">{artist.specialty}</p>
  </motion.div>
)

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
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-premium-black/95 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
            <div>
              <span className="text-lg font-bold gold-text">Graphisme</span>
              <span className="text-xs text-gray-400 block">by ELECTRON</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            <Link href="/" className="text-sm text-gray-300 hover:text-gold transition-colors">Accueil</Link>
            <Link href="/services" className="text-sm text-gray-300 hover:text-gold transition-colors">Services</Link>
            <Link href="/shop" className="text-sm text-gold transition-colors">Boutique</Link>
            <Link href="/blog" className="text-sm text-gray-300 hover:text-gold transition-colors">Blog</Link>
            <Link href="/portfolio" className="text-sm text-gray-300 hover:text-gold transition-colors">Portfolio</Link>
          </div>

          <div className="flex items-center gap-4">
            <CartButton />
            <Link href="/login" className="glass-button text-sm py-2 px-4">Connexion</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Product Card
const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square bg-white/5 overflow-hidden">
        {/* Placeholder image */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-premium-dark to-premium-card">
          <span className="text-6xl">🖼️</span>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.newArrival && (
            <span className="px-3 py-1 bg-electric text-black text-xs font-bold rounded-full">Nouveau</span>
          )}
          {product.featured && (
            <span className="px-3 py-1 bg-gold text-black text-xs font-bold rounded-full">Featured</span>
          )}
        </div>

        {/* Quick actions */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <button className="p-2 bg-white/10 backdrop-blur rounded-lg text-white hover:bg-gold hover:text-black transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <Link href={`/shop/${product.slug}`} className="p-2 bg-white/10 backdrop-blur rounded-lg text-white hover:bg-electric hover:text-black transition-colors">
            <Eye className="w-4 h-4" />
          </Link>
        </div>

        {/* Add to cart button */}
        <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <AddToCartButton product={product} />
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1 capitalize">{product.category}</p>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-white font-semibold mb-2 group-hover:text-gold transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-gold font-bold">{product.price.toLocaleString('fr-FR')} XOF</span>
          {product.originalPrice && (
            <span className="text-gray-500 line-through text-sm">{product.originalPrice.toLocaleString('fr-FR')} XOF</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Main Shop Page
export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading, setIsLoading] = useState(true)
  const [showAIRecommendation, setShowAIRecommendation] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000])
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('')

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    let result = [...products]

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory)
    }

    // Filter by subcategory
    if (selectedSubcategory) {
      result = result.filter(p => p.subcategory === selectedSubcategory)
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      )
    }

    // Filter by price range
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'bestsellers':
        result = result.filter(p => p.bestseller).concat(result.filter(p => !p.bestseller))
        break
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    setFilteredProducts(result)
  }, [products, selectedCategory, selectedSubcategory, sortBy, searchQuery, priceRange])

  // Get new arrivals
  const newArrivals = products.filter(p => p.newArrival).slice(0, 4)
  const bestsellers = products.filter(p => p.bestseller).slice(0, 4)
  const featured = products.filter(p => p.featured).slice(0, 4)

  return (
    <div className="min-h-screen bg-premium-black">
      <Navbar />

      {/* Premium Banner */}
      <PremiumBanner />

      {/* Collections Section */}
      <section id="collections" className="py-16 bg-premium-dark/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Nos <span className="gold-text">Collections</span></h2>
            <p className="text-gray-400">Explorez nos différentes catégories</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <CollectionCard collection={collection} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-white">Artistes <span className="gold-text">Partenaires</span></h2>
              <p className="text-gray-400">Découvrez nos créateurs exclusifs</p>
            </div>
            <Link href="/ai-team" className="text-gold hover:text-white transition-colors flex items-center gap-2">
              Voir tous <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredArtists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ArtistCard artist={artist} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 bg-premium-dark/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Catégories <span className="gold-text">Premium</span></h2>
            <p className="text-gray-400">Parcourez notrelarge gamme de produits</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 cursor-pointer group"
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors">{category.name}</h3>
                <p className="text-gray-400 text-sm mt-2">{category.subcategories.length} sous-catégories</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Recommendation Toggle */}
      <div className="fixed bottom-6 right-6 z-40">
        <AnimatePresence>
          {showAIRecommendation && (
            <div className="mb-4 w-80">
              <AIRecommendation onClose={() => setShowAIRecommendation(false)} />
            </div>
          )}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAIRecommendation(!showAIRecommendation)}
          className="p-4 bg-electric text-black rounded-full shadow-lg hover:bg-gold transition-colors"
        >
          {showAIRecommendation ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Benefits Section */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'Livraison', desc: ' Internationale' },
              { icon: Shield, title: 'Paiement', desc: 'Sécurisé' },
              { icon: Sparkles, title: 'Qualité', desc: 'Premium' },
              { icon: MessageCircle, title: 'Support', desc: '24/7' },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{benefit.title}</h4>
                  <p className="text-gray-400 text-sm">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="glass-card p-6 sticky top-24">
                {/* Search */}
                <div className="mb-6">
                  <label className="text-sm text-gray-400 mb-2 block">Rechercher</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-gold/50 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3">Catégories</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => { setSelectedCategory('all'); setSelectedSubcategory('') }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                        selectedCategory === 'all'
                          ? 'bg-gold/20 text-gold'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>🏠</span>
                      <span className="text-sm">Tous</span>
                    </button>
                    {premiumCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                          selectedCategory === cat.id
                            ? 'bg-gold/20 text-gold'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span className="text-sm">{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Info */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Gamme de prix</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex justify-between">
                      <span>12,000 XOF</span>
                      <span>85,000 XOF</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gold w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-400">
                  {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''}
                </p>
                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white/5 border border-white/10 rounded-lg px-4 py-2 pr-8 text-white text-sm focus:border-gold/50 focus:outline-none cursor-pointer"
                    >
                      {sortOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* View Mode */}
                  <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gold/20 text-gold' : 'text-gray-400 hover:text-white'}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-gold/20 text-gold' : 'text-gray-400 hover:text-white'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="glass-card animate-pulse">
                      <div className="aspect-square bg-white/5"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-white/5 rounded w-1/3"></div>
                        <div className="h-5 bg-white/5 rounded w-3/4"></div>
                        <div className="h-4 bg-white/5 rounded w-1/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="glass-card p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-white mb-2">Aucun produit trouvé</h3>
                  <p className="text-gray-400 mb-6">Essayez avec d'autres critères de recherche</p>
                  <button
                    onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                    className="glass-button inline-flex items-center gap-2"
                  >
                    Voir tous les produits
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-premium-dark border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
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
    </div>
  )
}
