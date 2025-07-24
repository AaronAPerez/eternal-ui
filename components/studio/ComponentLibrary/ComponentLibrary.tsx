// // =================================================================
// // ENHANCED COMPONENT REGISTRY - PHASE 1 IMPLEMENTATION
// // =================================================================


// // =================================================================
// // ENHANCED COMPONENT METADATA INTERFACE
// // =================================================================

// export interface EnhancedComponentMeta extends ComponentMeta {
//   // New fields for enhanced functionality
//   framework: ('react' | 'vue' | 'angular' | 'html')[];
//   accessibility: {
//     screenReader: boolean;
//     keyboardNavigation: boolean;
//     focusManagement: boolean;
//     colorContrast: 'AA' | 'AAA';
//   };
//   performance: {
//     bundleSize: number;
//     renderScore: number;
//     lazyLoadable: boolean;
//   };
//   variants: {
//     id: string;
//     name: string;
//     preview?: string;
//     props: Record<string, any>;
//   }[];
//   dependencies?: string[];
//   documentation?: {
//     usage: string;
//     examples: string[];
//     bestPractices: string[];
//   };
// }

// // =================================================================
// // COMPONENT CATEGORIES WITH COUNTS
// // =================================================================

// export const COMPONENT_CATEGORIES = [
//   { id: 'all', name: 'All Components', count: 120, icon: '📦' },
//   { id: 'buttons', name: 'Buttons & Actions', count: 25, icon: '🔘' },
//   { id: 'forms', name: 'Forms & Inputs', count: 20, icon: '📝' },
//   { id: 'layout', name: 'Layout & Structure', count: 18, icon: '🏗️' },
//   { id: 'navigation', name: 'Navigation', count: 15, icon: '🧭' },
//   { id: 'content', name: 'Content Display', count: 12, icon: '📊' },
//   { id: 'marketing', name: 'Marketing & CTA', count: 12, icon: '🎯' },
//   { id: 'feedback', name: 'Feedback & Status', count: 10, icon: '💬' },
//   { id: 'ecommerce', name: 'E-commerce', count: 8, icon: '🛒' }
// ];

// // =================================================================
// // YOUR EXISTING COMPONENTS - ENHANCED
// // =================================================================

// const ENHANCED_COMPONENT_LIBRARY: EnhancedComponentMeta[] = [
//   {
//     // Your existing hero section - enhanced
//     id: 'hero-section',
//     name: 'Hero Section',
//     description: 'Customizable hero section with background options and CTA buttons',
//     category: 'layout',
//     tags: ['hero', 'landing', 'cta', 'banner'],
//     complexity: 'intermediate',
//     popularity: 95,
//     isPremium: false,
//     bundleSize: 12,
//     renderScore: 98,
//     wcagLevel: 'AA',
//     rating: 4.8,
//     downloadCount: 15600,
//     lastUpdated: '2025-01-15',
//     component: HeroSection,
    
//     // Enhanced fields
//     framework: ['react', 'vue', 'angular', 'html'],
//     accessibility: {
//       screenReader: true,
//       keyboardNavigation: true,
//       focusManagement: true,
//       colorContrast: 'AA'
//     },
//     performance: {
//       bundleSize: 12,
//       renderScore: 98,
//       lazyLoadable: true
//     },
//     variants: [
//       {
//         id: 'standard',
//         name: 'Standard Hero',
//         props: { variant: 'standard', backgroundColor: '#6366F1' }
//       },
//       {
//         id: 'minimal',
//         name: 'Minimal Hero',
//         props: { variant: 'minimal', backgroundColor: '#FFFFFF' }
//       },
//       {
//         id: 'large',
//         name: 'Large Hero',
//         props: { variant: 'large', backgroundColor: '#1F2937' }
//       }
//     ],
//     dependencies: ['framer-motion'],
//     documentation: {
//       usage: 'Perfect for landing pages and homepage headers',
//       examples: [
//         'SaaS landing page hero',
//         'Product launch announcement',
//         'Company homepage header'
//       ],
//       bestPractices: [
//         'Keep headlines under 60 characters',
//         'Use high-contrast colors for accessibility',
//         'Include clear call-to-action'
//       ]
//     },

//     propsSchema: {
//       title: { type: 'string', label: 'Hero Title', default: 'Welcome to Our Platform' },
//       subtitle: { type: 'textarea', label: 'Hero Subtitle', default: 'Build amazing websites with our visual builder' },
//       ctaText: { type: 'string', label: 'CTA Button Text', default: 'Get Started' },
//       ctaUrl: { type: 'string', label: 'CTA Button URL', default: '#' },
//       variant: { 
//         type: 'select', 
//         label: 'Hero Variant', 
//         options: [
//           { label: 'Standard', value: 'standard' },
//           { label: 'Minimal', value: 'minimal' },
//           { label: 'Large', value: 'large' }
//         ], 
//         default: 'standard' 
//       },
//       backgroundImage: { type: 'image', label: 'Background Image' },
//       backgroundColor: { type: 'color', label: 'Background Color', default: '#6366F1' },
//       textColor: { type: 'color', label: 'Text Color', default: '#FFFFFF' }
//     },
//     defaultProps: {
//       title: 'Welcome to Our Platform',
//       subtitle: 'Build amazing websites with our visual builder',
//       ctaText: 'Get Started',
//       ctaUrl: '#',
//       variant: 'standard',
//       backgroundColor: '#6366F1',
//       textColor: '#FFFFFF'
//     },
//     codeExample: `<HeroSection
//   title="Welcome to Our Platform"
//   subtitle="Build amazing websites with our visual builder"
//   ctaText="Get Started"
//   backgroundColor="#6366F1"
//   textColor="#FFFFFF"
// />`
//   },

//   // =================================================================
//   // NEW BUTTON COMPONENTS (25 total)
//   // =================================================================
  
//   {
//     id: 'button-primary',
//     name: 'Primary Button',
//     description: 'Main action button with multiple variants and states',
//     category: 'buttons',
//     tags: ['button', 'primary', 'action', 'cta'],
//     complexity: 'beginner',
//     popularity: 98,
//     isPremium: false,
//     bundleSize: 4,
//     renderScore: 99,
//     wcagLevel: 'AAA',
//     rating: 4.9,
//     downloadCount: 28500,
//     lastUpdated: '2025-01-20',
//     component: 'Button', // You'll create this
//     framework: ['react', 'vue', 'angular', 'html'],
//     accessibility: {
//       screenReader: true,
//       keyboardNavigation: true,
//       focusManagement: true,
//       colorContrast: 'AAA'
//     },
//     performance: {
//       bundleSize: 4,
//       renderScore: 99,
//       lazyLoadable: false
//     },
//     variants: [
//       { id: 'primary', name: 'Primary', props: { variant: 'primary' } },
//       { id: 'secondary', name: 'Secondary', props: { variant: 'secondary' } },
//       { id: 'outline', name: 'Outline', props: { variant: 'outline' } },
//       { id: 'ghost', name: 'Ghost', props: { variant: 'ghost' } },
//       { id: 'destructive', name: 'Destructive', props: { variant: 'destructive' } }
//     ],
//     propsSchema: {
//       children: { type: 'string', label: 'Button Text', default: 'Click me' },
//       variant: {
//         type: 'select',
//         label: 'Variant',
//         options: [
//           { label: 'Primary', value: 'primary' },
//           { label: 'Secondary', value: 'secondary' },
//           { label: 'Outline', value: 'outline' },
//           { label: 'Ghost', value: 'ghost' },
//           { label: 'Destructive', value: 'destructive' }
//         ],
//         default: 'primary'
//       },
//       size: {
//         type: 'select',
//         label: 'Size',
//         options: [
//           { label: 'Small', value: 'sm' },
//           { label: 'Medium', value: 'md' },
//           { label: 'Large', value: 'lg' }
//         ],
//         default: 'md'
//       },
//       disabled: { type: 'boolean', label: 'Disabled', default: false },
//       loading: { type: 'boolean', label: 'Loading State', default: false }
//     },
//     defaultProps: {
//       children: 'Click me',
//       variant: 'primary',
//       size: 'md',
//       disabled: false,
//       loading: false
//     },
//     codeExample: `<Button variant="primary" size="md">Click me</Button>`
//   },

//   {
//     id: 'button-gradient',
//     name: 'Gradient Button',
//     description: 'Eye-catching gradient button with hover animations',
//     category: 'buttons',
//     tags: ['button', 'gradient', 'modern', 'animated'],
//     complexity: 'beginner',
//     popularity: 87,
//     isPremium: false,
//     bundleSize: 5,
//     renderScore: 96,
//     wcagLevel: 'AA',
//     rating: 4.7,
//     downloadCount: 18200,
//     lastUpdated: '2025-01-18',
//     component: 'GradientButton',
//     framework: ['react', 'vue', 'angular', 'html'],
//     accessibility: {
//       screenReader: true,
//       keyboardNavigation: true,
//       focusManagement: true,
//       colorContrast: 'AA'
//     },
//     performance: {
//       bundleSize: 5,
//       renderScore: 96,
//       lazyLoadable: false
//     },
//     variants: [
//       { id: 'blue-purple', name: 'Blue to Purple', props: { gradient: 'blue-purple' } },
//       { id: 'pink-orange', name: 'Pink to Orange', props: { gradient: 'pink-orange' } },
//       { id: 'green-blue', name: 'Green to Blue', props: { gradient: 'green-blue' } }
//     ],
//     propsSchema: {
//       children: { type: 'string', label: 'Button Text', default: 'Get Started' },
//       gradient: {
//         type: 'select',
//         label: 'Gradient Style',
//         options: [
//           { label: 'Blue to Purple', value: 'blue-purple' },
//           { label: 'Pink to Orange', value: 'pink-orange' },
//           { label: 'Green to Blue', value: 'green-blue' }
//         ],
//         default: 'blue-purple'
//       },
//       size: {
//         type: 'select',
//         label: 'Size',
//         options: [
//           { label: 'Small', value: 'sm' },
//           { label: 'Medium', value: 'md' },
//           { label: 'Large', value: 'lg' }
//         ],
//         default: 'md'
//       },
//       animated: { type: 'boolean', label: 'Hover Animation', default: true }
//     },
//     defaultProps: {
//       children: 'Get Started',
//       gradient: 'blue-purple',
//       size: 'md',
//       animated: true
//     },
//     codeExample: `<GradientButton gradient="blue-purple" animated>Get Started</GradientButton>`
//   },

//   // =================================================================
//   // FORM COMPONENTS (20 total)
//   // =================================================================

//   {
//     id: 'input-text',
//     name: 'Text Input',
//     description: 'Versatile text input with validation and multiple styles',
//     category: 'forms',
//     tags: ['input', 'text', 'form', 'validation'],
//     complexity: 'beginner',
//     popularity: 94,
//     isPremium: false,
//     bundleSize: 6,
//     renderScore: 97,
//     wcagLevel: 'AAA',
//     rating: 4.8,
//     downloadCount: 24800,
//     lastUpdated: '2025-01-19',
//     component: 'TextInput',
//     framework: ['react', 'vue', 'angular', 'html'],
//     accessibility: {
//       screenReader: true,
//       keyboardNavigation: true,
//       focusManagement: true,
//       colorContrast: 'AAA'
//     },
//     performance: {
//       bundleSize: 6,
//       renderScore: 97,
//       lazyLoadable: false
//     },
//     variants: [
//       { id: 'default', name: 'Default', props: { variant: 'default' } },
//       { id: 'filled', name: 'Filled', props: { variant: 'filled' } },
//       { id: 'underlined', name: 'Underlined', props: { variant: 'underlined' } }
//     ],
//     propsSchema: {
//       label: { type: 'string', label: 'Label', default: 'Full Name' },
//       placeholder: { type: 'string', label: 'Placeholder', default: 'Enter your name' },
//       variant: {
//         type: 'select',
//         label: 'Variant',
//         options: [
//           { label: 'Default', value: 'default' },
//           { label: 'Filled', value: 'filled' },
//           { label: 'Underlined', value: 'underlined' }
//         ],
//         default: 'default'
//       },
//       required: { type: 'boolean', label: 'Required', default: false },
//       disabled: { type: 'boolean', label: 'Disabled', default: false },
//       error: { type: 'string', label: 'Error Message', default: '' }
//     },
//     defaultProps: {
//       label: 'Full Name',
//       placeholder: 'Enter your name',
//       variant: 'default',
//       required: false,
//       disabled: false,
//       error: ''
//     },
//     codeExample: `<TextInput label="Full Name" placeholder="Enter your name" required />`
//   },

//   // =================================================================
//   // NAVIGATION COMPONENTS (15 total)
//   // =================================================================

//   {
//     id: 'navbar-modern',
//     name: 'Modern Navbar',
//     description: 'Responsive navigation bar with mobile menu and animations',
//     category: 'navigation',
//     tags: ['navbar', 'navigation', 'responsive', 'mobile'],
//     complexity: 'intermediate',
//     popularity: 91,
//     isPremium: false,
//     bundleSize: 14,
//     renderScore: 95,
//     wcagLevel: 'AA',
//     rating: 4.7,
//     downloadCount: 16900,
//     lastUpdated: '2025-01-17',
//     component: 'ModernNavbar',
//     framework: ['react', 'vue', 'angular', 'html'],
//     accessibility: {
//       screenReader: true,
//       keyboardNavigation: true,
//       focusManagement: true,
//       colorContrast: 'AA'
//     },
//     performance: {
//       bundleSize: 14,
//       renderScore: 95,
//       lazyLoadable: true
//     },
//     variants: [
//       { id: 'light', name: 'Light Theme', props: { theme: 'light' } },
//       { id: 'dark', name: 'Dark Theme', props: { theme: 'dark' } },
//       { id: 'transparent', name: 'Transparent', props: { theme: 'transparent' } }
//     ],
//     dependencies: ['framer-motion'],
//     propsSchema: {
//       brand: { type: 'string', label: 'Brand Name', default: 'Your Logo' },
//       theme: {
//         type: 'select',
//         label: 'Theme',
//         options: [
//           { label: 'Light', value: 'light' },
//           { label: 'Dark', value: 'dark' },
//           { label: 'Transparent', value: 'transparent' }
//         ],
//         default: 'light'
//       },
//       sticky: { type: 'boolean', label: 'Sticky Navigation', default: true },
//       showCta: { type: 'boolean', label: 'Show CTA Button', default: true },
//       ctaText: { type: 'string', label: 'CTA Text', default: 'Get Started' }
//     },
//     defaultProps: {
//       brand: 'Your Logo',
//       theme: 'light',
//       sticky: true,
//       showCta: true,
//       ctaText: 'Get Started'
//     },
//     codeExample: `<ModernNavbar brand="Your Logo" theme="light" sticky showCta />`
//   }

//   // ... Continue with the remaining 90+ components
//   // This is just the foundation - you'll expand this with all 120 components
// ];

// // =================================================================
// // COMPONENT REGISTRY HELPER FUNCTIONS
// // =================================================================

// export class ComponentRegistry {
//   private static instance: ComponentRegistry;
//   private components: Map<string, EnhancedComponentMeta> = new Map();

//   constructor() {
//     this.loadComponents();
//   }

//   static getInstance(): ComponentRegistry {
//     if (!ComponentRegistry.instance) {
//       ComponentRegistry.instance = new ComponentRegistry();
//     }
//     return ComponentRegistry.instance;
//   }

//   private loadComponents() {
//     ENHANCED_COMPONENT_LIBRARY.forEach(component => {
//       this.components.set(component.id, component);
//     });
//   }

//   // Get all components
//   getAllComponents(): EnhancedComponentMeta[] {
//     return Array.from(this.components.values());
//   }

//   // Get components by category
//   getComponentsByCategory(category: string): EnhancedComponentMeta[] {
//     if (category === 'all') return this.getAllComponents();
//     return this.getAllComponents().filter(comp => comp.category === category);
//   }

//   // Search components
//   searchComponents(query: string): EnhancedComponentMeta[] {
//     const searchTerm = query.toLowerCase();
//     return this.getAllComponents().filter(comp =>
//       comp.name.toLowerCase().includes(searchTerm) ||
//       comp.description.toLowerCase().includes(searchTerm) ||
//       comp.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
//       comp.category.toLowerCase().includes(searchTerm)
//     );
//   }

//   // Get component by ID
//   getComponent(id: string): EnhancedComponentMeta | undefined {
//     return this.components.get(id);
//   }

//   // Filter components by criteria
//   filterComponents(filters: {
//     category?: string;
//     complexity?: string;
//     isPremium?: boolean;
//     wcagLevel?: string;
//     framework?: string;
//     tags?: string[];
//   }): EnhancedComponentMeta[] {
//     return this.getAllComponents().filter(comp => {
//       if (filters.category && filters.category !== 'all' && comp.category !== filters.category) {
//         return false;
//       }
//       if (filters.complexity && comp.complexity !== filters.complexity) {
//         return false;
//       }
//       if (filters.isPremium !== undefined && comp.isPremium !== filters.isPremium) {
//         return false;
//       }
//       if (filters.wcagLevel && comp.wcagLevel !== filters.wcagLevel) {
//         return false;
//       }
//       if (filters.framework && !comp.framework.includes(filters.framework as any)) {
//         return false;
//       }
//       if (filters.tags && !filters.tags.some(tag => comp.tags.includes(tag))) {
//         return false;
//       }
//       return true;
//     });
//   }

//   // Get popular components
//   getPopularComponents(limit: number = 10): EnhancedComponentMeta[] {
//     return this.getAllComponents()
//       .sort((a, b) => b.popularity - a.popularity)
//       .slice(0, limit);
//   }

//   // Get recently updated components
//   getRecentComponents(limit: number = 10): EnhancedComponentMeta[] {
//     return this.getAllComponents()
//       .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
//       .slice(0, limit);
//   }

//   // Get component statistics
//   getStats() {
//     const components = this.getAllComponents();
//     return {
//       total: components.length,
//       byCategory: COMPONENT_CATEGORIES.reduce((acc, cat) => {
//         acc[cat.id] = cat.count;
//         return acc;
//       }, {} as Record<string, number>),
//       byComplexity: {
//         beginner: components.filter(c => c.complexity === 'beginner').length,
//         intermediate: components.filter(c => c.complexity === 'intermediate').length,
//         advanced: components.filter(c => c.complexity === 'advanced').length
//       },
//       premium: components.filter(c => c.isPremium).length,
//       free: components.filter(c => !c.isPremium).length
//     };
//   }
// }

// // =================================================================
// // EXPORTS
// // =================================================================

// export default ENHANCED_COMPONENT_LIBRARY;
// export { ENHANCED_COMPONENT_LIBRARY };

// // Singleton instance for easy access
// export const componentRegistry = ComponentRegistry.getInstance();