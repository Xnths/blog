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
    <div className="relative py-32 mb-16 border-b-4 border-bauhaus-black bg-bauhaus-bg">
      <div className="container relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {richText && (
             <div className="prose-xl md:prose-2xl font-bold uppercase [&>h1]:text-6xl [&>h1]:md:text-8xl [&>h1]:font-black [&>h1]:text-bauhaus-black [&>h1]:leading-none [&>h1]:mb-8">
               <RichText className="mb-12" data={richText} enableGutter={false} />
             </div>
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center gap-8 font-mono uppercase font-bold text-sm mt-8">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <div className="bg-bauhaus-black text-bauhaus-bg px-4 py-2 hover:bg-bauhaus-red transition-colors shadow-[4px_4px_0px_0px_#D63426]">
                      <CMSLink {...link} />
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      {media && typeof media === 'object' && (
        <div className="container mt-20 relative">
          <div className="border-4 border-bauhaus-black bg-bauhaus-black shadow-[16px_16px_0px_0px_#1A1A1A]">
             <Media priority resource={media} className="grayscale contrast-125 hover:grayscale-0 transition-all duration-500" />
          </div>
        </div>
      )}
    </div>
  )
}
