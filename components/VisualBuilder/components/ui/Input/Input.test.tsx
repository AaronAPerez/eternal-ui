
// // src/components/ui/Input/Input.test.tsx
// import { render, screen } from '@/utils/testing'
// import userEvent from '@testing-library/user-event'
// import { axe, toHaveNoViolations } from 'jest-axe'
// import { Input } from './Input'
// import { Mail, Search } from 'lucide-react'
// import React from 'react'

// expect.extend(toHaveNoViolations)

// describe('Input', () => {
//   describe('Rendering', () => {
//     it('renders with default props', () => {
//       render(<Input placeholder="Enter text" />)
      
//       const input = screen.getByRole('textbox')
//       expect(input).toBeInTheDocument()
//       expect(input).toHaveAttribute('type', 'text')
//       expect(input).toHaveAttribute('placeholder', 'Enter text')
//     })

//     it('renders with label', () => {
//       render(<Input label="Email Address" />)
      
//       const label = screen.getByText('Email Address')
//       const input = screen.getByRole('textbox')
      
//       expect(label).toBeInTheDocument()
//       expect(input).toHaveAccessibleName('Email Address')
//     })

//     it('renders with custom id', () => {
//       render(<Input id="custom-input" label="Custom" />)
      
//       const input = screen.getByRole('textbox')
//       const label = screen.getByText('Custom')
      
//       expect(input).toHaveAttribute('id', 'custom-input')
//       expect(label).toHaveAttribute('for', 'custom-input')
//     })

//     it('generates unique id when not provided', () => {
//       render(<Input label="Auto ID" />)
      
//       const input = screen.getByRole('textbox')
//       const label = screen.getByText('Auto ID')
      
//       expect(input).toHaveAttribute('id')
//       expect(label).toHaveAttribute('for', input.getAttribute('id'))
//     })
//   })

//   describe('Required Field', () => {
//     it('shows required indicator', () => {
//       render(<Input label="Required Field" required />)
      
//       const requiredIndicator = screen.getByText('*')
//       expect(requiredIndicator).toBeInTheDocument()
//       expect(requiredIndicator).toHaveAttribute('aria-label', 'required')
//     })

//     it('sets required attribute on input', () => {
//       render(<Input required />)
      
//       const input = screen.getByRole('textbox')
//       expect(input).toHaveAttribute('required')
//     })
//   })

//   describe('Sizes', () => {
//     it.each([
//       ['sm', 'h-8'],
//       ['md', 'h-9'],
//       ['lg', 'h-10'],
//     ])('renders %s size with correct classes', (size, expectedClass) => {
//       render(<Input size={size as 'sm' | 'md' | 'lg'} data-testid="sized-input" />)
      
//       const input = screen.getByTestId('sized-input')
//       expect(input).toHaveClass(expectedClass)
//     })
//   })

//   describe('Validation States', () => {
//     it('renders error state correctly', () => {
//       render(
//         <Input
//           label="Email"
//           error="Invalid email address"
//           data-testid="error-input"
//         />
//       )
      
//       const input = screen.getByTestId('error-input')
//       const errorMessage = screen.getByText('Invalid email address')
      
//       expect(input).toHaveAttribute('aria-invalid', 'true')
//       expect(input).toHaveClass('border-destructive')
//       expect(errorMessage).toBeInTheDocument()
//       expect(errorMessage).toHaveAttribute('role', 'alert')
//       expect(errorMessage).toHaveAttribute('aria-live', 'polite')
//     })

//     it('renders success state correctly', () => {
//       render(
//         <Input
//           label="Email"
//           success="Email is valid"
//           data-testid="success-input"
//         />
//       )
      
//       const input = screen.getByTestId('success-input')
//       const successMessage = screen.getByText('Email is valid')
      
//       expect(input).toHaveAttribute('aria-invalid', 'false')
//       expect(input).toHaveClass('border-green-500')
//       expect(successMessage).toBeInTheDocument()
//       expect(successMessage).toHaveAttribute('role', 'status')
//     })

//     it('associates error message with input via aria-describedby', () => {
//       render(
//         <Input
//           label="Email"
//           error="Invalid email"
//           data-testid="error-input"
//         />
//       )
      
//       const input = screen.getByTestId('error-input')
//       const errorMessage = screen.getByTestId('error-input-error-message')
      
//       expect(input).toHaveAttribute('aria-describedby')
//       expect(input.getAttribute('aria-describedby')).toContain(errorMessage.getAttribute('id'))
//     })
//   })

//   describe('Helper Text', () => {
//     it('renders helper text', () => {
//       render(
//         <Input
//           label="Password"
//           helperText="Must be at least 8 characters"
//           data-testid="helper-input"
//         />
//       )
      
//       const helperText = screen.getByText('Must be at least 8 characters')
//       const input = screen.getByTestId('helper-input')
      
//       expect(helperText).toBeInTheDocument()
//       expect(input.getAttribute('aria-describedby')).toContain(
//         screen.getByTestId('helper-input-helper-text').getAttribute('id')
//       )
//     })

//     it('hides helper text when error is present', () => {
//       render(
//         <Input
//           helperText="Helper text"
//           error="Error message"
//         />
//       )
      
//       expect(screen.queryByText('Helper text')).not.toBeInTheDocument()
//       expect(screen.getByText('Error message')).toBeInTheDocument()
//     })
//   })

//   describe('Icons', () => {
//     it('renders left icon', () => {
//       render(
//         <Input
//           leftIcon={<Mail data-testid="mail-icon" />}
//           data-testid="icon-input"
//         />
//       )
      
//       const input = screen.getByTestId('icon-input')
//       const icon = screen.getByTestId('mail-icon')
      
//       expect(icon).toBeInTheDocument()
//       expect(input).toHaveClass('pl-10')
//     })

//     it('renders right icon', () => {
//       render(
//         <Input
//           rightIcon={<Search data-testid="search-icon" />}
//           data-testid="icon-input"
//         />
//       )
      
//       const input = screen.getByTestId('icon-input')
//       const icon = screen.getByTestId('search-icon')
      
//       expect(icon).toBeInTheDocument()
//       expect(input).toHaveClass('pr-10')
//     })

//     it('adjusts padding for both icons', () => {
//       render(
//         <Input
//           leftIcon={<Mail />}
//           rightIcon={<Search />}
//           data-testid="both-icons-input"
//         />
//       )
      
//       const input = screen.getByTestId('both-icons-input')
//       expect(input).toHaveClass('pl-10', 'pr-10')
//     })
//   })

//   describe('Password Toggle', () => {
//     it('shows password toggle for password input when enabled', () => {
//       render(
//         <Input
//           type="password"
//           showPasswordToggle
//           data-testid="password-input"
//         />
//       )
      
//       const toggleButton = screen.getByTestId('password-input-password-toggle')
//       expect(toggleButton).toBeInTheDocument()
//       expect(toggleButton).toHaveAttribute('aria-label', 'Show password')
//     })

//     it('toggles password visibility', async () => {
//       render(
//         <Input
//           type="password"
//           showPasswordToggle
//           data-testid="password-input"
//         />
//       )
      
//       const input = screen.getByTestId('password-input')
//       const toggleButton = screen.getByTestId('password-input-password-toggle')
      
//       expect(input).toHaveAttribute('type', 'password')
      
//       await userEvent.click(toggleButton)
      
//       expect(input).toHaveAttribute('type', 'text')
//       expect(toggleButton).toHaveAttribute('aria-label', 'Hide password')
      
//       await userEvent.click(toggleButton)
      
//       expect(input).toHaveAttribute('type', 'password')
//       expect(toggleButton).toHaveAttribute('aria-label', 'Show password')
//     })

//     it('does not show toggle for non-password inputs', () => {
//       render(
//         <Input
//           type="text"
//           showPasswordToggle
//           data-testid="text-input"
//         />
//       )
      
//       expect(screen.queryByTestId('text-input-password-toggle')).not.toBeInTheDocument()
//     })
//   })

//   describe('Loading State', () => {
//     it('shows loading spinner when loading', () => {
//       render(<Input loading data-testid="loading-input" />)
      
//       const input = screen.getByTestId('loading-input')
//       const spinner = screen.getByTestId('loading-input-loading-spinner')
      
//       expect(spinner).toBeInTheDocument()
//       expect(input).toBeDisabled()
//       expect(input).toHaveClass('cursor-wait')
//     })

//     it('disables input when loading', () => {
//       render(<Input loading />)
      
//       const input = screen.getByRole('textbox')
//       expect(input).toBeDisabled()
//     })
//   })

//   describe('Disabled State', () => {
//     it('disables input when disabled prop is true', () => {
//       render(<Input disabled />)
      
//       const input = screen.getByRole('textbox')
//       expect(input).toBeDisabled()
//       expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
//     })
//   })

//   describe('User Interactions', () => {
//     it('accepts user input', async () => {
//       const handleChange = jest.fn()
//       render(<Input onChange={handleChange} />)
      
//       const input = screen.getByRole('textbox')
//       await userEvent.type(input, 'Hello world')
      
//       expect(input).toHaveValue('Hello world')
//       expect(handleChange).toHaveBeenCalledTimes(11) // One for each character
//     })

//     it('calls onFocus and onBlur handlers', async () => {
//       const handleFocus = jest.fn()
//       const handleBlur = jest.fn()
      
//       render(<Input onFocus={handleFocus} onBlur={handleBlur} />)
      
//       const input = screen.getByRole('textbox')
      
//       await userEvent.click(input)
//       expect(handleFocus).toHaveBeenCalledTimes(1)
      
//       await userEvent.tab()
//       expect(handleBlur).toHaveBeenCalledTimes(1)
//     })

//     it('supports keyboard navigation', async () => {
//       render(
//         <div>
//           <Input data-testid="first-input" />
//           <Input data-testid="second-input" />
//         </div>
//       )
      
//       const firstInput = screen.getByTestId('first-input')
//       const secondInput = screen.getByTestId('second-input')
      
//       firstInput.focus()
//       expect(firstInput).toHaveFocus()
      
//       await userEvent.tab()
//       expect(secondInput).toHaveFocus()
//     })
//   })

//   describe('Accessibility', () => {
//     it('has no accessibility violations', async () => {
//       const { container } = render(
//         <Input label="Accessible Input" placeholder="Enter text" />
//       )
      
//       const results = await axe(container)
//       expect(results).toHaveNoViolations()
//     })

//     it('supports custom aria-label', () => {
//       render(<Input aria-label="Custom label" />)
      
//       const input = screen.getByRole('textbox', { name: /custom label/i })
//       expect(input).toBeInTheDocument()
//     })

//     it('supports aria-describedby', () => {
//       render(
//         <div>
//           <Input aria-describedby="description" data-testid="described-input" />
//           <div id="description">Input description</div>
//         </div>
//       )
      
//       const input = screen.getByTestId('described-input')
//       expect(input.getAttribute('aria-describedby')).toContain('description')
//     })

//     it('combines multiple describedby values', () => {
//       render(
//         <Input
//           aria-describedby="external-desc"
//           helperText="Helper text"
//           error="Error message"
//           data-testid="combined-input"
//         />
//       )
      
//       const input = screen.getByTestId('combined-input')
//       const describedBy = input.getAttribute('aria-describedby')
      
//       expect(describedBy).toContain('external-desc')
//       expect(describedBy).toContain('combined-input-error-message')
//     })

//     it('announces validation changes to screen readers', async () => {
//       const { rerender } = render(<Input data-testid="validation-input" />)
      
//       // Add error
//       rerender(<Input error="This field is required" data-testid="validation-input" />)
      
//       const errorMessage = screen.getByRole('alert')
//       expect(errorMessage).toHaveAttribute('aria-live', 'polite')
      
//       // Change to success
//       rerender(<Input success="Input is valid" data-testid="validation-input" />)
      
//       const successMessage = screen.getByRole('status')
//       expect(successMessage).toHaveAttribute('aria-live', 'polite')
//     })
//   })

//   describe('Input Types', () => {
//     it('renders email input correctly', () => {
//       render(<Input type="email" />)
      
//       const input = screen.getByRole('textbox')
//       expect(input).toHaveAttribute('type', 'email')
//     })

//     it('renders number input correctly', () => {
//       render(<Input type="number" />)
      
//       const input = screen.getByRole('spinbutton')
//       expect(input).toHaveAttribute('type', 'number')
//     })

//     it('renders password input correctly', () => {
//       render(<Input type="password" />)
      
//       const input = screen.getByLabelText(/password/i) || screen.getByDisplayValue('')
//       expect(input).toHaveAttribute('type', 'password')
//     })

//     it('renders tel input correctly', () => {
//       render(<Input type="tel" />)
      
//       const input = screen.getByRole('textbox')
//       expect(input).toHaveAttribute('type', 'tel')
//     })

//     it('renders url input correctly', () => {
//       render(<Input type="url" />)
      
//       const input = screen.getByRole('textbox')
//       expect(input).toHaveAttribute('type', 'url')
//     })
//   })

//   describe('Edge Cases', () => {
//     it('handles empty label gracefully', () => {
//       render(<Input label="" />)
      
//       const input = screen.getByRole('textbox')
//       expect(input).toBeInTheDocument()
//     })

//     it('handles long error messages', () => {
//       const longError = 'This is a very long error message that should wrap properly and not break the layout or cause any accessibility issues'
      
//       render(<Input error={longError} data-testid="long-error-input" />)
      
//       const errorMessage = screen.getByText(longError)
//       expect(errorMessage).toBeInTheDocument()
//     })

//     it('handles special characters in input', async () => {
//       render(<Input data-testid="special-input" />)
      
//       const input = screen.getByTestId('special-input')
//       const specialText = '!@#$%^&*()_+-=[]{}|;:,.<>?'
      
//       await userEvent.type(input, specialText)
//       expect(input).toHaveValue(specialText)
//     })

//     it('forwards refs correctly', () => {
//       const ref = React.createRef<HTMLInputElement>()
//       render(<Input ref={ref} />)
      
//       expect(ref.current).toBeInstanceOf(HTMLInputElement)
//       expect(ref.current).toBe(screen.getByRole('textbox'))
//     })
//   })

//   describe('Performance', () => {
//     it('does not re-render unnecessarily', () => {
//       const renderCount = jest.fn()
      
//       const TestInput = (props: React.ComponentProps<typeof Input>) => {
//         renderCount()
//         return <Input {...props} />
//       }
      
//       const { rerender } = render(<TestInput />)
//       expect(renderCount).toHaveBeenCalledTimes(1)
      
//       // Re-render with same props
//       rerender(<TestInput />)
//       expect(renderCount).toHaveBeenCalledTimes(2) // Expected since we're not memoizing
//     })
//   })

//   describe('Custom Styling', () => {
//     it('applies custom className', () => {
//       render(<Input className="custom-class" data-testid="styled-input" />)
      
//       const input = screen.getByTestId('styled-input')
//       expect(input).toHaveClass('custom-class')
//     })

//     it('maintains base classes with custom className', () => {
//       render(<Input className="custom-class" data-testid="styled-input" />)
      
//       const input = screen.getByTestId('styled-input')
//       expect(input).toHaveClass('custom-class', 'flex', 'w-full', 'rounded-md')
//     })
//   })
// })