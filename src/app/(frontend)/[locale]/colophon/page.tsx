import type { Metadata } from 'next'

import { colophonReferences, colophonRows } from '@/content/colophon'
import { JsonLd } from '@/components/paper/JsonLd'
import { getDictionary } from '@/i18n'
import { isLocale } from '@/i18n/config'
import { localizedPath } from '@/i18n/paths'
import { buildBreadcrumbs, graph } from '@/lib/seo/jsonld'
import { generateMeta } from '@/utilities/generateMeta'
import { notFound } from 'next/navigation'
import React from 'react'

type Args = { params: Promise<{ locale: string }> }

export default async function ColophonPage({ params }: Args) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const dict = getDictionary(locale)
  const order = new Map(colophonReferences.map((r, i) => [r.id, i + 1]))

  return (
    <article className="page py-16">
      <JsonLd
        data={graph(
          buildBreadcrumbs([
            { name: dict.nav.home, path: localizedPath(locale) },
            { name: dict.nav.colophon, path: localizedPath(locale, '/colophon') },
          ]),
        )}
      />

      <h1 className="text-[2.4rem]">{dict.colophon.title}</h1>
      <p className="mt-4 max-w-[var(--measure)] text-[1.1rem] leading-snug">{dict.colophon.lead}</p>
      <p className="mt-3 max-w-[var(--measure)] font-sans text-[0.88rem] text-muted-foreground">
        {dict.colophon.inspiration}{' '}
        <a href="https://github.com/emmabostian/developer-portfolios" rel="noopener noreferrer">
          github.com/emmabostian/developer-portfolios
        </a>
      </p>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left font-sans text-[0.88rem]">
          <thead>
            <tr className="border-b border-ink">
              <th scope="col" className="w-14 py-2 pr-3 font-semibold">
                {dict.colophon.table.source}
              </th>
              <th scope="col" className="py-2 pr-6 font-semibold">
                {dict.colophon.table.finding}
              </th>
              <th scope="col" className="py-2 font-semibold">
                {dict.colophon.table.decision}
              </th>
            </tr>
          </thead>
          <tbody>
            {colophonRows.map((row) => (
              <tr key={row.id} className="border-b border-rule align-top">
                <td className="num py-3 pr-3">
                  <a href={`#ref-${row.id}`}>[{order.get(row.id)}]</a>
                </td>
                <td className="py-3 pr-6 leading-relaxed text-muted-foreground">{row.finding[locale]}</td>
                <td className="py-3 leading-relaxed">{row.decision[locale]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section aria-labelledby="references" className="mt-14 border-t border-rule pt-6">
        <h2 id="references" className="mb-4 text-[1.4rem]">
          {dict.colophon.references}
        </h2>
        <ol className="space-y-2 font-sans text-[0.85rem] leading-relaxed text-muted-foreground">
          {colophonReferences.map((ref, i) => (
            <li key={ref.id} id={`ref-${ref.id}`} className="flex gap-3">
              <span className="num w-7 shrink-0 text-right text-foreground">[{i + 1}]</span>
              <span>
                {ref.citation}
                {ref.url && (
                  <>
                    {' '}
                    <a href={ref.url} rel="noopener noreferrer" target="_blank">
                      {ref.url}
                    </a>
                  </>
                )}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return generateMeta({
    title: dict.colophon.title,
    description: dict.colophon.lead,
    path: '/colophon',
    locale,
  })
}
