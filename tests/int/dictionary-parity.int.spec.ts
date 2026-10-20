import { describe, expect, it } from 'vitest'

import { en } from '@/i18n/dictionaries/en'
import { ptBR } from '@/i18n/dictionaries/pt-BR'
import { negotiateLocale } from '@/i18n/config'
import { absoluteUrl, buildAlternates, switchLocalePath } from '@/i18n/paths'

const flatten = (value: unknown, prefix = ''): Record<string, string> => {
  if (typeof value === 'string') return { [prefix]: value }
  if (Array.isArray(value)) {
    return value.reduce((acc, item, i) => ({ ...acc, ...flatten(item, `${prefix}[${i}]`) }), {})
  }
  return Object.entries(value as object).reduce(
    (acc, [k, v]) => ({ ...acc, ...flatten(v, prefix ? `${prefix}.${k}` : k) }),
    {},
  )
}

describe('dictionaries', () => {
  const a = flatten(en)
  const b = flatten(ptBR)

  it('have identical keys in both locales', () => {
    expect(Object.keys(b).sort()).toEqual(Object.keys(a).sort())
  })

  it('have no empty strings', () => {
    for (const [key, value] of [...Object.entries(a), ...Object.entries(b)]) {
      expect(value.trim(), key).not.toBe('')
    }
  })

  it('translate every string except the brand and shared words', () => {
    const same = Object.keys(a).filter((k) => a[k] === b[k])
    expect(same.sort()).toEqual(['caseStudy.figure', 'caseStudy.links', 'siteName'])
  })
})

describe('locale helpers', () => {
  it('negotiates the locale from Accept-Language', () => {
    expect(negotiateLocale('pt-BR,pt;q=0.9,en;q=0.8')).toBe('pt-BR')
    expect(negotiateLocale('en-US,en;q=0.9')).toBe('en')
    expect(negotiateLocale('fr-FR,fr;q=0.9')).toBe('en')
    expect(negotiateLocale(null)).toBe('en')
    expect(negotiateLocale('en;q=0.5, pt;q=0.9')).toBe('pt-BR')
  })

  it('switches the locale segment and keeps the path', () => {
    expect(switchLocalePath('/en/work/usp-aberta', 'pt-BR')).toBe('/pt-BR/work/usp-aberta')
    expect(switchLocalePath('/pt-BR', 'en')).toBe('/en')
    expect(switchLocalePath('/', 'en')).toBe('/en')
  })

  it('builds canonical and hreflang alternates with x-default', () => {
    const alt = buildAlternates('/work', 'pt-BR')
    expect(alt.canonical).toBe(absoluteUrl('/pt-BR/work'))
    expect(alt.languages).toEqual({
      en: absoluteUrl('/en/work'),
      'pt-BR': absoluteUrl('/pt-BR/work'),
      'x-default': absoluteUrl('/en/work'),
    })
    expect(buildAlternates('', 'en').canonical.endsWith('/en')).toBe(true)
  })
})
