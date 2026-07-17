import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

const dataFile = path.join(process.cwd(), 'src/lib/db/data/users.json')

interface User {
  id: string
  email: string
  name: string
  password?: string
  role: string
  avatar?: string | null
  phone?: string
  company?: string
  createdAt: string
  updatedAt: string
}

function getUsers(): User[] {
  const data = fs.readFileSync(dataFile, 'utf-8')
  return JSON.parse(data)
}

function saveUsers(users: User[]) {
  fs.writeFileSync(dataFile, JSON.stringify(users, null, 2))
}

// GET - List all users (admin only)
export async function GET() {
  try {
    const users = getUsers()
    // Remove password from response
    const safeUsers = users.map(({ password, ...user }) => user)
    return NextResponse.json(safeUsers)
  } catch (error) {
    console.error('Error reading users:', error)
    return NextResponse.json({ error: 'Error loading users' }, { status: 500 })
  }
}

// POST - Create new user (registration)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, role } = body

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Nom, email et mot de passe requis' },
        { status: 400 }
      )
    }

    const users = getUsers()

    // Check if email already exists
    const existingUser = users.find((u: any) => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'Cet email est déjà utilisé' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password: hashedPassword,
      role: role || 'client',
      avatar: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    users.push(newUser)
    saveUsers(users)

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser
    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 })
  }
}
