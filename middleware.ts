import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host');
  const pathname = url.pathname;

  // 1. Define files that SHOULD NOT be redirected
  const isStaticCrawlerFile = pathname === '/ads.txt' || pathname === '/robots.txt';

  // 2. If the user hits the naked domain (creatortools.co.in)
  if (hostname === 'creatortools.co.in') {
    
    // If it's ads.txt or robots.txt, serve it directly (Stop the redirect)
    if (isStaticCrawlerFile) {
      return NextResponse.next();
    }

    // For all other pages, redirect to the WWW version for SEO consistency
    url.host = 'www.creatortools.co.in';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// Only run middleware on these paths for maximum performance
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};