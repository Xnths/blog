import { PayloadRequest, CollectionSlug } from 'payload'

import { defaultLocale, isLocale } from '@/i18n/config'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/writing',
  projects: '/work',
  publications: '/research',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  locale?: string | null
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug, locale }: Props) => {
  if (slug === undefined || slug === null) {
    return null
  }

  const encodedSlug = encodeURIComponent(slug)
  const safeLocale = isLocale(locale) ? locale : defaultLocale

  const encodedParams = new URLSearchParams({
    slug: encodedSlug,
    collection,
    path: `/${safeLocale}${collectionPrefixMap[collection]}/${encodedSlug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  return `/next/preview?${encodedParams.toString()}`
}
