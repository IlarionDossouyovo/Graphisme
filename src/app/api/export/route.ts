// Data Export API - Graphisme by ELECTRON
// Export data to CSV or JSON format

export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { products, orders, users, invoices } from '@/lib/db/json-db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'orders'
    const format = searchParams.get('format') || 'json'
    const status = searchParams.get('status')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    let data: any[] = []

    // Get data based on type
    switch (type) {
      case 'orders':
        data = orders.getAll()
        
        // Filter by status
        if (status && status !== 'all') {
          data = data.filter(o => o.status === status)
        }
        
        // Filter by date range
        if (startDate) {
          data = data.filter(o => new Date(o.createdAt) >= new Date(startDate))
        }
        if (endDate) {
          data = data.filter(o => new Date(o.createdAt) <= new Date(endDate))
        }
        
        // Transform for export
        data = data.map(order => ({
          'N Commande': order.orderNumber || order.id,
          'Date': new Date(order.createdAt).toLocaleDateString('fr-FR'),
          'Client': order.customer.name,
          'Email': order.customer.email,
          'Telephone': order.customer.phone,
          'Ville': order.customer.city,
          'Total': order.total,
          'Statut': order.status,
          'Paiement': order.paymentStatus,
          'Mode Paiement': order.paymentMethod || 'N/A',
          'Articles': order.items.length,
          'Notes': order.notes || ''
        }))
        break

      case 'products':
        data = products.getAll()
        data = data.map(product => ({
          'Nom': product.name,
          'Slug': product.slug,
          'Categorie': product.category,
          'Prix': product.price,
          'Prix Original': product.originalPrice || '',
          'Stock': product.stock,
          'En Stock': product.inStock ? 'Oui' : 'Non',
          'En Vedette': product.featured ? 'Oui' : 'Non',
          'Nouveau': product.newArrival ? 'Oui' : 'Non',
          'Tags': product.tags?.join(', ') || ''
        }))
        break

      case 'users':
        data = users.getAll()
        data = data.map(user => ({
          'Nom': user.name,
          'Email': user.email,
          'Telephone': user.phone || '',
          'Ville': user.city || '',
          'Role': user.role || 'user',
          'Date Creation': user.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : ''
        }))
        break

      case 'invoices':
        data = invoices.getAll()
        data = data.map(invoice => ({
          'N Facture': invoice.invoiceNumber,
          'Date': new Date(invoice.createdAt).toLocaleDateString('fr-FR'),
          'Client': invoice.customerName,
          'Email': invoice.customerEmail,
          'Montant': invoice.total,
          'Statut': invoice.status,
          'Date Echeance': invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString('fr-FR') : ''
        }))
        break

      default:
        return NextResponse.json({ error: 'Type invalide' }, { status: 400 })
    }

    // Return in requested format
    if (format === 'csv') {
      if (data.length === 0) {
        return NextResponse.json({ error: 'Aucune donnée à exporter' }, { status: 404 })
      }

      const headers = Object.keys(data[0])
      const csvRows = [
        headers.join(','),
        ...data.map(row => 
          headers.map(header => {
            const value = row[header]
            // Escape quotes and wrap in quotes if contains comma
            const strValue = String(value || '')
            return strValue.includes(',') || strValue.includes('"') 
              ? `"${strValue.replace(/"/g, '""')}"`
              : strValue
          }).join(',')
        )
      ]

      const csv = csvRows.join('\n')

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="export-${type}-${new Date().toISOString().split('T')[0]}.csv"`
        }
      })
    }

    // Default to JSON
    return NextResponse.json({
      exportDate: new Date().toISOString(),
      type,
      count: data.length,
      data
    })

  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
