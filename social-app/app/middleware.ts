// middleware.js
import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone request headers for modification (recommended)
  const requestHeaders = new Headers(request.headers);

  // Set custom header 'Path-Name' based on desired logic
//   requestHeaders.set('Path-Name', 'Minh Trung'); // Or any dynamic value

  // Set a more informative 'Path-Name' header based on the request URL
  requestHeaders.set('X-Current-Path', request.nextUrl.pathname);

  // Create a new NextResponse with modified request headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}


// export const config = {
//   matcher: '/((?!api|static|favicon.ico).*)',
// };