// Notification System - Graphisme by ELECTRON
// Handles automated client notifications

import { NextRequest, NextResponse } from 'next/server'

// Email templates for different notification types
const EMAIL_TEMPLATES: Record<string, { subject: string; template: string }> = {
  order_received: {
    subject: 'Confirmation de votre commande - Graphisme by ELECTRON',
    template: `Bonjour {customer_name},

Nous avons bien recu votre commande #{order_number}.

RECAPITULATIF:
- Total: {total} XOF
- Mode de paiement: {payment_method}

NOS PROCHAINES ETAPES:
Notre equipe IA va maintenant traiter votre commande. Vous recevrez un devis detaille sous peu.

Merci pour votre confiance!

L'equipe Graphisme by ELECTRON
Cotonou, Benin
electronbusiness07@gmail.com`
  },
  order_processing: {
    subject: 'Votre commande est en cours de traitement - Graphisme by ELECTRON',
    template: `Bonjour {customer_name},

Votre commande #{order_number} est actuellement en cours de traitement par notre equipe IA.

ETAPE ACTUELLE: {current_step}

Nous vous tiendrons informe de l'avancement.

L'equipe Graphisme by ELECTRON`
  },
  order_completed: {
    subject: 'Votre commande est terminee! - Graphisme by ELECTRON',
    template: `Bonjour {customer_name},

Excellent! Votre commande #{order_number} est maintenant terminee.

RÉSUMÉ:
- Services realise: {items}
- Montant total: {total} XOF

PROCHAINES ETAPES:
{next_steps}

Pour toute question, n'hesitez pas a nous contacter.

L'equipe Graphisme by ELECTRON
electronbusiness07@gmail.com`
  },
  invoice: {
    subject: 'Votre facture - Graphisme by ELECTRON',
    template: `Bonjour {customer_name},

Veuillez trouver ci-dessous votre facture pour la commande #{order_number}.

MONTANT: {total} XOF

Merci de proceder au paiement selon les conditions indiquees.

L'equipe Finance - Graphisme by ELECTRON`
  }
}

// In-memory notification log (in production, use database)
const notificationLog: Array<{
  id: string
  type: string
  to: string
  subject: string
  status: 'pending' | 'sent' | 'failed'
  sentAt?: string
  error?: string
}> = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, orderId, customerEmail, customerName, data } = body

    if (!type || !customerEmail) {
      return NextResponse.json(
        { error: 'Type et email requis' },
        { status: 400 }
      )
    }

    const template = EMAIL_TEMPLATES[type]
    if (!template) {
      return NextResponse.json(
        { error: 'Type de notification invalide' },
        { status: 400 }
      )
    }

    // Build email content
    let emailContent = template.template
    let subject = template.subject

    // Replace placeholders
    const replacements = {
      customer_name: customerName || 'Client',
      order_number: data?.orderNumber || orderId || 'N/A',
      total: data?.total || '0',
      payment_method: data?.paymentMethod || 'Non defini',
      current_step: data?.currentStep || 'En cours',
      items: data?.items || 'Services',
      next_steps: data?.nextSteps || 'Vous recevrez vos livrables sous 48h'
    }

    Object.entries(replacements).forEach(([key, value]) => {
      emailContent = emailContent.replace(new RegExp(`{${key}}`, 'g'), value)
      subject = subject.replace(new RegExp(`{${key}}`, 'g'), value)
    })

    // Create notification log entry
    const notification: {
      id: string
      type: string
      to: string
      subject: string
      status: 'pending' | 'sent' | 'failed'
      sentAt?: string
      error?: string
    } = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      to: customerEmail,
      subject,
      status: 'pending'
    }

    notificationLog.push(notification)

    // In production, integrate with email service (SendGrid, Resend, etc.)
    // For now, simulate email sending
    try {
      // Simulate email API call
      console.log(`[EMAIL] Sending to ${customerEmail}:`)
      console.log(`[EMAIL] Subject: ${subject}`)
      console.log(`[EMAIL] Body: ${emailContent.substring(0, 100)}...`)
      
      // In production, add actual email sending logic here
      // Example with Resend:
      // await resend.emails.send({
      //   from: 'noreply@graphisme.electron',
      //   to: customerEmail,
      //   subject: subject,
      //   text: emailContent
      // })

      notification.status = 'sent'
      notification.sentAt = new Date().toISOString()
    } catch (err) {
      const emailError = err instanceof Error ? err.message : 'Erreur inconnue'
      notification.status = 'failed'
      notification.error = emailError
    }

    return NextResponse.json({
      success: true,
      notification: {
        id: notification.id,
        type,
        to: customerEmail,
        subject,
        status: notification.status,
        sentAt: notification.sentAt
      },
      message: notification.status === 'sent' 
        ? 'Notification envoyee avec succes' 
        : 'Erreur lors de l\'envoi de la notification'
    })

  } catch (error) {
    console.error('Notification error:', error)
    return NextResponse.json(
      { error: 'Erreur lors du traitement de la notification' },
      { status: 500 }
    )
  }
}

// Get notification history
export async function GET() {
  return NextResponse.json({
    success: true,
    notifications: notificationLog.slice(-50).reverse(),
    total: notificationLog.length
  })
}
