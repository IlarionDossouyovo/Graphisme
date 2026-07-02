'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, FileText, CreditCard, MessageSquare, Download,
  Clock, CheckCircle, AlertCircle, ChevronRight, Bell, Search,
  User, Settings, LogOut, Folder, Calendar, Mail, Phone
} from 'lucide-react'

// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
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
            <span className="text-electric font-bold">C</span>
          </div>
          <div>
            <span className="text-white font-bold">Client</span>
            <span className="text-xs text-gray-400 block">E-Graphisme</span>
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
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all">
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
  date: string;
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
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-500 flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {date}
      </span>
      <button className="text-electric text-sm hover:text-electric-light transition-colors flex items-center gap-1">
        Détails <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
)

// Quote Card
const QuoteCard = ({ id, date, amount, status }: { id: string; date: string; amount: string; status: 'En attente' | 'Accepté' | 'Expiré' }) => (
  <div className="glass-card p-4 flex items-center gap-4">
    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
      <FileText className="w-5 h-5 text-gold" />
    </div>
    <div className="flex-1">
      <h4 className="text-white font-medium text-sm">{id}</h4>
      <p className="text-xs text-gray-400">{date}</p>
    </div>
    <div className="text-right">
      <p className="text-white font-semibold">{amount}</p>
      <span className={`text-xs ${
        status === 'Accepté' ? 'text-green-500' :
        status === 'En attente' ? 'text-yellow-500' :
        'text-red-500'
      }`}>{status}</span>
    </div>
  </div>
)

// Invoice Card
const InvoiceCard = ({ id, date, amount, status }: { id: string; date: string; amount: string; status: 'Payée' | 'En attente' | 'En retard' }) => (
  <div className="glass-card p-4 flex items-center gap-4">
    <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center">
      <CreditCard className="w-5 h-5 text-electric" />
    </div>
    <div className="flex-1">
      <h4 className="text-white font-medium text-sm">{id}</h4>
      <p className="text-xs text-gray-400">{date}</p>
    </div>
    <div className="text-right">
      <p className="text-white font-semibold">{amount}</p>
      <span className={`text-xs ${
        status === 'Payée' ? 'text-green-500' :
        status === 'En attente' ? 'text-yellow-500' :
        'text-red-500'
      }`}>{status}</span>
    </div>
  </div>
)

// Dashboard Content
const DashboardContent = () => {
  const stats = [
    { icon: Folder, label: 'Projets actifs', value: '3', color: 'gold' },
    { icon: FileText, label: 'Devis en attente', value: '2', color: 'electric' },
    { icon: CreditCard, label: 'Factures impayées', value: '0', color: 'violet' },
    { icon: MessageSquare, label: 'Messages non lus', value: '1', color: 'gold' },
  ]

  const projects = [
    { name: 'Site E-commerce TechCorp', service: 'Développement Web', status: 'En cours' as const, progress: 75, date: 'Mise à jour: Il y a 2h' },
    { name: 'Logo Premium', service: 'Design Graphique', status: 'Terminé' as const, progress: 100, date: 'Terminé: 15 Jan 2026' },
    { name: 'Application Mobile', service: 'Développement Mobile', status: 'En cours' as const, progress: 30, date: 'Mise à jour: Il y a 1j' },
  ]

  const quotes = [
    { id: 'DEV-2026-0142', date: '28 Jan 2026', amount: '€1,250', status: 'En attente' as const },
    { id: 'DEV-2026-0141', date: '25 Jan 2026', amount: '€890', status: 'Accepté' as const },
  ]

  const invoices = [
    { id: 'FAC-2026-0089', date: '20 Jan 2026', amount: '€450', status: 'Payée' as const },
    { id: 'FAC-2026-0088', date: '15 Jan 2026', amount: '€890', status: 'Payée' as const },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 bg-gradient-to-r from-electric/10 to-violet-IA/10"
      >
        <h1 className="text-2xl font-bold text-white mb-2">Bienvenue, Jean Dupont 👋</h1>
        <p className="text-gray-400 mb-4">Voici un aperçu de votre espace client.</p>
        <button className="px-6 py-2 bg-electric text-black rounded-lg font-medium hover:bg-electric-light transition-colors">
          Nouveau projet
        </button>
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
            <button className="text-sm text-electric hover:text-electric-light transition-colors">Voir tout</button>
          </div>
          <div className="space-y-4">
            {projects.map((project, i) => (
              <ProjectCard key={i} {...project} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          {/* Quotes */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Devis</h3>
              <button className="text-sm text-gold hover:text-gold-light transition-colors">Voir tout</button>
            </div>
            <div className="space-y-3">
              {quotes.map((quote, i) => (
                <QuoteCard key={i} {...quote} />
              ))}
            </div>
          </div>

          {/* Invoices */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Factures</h3>
              <button className="text-sm text-gold hover:text-gold-light transition-colors">Voir tout</button>
            </div>
            <div className="space-y-3">
              {invoices.map((invoice, i) => (
                <InvoiceCard key={i} {...invoice} />
              ))}
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
            <button className="px-4 py-2 bg-electric/10 text-electric rounded-lg hover:bg-electric/20 transition-colors flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Chat
            </button>
            <button className="px-4 py-2 bg-gold/10 text-gold rounded-lg hover:bg-gold/20 transition-colors flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              RDV
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Client Page
export default function ClientPage() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-premium-black flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
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
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-electric/20 flex items-center justify-center">
                <span className="text-electric text-sm font-bold">JD</span>
              </div>
              <span className="text-white text-sm hidden md:block">Jean Dupont</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          <DashboardContent />
        </div>
      </main>
    </div>
  )
}
