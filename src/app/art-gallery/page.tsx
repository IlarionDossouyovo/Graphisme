'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Search, Filter, Heart, Download, ShoppingCart, 
  ZoomIn, X, ChevronLeft, ChevronRight, 
  Sparkles, Palette, Crown, Building2, Home, 
  Users, Camera, Wand2, Grid, List, Check, Trash2
} from 'lucide-react'

// Sample artwork images from Unsplash
const artworkImages = [
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600',
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600',
  'https://images.unsplash.com/photo-1549887534-1541e9326642?w=600',
  'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600',
  'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600',
  'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600',
  'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600',
  'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600',
  'https://images.unsplash.com/photo-1551913902-c92207136625?w=600',
  'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?w=600',
  'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600',
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

// Sample artwork data with real images
const sampleArtworks = [
  {
    id: '1',
    title: 'Aube Dorée Africaine',
    category: 'african_art',
    style: 'abstract',
    price: 299,
    imageUrl: artworkImages[0],
    artist: 'AI Artist',
    likes: 234,
    downloads: 45,
    description: 'Une œuvre abstraite inspirée des couleurs et motifs traditionnels africains, mélangés avec des techniques numériques modernes.'
  },
  {
    id: '2',
    title: 'Modernité Urbaine',
    category: 'modern_art',
    style: 'digital',
    price: 349,
    imageUrl: artworkImages[1],
    artist: 'AI Artist',
    likes: 189,
    downloads: 32,
    description: 'Représentation contemporaine de la ville avec des lignes épurées et des couleurs vibrantes.'
  },
  {
    id: '3',
    title: 'Rêve d\'Or',
    category: 'luxury_gold_art',
    style: 'minimalist',
    price: 499,
    imageUrl: artworkImages[2],
    artist: 'AI Artist',
    likes: 312,
    downloads: 67,
    description: 'Une pièce de luxe avec des accents dorés et une esthétique minimaliste raffinée.'
  },
  {
    id: '4',
    title: 'Bureau Executive',
    category: 'office_decoration',
    style: 'realistic',
    price: 399,
    imageUrl: artworkImages[3],
    artist: 'AI Artist',
    likes: 156,
    downloads: 28,
    description: 'Décoration murale professionnelle pour espace de travail moderne et élégant.'
  },
  {
    id: '5',
    title: 'Salon Élégant',
    category: 'living_room_decoration',
    style: 'realistic',
    price: 449,
    imageUrl: artworkImages[4],
    artist: 'AI Artist',
    likes: 203,
    downloads: 41,
    description: 'Œuvre artistique parfaite pour sublimer votre salon avec elegance.'
  },
  {
    id: '6',
    title: 'Hôtel Luxe',
    category: 'hotel_decoration',
    style: 'minimalist',
    price: 599,
    imageUrl: artworkImages[5],
    artist: 'AI Artist',
    likes: 278,
    downloads: 53,
    description: 'Création exclusive pour hôtels et établissements de prestige.'
  },
  {
    id: '7',
    title: 'Chambre Royale',
    category: 'bedroom_decoration',
    style: 'modern',
    price: 379,
    imageUrl: artworkImages[6],
    artist: 'AI Artist',
    likes: 167,
    downloads: 35,
    description: 'Ambiance relaxante et élégante pour votre chambre à coucher.'
  },
  {
    id: '8',
    title: 'Paysage Digital',
    category: 'landscape',
    style: 'digital',
    price: 249,
    imageUrl: artworkImages[7],
    artist: 'AI Artist',
    likes: 145,
    downloads: 22,
    description: 'Paysage numérique apaisant avec des couleurs naturelles.'
  },
  {
    id: '9',
    title: 'Abstract Flow',
    category: 'abstract_art',
    style: 'abstract',
    price: 299,
    imageUrl: artworkImages[8],
    artist: 'AI Artist',
    likes: 198,
    downloads: 38,
    description: 'Mouvement abstrait couleurs vives pour dynamiser votre espace.'
  },
  {
    id: '10',
    title: 'Cyberpunk City',
    category: 'art_3d',
    style: 'digital',
    price: 399,
    imageUrl: artworkImages[9],
    artist: 'AI Artist',
    likes: 256,
    downloads: 49,
    description: 'Ville futuriste en 3D avec une esthétique cyberpunk saisissante.'
  },
  {
    id: '11',
    title: 'Fantasy World',
    category: 'fantasy',
    style: 'illustration',
    price: 449,
    imageUrl: artworkImages[10],
    artist: 'AI Artist',
    likes: 289,
    downloads: 55,
    description: 'Univers fantasy magique créé par intelligence artificielle.'
  },
  {
    id: '12',
    title: 'Portrait Minimal',
    category: 'portrait',
    style: 'minimalist',
    price: 279,
    imageUrl: artworkImages[11],
    artist: 'AI Artist',
    likes: 134,
    downloads: 25,
    description: 'Portrait contemporain au style minimaliste épuré.'
  }
]

// Category icons mapping
const categoryIcons: Record<string, any> = {
  african_art: Palette,
  modern_art: Sparkles,
  luxury_gold_art: Crown,
  office_decoration: Building2,
  hotel_decoration: Building2,
  bedroom_decoration: Home,
  living_room_decoration: Home,
  corporate_decoration: Building2,
  landscape: Camera,
  portrait: Users,
  abstract_art: Palette,
  art_3d: Wand2,
  fantasy: Sparkles,
}

// Category labels
const categoryLabels: Record<string, string> = {
  african_art: 'Art Africain',
  modern_art: 'Art Moderne',
  luxury_gold_art: 'Or Luxe',
  office_decoration: 'Bureau',
  hotel_decoration: 'Hôtel',
  bedroom_decoration: 'Chambre',
  living_room_decoration: 'Salon',
  corporate_decoration: 'Corporate',
  landscape: 'Paysage',
  portrait: 'Portrait',
  abstract_art: 'Abstract',
  art_3d: '3D Art',
  fantasy: 'Fantaisie',
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
          <Link href="/art-gallery" className="text-sm text-gold transition-colors">Galerie</Link>
          <Link href="/marketplace" className="text-sm text-gray-300 hover:text-gold transition-colors">Boutique</Link>
          <Link href="/ai-studio" className="text-sm text-gray-300 hover:text-gold transition-colors">IA Studio</Link>
        </div>
        <Link href="/login" className="glass-button text-sm">Connexion</Link>
      </div>
    </div>
  </nav>
)

// Artwork Card
const ArtworkCard = ({ 
  artwork, 
  onClick, 
  index,
  onAddToCart,
  onToggleLike,
  isInCart,
  isLiked
}: { 
  artwork: any; 
  onClick: () => void; 
  index: number;
  onAddToCart: (artwork: any) => void;
  onToggleLike: (id: string) => void;
  isInCart: boolean;
  isLiked: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="glass-premium rounded-2xl overflow-hidden card-premium-hover cursor-pointer group"
  >
    <div className="relative aspect-square overflow-hidden" onClick={onClick}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <button 
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          className="w-12 h-12 rounded-full bg-gold/20 backdrop-blur flex items-center justify-center text-gold hover:bg-gold/40 transition-all"
        >
          <ZoomIn className="w-6 h-6" />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onAddToCart(artwork); }}
          className={`w-12 h-12 rounded-full backdrop-blur flex items-center justify-center transition-all ${
            isInCart 
              ? 'bg-green-500/40 text-green-400' 
              : 'bg-gold/20 text-gold hover:bg-gold/40'
          }`}
        >
          {isInCart ? <Check className="w-6 h-6" /> : <ShoppingCart className="w-6 h-6" />}
        </button>
      </div>
      <div className="w-full h-full bg-premium-card flex items-center justify-center overflow-hidden">
        <img 
          src={artwork.imageUrl} 
          alt={artwork.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-4 left-4 badge-gold z-20">
        {categoryLabels[artwork.category] || artwork.category}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onToggleLike(artwork.id); }}
        className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur flex items-center justify-center z-20 transition-all ${
          isLiked 
            ? 'bg-red-500/40 text-red-400' 
            : 'bg-black/30 text-white/70 hover:text-red-400'
        }`}
      >
        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
      </button>
    </div>
    <div className="p-4" onClick={onClick}>
      <h3 className="text-white font-semibold mb-1">{artwork.title}</h3>
      <p className="text-gray-500 text-sm mb-3">par {artwork.artist}</p>
      <div className="flex items-center justify-between">
        <span className="text-gold font-bold text-xl">{artwork.price}€</span>
        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" /> {artwork.likes + (isLiked ? 1 : 0)}
          </span>
          <span className="flex items-center gap-1">
            <Download className="w-4 h-4" /> {artwork.downloads}
          </span>
        </div>
      </div>
    </div>
  </motion.div>
)

// Filter Section
const FilterSection = ({ 
  selectedCategory, 
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode
}: {
  selectedCategory: string
  setSelectedCategory: (cat: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  viewMode: 'grid' | 'list'
  setViewMode: (mode: 'grid' | 'list') => void
}) => {
  const categories = ['all', ...Object.keys(categoryLabels)]
  
  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher une oeuvre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-gold/50 focus:outline-none transition-colors"
        />
      </div>
      
      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-gold text-black'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {category === 'all' ? 'Tous' : categoryLabels[category]}
          </button>
        ))}
      </div>
      
      {/* View Mode */}
      <div className="flex justify-end">
        <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gold/20 text-gold' : 'text-gray-400 hover:text-white'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-gold/20 text-gold' : 'text-gray-400 hover:text-white'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

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
          <span className="gold-text">Galerie</span>
          <br />
          <span className="text-white">d'Art</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Découvrez notre collection exclusive d'oeuvres d'art générées par IA, 
          créées par nos artistes numériques avancés.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/ai-studio" className="btn-premium">
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Créer votre oeuvre
            </span>
          </Link>
          <Link href="/marketplace" className="btn-premium-outline">
            Acheter une oeuvre
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

export default function ArtGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null)
  const [cart, setCart] = useState<any[]>([])
  const [likedArtworks, setLikedArtworks] = useState<string[]>([])
  const [addedToCart, setAddedToCart] = useState<string | null>(null)
  
  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('artGalleryCart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    const savedLikes = localStorage.getItem('artGalleryLikes')
    if (savedLikes) {
      setLikedArtworks(JSON.parse(savedLikes))
    }
  }, [])
  
  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('artGalleryCart', JSON.stringify(cart))
  }, [cart])
  
  // Save likes to localStorage
  useEffect(() => {
    localStorage.setItem('artGalleryLikes', JSON.stringify(likedArtworks))
  }, [likedArtworks])
  
  const handleAddToCart = (artwork: any) => {
    if (cart.find(item => item.id === artwork.id)) {
      // Already in cart - remove it
      setCart(cart.filter(item => item.id !== artwork.id))
      setAddedToCart(null)
    } else {
      // Add to cart
      setCart([...cart, { ...artwork, quantity: 1 }])
      setAddedToCart(artwork.id)
      setTimeout(() => setAddedToCart(null), 2000)
    }
  }
  
  const handleToggleLike = (id: string) => {
    if (likedArtworks.includes(id)) {
      setLikedArtworks(likedArtworks.filter(l => l !== id))
    } else {
      setLikedArtworks([...likedArtworks, id])
    }
  }
  
  // Filter artworks
  const filteredArtworks = sampleArtworks.filter(artwork => {
    const matchesCategory = selectedCategory === 'all' || artwork.category === selectedCategory
    const matchesSearch = artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          artwork.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })
  
  return (
    <main className="min-h-screen bg-premium-black">
      <Navbar />
      <div className="pt-24">
        <Hero />
        
        <section className="py-10 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <FilterSection
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
            
            {filteredArtworks.length === 0 ? (
              <div className="text-center py-20">
                <Palette className="w-20 h-20 mx-auto text-gray-600 mb-4" />
                <h3 className="text-2xl text-white mb-2">Aucune oeuvre trouvée</h3>
                <p className="text-gray-400">Essayez avec d'autres critères de recherche</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredArtworks.map((artwork, index) => (
                  <ArtworkCard
                    key={artwork.id}
                    artwork={artwork}
                    index={index}
                    onClick={() => setSelectedArtwork(artwork)}
                    onAddToCart={handleAddToCart}
                    onToggleLike={handleToggleLike}
                    isInCart={!!cart.find(item => item.id === artwork.id)}
                    isLiked={likedArtworks.includes(artwork.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
        
        <Footer />
      </div>
      
      {/* Modal Preview */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedArtwork(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-premium rounded-2xl max-w-4xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                <div className="aspect-square bg-premium-card flex items-center justify-center overflow-hidden">
                  <img 
                    src={selectedArtwork.imageUrl} 
                    alt={selectedArtwork.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <button
                    onClick={() => setSelectedArtwork(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <span className="badge-gold mb-4">{categoryLabels[selectedArtwork.category]}</span>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedArtwork.title}</h2>
                  <p className="text-gray-400 mb-4">par {selectedArtwork.artist}</p>
                  
                  <p className="text-gray-300 mb-6">
                    {selectedArtwork.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-gold font-bold text-3xl">{selectedArtwork.price}€</span>
                    <span className="text-gray-500 line-through">{selectedArtwork.price * 1.5}€</span>
                    <span className="text-green-400 text-sm">-33%</span>
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={() => handleAddToCart(selectedArtwork)}
                      className={`btn-premium flex-1 ${cart.find(item => item.id === selectedArtwork.id) ? 'bg-green-500 hover:bg-green-600' : ''}`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {cart.find(item => item.id === selectedArtwork.id) ? (
                          <>
                            <Check className="w-5 h-5" />
                            Dans le panier
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-5 h-5" />
                            Ajouter au panier
                          </>
                        )}
                      </span>
                    </button>
                    <button 
                      onClick={() => handleToggleLike(selectedArtwork.id)}
                      className={`px-4 py-3 rounded-xl border transition-colors ${
                        likedArtworks.includes(selectedArtwork.id)
                          ? 'border-red-500/50 bg-red-500/10 text-red-400'
                          : 'border-gold/30 text-gold hover:bg-gold/10'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${likedArtworks.includes(selectedArtwork.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Heart className="w-4 h-4" /> {selectedArtwork.likes + (likedArtworks.includes(selectedArtwork.id) ? 1 : 0)}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Download className="w-4 h-4" /> {selectedArtwork.downloads}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
