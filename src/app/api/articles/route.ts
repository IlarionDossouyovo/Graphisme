import { NextResponse } from 'next/server'
import { articles } from '@/lib/db/json-db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const recent = searchParams.get('recent')
    const search = searchParams.get('search')
    const slug = searchParams.get('slug')

    // Get single article by slug
    if (slug) {
      const article = articles.getBySlug(slug)
      if (!article) {
        return NextResponse.json({ error: 'Article non trouvé' }, { status: 404 })
      }
      // Increment views
      articles.incrementViews(article.id)
      return NextResponse.json(article)
    }

    // Filter by category
    if (category) {
      const categoryArticles = articles.getByCategory(category)
      return NextResponse.json(categoryArticles)
    }

    // Get featured articles
    if (featured === 'true') {
      const featuredArticles = articles.getFeatured()
      return NextResponse.json(featuredArticles)
    }

    // Get recent articles
    if (recent === 'true') {
      const limit = parseInt(searchParams.get('limit') || '5')
      const recentArticles = articles.getRecent(limit)
      return NextResponse.json(recentArticles)
    }

    // Search articles
    if (search) {
      const searchResults = articles.search(search)
      return NextResponse.json(searchResults)
    }

    // Get all articles
    const allArticles = articles.getAll()
    return NextResponse.json(allArticles)

  } catch (error) {
    console.error('Articles GET error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const slug = body.slug || body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

    const newArticle = articles.create({
      title: body.title,
      slug,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category,
      author: body.author,
      authorAvatar: body.authorAvatar,
      image: body.image || '/blog/default.jpg',
      featured: body.featured ?? false,
      publishedAt: body.publishedAt || new Date().toISOString(),
      readTime: body.readTime || 5,
      tags: body.tags || [],
      views: 0
    })

    return NextResponse.json(newArticle, { status: 201 })
  } catch (error) {
    console.error('Articles POST error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
