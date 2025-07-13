import { axe, toHaveNoViolations } from 'jest-axe'
import { render } from '@testing-library/react'
import ExportDemoPage from '../app/export-demo/page'

expect.extend(toHaveNoViolations)

describe('Export Demo Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<ExportDemoPage />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})