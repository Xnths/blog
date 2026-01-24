'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="container py-32 mb-16 border-b border-border text-center">
      <div className="max-w-4xl mx-auto">
        {richText && <RichText className="mb-12" data={richText} enableGutter={false} />}
        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex justify-center gap-8 font-sans uppercase tracking-widest text-sm">
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
        <div className="mt-20 max-w-5xl mx-auto">
          <Media priority resource={media} />
        </div>
      )}
    </div>
  )
}
