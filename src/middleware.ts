import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key'

// JWT token verification helper
function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as {
      id: string
      email: string
      name: string
      role: string
    }
  } catch {
    return null
  }
}

// Middleware to protect admin and client routes
export function middleware(request: Request) {
  const path = request.url.split('/').slice(3).join('/')
  const fullPath = '/' + path
  
  // Skip auth routes and public routes
  if (
    fullPath.startsWith('/api/auth') ||
    fullPath.startsWith('/login') ||
    fullPath === '/' ||
    fullPath.startsWith('/shop') ||
    fullPath.startsWith('/portfolio') ||
    fullPath.startsWith('/services') ||
    fullPath.startsWith('/contact') ||
    fullPath.startsWith('/about')
  ) {
    return NextResponse.next()
  }

  // Get auth token from cookie
  const authToken = request.headers.get('cookie')?.match(/auth-token=([^;]+)/)?.[1]

  if (!authToken) {
    // Try to redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const user = verifyToken(authToken)

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Admin routes protection
  if (fullPath.startsWith('/admin')) {
    if (user.role !== 'admin') {
      return NextResponse.redirect(new URL('/login?error=unauthorized', request.url))
    }
  }

  // Client routes protection - allow both admin and client
  if (fullPath.startsWith('/client')) {
    if (user.role !== 'client' && user.role !== 'admin') {
      return NextResponse.redirect(new URL('/login?error=unauthorized', request.url))
    }
  }

  return NextResponse.next()
}

// Define which routes to protect
export const config = {
  matcher: [
    '/admin/:path*',
    '/client/:path*',
  ],
}
