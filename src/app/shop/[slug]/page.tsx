'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { 
  ShoppingCart, Heart, Share2, ArrowLeft, Check, Star,
  Truck, Shield, RotateCcw, Minus, Plus, ChevronRight
} from 'lucide-react'

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
  weight?: string
  createdAt: string
}

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
          <Link href="/cart" className="relative p-2 text-gray-300 hover:text-gold transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-black text-xs rounded-full flex items-center justify-center">0</span>
          </Link>
          <Link href="/login" className="glass-button text-sm py-2 px-4">Connexion</Link>
        </div>
      </div>
    </div>
  </nav>
)

// Product Detail Content
function ProductDetailContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string
  
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products?slug=${slug}`)
        if (res.ok) {
          const data = await res.json()
          setProduct(data)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProduct()
  }, [slug])

  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-premium-black pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="animate-pulse">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-white/5 rounded-2xl"></div>
              <div className="space-y-4">
                <div className="h-4 bg-white/5 rounded w-1/4"></div>
                <div className="h-8 bg-white/5 rounded w-3/4"></div>
                <div className="h-6 bg-white/5 rounded w-1/3"></div>
                <div className="h-20 bg-white/5 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-premium-black pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-white mb-4">Produit non trouvé</h1>
          <Link href="/shop" className="glass-button inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour à la boutique
          </Link>
        </div>
      </div>
    )
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-premium-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/shop" className="hover:text-gold transition-colors">Boutique</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-gold transition-colors capitalize">{product.category}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gold">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-white/5 rounded-2xl overflow-hidden flex items-center justify-center"
            >
              <span className="text-[150px]">🖼️</span>
            </motion.div>
            
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      selectedImage === idx ? 'border-gold' : 'border-transparent'
                    }`}
                  >
                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                      <span className="text-2xl">🖼️</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-400 capitalize">{product.category}</span>
              {product.newArrival && (
                <span className="px-3 py-1 bg-electric text-black text-xs font-bold rounded-full">Nouveau</span>
              )}
              {discount > 0 && (
                <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">-{discount}%</span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-gold fill-gold" />
                ))}
              </div>
              <span className="text-gray-400 text-sm">(12 avis)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-gold">{formatPrice(product.price)} XOF</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">{formatPrice(product.originalPrice)} XOF</span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {product.inStock ? (
                <>
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-green-500 font-medium">En stock ({product.stock} disponibles)</span>
                </>
              ) : (
                <>
                  <span className="text-red-500 font-medium">Rupture de stock</span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-gray-300 mb-8">
              {product.shortDescription || product.description}
            </p>

            {/* Quantity */}
            <div className="mb-6">
              <label className="text-sm text-gray-400 mb-2 block">Quantité</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white/5 rounded-lg border border-white/10">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center text-white font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-gray-400 text-sm">Maximum: {product.stock}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button className="flex-1 glass-button glow-gold py-4 flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Ajouter au panier
              </button>
              <button className="p-4 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-gold hover:border-gold/50 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-4 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-electric hover:border-electric/50 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <Truck className="w-6 h-6 text-gold mx-auto mb-2" />
                <p className="text-xs text-gray-400">Livraison rapide</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <Shield className="w-6 h-6 text-gold mx-auto mb-2" />
                <p className="text-xs text-gray-400">Garantie qualité</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <RotateCcw className="w-6 h-6 text-gold mx-auto mb-2" />
                <p className="text-xs text-gray-400">Retour 14 jours</p>
              </div>
            </div>

            {/* Details */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-white font-semibold mb-4">Détails du produit</h3>
              <div className="space-y-2 text-sm">
                {product.dimensions && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dimensions</span>
                    <span className="text-white">{product.dimensions}</span>
                  </div>
                )}
                {product.material && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Matériau</span>
                    <span className="text-white">{product.material}</span>
                  </div>
                )}
                {product.weight && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Poids</span>
                    <span className="text-white">{product.weight}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Catégorie</span>
                  <span className="text-white capitalize">{product.category}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="border-t border-white/10 pt-6 mt-6">
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/5 text-gray-400 text-xs rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Description</h2>
          <div className="glass-card p-8">
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Page Component with Suspense
export default function ProductDetailPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen bg-premium-black pt-24">
          <div className="flex items-center justify-center h-full">
            <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
          </div>
        </div>
      }>
        <ProductDetailContent />
      </Suspense>
      
      {/* Simple Footer */}
      <footer className="bg-premium-dark border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Graphisme by ELECTRON. Tous droits réservés.
          </p>
        </div>
      </footer>
    </>
  )
}
