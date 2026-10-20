import type { Metadata } from 'next'

import { PublicationItem } from '@/components/paper/Cards'
import { JsonLd } from '@/components/paper/JsonLd'
import { getDictionary } from '@/i18n'
import { isLocale } from '@/i18n/config'
import { getPublications } from '@/lib/content'
import { localizedPath } from '@/i18n/paths'
import { buildBreadcrumbs, graph } from '@/lib/seo/jsonld'
import { generateMeta } from '@/utilities/generateMeta'
import { notFound } from 'next/navigation'
import React from 'react'

type Args = { params: Promise<{ locale: string }> }

export default async function ResearchIndex({ params }: Args) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const dict = getDictionary(locale)
  const publications = await getPublications(locale)

  return (
    <div className="page py-16">
      <JsonLd
        data={graph(
          buildBreadcrumbs([
            { name: dict.nav.home, path: localizedPath(locale) },
            { name: dict.nav.research, path: localizedPath(locale, '/research') },
          ]),
        )}
      />

      <h1 className="text-[2.4rem]">{dict.research.title}</h1>
      <p className="mt-3 max-w-[var(--measure)] text-muted-foreground">{dict.research.lead}</p>

      <div className="mt-10">
        {publications.map((pub) => (
          <PublicationItem key={pub.id} publication={pub} locale={locale} dict={dict} />
        ))}
      </div>

      <section aria-labelledby="agenda" className="mt-14 border-t border-rule pt-8">
        <h2 id="agenda" className="mb-4 text-[1.5rem]">
          {dict.research.agendaTitle}
        </h2>
        <ol className="max-w-[var(--measure)] list-decimal space-y-3 pl-6 text-[0.98rem]">
          {dict.research.agenda.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <p className="mt-8 font-sans text-[0.85rem]">
          <a href="/cite/all.bib" className="link-arrow">
            {dict.research.downloadAll}
          </a>
        </p>
      </section>
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return generateMeta({
    title: dict.research.title,
    description: dict.research.lead,
    path: '/research',
    locale,
  })
}
