import { describe, expect, it } from 'vitest'

import { colophonReferences, colophonRows } from '@/content/colophon'
import { otherProjects } from '@/endpoints/seed/content/projects/others'
import { uspAbertaEn } from '@/endpoints/seed/content/projects/usp-aberta.en'
import { uspAbertaPt } from '@/endpoints/seed/content/projects/usp-aberta.pt'
import { publications } from '@/endpoints/seed/content/publications'
import { siteSeed } from '@/endpoints/seed/content/site'
import { en } from '@/i18n/dictionaries/en'
import { ptBR } from '@/i18n/dictionaries/pt-BR'
import { indexDocument } from '@/lib/lexical'

const locales = ['en', 'pt-BR'] as const

const projects = [
  { slug: 'usp-aberta', data: { en: uspAbertaEn, 'pt-BR': uspAbertaPt } },
  ...otherProjects.map((p) => ({ slug: p.slug, data: p.data })),
] as { slug: string; data: Record<(typeof locales)[number], Record<string, any>> }[]

const everything = JSON.stringify([projects, publications, siteSeed, en, ptBR, colophonRows, colophonReferences])

describe('seed content', () => {
  it('fills every project in both locales', () => {
    for (const project of projects) {
      for (const locale of locales) {
        const d = project.data[locale]
        expect(d.title, `${project.slug} ${locale} title`).toBeTruthy()
        expect(d.summary, `${project.slug} ${locale} summary`).toBeTruthy()
        expect(d.body, `${project.slug} ${locale} body`).toBeTruthy()
        expect(d.meta?.description, `${project.slug} ${locale} meta`).toBeTruthy()
      }
    }
  })

  it('fills every publication in both locales', () => {
    for (const pub of publications) {
      for (const locale of locales) {
        expect(pub.data[locale].title, `${pub.slug} ${locale}`).toBeTruthy()
        expect(pub.data[locale].abstract, `${pub.slug} ${locale}`).toBeTruthy()
      }
    }
  })

  it('has the same structure in both USP Aberta locales', () => {
    const a = indexDocument(uspAbertaEn.body)
    const b = indexDocument(uspAbertaPt.body)
    expect(a.toc.length).toBe(b.toc.length)
    expect(a.figures.size).toBe(b.figures.size)
    expect([...a.citations.keys()]).toEqual([...b.citations.keys()])
    expect(uspAbertaEn.keyMetrics.length).toBe(uspAbertaPt.keyMetrics.length)
    expect(uspAbertaEn.references.map((r) => r.key)).toEqual(uspAbertaPt.references.map((r) => r.key))
  })

  it('only cites references that exist', () => {
    for (const data of [uspAbertaEn, uspAbertaPt]) {
      const keys = new Set(data.references.map((r) => r.key))
      for (const key of indexDocument(data.body).citations.keys()) {
        expect(keys.has(key), key).toBe(true)
      }
    }
  })

  it('links every capability to a heading that exists in that locale', () => {
    for (const locale of locales) {
      const anchors = new Set(indexDocument(locale === 'en' ? uspAbertaEn.body : uspAbertaPt.body).toc.map((t) => t.id))
      for (const cap of siteSeed[locale].capabilities) {
        expect(anchors.has(cap.anchor), `${locale} ${cap.key} -> ${cap.anchor}`).toBe(true)
      }
    }
  })

  it('credits the flagship to Xnths and its partners in both locales', () => {
    expect(uspAbertaEn.attribution).toMatch(/Xnths/)
    expect(uspAbertaEn.attribution).toMatch(/IME-USP/)
    expect(uspAbertaEn.attribution).toMatch(/LabXP/)
    expect(uspAbertaEn.attribution).toMatch(/PRPI-USP/)
    expect(uspAbertaPt.attribution).toMatch(/Xnths/)
    expect(uspAbertaPt.attribution).toMatch(/PRPI-USP/)
  })

  it('has a reference and a decision for every colophon source', () => {
    const ids = new Set(colophonReferences.map((r) => r.id))
    for (const row of colophonRows) {
      expect(ids.has(row.id), row.id).toBe(true)
      expect(row.finding.en && row.finding['pt-BR'] && row.decision.en && row.decision['pt-BR']).toBeTruthy()
    }
  })

  it('does not contain template leftovers or private details', () => {
    expect(everything).not.toMatch(/Payload Website Template/i)
    expect(everything).not.toMatch(/\b(?:\d{1,3}\.){3}\d{1,3}\b/)
    expect(everything).not.toMatch(/tailscale|numec|\.env/i)
  })

  it('contains none of the terms in CONTENT_DENYLIST', (ctx) => {
    const terms = (process.env.CONTENT_DENYLIST ?? '')
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean)
    if (terms.length === 0) {
      console.warn('CONTENT_DENYLIST is not set: skipping the employer-name check')
      ctx.skip()
    }
    const haystack = everything.toLowerCase()
    for (const term of terms) expect(haystack.includes(term), term).toBe(false)
  })
})
