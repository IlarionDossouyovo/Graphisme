'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  Calendar, Clock, Eye, ArrowLeft, ArrowRight, Share2, Heart, 
  ChevronRight, User, MessageCircle, Home, ShoppingCart
} from 'lucide-react'
import CartButton from '@/components/cart-button'
import Navbar from '@/components/Navigation'

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
          <Link href="/blog" className="text-sm text-gold transition-colors">Blog</Link>
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

// Article Detail Content
function ArticleDetailContent() {
  const params = useParams()
  const slug = params.slug as string
  
  const [article, setArticle] = useState<Article | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/articles?slug=${slug}`)
        if (res.ok) {
          const data = await res.json()
          setArticle(data)
          
          // Fetch related articles
          const allRes = await fetch(`/api/articles?category=${data.category}`)
          const allData = await allRes.json()
          // Get 3 related articles (excluding current)
          const related = allData.filter((a: Article) => a.id !== data.id).slice(0, 3)
          setRelatedArticles(related)
        }
      } catch (error) {
        console.error('Error fetching article:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchArticle()
  }, [slug])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-premium-black pt-24">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-white/5 rounded w-1/4"></div>
            <div className="h-12 bg-white/5 rounded w-3/4"></div>
            <div className="h-6 bg-white/5 rounded w-1/2"></div>
            <div className="h-96 bg-white/5 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-premium-black">
        <Navbar />
        <div className="pt-24">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h1 className="text-2xl font-bold text-white mb-4">Article non trouvé</h1>
          <Link href="/blog" className="glass-button inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-premium-black">
      <Navbar />
      <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gold truncate max-w-[200px]">{article.title}</span>
        </div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-gold/20 text-gold text-xs font-semibold rounded-full">
              {article.category}
            </span>
            {article.featured && (
              <span className="px-3 py-1 bg-violet-IA/20 text-violet-IA text-xs font-semibold rounded-full">
                Article mis en avant
              </span>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {article.title}
          </h1>
          
          <p className="text-xl text-gray-400 mb-6">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <User className="w-5 h-5 text-gold" />
              </div>
              <span className="text-white">{article.author}</span>
            </div>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime} min de lecture
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {article.views} vues
            </span>
          </div>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="aspect-video bg-gradient-to-br from-violet-IA/20 to-electric/20 rounded-2xl flex items-center justify-center mb-12"
        >
          <span className="text-[120px]">📄</span>
        </motion.div>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none mb-12"
        >
          <div className="text-gray-300 leading-relaxed space-y-6">
            {article.content.split('\n\n').map((paragraph, idx) => {
              // Check if it's a heading
              if (paragraph.startsWith('## ')) {
                return <h2 key={idx} className="text-2xl font-bold text-white mt-8 mb-4">{paragraph.replace('## ', '')}</h2>
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={idx} className="text-xl font-bold text-white mt-6 mb-3">{paragraph.replace('### ', '')}</h3>
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={idx} className="list-disc list-inside space-y-2 ml-4">
                    <li>{paragraph.replace('- ', '')}</li>
                  </ul>
                )
              }
              if (paragraph.startsWith('1. ')) {
                return (
                  <ol key={idx} className="list-decimal list-inside space-y-2 ml-4">
                    <li>{paragraph.replace(/^\d+\. /, '')}</li>
                  </ol>
                )
              }
              return <p key={idx}>{paragraph}</p>
            })}
          </div>
        </motion.article>

        {/* Tags */}
        {article.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-white/10"
          >
            {article.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 bg-white/5 text-gray-400 text-sm rounded-full">
                #{tag}
              </span>
            ))}
          </motion.div>
        )}

        {/* Share & Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-gray-400 hover:text-gold hover:bg-white/10 transition-colors">
              <Share2 className="w-4 h-4" />
              Partager
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-white/10 transition-colors">
              <Heart className="w-4 h-4" />
              J'aime
            </button>
          </div>
        </motion.div>

        {/* Navigation Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-4 mb-12 pt-8 border-t border-white/10"
        >
          <Link href="/blog" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
          <Link href="/shop" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
            <ShoppingCart className="w-4 h-4" />
            Voir la boutique
          </Link>
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
            <Home className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </motion.div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Articles similaires</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link key={related.id} href={`/blog/${related.slug}`} className="glass-card p-4 group">
                  <div className="aspect-video bg-gradient-to-br from-premium-dark to-premium-card rounded-lg mb-3 flex items-center justify-center group-hover:from-violet-IA/10 group-hover:to-electric/10 transition-colors">
                    <span className="text-4xl">📄</span>
                  </div>
                  <h3 className="text-white font-medium text-sm line-clamp-2 group-hover:text-gold transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">{related.readTime} min</p>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}

// Main Page Component with Suspense
export default function ArticleDetailPage() {
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
        <ArticleDetailContent />
      </Suspense>
      
      {/* Footer */}
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
