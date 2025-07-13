/**
 * 🎭 MODAL STATE MANAGEMENT HOOK
 * 
 * Provides convenient modal state management with animations
 */
import { useState, useCallback } from 'react'

interface UseModalOptions {
  defaultOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export function useModal(options: UseModalOptions = {}) {
  const { defaultOpen = false, onOpen, onClose } = options
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const open = useCallback(() => {
    setIsOpen(true)
    onOpen?.()
  }, [onOpen])

  const close = useCallback(() => {
    setIsOpen(false)
    onClose?.()
  }, [onClose])

  const toggle = useCallback(() => {
    if (isOpen) {
      close()
    } else {
      open()
    }
  }, [isOpen, open, close])

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  }
}

// Usage:
// const modal = useModal({
//   onOpen: () => console.log('Modal opened'),
//   onClose: () => console.log('Modal closed')
// })
//
// <Modal open={modal.isOpen} onClose={modal.close}>
//   Content
// </Modal>