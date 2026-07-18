// Order Automation System - Graphisme by ELECTRON

import { NextRequest, NextResponse } from 'next/server'
import { orders } from '@/lib/db/json-db'

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434'

type OrderStatus = 'pending' | 'analyzing' | 'processing' | 'completed' | 'cancelled'

interface OrderWorkflow {
  orderId: string
  status: OrderStatus
  currentStep: number
  steps: WorkflowStep[]
  startedAt: string
  completedAt?: string
}

interface WorkflowStep {
  name: string
  agent: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  result?: string
  error?: string
  startedAt?: string
  completedAt?: string
}

const activeWorkflows = new Map<string, OrderWorkflow>()

const WORKFLOW_STEPS = [
  { name: 'Analyse de la commande', agent: 'CEO' },
  { name: 'Preparation du devis', agent: 'Commercial' },
  { name: 'Validation technique', agent: 'Developer' },
  { name: 'Generation de la facture', agent: 'Finance' },
  { name: 'Notification client', agent: 'Support' },
]

async function callAgent(agentName: string, prompt: string, model = 'llama3.2:latest'): Promise<string> {
  try {
    const response = await fetch(`${OLLAMA_API_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: getSystemPrompt(agentName) },
          { role: 'user', content: prompt }
        ],
        stream: false
      })
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
    CEO: 'Tu es CEO AI de Graphisme by ELECTRON. Analyse cette commande et determine le type de service, la complexite, les ressources et le delai. Reponds en francais.',
    Commercial: 'Tu es Commercial AI de Graphisme. Prepare un devis detaille, identifie les besoins et propose des options. Reponds en francais avec prix en XOF.',
    Developer: 'Tu es Developer AI. Evalue la faisabilite technique, les technologies et le temps necessaire. Reponds en francais.',
    Finance: 'Tu es Finance AI. Genere une facture detaillee avec conditions de paiement. Reponds en francais en XOF.',
    Support: 'Tu es Support AI. Prepare un message de confirmation pour le client avec resume et prochaines etapes. Sois professionnel en francais.'
  }
  return prompts[agentName] || 'Tu es un assistant IA de Graphisme.'
}

async function processStep(workflow: OrderWorkflow, stepIndex: number): Promise<void> {
  const step = workflow.steps[stepIndex]
  step.status = 'running'
  step.startedAt = new Date().toISOString()

  const order = orders.getById(workflow.orderId)
  if (!order) {
    step.status = 'failed'
    step.error = 'Commande non trouvee'
    return
  }

  const context = `Commande #${order.orderNumber}\nClient: ${order.customer?.name || 'Inconnu'}\nEmail: ${order.customer?.email || 'Inconnu'}\nArticles: ${order.items?.map(i => i.name + ' x' + i.quantity).join(', ') || 'Aucun'}\nTotal: ${order.total} XOF`

  try {
    const model = getAgentModel(step.agent)
    const result = await callAgent(step.agent, context, model)
    step.result = result
    step.status = 'completed'
    step.completedAt = new Date().toISOString()
  } catch (error) {
    step.status = 'failed'
    step.error = error instanceof Error ? error.message : 'Erreur inconnue'
  }
}

function getAgentModel(agentName: string): string {
  const models: Record<string, string> = {
    CEO: 'llama3.2:latest',
    Commercial: 'llama3.2:latest',
    Developer: 'qwen2.5-coder:7b',
    Finance: 'llama3.1:8b',
    Support: 'llama3.2:latest'
  }
  return models[agentName] || 'llama3.2:latest'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, action } = body

    if (action === 'start') {
      const order = orders.getById(orderId)
      if (!order) return NextResponse.json({ error: 'Commande non trouvee' }, { status: 404 })

      const workflow: OrderWorkflow = {
        orderId,
        status: 'analyzing',
        currentStep: 0,
        steps: WORKFLOW_STEPS.map(s => ({ ...s, status: 'pending' })),
        startedAt: new Date().toISOString()
      }

      activeWorkflows.set(orderId, workflow)
      await processStep(workflow, 0)

      if (workflow.steps[0].status === 'completed') {
        orders.update(orderId, { status: 'processing' })
      }

      return NextResponse.json({ success: true, workflow: { orderId, status: workflow.status, currentStep: workflow.currentStep, steps: workflow.steps, message: 'Traitement demarre' } })
    }

    if (action === 'continue') {
      const workflow = activeWorkflows.get(orderId)
      if (!workflow) return NextResponse.json({ error: 'Workflow non trouve' }, { status: 404 })

      const nextStepIndex = workflow.currentStep + 1
      
      if (nextStepIndex >= workflow.steps.length) {
        workflow.status = 'completed'
        workflow.completedAt = new Date().toISOString()
        orders.update(orderId, { status: 'completed' })
        return NextResponse.json({ success: true, workflow: { orderId, status: workflow.status, message: 'Traitement termine' } })
      }

      workflow.currentStep = nextStepIndex
      workflow.status = 'processing'
      await processStep(workflow, nextStepIndex)

      if (nextStepIndex === workflow.steps.length - 1 && workflow.steps[nextStepIndex].status === 'completed') {
        orders.update(orderId, { status: 'completed' })
        workflow.status = 'completed'
        workflow.completedAt = new Date().toISOString()
      }

      return NextResponse.json({ success: true, workflow: { orderId, status: workflow.status, currentStep: workflow.currentStep, steps: workflow.steps } })
    }

    if (action === 'status') {
      const workflow = activeWorkflows.get(orderId)
      if (!workflow) return NextResponse.json({ error: 'Workflow non trouve' }, { status: 404 })
      return NextResponse.json({ success: true, workflow })
    }

    return NextResponse.json({ error: 'Action non reconnue' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors du traitement automatise' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const allOrders = orders.getAll()
    const pendingOrders = allOrders.filter(o => o.status === 'pending')
    const workflows = Array.from(activeWorkflows.entries()).map(([orderId, wf]) => ({ orderId, status: wf.status, currentStep: wf.currentStep, startedAt: wf.startedAt }))

    return NextResponse.json({
      success: true,
      pendingOrders: pendingOrders.map(o => ({ id: o.id, orderNumber: o.orderNumber, customer: o.customer?.name, email: o.customer?.email, total: o.total, status: o.status, createdAt: o.createdAt })),
      activeWorkflows: workflows,
      message: `${pendingOrders.length} commande(s) en attente`
    })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la recuperation' }, { status: 500 })
  }
}
