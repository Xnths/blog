import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

import { localizedPath } from '@/i18n/paths'
import Link from 'next/link'
import React from 'react'

import { LocaleSwitcher } from './LocaleSwitcher'
import { ThemeToggle } from './ThemeToggle'

export const SiteHeader: React.FC<{ locale: Locale; dict: Dictionary }> = ({ locale, dict }) => {
  const items = [
    { href: localizedPath(locale, '/work'), label: dict.nav.work },
    { href: localizedPath(locale, '/research'), label: dict.nav.research },
    { href: localizedPath(locale, '/writing'), label: dict.nav.writing },
    { href: localizedPath(locale, '/about'), label: dict.nav.about },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="page flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
        <Link
          href={localizedPath(locale)}
          className="font-serif text-[1.25rem] font-semibold tracking-tight no-underline"
          aria-label={`${dict.siteName} — ${dict.nav.home}`}
        >
          xnths<span className="text-accent">.</span>
        </Link>
        <nav aria-label={dict.nav.primary} className="order-3 w-full sm:order-none sm:w-auto">
          <ul className="flex gap-5 font-sans text-[0.9rem]">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="no-underline hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <LocaleSwitcher current={locale} label={dict.language.switchTo} />
          <ThemeToggle label={dict.theme.toggle} />
        </div>
      </div>
    </header>
  )
}
