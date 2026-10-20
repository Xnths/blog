import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { revalidateSection, revalidateSectionDelete } from '../../hooks/revalidatePortfolio'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'

export const Publications: CollectionConfig<'publications'> = {
  slug: 'publications',
  labels: { singular: 'Publication', plural: 'Publications' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    type: true,
    status: true,
    venue: true,
    venueShort: true,
    year: true,
  },
  admin: {
    defaultColumns: ['title', 'type', 'status', 'year', 'updatedAt'],
    useAsTitle: 'title',
    livePreview: {
      url: ({ data, req, locale }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'publications',
          locale: locale?.code,
          req,
        }),
    },
    preview: (data, { req, locale }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'publications',
        locale,
        req,
      }),
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'conferencePaper',
          options: [
            { label: 'Thesis', value: 'thesis' },
            { label: 'Conference paper', value: 'conferencePaper' },
            { label: 'Journal article', value: 'journalArticle' },
            { label: 'Protocol / pilot study', value: 'protocol' },
          ],
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'published',
          options: [
            { label: 'Published', value: 'published' },
            { label: 'Submitted', value: 'submitted' },
            { label: 'In preparation', value: 'inPreparation' },
            { label: 'Inactive', value: 'inactive' },
          ],
        },
      ],
    },
    {
      name: 'authors',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'affiliation', type: 'text' },
        { name: 'orcid', type: 'text' },
        { name: 'isSelf', type: 'checkbox', defaultValue: false },
      ],
    },
    { name: 'advisor', type: 'text' },
    {
      type: 'row',
      fields: [
        { name: 'venue', type: 'text', localized: true },
        { name: 'venueShort', type: 'text' },
        { name: 'year', type: 'number', required: true },
      ],
    },
    { name: 'abstract', type: 'textarea', localized: true },
    { name: 'keywords', type: 'text', hasMany: true, localized: true },
    {
      type: 'row',
      fields: [
        { name: 'doi', type: 'text' },
        { name: 'url', type: 'text' },
        { name: 'repoUrl', type: 'text' },
      ],
    },
    { name: 'pdf', type: 'upload', relationTo: 'media' },
    {
      name: 'bibtexKey',
      type: 'text',
      admin: { description: 'Leave empty to derive from author and year.' },
    },
    {
      name: 'bibtexOverride',
      type: 'textarea',
      admin: { description: 'Replaces the generated BibTeX entry when set.' },
    },
    { name: 'relatedProjects', type: 'relationship', relationTo: 'projects', hasMany: true },
    {
      name: 'meta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
    {
      type: 'row',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'featured', type: 'checkbox', defaultValue: false },
        { name: 'order', type: 'number', defaultValue: 100 },
      ],
    },
    slugField({ localized: false }),
  ],
  hooks: {
    afterChange: [revalidateSection('research')],
    afterDelete: [revalidateSectionDelete('research')],
  },
  versions: {
    drafts: {
      autosave: { interval: 375 },
      schedulePublish: true,
    },
    maxPerDoc: 25,
  },
}
