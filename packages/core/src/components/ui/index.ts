/**
 * UI Components Barrel Export
 * 
 * Centralized export for all UI components to simplify imports
 * and maintain a clean API surface.
 */

// Existing components
export { Button } from './Button'
export { Card } from './Card'
export { Input } from './Input'

// New components
export { Badge, badgeVariants } from './Badge'
export { Progress, progressVariants } from './Progress'
export { 
  Alert, 
  AlertTitle, 
  AlertDescription 
} from './Alert'
export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
  modalVariants,
} from './Modal'

// Re-export types
export type { BadgeProps } from './Badge'
export type { ProgressProps } from './Progress'
export type { AlertProps } from './Alert'
export type { ModalProps } from './Modal'