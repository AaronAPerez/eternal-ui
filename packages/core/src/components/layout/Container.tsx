import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, type BuilderComponentProps, setDisplayName } from '../../lib/utils'

const containerVariants = cva(
  'mx-auto w-full',
  {
    variants: {
      size: {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-screen-xl',
        '2xl': 'max-w-screen-2xl',
        full: 'max-w-full'
      },
      padding: {
        none: '',
        sm: 'px-4',
        md: 'px-6',
        lg: 'px-8',
        xl: 'px-12'
      }
    },
    defaultVariants: {
      size: 'lg',
      padding: 'md'
    }
  }
)

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants>,
    BuilderComponentProps {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ 
    className, 
    size, 
    padding, 
    id,
    children,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        id={id}
        className={cn(containerVariants({ size, padding }), className)}
        data-builder-id={id}
        data-builder-type="container"
        data-builder-editable={true}
        {...props}
      >
        {children}
      </div>
    )
  }
)

export { Container, containerVariants }
export default setDisplayName(Container, 'Container')