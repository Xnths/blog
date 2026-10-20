'use client'

import type { TocEntry } from '@/lib/lexical'

import { cn } from '@/utilities/ui'
import React, { useEffect, useState } from 'react'

export const TocNav: React.FC<{ entries: TocEntry[]; label: string }> = ({ entries, label }) => {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const targets = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (targets.length === 0 || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (items) => {
        const visible = items.filter((i) => i.isIntersecting)
        if (visible.length > 0) setActive(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -65% 0px' },
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [entries])

  const list = (
    <ol className="space-y-1.5 font-sans text-[0.82rem] leading-snug">
      {entries
        .filter((e) => e.level === 2)
        .map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              aria-current={active === entry.id ? 'location' : undefined}
              className={cn(
                'flex gap-2 no-underline',
                active === entry.id ? 'text-accent' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <span className="num w-5 shrink-0 text-right">{entry.number}</span>
              <span>{entry.text}</span>
            </a>
          </li>
        ))}
    </ol>
  )

  return (
    <>
      <nav aria-label={label} className="sticky top-20 hidden max-h-[calc(100vh-6rem)] overflow-y-auto lg:block">
        <p className="label-mono mb-3">{label}</p>
        {list}
      </nav>
      <details className="mb-8 border border-rule p-3 lg:hidden no-print">
        <summary className="label-mono cursor-pointer">{label}</summary>
        <nav aria-label={label} className="mt-3">
          {list}
        </nav>
      </details>
    </>
  )
}
