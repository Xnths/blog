import type { Metadata } from 'next/types'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-static'
export const revalidate = 600

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
    <div className="min-h-screen bg-bauhaus-bg text-bauhaus-black font-sans overflow-x-hidden relative">
      <PageClient />
      
      {/* Grid Overlay for Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0" style={{ 
        backgroundImage: 'linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className="container relative z-10 pt-24 pb-24">
        
        {/* Page Title with Bauhaus Style */}
        <div className="mb-16 relative inline-block">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-bauhaus-yellow -z-10 rounded-full"></div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mix-blend-multiply relative z-10">
            Trans<br/>
            <span className="text-bauhaus-red">miss</span>ions
          </h1>
          <div className="h-4 w-full bg-bauhaus-black mt-4"></div>
        </div>

        <div className="mb-8 font-mono font-bold bg-bauhaus-black text-bauhaus-bg inline-block px-4 py-2">
           <PageRange
             collection="posts"
             currentPage={posts.page}
             limit={12}
             totalDocs={posts.totalDocs}
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.docs.map((post, index) => {
             const displayImage = post.meta?.image && typeof post.meta.image !== 'number' ? post.meta.image : 
                                  post.heroImage && typeof post.heroImage !== 'number' ? post.heroImage : null;

             return (
             <Link href={`/posts/${post.slug}`} key={index} className="group block h-full">
                <div className="border-4 border-bauhaus-black bg-white h-full relative transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[12px_12px_0px_0px_#D63426]">
                  
                  {/* Geometric Decoration on random cards */}
                  {index % 3 === 0 && (
                     <div className="absolute -top-4 -right-4 w-12 h-12 bg-bauhaus-blue rounded-full border-4 border-bauhaus-black z-20"></div>
                  )}
                  {index % 3 === 1 && (
                     <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-bauhaus-yellow rotate-45 border-4 border-bauhaus-black z-20"></div>
                  )}

                  <div className="aspect-[4/3] relative overflow-hidden border-b-4 border-bauhaus-black bg-bauhaus-black p-0">
                     {/* Fallback pattern */}
                     <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#1A1A1A,#1A1A1A_10px,#222_10px,#222_20px)] opacity-20"></div>

                     {displayImage && displayImage.url && (
                        <Image
                          src={displayImage.url}
                          alt={displayImage.alt || post.title}
                          fill
                          className="object-cover opacity-90 grayscale contrast-125 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                        />
                     )}
                     
                     <div className="absolute top-0 right-0 bg-bauhaus-bg border-l-4 border-b-4 border-bauhaus-black p-2 font-mono text-xs font-bold z-10">
                        {new Date(post.publishedAt || '').toLocaleDateString('en-GB')}
                     </div>
                  </div>

                  <div className="p-8 flex flex-col h-[calc(100%-aspect-[4/3])]">
                    <h3 className="text-3xl font-bold leading-none mb-4 group-hover:text-bauhaus-blue transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex-grow"></div> 
                    <div className="flex items-center justify-between mt-6 pt-6 border-t-4 border-bauhaus-black border-dashed">
                      <span className="font-mono text-sm font-bold bg-bauhaus-yellow px-2 py-1 border-2 border-bauhaus-black">
                        READ_FILE
                      </span>
                      <div className="w-8 h-8 rounded-full bg-bauhaus-black flex items-center justify-center group-hover:bg-bauhaus-red transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#F0EFE1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
             </Link>
          )})}
        </div>

        <div className="mt-16 flex justify-center">
          {posts.totalPages > 1 && posts.page && (
            <div className="bg-bauhaus-white border-4 border-bauhaus-black p-4 inline-block shadow-[8px_8px_0px_0px_#1A1A1A]">
               <Pagination page={posts.page} totalPages={posts.totalPages} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  if (process.env.IS_BUILDING === 'true') return {}

  return {
    title: `Payload Website Template Posts`,
  }
}
