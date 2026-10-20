import { NextRequest, NextResponse } from 'next/server'

import { isLocale, localeCookie, negotiateLocale } from '@/i18n/config'

/**
 * Sends `/` permanently (308) to the visitor's locale: cookie first, then Accept-Language, then English.
 * The redirect is marked uncacheable so a browser or CDN never pins the first language it saw.
 */
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get(localeCookie)?.value
  const locale = isLocale(cookie) ? cookie : negotiateLocale(request.headers.get('accept-language'))

  const url = request.nextUrl.clone()
  url.pathname = `/${locale}`
  const response = NextResponse.redirect(url, 308)
  response.headers.set('Vary', 'Accept-Language, Cookie')
  response.headers.set('Cache-Control', 'no-store')
  return response
}

export const config = {
  matcher: ['/'],
}
