// Automation Trigger - Graphisme by ELECTRON
// Handles automatic order processing and notifications

import { NextRequest, NextResponse } from 'next/server'
import { orders } from '@/lib/db/json-db'

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434'

// Full workflow with notifications
const FULL_WORKFLOW = [
  { name: 'Analyse de la commande', agent: 'CEO', notification: null },
  { name: 'Preparation du devis', agent: 'Commercial', notification: null },
  { name: 'Validation technique', agent: 'Developer', notification: null },
  { name: 'Generation de la facture', agent: 'Finance', notification: 'invoice' },
  { name: 'Notification client finale', agent: 'Support', notification: 'order_completed' }
]

async function callAgent(agentName: string, prompt: string, model = 'llama3.2:latest'): Promise<string> {
  try {
    const response = await fetch(`${OLLAMA_API_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages: [{ role: 'system', content: getSystemPrompt(agentName) }, { role: 'user', content: prompt }], stream: false })
    })
    if (!response.ok) throw new Error(`Ollama error: ${response.statusText}`)
    const data = await response.json()
    return data.message?.content || 'Pas de reponse'
  } catch (error) {
    return `Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
  }
}

function getSystemPrompt(agentName: string): string {
  const prompts: Record<string, string> = {
    CEO: 'Tu es CEO AI de Graphisme. Analyse cette commande et determine le type de service, la complexite et les ressources. Reponds en francais.',
    Commercial: 'Tu es Commercial AI. Prepare un devis detaille et identifie les besoins. Reponds en francais avec prix en XOF.',
    Developer: 'Tu es Developer AI. Evalue la faisabilite technique et les technologies necessaires. Reponds en francais.',
    Finance: 'Tu es Finance AI. Genere une facture detaillee avec conditions de paiement en XOF.',
    Support: 'Tu es Support AI. Prepare un message de confirmation professionnel en francais.'
  }
  return prompts[agentName] || 'Tu es un assistant IA.'
}

function getAgentModel(agentName: string): string {
  const models: Record<string, string> = { CEO: 'llama3.2:latest', Commercial: 'llama3.2:latest', Developer: 'qwen2.5-coder:7b', Finance: 'llama3.1:8b', Support: 'llama3.2:latest' }
  return models[agentName] || 'llama3.2:latest'
}

const API_BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3002'

async function sendNotification(type: string, email: string, name: string, data: any): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}/api/automation/notifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, customerEmail: email, customerName: name, data })
    })
  } catch (error) {
    console.error('Notification error:', error)
  }
}

// Process order through full workflow
async function processFullWorkflow(orderId: string): Promise<{ success: boolean; steps: any[]; error?: string }> {
  const order = orders.getById(orderId)
  if (!order) return { success: false, steps: [], error: 'Commande non trouvee' }

  const context = `Commande #${order.orderNumber}\nClient: ${order.customer?.name || 'Inconnu'}\nEmail: ${order.customer?.email || 'Inconnu'}\nArticles: ${order.items?.map(i => i.name + ' x' + i.quantity).join(', ') || 'Aucun'}\nTotal: ${order.total} XOF`

  const results: any[] = []

  // Update status
  orders.update(orderId, { status: 'processing' })

  // Send initial notification
  if (order.customer?.email) {
    await sendNotification('order_received', order.customer.email, order.customer.name || 'Client', {
      orderNumber: order.orderNumber,
      total: order.total,
      paymentMethod: order.paymentMethod
    })
  }

  // Process each step
  for (let i = 0; i < FULL_WORKFLOW.length; i++) {
    const step = FULL_WORKFLOW[i]
    const model = getAgentModel(step.agent)
    const result = await callAgent(step.agent, context, model)

    results.push({
      step: i + 1,
      agent: step.agent,
      name: step.name,
      result: result.substring(0, 500),
      status: 'completed'
    })

    // Send notification if required
    if (step.notification && order.customer?.email) {
      await sendNotification(step.notification, order.customer.email, order.customer.name || 'Client', {
        orderNumber: order.orderNumber,
        total: order.total,
        currentStep: step.name,
        items: order.items?.map(i => i.name).join(', ')
      })
    }
  }

  // Update final status
  orders.update(orderId, { status: 'completed' })

  return { success: true, steps: results }
}

// Auto-process all pending orders
async function autoProcessAllOrders(): Promise<{ processed: number; results: any[] }> {
  const allOrders = orders.getAll()
  const pendingOrders = allOrders.filter(o => o.status === 'pending')
  
  const results: any[] = []

  for (const order of pendingOrders) {
    const result = await processFullWorkflow(order.id)
    results.push({ orderId: order.id, ...result })
  }

  return { processed: pendingOrders.length, results }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { orderId, action } = body

    if (action === 'process_single' && orderId) {
      const result = await processFullWorkflow(orderId)
      const { success, ...rest } = result
      return NextResponse.json({ success, ...rest })
    }

    if (action === 'process_all') {
      const result = await autoProcessAllOrders()
      return NextResponse.json({ success: true, ...result })
    }

    if (action === 'check_status' && orderId) {
      const order = orders.getById(orderId)
      if (!order) return NextResponse.json({ error: 'Commande non trouvee' }, { status: 404 })
      return NextResponse.json({ success: true, order: { id: order.id, orderNumber: order.orderNumber, status: order.status, total: order.total, customer: order.customer } })
    }

    return NextResponse.json({ error: 'Action invalide. Utilisez: process_single, process_all, ou check_status' }, { status: 400 })
  } catch (error) {
    console.error('Automation trigger error:', error)
    return NextResponse.json({ error: 'Erreur lors du traitement automatise' }, { status: 500 })
  }
}

// GET endpoint for cron-based triggering
export async function GET() {
  try {
    const result = await autoProcessAllOrders()
    return NextResponse.json({
      success: true,
      message: result.processed > 0 ? `${result.processed} commande(s) traitee(s)` : 'Aucune commande en attente',
      ...result
    })
  } catch (error) {
    console.error('Automation cron error:', error)
    return NextResponse.json({ error: 'Erreur lors du traitement cron' }, { status: 500 })
  }
}
