import { NextResponse } from 'next/server'
import { users } from '@/lib/db/json-db'
import bcrypt from 'bcryptjs'

// Simple token generation using base64 (works in Edge runtime)
function generateToken(user: any) {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: Date.now()
  }
  // Use btoa for base64 encoding (works in Edge runtime)
  return btoa(JSON.stringify(payload))
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      )
    }

    const user = users.getByEmail(email)

    if (!user || !user.password) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      )
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      )
    }

    // Generate simple token
    const token = generateToken(user)

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      redirectUrl: user.role === 'admin' ? '/admin/' : '/client/',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token: token // Send token to client for localStorage
    })

    // Set auth cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Erreur de connexion' },
      { status: 500 }
    )
  }
}
