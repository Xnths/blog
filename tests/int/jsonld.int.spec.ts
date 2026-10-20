import { describe, expect, it } from 'vitest'

import type { Project, Publication, Site } from '@/payload-types'

import {
  buildBreadcrumbs,
  buildOrganization,
  buildPerson,
  buildProject,
  buildPublication,
  graph,
  serializeJsonLd,
} from '@/lib/seo/jsonld'

const site = {
  name: 'Jonathas Castilho',
  alias: 'Xnths',
  positioning: 'Software engineering for open academic data',
  organization: { brand: 'Xnths', legalName: 'J. Castilho Tecnologia Ltda', foundingYear: 2015 },
  links: [
    { kind: 'github', label: 'GitHub', url: 'https://github.com/Xnths' },
    { kind: 'email', label: 'mail', url: 'mailto:jonathas@xnths.com' },
  ],
  capabilities: [{ title: 'Data engineering' }],
} as unknown as Site

const project = {
  slug: 'usp-aberta',
  title: 'USP Aberta',
  summary: 'Summary',
  kind: 'caseStudy',
  partners: [
    { name: 'PRPI-USP', role: 'initiative' },
    { name: 'IME-USP', role: 'partner' },
    { name: 'LabXP', role: 'lab' },
  ],
  links: [{ kind: 'live', url: 'https://uspaberta.ime.usp.br', label: 'live' }],
} as unknown as Project

describe('json-ld', () => {
  it('describes the person without any employer relationship', () => {
    const person = buildPerson(site)
    expect(person['@type']).toBe('Person')
    expect(person.alternateName).toBe('Xnths')
    expect(person).not.toHaveProperty('worksFor')
    expect(JSON.stringify(person)).not.toContain('mailto:')
  })

  it('links the organization to its founder', () => {
    const org = buildOrganization(site)
    expect(org.foundingDate).toBe('2015')
    expect(org.founder).toEqual({ '@id': expect.stringContaining('#person') })
  })

  it('credits the flagship to the person, with sponsor and contributors', () => {
    const node = buildProject(project, 'en')
    expect(node['@type']).toBe('SoftwareApplication')
    expect(node.creator).toEqual({ '@id': expect.stringContaining('#person') })
    expect(node.sponsor).toEqual([expect.objectContaining({ name: 'PRPI-USP' })])
    expect(node.contributor).toHaveLength(2)
    expect(node.sameAs).toEqual(['https://uspaberta.ime.usp.br'])
  })

  it('types a thesis and a paper differently', () => {
    const pub = { slug: 'p', title: 'T', year: 2026, status: 'published', authors: [{ name: 'A', isSelf: true }] }
    expect(buildPublication({ ...pub, type: 'thesis' } as unknown as Publication, 'en')['@type']).toBe('Thesis')
    expect(buildPublication({ ...pub, type: 'conferencePaper' } as unknown as Publication, 'en')['@type']).toBe(
      'ScholarlyArticle',
    )
  })

  it('numbers breadcrumbs from 1', () => {
    const crumbs = buildBreadcrumbs([
      { name: 'Home', path: '/en' },
      { name: 'Work', path: '/en/work' },
    ])
    expect(crumbs.itemListElement).toEqual([
      expect.objectContaining({ position: 1 }),
      expect.objectContaining({ position: 2 }),
    ])
  })

  it('wraps nodes in a single @graph and drops empty entries', () => {
    const g = graph(buildPerson(site), undefined) as { '@graph': unknown[] }
    expect(g['@graph']).toHaveLength(1)
  })

  it('never lets a payload close its own script tag', () => {
    expect(serializeJsonLd({ a: '</script><script>alert(1)' })).not.toContain('</script>')
  })
})
