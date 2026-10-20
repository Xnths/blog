import { getServerSideURL } from '@/utilities/getURL'

import { defaultLocale, locales, type Locale } from './config'

/** Prefixes a site path (e.g. `/work/usp-aberta`) with the locale segment. */
export const localizedPath = (locale: Locale, path = ''): string => {
  const clean = path === '' || path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  return `/${locale}${clean}`
}

export const absoluteUrl = (path: string): string => `${getServerSideURL()}${path}`

/**
 * Canonical + hreflang alternates for a page path that exists in every locale. URLs are absolute:
 * Next appends a trailing slash to relative single-segment paths such as `/en`, which would then
 * point at a URL that redirects.
 */
export const buildAlternates = (path: string, locale: Locale) => ({
  canonical: absoluteUrl(localizedPath(locale, path)),
  languages: {
    ...Object.fromEntries(locales.map((l) => [l, absoluteUrl(localizedPath(l, path))])),
    'x-default': absoluteUrl(localizedPath(defaultLocale, path)),
  },
})

/** Replaces the locale segment of the current pathname. */
export const switchLocalePath = (pathname: string, next: Locale): string => {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length > 0 && (locales as readonly string[]).includes(segments[0])) {
    segments[0] = next
  } else {
    segments.unshift(next)
  }
  return `/${segments.join('/')}`
}
