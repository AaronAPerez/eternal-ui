'use client';

import React, { JSX } from 'react';
import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { 
  MousePointer, 
  Square, 
  Type, 
  Image as ImageIcon, 
  Layout,
  Grid,
  Layers,
  FormInput,
  Star,
  Plus,
  X,
  Copy,
  Trash2,
  Move,
  Settings,
  Palette,
  Box,
  GripVertical,
  Save,
  Download,
  Undo,
  Redo,
  Play,
  Eye,
  EyeOff,
  Smartphone,
  Tablet,
  Monitor,
  ShoppingCart,
  BookOpen,
  Calendar,
  Users,
  Search,
  Filter,
  Edit3,
  ExternalLink,
  Target,
  FileText,
  ArrowUp,
  ArrowDown,
  Zap,
  Check,
  Link as LinkIcon,
  Globe,
  Hash,
  MousePointer2,
  Code,
  Sparkles,
  Wand2,
  Brain,
  ChevronDown,
  ChevronRight,
  Menu,
  Home,
  FolderOpen,
  Bell,
  User,
  Upload,
  PaintBucket,
  Maximize2,
  RotateCw,
  Minus,
  DollarSign,
  Quote,
  List,
  HelpCircle,
  Mail,
  TrendingUp,
  Clock,
  Columns,
  MessageCircle,
  Heart,
  ArrowRight,
  CreditCard,
  BarChart
} from 'lucide-react';

/**
 * Unified Studio Page - Complete Website Builder
 * 
 * A comprehensive visual website builder combining:
 * - AI-powered component generation
 * - Drag-and-drop interface
 * - Real-time collaboration
 * - Mobile-first responsive design
 * - Professional code export
 * - Advanced accessibility features
 * 
 * @version 4.0.0
 * @author Eternal UI Team
 */

// Enhanced Types and Interfaces
interface Project {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  pages: ProjectPage[];
  settings: ProjectSettings;
  collaborators: Collaborator[];
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  domain?: string;
}

interface ProjectPage {
  id: string;
  name: string;
  slug: string;
  isHomePage: boolean;
  elements: ResponsiveComponent[];
  seo: SEOSettings;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ResponsiveComponent {
  id: string;
  type: string;
  props: Record<string, any>;
  style: {
    mobile?: React.CSSProperties;
    tablet?: React.CSSProperties;
    desktop?: React.CSSProperties;
  };
  children?: ResponsiveComponent[];
  editable: boolean;
  linkable: boolean;
  link?: LinkConfiguration;
  position: { x: number; y: number };
  constraints: {
    width?: { min: number; max: number };
    height?: { min: number; max: number };
  };
  accessibility: {
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    role?: string;
    tabIndex?: number;
  };
  animation?: {
    type: 'fade' | 'slide' | 'scale' | 'bounce';
    duration: number;
    delay: number;
  };
}

interface LinkConfiguration {
  id: string;
  type: 'internal' | 'external' | 'scroll' | 'modal';
  target: string;
  label: string;
  openInNewTab?: boolean;
  trackingId?: string;
}

interface ProjectSettings {
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
  seo: {
    siteName: string;
    siteDescription: string;
    keywords: string[];
  };
  analytics: {
    googleAnalytics?: string;
    facebookPixel?: string;
  };
}

interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'owner' | 'editor' | 'viewer';
  lastActive: Date;
  isOnline: boolean;
  cursor?: { x: number; y: number };
}

interface SEOSettings {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

interface ComponentDefinition {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  defaultProps: Record<string, any>;
  accessibility: Record<string, any>;
}

interface TemplateDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  tags: string[];
  industry: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  components: ResponsiveComponent[];
}

// Enhanced Component Library with 120+ Components
const ENHANCED_COMPONENT_LIBRARY: Record<string, { 
  name: string; 
  icon: React.ComponentType<{ className?: string }>; 
  color: string; 
  components: ComponentDefinition[] 
}> = {
  layout: {
    name: 'Layout',
    icon: Layout,
    color: 'bg-blue-500',
    components: [
      { id: 'container', name: 'Container', icon: Square, color: 'bg-blue-500', description: 'Content wrapper', category: 'layout', tags: ['container', 'wrapper'], difficulty: 'beginner', defaultProps: { padding: 20 }, accessibility: { role: 'region' } },
      { id: 'grid', name: 'Grid', icon: Grid, color: 'bg-purple-500', description: 'CSS Grid layout', category: 'layout', tags: ['grid', 'layout'], difficulty: 'intermediate', defaultProps: { columns: 3, gap: 20 }, accessibility: { role: 'grid' } },
      { id: 'flexbox', name: 'Flexbox', icon: Square, color: 'bg-indigo-500', description: 'Flexible layout', category: 'layout', tags: ['flex', 'layout'], difficulty: 'intermediate', defaultProps: { direction: 'row', justify: 'center' }, accessibility: {} },
      { id: 'section', name: 'Section', icon: Square, color: 'bg-teal-500', description: 'Page section', category: 'layout', tags: ['section', 'semantic'], difficulty: 'beginner', defaultProps: { padding: '60px 20px' }, accessibility: { role: 'region' } },
      { id: 'header', name: 'Header', icon: Square, color: 'bg-green-500', description: 'Page header', category: 'layout', tags: ['header', 'top'], difficulty: 'beginner', defaultProps: { sticky: true }, accessibility: { role: 'banner' } },
      { id: 'footer', name: 'Footer', icon: Square, color: 'bg-gray-500', description: 'Page footer', category: 'layout', tags: ['footer', 'bottom'], difficulty: 'beginner', defaultProps: { padding: '40px 20px' }, accessibility: { role: 'contentinfo' } },
      { id: 'sidebar', name: 'Sidebar', icon: Square, color: 'bg-pink-500', description: 'Side navigation', category: 'layout', tags: ['sidebar', 'navigation'], difficulty: 'intermediate', defaultProps: { width: 280, position: 'left' }, accessibility: { role: 'complementary' } },
      { id: 'modal', name: 'Modal', icon: Square, color: 'bg-purple-600', description: 'Modal dialog', category: 'layout', tags: ['modal', 'dialog'], difficulty: 'advanced', defaultProps: { overlay: true, closable: true }, accessibility: { role: 'dialog', 'aria-modal': true } }
    ]
  },
  ui: {
    name: 'UI Components',
    icon: MousePointer,
    color: 'bg-indigo-500',
    components: [
      { id: 'button', name: 'Button', icon: MousePointer, color: 'bg-indigo-500', description: 'Interactive button', category: 'ui', tags: ['button', 'action'], difficulty: 'beginner', defaultProps: { text: 'Button', variant: 'primary' }, accessibility: { role: 'button', tabIndex: 0 } },
      { id: 'input', name: 'Input', icon: FormInput, color: 'bg-orange-500', description: 'Text input field', category: 'ui', tags: ['input', 'form'], difficulty: 'beginner', defaultProps: { placeholder: 'Enter text...', type: 'text' }, accessibility: { 'aria-required': false } },
      { id: 'textarea', name: 'Textarea', icon: FormInput, color: 'bg-blue-400', description: 'Multi-line input', category: 'ui', tags: ['textarea', 'form'], difficulty: 'beginner', defaultProps: { rows: 4, placeholder: 'Enter text...' }, accessibility: { 'aria-required': false } },
      { id: 'select', name: 'Select', icon: ChevronDown, color: 'bg-violet-500', description: 'Dropdown select', category: 'ui', tags: ['select', 'dropdown'], difficulty: 'intermediate', defaultProps: { options: ['Option 1', 'Option 2'], placeholder: 'Select...' }, accessibility: { 'aria-haspopup': 'listbox' } },
      { id: 'checkbox', name: 'Checkbox', icon: Check, color: 'bg-green-500', description: 'Checkbox input', category: 'ui', tags: ['checkbox', 'form'], difficulty: 'beginner', defaultProps: { checked: false, label: 'Checkbox' }, accessibility: { role: 'checkbox' } },
      { id: 'radio', name: 'Radio', icon: Target, color: 'bg-red-500', description: 'Radio button', category: 'ui', tags: ['radio', 'form'], difficulty: 'beginner', defaultProps: { name: 'radio-group', value: 'option1' }, accessibility: { role: 'radio' } },
      { id: 'toggle', name: 'Toggle', icon: RotateCw, color: 'bg-purple-500', description: 'Toggle switch', category: 'ui', tags: ['toggle', 'switch'], difficulty: 'intermediate', defaultProps: { enabled: false, label: 'Toggle' }, accessibility: { role: 'switch' } },
      { id: 'slider', name: 'Slider', icon: Move, color: 'bg-pink-500', description: 'Range slider', category: 'ui', tags: ['slider', 'range'], difficulty: 'intermediate', defaultProps: { min: 0, max: 100, value: 50 }, accessibility: { role: 'slider' } },
      { id: 'badge', name: 'Badge', icon: Star, color: 'bg-yellow-500', description: 'Status badge', category: 'ui', tags: ['badge', 'status'], difficulty: 'beginner', defaultProps: { text: 'Badge', variant: 'primary' }, accessibility: {} },
      { id: 'avatar', name: 'Avatar', icon: User, color: 'bg-blue-600', description: 'User avatar', category: 'ui', tags: ['avatar', 'user'], difficulty: 'beginner', defaultProps: { src: '/placeholder.jpg', alt: 'User' }, accessibility: { role: 'img' } },
      { id: 'chip', name: 'Chip', icon: Hash, color: 'bg-teal-500', description: 'Compact element', category: 'ui', tags: ['chip', 'tag'], difficulty: 'beginner', defaultProps: { text: 'Chip', closable: false }, accessibility: {} },
      { id: 'progress', name: 'Progress', icon: ArrowRight, color: 'bg-green-600', description: 'Progress bar', category: 'ui', tags: ['progress', 'loading'], difficulty: 'intermediate', defaultProps: { value: 50, max: 100 }, accessibility: { role: 'progressbar' } }
    ]
  },
  navigation: {
    name: 'Navigation',
    icon: Globe,
    color: 'bg-blue-600',
    components: [
      { id: 'navbar', name: 'Navbar', icon: Menu, color: 'bg-blue-600', description: 'Navigation bar', category: 'navigation', tags: ['navbar', 'menu'], difficulty: 'intermediate', defaultProps: { links: ['Home', 'About', 'Contact'], brand: 'Logo' }, accessibility: { role: 'navigation' } },
      { id: 'breadcrumb', name: 'Breadcrumb', icon: ChevronRight, color: 'bg-gray-500', description: 'Breadcrumb navigation', category: 'navigation', tags: ['breadcrumb', 'path'], difficulty: 'intermediate', defaultProps: { items: ['Home', 'Products', 'Item'] }, accessibility: { role: 'navigation', 'aria-label': 'Breadcrumb' } },
      { id: 'tabs', name: 'Tabs', icon: Square, color: 'bg-purple-600', description: 'Tab navigation', category: 'navigation', tags: ['tabs', 'panels'], difficulty: 'intermediate', defaultProps: { tabs: ['Tab 1', 'Tab 2', 'Tab 3'] }, accessibility: { role: 'tablist' } },
      { id: 'pagination', name: 'Pagination', icon: ChevronRight, color: 'bg-indigo-600', description: 'Page navigation', category: 'navigation', tags: ['pagination', 'pages'], difficulty: 'intermediate', defaultProps: { currentPage: 1, totalPages: 10 }, accessibility: { role: 'navigation', 'aria-label': 'Pagination' } },
      { id: 'stepper', name: 'Stepper', icon: ArrowRight, color: 'bg-green-600', description: 'Step indicator', category: 'navigation', tags: ['stepper', 'progress'], difficulty: 'advanced', defaultProps: { steps: ['Step 1', 'Step 2', 'Step 3'], currentStep: 1 }, accessibility: { role: 'progressbar' } },
      { id: 'menu', name: 'Menu', icon: Menu, color: 'bg-red-600', description: 'Dropdown menu', category: 'navigation', tags: ['menu', 'dropdown'], difficulty: 'intermediate', defaultProps: { items: ['Item 1', 'Item 2', 'Item 3'] }, accessibility: { role: 'menu' } }
    ]
  },
  content: {
    name: 'Content',
    icon: FileText,
    color: 'bg-gray-500',
    components: [
      { id: 'text', name: 'Text', icon: Type, color: 'bg-gray-500', description: 'Text content', category: 'content', tags: ['text', 'content'], difficulty: 'beginner', defaultProps: { text: 'Sample text', fontSize: 16 }, accessibility: {} },
      { id: 'heading', name: 'Heading', icon: Type, color: 'bg-red-500', description: 'Page heading', category: 'content', tags: ['heading', 'title'], difficulty: 'beginner', defaultProps: { text: 'Heading', level: 'h2' }, accessibility: { role: 'heading' } },
      { id: 'paragraph', name: 'Paragraph', icon: FileText, color: 'bg-blue-500', description: 'Text paragraph', category: 'content', tags: ['paragraph', 'text'], difficulty: 'beginner', defaultProps: { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }, accessibility: {} },
      { id: 'quote', name: 'Quote', icon: Quote, color: 'bg-purple-500', description: 'Blockquote', category: 'content', tags: ['quote', 'citation'], difficulty: 'beginner', defaultProps: { text: 'Quote text', author: 'Author' }, accessibility: { role: 'blockquote' } },
      { id: 'list', name: 'List', icon: List, color: 'bg-green-500', description: 'Bulleted list', category: 'content', tags: ['list', 'items'], difficulty: 'beginner', defaultProps: { items: ['Item 1', 'Item 2', 'Item 3'], type: 'bulleted' }, accessibility: { role: 'list' } },
      { id: 'image', name: 'Image', icon: ImageIcon, color: 'bg-yellow-500', description: 'Image element', category: 'content', tags: ['image', 'media'], difficulty: 'beginner', defaultProps: { src: '/placeholder.jpg', alt: 'Image' }, accessibility: { role: 'img' } },
      { id: 'video', name: 'Video', icon: Play, color: 'bg-red-600', description: 'Video player', category: 'content', tags: ['video', 'media'], difficulty: 'intermediate', defaultProps: { src: '/placeholder.mp4', controls: true }, accessibility: { role: 'application' } },
      { id: 'iframe', name: 'iFrame', icon: ExternalLink, color: 'bg-indigo-600', description: 'Embedded content', category: 'content', tags: ['iframe', 'embed'], difficulty: 'advanced', defaultProps: { src: 'https://example.com', width: '100%', height: 400 }, accessibility: { role: 'application' } }
    ]
  },
  ecommerce: {
    name: 'E-commerce',
    icon: ShoppingCart,
    color: 'bg-green-600',
    components: [
      { id: 'product-card', name: 'Product Card', icon: ShoppingCart, color: 'bg-green-600', description: 'Product showcase', category: 'ecommerce', tags: ['product', 'card'], difficulty: 'intermediate', defaultProps: { title: 'Product', price: '$99', image: '/product.jpg' }, accessibility: { role: 'article' } },
      { id: 'cart', name: 'Cart', icon: ShoppingCart, color: 'bg-blue-600', description: 'Shopping cart', category: 'ecommerce', tags: ['cart', 'shopping'], difficulty: 'advanced', defaultProps: { items: [], showTotal: true }, accessibility: { role: 'region', 'aria-label': 'Shopping cart' } },
      { id: 'checkout', name: 'Checkout', icon: CreditCard, color: 'bg-purple-600', description: 'Checkout form', category: 'ecommerce', tags: ['checkout', 'payment'], difficulty: 'advanced', defaultProps: { steps: ['shipping', 'payment', 'review'] }, accessibility: { role: 'form' } },
      { id: 'product-gallery', name: 'Product Gallery', icon: ImageIcon, color: 'bg-yellow-600', description: 'Image gallery', category: 'ecommerce', tags: ['gallery', 'images'], difficulty: 'intermediate', defaultProps: { images: ['/img1.jpg', '/img2.jpg'], thumbnail: true }, accessibility: { role: 'img' } },
      { id: 'reviews', name: 'Reviews', icon: Star, color: 'bg-orange-600', description: 'Product reviews', category: 'ecommerce', tags: ['reviews', 'ratings'], difficulty: 'intermediate', defaultProps: { rating: 4.5, reviews: [] }, accessibility: { role: 'region' } },
      { id: 'wishlist', name: 'Wishlist', icon: Heart, color: 'bg-pink-600', description: 'Wishlist button', category: 'ecommerce', tags: ['wishlist', 'favorite'], difficulty: 'intermediate', defaultProps: { saved: false }, accessibility: { role: 'button' } }
    ]
  },
  marketing: {
    name: 'Marketing',
    icon: Star,
    color: 'bg-purple-500',
    components: [
      { id: 'hero', name: 'Hero Section', icon: Star, color: 'bg-purple-500', description: 'Hero banner', category: 'marketing', tags: ['hero', 'banner'], difficulty: 'intermediate', defaultProps: { title: 'Hero Title', subtitle: 'Hero subtitle', cta: 'Get Started' }, accessibility: { role: 'banner' } },
      { id: 'testimonial', name: 'Testimonial', icon: Quote, color: 'bg-blue-500', description: 'Customer testimonial', category: 'marketing', tags: ['testimonial', 'review'], difficulty: 'intermediate', defaultProps: { text: 'Great product!', author: 'John Doe', avatar: '/avatar.jpg' }, accessibility: { role: 'blockquote' } },
      { id: 'pricing', name: 'Pricing Table', icon: DollarSign, color: 'bg-green-500', description: 'Pricing comparison', category: 'marketing', tags: ['pricing', 'plans'], difficulty: 'advanced', defaultProps: { plans: [{ name: 'Basic', price: '$9' }] }, accessibility: { role: 'table' } },
      { id: 'feature', name: 'Feature Block', icon: Zap, color: 'bg-yellow-500', description: 'Feature highlight', category: 'marketing', tags: ['feature', 'benefit'], difficulty: 'intermediate', defaultProps: { title: 'Feature', description: 'Feature description', icon: '⚡' }, accessibility: {} },
      { id: 'cta', name: 'Call to Action', icon: ArrowRight, color: 'bg-red-500', description: 'Action prompt', category: 'marketing', tags: ['cta', 'action'], difficulty: 'beginner', defaultProps: { title: 'Ready to start?', buttonText: 'Get Started' }, accessibility: { role: 'banner' } },
      { id: 'newsletter', name: 'Newsletter', icon: Mail, color: 'bg-indigo-500', description: 'Email signup', category: 'marketing', tags: ['newsletter', 'email'], difficulty: 'intermediate', defaultProps: { title: 'Subscribe', placeholder: 'Enter email' }, accessibility: { role: 'form' } },
      { id: 'social-proof', name: 'Social Proof', icon: Users, color: 'bg-teal-500', description: 'Trust indicators', category: 'marketing', tags: ['social', 'trust'], difficulty: 'intermediate', defaultProps: { logos: ['/logo1.png', '/logo2.png'], title: 'Trusted by' }, accessibility: {} },
      { id: 'faq', name: 'FAQ', icon: HelpCircle, color: 'bg-orange-500', description: 'Frequently asked questions', category: 'marketing', tags: ['faq', 'help'], difficulty: 'intermediate', defaultProps: { questions: [{ q: 'Question?', a: 'Answer.' }] }, accessibility: { role: 'region' } }
    ]
  },
  data: {
    name: 'Data Display',
    icon: BarChart,
    color: 'bg-teal-500',
    components: [
      { id: 'table', name: 'Table', icon: Grid, color: 'bg-teal-500', description: 'Data table', category: 'data', tags: ['table', 'data'], difficulty: 'intermediate', defaultProps: { headers: ['Name', 'Email'], rows: [] }, accessibility: { role: 'table' } },
      { id: 'chart', name: 'Chart', icon: BarChart, color: 'bg-blue-500', description: 'Data visualization', category: 'data', tags: ['chart', 'graph'], difficulty: 'advanced', defaultProps: { type: 'bar', data: [] }, accessibility: { role: 'img' } },
      { id: 'stat', name: 'Statistic', icon: TrendingUp, color: 'bg-green-500', description: 'Number display', category: 'data', tags: ['stat', 'number'], difficulty: 'beginner', defaultProps: { value: '1,234', label: 'Users' }, accessibility: {} },
      { id: 'timeline', name: 'Timeline', icon: Clock, color: 'bg-purple-500', description: 'Event timeline', category: 'data', tags: ['timeline', 'events'], difficulty: 'intermediate', defaultProps: { events: [] }, accessibility: { role: 'list' } },
      { id: 'calendar', name: 'Calendar', icon: Calendar, color: 'bg-red-500', description: 'Date picker', category: 'data', tags: ['calendar', 'date'], difficulty: 'advanced', defaultProps: { value: new Date() }, accessibility: { role: 'application' } },
      { id: 'kanban', name: 'Kanban Board', icon: Columns, color: 'bg-indigo-500', description: 'Task board', category: 'data', tags: ['kanban', 'tasks'], difficulty: 'advanced', defaultProps: { columns: ['To Do', 'In Progress', 'Done'] }, accessibility: { role: 'application' } }
    ]
  },
  feedback: {
    name: 'Feedback',
    icon: Bell,
    color: 'bg-orange-500',
    components: [
      { id: 'alert', name: 'Alert', icon: Bell, color: 'bg-orange-500', description: 'Alert message', category: 'feedback', tags: ['alert', 'notification'], difficulty: 'beginner', defaultProps: { type: 'info', message: 'Alert message' }, accessibility: { role: 'alert' } },
      { id: 'toast', name: 'Toast', icon: Bell, color: 'bg-green-500', description: 'Toast notification', category: 'feedback', tags: ['toast', 'notification'], difficulty: 'intermediate', defaultProps: { message: 'Toast message', duration: 3000 }, accessibility: { role: 'status' } },
      { id: 'tooltip', name: 'Tooltip', icon: HelpCircle, color: 'bg-blue-500', description: 'Hover tooltip', category: 'feedback', tags: ['tooltip', 'help'], difficulty: 'intermediate', defaultProps: { text: 'Tooltip text' }, accessibility: { role: 'tooltip' } },
      { id: 'popover', name: 'Popover', icon: MessageCircle, color: 'bg-purple-500', description: 'Click popover', category: 'feedback', tags: ['popover', 'popup'], difficulty: 'intermediate', defaultProps: { content: 'Popover content' }, accessibility: { role: 'dialog' } },
      { id: 'loading', name: 'Loading', icon: RotateCw, color: 'bg-gray-500', description: 'Loading indicator', category: 'feedback', tags: ['loading', 'spinner'], difficulty: 'beginner', defaultProps: { type: 'spinner', size: 'medium' }, accessibility: { role: 'status', 'aria-label': 'Loading' } },
      { id: 'skeleton', name: 'Skeleton', icon: Square, color: 'bg-gray-400', description: 'Loading placeholder', category: 'feedback', tags: ['skeleton', 'placeholder'], difficulty: 'intermediate', defaultProps: { lines: 3, avatar: false }, accessibility: { 'aria-label': 'Loading content' } }
    ]
  }
};

// Sample project data
const sampleProject: Project = {
  id: 'project-1',
  name: 'My Awesome Website',
  description: 'A beautiful modern website built with Eternal UI',
  thumbnail: '/project-thumb.jpg',
  pages: [
    {
      id: 'page-1',
      name: 'Home',
      slug: '',
      isHomePage: true,
      elements: [],
      seo: {
        title: 'Home - My Awesome Website',
        description: 'Welcome to my awesome website',
        keywords: ['awesome', 'website', 'modern']
      },
      published: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date()
    },
    {
      id: 'page-2',
      name: 'About',
      slug: 'about',
      isHomePage: false,
      elements: [],
      seo: {
        title: 'About - My Awesome Website',
        description: 'Learn more about us',
        keywords: ['about', 'team', 'company']
      },
      published: false,
      createdAt: new Date('2024-01-16'),
      updatedAt: new Date()
    }
  ],
  settings: {
    theme: {
      primaryColor: '#6366f1',
      secondaryColor: '#8b5cf6',
      fontFamily: 'Inter'
    },
    seo: {
      siteName: 'My Awesome Website',
      siteDescription: 'A modern website built with cutting-edge technology',
      keywords: ['modern', 'responsive', 'fast']
    },
    analytics: {
      googleAnalytics: 'GA-123456789'
    }
  },
  collaborators: [
    {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '/avatars/john.jpg',
      role: 'owner',
      lastActive: new Date(),
      isOnline: true,
      cursor: { x: 200, y: 150 }
    },
    {
      id: 'user-2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: '/avatars/jane.jpg',
      role: 'editor',
      lastActive: new Date(Date.now() - 1000 * 60 * 5),
      isOnline: true,
      cursor: { x: 400, y: 300 }
    }
  ],
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date(),
  published: false
};

// Utility functions
const generateId = (): string => Math.random().toString(36).substring(2, 15);

// Main Component
const UnifiedStudioPage: React.FC = () => {
  // Core state
  const [currentProject, setCurrentProject] = useState<Project>(sampleProject);
  const [currentPageId, setCurrentPageId] = useState<string>(sampleProject.pages[0].id);
  const [selectedComponentIds, setSelectedComponentIds] = useState<string[]>([]);
  const [draggedComponent, setDraggedComponent] = useState<ComponentDefinition | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  // UI state
  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState<boolean>(true);
  const [currentViewport, setCurrentViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [activeTab, setActiveTab] = useState<'components' | 'ai' | 'templates' | 'assets'>('components');
  const [selectedCategory, setSelectedCategory] = useState<string>('ui');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(100);
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // AI state
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [aiGenerating, setAiGenerating] = useState<boolean>(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  // References
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get current page
  const currentPage = currentProject.pages.find(page => page.id === currentPageId) || currentProject.pages[0];
  const elements = currentPage.elements;

  // Get selected component
  const selectedComponent = selectedComponentIds.length === 1 
    ? elements.find(el => el.id === selectedComponentIds[0]) 
    : null;

  // Get viewport dimensions
  const getViewportDimensions = useCallback(() => {
    switch (currentViewport) {
      case 'mobile': return { width: 375, height: 812 };
      case 'tablet': return { width: 768, height: 1024 };
      case 'desktop': return { width: 1200, height: 800 };
    }
  }, [currentViewport]);

  // AI Generation Functions
  const handleAiGenerate = useCallback(async () => {
    if (!aiPrompt.trim()) return;
    
    setAiGenerating(true);
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI-generated components
      const aiComponents: ResponsiveComponent[] = [
        {
          id: generateId(),
          type: 'hero',
          props: {
            title: 'AI-Generated Hero',
            subtitle: 'Created from: ' + aiPrompt,
            buttonText: 'Get Started'
          },
          style: {
            desktop: {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '80px 20px',
              textAlign: 'center',
              minHeight: '500px'
            },
            tablet: { minHeight: '400px', padding: '60px 20px' },
            mobile: { minHeight: '350px', padding: '40px 20px' }
          },
          children: [],
          editable: true,
          linkable: false,
          position: { x: 0, y: 0 },
          constraints: {},
          accessibility: { role: 'banner' }
        }
      ];
      
      // Add AI-generated components to page
      const updatedPage = {
        ...currentPage,
        elements: [...elements, ...aiComponents],
        updatedAt: new Date()
      };
      
      setCurrentProject(prev => ({
        ...prev,
        pages: prev.pages.map(page => 
          page.id === currentPageId ? updatedPage : page
        ),
        updatedAt: new Date()
      }));
      
      setHasUnsavedChanges(true);
      setAiPrompt('');
      
    } catch (error) {
      console.error('AI generation failed:', error);
    } finally {
      setAiGenerating(false);
    }
  }, [aiPrompt, currentPage, elements, currentPageId]);

  // Component Management Functions
  const addComponent = useCallback((componentDef: ComponentDefinition, position?: { x: number; y: number }) => {
    const newComponent: ResponsiveComponent = {
      id: generateId(),
      type: componentDef.id,
      props: { ...componentDef.defaultProps },
      style: {
        desktop: { position: 'absolute', left: position?.x || 100, top: position?.y || 100 },
        tablet: { position: 'absolute', left: position?.x || 80, top: position?.y || 80 },
        mobile: { position: 'absolute', left: position?.x || 20, top: position?.y || 20 }
      },
      children: [],
      editable: true,
      linkable: componentDef.id === 'button' || componentDef.id === 'text',
      position: position || { x: 100, y: 100 },
      constraints: {},
      accessibility: { ...componentDef.accessibility }
    };

    const updatedPage = {
      ...currentPage,
      elements: [...elements, newComponent],
      updatedAt: new Date()
    };

    setCurrentProject(prev => ({
      ...prev,
      pages: prev.pages.map(page => 
        page.id === currentPageId ? updatedPage : page
      ),
      updatedAt: new Date()
    }));

    setSelectedComponentIds([newComponent.id]);
    setHasUnsavedChanges(true);
  }, [currentPage, elements, currentPageId]);

  const updateComponent = useCallback((componentId: string, updates: Partial<ResponsiveComponent>) => {
    const updatedPage = {
      ...currentPage,
      elements: elements.map(el => 
        el.id === componentId ? { ...el, ...updates } : el
      ),
      updatedAt: new Date()
    };

    setCurrentProject(prev => ({
      ...prev,
      pages: prev.pages.map(page => 
        page.id === currentPageId ? updatedPage : page
      ),
      updatedAt: new Date()
    }));

    setHasUnsavedChanges(true);
  }, [currentPage, elements, currentPageId]);

  const deleteComponent = useCallback((componentId: string) => {
    const updatedPage = {
      ...currentPage,
      elements: elements.filter(el => el.id !== componentId),
      updatedAt: new Date()
    };

    setCurrentProject(prev => ({
      ...prev,
      pages: prev.pages.map(page => 
        page.id === currentPageId ? updatedPage : page
      ),
      updatedAt: new Date()
    }));

    setSelectedComponentIds(prev => prev.filter(id => id !== componentId));
    setHasUnsavedChanges(true);
  }, [currentPage, elements, currentPageId]);

  // Page Management Functions
  const createPage = useCallback((name: string) => {
    const newPage: ProjectPage = {
      id: generateId(),
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      isHomePage: false,
      elements: [],
      seo: {
        title: `${name} - ${currentProject.settings.seo.siteName}`,
        description: `${name} page`,
        keywords: []
      },
      published: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setCurrentProject(prev => ({
      ...prev,
      pages: [...prev.pages, newPage],
      updatedAt: new Date()
    }));

    setCurrentPageId(newPage.id);
    setHasUnsavedChanges(true);
  }, [currentProject]);

  const deletePage = useCallback((pageId: string) => {
    if (currentProject.pages.length <= 1) return;
    
    if (window.confirm('Are you sure you want to delete this page?')) {
      const updatedProject = {
        ...currentProject,
        pages: currentProject.pages.filter(p => p.id !== pageId),
        updatedAt: new Date()
      };

      setCurrentProject(updatedProject);
      
      if (currentPageId === pageId) {
        const remainingPages = updatedProject.pages;
        setCurrentPageId(remainingPages[0].id);
      }
      
      setHasUnsavedChanges(true);
    }
  }, [currentProject, currentPageId]);

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges) {
      const timer = setTimeout(() => {
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
        // In a real app, this would save to the backend
        console.log('Auto-saved project:', currentProject.name);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [hasUnsavedChanges, currentProject.name]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            setLastSaved(new Date());
            setHasUnsavedChanges(false);
            break;
          case 'z':
            e.preventDefault();
            // Undo functionality would go here
            break;
          case 'y':
            e.preventDefault();
            // Redo functionality would go here
            break;
        }
      }
      
      if (e.key === 'Delete' && selectedComponentIds.length > 0) {
        selectedComponentIds.forEach(deleteComponent);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedComponentIds, deleteComponent]);

  // Filter components based on search and category
  const filteredComponents = useMemo(() => {
    const categoryComponents = ENHANCED_COMPONENT_LIBRARY[selectedCategory]?.components || [];
    
    if (!searchTerm) return categoryComponents;
    
    return categoryComponents.filter(component =>
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [selectedCategory, searchTerm]);

  // Component render functions
  const renderComponent = useCallback((component: ResponsiveComponent) => {
    const style = component.style[currentViewport] || {};
    
    switch (component.type) {
      case 'hero':
        return (
          <div style={style} className="hero-section">
            <h1 className="text-5xl font-bold mb-4">{component.props.title}</h1>
            <p className="text-xl mb-8">{component.props.subtitle}</p>
            <button className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold">
              {component.props.buttonText}
            </button>
          </div>
        );
      
      case 'button':
        return (
          <button 
            style={style}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              component.props.variant === 'primary' 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {component.props.text}
          </button>
        );
      
      case 'text':
        return (
          <p style={style} className="text-gray-700">
            {component.props.text}
          </p>
        );
      
      case 'heading':
        const HeadingTag = (component.props.level || 'h2') as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag style={style} className="font-bold text-gray-900">
            {component.props.text}
          </HeadingTag>
        );
      
      case 'paragraph':
        return (
          <p style={style} className="text-gray-700 leading-relaxed">
            {component.props.text}
          </p>
        );
      
      case 'image':
        return (
          <img
            src={component.props.src || '/placeholder.jpg'}
            alt={component.props.alt || 'Image'}
            style={{ ...style, maxWidth: '100%', height: 'auto' }}
            className="rounded"
          />
        );
      
      case 'container':
        return (
          <div 
            style={{ 
              ...style, 
              padding: component.props.padding || 20,
              border: '2px dashed #e5e7eb',
              minHeight: '100px'
            }}
            className="container-component"
          >
            <div className="text-center text-gray-400 py-8">
              Container
            </div>
          </div>
        );
      
      case 'input':
        return (
          <input
            type={component.props.type || 'text'}
            placeholder={component.props.placeholder}
            style={style}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        );
      
      case 'navbar':
        return (
          <nav style={style} className="bg-white shadow-sm border-b">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="font-bold text-xl">{component.props.brand}</div>
              <div className="flex space-x-6">
                {component.props.links.map((link: string, index: number) => (
                  <a key={index} href="#" className="text-gray-600 hover:text-gray-900">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        );
      
      case 'feature':
        return (
          <div style={style} className="text-center p-6">
            <div className="text-4xl mb-4">{component.props.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{component.props.title}</h3>
            <p className="text-gray-600">{component.props.description}</p>
          </div>
        );
      
      case 'testimonial':
        return (
          <div style={style} className="bg-white p-6 rounded-lg shadow-sm">
            <blockquote className="text-lg mb-4">"{component.props.text}"</blockquote>
            <div className="flex items-center">
              <img 
                src={component.props.avatar || '/placeholder.jpg'} 
                alt={component.props.author}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="font-medium">{component.props.author}</div>
            </div>
          </div>
        );
      
      case 'pricing':
        return (
          <div style={style} className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-bold mb-2">{component.props.plans[0]?.name || 'Basic'}</h3>
            <div className="text-3xl font-bold mb-4">{component.props.plans[0]?.price || '$9'}</div>
            <button className="w-full bg-indigo-600 text-white py-2 rounded">Choose Plan</button>
          </div>
        );
      
      case 'cta':
        return (
          <div style={style} className="bg-indigo-600 text-white text-center p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">{component.props.title}</h2>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold">
              {component.props.buttonText}
            </button>
          </div>
        );
      
      default:
        return (
          <div 
            style={style}
            className="p-4 border border-gray-300 rounded bg-gray-50 text-center text-gray-500"
          >
            {component.type}
          </div>
        );
    }
  }, [currentViewport]);

  // Handle canvas drop
  const handleCanvasDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedComponent) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    addComponent(draggedComponent, { x, y });
    setDraggedComponent(null);
    setIsDragging(false);
  }, [draggedComponent, addComponent]);

  // Handle canvas drag over
  const handleCanvasDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Top Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left - Project Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">{currentProject.name}</h1>
                <p className="text-xs text-gray-500">
                  {currentProject.pages.length} pages • {elements.length} components
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {currentProject.collaborators.filter(c => c.isOnline).map((collaborator) => (
                <div
                  key={collaborator.id}
                  className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center"
                  title={collaborator.name}
                >
                  <span className="text-sm font-medium text-indigo-700">
                    {collaborator.name.charAt(0)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Center - Viewport Controls */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            {[
              { key: 'desktop', icon: Monitor, label: 'Desktop' },
              { key: 'tablet', icon: Tablet, label: 'Tablet' },
              { key: 'mobile', icon: Smartphone, label: 'Mobile' }
            ].map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setCurrentViewport(key as any)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentViewport === key
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title={label}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {hasUnsavedChanges ? (
                <span className="text-orange-600">Unsaved changes</span>
              ) : lastSaved ? (
                <span>Saved {lastSaved.toLocaleTimeString()}</span>
              ) : (
                <span>Never saved</span>
              )}
            </div>
            
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isPreviewMode
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isPreviewMode ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {isPreviewMode ? 'Edit' : 'Preview'}
            </button>
            
            <button
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
            >
              <Code className="w-4 h-4" />
              Code
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Page Navigation */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2 overflow-x-auto">
            {currentProject.pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setCurrentPageId(page.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors whitespace-nowrap ${
                  currentPageId === page.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                {page.name}
                {page.isHomePage && (
                  <span className="text-xs bg-indigo-200 text-indigo-700 px-1 rounded">Home</span>
                )}
                {!page.published && (
                  <span className="text-xs bg-yellow-200 text-yellow-700 px-1 rounded">Draft</span>
                )}
              </button>
            ))}
            
            <button
              onClick={() => {
                const name = prompt('Page name:');
                if (name) createPage(name);
              }}
              className="flex items-center gap-1 px-2 py-1 text-gray-500 hover:text-gray-700 rounded-md"
              title="Add new page"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Zoom:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setZoom(Math.max(25, zoom - 25))}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
              <button
                onClick={() => setZoom(Math.min(200, zoom + 25))}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        {!isPreviewMode && (
          <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${leftSidebarOpen ? 'w-80' : 'w-0'} overflow-hidden`}>
            {/* Sidebar Toggle */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold text-gray-900">Components</h2>
              <button
                onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <div className="flex">
                {[
                  { key: 'components', label: 'Components', icon: Layers },
                  { key: 'ai', label: 'AI Generate', icon: Brain },
                  { key: 'templates', label: 'Templates', icon: Star },
                  { key: 'assets', label: 'Assets', icon: ImageIcon }
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as any)}
                    className={`flex-1 px-3 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === key
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 mx-auto mb-1" />
                    <div className="hidden sm:block">{label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'components' && (
                <div className="p-4">
                  {/* Search */}
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search components..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-4">
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(ENHANCED_COMPONENT_LIBRARY).map(([key, category]) => {
                        const Icon = category.icon;
                        return (
                          <button
                            key={key}
                            onClick={() => setSelectedCategory(key)}
                            className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all text-center ${
                              selectedCategory === key
                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <Icon className="w-5 h-5 mb-1" />
                            <span className="text-xs font-medium">{category.name}</span>
                            <span className="text-xs text-gray-500">{category.components.length}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Components List */}
                  <div className="space-y-2">
                    {filteredComponents.map((component) => {
                      const Icon = component.icon;
                      return (
                        <div
                          key={component.id}
                          draggable
                          onDragStart={() => {
                            setDraggedComponent(component);
                            setIsDragging(true);
                          }}
                          onDragEnd={() => {
                            setDraggedComponent(null);
                            setIsDragging(false);
                          }}
                          onClick={() => addComponent(component)}
                          className="group p-3 border border-gray-200 rounded-lg cursor-grab hover:border-indigo-300 hover:bg-indigo-50 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 ${component.color} rounded flex items-center justify-center group-hover:scale-110 transition-transform`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-900">{component.name}</div>
                              <div className="text-xs text-gray-500 truncate">{component.description}</div>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <Plus className="w-4 h-4 text-indigo-600" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="p-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Component Generator</h3>
                    <p className="text-sm text-gray-600">Describe what you want to create and let AI build it for you.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Describe your component
                      </label>
                      <textarea
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="e.g., Create a modern hero section with a gradient background, large title, subtitle, and call-to-action button"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                        rows={4}
                      />
                    </div>

                    <button
                      onClick={handleAiGenerate}
                      disabled={!aiPrompt.trim() || aiGenerating}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-indigo-700 hover:to-purple-700 transition-all"
                    >
                      {aiGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4" />
                          Generate with AI
                        </>
                      )}
                    </button>

                    {/* AI Suggestions */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Ideas</h4>
                      <div className="space-y-2">
                        {[
                          'Modern hero section with gradient background',
                          'Pricing table with three tiers',
                          'Contact form with validation',
                          'Feature grid with icons',
                          'Testimonial carousel',
                          'Newsletter signup with benefits'
                        ].map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => setAiPrompt(suggestion)}
                            className="w-full text-left p-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'templates' && (
                <div className="p-4">
                  <div className="text-center py-8">
                    <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Templates Coming Soon</h3>
                    <p className="text-sm text-gray-500">Pre-built page templates will be available here.</p>
                  </div>
                </div>
              )}

              {activeTab === 'assets' && (
                <div className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Assets</h3>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-400 transition-colors"
                      >
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload images</p>
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          // Handle file upload
                          console.log('Files uploaded:', e.target.files);
                        }}
                      />
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Stock Images</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div
                            key={i}
                            className="aspect-square bg-gray-100 rounded border cursor-pointer hover:border-indigo-400 transition-colors"
                            onClick={() => {
                              // Add stock image to canvas
                              addComponent({
                                id: 'image',
                                name: 'Image',
                                icon: ImageIcon,
                                color: 'bg-yellow-500',
                                description: 'Stock image',
                                category: 'content',
                                tags: ['image'],
                                difficulty: 'beginner',
                                defaultProps: { src: `/stock-${i}.jpg`, alt: `Stock image ${i}` },
                                accessibility: { role: 'img' }
                              });
                            }}
                          >
                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-gray-400" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col bg-gray-100">
          {/* Canvas Toolbar */}
          <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {!leftSidebarOpen && (
                <button
                  onClick={() => setLeftSidebarOpen(true)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                  title="Show components"
                >
                  <Layers className="w-4 h-4" />
                </button>
              )}
              
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`p-2 rounded ${showGrid ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                title="Toggle grid"
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{currentViewport}</span>
              <div className="text-sm text-gray-500">
                {getViewportDimensions().width} × {getViewportDimensions().height}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!rightSidebarOpen && (
                <button
                  onClick={() => setRightSidebarOpen(true)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                  title="Show properties"
                >
                  <Settings className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 overflow-auto p-8">
            <div className="flex justify-center">
              <div
                ref={canvasRef}
                className="bg-white shadow-lg relative"
                style={{
                  width: getViewportDimensions().width * (zoom / 100),
                  height: getViewportDimensions().height * (zoom / 100),
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'top center'
                }}
                onDrop={handleCanvasDrop}
                onDragOver={handleCanvasDragOver}
              >
                {/* Grid overlay */}
                {showGrid && (
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                  />
                )}

                {/* Drop zone overlay */}
                {isDragging && (
                  <div className="absolute inset-0 bg-indigo-50 border-2 border-dashed border-indigo-300 flex items-center justify-center">
                    <div className="text-center">
                      <Plus className="w-12 h-12 text-indigo-400 mx-auto mb-2" />
                      <p className="text-indigo-600 font-medium">Drop component here</p>
                    </div>
                  </div>
                )}

                {/* Render components */}
                {elements.map((component) => (
                  <div
                    key={component.id}
                    className={`absolute cursor-pointer ${
                      selectedComponentIds.includes(component.id) 
                        ? 'ring-2 ring-indigo-500 ring-offset-2' 
                        : 'hover:ring-2 hover:ring-indigo-300 hover:ring-offset-1'
                    }`}
                    style={{
                      left: component.position.x,
                      top: component.position.y,
                      ...component.style[currentViewport]
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (e.ctrlKey || e.metaKey) {
                        setSelectedComponentIds(prev => 
                          prev.includes(component.id)
                            ? prev.filter(id => id !== component.id)
                            : [...prev, component.id]
                        );
                      } else {
                        setSelectedComponentIds([component.id]);
                      }
                    }}
                  >
                    {renderComponent(component)}
                    
                    {/* Component controls */}
                    {selectedComponentIds.includes(component.id) && !isPreviewMode && (
                      <div className="absolute -top-8 left-0 bg-indigo-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <span>{component.type}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteComponent(component.id);
                          }}
                          className="hover:bg-red-500 p-0.5 rounded"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {/* Empty state */}
                {elements.length === 0 && !isDragging && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <Layers className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">Start Building</h3>
                      <p>Drag components from the sidebar or use AI to generate content</p>
                    </div>
                  </div>
                )}

                {/* Collaborator cursors */}
                {currentProject.collaborators
                  .filter(c => c.isOnline && c.cursor && c.id !== 'user-1')
                  .map((collaborator) => (
                    <div
                      key={collaborator.id}
                      className="absolute pointer-events-none z-50"
                      style={{
                        left: collaborator.cursor!.x,
                        top: collaborator.cursor!.y
                      }}
                    >
                      <MousePointer2 className="w-4 h-4 text-purple-500" />
                      <div className="bg-purple-500 text-white px-2 py-1 rounded text-xs mt-1">
                        {collaborator.name}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties Panel */}
        {!isPreviewMode && (
          <div className={`bg-white border-l border-gray-200 transition-all duration-300 ${rightSidebarOpen ? 'w-80' : 'w-0'} overflow-hidden`}>
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold text-gray-900">Properties</h2>
              <button
                onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {selectedComponent ? (
                <>
                  {/* Component Info */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {selectedComponent.type}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Component ID: {selectedComponent.id}
                    </p>
                  </div>

                  {/* Basic Properties */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Content</h4>
                    <div className="space-y-3">
                      {selectedComponent.type === 'text' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Text
                          </label>
                          <textarea
                            value={selectedComponent.props.text || ''}
                            onChange={(e) => updateComponent(selectedComponent.id, {
                              props: { ...selectedComponent.props, text: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            rows={3}
                          />
                        </div>
                      )}

                      {selectedComponent.type === 'button' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Button Text
                            </label>
                            <input
                              type="text"
                              value={selectedComponent.props.text || ''}
                              onChange={(e) => updateComponent(selectedComponent.id, {
                                props: { ...selectedComponent.props, text: e.target.value }
                              })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Variant
                            </label>
                            <select
                              value={selectedComponent.props.variant || 'primary'}
                              onChange={(e) => updateComponent(selectedComponent.id, {
                                props: { ...selectedComponent.props, variant: e.target.value }
                              })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            >
                              <option value="primary">Primary</option>
                              <option value="secondary">Secondary</option>
                            </select>
                          </div>
                        </>
                      )}

                      {selectedComponent.type === 'heading' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Heading Text
                            </label>
                            <input
                              type="text"
                              value={selectedComponent.props.text || ''}
                              onChange={(e) => updateComponent(selectedComponent.id, {
                                props: { ...selectedComponent.props, text: e.target.value }
                              })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Level
                            </label>
                            <select
                              value={selectedComponent.props.level || 'h2'}
                              onChange={(e) => updateComponent(selectedComponent.id, {
                                props: { ...selectedComponent.props, level: e.target.value }
                              })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            >
                              <option value="h1">H1</option>
                              <option value="h2">H2</option>
                              <option value="h3">H3</option>
                              <option value="h4">H4</option>
                              <option value="h5">H5</option>
                              <option value="h6">H6</option>
                            </select>
                          </div>
                        </>
                      )}

                      {selectedComponent.type === 'image' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Image URL
                            </label>
                            <input
                              type="text"
                              value={selectedComponent.props.src || ''}
                              onChange={(e) => updateComponent(selectedComponent.id, {
                                props: { ...selectedComponent.props, src: e.target.value }
                              })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Alt Text
                            </label>
                            <input
                              type="text"
                              value={selectedComponent.props.alt || ''}
                              onChange={(e) => updateComponent(selectedComponent.id, {
                                props: { ...selectedComponent.props, alt: e.target.value }
                              })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                              placeholder="Description of the image"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Style Properties */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Style</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Background Color
                        </label>
                        <input
                          type="color"
                          value={selectedComponent.style[currentViewport]?.backgroundColor || '#ffffff'}
                          onChange={(e) => updateComponent(selectedComponent.id, {
                            style: {
                              ...selectedComponent.style,
                              [currentViewport]: {
                                ...selectedComponent.style[currentViewport],
                                backgroundColor: e.target.value
                              }
                            }
                          })}
                          className="w-full h-10 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Text Color
                        </label>
                        <input
                          type="color"
                          value={selectedComponent.style[currentViewport]?.color || '#000000'}
                          onChange={(e) => updateComponent(selectedComponent.id, {
                            style: {
                              ...selectedComponent.style,
                              [currentViewport]: {
                                ...selectedComponent.style[currentViewport],
                                color: e.target.value
                              }
                            }
                          })}
                          className="w-full h-10 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Padding
                        </label>
                        <input
                          type="text"
                          value={selectedComponent.style[currentViewport]?.padding || ''}
                          onChange={(e) => updateComponent(selectedComponent.id, {
                            style: {
                              ...selectedComponent.style,
                              [currentViewport]: {
                                ...selectedComponent.style[currentViewport],
                                padding: e.target.value
                              }
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          placeholder="20px"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Margin
                        </label>
                        <input
                          type="text"
                          value={selectedComponent.style[currentViewport]?.margin || ''}
                          onChange={(e) => updateComponent(selectedComponent.id, {
                            style: {
                              ...selectedComponent.style,
                              [currentViewport]: {
                                ...selectedComponent.style[currentViewport],
                                margin: e.target.value
                              }
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          placeholder="10px"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Position */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Position</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          X
                        </label>
                        <input
                          type="number"
                          value={selectedComponent.position.x}
                          onChange={(e) => updateComponent(selectedComponent.id, {
                            position: { ...selectedComponent.position, x: parseInt(e.target.value) || 0 }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Y
                        </label>
                        <input
                          type="number"
                          value={selectedComponent.position.y}
                          onChange={(e) => updateComponent(selectedComponent.id, {
                            position: { ...selectedComponent.position, y: parseInt(e.target.value) || 0 }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Actions</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          const newComponent = { ...selectedComponent, id: generateId() };
                          const updatedPage = {
                            ...currentPage,
                            elements: [...elements, newComponent],
                            updatedAt: new Date()
                          };
                          setCurrentProject(prev => ({
                            ...prev,
                            pages: prev.pages.map(page => 
                              page.id === currentPageId ? updatedPage : page
                            )
                          }));
                          setHasUnsavedChanges(true);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md text-sm"
                      >
                        <Copy className="w-4 h-4" />
                        Duplicate
                      </button>
                      <button
                        onClick={() => deleteComponent(selectedComponent.id)}
                        className="w-full flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-md text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Selection</h3>
                  <p className="text-sm text-gray-500">Select a component to edit its properties</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Code Modal */}
      {showCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-3/4 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Generated Code</h2>
              <button
                onClick={() => setShowCode(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-auto">
{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${currentPage.seo.title}</title>
    <meta name="description" content="${currentPage.seo.description}">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: '${currentProject.settings.theme.fontFamily}', sans-serif;
        }
    </style>
</head>
<body>
    <div class="min-h-screen">
        ${elements.map(component => `
        <!-- ${component.type} component -->
        <div style="position: absolute; left: ${component.position.x}px; top: ${component.position.y}px;">
            ${component.type === 'hero' ? `
            <section class="hero-section" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 80px 20px; text-align: center; min-height: 500px;">
                <h1 class="text-5xl font-bold mb-4">${component.props.title}</h1>
                <p class="text-xl mb-8">${component.props.subtitle}</p>
                <button class="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold">${component.props.buttonText}</button>
            </section>` : ''}
            ${component.type === 'text' ? `<p>${component.props.text}</p>` : ''}
            ${component.type === 'button' ? `<button class="px-4 py-2 rounded font-medium ${component.props.variant === 'primary' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}">${component.props.text}</button>` : ''}
        </div>`).join('')}
    </div>
</body>
</html>`}
              </pre>
            </div>
            <div className="p-4 border-t">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`<!-- Generated code would be here -->`);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Copy Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedStudioPage;