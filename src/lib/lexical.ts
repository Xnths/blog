import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type LexicalNode = {
  type?: string
  tag?: string
  text?: string
  children?: LexicalNode[]
  fields?: { id?: string; blockType?: string; key?: string; kind?: string; [k: string]: unknown }
}

export type TocEntry = { id: string; text: string; number: string; level: 2 | 3 }

export type DocumentIndex = {
  toc: TocEntry[]
  headings: Map<LexicalNode, TocEntry>
  /** Figure number by block id, in reading order. */
  figures: Map<string, number>
  /** Citation number by reference key, in order of first appearance. */
  citations: Map<string, number>
}

export const slugify = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const plainText = (node: LexicalNode | undefined): string => {
  if (!node) return ''
  if (typeof node.text === 'string') return node.text
  return (node.children ?? []).map(plainText).join('')
}

const walk = (nodes: LexicalNode[] | undefined, visit: (node: LexicalNode) => void) => {
  for (const node of nodes ?? []) {
    visit(node)
    walk(node.children, visit)
  }
}

/** Walks the Lexical tree once and returns deterministic numbering for sections, figures and citations. */
export const indexDocument = (data: DefaultTypedEditorState | null | undefined): DocumentIndex => {
  const index: DocumentIndex = {
    toc: [],
    headings: new Map(),
    figures: new Map(),
    citations: new Map(),
  }
  if (!data?.root) return index

  let section = 0
  let subsection = 0
  const usedIds = new Set<string>()

  walk(data.root.children as LexicalNode[], (node) => {
    if (node.type === 'heading' && (node.tag === 'h2' || node.tag === 'h3')) {
      const text = plainText(node)
      if (!text) return
      let id = slugify(text) || `section-${index.toc.length + 1}`
      while (usedIds.has(id)) id = `${id}-2`
      usedIds.add(id)

      let entry: TocEntry
      if (node.tag === 'h2') {
        section += 1
        subsection = 0
        entry = { id, text, number: String(section), level: 2 }
      } else {
        subsection += 1
        entry = { id, text, number: `${section}.${subsection}`, level: 3 }
      }
      index.toc.push(entry)
      index.headings.set(node, entry)
    } else if (node.type === 'block' && node.fields?.blockType === 'figure') {
      const id = node.fields.id
      if (id) index.figures.set(id, index.figures.size + 1)
    } else if (node.type === 'inlineBlock' && node.fields?.blockType === 'cite') {
      const key = node.fields.key
      if (key && !index.citations.has(key)) index.citations.set(key, index.citations.size + 1)
    }
  })

  return index
}

/** Finds the first figure block of a given kind, e.g. to reuse the architecture figure on the home page. */
export const findFigure = (
  data: DefaultTypedEditorState | null | undefined,
  kind: string,
): Record<string, unknown> | null => {
  let found: Record<string, unknown> | null = null
  if (!data?.root) return null
  walk(data.root.children as LexicalNode[], (node) => {
    if (!found && node.type === 'block' && node.fields?.blockType === 'figure' && node.fields.kind === kind) {
      found = node.fields as Record<string, unknown>
    }
  })
  return found
}

const blockToMarkdown = (fields: NonNullable<LexicalNode['fields']>): string => {
  const f = fields as Record<string, unknown>
  const list = (value: unknown): string => (Array.isArray(value) ? value.join(', ') : '')
  switch (f.blockType) {
    case 'metricGrid':
      return ((f.metrics as { value: string; label: string; context?: string }[]) ?? [])
        .map((m) => `- **${m.value}** ${m.label}${m.context ? ` (${m.context})` : ''}`)
        .join('\n')
    case 'callout':
      return `> **${f.title ? `${f.title}: ` : ''}**${f.body}`
    case 'techStack':
      return ((f.groups as { category: string; items: string[] }[]) ?? [])
        .map((g) => `- ${g.category}: ${list(g.items)}`)
        .join('\n')
    case 'figure': {
      const rows = ((f.rows as { metric: string; before?: string; after: string }[]) ?? [])
        .map((r) => `- ${r.metric}: ${r.before ? `${r.before} → ` : ''}${r.after}`)
        .join('\n')
      const bars = ((f.bars as { label: string; display?: string; value: number }[]) ?? [])
        .map((b) => `- ${b.label}: ${b.display ?? b.value}`)
        .join('\n')
      const layers = ((f.layers as { label: string; nodes?: string[] }[]) ?? [])
        .map((l) => `- ${l.label}: ${list(l.nodes)}`)
        .join('\n')
      return `*${f.title}.* ${f.caption}\n${[rows, bars, layers].filter(Boolean).join('\n')}`
    }
    default:
      return ''
  }
}

const inlineToMarkdown = (nodes: LexicalNode[] | undefined): string =>
  (nodes ?? [])
    .map((node) => {
      if (node.type === 'inlineBlock' && node.fields?.blockType === 'cite') return `[${node.fields.key}]`
      if (node.type === 'linebreak') return '\n'
      if (typeof node.text === 'string') return node.text
      return inlineToMarkdown(node.children)
    })
    .join('')

/** Small Lexical → Markdown converter used for llms-full.txt (headings, lists, paragraphs, paper blocks). */
export const toMarkdown = (data: DefaultTypedEditorState | null | undefined): string => {
  if (!data?.root) return ''
  const out: string[] = []

  for (const node of data.root.children as LexicalNode[]) {
    if (node.type === 'heading') {
      out.push(`${'#'.repeat(Number(node.tag?.slice(1) ?? 2))} ${plainText(node)}`)
    } else if (node.type === 'list') {
      out.push(
        (node.children ?? []).map((item) => `- ${inlineToMarkdown(item.children)}`).join('\n'),
      )
    } else if (node.type === 'block' && node.fields) {
      const md = blockToMarkdown(node.fields)
      if (md) out.push(md)
    } else if (node.type === 'paragraph' || node.type === 'quote') {
      const text = inlineToMarkdown(node.children).trim()
      if (text) out.push(node.type === 'quote' ? `> ${text}` : text)
    }
  }

  return out.join('\n\n')
}
