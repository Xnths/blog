import type { FigureBlock } from '@/payload-types'

import React from 'react'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

type Dict = { figure: string; source: string; before: string; after: string }

type Props = {
  block: Partial<FigureBlock> & { id?: string | null }
  number?: number
  labels: Dict
  className?: string
}

const Architecture: React.FC<{ layers: NonNullable<FigureBlock['layers']> }> = ({ layers }) => (
  <div className="flex flex-col gap-2">
    {layers.map((layer, i) => (
      <div
        key={layer.id ?? i}
        className="grid gap-2 border border-rule bg-surface p-3 sm:grid-cols-[9rem_1fr] sm:items-start"
      >
        <p className="label-mono pt-1">{layer.label}</p>
        <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0" aria-label={layer.label}>
          {(layer.nodes ?? []).map((node) => (
            <li
              key={node}
              className="mt-0 border border-rule bg-background px-2 py-0.5 font-sans text-[0.8rem] leading-snug"
            >
              {node}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)

const Pipeline: React.FC<{ layers: NonNullable<FigureBlock['layers']> }> = ({ layers }) => (
  <ol className="m-0 grid list-none gap-2 p-0 sm:grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))]">
    {layers.map((step, i) => (
      <li
        key={step.id ?? i}
        className="relative mt-0 border border-rule bg-surface p-3 font-sans text-[0.82rem] leading-snug"
      >
        <span className="num mb-1 block text-[0.7rem] text-accent">
          {String(i + 1).padStart(2, '0')}
        </span>
        <span className="block font-semibold">{step.label}</span>
        {(step.nodes ?? []).length > 0 && (
          <span className="mt-1 block text-muted-foreground">{(step.nodes ?? []).join(' · ')}</span>
        )}
      </li>
    ))}
  </ol>
)

const Bars: React.FC<{ block: Props['block'] }> = ({ block }) => {
  const bars = block.bars ?? []
  const values = bars.map((b) => b.value).filter((v) => v > 0)
  if (values.length === 0) return null
  const max = Math.max(...values)
  const min = Math.min(...values)
  const log = (block.scale ?? 'log') === 'log'
  const lo = log ? Math.log10(min) - 0.6 : 0
  const hi = log ? Math.log10(max) : max
  const width = (v: number) =>
    Math.max(2, Math.min(100, (((log ? Math.log10(Math.max(v, min)) : v) - lo) / (hi - lo)) * 100))

  return (
    <div className="flex flex-col gap-3 font-sans text-[0.85rem]">
      {bars.map((bar, i) => (
        <div key={bar.id ?? i} className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:items-center">
          <p className="leading-snug">
            {bar.label}
            {bar.note ? <span className="block text-[0.75rem] text-muted-foreground">{bar.note}</span> : null}
          </p>
          <div className="flex items-center gap-3">
            <div className="h-3 flex-1 bg-surface" aria-hidden="true">
              <div
                className={cn('h-full', bar.emphasis ? 'bg-accent' : 'bg-ink/70')}
                style={{ width: `${width(bar.value)}%` }}
              />
            </div>
            <span className="num w-28 shrink-0 text-right">
              {bar.display ?? `${bar.value}${block.unit ? ` ${block.unit}` : ''}`}
            </span>
          </div>
        </div>
      ))}
      {log && (
        <p className="label-mono">log scale{block.unit ? ` · ${block.unit}` : ''}</p>
      )}
    </div>
  )
}

const Compare: React.FC<{ block: Props['block']; labels: Dict; title: string }> = ({
  block,
  labels,
  title,
}) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse font-sans text-[0.85rem]">
      <caption className="sr-only">{title}</caption>
      <thead>
        <tr className="border-b border-ink text-left">
          <th scope="col" className="py-2 pr-4 font-semibold" />
          <th scope="col" className="num py-2 pr-4 font-semibold">
            {block.beforeLabel || labels.before}
          </th>
          <th scope="col" className="num py-2 pr-4 font-semibold">
            {block.afterLabel || labels.after}
          </th>
        </tr>
      </thead>
      <tbody>
        {(block.rows ?? []).map((row, i) => (
          <tr key={row.id ?? i} className="border-b border-rule align-top">
            <th scope="row" className="py-2 pr-4 text-left font-normal">
              {row.metric}
              {row.note ? (
                <span className="block text-[0.75rem] text-muted-foreground">{row.note}</span>
              ) : null}
            </th>
            <td className="num py-2 pr-4 text-muted-foreground">{row.before ?? '—'}</td>
            <td className="num py-2 pr-4 font-semibold text-accent">{row.after}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export const FigureView: React.FC<Props> = ({ block, number, labels, className }) => {
  const kind = block.kind ?? 'architecture'
  const layers = block.layers ?? []

  return (
    <figure
      id={number ? `fig-${number}` : undefined}
      className={cn('my-10 w-full max-w-none', className)}
    >
      <div>
        {kind === 'architecture' && <Architecture layers={layers} />}
        {kind === 'pipeline' && <Pipeline layers={layers} />}
        {kind === 'bars' && <Bars block={block} />}
        {kind === 'compare' && <Compare block={block} labels={labels} title={block.title ?? ''} />}
        {kind === 'image' && block.media && typeof block.media === 'object' && (
          <Media resource={block.media} imgClassName="border border-rule" />
        )}
      </div>
      <figcaption className="mt-3 max-w-[var(--measure)] font-sans text-[0.85rem] leading-relaxed text-muted-foreground">
        <span className="num mr-2 font-semibold text-foreground">
          {labels.figure}
          {number ? ` ${number}` : ''}
        </span>
        <span className="font-semibold text-foreground">{block.title}.</span> {block.caption}
        {block.source && (
          <span className="mt-1 block text-[0.78rem]">
            {labels.source}:{' '}
            {block.sourceUrl ? (
              <a href={block.sourceUrl} rel="noopener noreferrer" target="_blank">
                {block.source}
              </a>
            ) : (
              block.source
            )}
          </span>
        )}
      </figcaption>
    </figure>
  )
}
