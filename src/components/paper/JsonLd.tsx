import { serializeJsonLd } from '@/lib/seo/jsonld'
import React from 'react'

export const JsonLd: React.FC<{ data: unknown }> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
  />
)
