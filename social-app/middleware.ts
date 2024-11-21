import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)

  requestHeaders.set('X-Current-Path', request.nextUrl.pathname)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  return response
}

