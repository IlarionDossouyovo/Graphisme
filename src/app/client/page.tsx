'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, FileText, CreditCard, MessageSquare, Download,
  Clock, CheckCircle, AlertCircle, ChevronRight, Bell, Search,
  User, Settings, LogOut, Folder, Calendar, Mail, Phone, Eye, X, Send
} from 'lucide-react'

interface Project {
  id: string
  name: string
  service: string
  status: 'En cours' | 'Terminé' | 'En attente'
  progress: number
  date: string
  description?: string
  client?: string
  price?: number
}

interface Quote {
  id: string
  date: string
  amount: number
  status: 'En attente' | 'Accepté' | 'Expiré'
  service?: string
  client?: string
}

interface Invoice {
  id: string
  date: string
  dueDate: string
  amount: number
  status: 'Payée' | 'En attente' | 'En retard'
  client?: string
  project?: string
}

interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message?: string
  createdAt: string
  status: 'new' | 'read' | 'replied'
}

interface UserData {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  role: string
  avatar?: string
  createdAt?: string
}

// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab, onLogout, user }: { activeTab: string; setActiveTab: (tab: string) => void; onLogout?: () => void; user?: UserData | null }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
    { id: 'projects', icon: Folder, label: 'Mes projets' },
    { id: 'quotes', icon: FileText, label: 'Devis' },
    { id: 'invoices', icon: CreditCard, label: 'Factures' },
    { id: 'downloads', icon: Download, label: 'Téléchargements' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'appointments', icon: Calendar, label: 'Rendez-vous' },
    { id: 'settings', icon: Settings, label: 'Paramètres' },
  ]

  return (
    <aside className="w-64 bg-premium-dark border-r border-white/5 min-h-screen p-4 hidden lg:block">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-electric/20 flex items-center justify-center">
            <span className="text-electric font-bold">{user?.name?.charAt(0) || 'C'}</span>
          </div>
          <div>
            <span className="text-white font-bold">{user?.name || 'Client'}</span>
            <span className="text-xs text-gray-400 block">Graphisme</span>
          </div>
        </div>
      </div>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-electric/10 text-electric' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="mt-8 pt-8 border-t border-white/5">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  )
}

// Stats Card
const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-6"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
      color === 'gold' ? 'bg-gold/10 text-gold' :
      color === 'electric' ? 'bg-electric/10 text-electric' :
      'bg-violet-IA/10 text-violet-IA'
    }`}>
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-gray-400 text-sm mb-1">{label}</h3>
    <p className="text-2xl font-bold text-white">{value}</p>
  </motion.div>
)

// Project Card
const ProjectCard = ({ name, service, status, progress, date }: {
  name: string;
  service: string;
  status: 'En cours' | 'Terminé' | 'En attente';
  progress: number;
  date?: string;
}) => (
  <div className="glass-card p-6">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h4 className="text-white font-semibold mb-1">{name}</h4>
        <p className="text-sm text-gray-400">{service}</p>
      </div>
      <span className={`text-xs px-3 py-1 rounded-full ${
        status === 'Terminé' ? 'bg-green-500/20 text-green-500' :
        status === 'En cours' ? 'bg-blue-500/20 text-blue-500' :
        'bg-yellow-500/20 text-yellow-500'
      }`}>
        {status}
      </span>
    </div>
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-400">Progression</span>
        <span className="text-white">{progress}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-electric to-cyan-400 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
    {date && (
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {date}
        </span>
        <button className="text-electric text-sm hover:text-electric-light transition-colors flex items-center gap-1">
          Détails <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    )}
  </div>
)

// Quote Card
const QuoteCard = ({ id, date, amount, status }: { id: string; date: string; amount: number; status: 'En attente' | 'Accepté' | 'Expiré' }) => (
  <div className="glass-card p-4 flex items-center gap-4">
    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
      <FileText className="w-5 h-5 text-gold" />
    </div>
    <div className="flex-1">
      <h4 className="text-white font-medium text-sm">{id}</h4>
      <p className="text-xs text-gray-400">{date}</p>
    </div>
    <div className="text-right">
      <p className="text-white font-semibold">{amount.toLocaleString('fr-FR')} XOF</p>
      <span className={`text-xs ${
        status === 'Accepté' ? 'text-green-500' :
        status === 'En attente' ? 'text-yellow-500' :
        'text-red-500'
      }`}>{status}</span>
    </div>
  </div>
)

// Invoice Card
const InvoiceCard = ({ id, date, amount, status }: { id: string; date: string; amount: number; status: 'Payée' | 'En attente' | 'En retard' }) => (
  <div className="glass-card p-4 flex items-center gap-4">
    <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center">
      <CreditCard className="w-5 h-5 text-electric" />
    </div>
    <div className="flex-1">
      <h4 className="text-white font-medium text-sm">{id}</h4>
      <p className="text-xs text-gray-400">{date}</p>
    </div>
    <div className="text-right">
      <p className="text-white font-semibold">{amount.toLocaleString('fr-FR')} XOF</p>
      <span className={`text-xs ${
        status === 'Payée' ? 'text-green-500' :
        status === 'En attente' ? 'text-yellow-500' :
        'text-red-500'
      }`}>{status}</span>
    </div>
  </div>
)

// Dashboard Content
const DashboardContent = ({ stats, projects, quotes, invoices, user }: { 
  stats: any[]; 
  projects: Project[]; 
  quotes: Quote[]; 
  invoices: Invoice[];
  user: UserData | null;
}) => {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 bg-gradient-to-r from-electric/10 to-violet-IA/10"
      >
        <h1 className="text-2xl font-bold text-white mb-2">Bienvenue, {user?.name || 'Client'} 👋</h1>
        <p className="text-gray-400 mb-4">Voici un aperçu de votre espace client.</p>
        <Link href="/contact" className="inline-block px-6 py-2 bg-electric text-black rounded-lg font-medium hover:bg-electric-light transition-colors">
          Nouveau projet
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Active Projects */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Mes projets</h3>
          </div>
          <div className="space-y-4">
            {projects.slice(0, 3).map((project, i) => (
              <ProjectCard key={i} {...project} />
            ))}
            {projects.length === 0 && (
              <p className="text-gray-400 text-center py-4">Aucun projet</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          {/* Quotes */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Devis</h3>
            </div>
            <div className="space-y-3">
              {quotes.slice(0, 2).map((quote, i) => (
                <QuoteCard key={i} {...quote} />
              ))}
              {quotes.length === 0 && (
                <p className="text-gray-400 text-center py-4">Aucun devis</p>
              )}
            </div>
          </div>

          {/* Invoices */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Factures</h3>
            </div>
            <div className="space-y-3">
              {invoices.slice(0, 2).map((invoice, i) => (
                <InvoiceCard key={i} {...invoice} />
              ))}
              {invoices.length === 0 && (
                <p className="text-gray-400 text-center py-4">Aucune facture</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Besoin d'aide ?</h3>
            <p className="text-gray-400 text-sm">Notre équipe IA est disponible 24/7 pour répondre à vos questions.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/ai-team" className="px-4 py-2 bg-electric/10 text-electric rounded-lg hover:bg-electric/20 transition-colors flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Chat
            </Link>
            <Link href="/contact" className="px-4 py-2 bg-gold/10 text-gold rounded-lg hover:bg-gold/20 transition-colors flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              RDV
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Projects Content
const ProjectsContent = ({ projects }: { projects: Project[] }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-white">Mes projets</h2>
      <Link href="/contact" className="px-4 py-2 bg-electric text-black rounded-lg font-medium hover:bg-electric-light">
        Nouveau projet
      </Link>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, i) => (
        <ProjectCard key={i} {...project} />
      ))}
    </div>
    {projects.length === 0 && (
      <div className="glass-card p-12 text-center">
        <Folder className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Aucun projet</h3>
        <p className="text-gray-400 mb-4">Commencez un nouveau projet avec nous</p>
        <Link href="/contact" className="px-6 py-2 bg-electric text-black rounded-lg font-medium inline-block">
          Demander un devis
        </Link>
      </div>
    )}
  </div>
)

// Quotes Content
const QuotesContent = ({ quotes }: { quotes: Quote[] }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white">Mes devis</h2>
    <div className="space-y-4">
      {quotes.map((quote, i) => (
        <QuoteCard key={i} {...quote} />
      ))}
    </div>
    {quotes.length === 0 && (
      <div className="glass-card p-12 text-center">
        <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Aucun devis</h3>
        <p className="text-gray-400">Demandez un devis pour votre projet</p>
      </div>
    )}
  </div>
)

// Invoices Content
const InvoicesContent = ({ invoices }: { invoices: Invoice[] }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white">Mes factures</h2>
    <div className="space-y-4">
      {invoices.map((invoice, i) => (
        <InvoiceCard key={i} {...invoice} />
      ))}
    </div>
    {invoices.length === 0 && (
      <div className="glass-card p-12 text-center">
        <CreditCard className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Aucune facture</h3>
        <p className="text-gray-400">Vos factures apparaîtront ici</p>
      </div>
    )}
  </div>
)

// Messages Content
const MessagesContent = ({ contacts }: { contacts: Contact[] }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white">Messages</h2>
    <div className="space-y-4">
      {contacts.map((contact, i) => (
        <div key={i} className="glass-card p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-electric/20 flex items-center justify-center">
            <User className="w-6 h-6 text-electric" />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-medium">{contact.name}</h4>
            <p className="text-gray-400 text-sm">{contact.message?.substring(0, 50)}...</p>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full ${
            contact.status === 'new' ? 'bg-blue-500/20 text-blue-500' :
            contact.status === 'read' ? 'bg-green-500/20 text-green-500' :
            'bg-gray-500/20 text-gray-500'
          }`}>
            {contact.status === 'new' ? 'Nouveau' : contact.status === 'read' ? 'Lu' : 'Répondu'}
          </span>
        </div>
      ))}
    </div>
    {contacts.length === 0 && (
      <div className="glass-card p-12 text-center">
        <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Aucun message</h3>
        <p className="text-gray-400">Vos messages apparaîtront ici</p>
      </div>
    )}
  </div>
)

// Load data from JSON files
const loadData = async () => {
  try {
    const [projectsRes, quotesRes, invoicesRes, contactsRes, usersRes] = await Promise.all([
      fetch('/api/projects'),
      fetch('/api/quotes'),
      fetch('/api/invoices'),
      fetch('/api/contacts'),
      fetch('/api/users')
    ])
    
    const projects: Project[] = await projectsRes.json()
    const quotes: Quote[] = await quotesRes.json()
    const invoices: Invoice[] = await invoicesRes.json()
    const contacts: Contact[] = await contactsRes.json()
    const users: UserData[] = await usersRes.json()
    
    return { projects, quotes, invoices, contacts, users }
  } catch (error) {
    console.error('Error loading data:', error)
    return { projects: [], quotes: [], invoices: [], contacts: [], users: [] }
  }
}

// Main Client Page
export default function ClientPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [projects, setProjects] = useState<Project[]>([])
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<UserData | null>(null)
  
  // Mock user - in production this would come from auth
  const currentUserId = 'user-001'

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadData()
      setProjects(data.projects.slice(0, 5))
      setQuotes(data.quotes.slice(0, 5))
      setInvoices(data.invoices.slice(0, 5))
      setContacts(data.contacts.filter(c => c.status === 'new').slice(0, 5))
      
      // Set current user
      const foundUser = data.users.find(u => u.id === currentUserId)
      if (foundUser) {
        setUser(foundUser)
      } else if (data.users.length > 0) {
        setUser(data.users[0])
      }
      
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const handleLogout = () => {
    router.push('/login')
  }

  const stats = [
    { icon: Folder, label: 'Projets actifs', value: projects.filter(p => p.status === 'En cours').length.toString(), color: 'gold' },
    { icon: FileText, label: 'Devis en attente', value: quotes.filter(q => q.status === 'En attente').length.toString(), color: 'electric' },
    { icon: CreditCard, label: 'Factures impayées', value: invoices.filter(i => i.status === 'En attente').length.toString(), color: 'violet' },
    { icon: MessageSquare, label: 'Messages non lus', value: contacts.filter(c => c.status === 'new').length.toString(), color: 'gold' },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent stats={stats} projects={projects} quotes={quotes} invoices={invoices} user={user} />
      case 'projects':
        return <ProjectsContent projects={projects} />
      case 'quotes':
        return <QuotesContent quotes={quotes} />
      case 'invoices':
        return <InvoicesContent invoices={invoices} />
      case 'messages':
        return <MessagesContent contacts={contacts} />
      default:
        return <DashboardContent stats={stats} projects={projects} quotes={quotes} invoices={invoices} user={user} />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-premium-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-premium-black flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} user={user} />
      
      <main className="flex-1">
        {/* Header */}
        <header className="bg-premium-dark border-b border-white/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-electric/50 focus:outline-none w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-electric rounded-full"></span>
            </button>
            <Link href="/" className="text-gray-400 hover:text-white text-sm">Retour au site</Link>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}
