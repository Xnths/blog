import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import Image from 'next/image'
import Link from 'next/link'

import type { Post } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  if (process.env.IS_BUILDING === 'true') return []

  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  if (process.env.IS_BUILDING === 'true') return null

  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/posts/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) return <PayloadRedirects url={url} />

  // Fallback Image Logic
  const heroImage = post.meta?.image && typeof post.meta.image !== 'number' ? post.meta.image : 
                    post.heroImage && typeof post.heroImage !== 'number' ? post.heroImage : null;

  return (
    <article className="min-h-screen bg-bauhaus-bg text-bauhaus-black font-sans pb-24 relative overflow-x-hidden">
      <PageClient />
      
      {/* Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0" style={{ 
        backgroundImage: 'linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <div className="container relative z-10 pt-16">
         {/* Return Link */}
         <Link href="/posts" className="inline-block mb-8 font-mono font-bold bg-bauhaus-black text-bauhaus-bg px-4 py-2 hover:bg-bauhaus-red transition-colors">
            ← RETURN_ARCHIVE
         </Link>

         {/* Post Header */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-12">
               <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6 relative inline-block">
                  <span className="relative z-10">{post.title}</span>
                  <div className="absolute top-1/2 left-0 w-full h-8 bg-bauhaus-yellow -z-10 -translate-y-1/2 opacity-50"></div>
               </h1>
            </div>

            {/* Metadata Bar */}
            <div className="lg:col-span-12 flex flex-wrap gap-4 border-y-4 border-bauhaus-black py-4">
               {post.publishedAt && (
                   <div className="bg-bauhaus-white border-2 border-bauhaus-black px-3 py-1 font-mono text-sm font-bold shadow-[4px_4px_0px_0px_#1A1A1A]">
                      DATE: {new Date(post.publishedAt).toLocaleDateString('en-GB')}
                   </div>
               )}
               {post.populatedAuthors && post.populatedAuthors.map((author, i) => (
                   <div key={i} className="bg-bauhaus-blue text-bauhaus-white border-2 border-bauhaus-black px-3 py-1 font-mono text-sm font-bold shadow-[4px_4px_0px_0px_#1A1A1A]">
                      AUTHOR: {author.name}
                   </div>
               ))}
               {post.categories && post.categories.map((category, i) => {
                  if (typeof category === 'object' && category !== null) {
                    return (
                      <div key={i} className="bg-bauhaus-red text-bauhaus-white border-2 border-bauhaus-black px-3 py-1 font-mono text-sm font-bold shadow-[4px_4px_0px_0px_#1A1A1A]">
                         CAT: {category.title}
                      </div>
                    )
                  }
                  return null
               })}
            </div>
         </div>

         {/* Hero Image */}
         {heroImage && heroImage.url && (
            <div className="mb-16 border-4 border-bauhaus-black bg-bauhaus-black shadow-[16px_16px_0px_0px_#D63426] relative">
               <div className="aspect-video relative w-full h-full overflow-hidden">
                  <Image
                    src={heroImage.url}
                    alt={heroImage.alt || ''}
                    fill
                    priority
                    className="object-cover"
                  />
               </div>
            </div>
         )}
         
         {/* Content */}
         <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-grow lg:w-2/3">
               <div className="border-l-4 border-bauhaus-black pl-8 lg:pl-12 py-4">
                  <RichText 
                     className="max-w-none prose-lg md:prose-xl prose-headings:font-bold prose-headings:uppercase prose-p:text-bauhaus-black prose-a:text-bauhaus-blue prose-a:font-bold prose-a:no-underline hover:prose-a:bg-bauhaus-yellow" 
                     data={post.content} 
                     enableGutter={false} 
                  />
               </div>
            </div>
            
            {/* Sidebar / Related */}
            <div className="lg:w-1/3">
                <div className="bg-bauhaus-white border-4 border-bauhaus-black p-6 sticky top-8">
                   <h3 className="text-2xl font-bold uppercase mb-6 border-b-4 border-bauhaus-black pb-2">
                     Data Stream
                   </h3>
                   {post.relatedPosts && post.relatedPosts.length > 0 ? (
                      <div className="space-y-6">
                        {post.relatedPosts.map((relatedPost, i) => {
                           if (typeof relatedPost === 'object') {
                             return (
                               <Link href={`/posts/${relatedPost.slug}`} key={i} className="block group">
                                  <div className="font-bold group-hover:text-bauhaus-red transition-colors">
                                     {relatedPost.title}
                                  </div>
                                  <div className="h-1 w-full bg-bauhaus-black mt-1 group-hover:w-1/2 transition-all"></div>
                               </Link>
                             )
                           }
                           return null
                        })}
                      </div>
                   ) : (
                      <p className="font-mono text-sm opacity-50">NO_RELATED_DATA</p>
                   )}
                </div>
            </div>
         </div>

      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  if (process.env.IS_BUILDING === 'true') return {}

  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
