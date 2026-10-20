import { describe, expect, it } from 'vitest'

import type { Publication } from '@/payload-types'

import { bibtexKey, buildBibtex } from '@/lib/bibtex'

const base = {
  id: '1',
  slug: 'x',
  title: 'Information retrieval & ranking_100%',
  type: 'conferencePaper',
  status: 'published',
  year: 2026,
  authors: [{ name: 'Jonathas Castilho', isSelf: true }],
  venue: 'SIICUSP 2026',
  updatedAt: '',
  createdAt: '',
} as unknown as Publication

describe('bibtex', () => {
  it('derives a stable, ASCII key from author, year and the first long title word', () => {
    expect(bibtexKey(base)).toBe('castilho2026information')
    expect(bibtexKey({ ...base, title: 'Ágil como comportamento' })).toBe('castilho2026agil')
  })

  it('uses the explicit key when one is set', () => {
    expect(bibtexKey({ ...base, bibtexKey: 'custom2026' })).toBe('custom2026')
  })

  it('escapes BibTeX special characters but not URLs', () => {
    const entry = buildBibtex({ ...base, url: 'https://example.com/a_b?c=1&d=2' } as Publication)
    expect(entry).toContain('title = {Information retrieval \\& ranking\\_100\\%}')
    expect(entry).toContain('url = {https://example.com/a_b?c=1&d=2}')
    expect(entry.startsWith('@inproceedings{castilho2026information,')).toBe(true)
  })

  it('maps publication types to entry types', () => {
    expect(buildBibtex({ ...base, type: 'journalArticle' } as Publication)).toMatch(/^@article\{/)
    expect(buildBibtex({ ...base, type: 'thesis' } as Publication)).toMatch(/^@thesis\{/)
    expect(buildBibtex({ ...base, type: 'protocol' } as Publication)).toMatch(/^@misc\{/)
  })

  it('states unpublished status in a note', () => {
    expect(buildBibtex({ ...base, status: 'inPreparation' } as Publication)).toContain(
      'note = {In preparation}',
    )
  })

  it('returns the override verbatim', () => {
    expect(buildBibtex({ ...base, bibtexOverride: '  @misc{a, title={B}}  ' } as Publication)).toBe(
      '@misc{a, title={B}}',
    )
  })
})
