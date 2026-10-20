import type { Metadata } from 'next'

import { ProjectCard } from '@/components/paper/Cards'
import { JsonLd } from '@/components/paper/JsonLd'
import { getDictionary } from '@/i18n'
import { isLocale } from '@/i18n/config'
import { getProjects } from '@/lib/content'
import { localizedPath } from '@/i18n/paths'
import { buildBreadcrumbs, graph } from '@/lib/seo/jsonld'
import { generateMeta } from '@/utilities/generateMeta'
import { notFound } from 'next/navigation'
import React from 'react'

type Args = { params: Promise<{ locale: string }> }

export default async function WorkIndex({ params }: Args) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const dict = getDictionary(locale)
  const projects = (await getProjects(locale)).filter((p) => !p.parent)

  return (
    <div className="page py-16">
      <JsonLd
        data={graph(
          buildBreadcrumbs([
            { name: dict.nav.home, path: localizedPath(locale) },
            { name: dict.nav.work, path: localizedPath(locale, '/work') },
          ]),
        )}
      />

      <p className="label-mono mb-3">{dict.work.kind.caseStudy} · {dict.work.kind.project}</p>
      <h1 className="text-[2.4rem]">{dict.work.title}</h1>
      <p className="mt-3 max-w-[var(--measure)] text-muted-foreground">{dict.work.lead}</p>
      <div className="mt-10">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} locale={locale} dict={dict} />
        ))}
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return generateMeta({ title: dict.work.title, description: dict.work.lead, path: '/work', locale })
}
