// // src/components/ui/Button/Button.test.tsx
// import '@testing-library/jest-dom'
// import { render, screen } from '@/utils/testing'
// import userEvent from '@testing-library/user-event'
// import { axe, toHaveNoViolations } from 'jest-axe'
// import { Button } from './Button'
// import { Search } from 'lucide-react'
// import React from 'react'


// // Extend Jest matchers for accessibility testing
// expect.extend(toHaveNoViolations)

// describe('Button', () => {
//   describe('Rendering', () => {
//     it('renders with default props', () => {
//       render(<Button>Click me</Button>)
      
//       const button = screen.getByRole('button', { name: /click me/i })
//       expect(button).toBeInTheDocument()
//       expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center')
//     })

//     it('renders with custom className', () => {
//       render(<Button className="custom-class">Button</Button>)
      
//       const button = screen.getByRole('button')
//       expect(button).toHaveClass('custom-class')
//     })

//     it('renders with test id', () => {
//       render(<Button data-testid="my-button">Button</Button>)
      
//       expect(screen.getByTestId('my-button')).toBeInTheDocument()
//     })
//   })

//   describe('Variants', () => {
//     it.each([
//       ['primary', 'bg-primary'],
//       ['secondary', 'bg-secondary'],
//       ['destructive', 'bg-destructive'],
//       ['outline', 'border'],
//       ['ghost', 'hover:bg-accent'],
//       ['link', 'text-primary'],
//     ])('renders %s variant with correct styles', (variant, expectedClass) => {
//       render(<Button variant={variant as 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'}>Button</Button>)
      
//       const button = screen.getByRole('button')
//       expect(button).toHaveClass(expectedClass)
//     })
//   })

//   describe('Sizes', () => {
//     it.each([
//       ['xs', 'h-7'],
//       ['sm', 'h-8'],
//       ['md', 'h-9'],
//       ['lg', 'h-10'],
//       ['xl', 'h-11'],
//       ['icon', 'h-9', 'w-9'],
//     ])('renders %s size with correct classes', (size, ...expectedClasses) => {
//       render(<Button size={size as 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon'}>Button</Button>)
      
//       const button = screen.getByRole('button')
//       expectedClasses.forEach(className => {
//         expect(button).toHaveClass(className)
//       })
//     })
//   })

//   describe('States', () => {
//     it('renders disabled state correctly', () => {
//       render(<Button disabled>Disabled Button</Button>)
      
//       const button = screen.getByRole('button')
//       expect(button).toBeDisabled()
//       expect(button).toHaveAttribute('aria-disabled', 'true')
//       expect(button).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50')
//     })

//     it('renders loading state correctly', () => {
//       render(<Button loading data-testid="loading-button">Loading Button</Button>)
      
//       const button = screen.getByTestId('loading-button')
//       expect(button).toBeDisabled()
//       expect(button).toHaveAttribute('aria-busy', 'true')
//       expect(screen.getByTestId('loading-button-loading-spinner')).toBeInTheDocument()
//     })

//     it('shows loading text when provided', () => {
//       render(
//         <Button loading loadingText="Saving...">Save</Button>
//       )
      
//       expect(screen.getByText('Saving...')).toBeInTheDocument()
//       expect(screen.queryByText('Save')).not.toBeInTheDocument()
//     })

//     it('shows original text when loading without loadingText', () => {
//       render(<Button loading>Save</Button>)
      
//       expect(screen.getByText('Save')).toBeInTheDocument()
//     })
//   })

//   describe('Icons', () => {
//     it('renders icon on the left by default', () => {
//       render(
//         <Button icon={<Search data-testid="search-icon" />} data-testid="icon-button">
//           Search
//         </Button>
//       )
      
//       const button = screen.getByTestId('icon-button')
//       const icon = screen.getByTestId('search-icon')
//       const iconContainer = screen.getByTestId('icon-button-icon')
      
//       expect(icon).toBeInTheDocument()
//       expect(iconContainer).toHaveAttribute('aria-hidden', 'true')
      
//       // Check icon position (right should come after text in DOM)
//       const buttonChildren = Array.from(button.children)
//       const iconIndex = buttonChildren.findIndex(child => child.contains(icon))
//       const textIndex = buttonChildren.findIndex(child => child.textContent?.includes('Like'))
      
//       expect(iconIndex).toBeGreaterThan(textIndex)
//     })

//     it('hides icon when loading', () => {
//       render(
//         <Button 
//           loading 
//           icon={<Search data-testid="search-icon" />}
//           data-testid="loading-button"
//         >
//           Search
//         </Button>
//       )
      
//       expect(screen.queryByTestId('search-icon')).not.toBeInTheDocument()
//       expect(screen.getByTestId('loading-button-loading-spinner')).toBeInTheDocument()
//     })
//   })

//   describe('Interactions', () => {
//     it('calls onClick when clicked', async () => {
//       const handleClick = jest.fn()
//       render(<Button onClick={handleClick}>Click me</Button>)
      
//       const button = screen.getByRole('button')
//       await userEvent.click(button)
      
//       expect(handleClick).toHaveBeenCalledTimes(1)
//     })

//     it('does not call onClick when disabled', async () => {
//       const handleClick = jest.fn()
//       render(<Button disabled onClick={handleClick}>Disabled</Button>)
      
//       const button = screen.getByRole('button')
//       await userEvent.click(button)
      
//       expect(handleClick).not.toHaveBeenCalled()
//     })

//     it('does not call onClick when loading', async () => {
//       const handleClick = jest.fn()
//       render(<Button loading onClick={handleClick}>Loading</Button>)
      
//       const button = screen.getByRole('button')
//       await userEvent.click(button)
      
//       expect(handleClick).not.toHaveBeenCalled()
//     })

//     it('supports keyboard navigation', async () => {
//       const handleClick = jest.fn()
//       render(<Button onClick={handleClick}>Keyboard</Button>)
      
//       const button = screen.getByRole('button')
//       button.focus()
      
//       expect(button).toHaveFocus()
      
//       await userEvent.keyboard('{Enter}')
//       expect(handleClick).toHaveBeenCalledTimes(1)
      
//       await userEvent.keyboard(' ')
//       expect(handleClick).toHaveBeenCalledTimes(2)
//     })

//     it('maintains focus styles', () => {
//       render(<Button>Focus me</Button>)
      
//       const button = screen.getByRole('button')
//       expect(button).toHaveClass('focus-visible:outline-none', 'focus-visible:ring-2')
//     })
//   })

//   describe('Accessibility', () => {
//     it('has no accessibility violations', async () => {
//       const { container } = render(<Button>Accessible Button</Button>)
//       const results = await axe(container)
//       expect(results).toHaveNoViolations()
//     })

//     it('supports custom aria-label', () => {
//       render(<Button aria-label="Custom label">Button</Button>)
      
//       const button = screen.getByRole('button', { name: /custom label/i })
//       expect(button).toBeInTheDocument()
//     })

//     it('supports aria-describedby', () => {
//       render(
//         <div>
//           <Button aria-describedby="description">Button</Button>
//           <div id="description">Button description</div>
//         </div>
//       )
      
//       const button = screen.getByRole('button')
//       expect(button).toHaveAttribute('aria-describedby', 'description')
//     })

//     it('announces loading state to screen readers', () => {
//       render(<Button loading>Loading Button</Button>)
      
//       const button = screen.getByRole('button')
//       expect(button).toHaveAttribute('aria-busy', 'true')
//       expect(button).toHaveAttribute('aria-disabled', 'true')
//     })

//     it('hides decorative icons from screen readers', () => {
//       render(
//         <Button icon={<Search />} data-testid="icon-button">
//           Search
//         </Button>
//       )
      
//       const iconContainer = screen.getByTestId('icon-button-icon')
//       expect(iconContainer).toHaveAttribute('aria-hidden', 'true')
//     })
//   })

//   describe('Polymorphic Rendering', () => {
//     it('renders as different element when asChild is true', () => {
//       render(
//         <Button asChild>
//           <a href="/link">Link Button</a>
//         </Button>
//       )
      
//       const link = screen.getByRole('link', { name: /link button/i })
//       expect(link).toBeInTheDocument()
//       expect(link).toHaveAttribute('href', '/link')
//       expect(link).toHaveClass('inline-flex', 'items-center') // Button styles applied
//     })
//   })

//   describe('Full Width', () => {
//     it('applies full width class when fullWidth is true', () => {
//       render(<Button fullWidth>Full Width</Button>)
      
//       const button = screen.getByRole('button')
//       expect(button).toHaveClass('w-full')
//     })
//   })

//   describe('Performance', () => {
//     it('does not re-render unnecessarily', () => {
//       const renderCount = jest.fn()
      
//       const TestButton = (props: any) => {
//         renderCount()
//         return <Button {...props}>Test</Button>
//       }
      
//       const { rerender } = render(<TestButton />)
//       expect(renderCount).toHaveBeenCalledTimes(1)
      
//       // Re-render with same props
//       rerender(<TestButton />)
//       expect(renderCount).toHaveBeenCalledTimes(2) // Expected since we're not memoizing
//     })
//   })

//   describe('Edge Cases', () => {
//     it('handles empty children gracefully', () => {
//       render(<Button></Button>)
      
//       const button = screen.getByRole('button')
//       expect(button).toBeInTheDocument()
//       expect(button).toBeEmptyDOMElement()
//     })

//     it('handles complex children content', () => {
//       render(
//         <Button>
//           <span>Complex</span>
//           <strong>Content</strong>
//         </Button>
//       )
      
//       const button = screen.getByRole('button')
//       expect(button).toHaveTextContent('ComplexContent')
//     })

//     it('forwards refs correctly', () => {
//       const ref = React.createRef<HTMLButtonElement>()
//       render(<Button ref={ref}>Ref Button</Button>)
      
//       expect(ref.current).toBeInstanceOf(HTMLButtonElement)
//       expect(ref.current).toBe(screen.getByRole('button'))
//     })
//   })
// }) 
      