import { ComponentType } from "react";
import React from "react";  
import { ComponentCategory } from "./categories";
import HeroSection from "@/components/ModernWebsiteComponents/HeroSection";



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

export interface ComponentFeatures {
  responsive: boolean;
  darkMode: boolean;
  animations: boolean;
  interactive: boolean;
  accessible: boolean;
  seoOptimized: boolean;
  performanceOptimized: boolean;
}

// Component registry with modern website components
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
          backgroundVideo: false,
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
          backgroundVideo: false,
        },
        preview: "/previews/hero-split.png",
        code: `<HeroSection
  variant="split"
  title="Modern Design System"
  subtitle="Professional components for rapid development"
  primaryCTA="Start Building"
  showImage={true}
/>`,
      },
    ],
    props: [
      {
        name: "variant",
        type: "select",
        options: ["centered", "split", "video-bg", "gradient", "minimal"],
        default: "centered",
        description: "Hero section layout variant",
      },
      {
        name: "title",
        type: "string",
        default: "Build Amazing Websites",
        description: "Main hero title",
      },
      {
        name: "subtitle",
        type: "string",
        default: "Create stunning, responsive websites",
        description: "Hero subtitle/description",
      },
    ],
    features: {
      responsive: true,
      darkMode: true,
      animations: true,
      interactive: true,
      accessible: true,
      seoOptimized: true,
      performanceOptimized: true,
    },
    accessibility: {
      wcagLevel: "AA",
      screenReader: true,
      keyboardNavigation: true,
      ariaLabels: true,
      colorContrast: true,
    },
    performance: {
      bundleSize: 12.5,
      renderScore: 95,
      memoryUsage: "low",
    },
    seo: {
      semanticHtml: true,
      structuredData: true,
      openGraph: true,
      metaTags: true,
    },
    complexity: "beginner",
    premium: false,
    popularity: 98,
    lastUpdated: "2025-01-15",
    version: "2.1.0",
    examples: []
  },
  
  
  // ... Additional components
];

//  premium: false,
//     popularity: 98,
//     lastUpdated: "2025-01-15",
//     version: "2.1.0",
//     examples: []
//   },
  
  
//   // ... Additional components
// ];