import { isLocale } from '@/i18n/config'
import { getProject } from '@/lib/content'
import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Xnths case study'

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const project = await getProject(isLocale(locale) ? locale : 'en', slug)
  const metrics = (project?.keyMetrics ?? []).slice(0, 4)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#fbfaf7',
          color: '#1b1a17',
          padding: 72,
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, color: '#b23c17' }}>Xnths · case study</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 84, lineHeight: 1.05, fontWeight: 700 }}>
            {project?.title ?? 'Xnths'}
          </div>
          <div style={{ fontSize: 34, marginTop: 20, maxWidth: 960, lineHeight: 1.3, color: '#5d5a52' }}>
            {project?.summary?.slice(0, 150)}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 48 }}>
          {metrics.map((m) => (
            <div key={m.label} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 44, fontWeight: 700 }}>{m.value}</div>
              <div style={{ fontSize: 22, color: '#5d5a52' }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
