
/**
 * Focus Management Hook
 * Manages focus states and focus trapping for modals/dialogs
 */
export interface FocusManagementOptions {
  preventScroll?: boolean;
  restoreFocus?: boolean;
}

export const useFocusManagement = () => {
  const previousFocusRef = useRef<HTMLElement | null>(null);
  
  /**
   * Trap focus within a container (for modals, dialogs)
   */
  const trapFocus = useCallback((containerRef: React.RefObject<HTMLElement>) => {
    const container = containerRef.current;
    if (!container) return;

    // Store the previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Get all focusable elements within the container
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    /**
     * Handle Tab key navigation within focus trap
     */
    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      // Shift + Tab: move focus to last element if on first
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        // Tab: move focus to first element if on last
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    };

    // Add event listener for tab navigation
    container.addEventListener('keydown', handleTabKey);
    
    // Focus the first focusable element
    if (firstElement) {
      firstElement.focus();
    }

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, []);

  /**
   * Restore focus to previously focused element
   */
  const restoreFocus = useCallback(() => {
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, []);

  /**
   * Focus first element in container
   */
  const focusFirst = useCallback((containerRef: React.RefObject<HTMLElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const firstFocusable = container.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;

    if (firstFocusable) {
      firstFocusable.focus();
    }
  }, []);

  return { trapFocus, restoreFocus, focusFirst };
};
