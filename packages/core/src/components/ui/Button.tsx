import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, type BuilderComponentProps, setDisplayName } from '../../lib/utils'

const buttonVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center',
    'rounded-md text-sm font-medium',
    'transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
    'ring-offset-white'
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-blue-500 text-white',
          'hover:bg-blue-600',
          'active:bg-blue-700'
        ],
        destructive: [
          'bg-red-500 text-white',
          'hover:bg-red-600',
          'active:bg-red-700'
        ],
        outline: [
          'border border-gray-200 bg-white text-gray-900',
          'hover:bg-gray-50',
          'active:bg-gray-100'
        ],
        secondary: [
          'bg-gray-100 text-gray-900',
          'hover:bg-gray-200',
          'active:bg-gray-300'
        ],
        ghost: [
          'text-gray-900 bg-transparent',
          'hover:bg-gray-100',
          'active:bg-gray-200'
        ],
        link: [
          'text-blue-500 underline-offset-4',
          'hover:underline hover:text-blue-600',
          'active:text-blue-700'
        ]
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    BuilderComponentProps {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    id,
    children,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : 'button'
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        id={id}
        data-builder-id={id}
        data-builder-type="button"
        data-builder-editable={true}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)

export { Button, buttonVariants }
export default setDisplayName(Button, 'Button')