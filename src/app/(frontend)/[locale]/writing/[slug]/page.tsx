import type { Metadata } from 'next'

import { JsonLd } from '@/components/paper/JsonLd'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { formatDate, getDictionary } from '@/i18n'
import { isLocale, ogLocale, type Locale } from '@/i18n/config'
import { absoluteUrl, localizedPath } from '@/i18n/paths'
import { getPost, getPostTranslation, getSite } from '@/lib/content'
import { buildBreadcrumbs, buildPerson, graph, ids } from '@/lib/seo/jsonld'
import { formatAuthors } from '@/utilities/formatAuthors'
import { generateMeta } from '@/utilities/generateMeta'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

type Args = { params: Promise<{ locale: string; slug: string }> }

export default async function PostPage({ params }: Args) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const { isEnabled: draft } = await draftMode()
  const dict = getDictionary(locale)
  const post = await getPost(slug, draft)
  if (!post) notFound()

  const [site, translation] = await Promise.all([getSite(locale), getPostTranslation(post)])
  const postLocale = (post.language ?? 'en') as Locale
  const authors = post.populatedAuthors && post.populatedAuthors.length > 0 ? formatAuthors(post.populatedAuthors) : ''
  const url = absoluteUrl(localizedPath(postLocale, `/writing/${post.slug}`))

  return (
    <article className="page py-12">
      <JsonLd
        data={graph(
          buildPerson(site),
          {
            '@type': 'BlogPosting',
            '@id': `${url}#post`,
            headline: post.title,
            url,
            inLanguage: postLocale,
            datePublished: post.publishedAt ?? undefined,
            dateModified: post.updatedAt,
            author: { '@id': ids.person() },
          },
          buildBreadcrumbs([
            { name: dict.nav.home, path: localizedPath(locale) },
            { name: dict.nav.writing, path: localizedPath(locale, '/writing') },
            { name: post.title, path: localizedPath(locale, `/writing/${post.slug}`) },
          ]),
        )}
      />

      <nav aria-label="Breadcrumb" className="label-mono mb-8">
        <Link href={localizedPath(locale, '/writing')} className="no-underline hover:text-foreground">
          ← {dict.writing.backToWriting}
        </Link>
      </nav>

      <header className="max-w-[var(--measure)]" lang={postLocale}>
        <p className="label-mono mb-3">
          {post.publishedAt ? formatDate(post.publishedAt, postLocale) : ''}
          {authors ? ` · ${dict.writing.by} ${authors}` : ''}
        </p>
        <h1 className="text-[2.3rem] sm:text-[2.9rem]">{post.title}</h1>
      </header>

      {translation && (
        <p className="mt-4 font-sans text-[0.88rem]">
          {dict.writing.otherLanguage}{' '}
          <Link
            href={localizedPath((translation.language ?? 'en') as Locale, `/writing/${translation.slug}`)}
            hrefLang={translation.language ?? undefined}
          >
            {translation.title}
          </Link>
        </p>
      )}

      {post.heroImage && typeof post.heroImage === 'object' && (
        <div className="my-8 max-w-[var(--measure)]">
          <Media resource={post.heroImage} imgClassName="border border-rule" />
        </div>
      )}

      <div lang={postLocale} className="mt-8">
        <RichText data={post.content} enableGutter={false} context={{ locale }} />
      </div>
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const post = await getPost(slug)
  if (!post) return {}

  const postLocale = (post.language ?? 'en') as Locale
  const translation = await getPostTranslation(post)
  const languages: Record<string, string> = {
    [postLocale]: absoluteUrl(localizedPath(postLocale, `/writing/${post.slug}`)),
  }
  if (translation?.language && translation.slug) {
    languages[translation.language] = absoluteUrl(
      localizedPath(translation.language as Locale, `/writing/${translation.slug}`),
    )
  }

  const base = generateMeta({
    title: post.meta?.title || post.title,
    description: post.meta?.description,
    path: `/writing/${post.slug}`,
    locale: postLocale,
    type: 'article',
    singleLocale: postLocale,
  })

  return {
    ...base,
    alternates: {
      canonical: absoluteUrl(localizedPath(postLocale, `/writing/${post.slug}`)),
      languages,
    },
    openGraph: { ...base.openGraph, locale: ogLocale[postLocale] },
  }
}
