import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

import { localizedPath } from '@/i18n/paths'
import Link from 'next/link'
import React from 'react'

export const SiteFooter: React.FC<{ locale: Locale; dict: Dictionary }> = ({ locale, dict }) => (
  <footer className="mt-24 border-t border-rule">
    <div className="page flex flex-col gap-3 py-8 font-sans text-[0.82rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <p>
        © 2015–{new Date().getFullYear()} Xnths · J. Castilho Tecnologia Ltda. {dict.footer.rights}
      </p>
      <p className="flex flex-wrap gap-x-4">
        <Link href={localizedPath(locale, '/colophon')}>{dict.footer.colophon}</Link>
        <a href="/llms.txt">llms.txt</a>
        <a href="/cite/all.bib">BibTeX</a>
      </p>
    </div>
  </footer>
)
