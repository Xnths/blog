import type { CalloutBlock, MetricGridBlock, TechStackBlock } from '@/payload-types'

import React from 'react'

import { cn } from '@/utilities/ui'

export const MetricGridView: React.FC<{
  metrics: { value: string; label: string; context?: string | null }[]
  className?: string
}> = ({ metrics, className }) => (
  <dl
    className={cn(
      'my-8 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-rule py-6 sm:grid-cols-4 max-w-none',
      className,
    )}
  >
    {metrics.map((metric, i) => (
      <div key={`${metric.label}-${i}`}>
        <dd className="num text-[1.7rem] font-medium leading-none tracking-tight text-foreground">
          {metric.value}
        </dd>
        <dt className="mt-2 font-sans text-[0.82rem] leading-snug text-foreground">{metric.label}</dt>
        {metric.context && (
          <dd className="mt-0.5 font-sans text-[0.72rem] leading-snug text-muted-foreground">
            {metric.context}
          </dd>
        )}
      </div>
    ))}
  </dl>
)

export const MetricGridBlockView: React.FC<{ block: MetricGridBlock }> = ({ block }) => (
  <MetricGridView metrics={block.metrics ?? []} />
)

const toneLabel: Record<NonNullable<CalloutBlock['tone']>, string> = {
  note: 'Note',
  finding: 'Finding',
  tradeoff: 'Trade-off',
  caveat: 'Caveat',
}

const toneLabelPt: Record<NonNullable<CalloutBlock['tone']>, string> = {
  note: 'Nota',
  finding: 'Achado',
  tradeoff: 'Trade-off',
  caveat: 'Ressalva',
}

export const CalloutView: React.FC<{ block: CalloutBlock; locale: string }> = ({
  block,
  locale,
}) => {
  const tone = block.tone ?? 'note'
  const label = (locale === 'pt-BR' ? toneLabelPt : toneLabel)[tone]
  return (
    <aside
      className={cn(
        'my-6 border-l-2 bg-surface px-4 py-3 font-sans text-[0.9rem] leading-relaxed max-w-[var(--measure)]',
        tone === 'caveat' || tone === 'tradeoff' ? 'border-accent' : 'border-ink',
      )}
    >
      <p className="label-mono mb-1">{block.title ? `${label} · ${block.title}` : label}</p>
      <p>{block.body}</p>
    </aside>
  )
}

export const TechStackView: React.FC<{ block: TechStackBlock }> = ({ block }) => (
  <dl className="my-6 grid gap-x-8 gap-y-3 font-sans text-[0.88rem] sm:grid-cols-[10rem_1fr] max-w-none">
    {(block.groups ?? []).map((group, i) => (
      <React.Fragment key={group.id ?? i}>
        <dt className="label-mono pt-0.5">{group.category}</dt>
        <dd>{(group.items ?? []).join(' · ')}</dd>
      </React.Fragment>
    ))}
  </dl>
)
