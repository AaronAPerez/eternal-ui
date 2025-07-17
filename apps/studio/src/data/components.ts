import { ComponentType } from "react";
import React from "react";
import { ComponentCategory } from "./categories";

// Import all components from ModernWebsiteComponents
import HeroSection from "@/components/ModernWebsiteComponents/HeroSection";
import NavigationHeader from "@/components/ModernWebsiteComponents/NavigationHeader";
import FeatureCardsGrid from "@/components/ModernWebsiteComponents/FeatureCardsGrid";
import PricingTables from "@/components/ModernWebsiteComponents/PricingTables";
import TestimonialsSection from "@/components/ModernWebsiteComponents/TestimonialsSection";
import ContactSection from "@/components/ModernWebsiteComponents/ContactSection";
import CTASection from "@/components/ModernWebsiteComponents/CTASection";
import FooterSection from "@/components/ModernWebsiteComponents/FooterSection";

export interface ComponentMetadata {
  id: string;
  name: string;
  description: string;
  category: ComponentCategory;
  subcategory?: string;
  tags: string[];
  component: ComponentType<any>;
  variants: ComponentVariant[];
  props: ComponentPropConfig[];
  examples: ComponentExample[];
  features: ComponentFeatures;
  accessibility: AccessibilityInfo;
  performance: PerformanceMetrics;
  seo: SEOFeatures;
  complexity: "beginner" | "intermediate" | "advanced";
  premium: boolean;
  popularity: number;
  lastUpdated: string;
  version: string;
}

export interface ComponentVariant {
  id: string;
  name: string;
  description: string;
  props: Record<string, any>;
  preview: string;
  code: string;
}

export interface ComponentPropConfig {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'object';
  options?: string[];
  default?: any;
  description: string;
  required?: boolean;
}

export interface ComponentExample {
  id: string;
  name: string;
  description: string;
  code: string;
  preview: string;
}

export interface ComponentFeatures {
  responsive: boolean;
  darkMode: boolean;
  animations: boolean;
  interactive: boolean;
  accessible: boolean;
  seoOptimized: boolean;
  performanceOptimized: boolean;
}

export interface AccessibilityInfo {
  wcagLevel: 'A' | 'AA' | 'AAA';
  screenReader: boolean;
  keyboardNavigation: boolean;
  ariaLabels: boolean;
  colorContrast: boolean;
}

export interface PerformanceMetrics {
  bundleSize: number;
  renderScore: number;
  memoryUsage: 'low' | 'medium' | 'high';
}

export interface SEOFeatures {
  semanticHtml: boolean;
  structuredData: boolean;
  openGraph: boolean;
  metaTags: boolean;
}

// Component registry with ALL modern website components
export const componentRegistry: ComponentMetadata[] = [
  {
    id: "hero-section",
    name: "Hero Section",
    description: "Powerful hero sections with multiple layout variants for landing pages",
    category: "layout",
    subcategory: "sections",
    tags: ["hero", "landing", "banner", "cta", "responsive"],
    component: HeroSection,
    variants: [
      {
        id: "centered",
        name: "Centered Hero",
        description: "Classic centered hero with background gradient",
        props: {
          variant: "centered",
          title: "Build Amazing Websites",
          subtitle: "Create stunning, responsive websites with our modern component library",
          primaryCTA: "Get Started Free",
          secondaryCTA: "View Examples",
          showImage: true,
          backgroundVideo: false
        },
        preview: "/previews/hero-centered.png",
        code: `<HeroSection
  variant="centered"
  title="Build Amazing Websites"
  subtitle="Create stunning, responsive websites"
  primaryCTA="Get Started Free"
  secondaryCTA="View Examples"
  showImage={true}
/>`
      },
      {
        id: "split",
        name: "Split Layout Hero",
        description: "Hero with split layout - content on left, visual on right",
        props: {
          variant: "split",
          title: "Modern Design System",
          subtitle: "Professional components for rapid development",
          primaryCTA: "Start Building",
          secondaryCTA: "Learn More",
          showImage: true,
          backgroundVideo: false
        },
        preview: "/previews/hero-split.png",
        code: `<HeroSection
  variant="split"
  title="Modern Design System"
  subtitle="Professional components for rapid development"
  primaryCTA="Start Building"
  showImage={true}
/>`
      },
      {
        id: "video-bg",
        name: "Video Background Hero",
        description: "Hero with video background for impact",
        props: {
          variant: "video-bg",
          title: "Revolutionary Platform",
          subtitle: "Experience the future of web development",
          primaryCTA: "Watch Demo",
          secondaryCTA: "Try Free",
          showImage: false,
          backgroundVideo: true
        },
        preview: "/previews/hero-video.png",
        code: `<HeroSection
  variant="video-bg"
  title="Revolutionary Platform"
  subtitle="Experience the future of web development"
  primaryCTA="Watch Demo"
  backgroundVideo={true}
/>`
      }
    ],
    props: [
      {
        name: 'variant',
        type: 'select',
        options: ['centered', 'split', 'video-bg', 'gradient', 'minimal'],
        default: 'centered',
        description: 'Hero section layout variant',
        required: true
      },
      {
        name: 'title',
        type: 'string',
        default: 'Build Amazing Websites',
        description: 'Main hero title',
        required: true
      },
      {
        name: 'subtitle',
        type: 'string',
        default: 'Create stunning, responsive websites',
        description: 'Hero subtitle/description',
        required: true
      },
      {
        name: 'primaryCTA',
        type: 'string',
        default: 'Get Started',
        description: 'Primary call-to-action button text',
        required: true
      },
      {
        name: 'secondaryCTA',
        type: 'string',
        default: 'Learn More',
        description: 'Secondary call-to-action button text',
        required: false
      },
      {
        name: 'showImage',
        type: 'boolean',
        default: true,
        description: 'Show hero image/visual element',
        required: false
      },
      {
        name: 'backgroundVideo',
        type: 'boolean',
        default: false,
        description: 'Enable video background',
        required: false
      }
    ],
    examples: [
      {
        id: 'landing-page',
        name: 'Landing Page Hero',
        description: 'Perfect for product landing pages',
        code: `<HeroSection variant="centered" title="Launch Your Product" />`,
        preview: '/examples/hero-landing.png'
      },
      {
        id: 'app-homepage',
        name: 'App Homepage',
        description: 'Great for SaaS application homepages',
        code: `<HeroSection variant="split" title="Powerful App Platform" />`,
        preview: '/examples/hero-app.png'
      }
    ],
    features: {
      responsive: true,
      darkMode: true,
      animations: true,
      interactive: true,
      accessible: true,
      seoOptimized: true,
      performanceOptimized: true
    },
    accessibility: {
      wcagLevel: 'AA',
      screenReader: true,
      keyboardNavigation: true,
      ariaLabels: true,
      colorContrast: true
    },
    performance: {
      bundleSize: 12.5,
      renderScore: 95,
      memoryUsage: 'low'
    },
    seo: {
      semanticHtml: true,
      structuredData: true,
      openGraph: true,
      metaTags: true
    },
    complexity: 'beginner',
    premium: false,
    popularity: 98,
    lastUpdated: '2025-01-15',
    version: '2.1.0'
  },
  {
    id: "navigation-header",
    name: "Navigation Header",
    description: "Responsive navigation headers with multiple variants and features",
    category: "navigation",
    subcategory: "headers",
    tags: ["navigation", "header", "menu", "responsive", "mobile"],
    component: NavigationHeader,
    variants: [
      {
        id: "simple",
        name: "Simple Navigation",
        description: "Clean, minimalist navigation header",
        props: {
          variant: "simple",
          showLogo: true,
          transparent: false,
          sticky: true
        },
        preview: "/previews/nav-simple.png",
        code: `<NavigationHeader
  variant="simple"
  showLogo={true}
  sticky={true}
/>`
      },
      {
        id: "mega",
        name: "Mega Menu Navigation",
        description: "Navigation with dropdown mega menus",
        props: {
          variant: "mega",
          showLogo: true,
          transparent: false,
          sticky: true
        },
        preview: "/previews/nav-mega.png",
        code: `<NavigationHeader
  variant="mega"
  showLogo={true}
  sticky={true}
/>`
      }
    ],
    props: [
      {
        name: 'variant',
        type: 'select',
        options: ['simple', 'centered', 'mega', 'sidebar'],
        default: 'simple',
        description: 'Navigation layout variant',
        required: true
      },
      {
        name: 'showLogo',
        type: 'boolean',
        default: true,
        description: 'Display logo in navigation',
        required: false
      },
      {
        name: 'transparent',
        type: 'boolean',
        default: false,
        description: 'Transparent background on scroll',
        required: false
      },
      {
        name: 'sticky',
        type: 'boolean',
        default: true,
        description: 'Stick navigation to top on scroll',
        required: false
      }
    ],
    examples: [
      {
        id: 'website-nav',
        name: 'Website Navigation',
        description: 'Standard website navigation',
        code: `<NavigationHeader variant="simple" sticky={true} />`,
        preview: '/examples/nav-website.png'
      }
    ],
    features: {
      responsive: true,
      darkMode: true,
      animations: true,
      interactive: true,
      accessible: true,
      seoOptimized: true,
      performanceOptimized: true
    },
    accessibility: {
      wcagLevel: 'AA',
      screenReader: true,
      keyboardNavigation: true,
      ariaLabels: true,
      colorContrast: true
    },
    performance: {
      bundleSize: 8.2,
      renderScore: 92,
      memoryUsage: 'low'
    },
    seo: {
      semanticHtml: true,
      structuredData: true,
      openGraph: false,
      metaTags: true
    },
    complexity: 'beginner',
    premium: false,
    popularity: 94,
    lastUpdated: '2025-01-10',
    version: '1.8.0'
  },
  {
    id: "feature-cards-grid",
    name: "Feature Cards Grid",
    description: "Flexible grid of feature cards with icons and descriptions",
    category: "content",
    subcategory: "cards",
    tags: ["features", "cards", "grid", "icons", "responsive"],
    component: FeatureCardsGrid,
    variants: [
      {
        id: "cards",
        name: "Card Style",
        description: "Features displayed in card containers",
        props: {
          variant: "cards",
          columns: 3,
          showIcons: true,
          animated: true
        },
        preview: "/previews/features-cards.png",
        code: `<FeatureCardsGrid
  variant="cards"
  columns={3}
  showIcons={true}
  animated={true}
/>`
      },
      {
        id: "minimal",
        name: "Minimal Style",
        description: "Clean, minimal feature layout",
        props: {
          variant: "minimal",
          columns: 2,
          showIcons: true,
          animated: false
        },
        preview: "/previews/features-minimal.png",
        code: `<FeatureCardsGrid
  variant="minimal"
  columns={2}
  showIcons={true}
/>`
      }
    ],
    props: [
      {
        name: 'variant',
        type: 'select',
        options: ['cards', 'icons', 'minimal', 'hover-effects'],
        default: 'cards',
        description: 'Feature display style',
        required: true
      },
      {
        name: 'columns',
        type: 'select',
        options: ['2', '3', '4'],
        default: '3',
        description: 'Number of columns in grid',
        required: true
      },
      {
        name: 'showIcons',
        type: 'boolean',
        default: true,
        description: 'Display feature icons',
        required: false
      },
      {
        name: 'animated',
        type: 'boolean',
        default: true,
        description: 'Enable entrance animations',
        required: false
      }
    ],
    examples: [
      {
        id: 'product-features',
        name: 'Product Features',
        description: 'Showcase product capabilities',
        code: `<FeatureCardsGrid variant="cards" columns={3} />`,
        preview: '/examples/features-product.png'
      }
    ],
    features: {
      responsive: true,
      darkMode: true,
      animations: true,
      interactive: false,
      accessible: true,
      seoOptimized: true,
      performanceOptimized: true
    },
    accessibility: {
      wcagLevel: 'AA',
      screenReader: true,
      keyboardNavigation: false,
      ariaLabels: true,
      colorContrast: true
    },
    performance: {
      bundleSize: 6.8,
      renderScore: 96,
      memoryUsage: 'low'
    },
    seo: {
      semanticHtml: true,
      structuredData: true,
      openGraph: false,
      metaTags: true
    },
    complexity: 'beginner',
    premium: false,
    popularity: 89,
    lastUpdated: '2025-01-12',
    version: '1.5.0'
  },
  {
    id: "pricing-tables",
    name: "Pricing Tables",
    description: "Professional pricing tables with multiple billing options",
    category: "marketing",
    subcategory: "pricing",
    tags: ["pricing", "tables", "billing", "plans", "conversion"],
    component: PricingTables,
    variants: [
      {
        id: "simple",
        name: "Simple Pricing",
        description: "Basic pricing table layout",
        props: {
          variant: "simple",
          billing: "monthly",
          showPopular: true
        },
        preview: "/previews/pricing-simple.png",
        code: `<PricingTables
  variant="simple"
  billing="monthly"
  showPopular={true}
/>`
      },
      {
        id: "toggle",
        name: "Toggle Billing",
        description: "Pricing with monthly/yearly toggle",
        props: {
          variant: "toggle",
          billing: "monthly",
          showPopular: true
        },
        preview: "/previews/pricing-toggle.png",
        code: `<PricingTables
  variant="toggle"
  billing="monthly"
  showPopular={true}
/>`
      }
    ],
    props: [
      {
        name: 'variant',
        type: 'select',
        options: ['simple', 'featured', 'toggle', 'comparison'],
        default: 'simple',
        description: 'Pricing table layout style',
        required: true
      },
      {
        name: 'billing',
        type: 'select',
        options: ['monthly', 'yearly'],
        default: 'monthly',
        description: 'Default billing period',
        required: true
      },
      {
        name: 'showPopular',
        type: 'boolean',
        default: true,
        description: 'Highlight popular plan',
        required: false
      }
    ],
    examples: [
      {
        id: 'saas-pricing',
        name: 'SaaS Pricing',
        description: 'Perfect for SaaS applications',
        code: `<PricingTables variant="toggle" showPopular={true} />`,
        preview: '/examples/pricing-saas.png'
      }
    ],
    features: {
      responsive: true,
      darkMode: true,
      animations: true,
      interactive: true,
      accessible: true,
      seoOptimized: true,
      performanceOptimized: true
    },
    accessibility: {
      wcagLevel: 'AA',
      screenReader: true,
      keyboardNavigation: true,
      ariaLabels: true,
      colorContrast: true
    },
    performance: {
      bundleSize: 9.4,
      renderScore: 91,
      memoryUsage: 'low'
    },
    seo: {
      semanticHtml: true,
      structuredData: true,
      openGraph: true,
      metaTags: true
    },
    complexity: 'intermediate',
    premium: false,
    popularity: 92,
    lastUpdated: '2025-01-08',
    version: '2.0.0'
  },
  {
    id: "testimonials-section",
    name: "Testimonials Section",
    description: "Customer testimonials with multiple display options",
    category: "social",
    subcategory: "testimonials",
    tags: ["testimonials", "reviews", "social-proof", "customers"],
    component: TestimonialsSection,
    variants: [
      {
        id: "carousel",
        name: "Carousel View",
        description: "Testimonials in rotating carousel",
        props: {
          variant: "carousel",
          showImages: true,
          animated: true
        },
        preview: "/previews/testimonials-carousel.png",
        code: `<TestimonialsSection
  variant="carousel"
  showImages={true}
  animated={true}
/>`
      },
      {
        id: "grid",
        name: "Grid Layout",
        description: "Testimonials in grid format",
        props: {
          variant: "grid",
          showImages: true,
          animated: true
        },
        preview: "/previews/testimonials-grid.png",
        code: `<TestimonialsSection
  variant="grid"
  showImages={true}
  animated={true}
/>`
      }
    ],
    props: [
      {
        name: 'variant',
        type: 'select',
        options: ['carousel', 'grid', 'featured', 'minimal'],
        default: 'carousel',
        description: 'Testimonials display style',
        required: true
      },
      {
        name: 'showImages',
        type: 'boolean',
        default: true,
        description: 'Show customer photos',
        required: false
      },
      {
        name: 'animated',
        type: 'boolean',
        default: true,
        description: 'Enable animations',
        required: false
      }
    ],
    examples: [
      {
        id: 'customer-reviews',
        name: 'Customer Reviews',
        description: 'Display customer feedback',
        code: `<TestimonialsSection variant="carousel" />`,
        preview: '/examples/testimonials-customers.png'
      }
    ],
    features: {
      responsive: true,
      darkMode: true,
      animations: true,
      interactive: true,
      accessible: true,
      seoOptimized: true,
      performanceOptimized: true
    },
    accessibility: {
      wcagLevel: 'AA',
      screenReader: true,
      keyboardNavigation: true,
      ariaLabels: true,
      colorContrast: true
    },
    performance: {
      bundleSize: 11.2,
      renderScore: 88,
      memoryUsage: 'medium'
    },
    seo: {
      semanticHtml: true,
      structuredData: true,
      openGraph: true,
      metaTags: true
    },
    complexity: 'intermediate',
    premium: false,
    popularity: 85,
    lastUpdated: '2025-01-05',
    version: '1.7.0'
  },
  {
    id: "contact-section",
    name: "Contact Section",
    description: "Contact forms with multiple layouts and features",
    category: "forms",
    subcategory: "contact",
    tags: ["contact", "form", "email", "support", "communication"],
    component: ContactSection,
    variants: [
      {
        id: "split",
        name: "Split Layout",
        description: "Contact info and form side by side",
        props: {
          variant: "split",
          showMap: true,
          showSocial: true
        },
        preview: "/previews/contact-split.png",
        code: `<ContactSection
  variant="split"
  showMap={true}
  showSocial={true}
/>`
      },
      {
        id: "centered",
        name: "Centered Form",
        description: "Centered contact form",
        props: {
          variant: "centered",
          showMap: false,
          showSocial: true
        },
        preview: "/previews/contact-centered.png",
        code: `<ContactSection
  variant="centered"
  showSocial={true}
/>`
      }
    ],
    props: [
      {
        name: 'variant',
        type: 'select',
        options: ['simple', 'split', 'centered', 'modal'],
        default: 'split',
        description: 'Contact form layout',
        required: true
      },
      {
        name: 'showMap',
        type: 'boolean',
        default: true,
        description: 'Display location map',
        required: false
      },
      {
        name: 'showSocial',
        type: 'boolean',
        default: true,
        description: 'Show social media links',
        required: false
      }
    ],
    examples: [
      {
        id: 'business-contact',
        name: 'Business Contact',
        description: 'Professional contact section',
        code: `<ContactSection variant="split" showMap={true} />`,
        preview: '/examples/contact-business.png'
      }
    ],
    features: {
      responsive: true,
      darkMode: true,
      animations: true,
      interactive: true,
      accessible: true,
      seoOptimized: true,
      performanceOptimized: true
    },
    accessibility: {
      wcagLevel: 'AA',
      screenReader: true,
      keyboardNavigation: true,
      ariaLabels: true,
      colorContrast: true
    },
    performance: {
      bundleSize: 14.8,
      renderScore: 87,
      memoryUsage: 'medium'
    },
    seo: {
      semanticHtml: true,
      structuredData: true,
      openGraph: true,
      metaTags: true
    },
    complexity: 'intermediate',
    premium: false,
    popularity: 78,
    lastUpdated: '2025-01-03',
    version: '1.9.0'
  },
  {
    id: "cta-section",
    name: "Call-to-Action Section",
    description: "Conversion-focused CTA sections with multiple styles",
    category: "marketing",
    subcategory: "cta",
    tags: ["cta", "conversion", "action", "marketing", "buttons"],
    component: CTASection,
    variants: [
      {
        id: "gradient",
        name: "Gradient Background",
        description: "CTA with gradient background",
        props: {
          variant: "gradient",
          title: "Ready to Get Started?",
          subtitle: "Join thousands of developers building amazing websites",
          primaryCTA: "Start Building",
          secondaryCTA: "Learn More",
          showStats: true
        },
        preview: "/previews/cta-gradient.png",
        code: `<CTASection
  variant="gradient"
  title="Ready to Get Started?"
  subtitle="Join thousands of developers"
  primaryCTA="Start Building"
  showStats={true}
/>`
      },
      {
        id: "simple",
        name: "Simple CTA",
        description: "Clean, minimal CTA section",
        props: {
          variant: "simple",
          title: "Try It Today",
          subtitle: "Get started with our platform in minutes",
          primaryCTA: "Get Started",
          secondaryCTA: "Contact Sales",
          showStats: false
        },
        preview: "/previews/cta-simple.png",
        code: `<CTASection
  variant="simple"
  title="Try It Today"
  subtitle="Get started in minutes"
  primaryCTA="Get Started"
/>`
      }
    ],
    props: [
      {
        name: 'variant',
        type: 'select',
        options: ['simple', 'split', 'gradient', 'image-bg'],
        default: 'simple',
        description: 'CTA section style',
        required: true
      },
      {
        name: 'title',
        type: 'string',
        default: 'Ready to Get Started?',
        description: 'CTA section title',
        required: true
      },
      {
        name: 'subtitle',
        type: 'string',
        default: 'Join thousands of users',
        description: 'CTA section subtitle',
        required: true
      },
      {
        name: 'primaryCTA',
        type: 'string',
        default: 'Get Started',
        description: 'Primary button text',
        required: true
      },
      {
        name: 'secondaryCTA',
        type: 'string',
        default: 'Learn More',
        description: 'Secondary button text',
        required: false
      },
      {
        name: 'showStats',
        type: 'boolean',
        default: true,
        description: 'Display statistics',
        required: false
      }
    ],
    examples: [
      {
        id: 'landing-cta',
        name: 'Landing Page CTA',
        description: 'Perfect for landing pages',
        code: `<CTASection variant="gradient" showStats={true} />`,
        preview: '/examples/cta-landing.png'
      }
    ],
    features: {
      responsive: true,
      darkMode: true,
      animations: true,
      interactive: true,
      accessible: true,
      seoOptimized: true,
      performanceOptimized: true
    },
    accessibility: {
      wcagLevel: 'AA',
      screenReader: true,
      keyboardNavigation: true,
      ariaLabels: true,
      colorContrast: true
    },
    performance: {
      bundleSize: 7.6,
      renderScore: 94,
      memoryUsage: 'low'
    },
    seo: {
      semanticHtml: true,
      structuredData: true,
      openGraph: true,
      metaTags: true
    },
    complexity: 'beginner',
    premium: false,
    popularity: 96,
    lastUpdated: '2025-01-14',
    version: '2.2.0'
  },
  {
    id: "footer-section",
    name: "Footer Section",
    description: "Comprehensive footer with links, newsletter, and social media",
    category: "layout",
    subcategory: "footers",
    tags: ["footer", "links", "newsletter", "social", "navigation"],
    component: FooterSection,
    variants: [
      {
        id: "comprehensive",
        name: "Comprehensive Footer",
        description: "Full-featured footer with all elements",
        props: {
          variant: "comprehensive",
          showNewsletter: true,
          showSocial: true
        },
        preview: "/previews/footer-comprehensive.png",
        code: `<FooterSection
  variant="comprehensive"
  showNewsletter={true}
  showSocial={true}
/>`
      },
      {
        id: "minimal",
        name: "Minimal Footer",
        description: "Simple, clean footer design",
        props: {
          variant: "minimal",
          showNewsletter: false,
          showSocial: true
        },
        preview: "/previews/footer-minimal.png",
        code: `<FooterSection
  variant="minimal"
  showSocial={true}
/>`
      }
    ],
    props: [
      {
        name: 'variant',
        type: 'select',
        options: ['simple', 'comprehensive', 'minimal'],
        default: 'comprehensive',
        description: 'Footer layout style',
        required: true
      },
      {
        name: 'showNewsletter',
        type: 'boolean',
        default: true,
        description: 'Include newsletter signup',
        required: false
      },
      {
        name: 'showSocial',
        type: 'boolean',
        default: true,
        description: 'Show social media links',
        required: false
      }
    ],
    examples: [
      {
        id: 'website-footer',
        name: 'Website Footer',
        description: 'Standard website footer',
        code: `<FooterSection variant="comprehensive" />`,
        preview: '/examples/footer-website.png'
      }
    ],
    features: {
      responsive: true,
      darkMode: true,
      animations: false,
      interactive: true,
      accessible: true,
      seoOptimized: true,
      performanceOptimized: true
    },
    accessibility: {
      wcagLevel: 'AA',
      screenReader: true,
      keyboardNavigation: true,
      ariaLabels: true,
      colorContrast: true
    },
    performance: {
      bundleSize: 13.2,
      renderScore: 89,
      memoryUsage: 'medium'
    },
    seo: {
      semanticHtml: true,
      structuredData: true,
      openGraph: false,
      metaTags: true
    },
    complexity: 'beginner',
    premium: false,
    popularity: 82,
    lastUpdated: '2025-01-01',
    version: '1.6.0'
  },
];
