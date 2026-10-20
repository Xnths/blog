import { isLocale } from '@/i18n/config'
import { getSite } from '@/lib/content'
import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Jonathas Castilho — Xnths'

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const site = await getSite(isLocale(locale) ? locale : 'en')

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
        <div style={{ display: 'flex', fontSize: 34, color: '#5d5a52' }}>
          {site.affiliationLine}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 96, lineHeight: 1.05, fontWeight: 700 }}>{site.name}</div>
          <div style={{ fontSize: 44, marginTop: 24, maxWidth: 900, lineHeight: 1.25 }}>
            {site.positioning}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 40, fontWeight: 700 }}>
          xnths<span style={{ color: '#b23c17' }}>.</span>
        </div>
      </div>
    ),
    size,
  )
}
