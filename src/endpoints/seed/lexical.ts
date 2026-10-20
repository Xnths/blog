import { randomBytes } from 'crypto'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type Node = Record<string, unknown>

type Inline = string | Node

const id = () => randomBytes(12).toString('hex')

const base = { version: 1, format: '', indent: 0, direction: 'ltr' as const }

export const text = (value: string, format = 0): Node => ({
  type: 'text',
  version: 1,
  text: value,
  format,
  detail: 0,
  mode: 'normal',
  style: '',
})

/** Bold text. */
export const b = (value: string): Node => text(value, 1)

/** Italic text. */
export const i = (value: string): Node => text(value, 2)

export const cite = (key: string): Node => ({
  type: 'inlineBlock',
  version: 1,
  fields: { id: id(), blockType: 'cite', key },
})

const inline = (parts: Inline[]): Node[] =>
  parts.map((part) => (typeof part === 'string' ? text(part) : part))

export const p = (...parts: Inline[]): Node => ({
  type: 'paragraph',
  ...base,
  textFormat: 0,
  children: inline(parts),
})

export const h2 = (value: string): Node => ({
  type: 'heading',
  tag: 'h2',
  ...base,
  children: [text(value)],
})

export const h3 = (value: string): Node => ({
  type: 'heading',
  tag: 'h3',
  ...base,
  children: [text(value)],
})

export const ul = (...items: Inline[][]): Node => ({
  type: 'list',
  listType: 'bullet',
  start: 1,
  tag: 'ul',
  ...base,
  children: items.map((parts, index) => ({
    type: 'listitem',
    value: index + 1,
    ...base,
    children: inline(parts),
  })),
})

export const block = (blockType: string, fields: Record<string, unknown>): Node => ({
  type: 'block',
  version: 2,
  format: '',
  fields: { id: id(), blockType, blockName: '', ...fields },
})

export const metricGrid = (metrics: { value: string; label: string; context?: string }[]): Node =>
  block('metricGrid', { metrics })

export const callout = (
  tone: 'note' | 'finding' | 'tradeoff' | 'caveat',
  body: string,
  title?: string,
): Node => block('callout', { tone, title, body })

export const techStack = (groups: { category: string; items: string[] }[]): Node =>
  block('techStack', { groups })

type FigureBase = { title: string; caption: string; source?: string; sourceUrl?: string }

export const architecture = (
  args: FigureBase & { layers: { label: string; nodes: string[] }[] },
): Node => block('figure', { kind: 'architecture', ...args })

export const pipeline = (
  args: FigureBase & { layers: { label: string; nodes?: string[] }[] },
): Node => block('figure', { kind: 'pipeline', ...args })

export const bars = (
  args: FigureBase & {
    scale?: 'log' | 'linear'
    unit?: string
    bars: { label: string; value: number; display?: string; note?: string; emphasis?: boolean }[]
  },
): Node => block('figure', { kind: 'bars', ...args })

export const compare = (
  args: FigureBase & {
    beforeLabel?: string
    afterLabel?: string
    rows: { metric: string; before?: string; after: string; note?: string }[]
  },
): Node => block('figure', { kind: 'compare', ...args })

export const root = (...children: Node[]): DefaultTypedEditorState =>
  ({
    root: {
      type: 'root',
      ...base,
      children,
    },
  }) as unknown as DefaultTypedEditorState
