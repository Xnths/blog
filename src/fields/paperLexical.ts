import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { Code } from '@/blocks/Code/config'
import { Callout, Cite, Figure, MetricGrid, TechStack } from '@/blocks/paper/config'

/** Editor for long-form, paper-style bodies: h2/h3 headings, figures, metric grids, citations. */
export const paperLexical = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
    BlocksFeature({
      blocks: [Figure, MetricGrid, Callout, TechStack, Code],
      inlineBlocks: [Cite],
    }),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    HorizontalRuleFeature(),
  ],
})
