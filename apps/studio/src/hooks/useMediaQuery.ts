// src/hooks/useMediaQuery.ts
/**
 * 📱 RESPONSIVE DESIGN HOOK
 * 
 * Custom hook for handling responsive behavior with SSR safety
 */
import { useState, useEffect } from 'react'

type MediaQuery = 
  | 'sm'    // 640px
  | 'md'    // 768px
  | 'lg'    // 1024px
  | 'xl'    // 1280px
  | '2xl'   // 1536px

const mediaQueries: Record<MediaQuery, string> = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
}

export function useMediaQuery(query: MediaQuery | string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQueryString = query in mediaQueries ? mediaQueries[query as MediaQuery] : query
    const mediaQueryList = window.matchMedia(mediaQueryString)
    
    // Set initial value
    setMatches(mediaQueryList.matches)

    // Create listener function
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add listener
    mediaQueryList.addEventListener('change', listener)

    // Cleanup
    return () => {
      mediaQueryList.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}

// Convenience hooks for common breakpoints
export const useIsMobile = () => {
  const isMd = useMediaQuery('md');
  return !isMd;
};

export const useIsTablet = () => {
  const isMd = useMediaQuery('md');
  const isLg = useMediaQuery('lg');
  return isMd && !isLg;
};

export const useIsDesktop = () => {
  const isLg = useMediaQuery('lg');
  return isLg;
};
