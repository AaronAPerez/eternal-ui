// src/lib/visual-builder/component-registry.ts
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input/Input'
import { Card } from '@/components/ui/Card'
import { Zap, Type, Square } from 'lucide-react'
import ContactForm from "@/components/marketing/ContactForm/ContactForm";
import FeatureGrid from "@/components/marketing/FeatureGrid/FeatureGrid";
import StatsCounter from "@/components/marketing/StatsCounter/StatsCounter";
import { HeroSection } from "@/components/ModernWebsiteComponents";
import { ComponentMeta } from "@/components/types";
/**
 * 🎨 COMPONENT REGISTRY
 * Your existing components, ready for visual building
 */
export interface ComponentDefinition {
  id: string
  name: string
  category: 'form' | 'layout' | 'display' | 'navigation'
  component: React.ComponentType<any>
  icon: React.ComponentType
  defaultProps: Record<string, any>
  propSchema: PropertySchema[]
  examples: ComponentExample[]
  documentation: string
}

export interface PropertySchema {
  name: string
  type: 'text' | 'number' | 'boolean' | 'select' | 'color'
  label: string
  description?: string
  options?: string[] | { label: string; value: any }[]
  defaultValue?: any
}

export interface ComponentExample {
  name: string
  props: Record<string, any>
}

export const COMPONENT_REGISTRY: ComponentDefinition[] = [
  {
    id: 'button',
    name: 'Button',
    category: 'form',
    component: Button,
    icon: Zap,
    defaultProps: {
      variant: 'primary',
      size: 'md',
      children: 'Click me'
    },
    propSchema: [
      {
        name: 'variant',
        type: 'select',
        label: 'Button Style',
        description: 'Visual style of the button',
        options: [
          { label: 'Primary', value: 'primary' },
          { label: 'Secondary', value: 'secondary' },
          { label: 'Outline', value: 'outline' },
          { label: 'Ghost', value: 'ghost' },
          { label: 'Destructive', value: 'destructive' },
          { label: 'Gradient', value: 'gradient' },
          { label: 'Glass', value: 'glass' },
          { label: 'Neon', value: 'neon' }
        ],
        defaultValue: 'primary'
      },
      {
        name: 'size',
        type: 'select',
        label: 'Size',
        description: 'Button size',
        options: [
          { label: 'Extra Small', value: 'xs' },
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
          { label: 'Extra Large', value: 'xl' }
        ],
        defaultValue: 'md'
      },
      {
        name: 'children',
        type: 'text',
        label: 'Button Text',
        description: 'Text displayed on the button',
        defaultValue: 'Click me'
      },
      {
        name: 'disabled',
        type: 'boolean',
        label: 'Disabled',
        description: 'Disable button interactions',
        defaultValue: false
      },
      {
        name: 'loading',
        type: 'boolean',
        label: 'Loading State',
        description: 'Show loading spinner',
        defaultValue: false
      },
      {
        name: 'glow',
        type: 'boolean',
        label: 'Glow Effect',
        description: 'Add glow effect on hover',
        defaultValue: false
      },
      {
        name: 'floating',
        type: 'boolean',
        label: 'Floating Effect',
        description: 'Add floating animation on hover',
        defaultValue: false
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        label: 'Full Width',
        description: 'Expand to container width',
        defaultValue: false
      }
    ],
    examples: [
      {
        name: 'Primary Button',
        props: { variant: 'primary', children: 'Get Started' }
      },
      {
        name: 'Secondary Action',
        props: { variant: 'secondary', children: 'Learn More' }
      },
      {
        name: 'Outline Style',
        props: { variant: 'outline', children: 'View Details' }
      },
      {
        name: 'With Effects',
        props: { variant: 'gradient', glow: true, floating: true, children: 'Premium Action' }
      }
    ],
    documentation: '/docs/components/button'
  },
  {
    id: 'input',
    name: 'Input',
    category: 'form',
    component: Input,
    icon: Type,
    defaultProps: {
      placeholder: 'Enter text...',
      size: 'md',
      type: 'text'
    },
    propSchema: [
      {
        name: 'label',
        type: 'text',
        label: 'Label',
        description: 'Input field label',
        defaultValue: ''
      },
      {
        name: 'placeholder',
        type: 'text',
        label: 'Placeholder',
        description: 'Placeholder text',
        defaultValue: 'Enter text...'
      },
      {
        name: 'type',
        type: 'select',
        label: 'Input Type',
        description: 'Type of input field',
        options: [
          { label: 'Text', value: 'text' },
          { label: 'Email', value: 'email' },
          { label: 'Password', value: 'password' },
          { label: 'Number', value: 'number' },
          { label: 'Tel', value: 'tel' },
          { label: 'URL', value: 'url' },
          { label: 'Search', value: 'search' }
        ],
        defaultValue: 'text'
      },
      {
        name: 'size',
        type: 'select',
        label: 'Size',
        description: 'Input field size',
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' }
        ],
        defaultValue: 'md'
      },
      {
        name: 'required',
        type: 'boolean',
        label: 'Required',
        description: 'Mark field as required',
        defaultValue: false
      },
      {
        name: 'disabled',
        type: 'boolean',
        label: 'Disabled',
        description: 'Disable input interactions',
        defaultValue: false
      },
      {
        name: 'loading',
        type: 'boolean',
        label: 'Loading State',
        description: 'Show loading indicator',
        defaultValue: false
      },
      {
        name: 'showPasswordToggle',
        type: 'boolean',
        label: 'Password Toggle',
        description: 'Show password visibility toggle (for password inputs)',
        defaultValue: false
      },
      {
        name: 'helperText',
        type: 'text',
        label: 'Helper Text',
        description: 'Additional help text below input',
        defaultValue: ''
      },
      {
        name: 'error',
        type: 'text',
        label: 'Error Message',
        description: 'Error message to display',
        defaultValue: ''
      },
      {
        name: 'success',
        type: 'text',
        label: 'Success Message',
        description: 'Success message to display',
        defaultValue: ''
      }
    ],
    examples: [
      {
        name: 'Basic Input',
        props: { label: 'Full Name', placeholder: 'Enter your name' }
      },
      {
        name: 'Email Input',
        props: { label: 'Email', type: 'email', placeholder: 'you@example.com' }
      },
      {
        name: 'Password Input',
        props: { label: 'Password', type: 'password', showPasswordToggle: true }
      },
      {
        name: 'With Validation',
        props: { 
          label: 'Username', 
          success: 'Username is available!',
          helperText: 'Choose a unique username'
        }
      }
    ],
    documentation: '/docs/components/input'
  },
  {
    id: 'card',
    name: 'Card',
    category: 'layout',
    component: Card,
    icon: Square,
    defaultProps: {
      variant: 'default',
      size: 'md'
    },
    propSchema: [
      {
        name: 'variant',
        type: 'select',
        label: 'Card Style',
        description: 'Visual style of the card',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Elevated', value: 'elevated' },
          { label: 'Outlined', value: 'outlined' },
          { label: 'Glass', value: 'glass' },
          { label: 'Gradient', value: 'gradient' },
          { label: 'Interactive', value: 'interactive' },
          { label: 'Danger', value: 'danger' },
          { label: 'Success', value: 'success' }
        ],
        defaultValue: 'default'
      },
      {
        name: 'size',
        type: 'select',
        label: 'Padding Size',
        description: 'Internal padding amount',
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
          { label: 'Extra Large', value: 'xl' },
          { label: 'None', value: 'none' }
        ],
        defaultValue: 'md'
      },
      {
        name: 'glow',
        type: 'boolean',
        label: 'Glow Effect',
        description: 'Add subtle glow effect',
        defaultValue: false
      },
      {
        name: 'tilt',
        type: 'boolean',
        label: 'Tilt Animation',
        description: 'Add tilt effect on hover',
        defaultValue: false
      },
      {
        name: 'float',
        type: 'boolean',
        label: 'Float Effect',
        description: 'Add floating animation on hover',
        defaultValue: false
      },
      {
        name: 'blur',
        type: 'boolean',
        label: 'Backdrop Blur',
        description: 'Add backdrop blur effect',
        defaultValue: false
      },
      {
        name: 'clickable',
        type: 'boolean',
        label: 'Clickable',
        description: 'Make card interactive/clickable',
        defaultValue: false
      }
    ],
    examples: [
      {
        name: 'Simple Card',
        props: { variant: 'default' }
      },
      {
        name: 'Elevated Card',
        props: { variant: 'elevated', float: true }
      },
      {
        name: 'Glass Card',
        props: { variant: 'glass', blur: true }
      },
      {
        name: 'Interactive Card',
        props: { variant: 'interactive', glow: true, clickable: true }
      }
    ],
    documentation: '/docs/components/card'
  }
]
