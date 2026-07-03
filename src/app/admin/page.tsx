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

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />
      case 'ai-agents':
        return <AIAgentsContent />
      case 'crm':
        return <CRMContent />
      case 'projects':
        return <ProjectsContent />
      case 'invoices':
        return <InvoicesContent />
      case 'marketing':
        return <MarketingContent />
      case 'analytics':
        return <AnalyticsContent />
      case 'support':
        return <SupportContent />
      case 'settings':
        return <SettingsContent />
      default:
        return <DashboardContent />
    }
  }

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
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

// AI Agents Content
const AIAgentsContent = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white">Agents IA</h1>
      <button className="glass-button">Ajouter un agent</button>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { name: 'CEO AI', status: 'active', tasks: 3, icon: Bot, color: 'gold' },
        { name: 'Commercial AI', status: 'active', tasks: 8, icon: Users, color: 'electric' },
        { name: 'Designer AI', status: 'active', tasks: 5, icon: Palette, color: 'violet' },
        { name: 'Developer AI', status: 'idle', tasks: 0, icon: Code, color: 'blue' },
        { name: 'Marketing AI', status: 'active', tasks: 4, icon: BarChart3, color: 'electric' },
        { name: 'Support AI', status: 'active', tasks: 12, icon: MessageSquare, color: 'violet' },
      ].map((agent, i) => (
        <div key={i} className="glass-card p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              agent.color === 'gold' ? 'bg-gold/10' : agent.color === 'electric' ? 'bg-electric/10' : 'bg-violet-IA/10'
            }`}>
              <agent.icon className={`w-6 h-6 ${
                agent.color === 'gold' ? 'text-gold' : agent.color === 'electric' ? 'text-electric' : 'text-violet-IA'
              }`} />
            </div>
            <div>
              <h3 className="font-bold text-white">{agent.name}</h3>
              <p className="text-xs text-gray-400">{agent.tasks} tâches actives</p>
            </div>
            <div className={`ml-auto w-3 h-3 rounded-full ${
              agent.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
            }`}></div>
          </div>
          <button className="w-full py-2 bg-white/5 rounded-lg text-sm text-gray-400 hover:text-white transition-colors">
            Configurer
          </button>
        </div>
      ))}
    </div>
  </div>
)

// CRM Content
const CRMContent = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white">CRM - Gestion Clients</h1>
      <button className="glass-button">Nouveau client</button>
    </div>
    <div className="glass-card overflow-hidden">
      <table className="w-full">
        <thead className="bg-white/5">
          <tr>
            <th className="text-left p-4 text-gray-400 text-sm">Client</th>
            <th className="text-left p-4 text-gray-400 text-sm">Email</th>
            <th className="text-left p-4 text-gray-400 text-sm">Téléphone</th>
            <th className="text-left p-4 text-gray-400 text-sm">Statut</th>
            <th className="text-left p-4 text-gray-400 text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: 'TechCorp Benin', email: 'contact@techcorp.bj', phone: '+229 XX XXX XXXX', status: 'Actif' },
            { name: 'AfriTech', email: 'hello@afritech.com', phone: '+229 XX XXX XXXX', status: 'Actif' },
            { name: 'StartUp Africa', email: 'info@startup.africa', phone: '+229 XX XXX XXXX', status: 'Prospect' },
          ].map((client, i) => (
            <tr key={i} className="border-t border-white/5">
              <td className="p-4 text-white font-medium">{client.name}</td>
              <td className="p-4 text-gray-400">{client.email}</td>
              <td className="p-4 text-gray-400">{client.phone}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  client.status === 'Actif' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                }`}>{client.status}</span>
              </td>
              <td className="p-4">
                <button className="text-gold text-sm hover:underline">Voir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

// Projects Content
const ProjectsContent = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white">Projets</h1>
      <button className="glass-button">Nouveau projet</button>
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      {[
        { client: 'TechCorp Benin', project: 'Site E-commerce', status: 'En cours', progress: 75 },
        { client: 'AfriTech', project: 'Logo Premium', status: 'Terminé', progress: 100 },
        { client: 'StartUp Africa', project: 'App Mobile', status: 'En cours', progress: 45 },
        { client: 'Digital Agency', project: 'Dashboard CRM', status: 'En attente', progress: 10 },
      ].map((project, i) => (
        <div key={i} className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">{project.client}</h3>
            <span className={`px-3 py-1 rounded-full text-xs ${
              project.status === 'Terminé' ? 'bg-green-500/20 text-green-500' :
              project.status === 'En cours' ? 'bg-blue-500/20 text-blue-500' :
              'bg-yellow-500/20 text-yellow-500'
            }`}>{project.status}</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">{project.project}</p>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-gold to-yellow-400" style={{ width: `${project.progress}%` }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{project.progress}%</p>
        </div>
      ))}
    </div>
  </div>
)

// Invoices Content
const InvoicesContent = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white">Factures</h1>
      <button className="glass-button">Nouvelle facture</button>
    </div>
    <div className="glass-card overflow-hidden">
      <table className="w-full">
        <thead className="bg-white/5">
          <tr>
            <th className="text-left p-4 text-gray-400 text-sm">N°</th>
            <th className="text-left p-4 text-gray-400 text-sm">Client</th>
            <th className="text-left p-4 text-gray-400 text-sm">Montant</th>
            <th className="text-left p-4 text-gray-400 text-sm">Date</th>
            <th className="text-left p-4 text-gray-400 text-sm">Statut</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: 'FAC-001', client: 'TechCorp Benin', amount: '€1,500', date: '15/01/2025', status: 'Payée' },
            { id: 'FAC-002', client: 'AfriTech', amount: '€800', date: '20/01/2025', status: 'En attente' },
            { id: 'FAC-003', client: 'StartUp Africa', amount: '€2,200', date: '25/01/2025', status: 'En retard' },
          ].map((inv, i) => (
            <tr key={i} className="border-t border-white/5">
              <td className="p-4 text-white font-medium">{inv.id}</td>
              <td className="p-4 text-gray-400">{inv.client}</td>
              <td className="p-4 text-gold font-bold">{inv.amount}</td>
              <td className="p-4 text-gray-400">{inv.date}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  inv.status === 'Payée' ? 'bg-green-500/20 text-green-500' :
                  inv.status === 'En attente' ? 'bg-yellow-500/20 text-yellow-500' :
                  'bg-red-500/20 text-red-500'
                }`}>{inv.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

// Marketing Content
const MarketingContent = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-white">Marketing</h1>
    <div className="grid md:grid-cols-3 gap-4">
      <div className="glass-card p-6">
        <h3 className="text-gray-400 text-sm mb-2">Campagnes actives</h3>
        <p className="text-3xl font-bold text-white">5</p>
      </div>
      <div className="glass-card p-6">
        <h3 className="text-gray-400 text-sm mb-2">Budget total</h3>
        <p className="text-3xl font-bold text-gold">€3,500</p>
      </div>
      <div className="glass-card p-6">
        <h3 className="text-gray-400 text-sm mb-2">ROI moyen</h3>
        <p className="text-3xl font-bold text-green-500">+145%</p>
      </div>
    </div>
    <div className="glass-card p-6">
      <h3 className="font-bold text-white mb-4">Campagnes en cours</h3>
      {[
        { name: 'Facebook Ads - Q1 2025', budget: '€1,000', spent: '€650', leads: 45 },
        { name: 'Google Ads - Branding', budget: '€1,500', spent: '€1,200', leads: 78 },
        { name: 'Instagram - Engagement', budget: '€1,000', spent: '€400', leads: 32 },
      ].map((camp, i) => (
        <div key={i} className="py-3 border-b border-white/5 last:border-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">{camp.name}</span>
            <span className="text-gold">{camp.leads} leads</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gold" style={{ width: `${(parseInt(camp.spent.replace('€','')) / parseInt(camp.budget.replace('€',''))) * 100}%` }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{camp.spent} / {camp.budget}</p>
        </div>
      ))}
    </div>
  </div>
)

// Analytics Content
const AnalyticsContent = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-white">Analytics</h1>
    <div className="grid md:grid-cols-4 gap-4">
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          <Eye className="w-4 h-4" />
          <span className="text-sm">Visiteurs</span>
        </div>
        <p className="text-3xl font-bold text-white">12,847</p>
        <p className="text-xs text-green-500">+15% ce mois</p>
      </div>
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          <FileText className="w-4 h-4" />
          <span className="text-sm">Pages vues</span>
        </div>
        <p className="text-3xl font-bold text-white">45,230</p>
        <p className="text-xs text-green-500">+8% ce mois</p>
      </div>
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Temps moyen</span>
        </div>
        <p className="text-3xl font-bold text-white">3:24</p>
        <p className="text-xs text-green-500">+12% ce mois</p>
      </div>
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          <MousePointer className="w-4 h-4" />
          <span className="text-sm">Taux de rebond</span>
        </div>
        <p className="text-3xl font-bold text-white">32%</p>
        <p className="text-xs text-green-500">-5% ce mois</p>
      </div>
    </div>
    <div className="glass-card p-6">
      <h3 className="font-bold text-white mb-4">Top pages</h3>
      {[
        { page: '/', views: 4500, change: '+12%' },
        { page: '/services', views: 3200, change: '+8%' },
        { page: '/portfolio', views: 2800, change: '+15%' },
        { page: '/contact', views: 2100, change: '+22%' },
      ].map((p, i) => (
        <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
          <span className="text-white">{p.page}</span>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">{p.views} vues</span>
            <span className="text-green-500 text-sm">{p.change}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
)

// Support Content
const SupportContent = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white">Support</h1>
      <button className="glass-button">Nouveau ticket</button>
    </div>
    <div className="grid md:grid-cols-3 gap-4">
      <div className="glass-card p-6">
        <h3 className="text-gray-400 text-sm mb-2">Tickets ouverts</h3>
        <p className="text-3xl font-bold text-yellow-500">8</p>
      </div>
      <div className="glass-card p-6">
        <h3 className="text-gray-400 text-sm mb-2">En attente</h3>
        <p className="text-3xl font-bold text-blue-500">3</p>
      </div>
      <div className="glass-card p-6">
        <h3 className="text-gray-400 text-sm mb-2">Résolus (30j)</h3>
        <p className="text-3xl font-bold text-green-500">45</p>
      </div>
    </div>
    <div className="glass-card p-6">
      <h3 className="font-bold text-white mb-4">Tickets récents</h3>
      {[
        { subject: 'Problème de connexion', client: 'TechCorp Benin', status: 'Ouvert', priority: 'Haute' },
        { subject: 'Demande de fonctionnalité', client: 'AfriTech', status: 'En cours', priority: 'Moyenne' },
        { subject: 'Bug sur le dashboard', client: 'StartUp Africa', status: 'Ouvert', priority: 'Basse' },
      ].map((ticket, i) => (
        <div key={i} className="py-3 border-b border-white/5 last:border-0">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-white font-medium">{ticket.subject}</span>
              <p className="text-xs text-gray-500">{ticket.client}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs ${
                ticket.priority === 'Haute' ? 'bg-red-500/20 text-red-500' :
                ticket.priority === 'Moyenne' ? 'bg-yellow-500/20 text-yellow-500' :
                'bg-green-500/20 text-green-500'
              }`}>{ticket.priority}</span>
              <span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-500">{ticket.status}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

// Settings Content
const SettingsContent = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-white">Paramètres</h1>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="glass-card p-6">
        <h3 className="font-bold text-white mb-4">Profil de l'entreprise</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Nom</label>
            <input type="text" defaultValue="ELECTRON" className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input type="email" defaultValue="electronbusiness07@gmail.com" className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Téléphone</label>
            <input type="tel" defaultValue="+229 01 97 70 03 47" className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white" />
          </div>
          <button className="glass-button w-full">Enregistrer</button>
        </div>
      </div>
      <div className="glass-card p-6">
        <h3 className="font-bold text-white mb-4">Sécurité</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Clé d'accès fondateur</label>
            <input type="password" defaultValue="ELECTRON2025" className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white" />
          </div>
          <div className="pt-4 border-t border-white/5">
            <h4 className="text-white mb-2">Changer le mot de passe</h4>
            <input type="password" placeholder="Nouveau mot de passe" className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white mb-2" />
            <input type="password" placeholder="Confirmer" className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white" />
          </div>
          <button className="glass-button w-full">Mettre à jour</button>
        </div>
      </div>
    </div>
  </div>
)
