import { test, expect } from '@playwright/test'
import { injectAxe, checkA11y } from 'axe-playwright'

test.describe('Export Demo E2E', () => {
  test('should load and be accessible', async ({ page }) => {
    await page.goto('/export-demo')
    await injectAxe(page)
    await checkA11y(page)
    
    await expect(page.locator('h1')).toContainText('Export Demo')
  })
})