import type { Locale } from '@/i18n/config'
import type { Project, Publication, Site } from '@/payload-types'

import { locales } from '@/i18n/config'
import { absoluteUrl, localizedPath } from '@/i18n/paths'

type Json = Record<string, unknown>

export const ids = {
  person: () => absoluteUrl('/#person'),
  org: () => absoluteUrl('/#org'),
  site: () => absoluteUrl('/#website'),
}

export const buildPerson = (site: Site): Json => ({
  '@type': 'Person',
  '@id': ids.person(),
  name: site.name,
  alternateName: site.alias ?? 'Xnths',
  url: absoluteUrl(localizedPath('en')),
  jobTitle: site.positioning,
  sameAs: (site.links ?? []).filter((l) => l.kind !== 'email').map((l) => l.url),
  knowsAbout: (site.capabilities ?? []).map((c) => c.title),
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'Instituto de Matemática e Estatística, Universidade de São Paulo',
    url: 'https://www.ime.usp.br',
  },
  address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressCountry: 'BR' },
})

export const buildOrganization = (site: Site): Json => ({
  '@type': 'Organization',
  '@id': ids.org(),
  name: site.organization?.brand ?? 'Xnths',
  legalName: site.organization?.legalName ?? 'J. Castilho Tecnologia Ltda',
  foundingDate: String(site.organization?.foundingYear ?? 2015),
  url: absoluteUrl(localizedPath('en')),
  founder: { '@id': ids.person() },
})

export const buildWebSite = (site: Site): Json => ({
  '@type': 'WebSite',
  '@id': ids.site(),
  name: site.organization?.brand ?? 'Xnths',
  url: absoluteUrl(localizedPath('en')),
  inLanguage: [...locales],
  publisher: { '@id': ids.org() },
  author: { '@id': ids.person() },
})

export const buildProject = (project: Project, locale: Locale): Json => {
  const url = absoluteUrl(localizedPath(locale, `/work/${project.slug}`))
  const live = (project.links ?? []).find((l) => l.kind === 'live')
  const partners = project.partners ?? []
  const named = (role: string) =>
    partners.filter((p) => p.role === role).map((p) => ({ '@type': 'Organization', name: p.name, url: p.url ?? undefined }))

  const base: Json = {
    '@type': project.kind === 'caseStudy' ? 'SoftwareApplication' : 'CreativeWork',
    '@id': `${url}#project`,
    name: project.title,
    description: project.summary,
    url,
    inLanguage: locale,
    creator: { '@id': ids.person() },
    author: { '@id': ids.person() },
    publisher: { '@id': ids.org() },
    dateCreated: project.period?.start ?? undefined,
    keywords: project.stack ?? undefined,
  }

  if (project.kind === 'caseStudy') {
    base.applicationCategory = 'EducationalApplication'
    base.operatingSystem = 'Web'
    base.sameAs = live ? [live.url] : undefined
    const sponsors = named('initiative')
    if (sponsors.length) base.sponsor = sponsors
    const contributors = [...named('partner'), ...named('lab')]
    if (contributors.length) base.contributor = contributors
  }

  return base
}

export const buildPublication = (pub: Publication, locale: Locale): Json => {
  const url = absoluteUrl(localizedPath(locale, `/research/${pub.slug}`))
  return {
    '@type': pub.type === 'thesis' ? 'Thesis' : 'ScholarlyArticle',
    '@id': `${url}#publication`,
    name: pub.title,
    headline: pub.title,
    url,
    inLanguage: locale,
    abstract: pub.abstract ?? undefined,
    datePublished: String(pub.year),
    keywords: pub.keywords ?? undefined,
    creativeWorkStatus: pub.status,
    author: (pub.authors ?? []).map((a) =>
      a.isSelf
        ? { '@id': ids.person() }
        : { '@type': 'Person', name: a.name, affiliation: a.affiliation ?? undefined },
    ),
    isPartOf: pub.venue ? { '@type': 'Periodical', name: pub.venue } : undefined,
    sameAs: pub.doi ? [`https://doi.org/${pub.doi}`] : pub.url ? [pub.url] : undefined,
  }
}

export const buildBreadcrumbs = (items: { name: string; path: string }[]): Json => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
})

export const graph = (...nodes: (Json | undefined)[]): Json => ({
  '@context': 'https://schema.org',
  '@graph': nodes.filter(Boolean),
})

/** Escapes `<` so a JSON-LD payload can never close its own script tag. */
export const serializeJsonLd = (value: unknown): string =>
  JSON.stringify(value).replace(/</g, '\\u003c')
