'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

// Logo Component
export const Logo = () => (
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

// Navigation items
export const navItems = [
  { name: 'Accueil', href: '/' },
  { name: 'À Propos', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Boutique', href: '/shop' },
  { name: 'Galerie', href: '/art-gallery' },
  { name: 'IA Studio', href: '/ai-studio' },
  { name: 'Blog', href: '/blog' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Équipe IA', href: '/ai-team' },
  { name: 'Tarifs', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
]

export const mobileNavItems = [
  { name: 'Accueil', href: '/' },
  { name: 'À Propos', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Boutique', href: '/shop' },
  { name: 'Galerie', href: '/art-gallery' },
  { name: 'IA Studio', href: '/ai-studio' },
  { name: 'Blog', href: '/blog' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Équipe IA', href: '/ai-team' },
  { name: 'Tarifs', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
  { name: 'Impression', href: '/print-shop' },
  { name: 'Affiliation', href: '/affiliate' },
  { name: 'Admin', href: '/admin' },
  { name: 'Rapport', href: '/client' },
]

// Navbar Component
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-premium-black/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <Logo />
            <div>
              <span className="text-xl font-bold gold-text">Graphisme</span>
              <span className="text-xs text-gray-400 block">by ELECTRON</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className="text-sm text-gray-300 hover:text-gold transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors">Connexion</Link>
            <Link href="/contact" className="glass-button text-sm">
              Devis Gratuit
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 max-h-[80vh] overflow-y-auto">
            {mobileNavItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className="block py-3 text-gray-300 hover:text-gold transition-colors border-b border-white/5"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex gap-4 mt-4">
              <Link href="/login" className="text-sm text-gray-300">Connexion</Link>
              <Link href="/contact" className="glass-button text-sm">Devis Gratuit</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Footer Component
export function Footer() {
  return (
    <footer className="bg-premium-dark border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Logo />
              <div>
                <span className="text-lg font-bold gold-text">Graphisme</span>
                <span className="text-xs text-gray-400 block">by ELECTRON</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              La première agence digitale intelligente du Benin avec une équipe de 12 agents IA.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/services" className="hover:text-gold transition-colors">Design Graphique</Link></li>
              <li><Link href="/services" className="hover:text-gold transition-colors">Développement Web</Link></li>
              <li><Link href="/services" className="hover:text-gold transition-colors">Marketing Digital</Link></li>
              <li><Link href="/ai-studio" className="hover:text-gold transition-colors">IA & Automatisation</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/about" className="hover:text-gold transition-colors">À propos</Link></li>
              <li><Link href="/portfolio" className="hover:text-gold transition-colors">Portfolio</Link></li>
              <li><Link href="/blog" className="hover:text-gold transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Cotonou, Benin</li>
              <li>+229 01 97 70 03 47</li>
              <li>electronbusiness07@gmail.com</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Graphisme by ELECTRON. Tous droits réservés.
          </p>
          <p className="text-gray-500 text-sm">
            Fait avec <span className="text-gold">❤</span> et l'IA
          </p>
        </div>
      </div>
    </footer>
  )
}
