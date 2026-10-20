import type { Metadata } from 'next'

import { CopyBibtex } from '@/components/paper/CopyBibtex'
import { JsonLd } from '@/components/paper/JsonLd'
import { buildBibtex } from '@/lib/bibtex'
import { getDictionary } from '@/i18n'
import { isLocale } from '@/i18n/config'
import { localizedPath } from '@/i18n/paths'
import { getPublication, getSite } from '@/lib/content'
import {
  buildBreadcrumbs,
  buildOrganization,
  buildPerson,
  buildPublication,
  graph,
} from '@/lib/seo/jsonld'
import { generateMeta } from '@/utilities/generateMeta'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

type Args = { params: Promise<{ locale: string; slug: string }> }

export default async function PublicationPage({ params }: Args) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const { isEnabled: draft } = await draftMode()
  const dict = getDictionary(locale)
  const [pub, site] = await Promise.all([getPublication(locale, slug, draft), getSite(locale)])
  if (!pub) notFound()

  const bibtex = buildBibtex(pub)
  const related = (pub.relatedProjects ?? []).filter(
    (p): p is Exclude<typeof p, string | number> => typeof p === 'object',
  )
  const pdf = typeof pub.pdf === 'object' && pub.pdf?.url ? pub.pdf.url : null

  return (
    <article className="page py-12">
      <JsonLd
        data={graph(
          buildPerson(site),
          buildOrganization(site),
          buildPublication(pub, locale),
          buildBreadcrumbs([
            { name: dict.nav.home, path: localizedPath(locale) },
            { name: dict.nav.research, path: localizedPath(locale, '/research') },
            { name: pub.title, path: localizedPath(locale, `/research/${pub.slug}`) },
          ]),
        )}
      />

      <nav aria-label="Breadcrumb" className="label-mono mb-8">
        <Link href={localizedPath(locale, '/research')} className="no-underline hover:text-foreground">
          ← {dict.research.backToResearch}
        </Link>
      </nav>

      <header className="max-w-[var(--measure)]">
        <p className="label-mono mb-3">
          {dict.research.type[pub.type]} · {pub.year} ·{' '}
          <span className={pub.status === 'published' ? '' : 'text-accent'}>
            {dict.research.status[pub.status]}
          </span>
        </p>
        <h1 className="text-[2rem] sm:text-[2.5rem]">{pub.title}</h1>
        <p className="mt-4 font-sans text-[0.95rem]">
          {(pub.authors ?? []).map((a) => a.name).join(', ')}
        </p>
        {pub.venue && <p className="font-sans text-[0.88rem] text-muted-foreground">{pub.venue}</p>}
        {pub.advisor && (
          <p className="font-sans text-[0.88rem] text-muted-foreground">
            {dict.research.advisor}: {pub.advisor}
          </p>
        )}
      </header>

      {pub.abstract && (
        <section aria-labelledby="abstract" className="mt-8 max-w-[var(--measure)] border-y border-rule py-6">
          <h2 id="abstract" className="label-mono mb-2">
            {dict.research.abstract}
          </h2>
          <p className="leading-relaxed">{pub.abstract}</p>
          {(pub.keywords ?? []).length > 0 && (
            <p className="mt-3 font-sans text-[0.82rem] text-muted-foreground">
              <span className="label-mono mr-2">{dict.research.keywords}</span>
              {(pub.keywords ?? []).join(' · ')}
            </p>
          )}
        </section>
      )}

      <p className="mt-6 flex flex-wrap gap-x-6 gap-y-1 font-sans text-[0.9rem]">
        {pub.doi && (
          <a href={`https://doi.org/${pub.doi}`} rel="noopener noreferrer" target="_blank">
            DOI
          </a>
        )}
        {pub.url && (
          <a href={pub.url} rel="noopener noreferrer" target="_blank">
            URL
          </a>
        )}
        {pub.repoUrl && (
          <a href={pub.repoUrl} rel="noopener noreferrer" target="_blank">
            Repository
          </a>
        )}
        {pdf && (
          <a href={pdf} rel="noopener noreferrer" target="_blank">
            PDF
          </a>
        )}
      </p>

      <section aria-labelledby="cite" className="mt-10 max-w-[var(--measure)]">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h2 id="cite" className="label-mono">
            {dict.research.cite}
          </h2>
          <CopyBibtex bibtex={bibtex} label={dict.research.copyBibtex} copiedLabel={dict.research.copied} />
        </div>
        <pre className="overflow-x-auto border border-rule bg-surface p-4 font-mono text-[0.78rem] leading-relaxed">
          {bibtex}
        </pre>
      </section>

      {related.length > 0 && (
        <section className="mt-10 max-w-[var(--measure)]">
          <h2 className="label-mono mb-2">
            {dict.research.related}
          </h2>
          <ul className="space-y-1">
            {related.map((p) => (
              <li key={p.id}>
                <Link href={localizedPath(locale, `/work/${p.slug}`)} className="link-arrow">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const pub = await getPublication(locale, slug)
  if (!pub) return {}

  const base = generateMeta({
    title: pub.meta?.title || pub.title,
    description: pub.meta?.description || pub.abstract,
    path: `/research/${pub.slug}`,
    locale,
    type: 'article',
  })

  return {
    ...base,
    other: {
      citation_title: pub.title,
      citation_author: (pub.authors ?? []).map((a) => a.name),
      citation_publication_date: String(pub.year),
      citation_language: locale,
      ...(pub.venue ? { citation_conference_title: pub.venue } : {}),
      ...(pub.doi ? { citation_doi: pub.doi } : {}),
    },
  }
}
