import type { Locale } from '@/i18n/config'
import type { Post, Project, Publication, Site } from '@/payload-types'
import type { Where } from 'payload'

import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import { portfolioTag } from './tags'


const publishedOnly: Where = { _status: { equals: 'published' } }

const cached = <T>(keyParts: string[], draft: boolean, fn: () => Promise<T>): Promise<T> =>
  draft ? fn() : unstable_cache(fn, ['portfolio', ...keyParts], { tags: [portfolioTag], revalidate: 3600 })()

const client = () => getPayload({ config: configPromise })

export const getSite = (locale: Locale, draft = false): Promise<Site> =>
  cached(['site', locale], draft, async () => {
    const payload = await client()
    return payload.findGlobal({ slug: 'site', locale, depth: 0, draft })
  })

export const getProjects = (locale: Locale, draft = false): Promise<Project[]> =>
  cached(['projects', locale], draft, async () => {
    const payload = await client()
    const { docs } = await payload.find({
      collection: 'projects',
      locale,
      depth: 1,
      limit: 100,
      draft,
      sort: ['order', 'title'],
      where: draft ? undefined : publishedOnly,
    })
    return docs
  })

export const getProject = (locale: Locale, slug: string, draft = false): Promise<Project | null> =>
  cached(['project', locale, slug], draft, async () => {
    const payload = await client()
    const { docs } = await payload.find({
      collection: 'projects',
      locale,
      depth: 1,
      limit: 1,
      draft,
      pagination: false,
      where: draft
        ? { slug: { equals: slug } }
        : { and: [{ slug: { equals: slug } }, publishedOnly] },
    })
    return docs[0] ?? null
  })

export const getPublications = (locale: Locale, draft = false): Promise<Publication[]> =>
  cached(['publications', locale], draft, async () => {
    const payload = await client()
    const { docs } = await payload.find({
      collection: 'publications',
      locale,
      depth: 1,
      limit: 100,
      draft,
      sort: ['order', '-year'],
      where: draft ? undefined : publishedOnly,
    })
    return docs
  })

export const getPublication = (
  locale: Locale,
  slug: string,
  draft = false,
): Promise<Publication | null> =>
  cached(['publication', locale, slug], draft, async () => {
    const payload = await client()
    const { docs } = await payload.find({
      collection: 'publications',
      locale,
      depth: 1,
      limit: 1,
      draft,
      pagination: false,
      where: draft
        ? { slug: { equals: slug } }
        : { and: [{ slug: { equals: slug } }, publishedOnly] },
    })
    return docs[0] ?? null
  })

export const getPosts = (limit = 50): Promise<Post[]> =>
  cached(['posts', String(limit)], false, async () => {
    const payload = await client()
    const { docs } = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      sort: '-publishedAt',
      where: publishedOnly,
      select: {
        title: true,
        slug: true,
        language: true,
        publishedAt: true,
        meta: true,
        heroImage: true,
        populatedAuthors: true,
        translationOf: true,
      },
    })
    return docs as Post[]
  })

export const getPost = (slug: string, draft = false): Promise<Post | null> =>
  cached(['post', slug], draft, async () => {
    const payload = await client()
    const { docs } = await payload.find({
      collection: 'posts',
      depth: 2,
      limit: 1,
      draft,
      pagination: false,
      where: draft
        ? { slug: { equals: slug } }
        : { and: [{ slug: { equals: slug } }, publishedOnly] },
    })
    return docs[0] ?? null
  })

export const getPostTranslation = (post: Post): Promise<Post | null> =>
  cached(['post-translation', String(post.id)], false, async () => {
    const payload = await client()
    const target =
      typeof post.translationOf === 'object' && post.translationOf
        ? post.translationOf.id
        : post.translationOf
    const { docs } = await payload.find({
      collection: 'posts',
      depth: 0,
      limit: 1,
      pagination: false,
      where: {
        and: [
          publishedOnly,
          target
            ? { id: { equals: target } }
            : { translationOf: { equals: post.id } },
        ],
      },
      select: { title: true, slug: true, language: true },
    })
    return (docs[0] as Post | undefined) ?? null
  })

export const searchPortfolio = async (locale: Locale, q: string) => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'search',
    locale,
    depth: 0,
    limit: 20,
    pagination: false,
    select: { title: true, slug: true, doc: true, meta: true },
    where: {
      or: [
        { title: { like: q } },
        { 'meta.description': { like: q } },
        { 'meta.title': { like: q } },
      ],
    },
  })
  return docs
}
