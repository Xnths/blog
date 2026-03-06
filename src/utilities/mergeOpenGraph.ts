import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Building high-performance systems at the intersection of Software Engineering, Design and Radical Behaviorism.',
  images: [
    {
      url: `${getServerSideURL()}/hero-image-og.jpg`,
    },
  ],
  siteName: 'xnths',
  title: 'Jonathas Castilho | Software Engineer',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
