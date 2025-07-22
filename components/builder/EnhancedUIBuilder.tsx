'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { 
  DndContext, 
  DragOverlay, 
  useDraggable, 
  useDroppable, 
  DragStartEvent, 
  DragEndEvent,
  closestCenter,
  DragOverEvent
} from '@dnd-kit/core';
import {
  Search,
  Code,
  Download,
  Eye,
  Smartphone,
  Monitor,
  Trash2,
  Copy,
  RotateCcw,
  Layers,
  Move,
  Grid,
  Zap,
  Type,
  Square,
  Image,
  Layout,
  Navigation,
  ShoppingCart,
  BarChart,
  Settings,
  Palette,
  Plus,
  Save,
  Share,
  History,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline
} from 'lucide-react';

// Enhanced Component Registry with 120+ components
const ENHANCED_COMPONENT_REGISTRY = [
  // Buttons & Actions (25 components)
  { id: 'button-primary', name: 'Primary Button', category: 'buttons', icon: Zap, defaultProps: { variant: 'primary', children: 'Click me' }},
  { id: 'button-secondary', name: 'Secondary Button', category: 'buttons', icon: Zap, defaultProps: { variant: 'secondary', children: 'Secondary' }},
  { id: 'button-outline', name: 'Outline Button', category: 'buttons', icon: Zap, defaultProps: { variant: 'outline', children: 'Outline' }},
  { id: 'button-ghost', name: 'Ghost Button', category: 'buttons', icon: Zap, defaultProps: { variant: 'ghost', children: 'Ghost' }},
  { id: 'button-destructive', name: 'Destructive Button', category: 'buttons', icon: Zap, defaultProps: { variant: 'destructive', children: 'Delete' }},
  { id: 'button-gradient', name: 'Gradient Button', category: 'buttons', icon: Zap, defaultProps: { variant: 'gradient', children: 'Gradient' }},
  { id: 'button-neon', name: 'Neon Button', category: 'buttons', icon: Zap, defaultProps: { variant: 'neon', children: 'Neon' }},
  { id: 'button-glass', name: 'Glass Button', category: 'buttons', icon: Zap, defaultProps: { variant: 'glass', children: 'Glass' }},
  { id: 'button-icon', name: 'Icon Button', category: 'buttons', icon: Zap, defaultProps: { size: 'icon', children: '⭐' }},
  { id: 'button-loading', name: 'Loading Button', category: 'buttons', icon: Zap, defaultProps: { isLoading: true, children: 'Loading' }},
  { id: 'button-fab', name: 'Floating Action', category: 'buttons', icon: Plus, defaultProps: { variant: 'fab', children: '+' }},
  { id: 'button-toggle', name: 'Toggle Button', category: 'buttons', icon: Zap, defaultProps: { toggle: true, children: 'Toggle' }},
  { id: 'button-dropdown', name: 'Dropdown Button', category: 'buttons', icon: Zap, defaultProps: { dropdown: true, children: 'Options ▼' }},
  { id: 'button-split', name: 'Split Button', category: 'buttons', icon: Zap, defaultProps: { split: true, children: 'Action' }},
  { id: 'button-link', name: 'Link Button', category: 'buttons', icon: Zap, defaultProps: { variant: 'link', children: 'Link' }},
  { id: 'button-social', name: 'Social Button', category: 'buttons', icon: Zap, defaultProps: { social: 'twitter', children: 'Share' }},
  { id: 'button-cta', name: 'CTA Button', category: 'buttons', icon: Zap, defaultProps: { size: 'xl', variant: 'primary', children: 'Get Started Free' }},
  { id: 'button-animated', name: 'Animated Button', category: 'buttons', icon: Zap, defaultProps: { animation: 'pulse', children: 'Animated' }},
  { id: 'button-3d', name: '3D Button', category: 'buttons', icon: Zap, defaultProps: { effect: '3d', children: '3D Effect' }},
  { id: 'button-neumorphism', name: 'Neumorphic Button', category: 'buttons', icon: Zap, defaultProps: { style: 'neumorphism', children: 'Soft UI' }},
  { id: 'button-group', name: 'Button Group', category: 'buttons', icon: Zap, defaultProps: { group: true, buttons: ['One', 'Two', 'Three'] }},
  { id: 'button-segmented', name: 'Segmented Control', category: 'buttons', icon: Zap, defaultProps: { segmented: true, options: ['Day', 'Week', 'Month'] }},
  { id: 'button-chip', name: 'Chip Button', category: 'buttons', icon: Zap, defaultProps: { variant: 'chip', children: 'Tag' }},
  { id: 'button-pill', name: 'Pill Button', category: 'buttons', icon: Zap, defaultProps: { variant: 'pill', children: 'Pill' }},
  { id: 'button-badge', name: 'Badge Button', category: 'buttons', icon: Zap, defaultProps: { badge: '5', children: 'Notifications' }},

  // Forms & Inputs (20 components)
  { id: 'input-text', name: 'Text Input', category: 'forms', icon: Type, defaultProps: { placeholder: 'Enter text...' }},
  { id: 'input-email', name: 'Email Input', category: 'forms', icon: Type, defaultProps: { type: 'email', placeholder: 'email@example.com' }},
  { id: 'input-password', name: 'Password Input', category: 'forms', icon: Type, defaultProps: { type: 'password', placeholder: 'Password' }},
  { id: 'input-number', name: 'Number Input', category: 'forms', icon: Type, defaultProps: { type: 'number', placeholder: '0' }},
  { id: 'input-search', name: 'Search Input', category: 'forms', icon: Search, defaultProps: { type: 'search', placeholder: 'Search...' }},
  { id: 'input-phone', name: 'Phone Input', category: 'forms', icon: Type, defaultProps: { type: 'tel', placeholder: '+1 (555) 123-4567' }},
  { id: 'textarea', name: 'Textarea', category: 'forms', icon: Type, defaultProps: { placeholder: 'Enter message...', rows: 4 }},
  { id: 'select', name: 'Select Dropdown', category: 'forms', icon: Type, defaultProps: { options: ['Option 1', 'Option 2', 'Option 3'] }},
  { id: 'checkbox', name: 'Checkbox', category: 'forms', icon: Square, defaultProps: { label: 'Check me' }},
  { id: 'radio', name: 'Radio Button', category: 'forms', icon: Square, defaultProps: { options: ['Option A', 'Option B'] }},
  { id: 'switch', name: 'Toggle Switch', category: 'forms', icon: Square, defaultProps: { label: 'Enable notifications' }},
  { id: 'slider', name: 'Range Slider', category: 'forms', icon: Type, defaultProps: { min: 0, max: 100, value: 50 }},
  { id: 'date-picker', name: 'Date Picker', category: 'forms', icon: Type, defaultProps: { placeholder: 'Select date' }},
  { id: 'time-picker', name: 'Time Picker', category: 'forms', icon: Type, defaultProps: { placeholder: 'Select time' }},
  { id: 'color-picker', name: 'Color Picker', category: 'forms', icon: Palette, defaultProps: { value: '#3B82F6' }},
  { id: 'file-upload', name: 'File Upload', category: 'forms', icon: Type, defaultProps: { accept: 'image/*', placeholder: 'Drop files here' }},
  { id: 'form-group', name: 'Form Group', category: 'forms', icon: Layout, defaultProps: { fields: ['Name', 'Email', 'Message'] }},
  { id: 'form-wizard', name: 'Multi-step Form', category: 'forms', icon: Layout, defaultProps: { steps: ['Basic Info', 'Details', 'Review'] }},
  { id: 'rating', name: 'Star Rating', category: 'forms', icon: Type, defaultProps: { max: 5, value: 4 }},
  { id: 'autocomplete', name: 'Autocomplete', category: 'forms', icon: Type, defaultProps: { suggestions: ['Apple', 'Banana', 'Cherry'] }},

  // Layout & Structure (18 components)
  { id: 'container', name: 'Container', category: 'layout', icon: Square, defaultProps: { maxWidth: '1200px' }},
  { id: 'grid', name: 'CSS Grid', category: 'layout', icon: Grid, defaultProps: { columns: 3, gap: '1rem' }},
  { id: 'flexbox', name: 'Flexbox', category: 'layout', icon: Layout, defaultProps: { direction: 'row', gap: '1rem' }},
  { id: 'card', name: 'Card', category: 'layout', icon: Square, defaultProps: { title: 'Card Title', content: 'Card content goes here' }},
  { id: 'section', name: 'Section', category: 'layout', icon: Layout, defaultProps: { padding: '2rem', background: 'white' }},
  { id: 'hero', name: 'Hero Section', category: 'layout', icon: Layout, defaultProps: { title: 'Hero Title', subtitle: 'Hero subtitle' }},
  { id: 'sidebar', name: 'Sidebar', category: 'layout', icon: Layout, defaultProps: { position: 'left', width: '250px' }},
  { id: 'header', name: 'Header', category: 'layout', icon: Layout, defaultProps: { sticky: true, height: '60px' }},
  { id: 'footer', name: 'Footer', category: 'layout', icon: Layout, defaultProps: { background: 'dark' }},
  { id: 'modal', name: 'Modal Dialog', category: 'layout', icon: Square, defaultProps: { title: 'Modal Title', open: false }},
  { id: 'drawer', name: 'Side Drawer', category: 'layout', icon: Layout, defaultProps: { position: 'right', open: false }},
  { id: 'accordion', name: 'Accordion', category: 'layout', icon: Layout, defaultProps: { items: ['Item 1', 'Item 2'] }},
  { id: 'tabs', name: 'Tab Navigation', category: 'layout', icon: Layout, defaultProps: { tabs: ['Tab 1', 'Tab 2', 'Tab 3'] }},
  { id: 'collapse', name: 'Collapsible', category: 'layout', icon: Layout, defaultProps: { title: 'Click to expand' }},
  { id: 'divider', name: 'Divider', category: 'layout', icon: Layout, defaultProps: { orientation: 'horizontal' }},
  { id: 'spacer', name: 'Spacer', category: 'layout', icon: Layout, defaultProps: { height: '2rem' }},
  { id: 'masonry', name: 'Masonry Layout', category: 'layout', icon: Grid, defaultProps: { columns: 3, gap: '1rem' }},
  { id: 'sticky', name: 'Sticky Element', category: 'layout', icon: Layout, defaultProps: { position: 'top' }},

  // Navigation (15 components)
  { id: 'navbar', name: 'Navigation Bar', category: 'navigation', icon: Navigation, defaultProps: { brand: 'Logo', links: ['Home', 'About', 'Contact'] }},
  { id: 'breadcrumb', name: 'Breadcrumb', category: 'navigation', icon: Navigation, defaultProps: { items: ['Home', 'Products', 'Details'] }},
  { id: 'pagination', name: 'Pagination', category: 'navigation', icon: Navigation, defaultProps: { total: 100, current: 1 }},
  { id: 'menu', name: 'Dropdown Menu', category: 'navigation', icon: Navigation, defaultProps: { items: ['Item 1', 'Item 2', 'Item 3'] }},
  { id: 'sidebar-nav', name: 'Sidebar Navigation', category: 'navigation', icon: Navigation, defaultProps: { items: ['Dashboard', 'Settings', 'Profile'] }},
  { id: 'mobile-menu', name: 'Mobile Menu', category: 'navigation', icon: Navigation, defaultProps: { hamburger: true }},
  { id: 'mega-menu', name: 'Mega Menu', category: 'navigation', icon: Navigation, defaultProps: { categories: ['Products', 'Services'] }},
  { id: 'context-menu', name: 'Context Menu', category: 'navigation', icon: Navigation, defaultProps: { items: ['Copy', 'Paste', 'Delete'] }},
  { id: 'stepper', name: 'Step Navigation', category: 'navigation', icon: Navigation, defaultProps: { steps: ['Step 1', 'Step 2', 'Step 3'] }},
  { id: 'back-to-top', name: 'Back to Top', category: 'navigation', icon: Navigation, defaultProps: { showAfter: 300 }},
  { id: 'skip-link', name: 'Skip Navigation', category: 'navigation', icon: Navigation, defaultProps: { target: '#main-content' }},
  { id: 'link', name: 'Link', category: 'navigation', icon: Navigation, defaultProps: { href: '#', children: 'Link text' }},
  { id: 'anchor', name: 'Anchor Link', category: 'navigation', icon: Navigation, defaultProps: { href: '#section', children: 'Jump to section' }},
  { id: 'button-nav', name: 'Button Navigation', category: 'navigation', icon: Navigation, defaultProps: { prev: 'Previous', next: 'Next' }},
  { id: 'floating-nav', name: 'Floating Navigation', category: 'navigation', icon: Navigation, defaultProps: { position: 'bottom-right' }},

  // Data Display (12 components)
  { id: 'table', name: 'Data Table', category: 'data-display', icon: BarChart, defaultProps: { columns: ['Name', 'Email', 'Role'], sortable: true }},
  { id: 'list', name: 'List', category: 'data-display', icon: BarChart, defaultProps: { items: ['Item 1', 'Item 2', 'Item 3'] }},
  { id: 'avatar', name: 'Avatar', category: 'data-display', icon: BarChart, defaultProps: { src: '/avatar.jpg', alt: 'User' }},
  { id: 'badge', name: 'Badge', category: 'data-display', icon: BarChart, defaultProps: { variant: 'primary', children: 'New' }},
  { id: 'tag', name: 'Tag', category: 'data-display', icon: BarChart, defaultProps: { children: 'React' }},
  { id: 'tooltip', name: 'Tooltip', category: 'data-display', icon: BarChart, defaultProps: { content: 'Helpful information' }},
  { id: 'popover', name: 'Popover', category: 'data-display', icon: BarChart, defaultProps: { content: 'More details' }},
  { id: 'stat', name: 'Statistic', category: 'data-display', icon: BarChart, defaultProps: { value: '1,234', label: 'Total Users' }},
  { id: 'progress', name: 'Progress Bar', category: 'data-display', icon: BarChart, defaultProps: { value: 75, max: 100 }},
  { id: 'timeline', name: 'Timeline', category: 'data-display', icon: BarChart, defaultProps: { events: ['Event 1', 'Event 2'] }},
  { id: 'calendar', name: 'Calendar', category: 'data-display', icon: BarChart, defaultProps: { month: 'current' }},
  { id: 'chart', name: 'Chart', category: 'data-display', icon: BarChart, defaultProps: { type: 'line', data: [1, 2, 3, 4, 5] }},

  // Feedback (10 components)
  { id: 'alert', name: 'Alert', category: 'feedback', icon: Zap, defaultProps: { variant: 'info', children: 'Alert message' }},
  { id: 'toast', name: 'Toast Notification', category: 'feedback', icon: Zap, defaultProps: { message: 'Success!' }},
  { id: 'loading', name: 'Loading Spinner', category: 'feedback', icon: Zap, defaultProps: { size: 'md' }},
  { id: 'skeleton', name: 'Skeleton Loader', category: 'feedback', icon: Zap, defaultProps: { lines: 3 }},
  { id: 'empty-state', name: 'Empty State', category: 'feedback', icon: Zap, defaultProps: { message: 'No data found' }},
  { id: 'error-boundary', name: 'Error Boundary', category: 'feedback', icon: Zap, defaultProps: { fallback: 'Something went wrong' }},
  { id: 'confirmation', name: 'Confirmation Dialog', category: 'feedback', icon: Zap, defaultProps: { message: 'Are you sure?' }},
  { id: 'banner', name: 'Banner', category: 'feedback', icon: Zap, defaultProps: { message: 'Important announcement' }},
  { id: 'callout', name: 'Callout', category: 'feedback', icon: Zap, defaultProps: { type: 'info', children: 'Important note' }},
  { id: 'status-indicator', name: 'Status Indicator', category: 'feedback', icon: Zap, defaultProps: { status: 'online' }},

  // E-commerce (8 components)
  { id: 'product-card', name: 'Product Card', category: 'ecommerce', icon: ShoppingCart, defaultProps: { name: 'Product Name', price: '$99' }},
  { id: 'cart-item', name: 'Cart Item', category: 'ecommerce', icon: ShoppingCart, defaultProps: { product: 'Item', quantity: 1 }},
  { id: 'checkout', name: 'Checkout Form', category: 'ecommerce', icon: ShoppingCart, defaultProps: { steps: ['Shipping', 'Payment'] }},
  { id: 'price-display', name: 'Price Display', category: 'ecommerce', icon: ShoppingCart, defaultProps: { price: 99.99, currency: 'USD' }},
  { id: 'rating-display', name: 'Rating Display', category: 'ecommerce', icon: ShoppingCart, defaultProps: { rating: 4.5, reviews: 123 }},
  { id: 'wishlist', name: 'Wishlist Button', category: 'ecommerce', icon: ShoppingCart, defaultProps: { saved: false }},
  { id: 'coupon', name: 'Coupon Code', category: 'ecommerce', icon: ShoppingCart, defaultProps: { code: 'SAVE20', discount: '20%' }},
  { id: 'shipping-info', name: 'Shipping Info', category: 'ecommerce', icon: ShoppingCart, defaultProps: { method: 'Standard', cost: '$5.99' }},

  // Marketing (12 components)
  { id: 'cta-section', name: 'CTA Section', category: 'marketing', icon: Zap, defaultProps: { title: 'Get Started Today', button: 'Sign Up Free' }},
  { id: 'testimonial', name: 'Testimonial', category: 'marketing', icon: Zap, defaultProps: { quote: 'Amazing product!', author: 'John Doe' }},
  { id: 'feature-grid', name: 'Feature Grid', category: 'marketing', icon: Grid, defaultProps: { features: ['Feature 1', 'Feature 2'] }},
  { id: 'pricing-card', name: 'Pricing Card', category: 'marketing', icon: Zap, defaultProps: { plan: 'Pro', price: '$29/mo' }},
  { id: 'newsletter', name: 'Newsletter Signup', category: 'marketing', icon: Zap, defaultProps: { placeholder: 'Enter email' }},
  { id: 'social-proof', name: 'Social Proof', category: 'marketing', icon: Zap, defaultProps: { count: '10,000+', label: 'Happy Customers' }},
  { id: 'faq', name: 'FAQ Section', category: 'marketing', icon: Zap, defaultProps: { questions: ['Q1', 'Q2'] }},
  { id: 'team-member', name: 'Team Member', category: 'marketing', icon: Zap, defaultProps: { name: 'Jane Smith', role: 'Designer' }},
  { id: 'blog-card', name: 'Blog Card', category: 'marketing', icon: Zap, defaultProps: { title: 'Blog Post', excerpt: 'Summary...' }},
  { id: 'contact-form', name: 'Contact Form', category: 'marketing', icon: Zap, defaultProps: { fields: ['Name', 'Email', 'Message'] }},
  { id: 'logo-grid', name: 'Logo Grid', category: 'marketing', icon: Grid, defaultProps: { logos: ['Logo 1', 'Logo 2'] }},
  { id: 'countdown', name: 'Countdown Timer', category: 'marketing', icon: Zap, defaultProps: { endDate: '2024-12-31' }}
];

// Grid snap functionality
const GRID_SIZE = 20;
const snapToGrid = (value) => Math.round(value / GRID_SIZE) * GRID_SIZE;

// Component for grid snap visualization
function GridOverlay({ show }) {
  if (!show) return null;
  
  return (
    <div 
      className="absolute inset-0 pointer-events-none opacity-10 z-0"
      style={{
        backgroundImage: `
          linear-gradient(to right, #6366f1 1px, transparent 1px),
          linear-gradient(to bottom, #6366f1 1px, transparent 1px)
        `,
        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`
      }}
    />
  );
}

// Enhanced Canvas Component with grid snap
function CanvasComponent({ component, isSelected, onSelect, onUpdate, onDelete, showGrid }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(component.props.children || component.props.text || '');

  const handleDoubleClick = () => {
    if (component.componentId.includes('text') || component.componentId.includes('button')) {
      setIsEditing(true);
    }
  };

  const handleTextSave = () => {
    const updateKey = component.props.children !== undefined ? 'children' : 'text';
    onUpdate(component.id, {
      props: { ...component.props, [updateKey]: tempText }
    });
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTextSave();
    } else if (e.key === 'Escape') {
      setTempText(component.props.children || component.props.text || '');
      setIsEditing(false);
    }
  };

  // Snap position to grid
  const snappedPosition = {
    x: snapToGrid(component.position.x),
    y: snapToGrid(component.position.y)
  };

  return (
    <div
      className={`absolute border-2 transition-all cursor-pointer group ${
        isSelected 
          ? 'border-blue-500 shadow-lg z-10' 
          : 'border-transparent hover:border-gray-300'
      }`}
      style={{
        left: snappedPosition.x,
        top: snappedPosition.y,
        transform: showGrid ? 'none' : 'translate(-1px, -1px)'
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(component.id);
      }}
      onDoubleClick={handleDoubleClick}
    >
      {/* Selection handles */}
      {isSelected && (
        <>
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 rounded-full" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
          
          {/* Delete button */}
          <button
            className="absolute -top-8 -right-8 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(component.id);
            }}
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </>
      )}

      {/* Component content */}
      <div className="relative">
        {isEditing ? (
          <input
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
            onBlur={handleTextSave}
            onKeyDown={handleKeyPress}
            className="border border-blue-500 px-2 py-1 rounded text-sm min-w-20"
            autoFocus
          />
        ) : (
          <ComponentRenderer component={component} />
        )}
      </div>
    </div>
  );
}

// Component renderer
function ComponentRenderer({ component }) {
  const { componentId, props } = component;
  
  // Basic component rendering - in a real app, this would render actual components
  switch (componentId) {
    case 'button-primary':
    case 'button-secondary':
    case 'button-outline':
    case 'button-ghost':
    case 'button-destructive':
    case 'button-gradient':
    case 'button-neon':
    case 'button-glass':
      return (
        <button className={`px-4 py-2 rounded font-medium transition-all ${getButtonStyles(componentId)}`}>
          {props.children || 'Button'}
        </button>
      );
    
    case 'input-text':
    case 'input-email':
    case 'input-password':
    case 'input-search':
      return (
        <input
          type={props.type || 'text'}
          placeholder={props.placeholder}
          className="border border-gray-300 rounded px-3 py-2 min-w-48"
        />
      );
    
    case 'card':
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm min-w-64">
          <h3 className="font-semibold mb-2">{props.title || 'Card Title'}</h3>
          <p className="text-gray-600 text-sm">{props.content || 'Card content goes here'}</p>
        </div>
      );
    
    case 'navbar':
      return (
        <nav className="bg-white border border-gray-200 rounded-lg p-4 min-w-96">
          <div className="flex items-center justify-between">
            <div className="font-bold text-indigo-600">{props.brand || 'Logo'}</div>
            <div className="flex gap-4">
              {(props.links || ['Home', 'About', 'Contact']).map((link, i) => (
                <a key={i} href="#" className="text-gray-600 hover:text-indigo-600 text-sm">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </nav>
      );
    
    case 'hero':
      return (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-lg min-w-96">
          <h1 className="text-2xl font-bold mb-2">{props.title || 'Hero Title'}</h1>
          <p className="text-indigo-100">{props.subtitle || 'Hero subtitle goes here'}</p>
        </div>
      );
    
    default:
      return (
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded p-4 min-w-32 min-h-16 flex items-center justify-center text-gray-500 text-sm">
          {componentId}
        </div>
      );
  }
}

function getButtonStyles(variant) {
  const styles = {
    'button-primary': 'bg-indigo-600 hover:bg-indigo-700 text-white',
    'button-secondary': 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    'button-outline': 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
    'button-ghost': 'text-indigo-600 hover:bg-indigo-50',
    'button-destructive': 'bg-red-600 hover:bg-red-700 text-white',
    'button-gradient': 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white',
    'button-neon': 'bg-black text-cyan-400 border-2 border-cyan-400 shadow-lg shadow-cyan-400/25',
    'button-glass': 'bg-white/20 backdrop-blur-md border border-white/20 text-gray-900'
  };
  return styles[variant] || styles['button-primary'];
}

// Enhanced Code Generator with multi-framework support
function CodeGenerator({ components }) {
  const [framework, setFramework] = useState('react');
  const [showCode, setShowCode] = useState(false);

  const generateCode = () => {
    switch (framework) {
      case 'react':
        return generateReactCode(components);
      case 'vue':
        return generateVueCode(components);
      case 'angular':
        return generateAngularCode(components);
      case 'html':
        return generateHTMLCode(components);
      default:
        return generateReactCode(components);
    }
  };

  const generateReactCode = (components) => {
    const imports = ['import React from "react";'];
    const jsx = components.map(comp => {
      const props = Object.entries(comp.props)
        .filter(([_, value]) => value !== undefined && value !== '')
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
      
      return `  <${comp.componentId}${props ? ` ${props}` : ''} 
    style={{ 
      position: 'absolute', 
      left: '${comp.position.x}px', 
      top: '${comp.position.y}px' 
    }} 
  />`;
    }).join('\n');

    return `${imports.join('\n')}

export default function GeneratedComponent() {
  return (
    <div className="relative min-h-screen">
${jsx}
    </div>
  );
}`;
  };

  const generateVueCode = (components) => {
    const template = components.map(comp => {
      const props = Object.entries(comp.props)
        .filter(([_, value]) => value !== undefined && value !== '')
        .map(([key, value]) => `:${key}="${JSON.stringify(value)}"`)
        .join(' ');
      
      return `    <${comp.componentId}${props ? ` ${props}` : ''} 
      :style="{ 
        position: 'absolute', 
        left: '${comp.position.x}px', 
        top: '${comp.position.y}px' 
      }" 
    />`;
    }).join('\n');

    return `<template>
  <div class="relative min-h-screen">
${template}
  </div>
</template>

<script>
export default {
  name: 'GeneratedComponent'
}
</script>`;
  };

  const generateAngularCode = (components) => {
    const template = components.map(comp => {
      const props = Object.entries(comp.props)
        .filter(([_, value]) => value !== undefined && value !== '')
        .map(([key, value]) => `[${key}]="${JSON.stringify(value)}"`)
        .join(' ');
      
      return `  <${comp.componentId}${props ? ` ${props}` : ''}
    [ngStyle]="{ 
      position: 'absolute', 
      left: '${comp.position.x}px', 
      top: '${comp.position.y}px' 
    }">
  </${comp.componentId}>`;
    }).join('\n');

    return `<div class="relative min-h-screen">
${template}
</div>`;
  };

  const generateHTMLCode = (components) => {
    const html = components.map(comp => {
      const props = Object.entries(comp.props)
        .filter(([_, value]) => value !== undefined && value !== '')
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
      
      return `  <div class="${comp.componentId}"${props ? ` ${props}` : ''} 
       style="position: absolute; left: ${comp.position.x}px; top: ${comp.position.y}px;">
    ${comp.props.children || comp.props.text || comp.componentId}
  </div>`;
    }).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Component</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div class="relative min-h-screen">
${html}
  </div>
</body>
</html>`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Framework:</label>
        <select 
          value={framework} 
          onChange={(e) => setFramework(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="react">React</option>
          <option value="vue">Vue</option>
          <option value="angular">Angular</option>
          <option value="html">HTML</option>
        </select>
      </div>
      
      <button
        onClick={() => setShowCode(!showCode)}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
      >
        <Code className="w-4 h-4" />
        {showCode ? 'Hide Code' : 'Generate Code'}
      </button>

      {showCode && (
        <div className="relative">
          <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-auto max-h-96 font-mono">
            <code>{generateCode()}</code>
          </pre>
          <button
            onClick={() => navigator.clipboard.writeText(generateCode())}
            className="absolute top-2 right-2 p-1 bg-gray-700 hover:bg-gray-600 text-white rounded"
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// Enhanced UI Builder with all missing features
export default function EnhancedUIBuilder() {
  const [canvasComponents, setCanvasComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeId, setActiveId] = useState(null);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [showGrid, setShowGrid] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Save to history
  const saveToHistory = useCallback(() => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...canvasComponents]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex, canvasComponents]);

  // Undo/Redo functionality
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCanvasComponents(history[historyIndex - 1]);
      setSelectedComponent(null);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCanvasComponents(history[historyIndex + 1]);
      setSelectedComponent(null);
    }
  }, [history, historyIndex]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey)) {
        if (e.key === 'z' && !e.shiftKey) {
          e.preventDefault();
          undo();
        } else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
          e.preventDefault();
          redo();
        } else if (e.key === 's') {
          e.preventDefault();
          // Save functionality would go here
        }
      }
      
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedComponent) {
          e.preventDefault();
          deleteComponent(selectedComponent);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedComponent, undo, redo]);

  // Drag and drop handlers
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (over && over.id === 'canvas') {
      const componentData = active.data.current;
      if (componentData?.type === 'component-palette') {
        const rect = document.getElementById('canvas').getBoundingClientRect();
        const x = event.delta.x + rect.width / 2 - 100;
        const y = event.delta.y + rect.height / 2 - 50;
        
        const newComponent = {
          id: `component-${Date.now()}`,
          componentId: componentData.component.id,
          props: { ...componentData.component.defaultProps },
          position: { 
            x: showGrid ? snapToGrid(Math.max(0, x)) : Math.max(0, x), 
            y: showGrid ? snapToGrid(Math.max(0, y)) : Math.max(0, y)
          }
        };
        
        setCanvasComponents(prev => [...prev, newComponent]);
        setSelectedComponent(newComponent.id);
        saveToHistory();
      }
    }
    
    setActiveId(null);
  };

  // Component management functions
  const updateComponent = useCallback((id, updates) => {
    setCanvasComponents(prev => 
      prev.map(comp => 
        comp.id === id ? { ...comp, ...updates } : comp
      )
    );
    saveToHistory();
  }, [saveToHistory]);

  const deleteComponent = useCallback((id) => {
    setCanvasComponents(prev => prev.filter(comp => comp.id !== id));
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
    saveToHistory();
  }, [selectedComponent, saveToHistory]);

  const clearCanvas = () => {
    setCanvasComponents([]);
    setSelectedComponent(null);
    saveToHistory();
  };

  const duplicateComponent = useCallback((id) => {
    const component = canvasComponents.find(comp => comp.id === id);
    if (component) {
      const newComponent = {
        ...component,
        id: `component-${Date.now()}`,
        position: {
          x: component.position.x + 20,
          y: component.position.y + 20
        }
      };
      setCanvasComponents(prev => [...prev, newComponent]);
      setSelectedComponent(newComponent.id);
      saveToHistory();
    }
  }, [canvasComponents, saveToHistory]);

  // Get filtered components
  const getFilteredComponents = () => {
    let filtered = ENHANCED_COMPONENT_REGISTRY;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(comp => comp.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(comp => 
        comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const categories = [
    { id: 'all', name: 'All Components', count: ENHANCED_COMPONENT_REGISTRY.length },
    { id: 'buttons', name: 'Buttons & Actions', count: 25 },
    { id: 'forms', name: 'Forms & Inputs', count: 20 },
    { id: 'layout', name: 'Layout & Structure', count: 18 },
    { id: 'navigation', name: 'Navigation', count: 15 },
    { id: 'data-display', name: 'Data Display', count: 12 },
    { id: 'feedback', name: 'Feedback', count: 10 },
    { id: 'ecommerce', name: 'E-commerce', count: 8 },
    { id: 'marketing', name: 'Marketing', count: 12 }
  ];

  // Draggable component item
  function DraggableComponentItem({ component }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
      id: `palette-${component.id}`,
      data: { type: 'component-palette', component }
    });

    const style = transform ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      opacity: isDragging ? 0.5 : 1,
      zIndex: isDragging ? 50 : 'auto'
    } : undefined;

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`bg-white border-2 border-gray-200 rounded-lg p-3 cursor-grab hover:shadow-md transition-all select-none ${
          isDragging ? 'cursor-grabbing border-indigo-500 shadow-lg' : 'hover:border-gray-300'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <component.icon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate">{component.name}</div>
            <div className="text-xs text-gray-500 capitalize truncate">
              {component.category.replace('-', ' ')}
            </div>
          </div>
          <Move className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </div>
      </div>
    );
  }

  // Droppable canvas
  function DroppableCanvas() {
    const { isOver, setNodeRef } = useDroppable({
      id: 'canvas'
    });

    return (
      <div
        ref={setNodeRef}
        id="canvas"
        className={`flex-1 relative bg-white border-2 border-dashed transition-all min-h-screen ${
          isOver ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
        }`}
        onClick={() => setSelectedComponent(null)}
      >
        <GridOverlay show={showGrid} />
        
        {/* Drop zone indicator */}
        {isOver && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Drop component here
              </div>
            </div>
          </div>
        )}
        
        {/* Components */}
        {canvasComponents.map(component => (
          <CanvasComponent
            key={component.id}
            component={component}
            isSelected={selectedComponent === component.id}
            onSelect={setSelectedComponent}
            onUpdate={updateComponent}
            onDelete={deleteComponent}
            showGrid={showGrid}
          />
        ))}
        
        {/* Empty state */}
        {canvasComponents.length === 0 && !isOver && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Layers className="w-8 h-8" />
              </div>
              <div className="text-xl font-medium mb-2">Start Building</div>
              <div className="text-sm text-gray-600 mb-4">Drag components from the left sidebar to get started</div>
              <div className="text-xs text-gray-400">
                💡 Tip: Double-click text elements to edit them inline
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Enhanced Toolbar */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white shadow-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Eternal UI Builder
              </h1>
            </div>
            
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {canvasComponents.length} component{canvasComponents.length !== 1 ? 's' : ''}
            </div>

            {/* Undo/Redo */}
            <div className="flex items-center gap-1">
              <button
                onClick={undo}
                disabled={historyIndex <= 0}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Undo (Cmd+Z)"
              >
                <Undo className="w-4 h-4" />
              </button>
              <button
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Redo (Cmd+Shift+Z)"
              >
                <Redo className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Grid toggle */}
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                showGrid 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Toggle grid snap"
            >
              <Grid className="w-4 h-4" />
              Grid
            </button>

            {/* Viewport toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setPreviewMode('desktop')}
                className={`p-2 rounded ${
                  previewMode === 'desktop' 
                    ? 'bg-white shadow-sm text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="Desktop view"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={`p-2 rounded ${
                  previewMode === 'mobile' 
                    ? 'bg-white shadow-sm text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="Mobile view"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Action buttons */}
            <button
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <Code className="w-4 h-4" />
              Code
            </button>
            
            <button
              onClick={clearCanvas}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Clear
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Enhanced Component Palette */}
          <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Components Library</h3>
              
              {/* Search */}
              <div className="relative mb-4">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              {/* Category tabs */}
              <div className="flex flex-wrap gap-1">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
            
            {/* Component grid */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-1 gap-2">
                {getFilteredComponents().map(component => (
                  <DraggableComponentItem key={component.id} component={component} />
                ))}
              </div>
              
              {getFilteredComponents().length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                  <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No components found</p>
                  <p className="text-xs text-gray-400">Try adjusting your search</p>
                </div>
              )}
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 flex flex-col">
            <DroppableCanvas />
          </div>

          {/* Enhanced Property Panel */}
          <div className="w-80 border-l border-gray-200 bg-white flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Properties</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {selectedComponent ? (
                <ComponentProperties
                  component={canvasComponents.find(c => c.id === selectedComponent)}
                  onUpdate={updateComponent}
                  onDuplicate={duplicateComponent}
                />
              ) : (
                <div className="text-center text-gray-500 mt-8">
                  <Settings className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Select a component</p>
                  <p className="text-xs text-gray-400">Click on any element to edit its properties</p>
                </div>
              )}
            </div>

            {/* Code Generation Panel */}
            {showCode && (
              <div className="border-t border-gray-200 p-4 max-h-96 overflow-y-auto">
                <h4 className="font-medium mb-3">Generated Code</h4>
                <CodeGenerator components={canvasComponents} />
              </div>
            )}
          </div>
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeId ? (
            <div className="opacity-75 transform rotate-2 scale-105">
              <div className="bg-white border-2 border-indigo-500 rounded-lg p-3 shadow-lg">
                <div className="font-medium text-sm text-indigo-700">
                  {ENHANCED_COMPONENT_REGISTRY.find(c => `palette-${c.id}` === activeId)?.name}
                </div>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}

// Component Properties Panel
function ComponentProperties({ component, onUpdate, onDuplicate }) {
  if (!component) return null;

  const handlePropChange = (key, value) => {
    onUpdate(component.id, {
      props: { ...component.props, [key]: value }
    });
  };

  const handlePositionChange = (axis, value) => {
    onUpdate(component.id, {
      position: { ...component.position, [axis]: parseInt(value) || 0 }
    });
  };

  return (
    <div className="space-y-6">
      {/* Component info */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900">
            {ENHANCED_COMPONENT_REGISTRY.find(c => c.id === component.componentId)?.name || component.componentId}
          </h4>
          <button
            onClick={() => onDuplicate(component.id)}
            className="p-1 text-gray-400 hover:text-gray-600"
            title="Duplicate component"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
        
        <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
          ID: {component.id}
        </div>
      </div>

      {/* Position controls */}
      <div>
        <h5 className="font-medium text-sm text-gray-700 mb-2">Position</h5>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">X</label>
            <input
              type="number"
              value={component.position.x}
              onChange={(e) => handlePositionChange('x', e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Y</label>
            <input
              type="number"
              value={component.position.y}
              onChange={(e) => handlePositionChange('y', e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Component-specific properties */}
      <div>
        <h5 className="font-medium text-sm text-gray-700 mb-2">Properties</h5>
        <div className="space-y-3">
          {Object.entries(component.props).map(([key, value]) => (
            <div key={key}>
              <label className="text-xs text-gray-500 block mb-1 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              {typeof value === 'boolean' ? (
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handlePropChange(key, e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Enable {key}</span>
                </label>
              ) : key === 'variant' ? (
                <select
                  value={value}
                  onChange={(e) => handlePropChange(key, e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="outline">Outline</option>
                  <option value="ghost">Ghost</option>
                  <option value="destructive">Destructive</option>
                  <option value="gradient">Gradient</option>
                  <option value="neon">Neon</option>
                  <option value="glass">Glass</option>
                </select>
              ) : key === 'size' ? (
                <select
                  value={value}
                  onChange={(e) => handlePropChange(key, e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="xs">Extra Small</option>
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                </select>
              ) : Array.isArray(value) ? (
                <div className="space-y-1">
                  {value.map((item, index) => (
                    <input
                      key={index}
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newArray = [...value];
                        newArray[index] = e.target.value;
                        handlePropChange(key, newArray);
                      }}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  ))}
                  <button
                    onClick={() => handlePropChange(key, [...value, ''])}
                    className="text-xs text-indigo-600 hover:text-indigo-700"
                  >
                    + Add item
                  </button>
                </div>
              ) : (
                <input
                  type="text"
                  value={value || ''}
                  onChange={(e) => handlePropChange(key, e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder={`Enter ${key}...`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Style controls */}
      <div>
        <h5 className="font-medium text-sm text-gray-700 mb-2">Styling</h5>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Background Color</label>
            <input
              type="color"
              defaultValue="#ffffff"
              className="w-full h-8 border border-gray-300 rounded cursor-pointer"
            />
          </div>
          
          <div>
            <label className="text-xs text-gray-500 block mb-1">Text Color</label>
            <input
              type="color"
              defaultValue="#000000"
              className="w-full h-8 border border-gray-300 rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Border Radius</label>
            <select className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500">
              <option value="none">None</option>
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="full">Full</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Shadow</label>
            <select className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500">
              <option value="none">None</option>
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
            </select>
          </div>
        </div>
      </div>

      {/* Layout controls */}
      <div>
        <h5 className="font-medium text-sm text-gray-700 mb-2">Layout</h5>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Display</label>
            <select className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500">
              <option value="block">Block</option>
              <option value="inline">Inline</option>
              <option value="inline-block">Inline Block</option>
              <option value="flex">Flex</option>
              <option value="grid">Grid</option>
              <option value="none">Hidden</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Width</label>
              <input
                type="text"
                placeholder="auto"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Height</label>
              <input
                type="text"
                placeholder="auto"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Padding</label>
            <div className="grid grid-cols-4 gap-1">
              <input type="text" placeholder="T" className="px-1 py-1 text-xs border border-gray-300 rounded text-center" />
              <input type="text" placeholder="R" className="px-1 py-1 text-xs border border-gray-300 rounded text-center" />
              <input type="text" placeholder="B" className="px-1 py-1 text-xs border border-gray-300 rounded text-center" />
              <input type="text" placeholder="L" className="px-1 py-1 text-xs border border-gray-300 rounded text-center" />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Margin</label>
            <div className="grid grid-cols-4 gap-1">
              <input type="text" placeholder="T" className="px-1 py-1 text-xs border border-gray-300 rounded text-center" />
              <input type="text" placeholder="R" className="px-1 py-1 text-xs border border-gray-300 rounded text-center" />
              <input type="text" placeholder="B" className="px-1 py-1 text-xs border border-gray-300 rounded text-center" />
              <input type="text" placeholder="L" className="px-1 py-1 text-xs border border-gray-300 rounded text-center" />
            </div>
          </div>
        </div>
      </div>

      {/* Typography controls */}
      <div>
        <h5 className="font-medium text-sm text-gray-700 mb-2">Typography</h5>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Font Family</label>
            <select className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500">
              <option value="inter">Inter</option>
              <option value="roboto">Roboto</option>
              <option value="helvetica">Helvetica</option>
              <option value="arial">Arial</option>
              <option value="georgia">Georgia</option>
              <option value="times">Times</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Size</label>
              <select className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option value="xs">Extra Small</option>
                <option value="sm">Small</option>
                <option value="base">Base</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
                <option value="2xl">2X Large</option>
                <option value="3xl">3X Large</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Weight</label>
              <select className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option value="light">Light</option>
                <option value="normal">Normal</option>
                <option value="medium">Medium</option>
                <option value="semibold">Semibold</option>
                <option value="bold">Bold</option>
                <option value="extrabold">Extra Bold</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
              <AlignLeft className="w-4 h-4" />
            </button>
            <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
              <AlignCenter className="w-4 h-4" />
            </button>
            <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
              <AlignRight className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
              <Bold className="w-4 h-4" />
            </button>
            <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
              <Italic className="w-4 h-4" />
            </button>
            <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
              <Underline className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={() => onDuplicate(component.id)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors mb-2"
        >
          <Copy className="w-4 h-4" />
          Duplicate Component
        </button>
        
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
          <Share className="w-4 h-4" />
          Export Component
        </button>
      </div>
    </div>
  );
}