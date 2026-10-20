import { NextRequest, NextResponse } from 'next/server'

import { isLocale, localeCookie, negotiateLocale } from '@/i18n/config'

/** Sends `/` to the visitor's locale: cookie first, then Accept-Language, then English. */
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get(localeCookie)?.value
  const locale = isLocale(cookie) ? cookie : negotiateLocale(request.headers.get('accept-language'))

  const url = request.nextUrl.clone()
  url.pathname = `/${locale}`
  const response = NextResponse.redirect(url, 307)
  response.headers.set('Vary', 'Accept-Language, Cookie')
  return response
}

export const config = {
  matcher: ['/'],
}
