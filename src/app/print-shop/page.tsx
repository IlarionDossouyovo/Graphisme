'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Printer, Download, FileImage, Palette, Scissors,
  Droplets, Type, Ruler, FileText, Check, ChevronRight,
  Sparkles, Package, Truck, Shield
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

// Print Products
const printProducts = [
  {
    id: 'canvas',
    name: 'Toile Canvas',
    description: 'Toile de qualité musée, prête à accrocher',
    icon: '🖼️',
    features: ['Toile 100% coton', 'Cadre en bois massif', 'Coins renforcés'],
    basePrice: 89,
    sizes: ['30x40cm', '40x50cm', '50x70cm', '60x80cm']
  },
  {
    id: 'poster',
    name: 'Affiche Premium',
    description: 'Papier photo haute résolution',
    icon: '📄',
    features: ['Papier satiné 200g', 'Finition brillante', 'Résistant UV'],
    basePrice: 29,
    sizes: ['A4', 'A3', 'A2', 'A1']
  },
  {
    id: 'frame',
    name: 'Cadre Moderne',
    description: 'Cadre aluminium avec verre acrylique',
    icon: '🖼️',
    features: ['Aluminium noir/or', 'Verre anti-reflet', 'Suspension incluse'],
    basePrice: 119,
    sizes: ['30x40cm', '40x50cm', '50x70cm', '60x80cm']
  },
  {
    id: 'vinyl',
    name: 'Stick vinyl',
    description: 'Autocollant mural grand format',
    icon: '🧱',
    features: ['Vinyle Premium', 'Facile à poser', 'Sans bulles'],
    basePrice: 39,
    sizes: ['50x50cm', '80x80cm', '100x100cm', '150x150cm']
  },
  {
    id: 'banner',
    name: 'Bannière',
    description: ' bâche PVC pour extérieur',
    icon: '🚩',
    features: ['PVC 500g', 'Œillets renforcés', 'Impression recto-verso'],
    basePrice: 79,
    sizes: ['60x40cm', '80x60cm', '120x80cm', '200x100cm']
  },
  {
    id: 'foil',
    name: 'Dépliant',
    description: 'Flyers professionnels',
    icon: '📰',
    features: ['Papier couché mat', 'Vernis sélectif', 'Plis possible'],
    basePrice: 49,
    sizes: ['A5', 'A4', 'A3']
  }
]

// Format Options
const formatOptions = [
  { id: 'pdf', name: 'PDF', description: 'Format vectoriel, idéal pour l\'impression', icon: FileText },
  { id: 'png', name: 'PNG', description: 'Haute résolution avec transparence', icon: FileImage },
  { id: 'svg', name: 'SVG', description: 'Vectoriel, redimensionnable à l\'infini', icon: Palette },
  { id: 'tiff', name: 'TIFF', description: 'Qualité professionnelle, CMYK', icon: Printer },
]

// Print Options
const printOptions = [
  { id: 'cmyk', name: 'CMYK', description: 'Couleurs plein gamut pour impression' },
  { id: 'rgb', name: 'RGB', description: 'Pour impression numérique' },
]

// Paper Types
const paperTypes = [
  'Satiné 150g', 'Satiné 200g', 'Mat 150g', 'Mat 200g', 
  'Couché brillant', 'Papier photo', 'Toile canvas', 'Vinyle'
]

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
          <Link href="/art-gallery" className="text-sm text-gray-300 hover:text-gold transition-colors">Galerie</Link>
          <Link href="/marketplace" className="text-sm text-gray-300 hover:text-gold transition-colors">Boutique</Link>
          <Link href="/ai-studio" className="text-sm text-gray-300 hover:text-gold transition-colors">IA Studio</Link>
        </div>
        <Link href="/login" className="glass-button text-sm">Connexion</Link>
      </div>
    </div>
  </nav>
)

// Print Product Card
const ProductCard = ({ 
  product, 
  onSelect 
}: { 
  product: typeof printProducts[0]
  onSelect: (product: typeof printProducts[0]) => void
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="glass-premium rounded-2xl p-6 cursor-pointer card-premium-hover"
    onClick={() => onSelect(product)}
  >
    <div className="text-4xl mb-4">{product.icon}</div>
    <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
    <p className="text-gray-400 text-sm mb-4">{product.description}</p>
    <div className="space-y-2 mb-4">
      {product.features.map((feature, index) => (
        <div key={index} className="flex items-center gap-2 text-xs text-gray-500">
          <Check className="w-3 h-3 text-gold" />
          {feature}
        </div>
      ))}
    </div>
    <div className="pt-4 border-t border-white/10">
      <span className="text-gold font-bold">À partir de </span>
      <span className="text-gold text-2xl font-bold">{product.basePrice}€</span>
    </div>
  </motion.div>
)

// Configuration Form
const ConfigForm = ({ 
  product, 
  onBack 
}: { 
  product: typeof printProducts[0]
  onBack: () => void
}) => {
  const [size, setSize] = useState(product.sizes[0])
  const [format, setFormat] = useState('pdf')
  const [paperType, setPaperType] = useState(paperTypes[0])
  const [dpi, setDpi] = useState('300')
  const [cmyk, setCmyk] = useState(true)
  const [bleed, setBleed] = useState(true)
  const [cropMarks, setCropMarks] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const calculatePrice = () => {
    const sizeIndex = product.sizes.indexOf(size)
    const sizeMultiplier = 1 + (sizeIndex * 0.5)
    let price = product.basePrice * sizeMultiplier
    
    if (cmyk) price *= 1.1
    if (bleed) price *= 1.05
    if (cropMarks) price *= 1.02
    if (quantity > 1) price *= (0.9 + (quantity * 0.05)) // Bulk discount
    
    return Math.round(price * quantity * 100) / 100
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
        Retour aux produits
      </button>

      <div className="glass-premium rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-2">{product.name}</h2>
        <p className="text-gray-400 mb-6">Configurez votre impression</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Size */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Format</label>
            <div className="grid grid-cols-2 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`p-3 rounded-xl text-sm transition-all ${
                    size === s
                      ? 'bg-gold text-black'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Quantité</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg bg-white/5 text-white hover:bg-white/10"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="input-premium w-20 text-center"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg bg-white/5 text-white hover:bg-white/10"
              >
                +
              </button>
            </div>
          </div>

          {/* Paper Type */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Type de papier</label>
            <select
              value={paperType}
              onChange={(e) => setPaperType(e.target.value)}
              className="input-premium"
            >
              {paperTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Format */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Format de fichier</label>
            <div className="grid grid-cols-4 gap-2">
              {formatOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setFormat(opt.id)}
                  className={`p-2 rounded-lg text-xs text-center transition-all ${
                    format === opt.id
                      ? 'bg-gold text-black'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <opt.icon className="w-5 h-5 mx-auto mb-1" />
                  {opt.name}
                </button>
              ))}
            </div>
          </div>

          {/* DPI */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Résolution DPI</label>
            <div className="flex gap-2">
              {['150', '300', '600'].map((d) => (
                <button
                  key={d}
                  onClick={() => setDpi(d)}
                  className={`flex-1 p-3 rounded-xl text-sm transition-all ${
                    dpi === d
                      ? 'bg-gold text-black'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {d} DPI
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Options</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cmyk}
                  onChange={(e) => setCmyk(e.target.checked)}
                  className="w-4 h-4 rounded bg-white/5 border-white/20 text-gold focus:ring-gold"
                />
                <span className="text-gray-300 text-sm">Mode CMYK</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bleed}
                  onChange={(e) => setBleed(e.target.checked)}
                  className="w-4 h-4 rounded bg-white/5 border-white/20 text-gold focus:ring-gold"
                />
                <span className="text-gray-300 text-sm">Fond perdu (3mm)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cropMarks}
                  onChange={(e) => setCropMarks(e.target.checked)}
                  className="w-4 h-4 rounded bg-white/5 border-white/20 text-gold focus:ring-gold"
                />
                <span className="text-gray-300 text-sm">Traits de coupe</span>
              </label>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <div className="text-gray-400 text-sm">Prix total</div>
              <div className="text-gold text-4xl font-bold">{calculatePrice()}€</div>
            </div>
            <div className="flex gap-4">
              <button className="btn-premium-outline">
                <span className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Télécharger fichier
                </span>
              </button>
              <button className="btn-premium">
                <span className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Commander
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Features
const Features = () => (
  <section className="py-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-6">
        <div className="glass-premium rounded-xl p-6 text-center">
          <Printer className="w-10 h-10 mx-auto text-gold mb-3" />
          <h3 className="text-white font-semibold mb-2">Haute Qualité</h3>
          <p className="text-gray-400 text-sm">Impression professionnelle sur équipements dernière génération</p>
        </div>
        <div className="glass-premium rounded-xl p-6 text-center">
          <Truck className="w-10 h-10 mx-auto text-gold mb-3" />
          <h3 className="text-white font-semibold mb-2">Livraison Rapide</h3>
          <p className="text-gray-400 text-sm">Livraison en 24-72h partout au Benin</p>
        </div>
        <div className="glass-premium rounded-xl p-6 text-center">
          <Shield className="w-10 h-10 mx-auto text-gold mb-3" />
          <h3 className="text-white font-semibold mb-2">Garantie</h3>
          <p className="text-gray-400 text-sm">Garantie 5 ans sur les impressions</p>
        </div>
        <div className="glass-premium rounded-xl p-6 text-center">
          <Palette className="w-10 h-10 mx-auto text-gold mb-3" />
          <h3 className="text-white font-semibold mb-2">Couleurs Parfaites</h3>
          <p className="text-gray-400 text-sm">Calibration couleur professionnelle</p>
        </div>
      </div>
    </div>
  </section>
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
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="gold-text">Impression</span>
          <br />
          <span className="text-white">Professionnelle</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Tous vos projets d'impression en haute qualité. 
          Canvas, affiches, cadres, bâches et plus encore.
        </p>
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

export default function PrintShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<typeof printProducts[0] | null>(null)

  return (
    <main className="min-h-screen bg-premium-black">
      <Navbar />
      <div className="pt-24">
        <Hero />
        <Features />
        
        <section className="py-10 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            {selectedProduct ? (
              <ConfigForm 
                product={selectedProduct} 
                onBack={() => setSelectedProduct(null)} 
              />
            ) : (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  Nos <span className="gold-text">Produits</span> d'Impression
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {printProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={setSelectedProduct}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
        
        <Footer />
      </div>
    </main>
  )
}
