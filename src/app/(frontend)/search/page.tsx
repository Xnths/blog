import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import Image from 'next/image'
import Link from 'next/link'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  if (process.env.IS_BUILDING === 'true') return null

  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      heroImage: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  return (
    <div className="min-h-screen bg-bauhaus-bg text-bauhaus-black font-sans pb-24 overflow-x-hidden relative">
      <PageClient />
      
      {/* Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0" style={{ 
        backgroundImage: 'linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className="container relative z-10 pt-24">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black uppercase mb-8 relative inline-block">
             Search
             <div className="absolute -z-10 bottom-2 right-[-20px] w-full h-8 bg-bauhaus-yellow"></div>
          </h1>

          <div className="max-w-[50rem] mx-auto border-4 border-bauhaus-black bg-bauhaus-white p-4 shadow-[8px_8px_0px_0px_#1A1A1A]">
            <Search />
          </div>
        </div>

        {posts.totalDocs > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.docs.map((post, index) => {
               // @ts-expect-error meta and heroImage are not typed in search collection result but exist
               const displayImage = post.meta?.image && typeof post.meta.image !== 'number' ? post.meta.image : 
                                    post.heroImage && typeof post.heroImage !== 'number' ? post.heroImage : null;

               return (
               <Link href={`/posts/${post.slug}`} key={index} className="group block h-full">
                  <div className="border-4 border-bauhaus-black bg-white h-full relative transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[12px_12px_0px_0px_#D63426]">
                    
                    {displayImage && displayImage.url ? (
                        <div className="aspect-4/3 relative overflow-hidden border-b-4 border-bauhaus-black bg-bauhaus-black p-0">
                           <Image
                             src={displayImage.url}
                             alt={displayImage.alt || post.title || 'Post Image'}
                             fill
                             className="object-cover opacity-90 grayscale contrast-125 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                           />
                        </div>
                    ) : (
                        <div className="aspect-4/3 relative overflow-hidden border-b-4 border-bauhaus-black bg-bauhaus-black flex items-center justify-center">
                            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#1A1A1A,#1A1A1A_10px,#222_10px,#222_20px)] opacity-20"></div>
                            <span className="font-mono text-bauhaus-white opacity-50">NO_SIGNAL</span>
                        </div>
                    )}

                    <div className="p-8 flex flex-col h-[calc(100%-aspect-4/3)]">
                      <h3 className="text-2xl font-bold leading-none mb-4 group-hover:text-bauhaus-blue transition-colors">
                        {post.title}
                      </h3>
                      <div className="grow"></div> 
                      <div className="flex items-center justify-between mt-6 pt-6 border-t-4 border-bauhaus-black border-dashed">
                        <span className="font-mono text-sm font-bold bg-bauhaus-yellow px-2 py-1 border-2 border-bauhaus-black">
                           RESULT
                        </span>
                        <div className="w-8 h-8 rounded-full bg-bauhaus-black flex items-center justify-center group-hover:bg-bauhaus-red transition-colors">
                            <span className="text-bauhaus-bg">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
               </Link>
            )})}
          </div>
        ) : (
          <div className="container text-center py-12 border-4 border-bauhaus-black bg-bauhaus-white">
             <div className="font-mono text-xl font-bold uppercase">No results found.</div>
          </div>
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  if (process.env.IS_BUILDING === 'true') return {}

  return {
    title: `Payload Website Template Search`,
  }
}
