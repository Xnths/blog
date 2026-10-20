import type { Locale } from '@/i18n/config'
import type { Metadata } from 'next'

import { locales, ogLocale } from '@/i18n/config'
import { absoluteUrl, buildAlternates } from '@/i18n/paths'

type Args = {
  title?: string | null
  description?: string | null
  /** Locale-less path, e.g. `/work/usp-aberta`. Use `''` for the home page. */
  path: string
  locale: Locale
  type?: 'website' | 'article'
  noindex?: boolean
  /** When the page exists in a single locale only, point the canonical there and skip hreflang. */
  singleLocale?: Locale
}

/** Page metadata with canonical + hreflang alternates and Open Graph locale. */
export const generateMeta = ({
  title,
  description,
  path,
  locale,
  type = 'website',
  noindex = false,
  singleLocale,
}: Args): Metadata => {
  const alternates = singleLocale
    ? { canonical: absoluteUrl(`/${singleLocale}${path}`) }
    : buildAlternates(path, locale)

  return {
    title: title ?? undefined,
    description: description ?? undefined,
    alternates,
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      title: title ?? undefined,
      description: description ?? undefined,
      url: alternates.canonical,
      siteName: 'Xnths',
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
    },
    twitter: { card: 'summary_large_image', title: title ?? undefined, description: description ?? undefined },
  }
}
