import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { APEX_HOST, CANONICAL_HOST } from './lib/seo';

const intlMiddleware = createMiddleware(routing);

/**
 * Canonical host + no trailing slash, enforced with 301 before the
 * next-intl middleware runs. Preview hosts (*.workers.dev, localhost) are
 * left untouched.
 */
export default async function middleware(request: NextRequest) {
  const host = (request.headers.get('host') ?? '').split(':')[0].toLowerCase();
  const { pathname } = request.nextUrl;

  const needsHostRedirect = host === APEX_HOST;
  const needsSlashRedirect = pathname.length > 1 && pathname.endsWith('/');

  if (needsHostRedirect || needsSlashRedirect) {
    const url = request.nextUrl.clone();
    if (needsHostRedirect) {
      url.host = CANONICAL_HOST;
      url.protocol = 'https';
      url.port = '';
    }
    if (needsSlashRedirect) {
      url.pathname = pathname.replace(/\/+$/, '');
    }
    return NextResponse.redirect(url, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
