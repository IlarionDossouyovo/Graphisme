'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, Search, Filter, Trash2, Eye, Bot, User, Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Conversation {
  id: string
  agent: string
  messages: Array<{
    role: 'user' | 'assistant'
    content: string
  }>
  clientName?: string
  clientEmail?: string
  status: string
  createdAt: string
  updatedAt: string
}

const agentNames: Record<string, string> = {
  CEO: 'Direction',
  Commercial: 'Commercial',
  Marketing: 'Marketing',
  Designer: 'Designer',
  Developer: 'Technique',
  Motion: 'Video',
  CommunityManager: 'Community',
  Finance: 'Finance',
  Support: 'Support',
  DevOps: 'Infrastructure',
  CyberSecurity: 'Securite',
  DataAnalyst: 'Data',
}

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [agentFilter, setAgentFilter] = useState('all')

  useEffect(() => {
    fetchConversations()
  }, [])

  const fetchConversations = async () => {
    try {
      const res = await fetch('/api/conversations')
      const data = await res.json()
      setConversations(data)
    } catch (error) {
      console.error('Error fetching conversations:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteConversation = async (id: string) => {
    if (!confirm('Voulez-vous supprimer cette conversation?')) return
    
    try {
      await fetch(`/api/conversations?id=${id}`, { method: 'DELETE' })
      setConversations(conversations.filter(c => c.id !== id))
      if (selectedConversation?.id === id) {
        setSelectedConversation(null)
      }
    } catch (error) {
      console.error('Error deleting conversation:', error)
    }
  }

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.messages.some(m => m.content.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesAgent = agentFilter === 'all' || conv.agent === agentFilter
    return matchesSearch && matchesAgent
  })

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 hover:bg-white/10 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Conversations</h1>
            <p className="text-gray-400">{conversations.length} conversation(s)</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-white/10 rounded-lg focus:outline-none focus:border-gold"
            />
          </div>
          <select
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-white/10 rounded-lg focus:outline-none focus:border-gold"
          >
            <option value="all">Tous les agents</option>
            {Object.entries(agentNames).map(([id, name]) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1 space-y-3">
            {loading ? (
              <div className="text-center py-8 text-gray-400">Chargement...</div>
            ) : filteredConversations.length === 0 ? (
              <div className="text-center py-8 text-gray-400">Aucune conversation</div>
            ) : (
              filteredConversations.map(conv => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedConversation?.id === conv.id
                      ? 'bg-gold/20 border border-gold/50'
                      : 'bg-gray-800 hover:bg-gray-700 border border-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-gold" />
                      <span className="font-medium">{agentNames[conv.agent] || conv.agent}</span>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteConversation(conv.id)
                      }}
                      className="p-1 hover:bg-red-500/20 rounded text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {conv.messages[conv.messages.length - 1]?.content || 'Vide'}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {formatDate(conv.updatedAt)}
                    <span className="ml-auto">{conv.messages.length} messages</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Conversation Detail */}
          <div className="lg:col-span-2">
            {selectedConversation ? (
              <div className="bg-gray-800 rounded-lg border border-white/10 h-full">
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <Bot className="w-6 h-6 text-gold" />
                    <div>
                      <h2 className="font-bold">{agentNames[selectedConversation.agent] || selectedConversation.agent}</h2>
                      <p className="text-sm text-gray-400">{formatDate(selectedConversation.createdAt)}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 max-h-[600px] overflow-y-auto space-y-4">
                  {selectedConversation.messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.role === 'user'
                            ? 'bg-gold text-black'
                            : 'bg-gray-700 text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {msg.role === 'user' ? (
                            <User className="w-4 h-4" />
                          ) : (
                            <Bot className="w-4 h-4 text-gold" />
                          )}
                          <span className="text-xs opacity-70">
                            {msg.role === 'user' ? 'Vous' : 'Assistant'}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Selectionnez une conversation</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
