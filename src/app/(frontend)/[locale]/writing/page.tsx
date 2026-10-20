import type { Metadata } from 'next'

import { PostItem } from '@/components/paper/Cards'
import { JsonLd } from '@/components/paper/JsonLd'
import { getDictionary } from '@/i18n'
import { isLocale } from '@/i18n/config'
import { getPosts } from '@/lib/content'
import { localizedPath } from '@/i18n/paths'
import { buildBreadcrumbs, graph } from '@/lib/seo/jsonld'
import { generateMeta } from '@/utilities/generateMeta'
import { notFound } from 'next/navigation'
import React from 'react'

type Args = { params: Promise<{ locale: string }> }

export default async function WritingIndex({ params }: Args) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const dict = getDictionary(locale)
  const posts = await getPosts(50)

  return (
    <div className="page py-16">
      <JsonLd
        data={graph(
          buildBreadcrumbs([
            { name: dict.nav.home, path: localizedPath(locale) },
            { name: dict.nav.writing, path: localizedPath(locale, '/writing') },
          ]),
        )}
      />

      <h1 className="text-[2.4rem]">{dict.writing.title}</h1>
      <p className="mt-3 max-w-[var(--measure)] text-muted-foreground">{dict.writing.lead}</p>
      <div className="mt-10">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">{dict.writing.empty}</p>
        ) : (
          posts.map((post) => <PostItem key={post.id} post={post} locale={locale} dict={dict} />)
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return generateMeta({
    title: dict.writing.title,
    description: dict.writing.lead,
    path: '/writing',
    locale,
  })
}
