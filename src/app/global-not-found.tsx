import './(frontend)/globals.css'

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Not found — Xnths',
  robots: { index: false },
}

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="page py-32">
          <p className="label-mono mb-3">404</p>
          <h1 className="mb-4 text-4xl">Page not found</h1>
          <p className="mb-8 max-w-[var(--measure)] text-muted-foreground">
            This page does not exist, or it moved. / Esta página não existe ou foi movida.
          </p>
          <p className="flex gap-6">
            <Link href="/en">English</Link>
            <Link href="/pt-BR">Português</Link>
          </p>
        </main>
      </body>
    </html>
  )
}
