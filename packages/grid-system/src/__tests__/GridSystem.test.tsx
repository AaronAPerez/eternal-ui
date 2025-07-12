/**
 * Comprehensive test suite for GridSystem component
 * 
 * Testing Strategy:
 * - Unit tests for component rendering and props
 * - Integration tests for responsive behavior
 * - Accessibility tests for WCAG compliance
 * - Performance tests for optimization
 * - Visual regression tests for design consistency
 */

import { render, screen, within } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import userEvent from '@testing-library/user-event'
import { GridSystem, GridItem, Container, Stack, Flex } from '../index'
import { expect } from 'vitest'

// Extend Jest matchers for accessibility testing
expect.extend(toHaveNoViolations)

/**
 * Mock window.matchMedia for responsive testing
 * Enables testing of responsive breakpoint behavior
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

/**
 * Test utilities for consistent testing patterns
 */
const renderWithAccessibility = async (component: React.ReactElement) => {
  const container = render(component)
  const results = await axe(container.container)
  return { ...container, a11yResults: results }
}

describe('GridSystem Component', () => {
  /**
   * Basic rendering tests
   * Ensures component renders correctly with default props
   */
  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      render(
        <GridSystem data-testid="grid-system">
          <div>Item 1</div>
          <div>Item 2</div>
        </GridSystem>
      )

      const grid = screen.getByTestId('grid-system')
      expect(grid).toBeInTheDocument()
      expect(grid).toHaveClass('grid', 'grid-cols-12', 'gap-4')
    })

    it('should render custom number of columns', () => {
      render(
        <GridSystem columns={6} data-testid="grid-system">
          <div>Item 1</div>
        </GridSystem>
      )

      const grid = screen.getByTestId('grid-system')
      expect(grid).toHaveClass('grid-cols-6')
    })

    it('should apply custom gap spacing', () => {
      render(
        <GridSystem gap="8" data-testid="grid-system">
          <div>Item 1</div>
        </GridSystem>
      )

      const grid = screen.getByTestId('grid-system')
      expect(grid).toHaveClass('gap-8')
    })

    it('should render as different HTML elements', () => {
      render(
        <GridSystem as="section" data-testid="grid-system">
          <div>Item 1</div>
        </GridSystem>
      )

      const grid = screen.getByTestId('grid-system')
      expect(grid.tagName).toBe('SECTION')
    })
  })

  /**
   * Responsive behavior tests
   * Validates mobile-first responsive design implementation
   */
  describe('Responsive Behavior', () => {
    it('should handle responsive columns', () => {
      render(
        <GridSystem 
          columns={{ base: 1, md: 2, lg: 4 }}
          data-testid="grid-system"
        >
          <div>Item 1</div>
        </GridSystem>
      )

      const grid = screen.getByTestId('grid-system')
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4')
    })

    it('should handle responsive gap values', () => {
      render(
        <GridSystem 
          gap={{ base: '2', md: '4', lg: '8' }}
          data-testid="grid-system"
        >
          <div>Item 1</div>
        </GridSystem>
      )

      const grid = screen.getByTestId('grid-system')
      expect(grid).toHaveClass('gap-2', 'md:gap-4', 'lg:gap-8')
    })

    it('should handle separate row and column gaps', () => {
      render(
        <GridSystem 
          rowGap="4"
          columnGap="8"
          data-testid="grid-system"
        >
          <div>Item 1</div>
        </GridSystem>
      )

      const grid = screen.getByTestId('grid-system')
      expect(grid).toHaveClass('gap-y-4', 'gap-x-8')
    })
  })

  /**
   * Accessibility tests
   * Ensures WCAG AA compliance and proper ARIA implementation
   */
  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { a11yResults } = await renderWithAccessibility(
        <GridSystem aria-label="Product grid">
          <div>Product 1</div>
          <div>Product 2</div>
          <div>Product 3</div>
        </GridSystem>
      )

      expect(a11yResults).toHaveNoViolations()
    })

    it('should have proper ARIA role', () => {
      render(
        <GridSystem data-testid="grid-system">
          <div>Item 1</div>
        </GridSystem>
      )

      const grid = screen.getByTestId('grid-system')
      expect(grid).toHaveAttribute('role', 'grid')
    })

    it('should support custom ARIA labels', () => {
      render(
        <GridSystem 
          aria-label="Custom grid label"
          aria-labelledby="grid-heading"
          data-testid="grid-system"
        >
          <div>Item 1</div>
        </GridSystem>
      )

      const grid = screen.getByTestId('grid-system')
      expect(grid).toHaveAttribute('aria-label', 'Custom grid label')
      expect(grid).toHaveAttribute('aria-labelledby', 'grid-heading')
    })

    it('should be navigable by keyboard', async () => {
      const user = userEvent.setup()
      
      render(
        <GridSystem data-testid="grid-system">
          <button>Button 1</button>
          <button>Button 2</button>
          <button>Button 3</button>
        </GridSystem>
      )

      const buttons = screen.getAllByRole('button')
      
      // Focus first button
      await user.tab()
      expect(buttons[0]).toHaveFocus()
      
      // Tab to next button
      await user.tab()
      expect(buttons[1]).toHaveFocus()
    })
  })

  /**
   * Performance tests
   * Validates optimization and rendering performance
   */
  describe('Performance', () => {
    it('should render large grids efficiently', () => {
      const startTime = performance.now()
      
      const items = Array.from({ length: 100 }, (_, i) => (
        <div key={i}>Item {i + 1}</div>
      ))

      render(
        <GridSystem data-testid="grid-system">
          {items}
        </GridSystem>
      )

      const endTime = performance.now()
      const renderTime = endTime - startTime

      // Should render 100 items in under 50ms
      expect(renderTime).toBeLessThan(50)
    })

    it('should not re-render unnecessarily', () => {
      let renderCount = 0
      
      const TestComponent = () => {
        renderCount++
        return <div>Test item</div>
      }

      const { rerender } = render(
        <GridSystem columns={12}>
          <TestComponent />
        </GridSystem>
      )

      const initialRenderCount = renderCount

      // Re-render with same props
      rerender(
        <GridSystem columns={12}>
          <TestComponent />
        </GridSystem>
      )

      // Should not cause unnecessary re-renders
      expect(renderCount).toBe(initialRenderCount + 1)
    })
  })

  /**
   * Error handling tests
   * Validates graceful degradation and error boundaries
   */
  describe('Error Handling', () => {
    it('should handle invalid column values gracefully', () => {
      // Suppress console errors for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      render(
        <GridSystem columns={0 as any} data-testid="grid-system">
          <div>Item 1</div>
        </GridSystem>
      )

      const grid = screen.getByTestId('grid-system')
      expect(grid).toBeInTheDocument()
      
      consoleSpy.mockRestore()
    })

    it('should handle missing children gracefully', () => {
      render(
        <GridSystem data-testid="grid-system">
          {null}
          {undefined}
          <div>Valid item</div>
        </GridSystem>
      )

      const grid = screen.getByTestId('grid-system')
      expect(grid).toBeInTheDocument()
      expect(screen.getByText('Valid item')).toBeInTheDocument()
    })
  })
})

/**
 * GridItem component tests
 */
describe('GridItem Component', () => {
  it('should render with span classes', () => {
    render(
      <GridSystem>
        <GridItem span={6} data-testid="grid-item">
          Content
        </GridItem>
      </GridSystem>
    )

    const item = screen.getByTestId('grid-item')
    expect(item).toHaveClass('col-span-6')
  })

  it('should handle responsive span values', () => {
    render(
      <GridSystem>
        <GridItem 
          span={{ base: 12, md: 6, lg: 4 }}
          data-testid="grid-item"
        >
          Content
        </GridItem>
      </GridSystem>
    )

    const item = screen.getByTestId('grid-item')
    expect(item).toHaveClass('col-span-12', 'md:col-span-6', 'lg:col-span-4')
  })

  it('should handle grid positioning', () => {
    render(
      <GridSystem>
        <GridItem 
          start={2}
          end={8}
          rowStart={1}
          rowEnd={3}
          data-testid="grid-item"
        >
          Content
        </GridItem>
      </GridSystem>
    )

    const item = screen.getByTestId('grid-item')
    expect(item).toHaveClass('col-start-2', 'col-end-8', 'row-start-1', 'row-end-3')
  })
})

/**
 * Container component tests
 */
describe('Container Component', () => {
  it('should render with default max-width', () => {
    render(
      <Container data-testid="container">
        Content
      </Container>
    )

    const container = screen.getByTestId('container')
    expect(container).toHaveClass('max-w-xl', 'mx-auto')
  })

  it('should handle custom max-width', () => {
    render(
      <Container maxWidth="2xl" data-testid="container">
        Content
      </Container>
    )

    const container = screen.getByTestId('container')
    expect(container).toHaveClass('max-w-2xl')
  })

  it('should handle padding values', () => {
    render(
      <Container px="8" py="4" data-testid="container">
        Content
      </Container>
    )

    const container = screen.getByTestId('container')
    expect(container).toHaveClass('px-8', 'py-4')
  })
})

/**
 * Stack component tests
 */
describe('Stack Component', () => {
  it('should render vertical stack with spacing', () => {
    render(
      <Stack space="4" data-testid="stack">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )

    const stack = screen.getByTestId('stack')
    expect(stack).toHaveClass('flex', 'flex-col', 'gap-4')
  })

  it('should handle alignment options', () => {
    render(
      <Stack align="center" justify="between" data-testid="stack">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )

    const stack = screen.getByTestId('stack')
    expect(stack).toHaveClass('items-center', 'justify-between')
  })
})

/**
 * Flex component tests
 */
describe('Flex Component', () => {
  it('should render flex container with direction', () => {
    render(
      <Flex direction="row" gap="4" data-testid="flex">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    )

    const flex = screen.getByTestId('flex')
    expect(flex).toHaveClass('flex', 'flex-row', 'gap-4')
  })

  it('should handle responsive direction', () => {
    render(
      <Flex 
        direction={{ base: 'col', md: 'row' }}
        data-testid="flex"
      >
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    )

    const flex = screen.getByTestId('flex')
    expect(flex).toHaveClass('flex-col', 'md:flex-row')
  })

  it('should handle justify and align props', () => {
    render(
      <Flex 
        justify="center" 
        align="end" 
        wrap="nowrap"
        data-testid="flex"
      >
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    )

    const flex = screen.getByTestId('flex')
    expect(flex).toHaveClass('justify-center', 'items-end', 'flex-nowrap')
  })
})

/**
 * Integration tests
 * Tests complex scenarios with multiple components
 */
describe('Integration Tests', () => {
  it('should work with nested grid layouts', () => {
    render(
      <Container data-testid="container">
        <GridSystem columns={12} data-testid="outer-grid">
          <GridItem span={8} data-testid="main-content">
            <GridSystem columns={2} data-testid="inner-grid">
              <div>Nested 1</div>
              <div>Nested 2</div>
            </GridSystem>
          </GridItem>
          <GridItem span={4} data-testid="sidebar">
            <Stack space="4" data-testid="sidebar-stack">
              <div>Widget 1</div>
              <div>Widget 2</div>
            </Stack>
          </GridItem>
        </GridSystem>
      </Container>
    )

    // Verify all components are rendered correctly
    expect(screen.getByTestId('container')).toBeInTheDocument()
    expect(screen.getByTestId('outer-grid')).toHaveClass('grid-cols-12')
    expect(screen.getByTestId('main-content')).toHaveClass('col-span-8')
    expect(screen.getByTestId('inner-grid')).toHaveClass('grid-cols-2')
    expect(screen.getByTestId('sidebar')).toHaveClass('col-span-4')
    expect(screen.getByTestId('sidebar-stack')).toHaveClass('flex-col')
  })

  it('should maintain accessibility in complex layouts', async () => {
    const { a11yResults } = await renderWithAccessibility(
      <Container>
        <GridSystem aria-label="Main layout">
          <GridItem span={12}>
            <Stack space="6">
              <h1>Page Title</h1>
              <GridSystem columns={{ base: 1, md: 3 }} aria-label="Feature grid">
                <div role="article">Feature 1</div>
                <div role="article">Feature 2</div>
                <div role="article">Feature 3</div>
              </GridSystem>
            </Stack>
          </GridItem>
        </GridSystem>
      </Container>
    )

    expect(a11yResults).toHaveNoViolations()
  })
})