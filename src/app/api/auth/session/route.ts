import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (session?.user) {
      return NextResponse.json({
        authenticated: true,
        user: {
          id: (session.user as any).id,
          name: session.user.name,
          email: session.user.email,
          role: (session.user as any).role,
        }
      })
    }
    
    return NextResponse.json({ authenticated: false })
  } catch (error) {
    return NextResponse.json({ authenticated: false, error: 'Session error' })
  }
}
