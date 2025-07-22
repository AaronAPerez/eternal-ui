import { ComponentDefinition } from "@/types/component"
import { Button } from "./Button"
import { MousePointer, Download, Settings } from "lucide-react"

export const buttonComponentDefinition: ComponentDefinition = {
  id: 'button',
  name: 'Button',
  description: 'A versatile button component with multiple variants, sizes, and interactive states',
  category: 'Interactive',
  tags: ['button', 'interactive', 'form', 'cta', 'action'],
  
  icon: MousePointer,
  preview: '/images/components/button-preview.png',
  thumbnail: '/images/components/button-thumb.png',
  
  props: [
    {
      name: 'children',
      type: 'string',
      label: 'Button Text',
      description: 'The text displayed on the button',
      required: true,
      default: 'Button',
      control: 'input',
      validation: [
        { type: 'required', message: 'Button text is required' },
        { type: 'maxLength', value: 50, message: 'Button text must be less than 50 characters' }
      ]
    },
    {
      name: 'variant',
      type: 'enum',
      label: 'Variant',
      description: 'The visual style of the button',
      default: 'default',
      control: 'select',
      controlConfig: {
        options: [
          { label: 'Default', value: 'default', preview: '#3B82F6' },
          { label: 'Destructive', value: 'destructive', preview: '#EF4444' },
          { label: 'Outline', value: 'outline', preview: 'transparent' },
          { label: 'Secondary', value: 'secondary', preview: '#6B7280' },
          { label: 'Ghost', value: 'ghost', preview: 'transparent' },
          { label: 'Link', value: 'link', preview: 'transparent' },
          { label: 'Gradient', value: 'gradient', preview: 'linear-gradient(45deg, #3B82F6, #8B5CF6)' },
          { label: 'Glass', value: 'glass', preview: 'rgba(255,255,255,0.1)' }
        ]
      }
    },
    {
      name: 'size',
      type: 'enum',
      label: 'Size',
      description: 'The size of the button',
      default: 'default',
      control: 'select',
      controlConfig: {
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Default', value: 'default' },
          { label: 'Large', value: 'lg' },
          { label: 'Extra Large', value: 'xl' },
          { label: 'Icon Only', value: 'icon' }
        ]
      }
    },
    {
      name: 'animation',
      type: 'enum',
      label: 'Animation',
      description: 'Animation effect for the button',
      default: 'none',
      control: 'select',
      controlConfig: {
        options: [
          { label: 'None', value: 'none' },
          { label: 'Pulse', value: 'pulse' },
          { label: 'Bounce', value: 'bounce' },
          { label: 'Wiggle', value: 'wiggle' },
          { label: 'Glow', value: 'glow' }
        ]
      }
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      label: 'Full Width',
      description: 'Make button take full width of container',
      default: false,
      control: 'checkbox'
    },
    {
      name: 'disabled',
      type: 'boolean',
      label: 'Disabled',
      description: 'Disable the button',
      default: false,
      control: 'checkbox'
    },
    {
      name: 'isLoading',
      type: 'boolean',
      label: 'Loading State',
      description: 'Show loading spinner',
      default: false,
      control: 'checkbox'
    },
    {
      name: 'loadingText',
      type: 'string',
      label: 'Loading Text',
      description: 'Text to show when loading',
      default: '',
      control: 'input',
      showWhen: (props) => props.isLoading === true
    },
    {
      name: 'href',
      type: 'string',
      label: 'Link URL',
      description: 'URL to navigate to (makes button a link)',
      default: '',
      control: 'input'
    }
  ],
  
  defaultProps: {
    children: 'Button',
    variant: 'default',
    size: 'default',
    animation: 'none',
    fullWidth: false,
    disabled: false,
    isLoading: false,
    loadingText: '',
    href: ''
  },
  
  styleOptions: [
    {
      name: 'variant',
      type: 'color',
      options: [
        { label: 'Primary', value: 'default', preview: '#3B82F6' },
        { label: 'Destructive', value: 'destructive', preview: '#EF4444' },
        { label: 'Secondary', value: 'secondary', preview: '#6B7280' },
        { label: 'Gradient', value: 'gradient', preview: 'linear-gradient(45deg, #3B82F6, #8B5CF6)' }
      ]
    },
    {
      name: 'size',
      type: 'size',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'default' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' }
      ]
    }
  ],
  
  examples: [
    {
      id: 'basic',
      title: 'Basic Button',
      description: 'A simple button with default styling',
      code: '<Button>Click me</Button>',
      props: { children: 'Click me' },
      preview: true,
      featured: true
    },
    {
      id: 'variants',
      title: 'Button Variants',
      description: 'Different button styles for various use cases',
      code: `<div className="flex flex-wrap gap-2">
  <Button variant="default">Default</Button>
  <Button variant="destructive">Delete</Button>
  <Button variant="outline">Cancel</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</div>`,
      props: { children: 'Default' },
      preview: true,
      featured: true
    },
    {
      id: 'sizes',
      title: 'Button Sizes',
      description: 'Different button sizes for visual hierarchy',
      code: `<div className="flex items-center gap-2">
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
  <Button size="xl">Extra Large</Button>
</div>`,
      props: { children: 'Default' },
      preview: true
    },
    {
      id: 'states',
      title: 'Button States',
      description: 'Loading and disabled states with feedback',
      code: `<div className="flex gap-2">
  <Button>Normal</Button>
  <Button disabled>Disabled</Button>
  <Button isLoading>Loading</Button>
  <Button isLoading loadingText="Saving...">Save</Button>
</div>`,
      props: { children: 'Normal' },
      preview: true
    },
    {
      id: 'with-icons',
      title: 'Buttons with Icons',
      description: 'Enhanced buttons with icons for better UX',
      code: `<div className="flex gap-2">
  <Button icon={<Download className="w-4 h-4" />} iconPosition="left">
    Download
  </Button>
  <Button variant="outline" icon={<Settings className="w-4 h-4" />} iconPosition="right">
    Settings
  </Button>
  <Button size="icon" icon={<Download className="w-4 h-4" />} />
</div>`,
      props: { children: 'Download', icon: 'Download' },
      preview: true
    },
    {
      id: 'animations',
      title: 'Button Animations',
      description: 'Interactive animations for enhanced user experience',
      code: `<div className="flex gap-2">
  <Button animation="glow">Glow Effect</Button>
  <Button animation="bounce" variant="secondary">Bounce</Button>
  <Button animation="wiggle" variant="outline">Wiggle</Button>
</div>`,
      props: { children: 'Glow Effect', animation: 'glow' },
      preview: true
    },
    {
      id: 'advanced',
      title: 'Advanced Examples',
      description: 'Complex button configurations',
      code: `<div className="space-y-4">
  <Button variant="gradient" size="lg" fullWidth animation="glow">
    Get Started Today
  </Button>
  
  <Button 
    href="https://example.com" 
    variant="outline" 
    icon={<ExternalLink className="w-4 h-4" />}
    iconPosition="right"
  >
    External Link
  </Button>
  
  <Button 
    variant="glass" 
    className="backdrop-blur-lg bg-black/20"
  >
    Glass Morphism
  </Button>
</div>`,
      props: { 
        children: 'Get Started Today', 
        variant: 'gradient', 
        size: 'lg', 
        fullWidth: true, 
        animation: 'glow' 
      },
      preview: true,
      featured: true
    }
  ],
  
  generateCode: (props, framework) => {
    switch (framework) {
      case 'react':
        return generateReactCode(props)
      case 'vue':
        return generateVueCode(props)
      case 'html':
        return generateHTMLCode(props)
      default:
        return generateReactCode(props)
    }
  },
  
  builderConfig: {
    canHaveChildren: false,
    resizable: true,
    draggable: true,
    editable: true,
    deletable: true,
    duplicable: true
  },
  
  documentation: {
    overview: 'A flexible button component that supports multiple variants, sizes, states, and animations. Built with accessibility and performance in mind.',
    whenToUse: [
      'For primary actions in forms and dialogs',
      'For navigation triggers and menu items', 
      'For confirming user actions and submissions',
      'For call-to-action elements in marketing content',
      'For toolbar actions and quick controls'
    ],
    accessibility: [
      'Supports keyboard navigation with Tab, Enter, and Space keys',
      'Proper ARIA attributes for screen readers and assistive technology',
      'Focus management with visible focus indicators and proper contrast',
      'Color contrast meets WCAG AA standards for all variants',
      'Loading states are announced to screen readers',
      'Disabled state prevents interaction and is properly announced'
    ],
    bestPractices: [
      'Use descriptive button text that clearly indicates the action result',
      'Provide immediate feedback for loading states to improve perceived performance',
      'Use appropriate variants for context (destructive for delete actions, outline for secondary)',
      'Consider button placement and visual hierarchy in your interface design',
      'Ensure buttons are large enough for touch targets (minimum 44px for mobile)',
      'Use consistent button styling throughout your application',
      'Provide alternative text for icon-only buttons',
      'Group related actions and use appropriate spacing'
    ]
  },
  
  component: Button
}

// Code generation helper functions
function generateReactCode(props: any): string {
  const { children, ...otherProps } = props
  
  // Filter out default values and empty strings
  const propsArray = Object.entries(otherProps)
    .filter(([key, value]) => {
      if (key === 'variant' && value === 'default') return false
      if (key === 'size' && value === 'default') return false
      if (key === 'animation' && value === 'none') return false
      if (key === 'disabled' && value === false) return false
      if (key === 'isLoading' && value === false) return false
      if (key === 'fullWidth' && value === false) return false
      if (key === 'loadingText' && !value) return false
      if (key === 'href' && !value) return false
      return value !== undefined && value !== ''
    })
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        return value ? key : ''
      }
      return `${key}="${value}"`
    })
    .filter(Boolean)
  
  const propsString = propsArray.length > 0 ? ' ' + propsArray.join(' ') : ''
  
  return `<Button${propsString}>${children || 'Button'}</Button>`
}

function generateVueCode(props: any): string {
  const { children, ...otherProps } = props
  
  const propsArray = Object.entries(otherProps)
    .filter(([key, value]) => {
      if (key === 'variant' && value === 'default') return false
      if (key === 'size' && value === 'default') return false
      if (key === 'animation' && value === 'none') return false
      if (key === 'disabled' && value === false) return false
      if (key === 'isLoading' && value === false) return false
      if (key === 'fullWidth' && value === false) return false
      if (key === 'loadingText' && !value) return false
      if (key === 'href' && !value) return false
      return value !== undefined && value !== ''
    })
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        return value ? `:${key}="true"` : ''
      }
      return `:${key}="${JSON.stringify(value)}"`
    })
    .filter(Boolean)
  
  const propsString = propsArray.length > 0 ? ' ' + propsArray.join(' ') : ''
  
  return `<UiButton${propsString}>${children || 'Button'}</UiButton>`
}

function generateHTMLCode(props: any): string {
  const { 
    children, 
    variant = 'default', 
    size = 'default', 
    disabled = false, 
    fullWidth = false,
    href,
    animation = 'none'
  } = props
  
  const classes = ['btn']
  
  // Add variant classes
  if (variant !== 'default') {
    classes.push(`btn-${variant}`)
  }
  
  // Add size classes
  if (size !== 'default') {
    classes.push(`btn-${size}`)
  }
  
  // Add animation classes
  if (animation !== 'none') {
    classes.push(`btn-${animation}`)
  }
  
  // Add modifier classes
  if (fullWidth) {
    classes.push('btn-full-width')
  }
  
  const attributes = []
  if (disabled) {
    attributes.push('disabled')
  }
  
  const tag = href && !disabled ? 'a' : 'button'
  const hrefAttr = href && !disabled ? ` href="${href}"` : ''
  const attributeString = attributes.length > 0 ? ' ' + attributes.join(' ') : ''
  
  return `<${tag} class="${classes.join(' ')}"${hrefAttr}${attributeString}>${children || 'Button'}</${tag}>`
}
