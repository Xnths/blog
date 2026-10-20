import { defineConfig, devices } from '@playwright/test'

import 'dotenv/config'

const baseURL = process.env.E2E_BASE_URL || 'http://localhost:3000'

/**
 * End-to-end tests run against a production build (`pnpm build && pnpm start`), one worker at a
 * time: parallel browsers are heavy on small machines. Run each spec on its own when memory is tight.
 */
export default defineConfig({
  testDir: './tests/e2e',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  fullyParallel: false,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chromium' },
    },
  ],
  webServer: {
    command: 'pnpm start',
    reuseExistingServer: true,
    url: baseURL,
    timeout: 120_000,
  },
})
