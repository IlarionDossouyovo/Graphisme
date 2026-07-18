// Settings API - Graphisme by ELECTRON
// Admin settings management

import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const SETTINGS_FILE = path.join(process.cwd(), 'data', 'settings.json')

// Default settings
const defaultSettings = {
  general: {
    siteName: 'Graphisme by ELECTRON',
    siteDescription: 'Services de graphisme professionnel au Benin',
    currency: 'XOF',
    currencySymbol: 'XOF',
    timezone: 'Africa/Porto-Novo',
    language: 'fr'
  },
  business: {
    companyName: 'ELECTRON',
    email: 'electronbusiness07@gmail.com',
    phone: '+229 01 23 45 67 89',
    address: 'Cotonou, Benin',
    whatsapp: '+229 01 23 45 67 89',
    facebook: 'https://facebook.com/electron',
    instagram: 'https://instagram.com/electron'
  },
  orders: {
    autoProcess: false,
    sendNotifications: true,
    requirePayment: true,
    orderPrefix: 'CMD',
    orderNumberFormat: 'YYYY-NNN'
  },
  emails: {
    orderConfirmation: true,
    orderProcessing: true,
    orderCompleted: true,
    invoiceAttached: true,
    fromEmail: 'noreply@graphisme.electron',
    fromName: 'Graphisme by ELECTRON'
  },
  ai: {
    enabled: true,
    defaultModel: 'llama3.2:latest',
    temperature: 0.7,
    maxTokens: 2048
  },
  automation: {
    enabled: false,
    schedule: '*/5 * * * *',
    processPendingOrders: true
  }
}

// Helper to read settings
async function getSettings() {
  try {
    const data = await fs.readFile(SETTINGS_FILE, 'utf-8')
    return { ...defaultSettings, ...JSON.parse(data) }
  } catch {
    // Create default settings file if doesn't exist
    try {
      await fs.mkdir(path.dirname(SETTINGS_FILE), { recursive: true })
      await fs.writeFile(SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2))
    } catch (e) {
      console.error('Error creating settings file:', e)
    }
    return defaultSettings
  }
}

// Helper to save settings
async function saveSettings(settings: any) {
  await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2))
}

export async function GET() {
  try {
    const settings = await getSettings()
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Settings GET error:', error)
    return NextResponse.json(defaultSettings)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const currentSettings = await getSettings()
    
    // Merge with current settings
    const updatedSettings = {
      ...currentSettings,
      ...body,
      general: { ...currentSettings.general, ...body.general },
      business: { ...currentSettings.business, ...body.business },
      orders: { ...currentSettings.orders, ...body.orders },
      emails: { ...currentSettings.emails, ...body.emails },
      ai: { ...currentSettings.ai, ...body.ai },
      automation: { ...currentSettings.automation, ...body.automation }
    }

    await saveSettings(updatedSettings)

    return NextResponse.json({
      success: true,
      message: 'Paramètres enregistrés',
      settings: updatedSettings
    })
  } catch (error) {
    console.error('Settings PUT error:', error)
    return NextResponse.json({ error: 'Erreur lors de la sauvegarde' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    // Reset to defaults
    if (action === 'reset') {
      await saveSettings(defaultSettings)
      return NextResponse.json({
        success: true,
        message: 'Paramètres réinitialisés',
        settings: defaultSettings
      })
    }

    return NextResponse.json({ error: 'Action invalide' }, { status: 400 })
  } catch (error) {
    console.error('Settings POST error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
