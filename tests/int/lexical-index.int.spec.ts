import { describe, expect, it } from 'vitest'

import { findFigure, indexDocument, slugify, toMarkdown } from '@/lib/lexical'
import { block, cite, callout, h2, h3, metricGrid, p, root, ul } from '@/endpoints/seed/lexical'

const figure = (kind: string, title: string) =>
  block('figure', { kind, title, caption: 'c', layers: [{ label: 'L', nodes: ['n'] }] })

const doc = root(
  h2('Context and problem'),
  p('Intro', cite('b'), ' and ', cite('a')),
  figure('architecture', 'First'),
  h2('What’s next'),
  h3('Sub topic'),
  p(cite('a'), cite('c')),
  figure('bars', 'Second'),
  h2('Context and problem'),
)

describe('indexDocument', () => {
  const index = indexDocument(doc)

  it('numbers sections and subsections in reading order', () => {
    expect(index.toc.map((t) => `${t.number} ${t.text}`)).toEqual([
      '1 Context and problem',
      '2 What’s next',
      '2.1 Sub topic',
      '3 Context and problem',
    ])
  })

  it('creates unique, stable anchors', () => {
    expect(index.toc.map((t) => t.id)).toEqual([
      'context-and-problem',
      'what-s-next',
      'sub-topic',
      'context-and-problem-2',
    ])
  })

  it('numbers figures by block id, in order', () => {
    expect([...index.figures.values()]).toEqual([1, 2])
  })

  it('numbers citations by first appearance', () => {
    expect([...index.citations.entries()]).toEqual([
      ['b', 1],
      ['a', 2],
      ['c', 3],
    ])
  })

  it('is deterministic', () => {
    const again = indexDocument(doc)
    expect(again.toc).toEqual(index.toc)
    expect([...again.citations]).toEqual([...index.citations])
  })

  it('handles empty documents', () => {
    expect(indexDocument(null).toc).toEqual([])
  })
})

describe('slugify', () => {
  it('strips accents and punctuation', () => {
    expect(slugify('Busca e recuperação de informação')).toBe('busca-e-recuperacao-de-informacao')
    expect(slugify('SEO e descoberta por LLMs')).toBe('seo-e-descoberta-por-llms')
  })
})

describe('findFigure / toMarkdown', () => {
  it('finds the first figure of a kind', () => {
    expect(findFigure(doc, 'architecture')?.title).toBe('First')
    expect(findFigure(doc, 'compare')).toBeNull()
  })

  it('renders headings, lists and paper blocks as Markdown', () => {
    const md = toMarkdown(
      root(h2('A'), p('text ', cite('k')), ul(['one'], ['two']), metricGrid([{ value: '1', label: 'x' }]), callout('caveat', 'careful', 'T')),
    )
    expect(md).toContain('## A')
    expect(md).toContain('text [k]')
    expect(md).toContain('- one\n- two')
    expect(md).toContain('- **1** x')
    expect(md).toContain('> **T: **careful')
  })
})
