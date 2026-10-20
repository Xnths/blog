import type { Metadata } from 'next'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { SiteFooter } from '@/components/site/Footer'
import { SiteHeader } from '@/components/site/Header'
import { getDictionary } from '@/i18n'
import { isLocale } from '@/i18n/config'
import { getSite } from '@/lib/content'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { cn } from '@/utilities/ui'
import { getServerSideURL } from '@/utilities/getURL'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Source_Serif_4 } from 'next/font/google'
import React from 'react'

import '../globals.css'

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

type Args = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Args) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const dict = getDictionary(locale)
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, sourceSerif.variable)}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <a href="#main" className="skip-link">
            {dict.skipToContent}
          </a>
          {isEnabled && <LivePreviewListener />}
          <SiteHeader locale={locale} dict={dict} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter locale={locale} dict={dict} />
        </Providers>
      </body>
    </html>
  )
}

export async function generateMetadata({ params }: Pick<Args, 'params'>): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const site = await getSite(locale)

  return {
    metadataBase: new URL(getServerSideURL()),
    title: {
      default: `${site.name} — ${site.positioning}`,
      template: `%s — ${site.name}`,
    },
    description: site.seoDefaults?.description || site.shortBio,
    authors: [{ name: site.name, url: getServerSideURL() }],
    creator: site.name,
    applicationName: 'Xnths',
  }
}
