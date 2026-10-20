import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'
import type { Project, Publication } from '@/payload-types'

import { localizedPath } from '@/i18n/paths'
import Link from 'next/link'
import React from 'react'

export const ProjectCard: React.FC<{ project: Project; locale: Locale; dict: Dictionary }> = ({
  project,
  locale,
  dict,
}) => (
  <article className="group border-t border-rule py-6">
    <p className="label-mono mb-2">
      {dict.work.kind[project.kind]} · {dict.work.status[project.status]}
    </p>
    <h3 className="mb-2 text-[1.35rem]">
      <Link
        href={localizedPath(locale, `/work/${project.slug}`)}
        className="no-underline group-hover:text-accent"
      >
        {project.title}
      </Link>
    </h3>
    <p className="max-w-[var(--measure)] text-[0.98rem] text-muted-foreground">{project.summary}</p>
    {(project.stack ?? []).length > 0 && (
      <p className="mt-2 font-mono text-[0.72rem] text-muted-foreground">
        {(project.stack ?? []).slice(0, 7).join(' · ')}
      </p>
    )}
  </article>
)

export const PublicationItem: React.FC<{
  publication: Publication
  locale: Locale
  dict: Dictionary
}> = ({ publication, locale, dict }) => (
  <article className="group border-t border-rule py-5">
    <p className="label-mono mb-1.5">
      {dict.research.type[publication.type]} · {publication.year} ·{' '}
      <span className={publication.status === 'published' ? '' : 'text-accent'}>
        {dict.research.status[publication.status]}
      </span>
    </p>
    <h3 className="mb-1 text-[1.15rem] leading-snug">
      <Link
        href={localizedPath(locale, `/research/${publication.slug}`)}
        className="no-underline group-hover:text-accent"
      >
        {publication.title}
      </Link>
    </h3>
    {publication.venue && (
      <p className="font-sans text-[0.85rem] text-muted-foreground">{publication.venue}</p>
    )}
  </article>
)
