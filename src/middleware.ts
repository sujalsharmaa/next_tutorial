import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicPaths = path==='/login' || path==="/signup" || path==="/verifyEmail"
  const token = request.cookies.get('token')?.value || ''
  if(publicPaths && token){
    return NextResponse.redirect(new URL('/',request.nextUrl))
  }
  if(!publicPaths && !token){
    return NextResponse.redirect(new URL('/login',request.nextUrl))
  }
}
 
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyEmail'
  ]
}

// writing / before any route is extremely important