import { expect, test } from '@playwright/test'

/**
 * Crawls every URL in the sitemap with plain HTTP requests (no browser) and checks the rendered HTML
 * for content rules. Employer names are read from CONTENT_DENYLIST so they never enter the repository.
 */
const denylist = (process.env.CONTENT_DENYLIST ?? '')
  .split(',')
  .map((t) => t.trim().toLowerCase())
  .filter(Boolean)

const textOf = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')

test('every sitemap URL follows the content rules', async ({ request, baseURL }) => {
  test.skip(denylist.length === 0, 'CONTENT_DENYLIST is not set')

  const xml = await (await request.get('/sitemap.xml')).text()
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(/^https?:\/\/[^/]+/, baseURL ?? ''),
  )
  expect(urls.length).toBeGreaterThan(10)

  for (const url of urls) {
    const res = await request.get(url)
    expect(res.status(), url).toBe(200)
    const html = (await res.text()).toLowerCase()
    expect(html, url).not.toContain('payload website template')
    for (const term of denylist) expect(html.includes(term), `${url} contains "${term}"`).toBe(false)
  }
})

test('figures are numbered 1..n, citations and anchors have targets', async ({ request }) => {
  for (const locale of ['en', 'pt-BR']) {
    const html = await (await request.get(`/${locale}/work/usp-aberta`)).text()

    const figs = [...html.matchAll(/id="fig-(\d+)"/g)].map((m) => Number(m[1]))
    expect(figs).toEqual(figs.map((_, i) => i + 1))
    expect(figs.length).toBeGreaterThanOrEqual(4)

    const cites = [...html.matchAll(/href="#ref-([a-z0-9]+)"/g)].map((m) => m[1])
    expect(cites.length).toBeGreaterThan(5)
    for (const key of new Set(cites)) expect(html, key).toContain(`id="ref-${key}"`)

    const anchors = [...html.matchAll(/href="#([a-z0-9-]+)"/g)]
      .map((m) => m[1])
      .filter((a) => !a.startsWith('ref-'))
    for (const anchor of new Set(anchors)) expect(html, anchor).toContain(`id="${anchor}"`)
  }
})

test('the flagship names Xnths and its partners in both locales', async ({ request }) => {
  for (const locale of ['en', 'pt-BR']) {
    const text = textOf(await (await request.get(`/${locale}/work/usp-aberta`)).text())
    for (const credit of ['Xnths', 'IME-USP', 'LabXP', 'Alfredo Goldman', 'PRPI-USP']) {
      expect(text, `${locale}: ${credit}`).toContain(credit)
    }
  }
})

test('capability links point at existing sections', async ({ request }) => {
  for (const locale of ['en', 'pt-BR']) {
    const home = await (await request.get(`/${locale}`)).text()
    const links = [...home.matchAll(/href="(\/[^"]*\/work\/usp-aberta#[^"]+)"/g)].map((m) => m[1])
    expect(links.length).toBe(8)
    const page = await (await request.get(`/${locale}/work/usp-aberta`)).text()
    for (const link of links) expect(page, link).toContain(`id="${link.split('#')[1]}"`)
  }
})
