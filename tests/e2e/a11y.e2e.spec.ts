import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const pages = ['/en', '/pt-BR', '/en/work/usp-aberta', '/en/research', '/en/about', '/en/colophon']

for (const theme of ['light', 'dark'] as const) {
  test.describe(`axe, ${theme} theme`, () => {
    test.use({ colorScheme: theme })

    for (const path of pages) {
      test(`${path} has no WCAG 2.x A/AA violations`, async ({ page }) => {
        await page.goto(path, { waitUntil: 'networkidle' })
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme)

        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze()

        expect(
          results.violations.map(
            (v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`,
          ),
        ).toEqual([])
      })
    }
  })
}

test('the skip link moves focus to the main landmark', async ({ page }) => {
  await page.goto('/en')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: /skip to content/i })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main')).toBeFocused()
})

test('the theme toggle switches data-theme', async ({ page }) => {
  await page.goto('/en')
  const before = await page.locator('html').getAttribute('data-theme')
  await page.getByRole('button', { name: /toggle color theme/i }).click()
  const after = await page.locator('html').getAttribute('data-theme')
  expect(after).not.toBe(before)
})
