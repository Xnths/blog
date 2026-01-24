import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="container py-24 mb-12 border-b border-border">
      <div className="max-w-4xl">
        {richText && <RichText className="mb-8" data={richText} enableGutter={false} />}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-8 font-sans uppercase tracking-widest text-sm list-none p-0">
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink className="hover:underline" {...link} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      {media && typeof media === 'object' && (
        <div className="mt-16">
          <Media priority resource={media} />
          {media?.caption && (
            <div className="mt-4 text-sm text-muted-foreground italic">
              <RichText data={media.caption} enableGutter={false} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
