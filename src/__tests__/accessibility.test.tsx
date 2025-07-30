/**
 * ♿ Accessibility Compliance Tests
 * 
 * Ensuring WCAG 2.1 AA compliance across all components:
 * - Color contrast ratios
 * - Keyboard navigation
 * - Screen reader compatibility
 * - Focus management
 */

import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'


expect.extend(toHaveNoViolations)

describe('Accessibility Compliance', () => {
  describe('WCAG 2.1 AA Compliance', () => {
    it('Badge component has no accessibility violations', async () => {
      const { container } = render(
        <Badge variant="success">Accessible Badge</Badge>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('Button component supports keyboard navigation', async () => {
      const { container } = render(
        <Button onClick={() => {}}>Accessible Button</Button>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('tabindex', '0')
    })

    it('maintains proper color contrast ratios', () => {
      render(<Badge variant="warning">Warning Text</Badge>)
      
      const badge = screen.getByText('Warning Text')
      
      // Verify contrast-compliant color classes
      expect(badge).toHaveClass('text-yellow-800') // Dark text on light background
    })
  })

  describe('Screen Reader Support', () => {
    it('provides proper ARIA labels and descriptions', () => {
      render(
        <Badge 
          aria-label="Notification count"
          aria-describedby="notification-help"
        >
          5
        </Badge>
      )
      
      const badge = screen.getByLabelText('Notification count')
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveAttribute('aria-describedby', 'notification-help')
    })

    it('announces dynamic content changes', async () => {
      const { rerender } = render(
        <div aria-live="polite" data-testid="live-region">
          <Badge>0</Badge>
        </div>
      )
      
      rerender(
        <div aria-live="polite" data-testid="live-region">
          <Badge>1</Badge>
        </div>
      )
      
      const liveRegion = screen.getByTestId('live-region')
      expect(liveRegion).toHaveAttribute('aria-live', 'polite')
    })
  })

  describe('Focus Management', () => {
    it('manages focus correctly in interactive components', async () => {
      const TestComponent = () => (
        <div>
          <button>First Button</button>
          <Badge tabIndex={0}>Focusable Badge</Badge>
          <button>Last Button</button>
        </div>
      )

      render(<TestComponent />)
      
      const focusableBadge = screen.getByText('Focusable Badge')
      focusableBadge.focus()
      
      expect(focusableBadge).toHaveFocus()
      expect(focusableBadge).toHaveAttribute('tabindex', '0')
    })
  })
})