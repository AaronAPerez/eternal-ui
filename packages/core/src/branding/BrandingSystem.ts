'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'

/**
 * Complete Branding System for Eternal UI
 * 
 * Comprehensive branding and customization system that allows
 * full control over colors, typography, spacing, and messaging
 * across all components and features.
 * 
 * Features:
 * - Dynamic theming with CSS variables
 * - Type-safe color palette
 * - Responsive typography system
 * - Consistent spacing scale
 * - Brand messaging management
 * - Real-time customization
 * - SEO-optimized meta updates
 * - Accessibility compliance
 */

// Brand color palette with semantic naming
export const ETERNAL_UI_COLORS = {
  // Primary Brand Colors (Indigo Theme)
  primary: {
    50: '#EEF2FF',
    100: '#E0E7FF', 
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1', // Main brand color
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
    950: '#1E1B4B'
  },
  
  // Secondary Colors
  secondary: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    200: '#BAE6FD',
    300: '#7DD3FC',
    400: '#38BDF8',
    500: '#0EA5E9', // Secondary brand color
    600: '#0284C7',
    700: '#0369A1',
    800: '#075985',
    900: '#0C4A6E',
    950: '#082F49'
  },

  // Success Colors
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
    950: '#052E16'
  },

  // Warning Colors
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
    950: '#451A03'
  },

  // Error Colors
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    950: '#450A0A'
  },

  // Neutral Colors
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A'
  }
} as const

// Typography system
export const ETERNAL_UI_TYPOGRAPHY = {
  fontFamilies: {
    sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'monospace'],
    display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif']
  },
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
    '8xl': '6rem',    // 96px
    '9xl': '8rem'     // 128px
  },
  fontWeights: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900'
  },
  lineHeights: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2'
  }
} as const

// Spacing system
export const ETERNAL_UI_SPACING = {
  0: '0px',
  px: '1px',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  11: '2.75rem',   // 44px
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  28: '7rem',      // 112px
  32: '8rem',      // 128px
  36: '9rem',      // 144px
  40: '10rem',     // 160px
  44: '11rem',     // 176px
  48: '12rem',     // 192px
  52: '13rem',     // 208px
  56: '14rem',     // 224px
  60: '15rem',     // 240px
  64: '16rem',     // 256px
  72: '18rem',     // 288px
  80: '20rem',     // 320px
  96: '24rem'      // 384px
} as const

// Brand messaging and copy
export const ETERNAL_UI_MESSAGING = {
  brand: {
    name: 'Eternal UI',
    tagline: 'The Future of Web Development',
    description: 'Build beautiful, performant websites 10x faster with AI-powered components and zero maintenance.',
    mission: 'To liberate developers and designers from the complexity of modern web development.',
    vision: 'A world where creating stunning websites is as easy as describing what you want.'
  },
  
  features: {
    aiPowered: {
      title: 'AI-Powered Generation',
      description: 'Generate production-ready components from simple descriptions',
      benefit: '90% faster development'
    },
    zeroMaintenance: {
      title: 'Zero Maintenance',
      description: 'No updates, no security patches, no hosting headaches',
      benefit: '100% maintenance-free'
    },
    perfectPerformance: {
      title: 'Perfect Performance',
      description: 'Lightning-fast loading with automatic optimization',
      benefit: '10x faster than WordPress'
    },
    unlimitedCustomization: {
      title: 'Unlimited Customization',
      description: 'Complete design freedom with visual editing',
      benefit: 'No code limitations'
    }
  },

  competitors: {
    wordpress: {
      problems: [
        'Security vulnerabilities (41% of sites hacked)',
        'Slow performance (3.2s average load time)',
        'Plugin conflicts and maintenance hell',
        'Expensive hosting and plugin costs',
        'Limited design customization'
      ],
      solutions: [
        'Unhackable static architecture',
        'Lightning-fast 0.8s load times',
        'Everything built-in, zero conflicts',
        'Free hosting forever',
        'Unlimited visual customization'
      ]
    },
    figma: {
      problems: [
        'Design-to-code gap',
        'Manual developer handoff',
        'No real-time collaboration',
        'Limited prototyping capabilities'
      ],
      solutions: [
        'Automatic code generation',
        'Seamless design-to-development',
        'Real-time collaborative editing',
        'Interactive prototyping built-in'
      ]
    }
  },

  callsToAction: {
    primary: 'Start Building for Free',
    secondary: 'See How It Works',
    migration: 'Migrate from WordPress',
    demo: 'Try Interactive Demo',
    pricing: 'View Pricing Plans'
  }
} as const

// SEO metadata configuration
export const ETERNAL_UI_SEO = {
  meta: {
    title: 'Eternal UI - The Future of Web Development',
    description: 'Build beautiful, performant websites 10x faster with AI-powered components and zero maintenance. Revolutionary visual builder with unlimited customization.',
    keywords: [
      'visual website builder',
      'ai web development',
      'react components',
      'no-code platform',
      'web design tool',
      'wordpress alternative',
      'figma to code',
      'ui components'
    ],
    ogImage: '/eternal-ui-og-image.jpg',
    twitterCard: 'summary_large_image',
    canonicalUrl: 'https://eternal-ui.com'
  },
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Eternal UI',
    description: 'Revolutionary visual website builder with AI-powered components',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  }
} as const

// Type definitions
export type ColorScale = {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950: string
}

export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
export type FontFamily = 'sans' | 'mono' | 'display'

// Brand configuration interface
export interface BrandConfig {
  colors: typeof ETERNAL_UI_COLORS
  typography: typeof ETERNAL_UI_TYPOGRAPHY
  spacing: typeof ETERNAL_UI_SPACING
  messaging: typeof ETERNAL_UI_MESSAGING
  seo: typeof ETERNAL_UI_SEO
  customizations: {
    primaryColor?: string
    secondaryColor?: string
    fontFamily?: FontFamily
    borderRadius?: BorderRadius
    logoUrl?: string
    faviconUrl?: string
    customCSS?: string
    darkMode?: boolean
    companyName?: string
    customDomain?: string
  }
}

// Default brand configuration
export const DEFAULT_BRAND_CONFIG: BrandConfig = {
  colors: ETERNAL_UI_COLORS,
  typography: ETERNAL_UI_TYPOGRAPHY,
  spacing: ETERNAL_UI_SPACING,
  messaging: ETERNAL_UI_MESSAGING,
  seo: ETERNAL_UI_SEO,
  customizations: {
    primaryColor: ETERNAL_UI_COLORS.primary[500],
    secondaryColor: ETERNAL_UI_COLORS.secondary[500],
    fontFamily: 'sans',
    borderRadius: 'lg',
    logoUrl: '/eternal-ui-logo.svg',
    faviconUrl: '/eternal-ui-favicon.svg',
    darkMode: false
  }
}

// Branding context
interface BrandingContextType {
  brandConfig: BrandConfig
  updateBrandConfig: (updates: Partial<BrandConfig>) => void
  applyCustomizations: () => void
  resetToDefaults: () => void
  exportConfig: () => string
  importConfig: (config: string) => boolean
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const BrandingContext = createContext<BrandingContextType>({
  brandConfig: DEFAULT_BRAND_CONFIG,
  updateBrandConfig: () => {},
  applyCustomizations: () => {},
  resetToDefaults: () => {},
  exportConfig: () => '',
  importConfig: () => false,
  isDarkMode: false,
  toggleDarkMode: () => {}
})

/**
 * Custom hook to access branding context
 */
export const useBranding = (): BrandingContextType => {
  const context = useContext(BrandingContext)
  if (!context) {
    throw new Error('useBranding must be used within a BrandingProvider')
  }
  return context
}

/**
 * Branding Provider Component
 * 
 * Provides branding context and handles all customization logic
 */
export const BrandingProvider: React.FC<{
  children: React.ReactNode
  initialConfig?: Partial<BrandConfig>
}> = ({ children, initialConfig = {} }) => {
  const [brandConfig, setBrandConfig] = useState<BrandConfig>({
    ...DEFAULT_BRAND_CONFIG,
    ...initialConfig,
    customizations: {
      ...DEFAULT_BRAND_CONFIG.customizations,
      ...initialConfig.customizations
    }
  })

  const [isDarkMode, setIsDarkMode] = useState(false)

  /**
   * Update brand configuration
   */
  const updateBrandConfig = useCallback((updates: Partial<BrandConfig>) => {
    setBrandConfig(prev => ({
      ...prev,
      ...updates,
      customizations: {
        ...prev.customizations,
        ...updates.customizations
      }
    }))
  }, [])

  /**
   * Apply customizations to DOM
   */
  const applyCustomizations = useCallback(() => {
    const { customizations } = brandConfig
    const root = document.documentElement

    // Apply custom CSS variables
    if (customizations.primaryColor) {
      root.style.setProperty('--eternal-primary', customizations.primaryColor)
      root.style.setProperty('--eternal-primary-rgb', hexToRgb(customizations.primaryColor))
    }
    
    if (customizations.secondaryColor) {
      root.style.setProperty('--eternal-secondary', customizations.secondaryColor)
      root.style.setProperty('--eternal-secondary-rgb', hexToRgb(customizations.secondaryColor))
    }

    if (customizations.fontFamily) {
      const fontStack = ETERNAL_UI_TYPOGRAPHY.fontFamilies[customizations.fontFamily]
      root.style.setProperty('--eternal-font-family', fontStack.join(', '))
    }

    // Apply border radius
    if (customizations.borderRadius) {
      const radiusMap = {
        none: '0',
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px'
      }
      root.style.setProperty('--eternal-border-radius', radiusMap[customizations.borderRadius])
    }

    // Apply custom CSS
    if (customizations.customCSS) {
      let styleElement = document.getElementById('eternal-custom-styles')
      if (!styleElement) {
        styleElement = document.createElement('style')
        styleElement.id = 'eternal-custom-styles'
        document.head.appendChild(styleElement)
      }
      styleElement.textContent = customizations.customCSS
    }

    // Update favicon
    if (customizations.faviconUrl) {
      updateFavicon(customizations.faviconUrl)
    }

    // Update meta tags for SEO
    updateMetaTags()
  }, [brandConfig])

  /**
   * Reset to default configuration
   */
  const resetToDefaults = useCallback(() => {
    setBrandConfig(DEFAULT_BRAND_CONFIG)
    // Clear custom styles
    const customStyles = document.getElementById('eternal-custom-styles')
    if (customStyles) {
      customStyles.remove()
    }
    // Reset CSS variables
    const root = document.documentElement
    root.style.removeProperty('--eternal-primary')
    root.style.removeProperty('--eternal-secondary')
    root.style.removeProperty('--eternal-font-family')
    root.style.removeProperty('--eternal-border-radius')
  }, [])

  /**
   * Export configuration as JSON string
   */
  const exportConfig = useCallback(() => {
    return JSON.stringify(brandConfig, null, 2)
  }, [brandConfig])

  /**
   * Import configuration from JSON string
   */
  const importConfig = useCallback((configString: string): boolean => {
    try {
      const config = JSON.parse(configString) as BrandConfig
      setBrandConfig(config)
      return true
    } catch (error) {
      console.error('Failed to import brand configuration:', error)
      return false
    }
  }, [])

  /**
   * Toggle dark mode
   */
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => {
      const newMode = !prev
      document.documentElement.classList.toggle('dark', newMode)
      localStorage.setItem('eternal-ui-dark-mode', String(newMode))
      return newMode
    })
  }, [])

  /**
   * Initialize dark mode from localStorage or system preference
   */
  useEffect(() => {
    const savedMode = localStorage.getItem('eternal-ui-dark-mode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldUseDark = savedMode ? savedMode === 'true' : prefersDark
    
    setIsDarkMode(shouldUseDark)
    document.documentElement.classList.toggle('dark', shouldUseDark)
  }, [])

  /**
   * Apply customizations when config changes
   */
  useEffect(() => {
    applyCustomizations()
  }, [applyCustomizations])

  /**
   * Update meta tags for SEO
   */
  const updateMetaTags = useCallback(() => {
    const { seo, customizations } = brandConfig
    
    // Update title
    document.title = customizations.companyName 
      ? `${customizations.companyName} - ${seo.meta.title}`
      : seo.meta.title

    // Update meta description
    updateMetaTag('description', seo.meta.description)
    updateMetaTag('keywords', seo.meta.keywords.join(', '))
    
    // Update Open Graph tags
    updateMetaTag('og:title', document.title, 'property')
    updateMetaTag('og:description', seo.meta.description, 'property')
    updateMetaTag('og:image', seo.meta.ogImage, 'property')
    updateMetaTag('og:url', customizations.customDomain || seo.meta.canonicalUrl, 'property')
    
    // Update Twitter Card tags
    updateMetaTag('twitter:card', seo.meta.twitterCard)
    updateMetaTag('twitter:title', document.title)
    updateMetaTag('twitter:description', seo.meta.description)
    updateMetaTag('twitter:image', seo.meta.ogImage)

    // Update theme color for PWA
    updateMetaTag('theme-color', customizations.primaryColor || ETERNAL_UI_COLORS.primary[500])
  }, [brandConfig])

  const contextValue: BrandingContextType = {
    brandConfig,
    updateBrandConfig,
    applyCustomizations,
    resetToDefaults,
    exportConfig,
    importConfig,
    isDarkMode,
    toggleDarkMode
  }

  return (
    <BrandingContext.Provider value={contextValue}>
      {children}
    </BrandingContext.Provider>
  )
}

/**
 * Utility Functions
 */

/**
 * Convert hex color to RGB string
 */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '0, 0, 0'
  
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ].join(', ')
}

/**
 * Update or create meta tag
 */
function updateMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name'): void {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`)
  
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attribute, name)
    document.head.appendChild(meta)
  }
  
  meta.setAttribute('content', content)
}

/**
 * Update favicon
 */
function updateFavicon(url: string): void {
  let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
  
  if (!favicon) {
    favicon = document.createElement('link')
    favicon.rel = 'icon'
    document.head.appendChild(favicon)
  }
  
  favicon.href = url
}

/**
 * Higher-order component for brand-aware components
 */
export function withBranding<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  const BrandedComponent = (props: P) => {
    const branding = useBranding()
    return <Component {...props} branding={branding} />
  }
  
  BrandedComponent.displayName = `withBranding(${Component.displayName || Component.name})`
  return BrandedComponent
}

/**
 * Brand-aware CSS class generator
 */
export function createBrandClasses(brandConfig: BrandConfig) {
  const { customizations, colors } = brandConfig
  
  return {
    primary: `bg-[${customizations.primaryColor || colors.primary[500]}]`,
    'primary-text': `text-[${customizations.primaryColor || colors.primary[500]}]`,
    'primary-border': `border-[${customizations.primaryColor || colors.primary[500]}]`,
    secondary: `bg-[${customizations.secondaryColor || colors.secondary[500]}]`,
    'secondary-text': `text-[${customizations.secondaryColor || colors.secondary[500]}]`,
    'secondary-border': `border-[${customizations.secondaryColor || colors.secondary[500]}]`
  }
}

/**
 * Type guards and validators
 */
export function isValidHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
}

export function isValidBrandConfig(config: any): config is BrandConfig {
  return (
    config &&
    typeof config === 'object' &&
    config.colors &&
    config.typography &&
    config.spacing &&
    config.messaging &&
    config.customizations
  )
}

/**
 * Performance optimization hooks
 */
export function useDebouncedBrandUpdate(delay: number = 300) {
  const { updateBrandConfig } = useBranding()
  const [pendingUpdates, setPendingUpdates] = useState<Partial<BrandConfig> | null>(null)

  useEffect(() => {
    if (!pendingUpdates) return

    const timeoutId = setTimeout(() => {
      updateBrandConfig(pendingUpdates)
      setPendingUpdates(null)
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [pendingUpdates, delay, updateBrandConfig])

  return useCallback((updates: Partial<BrandConfig>) => {
    setPendingUpdates(prev => ({ ...prev, ...updates }))
  }, [])
}

// Export types for external use
export type { BrandingContextType, ColorScale, BorderRadius, FontFamily }

// Export default configuration
export default BrandingProvider