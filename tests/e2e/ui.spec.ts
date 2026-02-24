import { test, expect } from '@playwright/test'

test('core layout renders with key controls', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByText('Robot Framework IDE')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Check My Solution' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Execute CLI' })).toBeVisible()
  await expect(page.getByText('Explorer')).toBeVisible()

  await page.getByRole('button', { name: 'Check My Solution' }).click()
  await expect(page.getByText('AI Coach')).toBeVisible()

  await page.screenshot({ path: 'tests/e2e/artifacts/layout.png', fullPage: true })
})
