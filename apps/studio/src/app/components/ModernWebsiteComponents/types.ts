import { ReactNode } from 'react'

// Base component props interface
export interface BaseComponentProps {
  className?: string
  children?: ReactNode
}

// Hero Section Props
export interface HeroSectionProps extends BaseComponentProps {
  variant: 'centered' | 'split' | 'video-bg' | 'gradient' | 'minimal'
  title: string
  subtitle: string
  primaryCTA: string
  secondaryCTA?: string
  showImage: boolean
  backgroundVideo: boolean
}

// Navigation Header Props
export interface NavigationHeaderProps extends BaseComponentProps {
  variant: 'simple' | 'centered' | 'mega' | 'sidebar'
  showLogo: boolean
  transparent: boolean
  sticky: boolean
}

// Feature Cards Grid Props
export interface FeatureCardsGridProps extends BaseComponentProps {
  variant: 'cards' | 'icons' | 'minimal' | 'hover-effects'
  columns: 2 | 3 | 4
  showIcons: boolean
  animated: boolean
}

// Pricing Tables Props
export interface PricingTablesProps extends BaseComponentProps {
  variant: 'simple' | 'featured' | 'toggle' | 'comparison'
  billing: 'monthly' | 'yearly'
  showPopular: boolean
}

// Testimonials Section Props
export interface TestimonialsSectionProps extends BaseComponentProps {
  variant: 'carousel' | 'grid' | 'featured' | 'minimal'
  showImages: boolean
  animated: boolean
}

// Contact Section Props
export interface ContactSectionProps extends BaseComponentProps {
  variant: 'simple' | 'split' | 'centered' | 'modal'
  showMap: boolean
  showSocial: boolean
}

// CTA Section Props
export interface CTASectionProps extends BaseComponentProps {
  variant: 'simple' | 'split' | 'gradient' | 'image-bg'
  title: string
  subtitle: string
  primaryCTA: string
  secondaryCTA?: string
  showStats: boolean
}

// Footer Section Props
export interface FooterSectionProps extends BaseComponentProps {
  variant: 'simple' | 'comprehensive' | 'minimal'
  showNewsletter: boolean
  showSocial: boolean
}