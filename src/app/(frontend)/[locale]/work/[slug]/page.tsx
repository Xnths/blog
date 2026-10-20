import type { Metadata } from 'next'

import { CitationList } from '@/components/paper/CitationList'
import { JsonLd } from '@/components/paper/JsonLd'
import { MetricGridView } from '@/components/paper/blocks'
import { ProjectCard } from '@/components/paper/Cards'
import { TocNav } from '@/components/paper/TocNav'
import RichText from '@/components/RichText'
import { formatDate, getDictionary } from '@/i18n'
import { isLocale } from '@/i18n/config'
import { localizedPath } from '@/i18n/paths'
import { getProject, getProjects, getSite } from '@/lib/content'
import { indexDocument } from '@/lib/lexical'
import {
  buildBreadcrumbs,
  buildOrganization,
  buildPerson,
  buildProject,
  graph,
} from '@/lib/seo/jsonld'
import { generateMeta } from '@/utilities/generateMeta'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

type Args = { params: Promise<{ locale: string; slug: string }> }

export default async function ProjectPage({ params }: Args) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const { isEnabled: draft } = await draftMode()
  const dict = getDictionary(locale)
  const [project, site, all] = await Promise.all([
    getProject(locale, slug, draft),
    getSite(locale),
    getProjects(locale),
  ])
  if (!project) notFound()

  const index = indexDocument(project.body)
  const children = all.filter(
    (p) => (typeof p.parent === 'object' ? p.parent?.id : p.parent) === project.id,
  )
  const parent = typeof project.parent === 'object' ? project.parent : null
  const labels = {
    figure: dict.caseStudy.figure,
    source: dict.caseStudy.source,
    before: dict.caseStudy.before,
    after: dict.caseStudy.after,
  }
  const period = project.period
  const periodText = period?.start
    ? `${formatDate(period.start, locale, false)} – ${
        period.ongoing || !period.end ? dict.caseStudy.present : formatDate(period.end, locale, false)
      }`
    : null

  return (
    <article className="page py-12">
      <JsonLd
        data={graph(
          buildPerson(site),
          buildOrganization(site),
          buildProject(project, locale),
          buildBreadcrumbs([
            { name: dict.nav.home, path: localizedPath(locale) },
            { name: dict.nav.work, path: localizedPath(locale, '/work') },
            { name: project.title, path: localizedPath(locale, `/work/${project.slug}`) },
          ]),
        )}
      />

      <nav aria-label="Breadcrumb" className="label-mono mb-8">
        <Link href={localizedPath(locale, '/work')} className="no-underline hover:text-foreground">
          ← {dict.caseStudy.backToWork}
        </Link>
      </nav>

      <div className="grid gap-x-14 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <aside>
          <TocNav entries={index.toc} label={dict.caseStudy.onThisPage} />
        </aside>

        <div>
          <header className="max-w-[var(--measure)]">
            <p className="label-mono mb-3">
              {dict.work.kind[project.kind]} · {dict.work.status[project.status]}
              {parent ? ` · ${dict.work.partOf} ${parent.title}` : ''}
            </p>
            <h1 className="text-[2.4rem] sm:text-[3rem]">{project.title}</h1>
            <p className="mt-4 text-[1.2rem] leading-snug">{project.summary}</p>
            {project.attribution && (
              <p className="mt-4 font-sans text-[0.88rem] text-muted-foreground">{project.attribution}</p>
            )}
          </header>

          <section aria-labelledby="glance" className="mt-10">
            <h2 id="glance" className="label-mono mb-3">
              {dict.caseStudy.atAGlance}
            </h2>
            <dl className="grid gap-x-8 gap-y-3 border-y border-rule py-5 font-sans text-[0.88rem] sm:grid-cols-[8rem_1fr]">
              {project.role && (
                <>
                  <dt className="label-mono pt-0.5">{dict.caseStudy.role}</dt>
                  <dd>{project.role}</dd>
                </>
              )}
              {periodText && (
                <>
                  <dt className="label-mono pt-0.5">{dict.caseStudy.period}</dt>
                  <dd className="num">{periodText}</dd>
                </>
              )}
              {(project.partners ?? []).length > 0 && (
                <>
                  <dt className="label-mono pt-0.5">{dict.caseStudy.partners}</dt>
                  <dd>
                    <ul className="space-y-0.5">
                      {(project.partners ?? []).map((p) => (
                        <li key={p.id ?? p.name}>
                          <span className="text-muted-foreground">
                            {dict.caseStudy.partnerRole[p.role ?? 'partner']}:{' '}
                          </span>
                          {p.url ? (
                            <a href={p.url} rel="noopener noreferrer" target="_blank">
                              {p.name}
                            </a>
                          ) : (
                            p.name
                          )}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </>
              )}
              {(project.links ?? []).length > 0 && (
                <>
                  <dt className="label-mono pt-0.5">{dict.caseStudy.links}</dt>
                  <dd>
                    <ul className="space-y-0.5">
                      {(project.links ?? []).map((l) => (
                        <li key={l.id ?? l.url}>
                          <a href={l.url} rel="noopener noreferrer" target="_blank" className="link-arrow">
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </>
              )}
              {(project.stack ?? []).length > 0 && (
                <>
                  <dt className="label-mono pt-0.5">{dict.caseStudy.stack}</dt>
                  <dd className="font-mono text-[0.8rem] leading-relaxed">{(project.stack ?? []).join(' · ')}</dd>
                </>
              )}
            </dl>
          </section>

          {(project.keyMetrics ?? []).length > 0 && <MetricGridView metrics={project.keyMetrics ?? []} />}

          {project.body && (
            <RichText
              data={project.body}
              enableGutter={false}
              className="mt-8"
              context={{ locale, index, figureLabels: labels }}
            />
          )}

          <CitationList
            references={project.references ?? []}
            order={index.citations}
            title={dict.caseStudy.references}
          />

          {children.length > 0 && (
            <section className="mt-14 border-t border-rule pt-6">
              <h2 className="mb-2 text-[1.4rem]">{dict.caseStudy.subProjects}</h2>
              {children.map((child) => (
                <ProjectCard key={child.id} project={child} locale={locale} dict={dict} />
              ))}
            </section>
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const project = await getProject(locale, slug)
  if (!project) return {}

  return generateMeta({
    title: project.meta?.title || project.title,
    description: project.meta?.description || project.summary,
    path: `/work/${project.slug}`,
    locale,
    type: 'article',
  })
}
