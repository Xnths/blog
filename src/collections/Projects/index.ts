import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { paperLexical } from '../../fields/paperLexical'
import { revalidateSection, revalidateSectionDelete } from '../../hooks/revalidatePortfolio'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'

export const Projects: CollectionConfig<'projects'> = {
  slug: 'projects',
  labels: { singular: 'Project', plural: 'Projects' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    summary: true,
    kind: true,
    status: true,
    keyMetrics: true,
    period: true,
  },
  admin: {
    defaultColumns: ['title', 'kind', 'status', 'featured', 'updatedAt'],
    useAsTitle: 'title',
    livePreview: {
      url: ({ data, req, locale }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'projects',
          locale: locale?.code,
          req,
        }),
    },
    preview: (data, { req, locale }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'projects',
        locale,
        req,
      }),
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            { name: 'summary', type: 'textarea', required: true, localized: true },
            { name: 'role', type: 'text', localized: true },
            {
              name: 'attribution',
              type: 'textarea',
              localized: true,
              admin: {
                description:
                  'Credit line shown under the title, e.g. who engineered it, partners and supervision.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'kind',
                  type: 'select',
                  defaultValue: 'project',
                  required: true,
                  options: [
                    { label: 'Case study', value: 'caseStudy' },
                    { label: 'Project', value: 'project' },
                    { label: 'Sub-project', value: 'subproject' },
                  ],
                },
                {
                  name: 'status',
                  type: 'select',
                  defaultValue: 'live',
                  required: true,
                  options: [
                    { label: 'Live', value: 'live' },
                    { label: 'In progress', value: 'inProgress' },
                    { label: 'Completed', value: 'completed' },
                    { label: 'Archived', value: 'archived' },
                  ],
                },
              ],
            },
            {
              name: 'period',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'start', type: 'date', admin: { date: { pickerAppearance: 'monthOnly' } } },
                    { name: 'end', type: 'date', admin: { date: { pickerAppearance: 'monthOnly' } } },
                    { name: 'ongoing', type: 'checkbox', defaultValue: false },
                  ],
                },
              ],
            },
            { name: 'parent', type: 'relationship', relationTo: 'projects' },
            { name: 'stack', type: 'text', hasMany: true },
            { name: 'cover', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Case study',
          fields: [
            {
              name: 'body',
              type: 'richText',
              localized: true,
              editor: paperLexical,
              label: false,
            },
          ],
        },
        {
          label: 'Metrics & links',
          fields: [
            {
              name: 'keyMetrics',
              type: 'array',
              localized: true,
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
                { name: 'context', type: 'text' },
              ],
            },
            {
              name: 'partners',
              type: 'array',
              localized: true,
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'url', type: 'text' },
                {
                  name: 'role',
                  type: 'select',
                  defaultValue: 'partner',
                  options: [
                    { label: 'Partner', value: 'partner' },
                    { label: 'Lab', value: 'lab' },
                    { label: 'Initiative of', value: 'initiative' },
                    { label: 'Supervisor', value: 'supervisor' },
                  ],
                },
              ],
            },
            {
              name: 'links',
              type: 'array',
              localized: true,
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
                {
                  name: 'kind',
                  type: 'select',
                  defaultValue: 'live',
                  options: [
                    { label: 'Live site', value: 'live' },
                    { label: 'Repository', value: 'repo' },
                    { label: 'Documentation', value: 'docs' },
                    { label: 'Other', value: 'other' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'References',
          fields: [
            {
              name: 'references',
              type: 'array',
              localized: true,
              admin: { description: 'Cited from the body with the inline “Cite” block, by key.' },
              fields: [
                { name: 'key', type: 'text', required: true },
                { name: 'authors', type: 'text' },
                { name: 'title', type: 'text', required: true },
                { name: 'venue', type: 'text' },
                { name: 'year', type: 'text' },
                { name: 'url', type: 'text' },
                { name: 'note', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            { name: 'title', type: 'text', localized: true },
            { name: 'description', type: 'textarea', localized: true },
          ],
        },
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
    afterChange: [revalidateSection('work')],
    afterDelete: [revalidateSectionDelete('work')],
  },
  versions: {
    drafts: {
      autosave: { interval: 375 },
      schedulePublish: true,
    },
    maxPerDoc: 25,
  },
}
