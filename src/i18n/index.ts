import type { Locale } from './config'
import type { Dictionary } from './dictionaries/en'

import { en } from './dictionaries/en'
import { ptBR } from './dictionaries/pt-BR'

const dictionaries: Record<Locale, Dictionary> = {
  en,
  'pt-BR': ptBR,
}

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale]

export const formatDate = (value: string | Date, locale: Locale, withDay = true): string =>
  new Intl.DateTimeFormat(locale, {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    ...(withDay ? { day: 'numeric' } : {}),
  }).format(new Date(value))

export const formatNumber = (value: number, locale: Locale): string =>
  new Intl.NumberFormat(locale).format(value)

export type { Dictionary }
export * from './config'
