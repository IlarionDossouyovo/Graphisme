import { NextResponse } from 'next/server'
import { z } from 'zod'

// Types for the AI Orchestrator
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'
export type TaskStatus = 'pending' | 'processing' | 'completed' | 'failed'
export type TaskType = 'chat' | 'task' | 'workflow'
export type AgentRole = 
  | 'ceo' | 'sales' | 'marketing' | 'advertising' | 'seo' | 'copywriting'
  | 'graphic_designer' | 'ui_ux_designer' | 'web_developer' | 'backend_developer'
  | 'frontend_developer' | 'mobile_developer' | 'devops' | 'cybersecurity'
  | 'finance' | 'accounting' | 'customer_support' | 'community_manager'
  | 'social_media' | 'video_production' | 'photography' | 'art_director'
  | 'prompt_engineering' | 'marketplace_manager' | 'affiliate_manager'
  | 'analytics' | 'business_intelligence'

export interface OrchestratorTask {
  id: string
  type: TaskType
  priority: TaskPriority
  status: TaskStatus
  assignedAgent?: AgentRole
  description: string
  input: any
  output?: any
  createdAt: string
  completedAt?: string
  error?: string
  retryCount: number
  metadata?: Record<string, any>
}

export interface WorkflowStep {
  id: string
  agent: AgentRole
  action: string
  parameters: Record<string, any>
  dependsOn?: string[]
}

export interface Workflow {
  id: string
  name: string
  description: string
  steps: WorkflowStep[]
  status: 'active' | 'paused' | 'completed'
  trigger: 'manual' | 'scheduled' | 'event'
  schedule?: string
  lastRun?: string
  createdAt: string
}

// In-memory storage for demo (would be database in production)
let tasks: OrchestratorTask[] = []
let workflows: Workflow[] = []

// Schemas
const taskSchema = z.object({
  type: z.enum(['chat', 'task', 'workflow']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  description: z.string(),
  assignedAgent: z.enum([
    'ceo', 'sales', 'marketing', 'advertising', 'seo', 'copywriting',
    'graphic_designer', 'ui_ux_designer', 'web_developer', 'backend_developer',
    'frontend_developer', 'mobile_developer', 'devops', 'cybersecurity',
    'finance', 'accounting', 'customer_support', 'community_manager',
    'social_media', 'video_production', 'photography', 'art_director',
    'prompt_engineering', 'marketplace_manager', 'affiliate_manager',
    'analytics', 'business_intelligence'
  ]).optional(),
  input: z.any(),
  metadata: z.record(z.any()).optional(),
})

const workflowSchema = z.object({
  name: z.string(),
  description: z.string(),
  steps: z.array(z.object({
    id: z.string(),
    agent: z.string(),
    action: z.string(),
    parameters: z.record(z.any()),
    dependsOn: z.array(z.string()).optional(),
  })),
  trigger: z.enum(['manual', 'scheduled', 'event']),
  schedule: z.string().optional(),
})

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 15)

// GET - Retrieve tasks and workflows
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')

    let result: any = {}

    // Filter tasks
    let filteredTasks = [...tasks]
    if (status) filteredTasks = filteredTasks.filter(t => t.status === status)
    if (priority) filteredTasks = filteredTasks.filter(t => t.priority === priority)
    result.tasks = filteredTasks.sort((a, b) => {
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })

    // Get workflows if requested
    if (!type || type === 'workflows') {
      result.workflows = workflows
    }

    // Get stats
    result.stats = {
      totalTasks: tasks.length,
      pendingTasks: tasks.filter(t => t.status === 'pending').length,
      processingTasks: tasks.filter(t => t.status === 'processing').length,
      completedTasks: tasks.filter(t => t.status === 'completed').length,
      failedTasks: tasks.filter(t => t.status === 'failed').length,
      totalWorkflows: workflows.length,
      activeWorkflows: workflows.filter(w => w.status === 'active').length,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Orchestrator GET error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST - Create new task or workflow
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const action = body.action

    // Create new task
    if (action === 'task') {
      const validatedData = taskSchema.parse(body)
      
      const newTask: OrchestratorTask = {
        id: generateId(),
        type: validatedData.type,
        priority: validatedData.priority,
        status: 'pending',
        assignedAgent: validatedData.assignedAgent,
        description: validatedData.description,
        input: validatedData.input,
        retryCount: 0,
        metadata: validatedData.metadata,
        createdAt: new Date().toISOString(),
      }

      tasks.push(newTask)

      // If assigned to an agent, simulate processing
      if (newTask.assignedAgent) {
        setTimeout(() => {
          const taskIndex = tasks.findIndex(t => t.id === newTask.id)
          if (taskIndex !== -1) {
            tasks[taskIndex].status = 'completed'
            tasks[taskIndex].completedAt = new Date().toISOString()
            tasks[taskIndex].output = {
              message: 'Task completed successfully',
              agent: newTask.assignedAgent,
              result: 'Simulated output for demonstration'
            }
          }
        }, 3000 + Math.random() * 5000)
      }

      return NextResponse.json(newTask, { status: 201 })
    }

    // Create new workflow
    if (action === 'workflow') {
      const validatedData = workflowSchema.parse(body)

      const newWorkflow: Workflow = {
        id: generateId(),
        name: validatedData.name,
        description: validatedData.description,
        steps: validatedData.steps as WorkflowStep[],
        status: 'active',
        trigger: validatedData.trigger,
        schedule: validatedData.schedule,
        createdAt: new Date().toISOString(),
      }

      workflows.push(newWorkflow)

      return NextResponse.json(newWorkflow, { status: 201 })
    }

    // Execute workflow
    if (action === 'execute') {
      const workflowId = body.workflowId
      const workflow = workflows.find(w => w.id === workflowId)

      if (!workflow) {
        return NextResponse.json({ error: 'Workflow non trouvé' }, { status: 404 })
      }

      // Create tasks for each step
      const workflowTasks: OrchestratorTask[] = []

      for (const step of workflow.steps) {
        const task: OrchestratorTask = {
          id: generateId(),
          type: 'task',
          priority: 'medium',
          status: 'pending',
          assignedAgent: step.agent as AgentRole,
          description: `Workflow step: ${step.action}`,
          input: step.parameters,
          retryCount: 0,
          metadata: { workflowId, stepId: step.id },
          createdAt: new Date().toISOString(),
        }
        tasks.push(task)
        workflowTasks.push(task)
      }

      return NextResponse.json({
        message: 'Workflow execution started',
        workflowId,
        tasks: workflowTasks
      }, { status: 201 })
    }

    return NextResponse.json({ error: 'Action non reconnue' }, { status: 400 })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Orchestrator POST error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// PUT - Update task or workflow
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    // Update task
    const taskIndex = tasks.findIndex(t => t.id === id)
    if (taskIndex !== -1) {
      if (body.status) {
        tasks[taskIndex].status = body.status
        if (body.status === 'completed') {
          tasks[taskIndex].completedAt = new Date().toISOString()
        }
      }
      if (body.output) {
        tasks[taskIndex].output = body.output
      }
      if (body.error) {
        tasks[taskIndex].error = body.error
        tasks[taskIndex].status = 'failed'
      }
      return NextResponse.json(tasks[taskIndex])
    }

    // Update workflow
    const workflowIndex = workflows.findIndex(w => w.id === id)
    if (workflowIndex !== -1) {
      if (body.status) {
        workflows[workflowIndex].status = body.status
      }
      if (body.schedule) {
        workflows[workflowIndex].schedule = body.schedule
      }
      return NextResponse.json(workflows[workflowIndex])
    }

    return NextResponse.json({ error: 'Élément non trouvé' }, { status: 404 })
  } catch (error) {
    console.error('Orchestrator PUT error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE - Remove task or workflow
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const itemType = searchParams.get('type') // 'task' or 'workflow'

    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    if (itemType === 'workflow' || !itemType) {
      const workflowIndex = workflows.findIndex(w => w.id === id)
      if (workflowIndex !== -1) {
        workflows.splice(workflowIndex, 1)
        return NextResponse.json({ success: true, message: 'Workflow supprimé' })
      }
    }

    const taskIndex = tasks.findIndex(t => t.id === id)
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1)
      return NextResponse.json({ success: true, message: 'Tâche supprimée' })
    }

    return NextResponse.json({ error: 'Élément non trouvé' }, { status: 404 })
  } catch (error) {
    console.error('Orchestrator DELETE error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
