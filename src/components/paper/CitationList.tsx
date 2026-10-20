import type { Project } from '@/payload-types'

import React from 'react'

type Reference = NonNullable<Project['references']>[number]

export const CitationList: React.FC<{
  references: Reference[]
  order: Map<string, number>
  title: string
}> = ({ references, order, title }) => {
  if (references.length === 0) return null

  const cited = references
    .filter((r) => order.has(r.key))
    .sort((a, b) => (order.get(a.key) ?? 0) - (order.get(b.key) ?? 0))
  const uncited = references.filter((r) => !order.has(r.key))

  return (
    <section aria-labelledby="references" className="mt-14 border-t border-rule pt-6">
      <h2 id="references" className="mb-4 text-[1.4rem]">
        {title}
      </h2>
      <ol className="space-y-2 font-sans text-[0.85rem] leading-relaxed text-muted-foreground max-w-[var(--measure)]">
        {[...cited, ...uncited].map((ref, i) => {
          const n = order.get(ref.key) ?? i + 1
          return (
            <li key={ref.key} id={`ref-${ref.key}`} className="flex gap-3">
              <span className="num w-7 shrink-0 text-right text-foreground">[{n}]</span>
              <span>
                {ref.authors ? `${ref.authors}. ` : ''}
                {ref.url ? (
                  <a href={ref.url} rel="noopener noreferrer" target="_blank">
                    {ref.title}
                  </a>
                ) : (
                  ref.title
                )}
                {ref.venue ? `. ${ref.venue}` : ''}
                {ref.year ? ` (${ref.year})` : ''}.{ref.note ? ` ${ref.note}` : ''}
              </span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
