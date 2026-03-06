import type { Metadata } from 'next/types'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-static'
export const revalidate = 600

const cardConfigs = [
  { bg: 'bg-hero-sky', sh: '[--clay-sh:#5a9ab0]' },
  { bg: 'bg-hero-green', sh: '[--clay-sh:#4e7a43]' },
  { bg: 'bg-hero-wood', sh: '[--clay-sh:#725e43]' },
  { bg: 'bg-hero-red', sh: '[--clay-sh:#824433]' },
  { bg: 'bg-hero-sand', sh: '[--clay-sh:#b8a38b]' },
  { bg: 'bg-hero-surface', sh: '[--clay-sh:#c8c0b8]' },
]

export default async function Page() {
  if (process.env.IS_BUILDING === 'true') return null

  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
      heroImage: true,
    },
    sort: '-publishedAt',
  })

  return (
    <div className="bg-hero-sand bg-noise font-sans text-hero-dark min-h-screen">
      <PageClient />

      <div className="max-w-[1100px] mx-auto px-4 md:px-8 pb-24">
        {/* NAV */}
        <nav className="flex justify-between items-center py-6 md:py-8">
          <Link href="/" className="font-serif text-2xl font-black tracking-tight text-hero-dark">
            xnths
          </Link>
          <Link
            href="/"
            className="text-hero-dark font-bold text-sm px-4 py-2 rounded-full bg-hero-surface shadow-clay-sm hover:translate-y-[-2px] hover:translate-x-[-1px] hover:shadow-clay-sm-hover transition-all"
          >
            ← Back
          </Link>
        </nav>

        {/* HEADER */}
        <div className="flex items-baseline gap-4 mb-8 mt-4">
          <h1 className="font-serif text-4xl font-black tracking-tight text-hero-dark">Insights</h1>
          <Badge
            variant="secondary"
            className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm bg-hero-red text-hero-surface hover:bg-hero-red/80 border-none"
          >
            All Posts
          </Badge>
          <span className="ml-auto text-sm font-bold text-hero-dark/60">
            <PageRange
              collection="posts"
              currentPage={posts.page}
              limit={12}
              totalDocs={posts.totalDocs}
            />
          </span>
        </div>

        {/* POSTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 md:gap-6">
          {posts.docs.map((post, index) => {
            const c = cardConfigs[index % cardConfigs.length]
            const displayImage =
              post.meta?.image && typeof post.meta.image !== 'number'
                ? post.meta.image
                : post.heroImage && typeof post.heroImage !== 'number'
                  ? post.heroImage
                  : null

            const publishedDate = post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : null

            return (
              <Link
                key={post.id ?? index}
                href={`/posts/${post.slug}`}
                className={`group flex flex-col rounded-[24px] md:rounded-[28px] shadow-clay hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-clay-hover transition-all bg-noise-card overflow-hidden ${c.bg} ${c.sh}`}
              >
                {/* Hero image */}
                {displayImage && displayImage.url && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={displayImage.url}
                      alt={
                        typeof displayImage.alt === 'string' ? displayImage.alt : (post.title ?? '')
                      }
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6 md:p-8 flex flex-col gap-3 flex-1">
                  {publishedDate && (
                    <span className="text-[0.72rem] font-bold text-hero-dark/50 uppercase tracking-wider">
                      {publishedDate}
                    </span>
                  )}

                  <h2 className="font-serif text-xl font-bold leading-snug text-hero-dark">
                    {post.title}
                  </h2>

                  {post.meta?.description && (
                    <p className="text-sm text-hero-dark/70 leading-relaxed line-clamp-2">
                      {post.meta.description}
                    </p>
                  )}

                  <div className="mt-auto pt-4 flex items-center gap-1 text-[0.82rem] font-extrabold text-hero-dark">
                    Read post{' '}
                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* PAGINATION */}
        {posts.totalPages > 1 && posts.page && (
          <div className="mt-12 flex justify-center">
            <div className="bg-hero-surface rounded-[20px] shadow-clay p-4 inline-block [--clay-sh:#c8c0b8]">
              <Pagination page={posts.page} totalPages={posts.totalPages} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  if (process.env.IS_BUILDING === 'true') return {}

  return {
    title: 'Insights — xnths',
    description:
      'Articles on software engineering, behavioral design, and high-performance systems.',
  }
}
