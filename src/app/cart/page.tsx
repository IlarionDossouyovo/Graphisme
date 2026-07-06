'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ShoppingCart, Trash2, Minus, Plus, ArrowRight, ArrowLeft,
  CreditCard, ShieldCheck, Truck, Home
} from 'lucide-react'
import CartButton from '@/components/cart-button'
import { useCart } from '@/lib/cart-context'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  slug: string
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
          <Link href="/shop" className="text-sm text-gray-300 hover:text-gold transition-colors">Boutique</Link>
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

// Cart Item Component
const CartItemCard = ({ item, onUpdateQuantity, onRemove }: { 
  item: CartItem; 
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}) => (
  <div className="glass-card p-4 flex gap-4">
    <div className="w-24 h-24 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
      <span className="text-4xl">🖼️</span>
    </div>
    <div className="flex-1">
      <Link href={`/shop/${item.slug}`}>
        <h3 className="text-white font-semibold hover:text-gold transition-colors">{item.name}</h3>
      </Link>
      <p className="text-gold font-bold mt-1">{item.price.toLocaleString('fr-FR')} XOF</p>
      
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
            className="p-1 bg-white/5 rounded hover:bg-white/10 transition-colors"
          >
            <Minus className="w-4 h-4 text-gray-400" />
          </button>
          <span className="text-white w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="p-1 bg-white/5 rounded hover:bg-white/10 transition-colors"
          >
            <Plus className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
)

// Main Cart Page
export default function CartPage() {
  const { items: cartItems, updateQuantity, removeItem, totalPrice } = useCart()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const subtotal = totalPrice
  const shipping = subtotal > 50000 ? 0 : 5000
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-premium-black">
      <Navbar />

      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Votre <span className="gold-text">Panier</span>
            </h1>
            <p className="text-gray-400 mb-6">
              Gérez vos articles avant de passer commande
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
                <Home className="w-4 h-4" />
                Retour à l'accueil
              </Link>
              <Link href="/shop" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
                <ArrowRight className="w-4 h-4" />
                Voir la boutique
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="glass-card p-4 animate-pulse flex gap-4">
                  <div className="w-24 h-24 bg-white/5 rounded-lg"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-white/5 rounded w-3/4"></div>
                    <div className="h-4 bg-white/5 rounded w-1/4"></div>
                    <div className="h-8 bg-white/5 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : cartItems.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <div className="text-8xl mb-6">🛒</div>
              <h2 className="text-2xl font-bold text-white mb-4">Votre panier est vide</h2>
              <p className="text-gray-400 mb-8">
               Découvrez notre collection de tableaux et objets décoratifs
              </p>
              <Link href="/shop" className="glass-button inline-flex items-center gap-2">
                <ArrowRight className="w-4 h-4" />
                Parcourir la boutique
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <CartItemCard 
                    key={item.id} 
                    item={item} 
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
                
                <Link href="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Continuer vos achats
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="glass-card p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-white mb-6">Résumé de la commande</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-400">
                      <span>Sous-total ({cartItems.length} article{cartItems.length !== 1 ? 's' : ''})</span>
                      <span className="text-white">{subtotal.toLocaleString('fr-FR')} XOF</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Livraison</span>
                      <span className={shipping === 0 ? 'text-green-500' : 'text-white'}>
                        {shipping === 0 ? 'Gratuite' : `${shipping.toLocaleString('fr-FR')} XOF`}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-gray-500">
                        Livraison gratuite à partir de 50,000 XOF
                      </p>
                    )}
                    <div className="border-t border-white/10 pt-3 flex justify-between">
                      <span className="text-white font-semibold">Total</span>
                      <span className="text-gold font-bold text-xl">{total.toLocaleString('fr-FR')} XOF</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button className="w-full glass-button glow-gold py-4 flex items-center justify-center gap-2 mb-4">
                    <CreditCard className="w-5 h-5" />
                    Passer la commande
                  </button>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-white/10">
                    <div>
                      <ShieldCheck className="w-5 h-5 text-gold mx-auto mb-1" />
                      <p className="text-xs text-gray-500">Paiement sécurisé</p>
                    </div>
                    <div>
                      <Truck className="w-5 h-5 text-gold mx-auto mb-1" />
                      <p className="text-xs text-gray-500">Livraison rapide</p>
                    </div>
                    <div>
                      <ShieldCheck className="w-5 h-5 text-gold mx-auto mb-1" />
                      <p className="text-xs text-gray-500">Garantie qualité</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-premium-dark border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Graphisme by ELECTRON. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}
