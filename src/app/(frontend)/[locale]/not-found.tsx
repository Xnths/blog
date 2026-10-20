'use client'

import { getDictionary } from '@/i18n'
import { defaultLocale, isLocale } from '@/i18n/config'
import { localizedPath } from '@/i18n/paths'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NotFound() {
  const segment = usePathname()?.split('/').filter(Boolean)[0]
  const locale = isLocale(segment) ? segment : defaultLocale
  const dict = getDictionary(locale)

  return (
    <div className="page py-32">
      <p className="label-mono mb-3">404</p>
      <h1 className="mb-4 text-4xl">{dict.notFound.title}</h1>
      <p className="mb-8 max-w-[var(--measure)] text-muted-foreground">{dict.notFound.body}</p>
      <Link href={localizedPath(locale)} className="link-arrow">
        {dict.notFound.home}
      </Link>
    </div>
  )
}
