const a11yTestConfig = `
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup-a11y.ts'],
    include: ['src/**/*.a11y.{test,spec}.{js,ts,jsx,tsx}'],
    testTimeout: 10000,
  },
})
`