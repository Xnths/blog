import type { Payload, PayloadRequest } from 'payload'

import { locales, type Locale } from '@/i18n/config'

import { otherProjects } from './content/projects/others'
import { uspAbertaEn } from './content/projects/usp-aberta.en'
import { uspAbertaPt } from './content/projects/usp-aberta.pt'
import { publications } from './content/publications'
import { siteSeed } from './content/site'

type Args = {
  payload: Payload
  req?: PayloadRequest
  /** Delete the portfolio's projects and publications first. Posts and users are never touched. */
  reset?: boolean
}

type Localized = Record<Locale, Record<string, unknown>>

const context = { disableRevalidate: true }

/**
 * Creates or updates a localized document by slug: the English version first, then pt-BR on the
 * same document, so the non-localized fields are written once and every localized field in each locale.
 */
const upsert = async (
  payload: Payload,
  collection: 'projects' | 'publications',
  slug: string,
  shared: Record<string, unknown>,
  data: Localized,
): Promise<string | number> => {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    draft: true,
    pagination: false,
    locale: 'en',
    context,
  })

  const payloadFor = (locale: Locale) =>
    ({ ...shared, ...data[locale], slug, generateSlug: false, _status: 'published' }) as never

  let id: string | number

  if (existing.docs[0]) {
    id = existing.docs[0].id
    await payload.update({ collection, id, data: payloadFor('en'), locale: 'en', context })
  } else {
    const created = await payload.create({ collection, data: payloadFor('en'), locale: 'en', context })
    id = created.id
  }

  await payload.update({ collection, id, data: payloadFor('pt-BR'), locale: 'pt-BR', context })
  return id
}

export const seed = async ({ payload, reset = false }: Args): Promise<void> => {
  payload.logger.info('Seeding the Xnths portfolio...')

  try {
    if (reset) {
      payload.logger.info('Removing existing projects and publications...')
      await payload.delete({ collection: 'projects', where: { id: { exists: true } }, context })
      await payload.delete({ collection: 'publications', where: { id: { exists: true } }, context })
    }

    // Site profile: shared fields once, then each locale.
    const siteFor = (locale: Locale) =>
      ({ ...siteSeed.common, ...siteSeed[locale], contact: siteSeed[locale].contact }) as never
    await payload.updateGlobal({ slug: 'site', data: siteFor('en'), locale: 'en', context })
    await payload.updateGlobal({ slug: 'site', data: siteFor('pt-BR'), locale: 'pt-BR', context })
    payload.logger.info('Site profile ready (en, pt-BR)')

    // Projects. The flagship goes first so sub-projects can point at its id.
    const ids = new Map<string, string | number>()

    ids.set(
      'usp-aberta',
      await upsert(
        payload,
        'projects',
        'usp-aberta',
        {
          kind: 'caseStudy',
          status: 'live',
          featured: true,
          order: 10,
          period: { start: '2025-07-01', ongoing: true },
          stack: uspAbertaEn.stack,
        },
        { en: uspAbertaEn, 'pt-BR': uspAbertaPt } as unknown as Localized,
      ),
    )

    for (const project of otherProjects) {
      const { slug, parent, data, ...shared } = project
      ids.set(
        slug,
        await upsert(
          payload,
          'projects',
          slug,
          { ...shared, ...(parent ? { parent: ids.get(parent) } : {}) },
          data as unknown as Localized,
        ),
      )
    }
    payload.logger.info(`Projects ready: ${[...ids.keys()].join(', ')}`)

    // Publications
    for (const publication of publications) {
      const { slug, data, relatedProjects, ...shared } = publication
      await upsert(
        payload,
        'publications',
        slug,
        {
          ...shared,
          relatedProjects: (relatedProjects ?? []).map((s) => ids.get(s)).filter(Boolean),
        },
        data as unknown as Localized,
      )
    }
    payload.logger.info(`Publications ready: ${publications.map((p) => p.slug).join(', ')}`)

    payload.logger.info(`Seeding completed (${locales.join(', ')})`)
  } catch (error) {
    payload.logger.error('Error seeding database:')
    payload.logger.error(error)
    throw error
  }
}
