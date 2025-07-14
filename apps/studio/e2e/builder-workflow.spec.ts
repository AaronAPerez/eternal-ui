
```typescript
import { test, expect } from '@playwright/test';

/**
 * End-to-End Testing for Builder Workflow
 * 
 * Tests complete user journeys:
 * - Creating a new project
 * - Adding and configuring components
 * - Using grid system
 * - Responsive design testing
 * - Exporting functionality
 */

test.describe('Builder Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/builder');
    await page.waitForLoadState('networkidle');
  });

  test('complete design workflow', async ({ page }) => {
    // Wait for builder to load
    await expect(page.getByText('Eternal UI')).toBeVisible();
    await expect(page.getByText('Ready')).toBeVisible();

    // Step 1: Switch to components mode
    await page.getByRole('button', { name: 'Components' }).click();
    await expect(page.getByText('Component library')).toBeVisible();

    // Step 2: Drag component to canvas
    const heroComponent = page.getByText('Hero Section');
    const canvas = page.getByRole('region', { name: /canvas/i });
    
    await heroComponent.dragTo(canvas);
    await expect(canvas.getByText('New hero')).toBeVisible();

    // Step 3: Enable grid
    await page.getByRole('button', { name: /toggle grid/i }).click();
    await expect(page.locator('.grid-overlay')).toBeVisible();

    // Step 4: Test responsive design
    await page.getByRole('combobox', { name: /viewport/i }).selectOption('Mobile');
    await expect(page.getByText('Mobile')).toBeVisible();

    // Step 5: Test zoom functionality
    await page.getByRole('button', { name: 'Zoom in' }).click();
    await expect(page.getByText(/125%|150%/)).toBeVisible();

    // Step 6: Save project
    await page.keyboard.press('Control+s');
    // Verify save indication
  });

  test('keyboard shortcuts work correctly', async ({ page }) => {
    await expect(page.getByText('Eternal UI')).toBeVisible();

    // Test mode switching shortcuts
    await page.keyboard.press('Control+1');
    await expect(page.getByRole('button', { name: 'Visual' })).toHaveAttribute('aria-pressed', 'true');

    await page.keyboard.press('Control+2');
    await expect(page.getByRole('button', { name: 'Grid' })).toHaveAttribute('aria-pressed', 'true');

    // Test zoom shortcuts
    await page.keyboard.press('Control+Equal');
    await expect(page.getByText(/125%|150%/)).toBeVisible();

    await page.keyboard.press('Control+Minus');
    await expect(page.getByText(/75%|100%/)).toBeVisible();
  });

  test('drag and drop functionality', async ({ page }) => {
    await expect(page.getByText('Eternal UI')).toBeVisible();

    // Enable component library
    if (!(await page.getByText('Components').isVisible())) {
      await page.getByRole('button', { name: /toggle.*library/i }).click();
    }

    // Test dragging from component library
    const buttonComponent = page.getByText('Button', { exact: true });
    const canvas = page.getByRole('region', { name: /canvas/i });
    
    await buttonComponent.dragTo(canvas, {
      targetPosition: { x: 100, y: 100 }
    });

    await expect(canvas.getByText('New button')).toBeVisible();
  });
});

// Performance testing
test.describe('Builder Performance', () => {
  test('loads within performance budget', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/builder');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Ready')).toBeVisible();
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000); // 3 second budget
  });

  test('handles large projects efficiently', async ({ page }) => {
    await page.goto('/builder');
    await expect(page.getByText('Eternal UI')).toBeVisible();

    // Add many components
    for (let i = 0; i < 20; i++) {
      await page.getByText('Button').dragTo(page.getByRole('region', { name: /canvas/i }), {
        targetPosition: { x: 100 + (i * 50), y: 100 + (i * 30) }
      });
    }

    // Verify performance doesn't degrade
    const zoomButton = page.getByRole('button', { name: 'Zoom in' });
    await expect(zoomButton).toBeEnabled();
    await zoomButton.click();
    
    // Should still be responsive
    await expect(page.getByText(/125%/)).toBeVisible({ timeout: 1000 });
  });
});
