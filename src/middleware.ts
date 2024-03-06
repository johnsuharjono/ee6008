import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

import type { NextRequestWithAuth } from 'next-auth/middleware'
export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    if (req.nextUrl.pathname.startsWith('/faculty') && req.nextauth.token?.role !== 'FACULTY') {
      return NextResponse.rewrite(new URL('/denied', req.url))
    }

    if (req.nextUrl.pathname.startsWith('/admin') && req.nextauth.token?.role !== 'ADMIN') {
      return NextResponse.rewrite(new URL('/denied', req.url))
    }

    if (req.nextUrl.pathname.startsWith('/student') && req.nextauth.token?.role !== 'STUDENT') {
      return NextResponse.rewrite(new URL('/denied', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token
      }
    }
  }
)

export const config = {
  matcher: ['/', '/student/:path*', '/faculty/:path*', '/admin/:path*']
}
