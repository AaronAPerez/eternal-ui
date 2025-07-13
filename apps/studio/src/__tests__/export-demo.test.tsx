import { render, screen } from '@testing-library/react'
import ExportDemoPage from '../app/export-demo/page'

describe('Export Demo Page', () => {
  it('renders the export demo interface', () => {
    render(<ExportDemoPage />)
    expect(screen.getByText('Export Demo')).toBeInTheDocument()
  })
})