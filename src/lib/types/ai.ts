// AI Agent Types and Interfaces

export type AIAgentRole = 
  | 'ceo'
  | 'executive_assistant'
  | 'sales'
  | 'crm'
  | 'marketing'
  | 'advertising'
  | 'seo'
  | 'copywriting'
  | 'graphic_designer'
  | 'ui_ux_designer'
  | 'web_developer'
  | 'backend_developer'
  | 'frontend_developer'
  | 'fullstack_developer'
  | 'mobile_developer'
  | 'database_expert'
  | 'devops'
  | 'cybersecurity'
  | 'finance'
  | 'accounting'
  | 'legal'
  | 'hr'
  | 'recruitment'
  | 'customer_support'
  | 'community_manager'
  | 'social_media'
  | 'video_production'
  | 'photography'
  | 'motion_design'
  | 'interior_decoration'
  | 'art_director'
  | 'prompt_engineering'
  | 'marketplace_manager'
  | 'affiliate_manager'
  | 'printing_expert'
  | 'inventory_manager'
  | 'analytics'
  | 'business_intelligence'

export interface AIAgent {
  id: string
  name: string
  role: AIAgentRole
  description: string
  capabilities: string[]
  status: 'active' | 'idle' | 'training' | 'error'
  model?: string
  memory: AIMemory
  knowledgeBase: string[]
  conversationHistory: ConversationMessage[]
  permissions: string[]
  metrics: AIAgentMetrics
  prompt: string
  createdAt: string
  updatedAt: string
}

export interface AIMemory {
  shortTerm: string[]
  longTerm: string[]
  context: string
}

export interface ConversationMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  metadata?: Record<string, any>
}

export interface AIAgentMetrics {
  conversationsCount: number
  tasksCompleted: number
  averageResponseTime: number
  successRate: number
  lastActive: string
}

export interface AIOrchestratorTask {
  id: string
  type: 'chat' | 'task' | 'workflow'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  assignedAgent?: AIAgentRole
  description: string
  input: any
  output?: any
  createdAt: string
  completedAt?: string
  error?: string
}

export interface AIWorkflow {
  id: string
  name: string
  description: string
  steps: AIWorkflowStep[]
  status: 'active' | 'paused' | 'completed'
  trigger: 'manual' | 'scheduled' | 'event'
  schedule?: string
  createdAt: string
}

export interface AIWorkflowStep {
  id: string
  agent: AIAgentRole
  action: string
  parameters: Record<string, any>
  dependsOn?: string[]
}

// Art Types
export interface Artwork {
  id: string
  title: string
  description: string
  category: ArtCategory
  style: ArtStyle
  tags: string[]
  prompt: string
  imageUrl: string
  thumbnailUrl: string
  price: number
  currency: string
  license: 'personal' | 'commercial' | 'exclusive'
  dimensions?: string
  artist: string
  createdAt: string
  featured: boolean
  downloads: number
  likes: number
}

export type ArtCategory = 
  | 'luxury_wall_art'
  | 'african_art'
  | 'abstract_art'
  | 'modern_art'
  | 'luxury_gold_art'
  | 'office_decoration'
  | 'hotel_decoration'
  | 'restaurant_decoration'
  | 'bedroom_decoration'
  | 'living_room_decoration'
  | 'corporate_decoration'
  | 'landscape'
  | 'portrait'
  | 'watercolor'
  | 'oil_painting'
  | 'ink'
  | 'sketch'
  | 'minimalist'
  | 'scandinavian'
  | '3d_art'
  | 'cyberpunk'
  | 'fantasy'
  | 'pop_art'
  | 'anime'

export type ArtStyle = 
  | 'realistic'
  | 'impressionist'
  | 'expressionist'
  | 'abstract'
  | 'minimalist'
  | 'surrealist'
  | 'pop'
  | 'digital'
  | 'photorealistic'
  | 'illustration'

// Prompt Builder Types
export interface PromptTemplate {
  id: string
  name: string
  category: string
  subject: string
  style: string
  composition: string
  mood: string
  lighting: string
  colorPalette: string
  camera?: string
  lens?: string
  materials?: string
  textures?: string
  frame?: string
  aspectRatio: string
  resolution: string
  negativePrompt?: string
  seed?: number
  creativity: number
}

// Affiliate Types
export interface Affiliate {
  id: string
  userId: string
  code: string
  status: 'pending' | 'approved' | 'suspended'
  referralLink: string
  qrCode: string
  clicks: number
  sales: number
  commissions: number
  pendingPayout: number
  totalEarnings: number
  createdAt: string
}

export interface AffiliatePayout {
  id: string
  affiliateId: string
  amount: number
  currency: string
  method: 'bank_transfer' | 'mobile_money' | 'paypal'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  requestedAt: string
  processedAt?: string
}

// Marketplace Types
export interface MarketplaceProduct {
  id: string
  sellerId: string
  type: 'digital' | 'physical'
  category: string
  title: string
  description: string
  images: string[]
  price: number
  compareAtPrice?: number
  currency: string
  stock: number
  SKU?: string
  tags: string[]
  license?: string
  prompt?: string
  downloads: number
  rating: number
  reviewCount: number
  status: 'draft' | 'active' | 'archived'
  createdAt: string
}

// Print Types
export interface PrintJob {
  id: string
  orderId: string
  productId: string
  specifications: PrintSpecifications
  status: 'pending' | 'processing' | 'ready' | 'shipped' | 'delivered'
  files: PrintFile[]
  createdAt: string
}

export interface PrintSpecifications {
  format: 'pdf' | 'png' | 'svg' | 'tiff'
  size: string
  paperType: string
  dpi: number
  cmyk: boolean
  bleed: boolean
  cropMarks: boolean
}

export interface PrintFile {
  name: string
  url: string
  type: string
  size: number
}
