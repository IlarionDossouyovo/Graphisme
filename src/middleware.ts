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

  // Skip authentication check for now - use client-side auth only
  // TODO: Implement proper server-side auth later
  return NextResponse.next()
}

// Define which routes to protect
export const config = {
  matcher: [
    '/admin/:path*',
    '/client/:path*',
  ],
}
