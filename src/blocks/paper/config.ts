import type { Block } from 'payload'

const whenKind =
  (...kinds: string[]) =>
  (_data: unknown, sibling: { kind?: string }) =>
    kinds.includes(sibling?.kind ?? '')

export const Figure: Block = {
  slug: 'figure',
  interfaceName: 'FigureBlock',
  labels: { singular: 'Figure', plural: 'Figures' },
  fields: [
    {
      name: 'kind',
      type: 'select',
      defaultValue: 'architecture',
      required: true,
      options: [
        { label: 'Architecture (stacked layers)', value: 'architecture' },
        { label: 'Pipeline (ordered steps)', value: 'pipeline' },
        { label: 'Bars (comparison)', value: 'bars' },
        { label: 'Before / after table', value: 'compare' },
        { label: 'Image', value: 'image' },
      ],
    },
    { name: 'title', type: 'text', required: true },
    { name: 'caption', type: 'textarea', required: true },
    { name: 'source', type: 'text', admin: { description: 'Where the data comes from.' } },
    { name: 'sourceUrl', type: 'text' },
    {
      name: 'layers',
      type: 'array',
      admin: { condition: whenKind('architecture', 'pipeline') },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'nodes', type: 'text', hasMany: true },
      ],
    },
    {
      type: 'row',
      admin: { condition: whenKind('bars') },
      fields: [
        {
          name: 'scale',
          type: 'select',
          defaultValue: 'log',
          options: [
            { label: 'Logarithmic', value: 'log' },
            { label: 'Linear', value: 'linear' },
          ],
        },
        { name: 'unit', type: 'text' },
      ],
    },
    {
      name: 'bars',
      type: 'array',
      admin: { condition: whenKind('bars') },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'number', required: true },
        { name: 'display', type: 'text', admin: { description: 'Text shown next to the bar.' } },
        { name: 'note', type: 'text' },
        { name: 'emphasis', type: 'checkbox' },
      ],
    },
    {
      type: 'row',
      admin: { condition: whenKind('compare') },
      fields: [
        { name: 'beforeLabel', type: 'text' },
        { name: 'afterLabel', type: 'text' },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      admin: { condition: whenKind('compare') },
      fields: [
        { name: 'metric', type: 'text', required: true },
        { name: 'before', type: 'text' },
        { name: 'after', type: 'text', required: true },
        { name: 'note', type: 'text' },
      ],
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      admin: { condition: whenKind('image') },
    },
  ],
}

export const Callout: Block = {
  slug: 'callout',
  interfaceName: 'CalloutBlock',
  fields: [
    {
      name: 'tone',
      type: 'select',
      defaultValue: 'note',
      required: true,
      options: [
        { label: 'Note', value: 'note' },
        { label: 'Finding', value: 'finding' },
        { label: 'Trade-off', value: 'tradeoff' },
        { label: 'Caveat', value: 'caveat' },
      ],
    },
    { name: 'title', type: 'text' },
    { name: 'body', type: 'textarea', required: true },
  ],
}

export const MetricGrid: Block = {
  slug: 'metricGrid',
  interfaceName: 'MetricGridBlock',
  fields: [
    {
      name: 'metrics',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'context', type: 'text' },
      ],
    },
  ],
}

export const TechStack: Block = {
  slug: 'techStack',
  interfaceName: 'TechStackBlock',
  fields: [
    {
      name: 'groups',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'category', type: 'text', required: true },
        { name: 'items', type: 'text', hasMany: true, required: true },
      ],
    },
  ],
}

export const Cite: Block = {
  slug: 'cite',
  interfaceName: 'CiteBlock',
  fields: [
    {
      name: 'key',
      type: 'text',
      required: true,
      admin: { description: 'Key of an entry in this project’s References list.' },
    },
  ],
}
