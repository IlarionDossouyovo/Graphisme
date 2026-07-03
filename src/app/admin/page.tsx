'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, Users, FileText, CreditCard, Settings, 
  BarChart3, MessageSquare, Bell, Search, Menu, X,
  TrendingUp, TrendingDown, DollarSign, Eye, MousePointer,
  Calendar, CheckCircle, Clock, AlertCircle, Bot, Activity,
  Database, Shield, Cloud, Code, Palette, Video, Mail, Brain,
  Zap, Play, Pause
} from 'lucide-react'

// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord', href: null },
    { id: 'crm', icon: Users, label: 'CRM', href: null },
    { id: 'projects', icon: FileText, label: 'Projets', href: null },
    { id: 'invoices', icon: CreditCard, label: 'Factures', href: null },
    { id: 'marketing', icon: BarChart3, label: 'Marketing', href: null },
    { id: 'analytics', icon: Activity, label: 'Analytics', href: null },
    { id: 'ai-agents', icon: Bot, label: 'Agents IA', href: '/admin/ai-agents' },
    { id: 'automation', icon: Zap, label: 'Automatisations', href: null },
    { id: 'support', icon: MessageSquare, label: 'Support', href: null },
    { id: 'settings', icon: Settings, label: 'Paramètres', href: null },
  ]

  const handleClick = (item: typeof menuItems[0]) => {
    if (item.href) {
      window.location.href = item.href
    } else {
      setActiveTab(item.id)
    }
  }

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
            onClick={() => handleClick(item)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-gold/10 text-gold' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
            {item.href && <span className="ml-auto text-xs">↗</span>}
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
  const [showQuickAction, setShowQuickAction] = useState<string | null>(null)
  
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

  const handleQuickAction = (action: string) => {
    setShowQuickAction(action)
    // Show alert for demo
    setTimeout(() => {
      alert(`${action} - Fonctionnalité en cours d'initialisation...`)
      setShowQuickAction(null)
    }, 500)
  }

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
          { icon: FileText, label: 'Nouveau devis', color: 'gold', action: 'Nouveau devis' },
          { icon: Users, label: 'Nouveau client', color: 'electric', action: 'Nouveau client' },
          { icon: Bot, label: 'Nouvelle tâche IA', color: 'violet', action: 'Nouvelle tâche IA' },
          { icon: Calendar, label: 'Planifier RDV', color: 'green', action: 'Planifier RDV' },
        ].map((action, i) => (
          <button 
            key={i} 
            onClick={() => handleQuickAction(action.action)}
            className="glass-card p-4 flex items-center gap-4 hover:border-gold/30 transition-all group"
          >
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
      case 'automation':
        return <AutomationContent />
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
      <a href="/admin/ai-agents" className="glass-button flex items-center gap-2">
        <Bot className="w-4 h-4" />
        Ouvrir le Centre IA
      </a>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { name: 'CEO AI', status: 'active', tasks: 3, icon: Brain, color: 'gold', desc: 'Direction & Décisions' },
        { name: 'Commercial AI', status: 'active', tasks: 8, icon: TrendingUp, color: 'electric', desc: 'CRM & Prospection' },
        { name: 'Designer AI', status: 'active', tasks: 5, icon: Palette, color: 'violet', desc: 'Création Graphique' },
        { name: 'Developer AI', status: 'idle', tasks: 0, icon: Code, color: 'blue', desc: 'Développement Web' },
        { name: 'Marketing AI', status: 'active', tasks: 4, icon: BarChart3, color: 'electric', desc: 'SEO & Campagnes' },
        { name: 'Support AI', status: 'active', tasks: 12, icon: MessageSquare, color: 'green', desc: 'Support Client' },
      ].map((agent, i) => (
        <div key={i} className="glass-card p-6 hover:border-gold/30 transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              agent.color === 'gold' ? 'bg-gold/10' : 
              agent.color === 'electric' ? 'bg-electric/10' : 
              agent.color === 'violet' ? 'bg-violet-IA/10' :
              agent.color === 'blue' ? 'bg-blue-500/10' :
              'bg-green-500/10'
            }`}>
              <agent.icon className={`w-6 h-6 ${
                agent.color === 'gold' ? 'text-gold' : 
                agent.color === 'electric' ? 'text-electric' : 
                agent.color === 'violet' ? 'text-violet-IA' :
                agent.color === 'blue' ? 'text-blue-500' :
                'text-green-500'
              }`} />
            </div>
            <div>
              <h3 className="font-bold text-white">{agent.name}</h3>
              <p className="text-xs text-gray-400">{agent.desc}</p>
            </div>
            <div className={`ml-auto w-3 h-3 rounded-full ${
              agent.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
            }`}></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{agent.tasks} tâches</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              agent.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
            }`}>
              {agent.status === 'active' ? 'Actif' : 'Inactif'}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
)

// Automation Content
const AutomationContent = () => {
  const [automations, setAutomations] = useState([
    { id: 1, name: 'Rapport quotidien IA', trigger: 'Quotidien 9h00', status: 'active', lastRun: 'Il y a 2h', type: 'Rapport' },
    { id: 2, name: 'Suivi des leads', trigger: 'Chaque 6h', status: 'active', lastRun: 'Il y a 4h', type: 'CRM' },
    { id: 3, name: 'Backup automatique', trigger: 'Quotidien 2h00', status: 'active', lastRun: 'Hier', type: 'Système' },
    { id: 4, name: 'Newsletter hebdo', trigger: 'Chaque lundi 10h', status: 'paused', lastRun: 'Il y a 3j', type: 'Marketing' },
    { id: 5, name: 'Alerte budget projet', trigger: 'Temps réel', status: 'active', lastRun: 'Il y a 1h', type: 'Finance' },
  ])

  const [showAddModal, setShowAddModal] = useState(false)

  const handleToggle = (id: number) => {
    setAutomations(automations.map(a => 
      a.id === id ? { ...a, status: a.status === 'active' ? 'paused' as const : 'active' as const } : a
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Automatisations</h1>
        <button onClick={() => setShowAddModal(true)} className="glass-button flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Nouvelle automatisation
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="glass-card p-6">
          <h3 className="text-gray-400 text-sm mb-2">Total</h3>
          <p className="text-3xl font-bold text-white">{automations.length}</p>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-gray-400 text-sm mb-2">Actives</h3>
          <p className="text-3xl font-bold text-green-500">{automations.filter(a => a.status === 'active').length}</p>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-gray-400 text-sm mb-2">En pause</h3>
          <p className="text-3xl font-bold text-yellow-500">{automations.filter(a => a.status === 'paused').length}</p>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-gray-400 text-sm mb-2">Exécutions</h3>
          <p className="text-3xl font-bold text-gold">24</p>
        </div>
      </div>

      {/* List */}
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left p-4 text-gray-400 text-sm">Automatisation</th>
              <th className="text-left p-4 text-gray-400 text-sm">Déclencheur</th>
              <th className="text-left p-4 text-gray-400 text-sm">Type</th>
              <th className="text-left p-4 text-gray-400 text-sm">Dernière exécution</th>
              <th className="text-left p-4 text-gray-400 text-sm">Statut</th>
              <th className="text-left p-4 text-gray-400 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {automations.map((automation) => (
              <tr key={automation.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="p-4 text-white font-medium">{automation.name}</td>
                <td className="p-4 text-gray-400">{automation.trigger}</td>
                <td className="p-4"><span className="px-3 py-1 rounded-full text-xs bg-gold/20 text-gold">{automation.type}</span></td>
                <td className="p-4 text-gray-400">{automation.lastRun}</td>
                <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs ${automation.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>{automation.status === 'active' ? 'Actif' : 'Pause'}</span></td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleToggle(automation.id)} className={`p-2 rounded-lg ${automation.status === 'active' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'}`}>
                      {automation.status === 'active' ? '⏸' : '▶'}
                    </button>
                    <button onClick={() => alert(`Exécution de "${automation.name}"...`)} className="p-2 rounded-lg bg-blue-500/20 text-blue-500">▶</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="glass-card max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-white mb-4">Nouvelle Automatisation</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Nom" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white" />
              <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                <option>Rapport</option><option>CRM</option><option>Marketing</option><option>Finance</option><option>Système</option>
              </select>
              <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                <option>Quotidien 9h00</option><option>Hebdomadaire</option><option>Toutes les 6h</option><option>Manuel</option>
              </select>
              <div className="flex gap-4">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-white/5 text-gray-300 rounded-xl">Annuler</button>
                <button onClick={() => { setShowAddModal(false); alert('Créé!') }} className="flex-1 py-3 bg-gold text-black rounded-xl font-semibold">Créer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// CRM Content
const CRMContent = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [clients, setClients] = useState([
    { name: 'TechCorp Benin', email: 'contact@techcorp.bj', phone: '+229 01 97 70 03 47', status: 'Actif' },
    { name: 'AfriTech', email: 'hello@afritech.com', phone: '+229 01 97 70 03 47', status: 'Actif' },
    { name: 'StartUp Africa', email: 'info@startup.africa', phone: '+229 01 97 70 03 47', status: 'Prospect' },
    { name: 'Digital Agency', email: 'contact@digital.bj', phone: '+229 01 97 70 03 47', status: 'Actif' },
  ])

  const handleViewClient = (client: typeof clients[0]) => {
    alert(`Client: ${client.name}\nEmail: ${client.email}\nTéléphone: ${client.phone}\nStatut: ${client.status}`)
  }

  const handleAddClient = () => {
    setShowAddModal(false)
    alert('Nouveau client ajouté avec succès!')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">CRM - Gestion Clients</h1>
        <button onClick={() => setShowAddModal(true)} className="glass-button">Nouveau client</button>
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
            {clients.map((client, i) => (
              <tr key={i} className="border-t border-white/5 hover:bg-white/5">
                <td className="p-4 text-white font-medium">{client.name}</td>
                <td className="p-4 text-gray-400">{client.email}</td>
                <td className="p-4 text-gray-400">{client.phone}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    client.status === 'Actif' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                  }`}>{client.status}</span>
                </td>
                <td className="p-4">
                  <button onClick={() => handleViewClient(client)} className="text-gold text-sm hover:underline mr-3">Voir</button>
                  <button className="text-gray-400 text-sm hover:text-white mr-3">Modifier</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="glass-card max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-white mb-4">Nouveau Client</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Nom de l'entreprise" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white" />
              <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white" />
              <input type="tel" placeholder="Téléphone" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white" />
              <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                <option>Actif</option>
                <option>Prospect</option>
                <option>Inactif</option>
              </select>
              <div className="flex gap-4">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-white/5 text-gray-300 rounded-xl">Annuler</button>
                <button onClick={handleAddClient} className="flex-1 py-3 bg-gold text-black rounded-xl font-semibold">Ajouter</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Projects Content
const ProjectsContent = () => {
  const [projects, setProjects] = useState([
    { id: 1, client: 'TechCorp Benin', project: 'Site E-commerce', status: 'En cours', progress: 75, budget: '€5,000' },
    { id: 2, client: 'AfriTech', project: 'Logo Premium', status: 'Terminé', progress: 100, budget: '€800' },
    { id: 3, client: 'StartUp Africa', project: 'App Mobile', status: 'En cours', progress: 45, budget: '€12,000' },
    { id: 4, client: 'Digital Agency', project: 'Dashboard CRM', status: 'En attente', progress: 10, budget: '€3,500' },
  ])

  const handleViewProject = (p: typeof projects[0]) => {
    alert(`Projet: ${p.project}\nClient: ${p.client}\nBudget: ${p.budget}\nProgression: ${p.progress}%\nStatut: ${p.status}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Projets</h1>
        <button className="glass-button">Nouveau projet</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="glass-card p-6 hover:border-gold/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white">{project.client}</h3>
              <span className={`px-3 py-1 rounded-full text-xs ${
                project.status === 'Terminé' ? 'bg-green-500/20 text-green-500' :
                project.status === 'En cours' ? 'bg-blue-500/20 text-blue-500' :
                'bg-yellow-500/20 text-yellow-500'
              }`}>{project.status}</span>
            </div>
            <p className="text-gray-400 text-sm mb-2">{project.project}</p>
            <p className="text-gold text-sm font-semibold mb-4">{project.budget}</p>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-gold to-yellow-400" style={{ width: `${project.progress}%` }}></div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs text-gray-500">{project.progress}%</span>
              <button onClick={() => handleViewProject(project)} className="text-gold text-sm hover:underline">Détails</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

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
