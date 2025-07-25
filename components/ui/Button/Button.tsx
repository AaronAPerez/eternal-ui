// =============================================================================
// STEP 1: Core Button Component with CVA (Class Variance Authority)
// =============================================================================

// src/components/ui/Button/Button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

// Define button variants using CVA for type-safe styling
const buttonVariants = cva(
  // Base styles - applied to all buttons
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:from-blue-600 hover:to-purple-700 hover:shadow-xl transition-all duration-200",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-9 w-9"
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "hover:animate-bounce",
        wiggle: "hover:animate-wiggle",
        glow: "hover:shadow-lg hover:shadow-primary/50 transition-shadow duration-300"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none"
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  href?: string
}

/**
 * Button Component
 * 
 * A flexible button component with multiple variants, sizes, states, and animations.
 * Supports loading states, icons, links, and accessibility features.
 * 
 * @example
 * ```tsx
 * <Button variant="default" size="lg" isLoading>
 *   Submit Form
 * </Button>
 * 
 * <Button variant="outline" icon={<Download />} iconPosition="left">
 *   Download
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    animation,
    asChild = false, 
    isLoading = false,
    loadingText,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    disabled,
    children,
    href,
    ...props 
  }, ref) => {
    // Determine if this should be rendered as a link
    const isLink = href && !disabled && !isLoading
    const Comp = asChild ? Slot : isLink ? "a" : "button"
    
    // Handle loading and disabled states
    const isDisabled = disabled || isLoading
    
    // Prepare button content with icons and loading states
    const buttonContent = () => {
      if (isLoading) {
        return (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {loadingText || children}
          </>
        )
      }

      if (icon && children) {
        return iconPosition === 'left' ? (
          <>
            <span className="mr-2">{icon}</span>
            {children}
          </>
        ) : (
          <>
            {children}
            <span className="ml-2">{icon}</span>
          </>
        )
      }

      if (icon && !children && size === 'icon') {
        return icon
      }

      return children
    }

    // Prepare props based on component type
    const componentProps = isLink
      ? { href, ...props }
      : { disabled: isDisabled, ...props }

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, animation }),
          fullWidth && "w-full",
          className
        )}
        ref={ref}
        {...componentProps}
      >
        {buttonContent()}
      </Comp>
    )
  }
)

Button.displayName = "Button"

// Export variants for external use
export { buttonVariants }