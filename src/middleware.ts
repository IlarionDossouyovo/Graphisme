import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

// Middleware to protect admin and client routes
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Skip auth routes
    if (path.startsWith('/api/auth')) {
      return NextResponse.next()
    }

    // Check if user is authenticated
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Admin routes protection
    if (path.startsWith('/admin')) {
      if (token.role !== 'admin') {
        return NextResponse.redirect(new URL('/login?error=unauthorized', req.url))
      }
    }

    // Client routes protection - allow both admin and client
    if (path.startsWith('/client')) {
      if (token.role !== 'client' && token.role !== 'admin') {
        return NextResponse.redirect(new URL('/login?error=unauthorized', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

// Define which routes to protect
export const config = {
  matcher: [
    '/admin/:path*',
    '/client/:path*',
    '/api/users/:path*',
    '/api/projects/:path*',
    '/api/quotes/:path*',
    '/api/invoices/:path*',
  ],
}
