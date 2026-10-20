import type { DocumentIndex } from '@/lib/lexical'
import type {
  BannerBlock as BannerBlockProps,
  CalloutBlock,
  CiteBlock,
  FigureBlock,
  MediaBlock as MediaBlockProps,
  MetricGridBlock,
  TechStackBlock,
} from '@/payload-types'

import { BannerBlock } from '@/blocks/Banner/Component'
import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { FigureView } from '@/components/paper/Figure'
import { CalloutView, MetricGridBlockView, TechStackView } from '@/components/paper/blocks'
import { slugify, plainText } from '@/lib/lexical'
import { cn } from '@/utilities/ui'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedInlineBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import React from 'react'

type BlockFields =
  | MediaBlockProps
  | BannerBlockProps
  | CodeBlockProps
  | FigureBlock
  | MetricGridBlock
  | CalloutBlock
  | TechStackBlock

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<BlockFields> | SerializedInlineBlockNode<CiteBlock>

export type RichTextContext = {
  locale: string
  index?: DocumentIndex
  figureLabels?: { figure: string; source: string; before: string; after: string }
}

const sectionPaths: Record<string, string> = {
  posts: 'writing',
  projects: 'work',
  publications: 'research',
}

const makeConverters = (ctx: RichTextContext): JSXConvertersFunction<NodeTypes> => {
  const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
    const { value, relationTo } = linkNode.fields.doc!
    if (typeof value !== 'object') {
      throw new Error('Expected value to be an object')
    }
    return `/${ctx.locale}/${sectionPaths[relationTo] ?? ''}/${value.slug}`
  }

  return ({ defaultConverters }) => ({
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref }),
    heading: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      const Tag = node.tag
      const entry = ctx.index?.headings.get(node as never)
      const id = entry?.id ?? (slugify(plainText(node as never)) || undefined)
      return (
        <Tag id={id}>
          {entry && entry.level === 2 && <span className="section-num">{entry.number}</span>}
          {children}
        </Tag>
      )
    },
    blocks: {
      banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
      mediaBlock: ({ node }) => (
        <MediaBlock
          className="col-start-1 col-span-3"
          imgClassName="m-0"
          {...node.fields}
          captionClassName="mx-auto max-w-[48rem]"
          enableGutter={false}
          disableInnerContainer={true}
        />
      ),
      code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
      figure: ({ node }) => (
        <FigureView
          block={node.fields}
          number={ctx.index?.figures.get(node.fields.id ?? '')}
          labels={ctx.figureLabels ?? { figure: 'Fig.', source: 'Source', before: 'Before', after: 'After' }}
        />
      ),
      metricGrid: ({ node }) => <MetricGridBlockView block={node.fields} />,
      callout: ({ node }) => <CalloutView block={node.fields} locale={ctx.locale} />,
      techStack: ({ node }) => <TechStackView block={node.fields} />,
    },
    inlineBlocks: {
      cite: ({ node }) => {
        const key = node.fields.key
        const n = ctx.index?.citations.get(key)
        if (!n) return <span>[?]</span>
        return (
          <sup className="num text-[0.7em]">
            <a href={`#ref-${key}`} id={`cite-${key}-${n}`} aria-label={`Reference ${n}`}>
              [{n}]
            </a>
          </sup>
        )
      },
    },
  })
}

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
  context?: RichTextContext
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const {
    className,
    enableProse = true,
    enableGutter = true,
    context = { locale: 'en' },
    ...rest
  } = props
  return (
    <ConvertRichText
      converters={makeConverters(context)}
      className={cn(
        'payload-richtext',
        {
          'max-w-none': !enableGutter,
          'paper-prose': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
