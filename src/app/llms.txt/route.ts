import { locales } from '@/i18n/config'
import { absoluteUrl, localizedPath } from '@/i18n/paths'
import { getProjects, getPublications, getSite } from '@/lib/content'

export const dynamic = 'force-dynamic'

export async function GET(): Promise<Response> {
  const [site, projects, publications] = await Promise.all([
    getSite('en'),
    getProjects('en'),
    getPublications('en'),
  ])

  const lines = [
    `# ${site.name} (${site.alias ?? 'Xnths'})`,
    '',
    `> ${site.positioning}. ${site.shortBio}`,
    '',
    `Available in: ${locales.join(', ')}. Every URL below also exists under the other locale prefix.`,
    '',
    '## Work',
    ...projects.map(
      (p) => `- [${p.title}](${absoluteUrl(localizedPath('en', `/work/${p.slug}`))}): ${p.summary}`,
    ),
    '',
    '## Research',
    ...publications.map(
      (p) => `- [${p.title}](${absoluteUrl(localizedPath('en', `/research/${p.slug}`))}): ${p.venue ?? p.type}, ${p.year}`,
    ),
    '',
    '## More',
    `- [About](${absoluteUrl(localizedPath('en', '/about'))})`,
    `- [Full text of the portfolio](${absoluteUrl('/llms-full.txt')})`,
    `- [All publications as BibTeX](${absoluteUrl('/cite/all.bib')})`,
    '',
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  })
}
