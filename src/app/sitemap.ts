import type { MetadataRoute } from 'next'

import { locales } from '@/i18n/config'
import { absoluteUrl, localizedPath } from '@/i18n/paths'
import { getPosts, getProjects, getPublications } from '@/lib/content'

export const dynamic = 'force-dynamic'

const staticPaths = ['', '/work', '/research', '/writing', '/about', '/colophon']

const entry = (
  path: string,
  lastModified?: string | Date,
  priority?: number,
): MetadataRoute.Sitemap =>
  locales.map((locale) => ({
    url: absoluteUrl(localizedPath(locale, path)),
    lastModified,
    priority,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, absoluteUrl(localizedPath(l, path))]),
      ),
    },
  }))

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, publications, posts] = await Promise.all([
    getProjects('en'),
    getPublications('en'),
    getPosts(200),
  ])

  return [
    ...staticPaths.flatMap((path) => entry(path, undefined, path === '' ? 1 : 0.7)),
    ...projects.flatMap((p) => entry(`/work/${p.slug}`, p.updatedAt, p.kind === 'caseStudy' ? 0.9 : 0.6)),
    ...publications.flatMap((p) => entry(`/research/${p.slug}`, p.updatedAt, 0.6)),
    ...posts.map((post) => ({
      url: absoluteUrl(localizedPath((post.language ?? 'en') as 'en' | 'pt-BR', `/writing/${post.slug}`)),
      lastModified: post.updatedAt,
      priority: 0.5,
    })),
  ]
}
