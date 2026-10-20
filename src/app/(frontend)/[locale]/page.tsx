import type { Metadata } from 'next'

import { FigureView } from '@/components/paper/Figure'
import { MetricGridView } from '@/components/paper/blocks'
import { JsonLd } from '@/components/paper/JsonLd'
import { PostItem, ProjectCard, PublicationItem } from '@/components/paper/Cards'
import { getDictionary } from '@/i18n'
import { isLocale } from '@/i18n/config'
import { localizedPath } from '@/i18n/paths'
import { getPosts, getProjects, getPublications, getSite } from '@/lib/content'
import { findFigure } from '@/lib/lexical'
import { buildOrganization, buildPerson, buildWebSite, graph } from '@/lib/seo/jsonld'
import { generateMeta } from '@/utilities/generateMeta'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

type Args = { params: Promise<{ locale: string }> }

export default async function HomePage({ params }: Args) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const dict = getDictionary(locale)
  const [site, projects, publications, posts] = await Promise.all([
    getSite(locale),
    getProjects(locale),
    getPublications(locale),
    getPosts(3),
  ])

  const flagship = projects.find((p) => p.kind === 'caseStudy' && p.featured) ?? projects[0]
  const others = projects.filter((p) => p.id !== flagship?.id && !p.parent).slice(0, 4)
  const architecture = flagship ? findFigure(flagship.body, 'architecture') : null
  const flagshipLive = flagship?.links?.find((l) => l.kind === 'live')
  const featuredPubs = publications.filter((p) => p.featured).slice(0, 4)

  return (
    <>
      <JsonLd data={graph(buildPerson(site), buildOrganization(site), buildWebSite(site))} />

      <section className="page pb-14 pt-12 sm:pt-16">
        <p className="label-mono mb-6">{site.affiliationLine}</p>
        <h1 className="text-[2.6rem] leading-[1.05] sm:text-[3.6rem]">{site.name}</h1>
        <p className="mt-4 max-w-[34ch] font-serif text-[1.5rem] leading-snug text-foreground sm:text-[1.9rem]">
          {site.positioning}
        </p>
        <p className="mt-6 max-w-[var(--measure)] text-muted-foreground">{site.shortBio}</p>
        <p className="mt-6 flex flex-wrap gap-x-6 gap-y-1 font-sans text-[0.9rem]">
          {(site.links ?? []).map((link) => (
            <a key={link.id ?? link.url} href={link.url} rel="me noopener noreferrer">
              {link.label}
            </a>
          ))}
        </p>
        {flagship && (
          <Link
            href={localizedPath(locale, `/work/${flagship.slug}`)}
            className="mt-10 block max-w-[var(--measure)] border border-rule bg-surface px-4 py-3 no-underline transition-colors hover:border-accent"
          >
            <span className="label-mono block">{dict.home.featured}</span>
            <span className="mt-1 block font-serif text-[1.15rem] font-semibold">{flagship.title}</span>
            <span className="num mt-1 flex flex-wrap gap-x-5 gap-y-0.5 text-[0.85rem] text-muted-foreground">
              {(flagship.keyMetrics ?? []).slice(0, 3).map((m) => (
                <span key={m.label}>
                  <span className="text-foreground">{m.value}</span> {m.label}
                </span>
              ))}
            </span>
          </Link>
        )}
      </section>

      {flagship && (
        <section aria-labelledby="featured" className="page border-t border-rule py-12">
          <p className="label-mono mb-3" id="featured">
            {dict.home.featured}
          </p>
          <h2 className="text-[2rem] sm:text-[2.4rem]">
            <Link href={localizedPath(locale, `/work/${flagship.slug}`)} className="no-underline hover:text-accent">
              {flagship.title}
            </Link>
          </h2>
          <p className="mt-3 max-w-[var(--measure)]">{flagship.summary}</p>
          {flagship.attribution && (
            <p className="mt-3 max-w-[var(--measure)] font-sans text-[0.85rem] text-muted-foreground">
              {flagship.attribution}
            </p>
          )}
          {(flagship.keyMetrics ?? []).length > 0 && (
            <MetricGridView metrics={(flagship.keyMetrics ?? []).slice(0, 4)} />
          )}
          {architecture && (
            <FigureView
              block={architecture}
              number={1}
              labels={{
                figure: dict.caseStudy.figure,
                source: dict.caseStudy.source,
                before: dict.caseStudy.before,
                after: dict.caseStudy.after,
              }}
            />
          )}
          <p className="flex flex-wrap gap-x-8 gap-y-2 font-sans text-[0.95rem]">
            <Link href={localizedPath(locale, `/work/${flagship.slug}`)} className="link-arrow">
              {dict.home.readCaseStudy}
            </Link>
            {flagshipLive && (
              <a href={flagshipLive.url} rel="noopener noreferrer" target="_blank" className="link-arrow">
                {dict.home.visitLive}
              </a>
            )}
          </p>
          <p className="label-mono mt-6">{dict.home.asOf}</p>
        </section>
      )}

      {(site.capabilities ?? []).length > 0 && (
        <section aria-labelledby="capabilities" className="page border-t border-rule py-12">
          <h2 id="capabilities" className="text-[1.7rem]">
            {dict.home.capabilities}
          </h2>
          <p className="mt-2 max-w-[var(--measure)] text-muted-foreground">{dict.home.capabilitiesLead}</p>
          <ol className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {(site.capabilities ?? []).map((cap, i) => {
              const href =
                cap.projectSlug && cap.anchor
                  ? `${localizedPath(locale, `/work/${cap.projectSlug}`)}#${cap.anchor}`
                  : null
              return (
                <li key={cap.id ?? cap.key} className="flex gap-4">
                  <span className="num pt-1 text-[0.8rem] text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-[1.1rem]">{cap.title}</h3>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-muted-foreground">{cap.summary}</p>
                    {href && (
                      <Link href={href} className="link-arrow mt-1 inline-block font-sans text-[0.82rem]">
                        {dict.home.seeEvidence}
                      </Link>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </section>
      )}

      {others.length > 0 && (
        <section aria-labelledby="selected" className="page border-t border-rule py-12">
          <div className="mb-2 flex items-baseline justify-between gap-4">
            <h2 id="selected" className="text-[1.7rem]">
              {dict.home.selectedWork}
            </h2>
            <Link href={localizedPath(locale, '/work')} className="link-arrow font-sans text-[0.85rem]">
              {dict.home.allWork}
            </Link>
          </div>
          <div>
            {others.map((project) => (
              <ProjectCard key={project.id} project={project} locale={locale} dict={dict} />
            ))}
          </div>
        </section>
      )}

      {featuredPubs.length > 0 && (
        <section aria-labelledby="research" className="page border-t border-rule py-12">
          <div className="mb-2 flex items-baseline justify-between gap-4">
            <h2 id="research" className="text-[1.7rem]">
              {dict.home.research}
            </h2>
            <Link href={localizedPath(locale, '/research')} className="link-arrow font-sans text-[0.85rem]">
              {dict.home.allResearch}
            </Link>
          </div>
          {featuredPubs.map((pub) => (
            <PublicationItem key={pub.id} publication={pub} locale={locale} dict={dict} />
          ))}
        </section>
      )}

      {posts.length > 0 && (
        <section aria-labelledby="writing" className="page border-t border-rule py-12">
          <div className="mb-2 flex items-baseline justify-between gap-4">
            <h2 id="writing" className="text-[1.7rem]">
              {dict.home.writing}
            </h2>
            <Link href={localizedPath(locale, '/writing')} className="link-arrow font-sans text-[0.85rem]">
              {dict.home.allWriting}
            </Link>
          </div>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} locale={locale} dict={dict} />
          ))}
        </section>
      )}

      <section aria-labelledby="contact" className="page border-t border-rule py-12">
        <h2 id="contact" className="text-[1.7rem]">
          {dict.home.contact}
        </h2>
        <p className="mt-2 max-w-[var(--measure)] text-muted-foreground">
          {site.contact?.note || dict.home.contactLead}
        </p>
        {site.contact?.email && (
          <p className="mt-4 font-mono text-[1rem]">
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </p>
        )}
      </section>
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const site = await getSite(locale)

  return {
    ...generateMeta({
      title: site.seoDefaults?.title || `${site.name} — ${site.positioning}`,
      description: site.seoDefaults?.description || site.shortBio,
      path: '',
      locale,
    }),
    title: { absolute: site.seoDefaults?.title || `${site.name} — ${site.positioning}` },
  }
}
