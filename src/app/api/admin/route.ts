// Admin Dashboard API - Graphisme by ELECTRON
// Provides admin statistics and management endpoints

import { NextRequest, NextResponse } from 'next/server'
import { products, orders, users, invoices } from '@/lib/db/json-db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'stats'

    // Get dashboard statistics
    if (type === 'stats') {
      const allProducts = products.getAll()
      const allOrders = orders.getAll()
      const allUsers = users.getAll()
      const allInvoices = invoices.getAll()

      // Calculate revenue
      const totalRevenue = allOrders
        .filter(o => o.paymentStatus === 'paid')
        .reduce((sum, o) => sum + (o.total || 0), 0)

      // Orders by status
      const ordersByStatus = allOrders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      // Orders by payment status
      const ordersByPayment = allOrders.reduce((acc, order) => {
        acc[order.paymentStatus] = (acc[order.paymentStatus] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      // Recent orders (last 10)
      const recentOrders = orders.getAll()
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10)

      // Top products
      const productSales: Record<string, number> = {}
      allOrders.forEach(order => {
        order.items.forEach(item => {
          productSales[item.productId] = (productSales[item.productId] || 0) + item.quantity
        })
      })

      const topProducts = Object.entries(productSales)
        .map(([productId, quantity]) => {
          const product = products.getById(productId)
          return { product, quantity }
        })
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5)

      return NextResponse.json({
        stats: {
          totalProducts: allProducts.length,
          totalOrders: allOrders.length,
          totalUsers: allUsers.length,
          totalRevenue,
          pendingOrders: ordersByStatus['pending'] || 0,
          processingOrders: ordersByStatus['processing'] || 0,
          completedOrders: ordersByStatus['completed'] || 0,
          cancelledOrders: ordersByStatus['cancelled'] || 0,
          paidOrders: ordersByPayment['paid'] || 0,
          unpaidOrders: ordersByPayment['unpaid'] || 0,
          totalInvoices: allInvoices.length
        },
        recentOrders,
        topProducts,
        ordersByStatus,
        ordersByPayment
      })
    }

    // Get all orders for admin
    if (type === 'orders') {
      const allOrders = orders.getAll()
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      return NextResponse.json(allOrders)
    }

    // Get all products for admin
    if (type === 'products') {
      const allProducts = products.getAll()
      return NextResponse.json(allProducts)
    }

    // Get all users for admin
    if (type === 'users') {
      const allUsers = users.getAll()
      return NextResponse.json(allUsers)
    }

    // Get all invoices for admin
    if (type === 'invoices') {
      const allInvoices = invoices.getAll()
      return NextResponse.json(allInvoices)
    }

    return NextResponse.json({ error: 'Type invalide' }, { status: 400 })

  } catch (error) {
    console.error('Admin API error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { resource, id, ...data } = body

    if (!resource || !id) {
      return NextResponse.json({ error: 'Resource et ID requis' }, { status: 400 })
    }

    // Update order status
    if (resource === 'order') {
      const updated = orders.update(id, data)
      if (!updated) {
        return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 })
      }
      return NextResponse.json(updated)
    }

    // Update product
    if (resource === 'product') {
      const updated = products.update(id, data)
      if (!updated) {
        return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 })
      }
      return NextResponse.json(updated)
    }

    return NextResponse.json({ error: 'Resource non supportée' }, { status: 400 })

  } catch (error) {
    console.error('Admin PUT error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const resource = searchParams.get('resource')
    const id = searchParams.get('id')

    if (!resource || !id) {
      return NextResponse.json({ error: 'Resource et ID requis' }, { status: 400 })
    }

    // Delete product
    if (resource === 'product') {
      products.delete(id)
      return NextResponse.json({ success: true, message: 'Produit supprimé' })
    }

    return NextResponse.json({ error: 'Resource non supportée' }, { status: 400 })

  } catch (error) {
    console.error('Admin DELETE error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
