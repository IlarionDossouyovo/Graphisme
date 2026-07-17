import { NextResponse } from 'next/server'

// Shipping zones
const shippingZones = [
  {
    id: 'cotonou',
    name: 'Cotonou & Agglomération',
    countries: ['BJ'],
    regions: ['Cotonou', 'Porto-Novo', 'Abomey-Calavi'],
    deliveryTime: '24-48h',
    freeShipping: false,
    baseRate: 1500,
    ratePerKg: 100,
  },
  {
    id: 'benin',
    name: 'Benin (hors Cotonou)',
    countries: ['BJ'],
    regions: ['Parakou', 'Kétou', 'Ouidah', '其它'],
    deliveryTime: '2-4 jours',
    freeShipping: false,
    baseRate: 2500,
    ratePerKg: 200,
  },
  {
    id: 'west-africa',
    name: 'Afrique de l\'Ouest',
    countries: ['NG', 'TG', 'GH', 'BF', 'NE', 'SN', 'CI', 'CM'],
    regions: [],
    deliveryTime: '5-10 jours',
    freeShipping: false,
    baseRate: 15000,
    ratePerKg: 500,
  },
  {
    id: 'africa',
    name: 'Afrique (autres)',
    countries: ['ZA', 'EG', 'MA', 'KE', 'ET'],
    regions: [],
    deliveryTime: '10-15 jours',
    freeShipping: false,
    baseRate: 25000,
    ratePerKg: 800,
  },
  {
    id: 'europe',
    name: 'Europe',
    countries: ['FR', 'BE', 'DE', 'ES', 'IT', 'GB', 'NL', 'PT'],
    regions: [],
    deliveryTime: '7-12 jours',
    freeShipping: false,
    baseRate: 35000,
    ratePerKg: 1200,
  },
  {
    id: 'world',
    name: 'International',
    countries: ['US', 'CA', 'BR', 'AR', 'CN', 'JP', 'AU'],
    regions: [],
    deliveryTime: '15-25 jours',
    freeShipping: false,
    baseRate: 50000,
    ratePerKg: 2000,
  },
]

// Shipping carriers
const carriers = [
  {
    id: 'dhl',
    name: 'DHL Express',
    logo: '🚚',
    tracking: true,
    insurance: true,
    express: true,
  },
  {
    id: 'fedex',
    name: 'FedEx',
    logo: '📦',
    tracking: true,
    insurance: true,
    express: true,
  },
  {
    id: 'ups',
    name: 'UPS',
    logo: '📫',
    tracking: true,
    insurance: true,
    express: true,
  },
  {
    id: 'ems',
    name: 'EMS',
    logo: '✉️',
    tracking: true,
    insurance: false,
    express: false,
  },
  {
    id: 'local',
    name: 'Livraison Locale',
    logo: '🏃',
    tracking: false,
    insurance: false,
    express: true,
  },
]

// GET: Get shipping options
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get('country') || 'BJ'
    const region = searchParams.get('region')
    const weight = parseFloat(searchParams.get('weight') || '1')

    // Find applicable zone
    const zone = shippingZones.find(z => 
      z.countries.includes(country) && 
      (region ? z.regions.includes(region) : true)
    ) || shippingZones[0]

    // Calculate shipping cost
    const shippingOptions = carriers.map(carrier => {
      const baseRate = zone.baseRate
      const weightRate = zone.ratePerKg * weight
      const totalRate = baseRate + weightRate

      return {
        carrier: carrier,
        zone: zone.name,
        deliveryTime: zone.deliveryTime,
        cost: totalRate,
        currency: 'XOF',
        freeShipping: zone.freeShipping,
      }
    })

    return NextResponse.json({
      success: true,
      zone,
      options: shippingOptions,
    })
  } catch (error) {
    console.error('Error fetching shipping options:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors du chargement des options de livraison' },
      { status: 500 }
    )
  }
}

// POST: Calculate shipping cost
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { destination, items, carrier } = body

    if (!destination || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Paramètres manquants' },
        { status: 400 }
      )
    }

    // Calculate total weight
    const totalWeight = items.reduce((sum: number, item: any) => {
      return sum + (item.weight || 1) * (item.quantity || 1)
    }, 0)

    // Find zone
    const zone = shippingZones.find(z => 
      z.countries.includes(destination.country) &&
      (destination.region ? z.regions.includes(destination.region) : true)
    ) || shippingZones[0]

    // Calculate cost
    const baseRate = zone.baseRate
    const weightRate = zone.ratePerKg * totalWeight
    const subtotal = baseRate + weightRate

    // Apply free shipping threshold
    const freeShippingThreshold = 150000
    const shippingCost = subtotal >= freeShippingThreshold ? 0 : subtotal

    // Generate estimated delivery date
    const today = new Date()
    const deliveryDays = zone.deliveryTime.split('-').map(d => parseInt(d.replace(/\D/g, '')))
    const minDays = deliveryDays[0] || 7
    const maxDays = deliveryDays[1] || 14
    
    const estimatedDelivery = new Date(today)
    estimatedDelivery.setDate(estimatedDelivery.getDate() + maxDays)

    return NextResponse.json({
      success: true,
      calculation: {
        totalWeight,
        baseRate,
        weightRate,
        subtotal,
        shippingCost,
        freeShipping: shippingCost === 0,
        threshold: freeShippingThreshold,
        currency: 'XOF',
      },
      delivery: {
        zone: zone.name,
        time: zone.deliveryTime,
        estimatedDate: estimatedDelivery.toISOString(),
      },
      carriers: carriers.map(c => ({
        id: c.id,
        name: c.name,
        logo: c.logo,
      })),
    })

  } catch (error) {
    console.error('Shipping calculation error:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors du calcul de la livraison' },
      { status: 500 }
    )
  }
}
