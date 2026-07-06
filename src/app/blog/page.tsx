'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Search, Calendar, Clock, Eye, ArrowRight, ChevronRight,
  User, MessageCircle
} from 'lucide-react'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  author: string
  authorAvatar?: string | null
  image: string
  featured: boolean
  publishedAt: string
  readTime: number
  tags: string[]
  views: number
}

const categories = [
  { id: 'all', name: 'Tous les articles' },
  { id: 'Tendances', name: 'Tendances' },
  { id: 'Guide', name: 'Guides' },
  { id: 'Art de Vivre', name: 'Art de Vivre' },
  { id: 'Guide Pratique', name: 'Guide Pratique' },
  { id: 'Culture', name: 'Culture' },
  { id: 'Inspiration', name: 'Inspiration' },
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
            <Link href="/shop" className="text-sm text-gray-300 hover:text-gold transition-colors">Boutique</Link>
            <Link href="/blog" className="text-sm text-gold transition-colors">Blog</Link>
            <Link href="/portfolio" className="text-sm text-gray-300 hover:text-gold transition-colors">Portfolio</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="glass-button text-sm py-2 px-4">Connexion</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Featured Article
const FeaturedArticle = ({ article }: { article: Article }) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden"
    >
      <div className="grid md:grid-cols-2">
        <div className="aspect-video md:aspect-auto bg-gradient-to-br from-violet-IA/20 to-electric/20 flex items-center justify-center">
          <span className="text-[100px]">📰</span>
        </div>
        <div className="p-8 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-gold/20 text-gold text-xs font-semibold rounded-full">
              {article.category}
            </span>
            {article.featured && (
              <span className="px-3 py-1 bg-violet-IA/20 text-violet-IA text-xs font-semibold rounded-full">
                Featured
              </span>
            )}
          </div>
          <Link href={`/blog/${article.slug}`}>
            <h2 className="text-2xl font-bold text-white mb-3 hover:text-gold transition-colors">
              {article.title}
            </h2>
          </Link>
          <p className="text-gray-400 mb-4 line-clamp-2">{article.excerpt}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(article.publishedAt)}
              </span>
            </div>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime} min
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

// Article Card
const ArticleCard = ({ article }: { article: Article }) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden group"
    >
      <div className="aspect-video bg-gradient-to-br from-premium-dark to-premium-card flex items-center justify-center group-hover:from-violet-IA/10 group-hover:to-electric/10 transition-colors">
        <span className="text-[80px]">📄</span>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-gold/10 text-gold text-xs font-semibold rounded">
            {article.category}
          </span>
        </div>
        <Link href={`/blog/${article.slug}`}>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{formatDate(article.publishedAt)}</span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {article.views}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

// Main Blog Page
export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null)
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/articles')
        const data = await res.json()
        
        // Get featured article
        const featured = data.find((a: Article) => a.featured)
        setFeaturedArticle(featured || null)
        
        // Set all articles
        setArticles(data)
        setFilteredArticles(data)
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchArticles()
  }, [])

  useEffect(() => {
    let result = [...articles]

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(a => a.category === selectedCategory)
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(a => 
        a.title.toLowerCase().includes(query) || 
        a.excerpt.toLowerCase().includes(query) ||
        a.tags.some(t => t.toLowerCase().includes(query))
      )
    }

    // Remove featured from list if showing
    if (featuredArticle) {
      result = result.filter(a => a.id !== featuredArticle.id)
    }

    setFilteredArticles(result)
  }, [articles, selectedCategory, searchQuery, featuredArticle])

  return (
    <div className="min-h-screen bg-premium-black">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-IA/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Notre <span className="violet-text">Blog</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Actualités, conseils et inspirations pour votre intérieur et vos projets digitaux.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Featured Article */}
          {featuredArticle && !searchQuery && selectedCategory === 'all' && (
            <div className="mb-12">
              <FeaturedArticle article={featuredArticle} />
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-gold text-black font-semibold'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-white text-sm focus:border-gold/50 focus:outline-none"
              />
            </div>
          </div>

          {/* Articles Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-card animate-pulse">
                  <div className="aspect-video bg-white/5"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-white/5 rounded w-1/3"></div>
                    <div className="h-5 bg-white/5 rounded w-3/4"></div>
                    <div className="h-4 bg-white/5 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-white mb-2">Aucun article trouvé</h3>
              <p className="text-gray-400 mb-6">Essayez avec d'autres critères de recherche</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="glass-button inline-flex items-center gap-2"
              >
                Voir tous les articles
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-premium-dark border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Restez informé</h2>
          <p className="text-gray-400 mb-6">
            Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités et offres spéciales.
          </p>
          <form className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold/50 focus:outline-none"
            />
            <button type="submit" className="glass-button glow-gold px-6">
              S'inscrire
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-premium-black border-t border-white/5 py-12">
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
