import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataFile = path.join(process.cwd(), 'src/lib/db/data/contacts.json')

function getContacts() {
  const data = fs.readFileSync(dataFile, 'utf-8')
  return JSON.parse(data)
}

export async function GET() {
  try {
    const contacts = getContacts()
    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Error reading contacts:', error)
    return NextResponse.json({ error: 'Error loading contacts' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const contacts = getContacts()
    
    const newContact = {
      id: `contact-${Date.now()}`,
      ...body,
      status: 'new',
      createdAt: new Date().toISOString()
    }
    
    contacts.push(newContact)
    fs.writeFileSync(dataFile, JSON.stringify(contacts, null, 2))
    
    return NextResponse.json(newContact, { status: 201 })
  } catch (error) {
    console.error('Error creating contact:', error)
    return NextResponse.json({ error: 'Error creating contact' }, { status: 500 })
  }
}
