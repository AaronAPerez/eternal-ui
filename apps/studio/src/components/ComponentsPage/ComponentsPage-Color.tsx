'use client';

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import {
  Search, Filter, Grid, List, Star, Download, Eye, Code, Zap, Accessibility,
  Smartphone, Palette, ChevronDown, ChevronRight, Play, Pause, RotateCcw,
  Copy, Check, Edit, Plus, Trash2, Move, Monitor, Tablet, MousePointer,
  Type, Square, Layout, Navigation, FileText, FormInput, BarChart3,
  ShoppingCart, MessageSquare, Bell, Image, Video, Music, Heart,
  Settings, Sun, Moon, Layers, Grab, Save, X, AlertCircle, Info
} from 'lucide-react';

// =================================================================
// TYPES AND INTERFACES
// =================================================================

interface ComponentMeta {
  id: string;
  name: string;
  description: string;
  category: 'layout' | 'navigation' | 'content' | 'forms' | 'data' | 'interactive' | 'ecommerce' | 'marketing' | 'social' | 'media';
  tags: string[];
  complexity: 'beginner' | 'intermediate' | 'advanced';
  popularity: number;
  isPremium: boolean;
  propsSchema: Record<string, PropSchema>;
  defaultProps: Record<string, any>;
  codeExample: string;
  bundleSize: number;
  renderScore: number;
  wcagLevel: 'A' | 'AA' | 'AAA';
  rating: number;
  downloadCount: number;
  lastUpdated: string;
  component: React.ComponentType<any>;
}

interface PropSchema {
  type: 'string' | 'number' | 'boolean' | 'color' | 'select' | 'slider' | 'textarea' | 'image';
  label: string;
  description?: string;
  default?: any;
  options?: Array<{ label: string; value: any }>;
  min?: number;
  max?: number;
  required?: boolean;
}

interface PageSection {
  id: string;
  componentId: string;
  props: Record<string, any>;
  styles: {
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
    boxShadow?: string;
  };
  order: number;
}

interface SelectedElement {
  id: string;
  type: 'text' | 'component' | 'background';
  elementRef: HTMLElement | null;
}

// =================================================================
// REAL WORLD COMPONENTS
// =================================================================

// Hero Section Component
const HeroSection: React.FC<{
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
  variant: string;
}> = ({ title, subtitle, ctaText, ctaUrl, backgroundImage, backgroundColor = '#6366F1', textColor = '#FFFFFF', variant }) => {
  const backgroundStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor };

  return (
    <section
      className={`relative py-20 px-6 text-center ${variant === 'minimal' ? 'py-12' : 'py-20'}`}
      style={{ ...backgroundStyle, color: textColor }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className={`font-bold mb-6 ${variant === 'minimal' ? 'text-2xl md:text-3xl' : 'text-4xl md:text-6xl'}`}>
          {title}
        </h1>
        <p className={`mb-8 opacity-90 ${variant === 'minimal' ? 'text-base' : 'text-xl md:text-2xl'}`}>
          {subtitle}
        </p>
        <button
          className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          style={{ backgroundColor: textColor, color: backgroundColor }}
        >
          {ctaText}
        </button>
      </div>
    </section>
  );
};

// Feature Grid Component
const FeatureGrid: React.FC<{
  title: string;
  subtitle: string;
  features: number;
  layout: string;
  style: string;
  accentColor: string;
  backgroundColor?: string;
  textColor?: string;
}> = ({ title, subtitle, features, layout, style, accentColor, backgroundColor = '#F9FAFB', textColor = '#111827' }) => {
  const defaultFeatures = [
    { icon: '🚀', title: 'Lightning Fast', description: 'Optimized for speed and performance' },
    { icon: '🎨', title: 'Beautiful Design', description: 'Modern and clean interface' },
    { icon: '🔧', title: 'Easy to Use', description: 'Intuitive drag-and-drop builder' },
    { icon: '📱', title: 'Mobile Ready', description: 'Responsive on all devices' },
    { icon: '⚡', title: 'Real-time Sync', description: 'Collaborate with your team' },
    { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security' },
    { icon: '🎯', title: 'Targeted', description: 'Built for your specific needs' },
    { icon: '💰', title: 'Cost Effective', description: 'Save time and money' }
  ];

  const gridCols = layout === 'grid-2' ? 'grid-cols-1 md:grid-cols-2' :
    layout === 'grid-3' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
      'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';

  return (
    <section
      className="py-16 px-6"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className={`grid ${gridCols} gap-8`}>
          {defaultFeatures.slice(0, features).map((feature, index) => (
            <div
              key={index}
              className={
                style === 'cards'
                  ? 'bg-white bg-opacity-80 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow'
                  : style === 'minimal'
                    ? 'text-center'
                    : 'bg-white bg-opacity-60 p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors'
              }
            >
              {style === 'icons' && (
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto"
                  style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                >
                  <span className="text-2xl">{feature.icon}</span>
                </div>
              )}
              <div className={style === 'minimal' ? 'text-center' : ''}>
                {style !== 'icons' && (
                  <span className="text-3xl mb-4 block">{feature.icon}</span>
                )}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="opacity-80">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Stats Counter Component
const StatsCounter: React.FC<{
  title: string;
  subtitle: string;
  layout: string;
  accentColor: string;
  backgroundColor?: string;
  textColor?: string;
}> = ({ title, subtitle, layout, accentColor, backgroundColor = '#FFFFFF', textColor = '#111827' }) => {
  const stats = [
    { label: 'Happy Customers', value: 10000, suffix: '+' },
    { label: 'Projects Completed', value: 2500, suffix: '+' },
    { label: 'Years Experience', value: 15, suffix: '' },
    { label: 'Team Members', value: 50, suffix: '+' }
  ];

  return (
    <section
      className="py-16 px-6"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className={`text-center ${layout === 'cards' ?
              'bg-white bg-opacity-80 p-6 rounded-lg shadow-lg' : ''}`}>
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: accentColor }}>
                {stat.value.toLocaleString()}{stat.suffix}
              </div>
              <div className="font-medium opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Form Component
const ContactForm: React.FC<{
  title: string;
  subtitle: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor: string;
}> = ({ title, subtitle, backgroundColor = '#F3F4F6', textColor = '#111827', accentColor }) => {
  return (
    <section
      className="py-16 px-6"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl opacity-80">{subtitle}</p>
        </div>

        <form className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: accentColor }}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

// =================================================================
// COMPONENT LIBRARY DATA
// =================================================================

const ENHANCED_COMPONENT_LIBRARY: ComponentMeta[] = [
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
      title: { type: 'string', label: 'Hero Title', default: 'Welcome to Our Platform', required: true },
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
      title: { type: 'string', label: 'Section Title', default: 'Why Choose Us', required: true },
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
      title: { type: 'string', label: 'Section Title', default: 'Our Achievements', required: true },
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
      title: { type: 'string', label: 'Form Title', default: 'Contact Us', required: true },
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

// =================================================================
// MAIN COMPONENT
// =================================================================

export default function EnhancedComponentsPage() {
  // State management
  const [selectedComponent, setSelectedComponent] = useState<ComponentMeta | null>(
    ENHANCED_COMPONENT_LIBRARY[0] || null
  );
  const [props, setProps] = useState<Record<string, any>>(
    ENHANCED_COMPONENT_LIBRARY[0]?.defaultProps || {}
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showCode, setShowCode] = useState(false);
  const [isPropsOpen, setIsPropsOpen] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);

  // Quick Build Feature
  const [pageSections, setPageSections] = useState<PageSection[]>([]);
  const [isQuickBuildMode, setIsQuickBuildMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<SelectedElement | null>(null);

  // Inline editing
  const [editingElement, setEditingElement] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>('');

  const components = ENHANCED_COMPONENT_LIBRARY;

  // Filter components
  const filteredComponents = useMemo(() => {
    return components.filter(component => {
      const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, components]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = components.reduce((acc, component) => {
      if (!acc.includes(component.category)) {
        acc.push(component.category);
      }
      return acc;
    }, [] as string[]);
    return ['all', ...cats];
  }, [components]);

  // Handle component selection
  const handleComponentSelect = useCallback((component: ComponentMeta) => {
    setSelectedComponent(component);
    setProps(component.defaultProps);
    setShowCode(false);
  }, []);

  // Handle prop changes
  const handlePropChange = useCallback((key: string, value: any) => {
    setProps(prev => ({ ...prev, [key]: value }));
  }, []);

  // Handle favorites
  const toggleFavorite = useCallback((componentId: string) => {
    setFavorites(prev =>
      prev.includes(componentId)
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    );
  }, []);

  // Copy code to clipboard
  const copyCodeToClipboard = useCallback(async () => {
    if (selectedComponent) {
      try {
        await navigator.clipboard.writeText(selectedComponent.codeExample);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    }
  }, [selectedComponent]);

  // Quick Build Functions
  const addSectionToPage = useCallback((componentId: string) => {
    const component = components.find(c => c.id === componentId);
    if (component) {
      const newSection: PageSection = {
        id: `section-${Date.now()}`,
        componentId,
        props: { ...component.defaultProps },
        styles: {
          backgroundColor: component.defaultProps.backgroundColor || '#FFFFFF',
          textColor: component.defaultProps.textColor || '#111827',
          padding: '16px',
          margin: '0px'
        },
        order: pageSections.length
      };
      setPageSections(prev => [...prev, newSection]);
    }
  }, [components, pageSections.length]);

  const removeSectionFromPage = useCallback((sectionId: string) => {
    setPageSections(prev => prev.filter(section => section.id !== sectionId));
  }, []);

  const updateSectionProps = useCallback((sectionId: string, newProps: Record<string, any>) => {
    setPageSections(prev =>
      prev.map(section =>
        section.id === sectionId
          ? { ...section, props: { ...section.props, ...newProps } }
          : section
      )
    );
  }, []);

  const updateSectionStyles = useCallback((sectionId: string, newStyles: Record<string, any>) => {
    setPageSections(prev =>
      prev.map(section =>
        section.id === sectionId
          ? { ...section, styles: { ...section.styles, ...newStyles } }
          : section
      )
    );
  }, []);

  // Generate full page code
  const generatePageCode = useCallback(() => {
    const importStatements = Array.from(new Set(pageSections.map(section => {
      const component = components.find(c => c.id === section.componentId);
      return component ? `import { ${component.name.replace(/\s+/g, '')} } from '@/components/${component.name.replace(/\s+/g, '')}';` : '';
    }))).join('\n');

    const pageComponents = pageSections
      .sort((a, b) => a.order - b.order)
      .map(section => {
        const component = components.find(c => c.id === section.componentId);
        if (!component) return '';

        const componentName = component.name.replace(/\s+/g, '');
        const propsString = Object.entries(section.props)
          .map(([key, value]) => {
            if (typeof value === 'string') return `${key}="${value}"`;
            if (typeof value === 'number') return `${key}={${value}}`;
            if (typeof value === 'boolean') return `${key}={${value}}`;
            return `${key}="${value}"`;
          })
          .join('\n      ');

        return `    <${componentName}
      ${propsString}
    />`;
      })
      .join('\n\n');

    return `${importStatements}

export default function GeneratedPage() {
  return (
    <div className="min-h-screen">
${pageComponents}
    </div>
  );
}`;
  }, [pageSections, components]);

  // Copy page code
  const copyPageCode = useCallback(async () => {
    try {
      const pageCode = generatePageCode();
      await navigator.clipboard.writeText(pageCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy page code:', err);
    }
  }, [generatePageCode]);

  // Device preview dimensions
  const deviceDimensions = {
    desktop: { width: '100%', height: 'auto' },
    tablet: { width: '768px', height: 'auto' },
    mobile: { width: '375px', height: 'auto' }
  };

  // Render prop editor
  const renderPropEditor = useCallback((key: string, schema: PropSchema) => {
    const value = props[key] || schema.default;

    switch (schema.type) {
      case 'color':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={value}
              onChange={(e) => handlePropChange(key, e.target.value)}
              className="w-12 h-8 rounded border border-gray-300"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => handlePropChange(key, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handlePropChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {schema.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'slider':
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={schema.min}
              max={schema.max}
              value={value}
              onChange={(e) => handlePropChange(key, parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-600 text-center">{value}</div>
          </div>
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handlePropChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder={schema.label}
          />
        );

      case 'image':
        return (
          <div className="space-y-2">
            <input
              type="url"
              value={value || ''}
              onChange={(e) => handlePropChange(key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter image URL"
            />
            <button
              type="button"
              className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Image className="w-4 h-4 inline mr-2" />
              Upload Image
            </button>
          </div>
        );

      case 'string':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handlePropChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={schema.label}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handlePropChange(key, parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={schema.min}
            max={schema.max}
          />
        );

      case 'boolean':
        return (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handlePropChange(key, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{schema.label}</span>
          </label>
        );

      default:
        return null;
    }
  }, [props, handlePropChange]);

  if (!selectedComponent) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">No components available</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Left Sidebar - Component Library */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Components</h2>
            <button
              onClick={() => setIsQuickBuildMode(!isQuickBuildMode)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${isQuickBuildMode
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {isQuickBuildMode ? 'Exit Build' : 'Quick Build'}
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                }`}
            >
              <Grid className="w-4 h-4 mr-2" />
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                }`}
            >
              <List className="w-4 h-4 mr-2" />
              List
            </button>
          </div>
        </div>

        {/* Component List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className={`space-y-2 ${viewMode === 'grid' ? 'grid grid-cols-1 gap-2' : ''}`}>
            {filteredComponents.map((component) => (
              <div
                key={component.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedComponent?.id === component.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="flex-1"
                    onClick={() => handleComponentSelect(component)}
                  >
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{component.name}</h3>
                      {component.isPremium && (
                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                          Pro
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {component.description}
                    </p>

                    {viewMode === 'list' && (
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          {component.rating}
                        </span>
                        <span className="flex items-center">
                          <Download className="w-3 h-3 mr-1" />
                          {component.downloadCount.toLocaleString()}
                        </span>
                        <span className="flex items-center">
                          <Zap className="w-3 h-3 mr-1" />
                          {component.bundleSize}KB
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(component.id);
                      }}
                      className={`p-1 rounded transition-colors ${favorites.includes(component.id)
                        ? 'text-yellow-500'
                        : 'text-gray-400 hover:text-yellow-500'
                        }`}
                    >
                      <Star className="w-4 h-4" fill={favorites.includes(component.id) ? 'currentColor' : 'none'} />
                    </button>

                    {isQuickBuildMode && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addSectionToPage(component.id);
                        }}
                        className="p-1 rounded text-blue-500 hover:text-blue-700 transition-colors"
                        title="Add to page"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Component Preview */}
        <div className="flex-1 flex flex-col">
          {/* Preview Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{selectedComponent.name}</h1>
                <p className="text-sm text-gray-600 mt-1">{selectedComponent.description}</p>
              </div>

              <div className="flex items-center space-x-2">
                {/* Device Mode Toggle */}
                <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setDeviceMode('desktop')}
                    className={`p-2 rounded transition-colors ${deviceMode === 'desktop' ? 'bg-white shadow-sm' : ''}`}
                    title="Desktop view"
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeviceMode('tablet')}
                    className={`p-2 rounded transition-colors ${deviceMode === 'tablet' ? 'bg-white shadow-sm' : ''}`}
                    title="Tablet view"
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeviceMode('mobile')}
                    className={`p-2 rounded transition-colors ${deviceMode === 'mobile' ? 'bg-white shadow-sm' : ''}`}
                    title="Mobile view"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => setShowCode(!showCode)}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${showCode
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <Code className="w-4 h-4 mr-2" />
                  {showCode ? 'Hide Code' : 'Show Code'}
                </button>

                {isQuickBuildMode && (
                  <button
                    onClick={copyPageCode}
                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                  >
                    {copiedCode ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copiedCode ? 'Copied!' : 'Copy Page'}
                  </button>
                )}

                <button
                  onClick={copyCodeToClipboard}
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                >
                  {copiedCode ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copiedCode ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
            </div>

            {/* Component Stats */}
            <div className="flex items-center space-x-6 mt-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                <span>{selectedComponent.rating}/5</span>
              </div>
              <div className="flex items-center">
                <Download className="w-4 h-4 mr-1" />
                <span>{selectedComponent.downloadCount.toLocaleString()} downloads</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-1" />
                <span>{selectedComponent.bundleSize}KB bundle</span>
              </div>
              <div className="flex items-center">
                <Accessibility className="w-4 h-4 mr-1" />
                <span>WCAG {selectedComponent.wcagLevel}</span>
              </div>
              <div className="flex items-center">
                <Smartphone className="w-4 h-4 mr-1" />
                <span>Responsive</span>
              </div>
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-auto bg-gray-100">
            {showCode ? (
              <div className="p-6">
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="bg-gray-800 px-4 py-2 text-white text-sm font-medium flex items-center justify-between">
                    <span>{isQuickBuildMode ? 'Complete Page Code' : 'React Component Code'}</span>
                    <button
                      onClick={isQuickBuildMode ? copyPageCode : copyCodeToClipboard}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <pre className="p-4 text-green-400 text-sm overflow-x-auto">
                    <code>{isQuickBuildMode ? generatePageCode() : selectedComponent.codeExample}</code>
                  </pre>
                </div>

                {/* Usage Instructions */}
                <div className="mt-6 bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    {isQuickBuildMode ? 'Page Usage Instructions' : 'Component Usage Instructions'}
                  </h3>
                  <div className="text-blue-800 space-y-2">
                    {isQuickBuildMode ? (
                      <>
                        <p>1. Copy the complete page code above</p>
                        <p>2. Create a new React component file</p>
                        <p>3. Paste the code and ensure all component imports are available</p>
                        <p>4. The page includes all sections with your customizations</p>
                      </>
                    ) : (
                      <>
                        <p>1. Copy the component code above</p>
                        <p>2. Import the component in your React project</p>
                        <p>3. Use the props panel on the right to customize the component</p>
                        <p>4. The component is fully responsive and accessible</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 flex justify-center">
                {/* Responsive Preview Container */}
                <div
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 mx-auto"
                  style={{
                    ...deviceDimensions[deviceMode],
                    maxWidth: deviceMode === 'desktop' ? '100%' : deviceDimensions[deviceMode].width
                  }}
                >
                  {isQuickBuildMode ? (
                    // Quick Build Mode - Show full page preview
                    <div className="min-h-screen">
                      {pageSections.length === 0 ? (
                        <div className="flex items-center justify-center h-64 text-gray-500">
                          <div className="text-center">
                            <Layers className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p className="text-lg font-medium mb-2">No sections added yet</p>
                            <p className="text-sm">Click the + button on components to add them to your page</p>
                          </div>
                        </div>
                      ) : (
                        pageSections
                          .sort((a, b) => a.order - b.order)
                          .map((section) => {
                            const component = components.find(c => c.id === section.componentId);
                            if (!component) return null;

                            return (
                              <div
                                key={section.id}
                                className="relative group"
                                style={section.styles}
                              >
                                {/* Section Controls */}
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-lg shadow-lg border border-gray-200 flex items-center z-10">
                                  <button
                                    onClick={() => setSelectedElement({ id: section.id, type: 'component', elementRef: null })}
                                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                                    title="Edit section"
                                  >
                                    <Settings className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => removeSectionFromPage(section.id)}
                                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                                    title="Remove section"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>

                                <component.component {...section.props} />
                              </div>
                            );
                          })
                      )}
                    </div>
                  ) : (
                    // Single Component Preview
                    <div className="min-h-96">
                      {selectedComponent.component && (
                        <selectedComponent.component {...props} />
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Props Editor */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={() => setIsPropsOpen(!isPropsOpen)}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {isQuickBuildMode ? 'Page Builder' : 'Component Props'}
              </h3>
              {isPropsOpen ? (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>

          {isPropsOpen && (
            <div className="flex-1 overflow-y-auto p-4">
              {isQuickBuildMode ? (
                // Quick Build Panel
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Page Sections</h4>
                    {pageSections.length === 0 ? (
                      <p className="text-sm text-gray-500">No sections added yet. Use the + button on components to add them.</p>
                    ) : (
                      <div className="space-y-2">
                        {pageSections
                          .sort((a, b) => a.order - b.order)
                          .map((section) => {
                            const component = components.find(c => c.id === section.componentId);
                            return (
                              <div
                                key={section.id}
                                className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedElement?.id === section.id
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                onClick={() => setSelectedElement({ id: section.id, type: 'component', elementRef: null })}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium">{component?.name}</span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeSectionFromPage(section.id);
                                    }}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Component Props Editor
                <div className="space-y-4">
                  {Object.entries(selectedComponent.propsSchema).map(([key, schema]) => (
                    <div key={key} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {schema.label}
                        {schema.description && (
                          <span className="block text-xs text-gray-500 font-normal mt-1">
                            {schema.description}
                          </span>
                        )}
                      </label>
                      {renderPropEditor(key, schema)}
                    </div>
                  ))}

                  {/* Quick Actions */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => setProps(selectedComponent.defaultProps)}
                        className="w-full flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset to Default
                      </button>

                      <button
                        onClick={() => toggleFavorite(selectedComponent.id)}
                        className={`w-full flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${favorites.includes(selectedComponent.id)
                          ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                          : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-50'
                          }`}
                      >
                        <Star
                          className="w-4 h-4 mr-2"
                          fill={favorites.includes(selectedComponent.id) ? 'currentColor' : 'none'}
                        />
                        {favorites.includes(selectedComponent.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                      </button>

                      {isQuickBuildMode && (
                        <button
                          onClick={() => addSectionToPage(selectedComponent.id)}
                          className="w-full flex items-center justify-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add to Page
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Component Info */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Information</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Category:</span>
                        <span className="text-gray-700 capitalize">{selectedComponent.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Complexity:</span>
                        <span className="text-gray-700 capitalize">{selectedComponent.complexity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Popularity:</span>
                        <span className="text-gray-700">{selectedComponent.popularity}/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Bundle Size:</span>
                        <span className="text-gray-700">{selectedComponent.bundleSize}KB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">WCAG Level:</span>
                        <span className="text-gray-700">{selectedComponent.wcagLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Downloads:</span>
                        <span className="text-gray-700">{selectedComponent.downloadCount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {copiedCode && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center">
          <Check className="w-4 h-4 mr-2" />
          <span>Code copied to clipboard!</span>
        </div>
      )}

      {/* Quick Build Instructions Overlay */}
      {isQuickBuildMode && pageSections.length === 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-40 pointer-events-none">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl pointer-events-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Build Mode Active</h3>
              <p className="text-gray-600 mb-4">
                Start building your page by clicking the + button next to any component in the sidebar.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Plus className="w-4 h-4 mr-2 text-blue-500" />
                    <span>Add sections to build your page</span>
                  </div>
                  <div className="flex items-center">
                    <Settings className="w-4 h-4 mr-2 text-blue-500" />
                    <span>Customize each section individually</span>
                  </div>
                  <div className="flex items-center">
                    <Copy className="w-4 h-4 mr-2 text-blue-500" />
                    <span>Export complete page code when done</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsQuickBuildMode(false)}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Exit Quick Build Mode
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
