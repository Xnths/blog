import { buildBibtex } from '@/lib/bibtex'
import { getPublications } from '@/lib/content'

export const dynamic = 'force-dynamic'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> },
): Promise<Response> {
  const { file } = await params
  if (!file.endsWith('.bib')) return new Response('Not found', { status: 404 })

  const name = file.slice(0, -'.bib'.length)
  const publications = await getPublications('en')
  const selected = name === 'all' ? publications : publications.filter((p) => p.slug === name)

  if (selected.length === 0) return new Response('Not found', { status: 404 })

  return new Response(selected.map(buildBibtex).join('\n\n') + '\n', {
    headers: {
      'Content-Type': 'application/x-bibtex; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
