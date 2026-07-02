'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, Users, FileText, CreditCard, Settings, 
  BarChart3, MessageSquare, Bell, Search, Menu, X,
  TrendingUp, TrendingDown, DollarSign, Eye, MousePointer,
  Calendar, CheckCircle, Clock, AlertCircle, Bot, Activity,
  Database, Shield, Cloud, Code, Palette, Video, Mail
} from 'lucide-react'

// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
    { id: 'crm', icon: Users, label: 'CRM' },
    { id: 'projects', icon: FileText, label: 'Projets' },
    { id: 'invoices', icon: CreditCard, label: 'Factures' },
    { id: 'marketing', icon: BarChart3, label: 'Marketing' },
    { id: 'analytics', icon: Activity, label: 'Analytics' },
    { id: 'ai-agents', icon: Bot, label: 'Agents IA' },
    { id: 'automation', icon: Settings, label: 'Automatisations' },
    { id: 'support', icon: MessageSquare, label: 'Support' },
    { id: 'settings', icon: Settings, label: 'Paramètres' },
  ]

  return (
    <aside className="w-64 bg-premium-dark border-r border-white/5 min-h-screen p-4 hidden lg:block">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
            <span className="text-gold font-bold">E</span>
          </div>
          <div>
            <span className="text-white font-bold">Admin</span>
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
                ? 'bg-gold/10 text-gold' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

// Stats Card Component
const StatsCard = ({ title, value, change, icon: Icon, color }: { 
  title: string; 
  value: string; 
  change: string; 
  icon: any; 
  color: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-6"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
        color === 'gold' ? 'bg-gold/10 text-gold' :
        color === 'electric' ? 'bg-electric/10 text-electric' :
        color === 'violet' ? 'bg-violet-IA/10 text-violet-IA' :
        'bg-green-500/10 text-green-500'
      }`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className={`flex items-center gap-1 text-sm ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {change.startsWith('+') ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        {change}
      </div>
    </div>
    <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold text-white">{value}</p>
  </motion.div>
)

// Agent Status Card
const AgentStatus = ({ name, status, tasks, icon: Icon, color }: {
  name: string;
  status: 'active' | 'idle' | 'error';
  tasks: number;
  icon: any;
  color: string;
}) => (
  <div className="glass-card p-4 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
      color === 'gold' ? 'bg-gold/10' :
      color === 'electric' ? 'bg-electric/10' :
      'bg-violet-IA/10'
    }`}>
      <Icon className={`w-6 h-6 ${
        color === 'gold' ? 'text-gold' :
        color === 'electric' ? 'text-electric' :
        'text-violet-IA'
      }`} />
    </div>
    <div className="flex-1">
      <h4 className="text-white font-medium">{name}</h4>
      <p className="text-xs text-gray-400">{tasks} tâches en cours</p>
    </div>
    <div className={`w-3 h-3 rounded-full ${
      status === 'active' ? 'bg-green-500' :
      status === 'idle' ? 'bg-yellow-500' :
      'bg-red-500'
    }`}></div>
  </div>
)

// Dashboard Content
const DashboardContent = () => {
  const stats = [
    { title: 'Revenus du mois', value: '€12,450', change: '+12%', icon: DollarSign, color: 'gold' },
    { title: 'Visiteurs uniques', value: '3,847', change: '+8%', icon: Eye, color: 'electric' },
    { title: 'Nouveaux clients', value: '28', change: '+24%', icon: Users, color: 'violet' },
    { title: 'Projets actifs', value: '15', change: '+5%', icon: FileText, color: 'green' },
  ]

  const agents = [
    { name: 'CEO AI', status: 'active' as const, tasks: 3, icon: Bot, color: 'gold' },
    { name: 'Commercial AI', status: 'active' as const, tasks: 8, icon: Users, color: 'electric' },
    { name: 'Designer AI', status: 'active' as const, tasks: 5, icon: Palette, color: 'violet' },
    { name: 'Developer AI', status: 'idle' as const, tasks: 0, icon: Code, color: 'gold' },
    { name: 'Marketing AI', status: 'active' as const, tasks: 4, icon: BarChart3, color: 'electric' },
    { name: 'Support AI', status: 'active' as const, tasks: 12, icon: MessageSquare, color: 'violet' },
  ]

  const recentProjects = [
    { client: 'TechCorp Benin', project: 'Site E-commerce', status: 'En cours', progress: 75 },
    { client: 'AfriTech', project: 'Logo Premium', status: 'Terminé', progress: 100 },
    { client: 'StartUp Africa', project: 'App Mobile', status: 'En cours', progress: 45 },
    { client: 'Digital Agency', project: 'Dashboard CRM', status: 'En attente', progress: 10 },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Projects */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Projets récents</h3>
            <button className="text-sm text-gold hover:text-gold-light transition-colors">Voir tout</button>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-white font-medium">{project.client}</h4>
                    <p className="text-sm text-gray-400">{project.project}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    project.status === 'Terminé' ? 'bg-green-500/20 text-green-500' :
                    project.status === 'En cours' ? 'bg-blue-500/20 text-blue-500' :
                    'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-gold to-yellow-400 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Agents Status */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Agents IA</h3>
            <span className="text-xs text-green-500 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              6 actifs
            </span>
          </div>
          <div className="space-y-3">
            {agents.map((agent, i) => (
              <AgentStatus key={i} {...agent} />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { icon: FileText, label: 'Nouveau devis', color: 'gold' },
          { icon: Users, label: 'Nouveau client', color: 'electric' },
          { icon: Bot, label: 'Nouvelle tâche IA', color: 'violet' },
          { icon: Calendar, label: 'Planifier RDV', color: 'green' },
        ].map((action, i) => (
          <button key={i} className="glass-card p-4 flex items-center gap-4 hover:border-gold/30 transition-all group">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              action.color === 'gold' ? 'bg-gold/10 text-gold' :
              action.color === 'electric' ? 'bg-electric/10 text-electric' :
              action.color === 'violet' ? 'bg-violet-IA/10 text-violet-IA' :
              'bg-green-500/10 text-green-500'
            }`}>
              <action.icon className="w-5 h-5" />
            </div>
            <span className="text-white font-medium group-hover:text-gold transition-colors">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// Main Admin Page
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-premium-black flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1">
        {/* Header */}
        <header className="bg-premium-dark border-b border-white/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-white">
              {sidebarOpen ? <X /> : <Menu />}
            </button>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-gold/50 focus:outline-none w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-gold text-sm font-bold">A</span>
              </div>
              <span className="text-white text-sm hidden md:block">Administrateur</span>
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
