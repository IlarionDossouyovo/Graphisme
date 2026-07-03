import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataFile = path.join(process.cwd(), 'src/lib/db/data/users.json')

function getUsers() {
  const data = fs.readFileSync(dataFile, 'utf-8')
  return JSON.parse(data)
}

export async function GET() {
  try {
    const users = getUsers()
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error reading users:', error)
    return NextResponse.json({ error: 'Error loading users' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const users = getUsers()
    
    const newUser = {
      id: `user-${Date.now()}`,
      ...body,
      role: 'client',
      createdAt: new Date().toISOString()
    }
    
    users.push(newUser)
    fs.writeFileSync(dataFile, JSON.stringify(users, null, 2))
    
    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 })
  }
}
