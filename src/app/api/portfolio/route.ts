import { NextResponse } from 'next/server'

// Portfolio data - in production this would come from a database
const portfolioData = [
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

export async function GET() {
  try {
    return NextResponse.json(portfolioData)
  } catch (error) {
    console.error('Portfolio GET error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const newProject = {
      id: String(portfolioData.length + 1),
      ...body,
      createdAt: new Date().toISOString()
    }
    
    portfolioData.push(newProject)
    
    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error('Portfolio POST error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
