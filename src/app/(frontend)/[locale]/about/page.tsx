import type { Metadata } from 'next'

import { JsonLd } from '@/components/paper/JsonLd'
import RichText from '@/components/RichText'
import { getDictionary } from '@/i18n'
import { isLocale } from '@/i18n/config'
import { localizedPath } from '@/i18n/paths'
import { getSite } from '@/lib/content'
import { buildBreadcrumbs, buildOrganization, buildPerson, graph } from '@/lib/seo/jsonld'
import { generateMeta } from '@/utilities/generateMeta'
import { notFound } from 'next/navigation'
import React from 'react'

type Args = { params: Promise<{ locale: string }> }

export default async function AboutPage({ params }: Args) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const dict = getDictionary(locale)
  const site = await getSite(locale)

  return (
    <article className="page py-16">
      <JsonLd
        data={graph(
          buildPerson(site),
          buildOrganization(site),
          buildBreadcrumbs([
            { name: dict.nav.home, path: localizedPath(locale) },
            { name: dict.nav.about, path: localizedPath(locale, '/about') },
          ]),
        )}
      />
      <p className="label-mono mb-3">{site.affiliationLine}</p>
      <h1 className="text-[2.4rem]">{dict.about.title}</h1>
      <p className="mt-4 max-w-[var(--measure)] text-[1.2rem] leading-snug">{site.shortBio}</p>

      {site.about && (
        <RichText data={site.about} enableGutter={false} className="mt-8" context={{ locale }} />
      )}

      {(site.community ?? []).length > 0 && (
        <section aria-labelledby="community" className="mt-14 border-t border-rule pt-6">
          <h2 id="community" className="mb-4 text-[1.4rem]">
            {dict.about.community}
          </h2>
          <ul className="max-w-[var(--measure)] space-y-3">
            {(site.community ?? []).map((item) => (
              <li key={item.id ?? item.title} className="flex gap-4">
                <span className="num w-12 shrink-0 pt-0.5 text-[0.82rem] text-muted-foreground">{item.year}</span>
                <span>
                  <span className="font-semibold">{item.title}</span>
                  {item.detail ? <span className="text-muted-foreground"> — {item.detail}</span> : null}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="links" className="mt-14 border-t border-rule pt-6">
        <h2 id="links" className="mb-4 text-[1.4rem]">
          {dict.about.links}
        </h2>
        <ul className="space-y-1 font-sans text-[0.95rem]">
          {(site.links ?? []).map((link) => (
            <li key={link.id ?? link.url}>
              <a href={link.url} rel="me noopener noreferrer" className="link-arrow">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {site.contact?.email && (
          <p className="mt-4 font-mono text-[0.95rem]">
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </p>
        )}
      </section>
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const [dict, site] = await Promise.all([getDictionary(locale), getSite(locale)])
  return generateMeta({
    title: dict.about.title,
    description: site.shortBio,
    path: '/about',
    locale,
  })
}
