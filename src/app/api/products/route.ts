import { NextResponse } from 'next/server'
import { products } from '@/lib/db/json-db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const news = searchParams.get('new')
    const search = searchParams.get('search')
    const slug = searchParams.get('slug')

    // Get single product by slug
    if (slug) {
      const product = products.getBySlug(slug)
      if (!product) {
        return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 })
      }
      return NextResponse.json(product)
    }

    // Filter by category
    if (category) {
      const categoryProducts = products.getByCategory(category)
      return NextResponse.json(categoryProducts)
    }

    // Get featured products
    if (featured === 'true') {
      const featuredProducts = products.getFeatured()
      return NextResponse.json(featuredProducts)
    }

    // Get new arrivals
    if (news === 'true') {
      const newProducts = products.getNewArrivals()
      return NextResponse.json(newProducts)
    }

    // Search products
    if (search) {
      const searchResults = products.search(search)
      return NextResponse.json(searchResults)
    }

    // Get all products
    const allProducts = products.getAll()
    return NextResponse.json(allProducts)

  } catch (error) {
    console.error('Products GET error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const newProduct = products.create({
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      description: body.description,
      shortDescription: body.shortDescription,
      price: body.price,
      originalPrice: body.originalPrice,
      category: body.category,
      subcategory: body.subcategory,
      images: body.images || [],
      stock: body.stock || 0,
      inStock: body.inStock ?? true,
      featured: body.featured ?? false,
      newArrival: body.newArrival ?? false,
      tags: body.tags || [],
      dimensions: body.dimensions,
      material: body.material,
      weight: body.weight
    })

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error('Products POST error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
