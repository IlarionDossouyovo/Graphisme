'use client'

import { useCart } from '@/lib/cart-context'
import { ShoppingCart, Plus, Minus, Trash2, X, ArrowRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function CartButton() {
  const { items, addItem } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [showAddedMessage, setShowAddedMessage] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      quantity: 1,
      image: product.images?.[0] || ''
    })
    setShowAddedMessage(true)
    setTimeout(() => setShowAddedMessage(false), 2000)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Cart Icon */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-300 hover:text-gold transition-colors"
      >
        <ShoppingCart className="w-5 h-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-black text-xs font-bold rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Added Message */}
      {showAddedMessage && (
        <div className="absolute top-full mt-2 right-0 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium animate-fade-in z-50">
          ✓ Ajouté au panier !
        </div>
      )}

      {/* Cart Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-80 bg-premium-dark border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-white font-semibold">Mon Panier</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="max-h-64 overflow-y-auto">
            {items.length === 0 ? (
              <div className="p-8 text-center">
                <ShoppingCart className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">Votre panier est vide</p>
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="p-3 border-b border-white/5 flex gap-3">
                  <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🖼️</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{item.name}</p>
                    <p className="text-gold text-sm">{item.price.toLocaleString('fr-FR')} XOF</p>
                    <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-4 border-t border-white/10">
              <div className="flex justify-between mb-3">
                <span className="text-gray-400">Total</span>
                <span className="text-gold font-bold">{totalPrice.toLocaleString('fr-FR')} XOF</span>
              </div>
              <Link 
                href="/cart" 
                onClick={() => setIsOpen(false)}
                className="w-full glass-button glow-gold py-3 flex items-center justify-center gap-2"
              >
                Voir le panier
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Standalone Add to Cart Button for Product Cards
export function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      quantity: 1,
      image: product.images?.[0] || ''
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button 
      onClick={handleClick}
      className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
        added 
          ? 'bg-green-500 text-white' 
          : 'bg-gold/90 hover:bg-gold text-black font-semibold'
      }`}
    >
      {added ? (
        <>
          <span>✓</span>
          Ajouté
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" />
          Ajouter au panier
        </>
      )}
    </button>
  )
}
