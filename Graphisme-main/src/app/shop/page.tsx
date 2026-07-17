'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Search, Filter, Grid, List, ShoppingCart, Heart, 
  Eye, Star, ChevronDown, X, ShoppingBag, ArrowRight, Home
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
  tags: string[]
  dimensions?: string
  material?: string
  createdAt: string
}

const categories = [
  { id: 'all', name: 'Tous les produits', icon: '🏠' },
  { id: 'tableaux', name: 'Tableaux', icon: '🖼️' },
  { id: 'miroirs', name: 'Miroirs', icon: '🪞' },
  { id: 'cadres', name: 'Cadres', icon: '🖼️' },
  { id: 'vases', name: 'Vases', icon: '🏺' },
  { id: 'luminaires', name: 'Luminaires', icon: '💡' },
  { id: 'tapis', name: 'Tapis', icon: '🟫' },
  { id: 'textiles', name: 'Textiles', icon: '🧵' },
  { id: 'accessoires', name: 'Accessoires', icon: '✨' },
]

const sortOptions = [
  { id: 'newest', name: 'Plus récents' },
  { id: 'price-asc', name: 'Prix: Croissant' },
  { id: 'price-desc', name: 'Prix: Décroissant' },
  { id: 'name-asc', name: 'Nom: A-Z' },
]

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

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      )
    }

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
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    setFilteredProducts(result)
  }, [products, selectedCategory, sortBy, searchQuery])

  return (
    <div className="min-h-screen bg-premium-black">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-IA/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Notre <span className="gold-text">Boutique</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto mb-6">
              Découvez notre collection exclusive de tableaux, miroirs et objets décoratifs 
              pour sublimer votre intérieur.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
                <Home className="w-4 h-4" />
                Retour à l'accueil
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
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
                    {categories.map((cat) => (
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
