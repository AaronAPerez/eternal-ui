// src/components/ui/Button/__tests__/Button.test.tsx
/**
 * 🧪 BUTTON COMPONENT TESTS
 * 
 * Comprehensive test suite covering:
 * - Rendering variants
 * - Accessibility features
 * - User interactions
 * - Loading states
 * - Error conditions
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Button } from '../Button'
import { Download } from 'lucide-react'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

describe('Button Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('bg-primary') // Default variant
    })

    it('renders all variants correctly', () => {
      const variants = ['primary', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const
      
      variants.forEach(variant => {
        const { unmount } = render(<Button variant={variant}>Test</Button>)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        unmount()
      })
    })

    it('renders all sizes correctly', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
      
      sizes.forEach(size => {
        const { unmount } = render(<Button size={size}>Test</Button>)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        unmount()
      })
    })

    it('renders with icon', () => {
      render(
        <Button icon={<Download data-testid="download-icon" />}>
          Download
        </Button>
      )
      
      expect(screen.getByTestId('download-icon')).toBeInTheDocument()
      expect(screen.getByRole('button')).toHaveTextContent('Download')
    })
  })

  // Accessibility tests
  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Button>Accessible Button</Button>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      
      render(<Button onClick={handleClick}>Keyboard Test</Button>)
      const button = screen.getByRole('button')
      
      // Focus with Tab
      await user.tab()
      expect(button).toHaveFocus()
      
      // Activate with Enter
      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)
      
      // Activate with Space
      await user.keyboard(' ')
      expect(handleClick).toHaveBeenCalledTimes(2)
    })

    it('has proper ARIA attributes', () => {
      render(
        <Button
          aria-label="Custom label"
          aria-describedby="description"
          disabled
        >
          Test
        </Button>
      )
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Custom label')
      expect(button).toHaveAttribute('aria-describedby', 'description')
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })

    it('announces loading state to screen readers', () => {
      render(<Button loading>Loading Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-busy', 'true')
    })
  })

  // Interaction tests
  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      
      render(<Button onClick={handleClick}>Click me</Button>)
      await user.click(screen.getByRole('button'))
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      
      render(<Button onClick={handleClick} disabled>Disabled</Button>)
      const button = screen.getByRole('button')
      
      await user.click(button)
      expect(handleClick).not.toHaveBeenCalled()
      expect(button).toBeDisabled()
    })

    it('does not call onClick when loading', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      
      render(<Button onClick={handleClick} loading>Loading</Button>)
      const button = screen.getByRole('button')
      
      await user.click(button)
      expect(handleClick).not.toHaveBeenCalled()
      expect(button).toBeDisabled()
    })
  })

  // Loading state tests
  describe('Loading State', () => {
    it('shows loading spinner when loading', () => {
      render(<Button loading data-testid="loading-button">Save</Button>)
      
      const spinner = screen.getByTestId('loading-button-loading-spinner')
      expect(spinner).toBeInTheDocument()
      expect(spinner).toHaveClass('animate-spin')
    })

    it('shows custom loading text', () => {
      render(
        <Button loading loadingText="Saving...">
          Save
        </Button>
      )
      
      expect(screen.getByText('Saving...')).toBeInTheDocument()
    })

    it('hides icon when loading', () => {
      render(
        <Button 
          loading 
          icon={<Download data-testid="download-icon" />}
          data-testid="button"
        >
          Download
        </Button>
      )
      
      expect(screen.queryByTestId('download-icon')).not.toBeInTheDocument()
      expect(screen.getByTestId('button-loading-spinner')).toBeInTheDocument()
    })
  })

  // Composition tests
  describe('Composition', () => {
    it('renders as different element with asChild', () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      )
      
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/test')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>()
      render(<Button ref={ref}>Ref Test</Button>)
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  // Visual effects tests
  describe('Visual Effects', () => {
    it('applies glow effect', () => {
      render(<Button glow>Glowing Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('shadow-lg', 'shadow-primary/25')
    })

    it('applies floating effect', () => {
      render(<Button floating>Floating Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('hover:-translate-y-1')
    })

    it('applies full width styling', () => {
      render(<Button fullWidth>Full Width</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('w-full')
    })
  })
})
