import { NextResponse } from 'next/server'

// Payment methods configuration
const paymentMethods = [
  {
    id: 'card',
    name: 'Carte Bancaire',
    icon: '💳',
    description: 'Visa, Mastercard, American Express',
    type: 'card',
    enabled: true,
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '🅿️',
    description: 'Paiement rapide via PayPal',
    type: 'wallet',
    enabled: true,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    icon: '💠',
    description: 'Paiement sécurisé par Stripe',
    type: 'card',
    enabled: true,
  },
  {
    id: 'flutterwave',
    name: 'Flutterwave',
    icon: '🌊',
    description: 'Paiement mobile Africa',
    type: 'mobile_money',
    enabled: true,
  },
  {
    id: 'paystack',
    name: 'Paystack',
    icon: '💰',
    description: 'Paiement sécurisé',
    type: 'mobile_money',
    enabled: true,
  },
  {
    id: 'mtn',
    name: 'MTN Mobile Money',
    icon: '📱',
    description: 'Paiement MTN Moov',
    type: 'mobile_money',
    enabled: true,
  },
  {
    id: 'moov',
    name: 'Moov Money',
    icon: '📲',
    description: 'Paiement Moov Africa',
    type: 'mobile_money',
    enabled: true,
  },
  {
    id: 'cinetpay',
    name: 'CinetPay',
    icon: '🎬',
    description: 'Paiement mobile Africa',
    type: 'mobile_money',
    enabled: true,
  },
  {
    id: 'wise',
    name: 'Wise',
    icon: '🌍',
    description: 'Transferts internationaux',
    type: 'bank',
    enabled: true,
  },
  {
    id: 'bank',
    name: 'Virement Bancaire',
    icon: '🏦',
    description: 'Virement directement sur notre compte',
    type: 'bank',
    enabled: true,
  },
]

// GET: List available payment methods
export async function GET() {
  try {
    const enabledMethods = paymentMethods.filter(m => m.enabled)
    return NextResponse.json({
      success: true,
      methods: enabledMethods,
    })
  } catch (error) {
    console.error('Error fetching payment methods:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors du chargement des moyens de paiement' },
      { status: 500 }
    )
  }
}

// POST: Process payment
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { method, amount, currency, orderId, customer, items } = body

    if (!method || !amount || !orderId) {
      return NextResponse.json(
        { success: false, error: 'Paramètres manquants' },
        { status: 400 }
      )
    }

    const paymentMethod = paymentMethods.find(m => m.id === method)

    if (!paymentMethod || !paymentMethod.enabled) {
      return NextResponse.json(
        { success: false, error: 'Moyen de paiement non disponible' },
        { status: 400 }
      )
    }

    // Simulate payment processing based on method
    let paymentResult

    switch (method) {
      case 'card':
      case 'stripe':
        paymentResult = await processCardPayment(amount, currency, orderId, customer)
        break
      case 'paypal':
        paymentResult = await processPayPalPayment(amount, currency, orderId, customer)
        break
      case 'mtn':
      case 'moov':
      case 'flutterwave':
      case 'paystack':
      case 'cinetpay':
        paymentResult = await processMobileMoneyPayment(method, amount, currency, orderId, customer)
        break
      case 'wise':
      case 'bank':
        paymentResult = await processBankTransfer(method, amount, currency, orderId, customer)
        break
      default:
        return NextResponse.json(
          { success: false, error: 'Moyen de paiement non supporté' },
          { status: 400 }
        )
    }

    return NextResponse.json(paymentResult)

  } catch (error) {
    console.error('Payment error:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors du traitement du paiement' },
      { status: 500 }
    )
  }
}

// Card payment simulation
async function processCardPayment(amount: number, currency: string, orderId: string, customer: any) {
  // In production, this would integrate with Stripe
  return {
    success: true,
    transactionId: `CARD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    status: 'completed',
    method: 'card',
    amount,
    currency,
    orderId,
    message: 'Paiement par carte réussi',
    redirectUrl: null,
  }
}

// PayPal payment simulation
async function processPayPalPayment(amount: number, currency: string, orderId: string, customer: any) {
  return {
    success: true,
    transactionId: `PP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    status: 'pending',
    method: 'paypal',
    amount,
    currency,
    orderId,
    message: 'Redirection vers PayPal...',
    redirectUrl: `https://www.paypal.com/checkoutnow?amount=${amount}&currency=${currency}`,
  }
}

// Mobile money payment simulation
async function processMobileMoneyPayment(method: string, amount: number, currency: string, orderId: string, customer: any) {
  const methodNames: Record<string, string> = {
    mtn: 'MTN Mobile Money',
    moov: 'Moov Money',
    flutterwave: 'Flutterwave',
    paystack: 'Paystack',
    cinetpay: 'CinetPay',
  }

  return {
    success: true,
    transactionId: `MM-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    status: 'pending',
    method: 'mobile_money',
    provider: methodNames[method],
    amount,
    currency,
    orderId,
    message: `Envoyez ${amount} ${currency} au ${methodNames[method]}`,
    instructions: [
      `1. Ouvrez l'application ${methodNames[method]}`,
      `2. Sélectionnez "Envoyer de l'argent"`,
      `3. Entrez le montant: ${amount} ${currency}`,
      `4. Confirmez avec votre PIN`,
    ],
    redirectUrl: null,
  }
}

// Bank transfer simulation
async function processBankTransfer(method: string, amount: number, currency: string, orderId: string, customer: any) {
  const bankDetails = {
    bank: 'Ecobank',
    accountNumber: '12345678901',
    accountName: 'ELECTRON SARL',
    swift: 'ECOCBJJA',
  }

  return {
    success: true,
    transactionId: `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    status: 'pending',
    method: 'bank_transfer',
    amount,
    currency,
    orderId,
    message: 'Effectuez le virement avec les coordonnées ci-dessous',
    bankDetails,
    instructions: [
      `1. Connectez-vous à votre banque en ligne`,
      `2. Effectuez un virement de ${amount} ${currency}`,
      `3. Numéro de compte: ${bankDetails.accountNumber}`,
      `4. Nom du bénéficiaire: ${bankDetails.accountName}`,
      `5. Utilisez "${orderId}" comme référence`,
    ],
    redirectUrl: null,
  }
}
