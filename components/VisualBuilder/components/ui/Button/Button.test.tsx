import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button Component', () => {
  // Basic rendering tests
  test('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  test('renders as link when href is provided', () => {
    render(<Button href="/test">Link Button</Button>)
    const link = screen.getByRole('link', { name: 'Link Button' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })

  // Variant tests
  test('applies variant styles correctly', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-destructive')
  })

  test('applies size styles correctly', () => {
    render(<Button size="lg">Large Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('h-10')
  })

  // State tests
  test('shows loading state correctly', () => {
    render(<Button isLoading loadingText="Saving...">Submit</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(screen.getByText('Saving...')).toBeInTheDocument()
    expect(button.querySelector('svg')).toHaveClass('animate-spin')
  })

  test('handles disabled state', () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:pointer-events-none')
  })

  // Interaction tests
  test('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('does not trigger click when disabled', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick} disabled>Disabled</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  test('does not trigger click when loading', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick} isLoading>Loading</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  // Icon tests
  test('renders icon correctly', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>
    render(
      <Button icon={<TestIcon />} iconPosition="left">
        With Icon
      </Button>
    )
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    expect(screen.getByText('With Icon')).toBeInTheDocument()
  })

  test('renders icon-only button', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>
    render(<Button size="icon" icon={<TestIcon />} />)
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveClass('h-9', 'w-9')
  })

  // Full width test
  test('applies full width correctly', () => {
    render(<Button fullWidth>Full Width</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('w-full')
  })

  // Animation test
  test('applies animation classes correctly', () => {
    render(<Button animation="glow">Glowing Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('hover:shadow-lg')
  })

  // Accessibility tests
  test('has proper focus management', () => {
    render(<Button>Focus Test</Button>)
    const button = screen.getByRole('button')
    
    button.focus()
    expect(button).toHaveFocus()
    expect(button).toHaveClass('focus-visible:outline-none')
  })

  test('announces loading state to screen readers', () => {
    render(<Button isLoading>Loading Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('disabled')
  })
})
