'use client'

import type { Locale } from '@/i18n/config'

import { localeCookie, locales } from '@/i18n/config'
import { switchLocalePath } from '@/i18n/paths'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const short: Record<Locale, string> = { en: 'EN', 'pt-BR': 'PT' }
const names: Record<Locale, string> = { en: 'English', 'pt-BR': 'Português' }

export const LocaleSwitcher: React.FC<{ current: Locale; label: string }> = ({
  current,
  label,
}) => {
  const pathname = usePathname() ?? `/${current}`

  return (
    <nav aria-label={label} className="flex items-center font-mono text-[0.75rem]">
      {locales.map((locale, i) => (
        <React.Fragment key={locale}>
          {i > 0 && (
            <span aria-hidden="true" className="px-1 text-muted-foreground">
              /
            </span>
          )}
          <Link
            href={switchLocalePath(pathname, locale)}
            hrefLang={locale}
            lang={locale}
            aria-label={`${short[locale]} · ${names[locale]}`}
            aria-current={locale === current ? 'true' : undefined}
            onClick={() => {
              document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`
            }}
            className={cn(
              'no-underline',
              locale === current ? 'text-accent' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {short[locale]}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  )
}
