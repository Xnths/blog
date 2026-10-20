import { expect, test } from '@playwright/test'

const routes = ['', '/work', '/work/usp-aberta', '/research', '/research/information-retrieval-lattes', '/about', '/colophon']
const locales = ['en', 'pt-BR']

test.describe('metadata and structured data', () => {
  for (const locale of locales) {
    for (const route of routes) {
      test(`${locale}${route || '/'}: title, canonical, hreflang, JSON-LD`, async ({ page }) => {
        const response = await page.goto(`/${locale}${route}`)
        expect(response?.status()).toBe(200)

        await expect(page).toHaveTitle(/\S/)
        expect(await page.title()).not.toMatch(/Payload Website Template/)

        const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
        expect(canonical).toMatch(new RegExp(`/${locale}${route}$`))

        const alternates = await page
          .locator('link[rel="alternate"][hreflang]')
          .evaluateAll((els) => els.map((el) => el.getAttribute('hreflang')))
        expect(alternates.sort()).toEqual(['en', 'pt-BR', 'x-default'])

        const blocks = await page.locator('script[type="application/ld+json"]').allTextContents()
        expect(blocks.length).toBeGreaterThan(0)
        for (const block of blocks) {
          const data = JSON.parse(block)
          expect(data['@context']).toBe('https://schema.org')
          expect(Array.isArray(data['@graph'])).toBe(true)
          expect(JSON.stringify(data)).not.toContain('worksFor')
        }
      })
    }
  }

  test('the case study graph credits Xnths and numbers figures in order', async ({ page }) => {
    await page.goto('/en/work/usp-aberta')
    const graph = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) ?? '{}')
    const types = graph['@graph'].map((n: { '@type': string }) => n['@type'])
    expect(types).toEqual(expect.arrayContaining(['Person', 'Organization', 'SoftwareApplication', 'BreadcrumbList']))

    const figures = await page.locator('figure[id^="fig-"]').evaluateAll((els) => els.map((e) => e.id))
    expect(figures).toEqual(figures.map((_, i) => `fig-${i + 1}`))
  })

  test('sitemap lists every page in both locales with alternates', async ({ request }) => {
    const res = await request.get('/sitemap.xml')
    expect(res.status()).toBe(200)
    const xml = await res.text()
    for (const locale of locales) expect(xml).toContain(`/${locale}/work/usp-aberta`)
    expect(xml).toContain('hreflang="pt-BR"')
  })

  test('robots, llms.txt and BibTeX respond', async ({ request }) => {
    const robots = await (await request.get('/robots.txt')).text()
    expect(robots).toContain('Disallow: /admin')
    expect(robots).toContain('Sitemap:')

    const llms = await request.get('/llms.txt')
    expect(llms.status()).toBe(200)
    expect(await llms.text()).toContain('USP Aberta')

    const bib = await request.get('/cite/all.bib')
    expect(bib.headers()['content-type']).toContain('bibtex')
    expect(await bib.text()).toMatch(/^@\w+\{/)
    expect((await request.get('/cite/nope.bib')).status()).toBe(404)
  })
})
