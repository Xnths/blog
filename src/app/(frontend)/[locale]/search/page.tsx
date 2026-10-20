import type { Metadata } from 'next'

import { getDictionary } from '@/i18n'
import { isLocale } from '@/i18n/config'
import { localizedPath } from '@/i18n/paths'
import { searchPortfolio } from '@/lib/content'
import { generateMeta } from '@/utilities/generateMeta'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

type Args = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ q?: string }>
}

const sectionByCollection: Record<string, string> = {
  projects: 'work',
  publications: 'research',
}

export default async function SearchPage({ params, searchParams }: Args) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const { q = '' } = await searchParams
  const query = q.trim().slice(0, 100)
  const dict = getDictionary(locale)
  const results = query ? await searchPortfolio(locale, query) : []

  return (
    <div className="page py-16">
      <h1 className="text-[2.2rem]">{dict.search.title}</h1>
      <form action={localizedPath(locale, '/search')} method="get" role="search" className="mt-6 flex max-w-[var(--measure)] gap-2">
        <label htmlFor="q" className="sr-only">
          {dict.search.placeholder}
        </label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={query}
          placeholder={dict.search.placeholder}
          className="flex-1 border border-rule bg-background px-3 py-2 font-sans text-[0.95rem]"
        />
        <button type="submit" className="border border-ink bg-ink px-4 py-2 font-sans text-[0.9rem] text-paper">
          {dict.search.submit}
        </button>
      </form>

      {query && (
        <div className="mt-8">
          <p className="label-mono mb-2">
            {dict.search.results}: {results.length}
          </p>
          {results.length === 0 ? (
            <p className="text-muted-foreground">{dict.search.none}</p>
          ) : (
            results.map((result) => {
              const collection = result.doc?.relationTo as string
              const section = sectionByCollection[collection]
              if (!section || !result.slug) return null
              return (
                <article key={result.id} className="border-t border-rule py-4">
                  <Link href={localizedPath(locale, `/${section}/${result.slug}`)} className="text-[1.1rem]">
                    {result.title}
                  </Link>
                  {result.meta?.description && (
                    <p className="mt-1 text-[0.92rem] text-muted-foreground">{result.meta.description}</p>
                  )}
                </article>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

export async function generateMetadata({ params }: Pick<Args, 'params'>): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return generateMeta({ title: dict.search.title, path: '/search', locale, noindex: true })
}
