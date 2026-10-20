import { expect, test } from '@playwright/test'

test.describe('locale routing', () => {
  test('redirects / by Accept-Language', async ({ request }) => {
    const pt = await request.get('/', {
      headers: { 'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8' },
      maxRedirects: 0,
    })
    expect(pt.status()).toBe(307)
    expect(pt.headers()['location']).toMatch(/\/pt-BR$/)

    const en = await request.get('/', {
      headers: { 'Accept-Language': 'fr-FR,fr;q=0.9' },
      maxRedirects: 0,
    })
    expect(en.headers()['location']).toMatch(/\/en$/)
  })

  test('the locale cookie wins over Accept-Language', async ({ request }) => {
    const res = await request.get('/', {
      headers: { 'Accept-Language': 'en-US', Cookie: 'NEXT_LOCALE=pt-BR' },
      maxRedirects: 0,
    })
    expect(res.headers()['location']).toMatch(/\/pt-BR$/)
  })

  for (const locale of ['en', 'pt-BR']) {
    test(`sets html[lang] and renders ${locale}`, async ({ page }) => {
      await page.goto(`/${locale}`)
      await expect(page.locator('html')).toHaveAttribute('lang', locale)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Jonathas Castilho')
    })
  }

  test('the switcher keeps the path and sets the cookie', async ({ page }) => {
    await page.goto('/en/work/usp-aberta')
    await page.getByRole('link', { name: 'Português' }).click()
    await expect(page).toHaveURL(/\/pt-BR\/work\/usp-aberta$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
    const cookies = await page.context().cookies()
    expect(cookies.find((c) => c.name === 'NEXT_LOCALE')?.value).toBe('pt-BR')
  })

  test('unknown locales and slugs are 404', async ({ request }) => {
    expect((await request.get('/xx')).status()).toBe(404)
    expect((await request.get('/en/work/does-not-exist')).status()).toBe(404)
  })

  test('legacy URLs redirect permanently', async ({ request }) => {
    const res = await request.get('/posts/hello', { maxRedirects: 0 })
    expect(res.status()).toBe(308)
    expect(res.headers()['location']).toMatch(/\/en\/writing\/hello$/)
  })
})
