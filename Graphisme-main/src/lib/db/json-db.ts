// Simple JSON Database for Graphisme by ELECTRON
// No Prisma needed - uses local JSON files

import fs from 'fs'
import path from 'path'

const DB_DIR = path.join(process.cwd(), 'src', 'lib', 'db', 'data')

// Ensure DB directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true })
}

export interface User {
  id: string
  email: string
  name?: string
  password?: string
  role: string
  avatar?: string
  phone?: string
  company?: string
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  name: string
  description?: string
  service: string
  status: string
  progress: number
  budget?: number
  clientId: string
  startDate?: string
  endDate?: string
  createdAt: string
  updatedAt: string
}

export interface Quote {
  id: string
  quoteNumber: string
  title: string
  description?: string
  service: string
  amount: number
  status: string
  clientId: string
  projectId?: string
  validUntil?: string
  createdAt: string
  updatedAt: string
}

export interface Invoice {
  id: string
  invoiceNumber: string
  title: string
  description?: string
  amount: number
  taxAmount: number
  totalAmount: number
  status: string
  clientId: string
  projectId?: string
  dueDate?: string
  paidAt?: string
  createdAt: string
  updatedAt: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  content: string
  sender: string
  userId: string
  aiAgent?: string
  readAt?: string
  createdAt: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  price: number
  originalPrice?: number | null
  category: string
  subcategory: string
  images: string[]
  stock: number
  inStock: boolean
  featured: boolean
  newArrival: boolean
  tags: string[]
  dimensions?: string
  material?: string
  weight?: string
  createdAt: string
}

export interface Article {
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

// Helper functions
function readJson<T>(filename: string): T[] {
  const filepath = path.join(DB_DIR, filename)
  if (!fs.existsSync(filepath)) {
    return []
  }
  try {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'))
  } catch {
    return []
  }
}

function writeJson<T>(filename: string, data: T[]): void {
  const filepath = path.join(DB_DIR, filename)
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2))
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

function now(): string {
  return new Date().toISOString()
}

// Users
export const users = {
  getAll: () => readJson<User>('users.json'),
  
  getById: (id: string) => readJson<User>('users.json').find(u => u.id === id),
  
  getByEmail: (email: string) => readJson<User>('users.json').find(u => u.email === email),
  
  create: (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    const users = readJson<User>('users.json')
    const newUser: User = {
      ...user,
      id: generateId(),
      createdAt: now(),
      updatedAt: now()
    }
    users.push(newUser)
    writeJson('users.json', users)
    return newUser
  },
  
  update: (id: string, data: Partial<User>) => {
    const users = readJson<User>('users.json')
    const index = users.findIndex(u => u.id === id)
    if (index !== -1) {
      users[index] = { ...users[index], ...data, updatedAt: now() }
      writeJson('users.json', users)
      return users[index]
    }
    return null
  },
  
  delete: (id: string) => {
    const users = readJson<User>('users.json')
    const filtered = users.filter(u => u.id !== id)
    writeJson('users.json', filtered)
  }
}

// Projects
export const projects = {
  getAll: () => readJson<Project>('projects.json'),
  
  getById: (id: string) => readJson<Project>('projects.json').find(p => p.id === id),
  
  getByClient: (clientId: string) => readJson<Project>('projects.json').filter(p => p.clientId === clientId),
  
  create: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const projects = readJson<Project>('projects.json')
    const newProject: Project = {
      ...project,
      id: generateId(),
      createdAt: now(),
      updatedAt: now()
    }
    projects.push(newProject)
    writeJson('projects.json', projects)
    return newProject
  },
  
  update: (id: string, data: Partial<Project>) => {
    const projects = readJson<Project>('projects.json')
    const index = projects.findIndex(p => p.id === id)
    if (index !== -1) {
      projects[index] = { ...projects[index], ...data, updatedAt: now() }
      writeJson('projects.json', projects)
      return projects[index]
    }
    return null
  },
  
  delete: (id: string) => {
    const projects = readJson<Project>('projects.json')
    writeJson('projects.json', projects.filter(p => p.id !== id))
  }
}

// Quotes
export const quotes = {
  getAll: () => readJson<Quote>('quotes.json'),
  
  getById: (id: string) => readJson<Quote>('quotes.json').find(q => q.id === id),
  
  getByClient: (clientId: string) => readJson<Quote>('quotes.json').filter(q => q.clientId === clientId),
  
  create: (quote: Omit<Quote, 'id' | 'createdAt' | 'updatedAt'>) => {
    const quotes = readJson<Quote>('quotes.json')
    const newQuote: Quote = {
      ...quote,
      id: generateId(),
      createdAt: now(),
      updatedAt: now()
    }
    quotes.push(newQuote)
    writeJson('quotes.json', quotes)
    return newQuote
  },
  
  update: (id: string, data: Partial<Quote>) => {
    const quotes = readJson<Quote>('quotes.json')
    const index = quotes.findIndex(q => q.id === id)
    if (index !== -1) {
      quotes[index] = { ...quotes[index], ...data, updatedAt: now() }
      writeJson('quotes.json', quotes)
      return quotes[index]
    }
    return null
  },
  
  delete: (id: string) => {
    const quotes = readJson<Quote>('quotes.json')
    writeJson('quotes.json', quotes.filter(q => q.id !== id))
  }
}

// Invoices
export const invoices = {
  getAll: () => readJson<Invoice>('invoices.json'),
  
  getById: (id: string) => readJson<Invoice>('invoices.json').find(i => i.id === id),
  
  getByClient: (clientId: string) => readJson<Invoice>('invoices.json').filter(i => i.clientId === clientId),
  
  create: (invoice: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>) => {
    const invoices = readJson<Invoice>('invoices.json')
    const newInvoice: Invoice = {
      ...invoice,
      id: generateId(),
      createdAt: now(),
      updatedAt: now()
    }
    invoices.push(newInvoice)
    writeJson('invoices.json', invoices)
    return newInvoice
  },
  
  update: (id: string, data: Partial<Invoice>) => {
    const invoices = readJson<Invoice>('invoices.json')
    const index = invoices.findIndex(i => i.id === id)
    if (index !== -1) {
      invoices[index] = { ...invoices[index], ...data, updatedAt: now() }
      writeJson('invoices.json', invoices)
      return invoices[index]
    }
    return null
  },
  
  delete: (id: string) => {
    const invoices = readJson<Invoice>('invoices.json')
    writeJson('invoices.json', invoices.filter(i => i.id !== id))
  }
}

// Contact Submissions
export const contacts = {
  getAll: () => readJson<ContactSubmission>('contacts.json'),
  
  getById: (id: string) => readJson<ContactSubmission>('contacts.json').find(c => c.id === id),
  
  create: (contact: Omit<ContactSubmission, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const contacts = readJson<ContactSubmission>('contacts.json')
    const newContact: ContactSubmission = {
      ...contact,
      id: generateId(),
      status: 'NEW',
      createdAt: now(),
      updatedAt: now()
    }
    contacts.push(newContact)
    writeJson('contacts.json', contacts)
    return newContact
  },
  
  update: (id: string, data: Partial<ContactSubmission>) => {
    const contacts = readJson<ContactSubmission>('contacts.json')
    const index = contacts.findIndex(c => c.id === id)
    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...data, updatedAt: now() }
      writeJson('contacts.json', contacts)
      return contacts[index]
    }
    return null
  }
}

// Messages
export const messages = {
  getAll: () => readJson<Message>('messages.json'),
  
  getByUser: (userId: string) => readJson<Message>('messages.json').filter(m => m.userId === userId),
  
  create: (message: Omit<Message, 'id' | 'createdAt'>) => {
    const messages = readJson<Message>('messages.json')
    const newMessage: Message = {
      ...message,
      id: generateId(),
      createdAt: now()
    }
    messages.push(newMessage)
    writeJson('messages.json', messages)
    return newMessage
  }
}

// Products
export const products = {
  getAll: () => readJson<Product>('products.json'),
  
  getById: (id: string) => readJson<Product>('products.json').find(p => p.id === id),
  
  getBySlug: (slug: string) => readJson<Product>('products.json').find(p => p.slug === slug),
  
  getByCategory: (category: string) => readJson<Product>('products.json').filter(p => p.category === category),
  
  getFeatured: () => readJson<Product>('products.json').filter(p => p.featured),
  
  getNewArrivals: () => readJson<Product>('products.json').filter(p => p.newArrival),
  
  search: (query: string) => {
    const q = query.toLowerCase()
    return readJson<Product>('products.json').filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    )
  },
  
  create: (product: Omit<Product, 'id' | 'createdAt'>) => {
    const products = readJson<Product>('products.json')
    const newProduct: Product = {
      ...product,
      id: generateId(),
      createdAt: now()
    }
    products.push(newProduct)
    writeJson('products.json', products)
    return newProduct
  },
  
  update: (id: string, data: Partial<Product>) => {
    const products = readJson<Product>('products.json')
    const index = products.findIndex(p => p.id === id)
    if (index !== -1) {
      products[index] = { ...products[index], ...data }
      writeJson('products.json', products)
      return products[index]
    }
    return null
  },
  
  delete: (id: string) => {
    const products = readJson<Product>('products.json')
    writeJson('products.json', products.filter(p => p.id !== id))
  }
}

// Articles (Blog)
export const articles = {
  getAll: () => readJson<Article>('articles.json'),
  
  getById: (id: string) => readJson<Article>('articles.json').find(a => a.id === id),
  
  getBySlug: (slug: string) => readJson<Article>('articles.json').find(a => a.slug === slug),
  
  getByCategory: (category: string) => readJson<Article>('articles.json').filter(a => a.category === category),
  
  getFeatured: () => readJson<Article>('articles.json').filter(a => a.featured),
  
  getRecent: (limit: number = 5) => {
    return readJson<Article>('articles.json')
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit)
  },
  
  search: (query: string) => {
    const q = query.toLowerCase()
    return readJson<Article>('articles.json').filter(a => 
      a.title.toLowerCase().includes(q) || 
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    )
  },
  
  create: (article: Omit<Article, 'id'>) => {
    const articles = readJson<Article>('articles.json')
    const newArticle: Article = {
      ...article,
      id: generateId()
    }
    articles.push(newArticle)
    writeJson('articles.json', articles)
    return newArticle
  },
  
  update: (id: string, data: Partial<Article>) => {
    const articles = readJson<Article>('articles.json')
    const index = articles.findIndex(a => a.id === id)
    if (index !== -1) {
      articles[index] = { ...articles[index], ...data }
      writeJson('articles.json', articles)
      return articles[index]
    }
    return null
  },
  
  delete: (id: string) => {
    const articles = readJson<Article>('articles.json')
    writeJson('articles.json', articles.filter(a => a.id !== id))
  },
  
  incrementViews: (id: string) => {
    const articles = readJson<Article>('articles.json')
    const index = articles.findIndex(a => a.id === id)
    if (index !== -1) {
      articles[index].views += 1
      writeJson('articles.json', articles)
      return articles[index]
    }
    return null
  }
}
