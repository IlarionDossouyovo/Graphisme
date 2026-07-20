'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Brain, Cpu, Activity, MemoryStick, MessageSquare, 
  Settings, Play, Pause, RotateCcw, Trash2, Edit3,
  ChevronRight, ChevronDown, Terminal, Database,
  Wifi, WifiOff, AlertTriangle, CheckCircle, Clock,
  BarChart3, Gauge, HardDrive, Zap, Shield, Search,
  Filter, Plus, X, Save, RefreshCw, Eye, EyeOff
} from 'lucide-react'

// Logo Component
const Logo = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-gold/5"></div>
    <svg viewBox="0 0 100 100" className="w-10 h-10">
      <circle cx="50" cy="50" r="45" fill="none" stroke="url(#goldGradient)" strokeWidth="2" />
      <path d="M35 65 L50 30 L65 65 M50 30 L50 55" fill="none" stroke="url(#goldGradient)" strokeWidth="3" strokeLinecap="round" />
      <path d="M55 25 L45 40 L52 40 L47 55 L60 38 L53 38 Z" fill="url(#goldGradient)" />
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFA500" />
        </linearGradient>
      </defs>
    </svg>
  </div>
)

// AI Agent Types
interface AIAgent {
  id: string
  name: string
  role: string
  status: 'active' | 'idle' | 'training' | 'error'
  model: string
  memory: number
  conversations: number
  lastActive: string
  cpu: number
  ram: number
  description: string
}

// Sample AI Agents
const sampleAgents: AIAgent[] = [
  { id: '1', name: 'CEO AI', role: 'Chief Executive Officer', status: 'active', model: 'llama3.2', memory: 85, conversations: 156, lastActive: '2 min ago', cpu: 45, ram: 62, description: 'Strategic decisions and company oversight' },
  { id: '2', name: 'Sales AI', role: 'Sales Manager', status: 'active', model: 'llama3.2', memory: 72, conversations: 423, lastActive: '1 min ago', cpu: 38, ram: 55, description: 'CRM and sales automation' },
  { id: '3', name: 'Marketing AI', role: 'Marketing Director', status: 'active', model: 'llama3.2', memory: 68, conversations: 287, lastActive: '5 min ago', cpu: 42, ram: 58, description: 'Campaigns and SEO optimization' },
  { id: '4', name: 'Developer AI', role: 'Lead Developer', status: 'idle', model: 'llama3.2', memory: 91, conversations: 198, lastActive: '15 min ago', cpu: 12, ram: 34, description: 'Full-stack development' },
  { id: '5', name: 'Designer AI', role: 'Creative Director', status: 'active', model: 'llama3.2', memory: 64, conversations: 312, lastActive: '3 min ago', cpu: 35, ram: 48, description: 'Graphic and UI/UX design' },
  { id: '6', name: 'Finance AI', role: 'Finance Manager', status: 'idle', model: 'llama3.2', memory: 55, conversations: 89, lastActive: '30 min ago', cpu: 8, ram: 22, description: 'Accounting and invoicing' },
  { id: '7', name: 'Support AI', role: 'Customer Support', status: 'active', model: 'llama3.2', memory: 78, conversations: 567, lastActive: 'Now', cpu: 52, ram: 71, description: '24/7 customer assistance' },
  { id: '8', name: 'DevOps AI', role: 'DevOps Engineer', status: 'idle', model: 'llama3.2', memory: 42, conversations: 67, lastActive: '1 hour ago', cpu: 5, ram: 18, description: 'Infrastructure and CI/CD' },
]

// Agent Card Component
const AgentCard = ({ 
  agent, 
  onToggle, 
  onSelect,
  selected 
}: { 
  agent: AIAgent
  onToggle: (id: string) => void
  onSelect: (agent: AIAgent) => void
  selected: boolean
}) => {
  const statusColors = {
    active: 'bg-green-500',
    idle: 'bg-yellow-500',
    training: 'bg-blue-500',
    error: 'bg-red-500',
  }

  return (
    <motion.div
      layout
      className={`glass-premium rounded-xl p-4 cursor-pointer transition-all ${
        selected ? 'ring-2 ring-gold' : ''
      }`}
      onClick={() => onSelect(agent)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${statusColors[agent.status]}`}></div>
          <h3 className="text-white font-semibold">{agent.name}</h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggle(agent.id)
          }}
          className={`p-2 rounded-lg transition-colors ${
            agent.status === 'active' 
              ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
              : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
          }`}
        >
          {agent.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>
      
      <p className="text-gray-500 text-xs mb-3">{agent.role}</p>
      
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-gray-500">CPU</div>
          <div className="text-white font-medium">{agent.cpu}%</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-gray-500">RAM</div>
          <div className="text-white font-medium">{agent.ram}%</div>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-white/5 flex justify-between items-center text-xs text-gray-500">
        <span>{agent.conversations} conv.</span>
        <span>{agent.lastActive}</span>
      </div>
    </motion.div>
  )
}

// Agent Detail Panel
const AgentDetail = ({ 
  agent, 
  onClose 
}: { 
  agent: AIAgent
  onClose: () => void
}) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [prompt, setPrompt] = useState(agent.description)

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'memory', label: 'Memory' },
    { id: 'conversations', label: 'Conversations' },
    { id: 'logs', label: 'Logs' },
    { id: 'settings', label: 'Settings' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="glass-premium rounded-2xl p-6 h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">{agent.name}</h2>
          <p className="text-gray-400">{agent.role}</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white">
            <Edit3 className="w-5 h-5" />
          </button>
          <button onClick={onClose} className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-gold text-black'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* System Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Cpu className="w-4 h-4" />
                  <span className="text-sm">CPU Usage</span>
                </div>
                <div className="text-2xl font-bold text-white">{agent.cpu}%</div>
                <div className="h-2 bg-white/10 rounded-full mt-2">
                  <div className="h-full bg-gold rounded-full" style={{ width: `${agent.cpu}%` }}></div>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <MemoryStick className="w-4 h-4" />
                  <span className="text-sm">Memory</span>
                </div>
                <div className="text-2xl font-bold text-white">{agent.memory}%</div>
                <div className="h-2 bg-white/10 rounded-full mt-2">
                  <div className="h-full bg-electric rounded-full" style={{ width: `${agent.memory}%` }}></div>
                </div>
              </div>
            </div>

            {/* Model Info */}
            <div className="bg-white/5 rounded-xl p-4">
              <h4 className="text-white font-medium mb-3">Model Configuration</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Model:</span>
                  <span className="text-white ml-2">{agent.model}</span>
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>
                  <span className={`ml-2 ${agent.status === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {agent.status}
                  </span>
                </div>
              </div>
            </div>

            {/* System Prompt */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-medium">System Prompt</h4>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-gold text-sm hover:text-gold-light"
                >
                  {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                </button>
              </div>
              {isEditing ? (
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="input-premium h-32 resize-none"
                />
              ) : (
                <div className="bg-white/5 rounded-xl p-4 text-gray-400 text-sm">
                  {prompt}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'memory' && (
          <motion.div
            key="memory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="bg-white/5 rounded-xl p-4">
              <h4 className="text-white font-medium mb-3">Short-term Memory</h4>
              <div className="space-y-2">
                <div className="text-gray-400 text-sm">Recent context items: 12</div>
                <div className="h-32 bg-white/10 rounded-lg overflow-y-auto p-2 text-xs text-gray-500">
                  • User requested website redesign<br/>
                  • Budget: 5000€<br/>
                  • Timeline: 2 months<br/>
                  • Client: ABC Corp
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <h4 className="text-white font-medium mb-3">Long-term Memory</h4>
              <div className="space-y-2">
                <div className="text-gray-400 text-sm">Stored knowledge: 2.3 MB</div>
                <div className="text-gray-500 text-xs">Last sync: 2 hours ago</div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'conversations' && (
          <motion.div
            key="conversations"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="text-gray-400 text-sm mb-4">
              Total conversations: {agent.conversations}
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-medium">Conversation #{agent.conversations - i + 1}</h4>
                  <span className="text-gray-500 text-xs">{i * 2}h ago</span>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2">
                  User asked about {['pricing', 'services', 'project timeline'][i-1]}...
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'logs' && (
          <motion.div
            key="logs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-black rounded-xl p-4 font-mono text-xs">
              <div className="text-gray-500 mb-1">[2026-01-20 10:30:15] INFO: Agent initialized</div>
              <div className="text-gray-500 mb-1">[2026-01-20 10:30:16] INFO: Model loaded: {agent.model}</div>
              <div className="text-green-400 mb-1">[2026-01-20 10:30:18] SUCCESS: Ready for requests</div>
              <div className="text-gray-500 mb-1">[2026-01-20 10:31:00] INFO: New conversation started</div>
              <div className="text-gray-500 mb-1">[2026-01-20 10:31:05] DEBUG: Processing request...</div>
              <div className="text-green-400 mb-1">[2026-01-20 10:31:12] SUCCESS: Response generated</div>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="bg-white/5 rounded-xl p-4">
              <h4 className="text-white font-medium mb-3">Model Selection</h4>
              <select className="input-premium">
                <option>llama3.2</option>
                <option>llama3.1</option>
                <option>qwen2.5</option>
                <option>phi3</option>
              </select>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <h4 className="text-white font-medium mb-3">Temperature</h4>
              <input type="range" min="0" max="100" defaultValue="70" className="w-full accent-gold" />
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <h4 className="text-white font-medium mb-3">Max Tokens</h4>
              <input type="number" defaultValue="4096" className="input-premium" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// System Overview
const SystemOverview = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="glass-premium rounded-xl p-4">
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          <Brain className="w-4 h-4" />
          <span className="text-xs">Active Agents</span>
        </div>
        <div className="text-2xl font-bold text-white">5/8</div>
      </div>
      <div className="glass-premium rounded-xl p-4">
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          <MessageSquare className="w-4 h-4" />
          <span className="text-xs">Total Conversations</span>
        </div>
        <div className="text-2xl font-bold text-white">2,099</div>
      </div>
      <div className="glass-premium rounded-xl p-4">
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          <Gauge className="w-4 h-4" />
          <span className="text-xs">Avg CPU</span>
        </div>
        <div className="text-2xl font-bold text-white">32%</div>
      </div>
      <div className="glass-premium rounded-xl p-4">
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          <Zap className="w-4 h-4" />
          <span className="text-xs">Memory Used</span>
        </div>
        <div className="text-2xl font-bold text-white">48%</div>
      </div>
    </div>
  )
}

// Navbar
const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-premium-black/95 backdrop-blur-xl border-b border-gold/30">
    <div className="max-w-7xl mx-auto px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo />
          <div>
            <span className="text-lg font-bold gold-text">Founder AI Center</span>
            <span className="text-xs text-gray-400 block ml-2">Contrôle Total</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
            <Shield className="w-4 h-4 text-green-400" />
            Accès restreint: Fondateur
          </div>
          <button className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </nav>
)

export default function FounderAICenterPage() {
  const [agents, setAgents] = useState<AIAgent[]>(sampleAgents)
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleAgent = (id: string) => {
    setAgents(agents.map(agent => 
      agent.id === id 
        ? { ...agent, status: agent.status === 'active' ? 'idle' : 'active' }
        : agent
    ))
  }

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-premium-black">
      <Navbar />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-6 pb-12">
          {/* Warning Banner */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <span className="text-yellow-500 text-sm">
              Zone sécurisée - Accès restreint au fondateur uniquement
            </span>
          </div>

          <SystemOverview />

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Agents List */}
            <div className="lg:col-span-1">
              <div className="glass-premium rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">AI Agents</h2>
                  <button className="p-2 rounded-lg bg-gold/20 text-gold hover:bg-gold/30">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Rechercher un agent..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-premium pl-10 py-2 text-sm"
                  />
                </div>

                {/* Filter */}
                <div className="flex gap-2 mb-4">
                  <button className="px-3 py-1 rounded-lg bg-gold text-black text-xs font-medium">
                    Tous
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-white/5 text-gray-400 text-xs hover:text-white">
                    Actifs
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-white/5 text-gray-400 text-xs hover:text-white">
                    Inactifs
                  </button>
                </div>

                {/* Agent List */}
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                  {filteredAgents.map((agent) => (
                    <AgentCard
                      key={agent.id}
                      agent={agent}
                      onToggle={toggleAgent}
                      onSelect={setSelectedAgent}
                      selected={selectedAgent?.id === agent.id}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Agent Detail */}
            <div className="lg:col-span-2">
              {selectedAgent ? (
                <AgentDetail 
                  agent={selectedAgent} 
                  onClose={() => setSelectedAgent(null)} 
                />
              ) : (
                <div className="glass-premium rounded-2xl p-12 text-center">
                  <Brain className="w-16 h-16 mx-auto text-gold/30 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Sélectionnez un Agent</h3>
                  <p className="text-gray-400">
                    Cliquez sur un agent dans la liste pour voir ses détails et le contrôler.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
