import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
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
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip auth routes and public routes
  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/api/') ||
    pathname === '/' ||
    pathname.startsWith('/shop') ||
    pathname.startsWith('/portfolio') ||
    pathname.startsWith('/services') ||
    pathname.startsWith('/contact') ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/ai-team') ||
    pathname.startsWith('/pricing') ||
    pathname.startsWith('/blog') ||
    pathname.startsWith('/demo') ||
    pathname.startsWith('/marketplace') ||
    pathname.startsWith('/cart') ||
    pathname.startsWith('/art-gallery') ||
    pathname.startsWith('/ai-studio') ||
    pathname.startsWith('/print-shop') ||
    pathname.startsWith('/affiliate') ||
    pathname.startsWith('/founder-ai-center')
  ) {
    return NextResponse.next()
  }

  // Get auth token from cookie OR from Authorization header
  let authToken = request.cookies.get('auth-token')?.value
  
  // Also check Authorization header for client-side tokens
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    authToken = authHeader.substring(7)
  }

  if (!authToken) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  const user = verifyToken(authToken)

  if (!user) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
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
