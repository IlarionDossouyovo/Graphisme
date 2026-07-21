import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

// Use a consistent secret key (should match the login route)
const JWT_SECRET = 'your-secret-key'

// Force Node.js runtime for middleware (required for JWT verification)
export const runtime = 'nodejs'

// JWT token verification helper
function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string
      email: string
      name: string
      role: string
    }
    console.log('[Middleware] Token decoded successfully:', decoded)
    return decoded
  } catch (error: any) {
    console.log('[Middleware] Token verification failed:', error.message)
    return null
  }
}

// Middleware to protect admin and client routes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  console.log('[Middleware] Checking path:', pathname)
  
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
    console.log('[Middleware] Public path, allowing')
    return NextResponse.next()
  }

  // Get auth token from cookie
  const authToken = request.cookies.get('auth-token')?.value
  console.log('[Middleware] Auth token present:', !!authToken)

  if (!authToken) {
    console.log('[Middleware] No token, redirecting to login')
    const loginUrl = new URL('/login/', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Verify the token
  const user = verifyToken(authToken)
  if (!user) {
    console.log('[Middleware] Invalid token, redirecting to login')
    const loginUrl = new URL('/login/', request.url)
    return NextResponse.redirect(loginUrl)
  }

  console.log('[Middleware] User authenticated:', user.role)
  return NextResponse.next()
}

// Define which routes to protect
export const config = {
  matcher: [
    '/admin/:path*',
    '/client/:path*',
  ],
}
