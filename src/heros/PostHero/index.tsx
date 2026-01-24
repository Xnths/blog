import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import RichText from '@/components/RichText'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="container py-24 mb-12 border-b border-border text-center">
      <div className="uppercase text-xs tracking-widest text-muted-foreground mb-8 font-sans">
        {categories?.map((category, index) => {
          if (typeof category === 'object' && category !== null) {
            const { title: categoryTitle } = category
            const isLast = index === categories.length - 1
            return (
              <React.Fragment key={index}>
                {categoryTitle}
                {!isLast && <>&nbsp;•&nbsp;</>}
              </React.Fragment>
            )
          }
          return null
        })}
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl mb-12 max-w-4xl mx-auto leading-tight">
        {title}
      </h1>

      <div className="flex flex-col items-center gap-4 text-sm font-sans uppercase tracking-wider">
        {hasAuthors && (
          <div>
            <p className="text-muted-foreground mb-1 font-bold">Authors</p>
            <p className="text-primary">{formatAuthors(populatedAuthors)}</p>
          </div>
        )}
        {publishedAt && (
          <div>
            <p className="text-muted-foreground mb-1 font-bold">Published</p>
            <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
          </div>
        )}
      </div>

      {heroImage && typeof heroImage === 'object' && (
        <div className="mt-16 max-w-4xl mx-auto">
          <Media priority resource={heroImage} />
          {heroImage.caption && (
            <div className="mt-4 text-sm text-muted-foreground italic">
              <RichText data={heroImage.caption} enableGutter={false} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
