const a11ySetup = `
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { configureAxe } from 'jest-axe'

// Configure axe for accessibility testing
const axe = configureAxe({
  rules: {
    // Disable color-contrast rule for testing (we test this separately)
    'color-contrast': { enabled: false },
  },
})

// Make axe available globally
global.axe = axe

// Mock ResizeObserver for a11y tests
global.ResizeObserver = vi.fn().mockImplementation((callback) => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
`