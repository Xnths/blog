import type { Publication } from '@/payload-types'

const escapeBibtex = (value: string): string =>
  value.replace(/([&%$#_])/g, '\\$1').replace(/[{}]/g, '')

const stripDiacritics = (value: string): string =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const lastWord = (name: string): string => name.trim().split(/\s+/).pop() ?? name

export const bibtexKey = (pub: Pick<Publication, 'authors' | 'year' | 'title' | 'bibtexKey'>): string => {
  if (pub.bibtexKey) return pub.bibtexKey
  const first = pub.authors?.[0]?.name ?? 'anon'
  const titleWord =
    (pub.title ?? '')
      .split(/\s+/)
      .find((w) => w.replace(/[^\p{L}]/gu, '').length > 3)
      ?.replace(/[^\p{L}]/gu, '') ?? 'work'
  return stripDiacritics(`${lastWord(first)}${pub.year}${titleWord}`)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

const entryType = (type: Publication['type']): string => {
  switch (type) {
    case 'conferencePaper':
      return 'inproceedings'
    case 'journalArticle':
      return 'article'
    case 'thesis':
      return 'thesis'
    default:
      return 'misc'
  }
}

export const buildBibtex = (pub: Publication): string => {
  if (pub.bibtexOverride?.trim()) return pub.bibtexOverride.trim()

  const fields: [string, string | number | undefined | null][] = [
    ['author', (pub.authors ?? []).map((a) => a.name).join(' and ')],
    ['title', pub.title],
    ['year', pub.year],
  ]

  if (pub.type === 'conferencePaper') fields.push(['booktitle', pub.venue])
  else if (pub.type === 'journalArticle') fields.push(['journal', pub.venue])
  else if (pub.type === 'thesis') {
    fields.push(['type', "Bachelor's thesis"], ['school', pub.venue])
  } else fields.push(['howpublished', pub.venue])

  if (pub.advisor) fields.push(['note', `Advisor: ${pub.advisor}`])
  if (pub.status === 'inPreparation') fields.push(['note', 'In preparation'])
  if (pub.status === 'submitted') fields.push(['note', 'Submitted'])
  if (pub.doi) fields.push(['doi', pub.doi])
  if (pub.url) fields.push(['url', pub.url])

  const body = fields
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .map(([k, v]) => `  ${k} = {${k === 'url' || k === 'doi' ? v : escapeBibtex(String(v))}}`)
    .join(',\n')

  return `@${entryType(pub.type)}{${bibtexKey(pub)},\n${body}\n}`
}
