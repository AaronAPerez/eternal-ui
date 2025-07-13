// src/hooks/useTouchDevice.ts
/**
 * 📱 TOUCH DEVICE DETECTION HOOK
 * 
 * Detects if user is on a touch device for enhanced UX
 */
import { useState, useEffect } from 'react'

export function useTouchDevice(): boolean {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const checkTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        'msMaxTouchPoints' in navigator && (navigator as Navigator & { msMaxTouchPoints: number }).msMaxTouchPoints > 0
      )
    }

    setIsTouchDevice(checkTouchDevice())
  }, [])

  return isTouchDevice
}