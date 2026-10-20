import { absoluteUrl, localizedPath } from '@/i18n/paths'
import { getProjects, getPublications, getSite } from '@/lib/content'
import { toMarkdown } from '@/lib/lexical'

export const dynamic = 'force-dynamic'

export async function GET(): Promise<Response> {
  const [site, projects, publications] = await Promise.all([
    getSite('en'),
    getProjects('en'),
    getPublications('en'),
  ])

  const parts: string[] = [`# ${site.name} (${site.alias ?? 'Xnths'})`, `> ${site.positioning}`, site.shortBio]

  for (const project of projects) {
    parts.push(
      `# ${project.title}`,
      `Source: ${absoluteUrl(localizedPath('en', `/work/${project.slug}`))}`,
      project.summary,
      project.attribution ?? '',
      (project.keyMetrics ?? []).map((m) => `- **${m.value}** ${m.label}${m.context ? ` (${m.context})` : ''}`).join('\n'),
      toMarkdown(project.body),
      (project.references ?? [])
        .map((r) => `- [${r.key}] ${r.authors ? `${r.authors}. ` : ''}${r.title}${r.venue ? `. ${r.venue}` : ''}${r.year ? ` (${r.year})` : ''}`)
        .join('\n'),
    )
  }

  for (const pub of publications) {
    parts.push(
      `# ${pub.title}`,
      `Source: ${absoluteUrl(localizedPath('en', `/research/${pub.slug}`))}`,
      `${pub.type} · ${pub.status} · ${pub.year}${pub.venue ? ` · ${pub.venue}` : ''}`,
      pub.abstract ?? '',
    )
  }

  return new Response(parts.filter(Boolean).join('\n\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  })
}
