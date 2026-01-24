import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer | null = await getCachedGlobal('footer', 1)()

  if (!footerData && process.env.IS_BUILDING === 'true') return null

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-24 border-t border-border bg-background text-foreground">
      <div className="container py-12 gap-8 flex flex-col md:flex-row md:justify-between items-center">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="flex flex-col items-center md:flex-row gap-8">
          <nav className="flex flex-col md:flex-row gap-6">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-foreground hover:underline" key={i} {...link} />
            })}
          </nav>
          <ThemeSelector />
        </div>
      </div>
      <div className="container pb-12 text-center text-sm text-muted-foreground uppercase tracking-widest font-sans">
        © {new Date().getFullYear()} — Scientific Journal Edition
      </div>
    </footer>
  )
}
