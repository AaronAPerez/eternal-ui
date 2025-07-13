/**
 * Modal Component
 * 
 * A fully accessible modal dialog with focus management, keyboard navigation,
 * and comprehensive accessibility features following WAI-ARIA guidelines.
 * 
 * Features:
 * - Focus trapping and restoration
 * - Keyboard navigation (Escape to close, Tab cycling)
 * - Screen reader accessible
 * - Backdrop click to close
 * - Animation support
 * - Portal rendering
 * - Size variants
 */

import React, { useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const modalVariants = cva(
  'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        default: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[95vw] max-h-[95vh]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

const overlayVariants = cva(
  'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
)

export interface ModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants> {
  /** Whether the modal is open */
  open: boolean
  /** Callback when modal should close */
  onClose: () => void
  /** Modal title for accessibility */
  title?: string
  /** Modal description for accessibility */
  description?: string
  /** Prevent closing on backdrop click */
  preventBackdropClose?: boolean
  /** Prevent closing on escape key */
  preventEscapeClose?: boolean
  /** Custom portal container */
  container?: HTMLElement
  /** Custom test identifier */
  'data-testid'?: string
}

/**
 * Modal Component
 * 
 * A fully accessible modal dialog that manages focus, provides keyboard
 * navigation, and follows ARIA best practices for dialog implementation.
 * 
 * @param props - Modal component props
 * @returns JSX.Element
 */
const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({
    className,
    size,
    open,
    onClose,
    title,
    description,
    children,
    preventBackdropClose = false,
    preventEscapeClose = false,
    container,
    'data-testid': testId,
    ...props
  }, ref) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const previousFocusRef = useRef<HTMLElement | null>(null)

    // Focus management
    const trapFocus = useCallback((element: HTMLElement) => {
      const focusableElements = element.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus()
            e.preventDefault()
          }
        }
      }

      element.addEventListener('keydown', handleTabKey)
      firstElement?.focus()

      return () => element.removeEventListener('keydown', handleTabKey)
    }, [])

    // Handle escape key
    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (!preventEscapeClose && event.key === 'Escape') {
          onClose()
        }
      },
      [onClose, preventEscapeClose]
    )

    // Handle backdrop click
    const handleBackdropClick = useCallback(
      (event: React.MouseEvent) => {
        if (!preventBackdropClose && event.target === event.currentTarget) {
          onClose()
        }
      },
      [onClose, preventBackdropClose]
    )

    // Effect for focus management and keyboard handling
    useEffect(() => {
      if (!open) return

      // Store previously focused element
      previousFocusRef.current = document.activeElement as HTMLElement

      // Add event listeners
      document.addEventListener('keydown', handleKeyDown)

      // Focus management
      const modal = modalRef.current
      if (modal) {
        const cleanup = trapFocus(modal)
        return () => {
          cleanup()
          document.removeEventListener('keydown', handleKeyDown)
          
          // Restore focus to previously focused element
          if (previousFocusRef.current) {
            previousFocusRef.current.focus()
          }
        }
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }, [open, handleKeyDown, trapFocus])

    // Effect for body scroll lock
    useEffect(() => {
      if (open) {
        // Prevent body scroll
        const originalStyle = window.getComputedStyle(document.body).overflow
        document.body.style.overflow = 'hidden'

        return () => {
          document.body.style.overflow = originalStyle
        }
      }
    }, [open])

    if (!open) return null

    const modalContent = (
      <>
        {/* Backdrop */}
        <div
          className={overlayVariants()}
          onClick={handleBackdropClick}
          data-state={open ? 'open' : 'closed'}
          aria-hidden="true"
        />

        {/* Modal */}
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
          className={cn(modalVariants({ size }), className)}
          data-testid={testId}
          data-state={open ? 'open' : 'closed'}
          {...props}
        >
          {/* Screen reader only title and description */}
          {title && (
            <h2 id="modal-title" className="sr-only">
              {title}
            </h2>
          )}
          {description && (
            <p id="modal-description" className="sr-only">
              {description}
            </p>
          )}

          {/* Modal content */}
          {children}
        </div>
      </>
    )

    // Render in portal
    return createPortal(
      modalContent,
      container || document.body
    )
  }
)

Modal.displayName = 'Modal'

/**
 * ModalHeader Component
 * Header section of the modal with title and close button
 */
const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    onClose?: () => void
    showCloseButton?: boolean
  }
>(({ className, children, onClose, showCloseButton = true, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  >
    <div className="flex items-center justify-between">
      <div className="flex-1">{children}</div>
      {showCloseButton && onClose && (
        <button
          type="button"
          className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  </div>
))

ModalHeader.displayName = 'ModalHeader'

/**
 * ModalTitle Component
 * Title for the modal
 */
const ModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))

ModalTitle.displayName = 'ModalTitle'

/**
 * ModalDescription Component
 * Description for the modal
 */
const ModalDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))

ModalDescription.displayName = 'ModalDescription'

/**
 * ModalContent Component
 * Main content area of the modal
 */
const ModalContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('py-4', className)}
    {...props}
  />
))

ModalContent.displayName = 'ModalContent'

/**
 * ModalFooter Component
 * Footer section with action buttons
 */
const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
))

ModalFooter.displayName = 'ModalFooter'

export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
  modalVariants,
}
