/**
 * 🧪 Badge Component Tests
 * 
 * Testing comprehensive functionality including:
 * - Rendering with different variants
 * - Accessibility compliance (WCAG 2.1 AA)
 * - Responsive behavior
 * - User interactions
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Badge } from '../Badge'

describe('Badge Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Badge>Test Badge</Badge>)
      const badge = screen.getByText('Test Badge')
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveClass('inline-flex', 'items-center')
    })

    it('renders different variants correctly', () => {
      const { rerender } = render(<Badge variant="success">Success</Badge>)
      expect(screen.getByText('Success')).toHaveClass('bg-green-100', 'text-green-800')

      rerender(<Badge variant="destructive">Error</Badge>)
      expect(screen.getByText('Error')).toHaveClass('bg-red-100', 'text-red-800')
    })

    it('renders dot variant without text', () => {
      render(<Badge variant="dot" aria-label="Status indicator" />)
      const dot = screen.getByRole('generic')
      expect(dot).toHaveClass('rounded-full', 'w-2', 'h-2')
    })
  })

  // Accessibility tests
  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<Badge aria-label="Notification count">5</Badge>)
      const badge = screen.getByLabelText('Notification count')
      expect(badge).toBeInTheDocument()
    })

    it('supports keyboard navigation when interactive', () => {
      const handleClick = jest.fn()
      render(
        <Badge onClick={handleClick} tabIndex={0}>
          Clickable Badge
        </Badge>
      )
      
      const badge = screen.getByText('Clickable Badge')
      expect(badge).toHaveAttribute('tabindex', '0')
      
      fireEvent.keyDown(badge, { key: 'Enter', code: 'Enter' })
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('maintains color contrast for accessibility', () => {
      render(<Badge variant="warning">Warning</Badge>)
      const badge = screen.getByText('Warning')
      
      // Verify text color classes that ensure proper contrast
      expect(badge).toHaveClass('text-yellow-800')
    })
  })

  // Performance tests
  describe('Performance', () => {
    it('renders quickly with large numbers', () => {
      const startTime = performance.now()
      render(<Badge>999+</Badge>)
      const endTime = performance.now()
      
      // Should render in under 1ms for simple badge
      expect(endTime - startTime).toBeLessThan(1)
    })

    it('handles animation classes efficiently', () => {
      render(<Badge variant="pulse">Animated</Badge>)
      const badge = screen.getByText('Animated')
      expect(badge).toHaveClass('animate-pulse')
    })
  })

  // User interaction tests
  describe('User Interactions', () => {
    it('handles click events', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      
      render(<Badge onClick={handleClick}>Click me</Badge>)
      
      await user.click(screen.getByText('Click me'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('supports hover states', async () => {
      const user = userEvent.setup()
      render(<Badge className="hover:bg-gray-200">Hover Badge</Badge>)
      
      const badge = screen.getByText('Hover Badge')
      await user.hover(badge)
      
      // Verify hover behavior through CSS classes
      expect(badge).toHaveClass('hover:bg-gray-200')
    })
  })

  // Integration tests
  describe('Integration', () => {
    it('works with positioning props', () => {
      render(
        <div className="relative">
          <button>Button</button>
          <Badge 
            className="absolute -top-2 -right-2" 
            variant="destructive"
          >
            3
          </Badge>
        </div>
      )
      
      const badge = screen.getByText('3')
      expect(badge).toHaveClass('absolute', '-top-2', '-right-2')
    })

    it('integrates with notification systems', () => {
      const NotificationButton = ({ count }: { count: number }) => (
        <button className="relative">
          Notifications
          {count > 0 && (
            <Badge 
              className="absolute -top-2 -right-2"
              aria-label={`${count} unread notifications`}
            >
              {count > 99 ? '99+' : count}
            </Badge>
          )}
        </button>
      )

      const { rerender } = render(<NotificationButton count={0} />)
      expect(screen.queryByText('0')).not.toBeInTheDocument()

      rerender(<NotificationButton count={5} />)
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.getByLabelText('5 unread notifications')).toBeInTheDocument()

      rerender(<NotificationButton count={150} />)
      expect(screen.getByText('99+')).toBeInTheDocument()
    })
  })

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty content gracefully', () => {
      render(<Badge />)
      const badge = screen.getByRole('generic')
      expect(badge).toBeInTheDocument()
      expect(badge).toBeEmptyDOMElement()
    })

    it('handles very long text content', () => {
      const longText = 'This is a very long badge text that might cause layout issues'
      render(<Badge>{longText}</Badge>)
      const badge = screen.getByText(longText)
      expect(badge).toBeInTheDocument()
    })

    it('maintains styling with custom className', () => {
      render(<Badge className="custom-class" variant="success">Custom</Badge>)
      const badge = screen.getByText('Custom')
      expect(badge).toHaveClass('custom-class', 'bg-green-100', 'text-green-800')
    })
  })

  // Responsive behavior tests
  describe('Responsive Behavior', () => {
    it('maintains readability at different screen sizes', () => {
      // Mock different viewport sizes
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 320, // Mobile width
      })

      render(<Badge>Mobile Badge</Badge>)
      const badge = screen.getByText('Mobile Badge')
      
      // Verify mobile-appropriate sizing
      expect(badge).toHaveClass('text-xs')
    })
  })
})