import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import { locales } from '@/i18n/config'
import { localizedPath } from '@/i18n/paths'
import { portfolioTag } from '@/lib/tags'

const revalidateAll = (paths: string[]) => {
  for (const locale of locales) {
    for (const path of paths) revalidatePath(localizedPath(locale, path))
  }
  revalidateTag(portfolioTag)
  revalidateTag('sitemap')
}

export const revalidateSection =
  (section: 'work' | 'research' | 'writing'): CollectionAfterChangeHook =>
  ({ doc, previousDoc, req: { payload, context } }) => {
    if (context.disableRevalidate) return doc

    const slugs = [doc?.slug, previousDoc?.slug].filter(Boolean) as string[]
    payload.logger.info(`Revalidating ${section}: ${slugs.join(', ')}`)
    revalidateAll(['/', `/${section}`, ...slugs.map((slug) => `/${section}/${slug}`)])

    return doc
  }

export const revalidateSectionDelete =
  (section: 'work' | 'research' | 'writing'): CollectionAfterDeleteHook =>
  ({ doc, req: { context } }) => {
    if (!context.disableRevalidate) {
      revalidateAll(['/', `/${section}`, ...(doc?.slug ? [`/${section}/${doc.slug}`] : [])])
    }
    return doc
  }

export const revalidateSite: GlobalAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateAll(['/', '/about', '/work', '/research', '/colophon'])
  }
  return doc
}
