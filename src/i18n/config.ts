export const locales = ['en', 'pt-BR'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const isLocale = (value: string | undefined | null): value is Locale =>
  Boolean(value) && (locales as readonly string[]).includes(value as string)

export const ogLocale: Record<Locale, string> = {
  en: 'en_US',
  'pt-BR': 'pt_BR',
}

export const localeLabel: Record<Locale, string> = {
  en: 'English',
  'pt-BR': 'Português',
}

export const localeCookie = 'NEXT_LOCALE'

/** Picks a supported locale from an Accept-Language header, falling back to the default. */
export const negotiateLocale = (acceptLanguage: string | null | undefined): Locale => {
  if (!acceptLanguage) return defaultLocale

  const requested = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { tag } of requested) {
    if (tag.startsWith('pt')) return 'pt-BR'
    if (tag.startsWith('en')) return 'en'
  }

  return defaultLocale
}
