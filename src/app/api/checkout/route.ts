import { NextResponse } from 'next/server'
import { orders } from '@/lib/db/json-db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { items, customer, total } = body

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Le panier est vide' },
        { status: 400 }
      )
    }

    if (!customer || !customer.email || !customer.name) {
      return NextResponse.json(
        { error: 'Informations client incomplètes' },
        { status: 400 }
      )
    }

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create order object
    const order = {
      id: orderId,
      items: items.map((item: any) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone || '',
        address: customer.address || '',
        city: customer.city || '',
      },
      total,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // In a real app, you would:
    // 1. Process payment with Stripe/PayPal
    // 2. Send confirmation email
    // 3. Update inventory

    return NextResponse.json({
      success: true,
      orderId,
      message: 'Commande créée avec succès',
      order,
    })

  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Erreur lors du traitement de la commande' },
      { status: 500 }
    )
  }
}

// Get orders
export async function GET() {
  try {
    const allOrders = orders.getAll()
    return NextResponse.json(allOrders)
  } catch (error) {
    console.error('Get orders error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des commandes' },
      { status: 500 }
    )
  }
}
