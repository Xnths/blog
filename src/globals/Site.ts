import type { GlobalConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateSite } from '../hooks/revalidatePortfolio'

import { paperLexical } from '../fields/paperLexical'

export const Site: GlobalConfig = {
  slug: 'site',
  label: 'Site & profile',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identity',
          fields: [
            { name: 'name', type: 'text', required: true, defaultValue: 'Jonathas Castilho' },
            { name: 'alias', type: 'text', defaultValue: 'Xnths' },
            { name: 'positioning', type: 'text', required: true, localized: true },
            { name: 'affiliationLine', type: 'text', localized: true },
            { name: 'shortBio', type: 'textarea', required: true, localized: true },
            {
              name: 'organization',
              type: 'group',
              fields: [
                { name: 'brand', type: 'text', defaultValue: 'Xnths' },
                { name: 'legalName', type: 'text', defaultValue: 'J. Castilho Tecnologia Ltda' },
                { name: 'foundingYear', type: 'number', defaultValue: 2015 },
                { name: 'url', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Capabilities',
          fields: [
            {
              name: 'capabilities',
              type: 'array',
              localized: true,
              fields: [
                { name: 'key', type: 'text', required: true },
                { name: 'title', type: 'text', required: true },
                { name: 'summary', type: 'textarea', required: true },
                { name: 'projectSlug', type: 'text' },
                { name: 'anchor', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'About',
          fields: [
            { name: 'about', type: 'richText', localized: true, editor: paperLexical, label: false },
            {
              name: 'community',
              type: 'array',
              localized: true,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'detail', type: 'text' },
                { name: 'year', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Links & contact',
          fields: [
            {
              name: 'links',
              type: 'array',
              fields: [
                {
                  name: 'kind',
                  type: 'select',
                  required: true,
                  options: ['github', 'linkedin', 'email', 'lattes', 'orcid', 'other'],
                },
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
              ],
            },
            {
              name: 'contact',
              type: 'group',
              fields: [
                { name: 'email', type: 'email' },
                { name: 'note', type: 'text', localized: true },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          name: 'seoDefaults',
          fields: [
            { name: 'title', type: 'text', localized: true },
            { name: 'description', type: 'textarea', localized: true },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSite],
  },
}
