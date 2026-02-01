import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export async function Footer() {
  const footerData: Footer | null = await getCachedGlobal('footer', 1)()

  if (!footerData && process.env.IS_BUILDING === 'true') return null

  const navItems = footerData?.navItems || []

  return (
    <footer className="h-64 bg-bauhaus-red border-t-4 border-bauhaus-black flex items-center justify-center p-8 text-center relative overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
         <h2 className="text-[20rem] font-black text-bauhaus-black leading-none">END</h2>
      </div>

      <div className="z-10 bg-bauhaus-bg p-8 border-4 border-bauhaus-black shadow-[12px_12px_0px_0px_#1A1A1A] max-w-2xl w-full">
         
         <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <p className="text-xl font-bold text-bauhaus-black">
                "The real problem is not whether machines think but whether men do." - B.F. Skinner
              </p>
              <p className="font-mono text-sm mt-2 opacity-70">
                 © {new Date().getFullYear()} — Log of Xnths
              </p>
            </div>

            <nav className="flex flex-wrap justify-center gap-4">
              {navItems.map(({ link }, i) => {
                return (
                  <div key={i} className="bg-bauhaus-black text-bauhaus-bg px-3 py-1 hover:bg-bauhaus-blue transition-colors">
                     <CMSLink className="font-bold uppercase" {...link} />
                  </div>
                )
              })}
            </nav>
         </div>
      </div>
    </footer>
  )
}
