import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataFile = path.join(process.cwd(), 'src/lib/db/data/portfolio.json')

interface PortfolioItem {
  id: string
  title: string
  category: string
  image: string
  description: string
  tags: string[]
  icon: string
  client?: string
  year?: string
  createdAt?: string
  updatedAt?: string
}

// Initialize with default data if file doesn't exist
function getPortfolioData(): PortfolioItem[] {
  try {
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading portfolio:', error)
  }
  
  // Default data
  return [
    {
      id: '1',
      title: 'TechCorp E-commerce',
      category: 'E-commerce',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      description: 'Plateforme e-commerce complète avec paiement sécurisé',
      tags: ['Next.js', 'Stripe', 'Tailwind'],
      icon: 'ShoppingCart',
      client: 'TechCorp',
      year: '2025',
    },
    {
      id: '2',
      title: 'AfriTech Logo',
      category: 'Design Graphique',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop',
      description: 'Identité visuelle complète pour startup technologique',
      tags: ['Logo', 'Brand', 'Figma'],
      icon: 'Palette',
      client: 'AfriTech',
      year: '2025',
    },
    {
      id: '3',
      title: 'Finance Dashboard',
      category: 'Développement Web',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      description: 'Dashboard analytics pour gestion financière',
      tags: ['React', 'D3.js', 'API'],
      icon: 'Code',
      client: 'FinanceCorp',
      year: '2025',
    },
    {
      id: '4',
      title: 'HealthApp Mobile',
      category: 'Développement Mobile',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      description: 'Application mobile de suivi santé',
      tags: ['React Native', 'Firebase', 'Health API'],
      icon: 'Smartphone',
      client: 'HealthTech',
      year: '2025',
    },
    {
      id: '5',
      title: 'AI Chatbot',
      category: 'Intelligence Artificielle',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
      description: 'Assistant virtuel propulsé par LLM',
      tags: ['LLM', 'RAG', 'Vector DB'],
      icon: 'Brain',
      client: 'AI Solutions',
      year: '2025',
    },
    {
      id: '6',
      title: 'Brand Video',
      category: 'Production Vidéo',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop',
      description: 'Vidéo corporate avec motion design',
      tags: ['After Effects', 'Motion', '3D'],
      icon: 'Video',
      client: 'MediaCorp',
      year: '2025',
    },
  ]
}

function savePortfolioData(data: PortfolioItem[]) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2))
}

// GET all portfolio items or single item
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const category = searchParams.get('category')
    
    let portfolio = getPortfolioData()
    
    // Filter by ID
    if (id) {
      const item = portfolio.find(p => p.id === id)
      if (!item) {
        return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 })
      }
      return NextResponse.json(item)
    }
    
    // Filter by category
    if (category) {
      portfolio = portfolio.filter(p => p.category === category)
    }

    return NextResponse.json(portfolio)
  } catch (error) {
    console.error('Portfolio GET error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST create new portfolio item
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const portfolio = getPortfolioData()
    
    const newProject = {
      id: `portfolio-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString()
    }
    
    portfolio.push(newProject)
    savePortfolioData(portfolio)
    
    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error('Portfolio POST error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// PUT update portfolio item
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    const body = await request.json()
    const portfolio = getPortfolioData()
    
    const index = portfolio.findIndex(p => p.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 })
    }

    portfolio[index] = { ...portfolio[index], ...body, updatedAt: new Date().toISOString() }
    savePortfolioData(portfolio)
    
    return NextResponse.json(portfolio[index])
  } catch (error) {
    console.error('Portfolio PUT error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE portfolio item
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    const portfolio = getPortfolioData()
    const index = portfolio.findIndex(p => p.id === id)
    
    if (index === -1) {
      return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 })
    }

    portfolio.splice(index, 1)
    savePortfolioData(portfolio)
    
    return NextResponse.json({ message: 'Projet supprimé avec succès' })
  } catch (error) {
    console.error('Portfolio DELETE error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
