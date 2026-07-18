// Orders Management API - Graphisme by ELECTRON
// Comprehensive order management for admin

import { NextRequest, NextResponse } from 'next/server'
import { orders } from '@/lib/db/json-db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const paymentStatus = searchParams.get('paymentStatus')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'desc'
    const limit = parseInt(searchParams.get('limit') || '100')

    let allOrders = orders.getAll()

    // Filter by status
    if (status && status !== 'all') {
      allOrders = allOrders.filter(o => o.status === status)
    }

    // Filter by payment status
    if (paymentStatus && paymentStatus !== 'all') {
      allOrders = allOrders.filter(o => o.paymentStatus === paymentStatus)
    }

    // Search by order number or customer name/email
    if (search) {
      const searchLower = search.toLowerCase()
      allOrders = allOrders.filter(o => 
        o.orderNumber?.toLowerCase().includes(searchLower) ||
        o.customer.name.toLowerCase().includes(searchLower) ||
        o.customer.email.toLowerCase().includes(searchLower)
      )
    }

    // Sort by date
    allOrders.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return sort === 'asc' ? dateA - dateB : dateB - dateA
    })

    // Limit results
    allOrders = allOrders.slice(0, limit)

    // Calculate summary
    const summary = {
      total: orders.getAll().length,
      pending: orders.getAll().filter(o => o.status === 'pending').length,
      processing: orders.getAll().filter(o => o.status === 'processing').length,
      completed: orders.getAll().filter(o => o.status === 'completed').length,
      cancelled: orders.getAll().filter(o => o.status === 'cancelled').length,
      paid: orders.getAll().filter(o => o.paymentStatus === 'paid').length,
      unpaid: orders.getAll().filter(o => o.paymentStatus === 'unpaid').length,
      totalRevenue: orders.getAll()
        .filter(o => o.paymentStatus === 'paid')
        .reduce((sum, o) => sum + (o.total || 0), 0)
    }

    return NextResponse.json({
      orders: allOrders,
      summary
    })

  } catch (error) {
    console.error('Orders GET error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, orderId, data } = body

    // Create new order manually
    if (action === 'create') {
      const newOrder = orders.create({
        items: data.items || [],
        customer: data.customer,
        total: data.total || 0,
        status: data.status || 'pending',
        paymentStatus: data.paymentStatus || 'unpaid'
      })
      return NextResponse.json(newOrder, { status: 201 })
    }

    // Update order status
    if (action === 'updateStatus' && orderId) {
      const updated = orders.update(orderId, { 
        status: data.status,
        updatedAt: new Date().toISOString()
      })
      if (!updated) {
        return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 })
      }
      return NextResponse.json(updated)
    }

    // Update payment status
    if (action === 'updatePayment' && orderId) {
      const updated = orders.update(orderId, { 
        paymentStatus: data.paymentStatus,
        paymentMethod: data.paymentMethod,
        updatedAt: new Date().toISOString()
      })
      if (!updated) {
        return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 })
      }
      return NextResponse.json(updated)
    }

    // Process order with automation
    if (action === 'process' && orderId) {
      // Call the automation trigger
      const response = await fetch(`${request.nextUrl.origin}/api/automation/trigger`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'process_single', orderId })
      })
      const result = await response.json()
      return NextResponse.json(result)
    }

    // Process all pending orders
    if (action === 'processAll') {
      const response = await fetch(`${request.nextUrl.origin}/api/automation/trigger`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'process_all' })
      })
      const result = await response.json()
      return NextResponse.json(result)
    }

    return NextResponse.json({ error: 'Action invalide' }, { status: 400 })

  } catch (error) {
    console.error('Orders POST error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { orderId, ...data } = body

    if (!orderId) {
      return NextResponse.json({ error: 'ID de commande requis' }, { status: 400 })
    }

    const updated = orders.update(orderId, {
      ...data,
      updatedAt: new Date().toISOString()
    })

    if (!updated) {
      return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 })
    }

    return NextResponse.json(updated)

  } catch (error) {
    console.error('Orders PUT error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')

    if (!orderId) {
      return NextResponse.json({ error: 'ID de commande requis' }, { status: 400 })
    }

    // Soft delete - just mark as cancelled instead of deleting
    const updated = orders.update(orderId, {
      status: 'cancelled',
      updatedAt: new Date().toISOString()
    })

    if (!updated) {
      return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Commande annulée' })

  } catch (error) {
    console.error('Orders DELETE error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
