/**
 * End-to-end tests for export functionality
 * Tests the complete export workflow from UI to generated code
 */

import { test, expect } from '@playwright/test'

test.describe('Export Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/export-demo')
  })

  test('should export React project successfully', async ({ page }) => {
    // Select framework
    await page.click('[data-testid="framework-react"]')
    
    // Configure options
    await page.check('[data-testid="typescript-enabled"]')
    await page.check('[data-testid="accessibility-enabled"]')
    await page.check('[data-testid="testing-enabled"]')
    
    // Trigger export
    await page.click('[data-testid="export-button"]')
    
    // Wait for export to complete
    await page.waitForSelector('[data-testid="export-success"]', { timeout: 30000 })
    
    // Verify download was triggered
    const downloadPromise = page.waitForEvent('download')
    await page.click('[data-testid="download-button"]')
    const download = await downloadPromise
    
    expect(download.suggestedFilename()).toContain('eternal-ui-export')
    expect(download.suggestedFilename()).toContain('.zip')
  })

  test('should show performance metrics after export', async ({ page }) => {
    await page.click('[data-testid="framework-react"]')
    await page.check('[data-testid="performance-enabled"]')
    await page.click('[data-testid="export-button"]')
    
    await page.waitForSelector('[data-testid="performance-metrics"]')
    
    // Check performance metrics are displayed
    await expect(page.locator('[data-testid="bundle-size"]')).toBeVisible()
    await expect(page.locator('[data-testid="lighthouse-score"]')).toBeVisible()
    await expect(page.locator('[data-testid="accessibility-score"]')).toBeVisible()
  })

  test('should validate accessibility compliance', async ({ page }) => {
    // Run axe accessibility tests on the export page
    const accessibilityScanResults = await page.evaluate(() => {
      return new Promise((resolve) => {
        // @ts-ignore - axe is loaded globally in test environment
        axe.run(document, (err: any, results: any) => {
          resolve(results)
        })
      })
    })

    // @ts-ignore
    expect(accessibilityScanResults.violations).toHaveLength(0)
  })

  test('should support keyboard navigation', async ({ page }) => {
    // Test tab navigation through export form
    await page.keyboard.press('Tab')
    await expect(page.locator('[data-testid="framework-react"]')).toBeFocused()
    
    await page.keyboard.press('Tab')
    await expect(page.locator('[data-testid="typescript-enabled"]')).toBeFocused()
    
    // Test form submission with keyboard
    await page.keyboard.press('Enter')
    await page.waitForSelector('[data-testid="export-success"]')
  })

  test('should work on mobile devices', async ({ page, browserName }) => {
    // Simulate mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Touch interactions
    await page.tap('[data-testid="framework-react"]')
    await page.tap('[data-testid="export-button"]')
    
    await page.waitForSelector('[data-testid="export-success"]')
    
    // Verify mobile-responsive design
    const exportButton = page.locator('[data-testid="export-button"]')
    const buttonBox = await exportButton.boundingBox()
    
    // Button should be touch-friendly (minimum 44px height)
    expect(buttonBox?.height).toBeGreaterThanOrEqual(44)
  })

  test('should handle large component exports', async ({ page }) => {
    // Simulate exporting a large project
    await page.evaluate(() => {
      // Mock a large component tree
      window.mockLargeProject = true
    })
    
    await page.click('[data-testid="framework-react"]')
    await page.click('[data-testid="export-large-project"]')
    
    // Should show progress indicator
    await expect(page.locator('[data-testid="export-progress"]')).toBeVisible()
    
    // Should complete within reasonable time (2 minutes max)
    await page.waitForSelector('[data-testid="export-success"]', { timeout: 120000 })
  })
})