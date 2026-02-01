import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    limit: 3,
    sort: '-publishedAt',
  })

  return (
    <main className="min-h-screen bg-bauhaus-bg text-bauhaus-black font-sans overflow-x-hidden">
      {/* Grid Overlay for Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-5" style={{ 
        backgroundImage: 'linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      {/* Hero Section */}
      <div className="relative min-h-[90vh] grid grid-cols-1 md:grid-cols-12 grid-rows-[auto_1fr] md:grid-rows-none">
        
        {/* Left Color Block & Title */}
        <div className="md:col-span-5 flex flex-col justify-between p-8 md:p-16 border-r-4 border-bauhaus-black bg-bauhaus-bg z-10 relative">
          <div>
            <div className="w-16 h-16 bg-bauhaus-red rounded-full mb-8 animate-pulse"></div>
            <h1 className="text-6xl md:text-8xl font-bold uppercase leading-[0.8] tracking-tighter mix-blend-multiply">
              Log <br/>
              <span className="text-bauhaus-blue">of</span><br/>
              <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px #1A1A1A' }}>X</span><span className="text-bauhaus-red">nths</span>
            </h1>
          </div>
          <div className="mt-12 space-y-6">
             <p className="text-xl md:text-2xl font-medium max-w-sm">
              Exploring the intersection of <span className="text-bauhaus-red font-bold">software engineering</span>, <span className="text-bauhaus-blue font-bold">design</span> and <span className="text-bauhaus-yellow font-bold text-shadow-sm">psychology</span>.
            </p>
             <Link href="/posts" className="inline-block bg-bauhaus-black text-bauhaus-bg text-lg font-bold py-4 px-8 hover:bg-bauhaus-red transition-colors duration-300 shadow-[8px_8px_0px_0px_rgba(235,180,36,1)]">
              READ ARCHIVES
            </Link>
          </div>
        </div>

        {/* Hero Image & Geometric Composition */}
        <div className="md:col-span-7 relative border-b-4 md:border-b-0 border-bauhaus-black overflow-hidden flex flex-col">
          {/* Top Bar Decoration */}
          <div className="h-24 bg-bauhaus-yellow border-b-4 border-bauhaus-black flex items-center px-4 relative">
             <span className="font-mono text-bauhaus-black font-bold text-2xl tracking-widest">01010011 01000011 01001001</span>
             <div className="absolute right-0 h-full w-24 bg-bauhaus-red"></div>
          </div>

          <div className="relative flex-grow bg-bauhaus-blue flex items-center justify-center p-8 md:p-0">
             {/* Geometric Shapes Behind */}
             <div className="absolute top-10 right-10 w-40 h-40 bg-bauhaus-white rounded-full opacity-20"></div>
             <div className="absolute bottom-10 left-10 w-64 h-64 bg-bauhaus-yellow opacity-20 transform rotate-45"></div>

             {/* Hero Image Window */}
             <div className="relative z-10 w-full max-w-xl aspect-square border-4 border-bauhaus-black bg-bauhaus-bg shadow-[20px_20px_0px_0px_#1A1A1A] group">
                <Image
                  src="/hero.png"
                  alt="Abstract Computer Science"
                  fill
                  className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  priority
                />
                {/* Overlay Text */}
                <div className="absolute bottom-4 left-[-2rem] bg-bauhaus-red text-bauhaus-white py-2 px-6 border-4 border-bauhaus-black">
                   <span className="font-mono text-xl font-bold">SYSTEM.ROOT</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="h-12 bg-bauhaus-black flex items-center justify-between px-4 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
           <div key={i} className="flex gap-4 scroll-text whitespace-nowrap">
             <span className="text-bauhaus-white font-mono">/// ALGORITHMIC BEAUTY ///</span>
           </div>
        ))}
      </div>

      {/* Recent Posts - Bauhaus Grid */}
      <section className="min-h-screen p-8 md:p-16">
        <h2 className="text-4xl md:text-6xl font-black mb-16 uppercase relative inline-block">
          Recent<br/>Transmission
          <div className="absolute -z-10 bottom-2 right-[-20px] w-full h-8 bg-bauhaus-yellow"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.docs.map((post, index) => {
             const displayImage = post.meta?.image && typeof post.meta.image !== 'number' ? post.meta.image : 
                                  post.heroImage && typeof post.heroImage !== 'number' ? post.heroImage : null;

             return (
            <Link href={`/posts/${post.slug}`} key={post.id} className="group">
              <div className={`relative border-4 border-bauhaus-black bg-white h-full transition-transform duration-300 group-hover:-translate-y-2 ${index === 1 ? 'md:mt-16' : ''}`}>
                <div className="aspect-[4/3] bg-bauhaus-black relative overflow-hidden">
                   {/* Fallback pattern if no image */}
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-bauhaus-bg via-bauhaus-black to-bauhaus-black opacity-20"></div>
                   
                   {/* Render Image Correctly if media exists */}
                   {displayImage && displayImage.url && (
                        <Image 
                           src={displayImage.url} 
                           alt={displayImage.alt || post.title}
                           fill
                           className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                   )}
                   
                   <div className="absolute top-2 right-2 bg-bauhaus-bg px-2 py-1 border-2 border-bauhaus-black text-xs font-mono font-bold">
                    {new Date(post.publishedAt || '').toLocaleDateString()}
                   </div>
                </div>
                
                <div className="p-6">
                   <div className="w-8 h-1 bg-bauhaus-red mb-4"></div>
                   <h3 className="text-2xl font-bold leading-tight mb-4 group-hover:text-bauhaus-blue transition-colors">
                    {post.title}
                   </h3>
                   <div className="flex justify-end">
                      <span className="text-3xl font-black text-bauhaus-bg text-stroke-2" style={{ WebkitTextStroke: '1px #1A1A1A' }}>
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                   </div>
                </div>
              </div>
            </Link>
          )})}
        </div>
      
      </section>
      {/* Footer Element */}
      <div className="h-64 bg-bauhaus-red border-t-4 border-bauhaus-black flex items-center justify-center p-8 text-center relative overflow-hidden">
         <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <h2 className="text-[20rem] font-black text-bauhaus-black leading-none">MID</h2>
         </div>
         <div className="z-10 bg-bauhaus-bg p-8 border-4 border-bauhaus-black shadow-[12px_12px_0px_0px_#1A1A1A]">
            <p className="text-xl font-bold text-bauhaus-black max-w-md">
              "Science does not work by proving statements true, but rather proving statements false" - Robert C. Martin
            </p>
         </div>
      </div>

      {/* About Me Section */}
      <section className="p-8 md:p-16 border-t-4 border-bauhaus-black bg-bauhaus-white relative overflow-hidden">
         <div className="max-w-5xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
               
               {/* Geometric Profile Container */}
               <div className="shrink-0 relative">
                  <div className="w-48 h-48 border-4 border-bauhaus-black bg-bauhaus-bg shadow-[16px_16px_0px_0px_#2D68A8] relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-bauhaus-yellow via-transparent to-transparent opacity-50"></div>
                      <span className="font-black text-8xl text-bauhaus-black">J</span>
                  </div>
                  <div className="absolute -top-6 -left-6 text-6xl font-black text-bauhaus-red opacity-20 -z-10">
                    X
                  </div>
               </div>

               <div className="grow">
                  <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase">
                    About <span className="text-bauhaus-blue">The</span> Author
                  </h2>
                  <div className="prose-lg md:prose-xl font-medium leading-relaxed text-bauhaus-black text-justify">
                    <p>
                      <span className="font-bold">Jonathas</span> (long for Xnths) is a computer scientist at <span className="font-bold">USP</span> (Universidade de São Paulo) and a software engineer who has been developing software since 2015. 
                    </p>
                    <p className="mt-4">
                      His work connects <span className="bg-bauhaus-yellow px-1 border-b-2 border-bauhaus-black">agile methods</span> with <span className="bg-bauhaus-red text-bauhaus-white px-1 border-b-2 border-bauhaus-black">radical behaviorism</span>, drawing specifically on Skinnerian psychology to analyze and shape software development practices. By focusing on observable behavior, reinforcement, and feedback loops, he studies how teams and processes adapt over time, applying these principles to the design and evolution of software systems.
                    </p>
                  </div>
               </div>
            </div>
         </div>

         {/* Background Decor */}
         <div className="absolute top-10 right-10 w-32 h-32 border-4 border-bauhaus-black rounded-full opacity-10"></div>
         <div className="absolute bottom-10 left-1/2 w-64 h-2 bg-bauhaus-black transform -rotate-45 opacity-20"></div>
      </section>

    </main>
  )
}
