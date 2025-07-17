// =================================================================
// COMPONENT LIBRARY DATA
// =================================================================

import ContactForm from "@/components/marketing/ContactForm/ContactForm";
import FeatureGrid from "@/components/marketing/FeatureGrid/FeatureGrid";
import StatsCounter from "@/components/marketing/StatsCounter/StatsCounter";
import { HeroSection } from "@/components/ModernWebsiteComponents";
import { ComponentMeta } from "@/components/types";


const COMPONENT_LIBRARY: ComponentMeta[] = [
  {
    id: 'hero-section',
    name: 'Hero Section',
    description: 'Customizable hero section with background options and CTA buttons',
    category: 'layout',
    tags: ['hero', 'landing', 'cta', 'banner'],
    complexity: 'intermediate',
    popularity: 95,
    isPremium: false,
    bundleSize: 12,
    renderScore: 98,
    wcagLevel: 'AA',
    rating: 4.8,
    downloadCount: 15600,
    lastUpdated: '2025-01-15',
    component: HeroSection,
    propsSchema: {
      title: { type: 'string', label: 'Hero Title', default: 'Welcome to Our Platform' },
      subtitle: { type: 'textarea', label: 'Hero Subtitle', default: 'Build amazing websites with our visual builder' },
      ctaText: { type: 'string', label: 'CTA Button Text', default: 'Get Started' },
      ctaUrl: { type: 'string', label: 'CTA Button URL', default: '#' },
      variant: { 
        type: 'select', 
        label: 'Hero Variant', 
        options: [
          { label: 'Standard', value: 'standard' },
          { label: 'Minimal', value: 'minimal' },
          { label: 'Large', value: 'large' }
        ], 
        default: 'standard' 
      },
      backgroundImage: { type: 'image', label: 'Background Image' },
      backgroundColor: { type: 'color', label: 'Background Color', default: '#6366F1' },
      textColor: { type: 'color', label: 'Text Color', default: '#FFFFFF' }
    },
    defaultProps: {
      title: 'Welcome to Our Platform',
      subtitle: 'Build amazing websites with our visual builder',
      ctaText: 'Get Started',
      ctaUrl: '#',
      variant: 'standard',
      backgroundColor: '#6366F1',
      textColor: '#FFFFFF'
    },
    codeExample: `<HeroSection
  title="Welcome to Our Platform"
  subtitle="Build amazing websites with our visual builder"
  ctaText="Get Started"
  backgroundColor="#6366F1"
  textColor="#FFFFFF"
/>`
  },
  {
    id: 'feature-grid',
    name: 'Feature Grid',
    description: 'Responsive feature grid with customizable layouts and styles',
    category: 'content',
    tags: ['features', 'grid', 'responsive', 'icons'],
    complexity: 'intermediate',
    popularity: 89,
    isPremium: false,
    bundleSize: 16,
    renderScore: 94,
    wcagLevel: 'AA',
    rating: 4.7,
    downloadCount: 12800,
    lastUpdated: '2025-01-12',
    component: FeatureGrid,
    propsSchema: {
      title: { type: 'string', label: 'Section Title', default: 'Why Choose Us' },
      subtitle: { type: 'string', label: 'Section Subtitle', default: 'Discover the features that set us apart' },
      features: { type: 'slider', label: 'Number of Features', min: 3, max: 8, default: 6 },
      layout: { 
        type: 'select', 
        label: 'Grid Layout', 
        options: [
          { label: '2 Columns', value: 'grid-2' },
          { label: '3 Columns', value: 'grid-3' },
          { label: '4 Columns', value: 'grid-4' }
        ], 
        default: 'grid-3' 
      },
      style: { 
        type: 'select', 
        label: 'Display Style', 
        options: [
          { label: 'Cards', value: 'cards' },
          { label: 'Minimal', value: 'minimal' },
          { label: 'Icons', value: 'icons' }
        ], 
        default: 'cards' 
      },
      accentColor: { type: 'color', label: 'Accent Color', default: '#3B82F6' },
      backgroundColor: { type: 'color', label: 'Background Color', default: '#F9FAFB' },
      textColor: { type: 'color', label: 'Text Color', default: '#111827' }
    },
    defaultProps: {
      title: 'Why Choose Us',
      subtitle: 'Discover the features that set us apart',
      features: 6,
      layout: 'grid-3',
      style: 'cards',
      accentColor: '#3B82F6',
      backgroundColor: '#F9FAFB',
      textColor: '#111827'
    },
    codeExample: `<FeatureGrid
  title="Why Choose Us"
  subtitle="Discover the features that set us apart"
  features={6}
  layout="grid-3"
  style="cards"
  accentColor="#3B82F6"
/>`
  },
  {
    id: 'stats-counter',
    name: 'Stats Counter',
    description: 'Animated statistics display with multiple layout options',
    category: 'content',
    tags: ['stats', 'numbers', 'achievements', 'counters'],
    complexity: 'beginner',
    popularity: 76,
    isPremium: false,
    bundleSize: 8,
    renderScore: 96,
    wcagLevel: 'AAA',
    rating: 4.5,
    downloadCount: 9200,
    lastUpdated: '2025-01-10',
    component: StatsCounter,
    propsSchema: {
      title: { type: 'string', label: 'Section Title', default: 'Our Achievements' },
      subtitle: { type: 'string', label: 'Section Subtitle', default: 'Numbers that speak for themselves' },
      layout: { 
        type: 'select', 
        label: 'Layout Style', 
        options: [
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' },
          { label: 'Cards', value: 'cards' }
        ], 
        default: 'light' 
      },
      accentColor: { type: 'color', label: 'Accent Color', default: '#10B981' },
      backgroundColor: { type: 'color', label: 'Background Color', default: '#FFFFFF' },
      textColor: { type: 'color', label: 'Text Color', default: '#111827' }
    },
    defaultProps: {
      title: 'Our Achievements',
      subtitle: 'Numbers that speak for themselves',
      layout: 'light',
      accentColor: '#10B981',
      backgroundColor: '#FFFFFF',
      textColor: '#111827'
    },
    codeExample: `<StatsCounter
  title="Our Achievements"
  subtitle="Numbers that speak for themselves"
  layout="light"
  accentColor="#10B981"
/>`
  },
  {
    id: 'contact-form',
    name: 'Contact Form',
    description: 'Professional contact form with validation and customizable styling',
    category: 'forms',
    tags: ['contact', 'form', 'input', 'validation'],
    complexity: 'intermediate',
    popularity: 88,
    isPremium: false,
    bundleSize: 18,
    renderScore: 92,
    wcagLevel: 'AAA',
    rating: 4.6,
    downloadCount: 11400,
    lastUpdated: '2025-01-14',
    component: ContactForm,
    propsSchema: {
      title: { type: 'string', label: 'Form Title', default: 'Contact Us' },
      subtitle: { type: 'string', label: 'Form Subtitle', default: 'Get in touch with our team' },
      accentColor: { type: 'color', label: 'Accent Color', default: '#6366F1' },
      backgroundColor: { type: 'color', label: 'Background Color', default: '#F3F4F6' },
      textColor: { type: 'color', label: 'Text Color', default: '#111827' }
    },
    defaultProps: {
      title: 'Contact Us',
      subtitle: 'Get in touch with our team',
      accentColor: '#6366F1',
      backgroundColor: '#F3F4F6',
      textColor: '#111827'
    },
    codeExample: `<ContactForm
  title="Contact Us"
  subtitle="Get in touch with our team"
  accentColor="#6366F1"
  backgroundColor="#F3F4F6"
/>`
  }
];

export default COMPONENT_LIBRARY;