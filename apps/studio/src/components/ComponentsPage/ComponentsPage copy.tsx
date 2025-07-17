// 'use client';

// import React from 'react';
// import { useState, useMemo, useCallback, useEffect } from 'react';
// import { Search, Filter, Grid, List, Star, Download, Eye, Code, Zap, Accessibility, Smartphone, Palette, ChevronDown, ChevronRight, Play, Pause, RotateCcw, Copy, Check } from 'lucide-react';

// // Enhanced TypeScript interfaces based on your project knowledge
// interface ComponentMeta {
//   id: string;
//   name: string;
//   description: string;
//   category: 'layout' | 'navigation' | 'content' | 'forms' | 'data' | 'interactive' | 'ecommerce' | 'marketing' | 'social' | 'media';
//   tags: string[];
//   complexity: 'beginner' | 'intermediate' | 'advanced';
//   popularity: number;
//   isPremium: boolean;
//   propsSchema: Record<string, PropSchema>;
//   defaultProps: Record<string, any>;
//   codeExample: string;
//   bundleSize: number;
//   renderScore: number;
//   wcagLevel: 'A' | 'AA' | 'AAA';
//   rating: number;
//   downloadCount: number;
//   lastUpdated: string;
//   component: React.ComponentType<any>;
// }

// interface PropSchema {
//   type: 'string' | 'number' | 'boolean' | 'color' | 'select' | 'slider' | 'textarea';
//   label: string;
//   description?: string;
//   default?: any;
//   options?: Array<{ label: string; value: any }>;
//   min?: number;
//   max?: number;
// }

// // =================================================================
// // REAL WORLD COMPONENTS FROM YOUR REPOSITORY
// // =================================================================

// // 1. Feature Grid Component
// const FeatureGrid: React.FC<{
//   title: string;
//   subtitle: string;
//   features: number;
//   layout: string;
//   style: string;
//   accentColor: string;
// }> = ({ title, subtitle, features, layout, style, accentColor }) => {
//   const defaultFeatures = [
//     { icon: '🚀', title: 'Lightning Fast', description: 'Optimized for speed and performance' },
//     { icon: '🎨', title: 'Beautiful Design', description: 'Modern and clean interface' },
//     { icon: '🔧', title: 'Easy to Use', description: 'Intuitive drag-and-drop builder' },
//     { icon: '📱', title: 'Mobile Ready', description: 'Responsive on all devices' },
//     { icon: '⚡', title: 'Real-time Sync', description: 'Collaborate with your team' },
//     { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security' },
//     { icon: '🎯', title: 'Targeted', description: 'Built for your specific needs' },
//     { icon: '💰', title: 'Cost Effective', description: 'Save time and money' }
//   ];

//   const gridCols = layout === 'grid-2' ? 'grid-cols-1 md:grid-cols-2' : 
//                    layout === 'grid-3' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
//                    'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';

//   return (
//     <div className="py-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
//         </div>
        
//         <div className={`grid ${gridCols} gap-8`}>
//           {defaultFeatures.slice(0, features).map((feature, index) => (
//             <div
//               key={index}
//               className={
//                 style === 'cards' 
//                   ? 'bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow'
//                   : style === 'minimal'
//                   ? 'text-center'
//                   : 'bg-white p-6 rounded-lg border hover:border-gray-300 transition-colors'
//               }
//             >
//               {style === 'icons' && (
//                 <div 
//                   className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto"
//                   style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
//                 >
//                   <span className="text-2xl">{feature.icon}</span>
//                 </div>
//               )}
//               <div className={style === 'minimal' ? 'text-center' : ''}>
//                 {style !== 'icons' && (
//                   <span className="text-3xl mb-4 block">{feature.icon}</span>
//                 )}
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // 2. Stats Counter Component
// const StatsCounter: React.FC<{
//   title: string;
//   subtitle: string;
//   layout: string;
//   accentColor: string;
// }> = ({ title, subtitle, layout, accentColor }) => {
//   const stats = [
//     { label: 'Happy Customers', value: 10000, suffix: '+' },
//     { label: 'Projects Completed', value: 2500, suffix: '+' },
//     { label: 'Years Experience', value: 15, suffix: '' },
//     { label: 'Team Members', value: 50, suffix: '+' }
//   ];

//   return (
//     <div className={`py-16 ${layout === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'}`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${layout === 'dark' ? 'text-white' : 'text-gray-900'}`}>
//             {title}
//           </h2>
//           <p className={`text-xl max-w-3xl mx-auto ${layout === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
//             {subtitle}
//           </p>
//         </div>
        
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//           {stats.map((stat, index) => (
//             <div key={index} className={`text-center ${layout === 'cards' ? 
//               'bg-white p-6 rounded-lg shadow-lg' : ''}`}>
//               <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: accentColor }}>
//                 {stat.value.toLocaleString()}{stat.suffix}
//               </div>
//               <div className={`font-medium ${layout === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
//                 {stat.label}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // 3. Testimonial Carousel Component
// const TestimonialCarousel: React.FC<{
//   autoPlay: boolean;
//   showAvatars: boolean;
//   style: string;
//   accentColor: string;
// }> = ({ autoPlay, showAvatars, style, accentColor }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const testimonials = [
//     {
//       name: 'Sarah Johnson',
//       role: 'CEO, TechCorp',
//       avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
//       content: 'This component library has transformed our development process. We can build beautiful interfaces in minutes instead of hours.',
//       rating: 5
//     },
//     {
//       name: 'Mike Chen',
//       role: 'Lead Developer, StartupXYZ',
//       avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
//       content: 'The live editing feature is game-changing. Our designers can now iterate on components without touching code.',
//       rating: 5
//     },
//     {
//       name: 'Emily Davis',
//       role: 'Product Manager, Enterprise Co',
//       avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
//       content: 'Outstanding quality and performance. These components helped us launch our product 3 months ahead of schedule.',
//       rating: 5
//     }
//   ];

//   useEffect(() => {
//     if (autoPlay) {
//       const interval = setInterval(() => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
//       }, 4000);
//       return () => clearInterval(interval);
//     }
//   }, [autoPlay, testimonials.length]);

//   return (
//     <div className="py-16 bg-gray-50">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center">
//           <div className="bg-white rounded-2xl p-8 shadow-lg">
//             <div className="mb-6">
//               {'★'.repeat(testimonials[currentIndex].rating).split('').map((star, i) => (
//                 <span key={i} className="text-2xl" style={{ color: accentColor }}>
//                   {star}
//                 </span>
//               ))}
//             </div>
//             <blockquote className="text-xl text-gray-700 mb-6">
//               "{testimonials[currentIndex].content}"
//             </blockquote>
//             {showAvatars && (
//               <div className="flex items-center justify-center">
//                 <img
//                   src={testimonials[currentIndex].avatar}
//                   alt={testimonials[currentIndex].name}
//                   className="w-12 h-12 rounded-full mr-4"
//                 />
//                 <div className="text-left">
//                   <div className="font-semibold text-gray-900">
//                     {testimonials[currentIndex].name}
//                   </div>
//                   <div className="text-gray-600">
//                     {testimonials[currentIndex].role}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
          
//           <div className="flex justify-center mt-6 space-x-2">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentIndex(index)}
//                 className={`w-3 h-3 rounded-full transition-colors ${
//                   index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
//                 }`}
//                 style={{ backgroundColor: index === currentIndex ? accentColor : undefined }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // =================================================================
// // COMPONENT LIBRARY DATA
// // =================================================================

// const REAL_WORLD_COMPONENT_LIBRARY: ComponentMeta[] = [
//   {
//     id: 'feature-grid',
//     name: 'Feature Grid',
//     description: 'Responsive feature grid with customizable layouts and styles',
//     category: 'content',
//     tags: ['features', 'grid', 'responsive', 'icons'],
//     complexity: 'intermediate',
//     popularity: 89,
//     isPremium: false,
//     bundleSize: 16,
//     renderScore: 94,
//     wcagLevel: 'AA',
//     rating: 4.7,
//     downloadCount: 12800,
//     lastUpdated: '2025-01-12',
//     component: FeatureGrid,
//     propsSchema: {
//       title: { type: 'string', label: 'Section Title', default: 'Why Choose Us' },
//       subtitle: { type: 'string', label: 'Section Subtitle', default: 'Discover the features that set us apart' },
//       features: { type: 'slider', label: 'Number of Features', min: 3, max: 8, default: 6 },
//       layout: { 
//         type: 'select', 
//         label: 'Grid Layout', 
//         options: [
//           { label: '2 Columns', value: 'grid-2' },
//           { label: '3 Columns', value: 'grid-3' },
//           { label: '4 Columns', value: 'grid-4' }
//         ], 
//         default: 'grid-3' 
//       },
//       style: { 
//         type: 'select', 
//         label: 'Display Style', 
//         options: [
//           { label: 'Cards', value: 'cards' },
//           { label: 'Minimal', value: 'minimal' },
//           { label: 'Icons', value: 'icons' }
//         ], 
//         default: 'cards' 
//       },
//       accentColor: { type: 'color', label: 'Accent Color', default: '#3B82F6' }
//     },
//     defaultProps: {
//       title: 'Why Choose Us',
//       subtitle: 'Discover the features that set us apart',
//       features: 6,
//       layout: 'grid-3',
//       style: 'cards',
//       accentColor: '#3B82F6'
//     },
//     codeExample: `<FeatureGrid
//   title="Why Choose Us"
//   subtitle="Discover the features that set us apart"
//   features={6}
//   layout="grid-3"
//   style="cards"
//   accentColor="#3B82F6"
// />`
//   },
//   {
//     id: 'stats-counter',
//     name: 'Stats Counter',
//     description: 'Animated statistics display with multiple layout options',
//     category: 'content',
//     tags: ['stats', 'numbers', 'achievements', 'counters'],
//     complexity: 'beginner',
//     popularity: 76,
//     isPremium: false,
//     bundleSize: 8,
//     renderScore: 96,
//     wcagLevel: 'AAA',
//     rating: 4.5,
//     downloadCount: 9200,
//     lastUpdated: '2025-01-10',
//     component: StatsCounter,
//     propsSchema: {
//       title: { type: 'string', label: 'Section Title', default: 'Our Achievements' },
//       subtitle: { type: 'string', label: 'Section Subtitle', default: 'Numbers that speak for themselves' },
//       layout: { 
//         type: 'select', 
//         label: 'Layout Style', 
//         options: [
//           { label: 'Light', value: 'light' },
//           { label: 'Dark', value: 'dark' },
//           { label: 'Cards', value: 'cards' }
//         ], 
//         default: 'light' 
//       },
//       accentColor: { type: 'color', label: 'Accent Color', default: '#10B981' }
//     },
//     defaultProps: {
//       title: 'Our Achievements',
//       subtitle: 'Numbers that speak for themselves',
//       layout: 'light',
//       accentColor: '#10B981'
//     },
//     codeExample: `<StatsCounter
//   title="Our Achievements"
//   subtitle="Numbers that speak for themselves"
//   layout="light"
//   accentColor="#10B981"
// />`
//   },
//   {
//     id: 'testimonial-carousel',
//     name: 'Testimonial Carousel',
//     description: 'Customer testimonials with auto-play and avatar options',
//     category: 'social',
//     tags: ['testimonials', 'reviews', 'carousel', 'customers'],
//     complexity: 'intermediate',
//     popularity: 92,
//     isPremium: false,
//     bundleSize: 22,
//     renderScore: 88,
//     wcagLevel: 'AA',
//     rating: 4.8,
//     downloadCount: 15600,
//     lastUpdated: '2025-01-15',
//     component: TestimonialCarousel,
//     propsSchema: {
//       autoPlay: { type: 'boolean', label: 'Auto Play', default: true },
//       showAvatars: { type: 'boolean', label: 'Show Avatars', default: true },
//       style: { 
//         type: 'select', 
//         label: 'Display Style', 
//         options: [
//           { label: 'Cards', value: 'cards' },
//           { label: 'Centered', value: 'centered' },
//           { label: 'Grid', value: 'grid' }
//         ], 
//         default: 'cards' 
//       },
//       accentColor: { type: 'color', label: 'Accent Color', default: '#F59E0B' }
//     },
//     defaultProps: {
//       autoPlay: true,
//       showAvatars: true,
//       style: 'cards',
//       accentColor: '#F59E0B'
//     },
//     codeExample: `<TestimonialCarousel
//   autoPlay={true}
//   showAvatars={true}
//   style="cards"
//   accentColor="#F59E0B"
// />`
//   }
// ];

// // =================================================================
// // MAIN COMPONENTS PAGE IMPLEMENTATION
// // =================================================================

// export default function ComponentsPage() {
//   const [selectedComponent, setSelectedComponent] = useState<ComponentMeta | null>(
//     REAL_WORLD_COMPONENT_LIBRARY[0] || null
//   );
//   const [props, setProps] = useState<Record<string, any>>(
//     REAL_WORLD_COMPONENT_LIBRARY[0]?.defaultProps || {}
//   );
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState<string>('all');
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [showCode, setShowCode] = useState(false);
//   const [isPropsOpen, setIsPropsOpen] = useState(true);
//   const [favorites, setFavorites] = useState<string[]>([]);
//   const [copiedCode, setCopiedCode] = useState(false);

//   // Use the imported real-world components
//   const components = REAL_WORLD_COMPONENT_LIBRARY;

//   // Filter components based on search and category
//   const filteredComponents = useMemo(() => {
//     return components.filter(component => {
//       const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            component.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
//       const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
      
//       return matchesSearch && matchesCategory;
//     });
//   }, [searchTerm, selectedCategory, components]);

//   // Get unique categories
//   const categories = useMemo(() => {
//     const cats = components.reduce((acc, component) => {
//       if (!acc.includes(component.category)) {
//         acc.push(component.category);
//       }
//       return acc;
//     }, [] as string[]);
//     return ['all', ...cats];
//   }, [components]);

//   // Handle component selection
//   const handleComponentSelect = useCallback((component: ComponentMeta) => {
//     setSelectedComponent(component);
//     setProps(component.defaultProps);
//     setShowCode(false);
//   }, []);

//   // Handle prop changes
//   const handlePropChange = useCallback((key: string, value: any) => {
//     setProps(prev => ({ ...prev, [key]: value }));
//   }, []);

//   // Handle favorites
//   const toggleFavorite = useCallback((componentId: string) => {
//     setFavorites(prev => 
//       prev.includes(componentId) 
//         ? prev.filter(id => id !== componentId)
//         : [...prev, componentId]
//     );
//   }, []);

//   // Copy code to clipboard
//   const copyCodeToClipboard = useCallback(async () => {
//     if (selectedComponent) {
//       try {
//         await navigator.clipboard.writeText(selectedComponent.codeExample);
//         setCopiedCode(true);
//         setTimeout(() => setCopiedCode(false), 2000);
//       } catch (err) {
//         console.error('Failed to copy code:', err);
//       }
//     }
//   }, [selectedComponent]);

//   // Render prop editor
//   const renderPropEditor = useCallback((key: string, schema: PropSchema) => {
//     const value = props[key] || schema.default;

//     switch (schema.type) {
//       case 'string':
//         return (
//           <input
//             type="text"
//             value={value}
//             onChange={(e) => handlePropChange(key, e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder={schema.label}
//           />
//         );
      
//       case 'number':
//         return (
//           <input
//             type="number"
//             value={value}
//             onChange={(e) => handlePropChange(key, parseInt(e.target.value))}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             min={schema.min}
//             max={schema.max}
//           />
//         );
      
//       case 'boolean':
//         return (
//           <label className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               checked={value}
//               onChange={(e) => handlePropChange(key, e.target.checked)}
//               className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//             />
//             <span className="text-sm text-gray-700">{schema.label}</span>
//           </label>
//         );
      
//       case 'color':
//         return (
//           <div className="flex items-center space-x-2">
//             <input
//               type="color"
//               value={value}
//               onChange={(e) => handlePropChange(key, e.target.value)}
//               className="w-12 h-8 rounded border border-gray-300"
//             />
//             <input
//               type="text"
//               value={value}
//               onChange={(e) => handlePropChange(key, e.target.value)}
//               className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         );
      
//       case 'select':
//         return (
//           <select
//             value={value}
//             onChange={(e) => handlePropChange(key, e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {schema.options?.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         );
      
//       case 'slider':
//         return (
//           <div className="space-y-2">
//             <input
//               type="range"
//               min={schema.min}
//               max={schema.max}
//               value={value}
//               onChange={(e) => handlePropChange(key, parseInt(e.target.value))}
//               className="w-full"
//             />
//             <div className="text-sm text-gray-600 text-center">{value}</div>
//           </div>
//         );
      
//       case 'textarea':
//         return (
//           <textarea
//             value={value}
//             onChange={(e) => handlePropChange(key, e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows={3}
//             placeholder={schema.label}
//           />
//         );
      
//       default:
//         return null;
//     }
//   }, [props, handlePropChange]);

//   if (!selectedComponent) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-gray-500">No components available</div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screenbg-white dark:bg-black flex">
//       {/* Left Sidebar - Component Library */}
//       <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
//         {/* Header */}
//         <div className="p-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Component Library</h2>
          
//           {/* Search */}
//           <div className="relative mb-4">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search components..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Category Filter */}
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {categories.map((category) => (
//               <option key={category} value={category}>
//                 {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
//               </option>
//             ))}
//           </select>

//           {/* View Mode Toggle */}
//           <div className="flex mt-4 space-x-2">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg ${
//                 viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
//               }`}
//             >
//               <Grid className="w-4 h-4 mr-2" />
//               Grid
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg ${
//                 viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
//               }`}
//             >
//               <List className="w-4 h-4 mr-2" />
//               List
//             </button>
//           </div>
//         </div>

//         {/* Component List */}
//         <div className="flex-1 overflow-y-auto p-4">
//           <div className={`space-y-2 ${viewMode === 'grid' ? 'grid grid-cols-1 gap-2' : ''}`}>
//             {filteredComponents.map((component) => (
//               <div
//                 key={component.id}
//                 onClick={() => handleComponentSelect(component)}
//                 className={`p-3 rounded-lg border cursor-pointer transition-all ${
//                   selectedComponent?.id === component.id
//                     ? 'border-blue-500 bg-blue-50'
//                     : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
//                 }`}
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <div className="flex items-center space-x-2">
//                       <h3 className="font-medium text-gray-900">{component.name}</h3>
//                       {component.isPremium && (
//                         <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
//                           Pro
//                         </span>
//                       )}
//                     </div>
//                     <p className="text-sm text-gray-600 mt-1 line-clamp-2">
//                       {component.description}
//                     </p>
                    
//                     {viewMode === 'list' && (
//                       <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
//                         <span className="flex items-center">
//                           <Star className="w-3 h-3 mr-1" />
//                           {component.rating}
//                         </span>
//                         <span className="flex items-center">
//                           <Download className="w-3 h-3 mr-1" />
//                           {component.downloadCount.toLocaleString()}
//                         </span>
//                         <span className="flex items-center">
//                           <Zap className="w-3 h-3 mr-1" />
//                           {component.bundleSize}KB
//                         </span>
//                       </div>
//                     )}
//                   </div>
                  
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleFavorite(component.id);
//                     }}
//                     className={`p-1 rounded ${
//                       favorites.includes(component.id)
//                         ? 'text-yellow-500'
//                         : 'text-gray-400 hover:text-yellow-500'
//                     }`}
//                   >
//                     <Star className="w-4 h-4" fill={favorites.includes(component.id) ? 'currentColor' : 'none'} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 flex">
//         {/* Component Preview */}
//         <div className="flex-1 flex flex-col">
//           {/* Preview Header */}
//           <div className="bg-white border-b border-gray-200 p-4">
//                           <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-xl font-semibold text-gray-900">{selectedComponent.name}</h1>
//                   <p className="text-sm text-gray-600 mt-1">{selectedComponent.description}</p>
//                 </div>
                
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => setShowCode(!showCode)}
//                     className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
//                       showCode 
//                         ? 'bg-blue-100 text-blue-700' 
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                     }`}
//                   >
//                     <Code className="w-4 h-4 mr-2" />
//                     {showCode ? 'Hide Code' : 'Show Code'}
//                   </button>
                  
//                   <button
//                     onClick={copyCodeToClipboard}
//                     className="flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-green-100 text-green-700 hover:bg-green-200"
//                   >
//                     {copiedCode ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
//                     {copiedCode ? 'Copied!' : 'Copy Code'}
//                   </button>
//                 </div>
//               </div>
              
//               {/* Component Stats */}
//               <div className="flex items-center space-x-6 mt-4 text-sm text-gray-600">
//                 <div className="flex items-center">
//                   <Star className="w-4 h-4 mr-1 text-yellow-500" />
//                   <span>{selectedComponent.rating}/5</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Download className="w-4 h-4 mr-1" />
//                   <span>{selectedComponent.downloadCount.toLocaleString()} downloads</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Zap className="w-4 h-4 mr-1" />
//                   <span>{selectedComponent.bundleSize}KB bundle</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Accessibility className="w-4 h-4 mr-1" />
//                   <span>WCAG {selectedComponent.wcagLevel}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Smartphone className="w-4 h-4 mr-1" />
//                   <span>Responsive</span>
//                 </div>
//               </div>
//             </div>
        

//           {/* Preview Content */}
//           <div className="flex-1 overflow-auto">
//             {showCode ? (
//               <div className="p-6">
//                 <div className="bg-gray-900 rounded-lg overflow-hidden">
//                   <div className="bg-gray-800 px-4 py-2 text-white text-sm font-medium">
//                     React Component Code
//                   </div>
//                   <pre className="p-4 text-green-400 text-sm overflow-x-auto">
//                     <code>{selectedComponent.codeExample}</code>
//                   </pre>
//                 </div>
                
//                 {/* Usage Instructions */}
//                 <div className="mt-6 bg-blue-50 rounded-lg p-4">
//                   <h3 className="text-lg font-semibold text-blue-900 mb-2">Usage Instructions</h3>
//                   <div className="text-blue-800 space-y-2">
//                     <p>1. Copy the component code above</p>
//                     <p>2. Import the component in your React project</p>
//                     <p>3. Use the props panel on the right to customize the component</p>
//                     <p>4. The component is fully responsive and accessible</p>
//                   </div>
//                 </div>

//                 {/* Component Features */}
//                 <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="bg-white rounded-lg p-4 border border-gray-200">
//                     <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
//                     <ul className="space-y-1 text-sm text-gray-600">
//                       <li>✅ Fully responsive design</li>
//                       <li>✅ TypeScript support</li>
//                       <li>✅ Accessibility compliant</li>
//                       <li>✅ Customizable props</li>
//                       <li>✅ Modern styling</li>
//                     </ul>
//                   </div>
                  
//                   <div className="bg-white rounded-lg p-4 border border-gray-200">
//                     <h4 className="font-semibold text-gray-900 mb-2">Performance</h4>
//                     <ul className="space-y-1 text-sm text-gray-600">
//                       <li>📦 Bundle Size: {selectedComponent.bundleSize}KB</li>
//                       <li>⚡ Render Score: {selectedComponent.renderScore}/100</li>
//                       <li>🎯 Complexity: {selectedComponent.complexity}</li>
//                       <li>📱 Mobile Optimized</li>
//                       <li>🔍 SEO Friendly</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="p-6">
//                 {/* Live Preview */}
//                 <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//                   <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
//                     <span className="text-sm font-medium text-gray-700">Live Preview</span>
//                   </div>
//                   <div className="min-h-96">
//                     {selectedComponent.component && (
//                       <selectedComponent.component {...props} />
//                     )}
//                   </div>
//                 </div>

//                 {/* Component Information */}
//                 <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
//                   <div className="bg-white rounded-lg p-4 border border-gray-200">
//                     <h4 className="font-semibold text-gray-900 mb-3">Component Details</h4>
//                     <dl className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <dt className="text-gray-600">Category:</dt>
//                         <dd className="text-gray-900 capitalize">{selectedComponent.category}</dd>
//                       </div>
//                       <div className="flex justify-between">
//                         <dt className="text-gray-600">Complexity:</dt>
//                         <dd className="text-gray-900 capitalize">{selectedComponent.complexity}</dd>
//                       </div>
//                       <div className="flex justify-between">
//                         <dt className="text-gray-600">Last Updated:</dt>
//                         <dd className="text-gray-900">{selectedComponent.lastUpdated}</dd>
//                       </div>
//                       <div className="flex justify-between">
//                         <dt className="text-gray-600">Popularity:</dt>
//                         <dd className="text-gray-900">{selectedComponent.popularity}/100</dd>
//                       </div>
//                     </dl>
                    
//                     <div className="mt-4">
//                       <h5 className="font-medium text-gray-900 mb-2">Tags</h5>
//                       <div className="flex flex-wrap gap-2">
//                         {selectedComponent.tags.map((tag) => (
//                           <span
//                             key={tag}
//                             className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-white rounded-lg p-4 border border-gray-200">
//                     <h4 className="font-semibold text-gray-900 mb-3">Performance Metrics</h4>
//                     <div className="space-y-3">
//                       <div>
//                         <div className="flex justify-between text-sm mb-1">
//                           <span className="text-gray-600">Bundle Size</span>
//                           <span className="text-gray-900">{selectedComponent.bundleSize}KB</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div 
//                             className="bg-green-500 h-2 rounded-full" 
//                             style={{ width: `${Math.max(10, 100 - selectedComponent.bundleSize * 2)}%` }}
//                           ></div>
//                         </div>
//                       </div>
                      
//                       <div>
//                         <div className="flex justify-between text-sm mb-1">
//                           <span className="text-gray-600">Render Performance</span>
//                           <span className="text-gray-900">{selectedComponent.renderScore}/100</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div 
//                             className="bg-blue-500 h-2 rounded-full" 
//                             style={{ width: `${selectedComponent.renderScore}%` }}
//                           ></div>
//                         </div>
//                       </div>
                      
//                       <div>
//                         <div className="flex justify-between text-sm mb-1">
//                           <span className="text-gray-600">Accessibility Score</span>
//                           <span className="text-gray-900">
//                             {selectedComponent.wcagLevel === 'AAA' ? '100' : 
//                              selectedComponent.wcagLevel === 'AA' ? '90' : '80'}/100
//                           </span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div 
//                             className="bg-purple-500 h-2 rounded-full" 
//                             style={{ 
//                               width: `${selectedComponent.wcagLevel === 'AAA' ? '100' : 
//                                        selectedComponent.wcagLevel === 'AA' ? '90' : '80'}%` 
//                             }}
//                           ></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Sidebar - Props Editor */}
//         <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
//           <div className="p-4 border-b border-gray-200">
//             <button
//               onClick={() => setIsPropsOpen(!isPropsOpen)}
//               className="flex items-center justify-between w-full text-left"
//             >
//               <h3 className="text-lg font-semibold text-gray-900">Component Props</h3>
//               {isPropsOpen ? (
//                 <ChevronDown className="w-5 h-5 text-gray-500" />
//               ) : (
//                 <ChevronRight className="w-5 h-5 text-gray-500" />
//               )}
//             </button>
//           </div>

//           {isPropsOpen && (
//             <div className="flex-1 overflow-y-auto p-4">
//               <div className="space-y-4">
//                 {Object.entries(selectedComponent.propsSchema).map(([key, schema]) => (
//                   <div key={key} className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       {schema.label}
//                       {schema.description && (
//                         <span className="block text-xs text-gray-500 font-normal mt-1">
//                           {schema.description}
//                         </span>
//                       )}
//                     </label>
//                     {renderPropEditor(key, schema)}
//                   </div>
//                 ))}
//               </div>

//               {/* Quick Actions */}
//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h4>
//                 <div className="space-y-2">
//                   <button
//                     onClick={() => setProps(selectedComponent.defaultProps)}
//                     className="w-full flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
//                   >
//                     <RotateCcw className="w-4 h-4 mr-2" />
//                     Reset to Default
//                   </button>
                  
//                   <button
//                     onClick={() => toggleFavorite(selectedComponent.id)}
//                     className={`w-full flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium ${
//                       favorites.includes(selectedComponent.id)
//                         ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
//                         : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-50'
//                     }`}
//                   >
//                     <Star 
//                       className="w-4 h-4 mr-2" 
//                       fill={favorites.includes(selectedComponent.id) ? 'currentColor' : 'none'}
//                     />
//                     {favorites.includes(selectedComponent.id) ? 'Remove from Favorites' : 'Add to Favorites'}
//                   </button>
//                 </div>
//               </div>

//               {/* Component Info */}
//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <h4 className="text-sm font-medium text-gray-900 mb-3">Information</h4>
//                 <div className="space-y-2 text-xs">
//                   <div className="flex justify-between">
//                     <span className="text-gray-500">Category:</span>
//                     <span className="text-gray-700 capitalize">{selectedComponent.category}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-500">Complexity:</span>
//                     <span className="text-gray-700 capitalize">{selectedComponent.complexity}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-500">Popularity:</span>
//                     <span className="text-gray-700">{selectedComponent.popularity}/100</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-500">Bundle Size:</span>
//                     <span className="text-gray-700">{selectedComponent.bundleSize}KB</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-500">WCAG Level:</span>
//                     <span className="text-gray-700">{selectedComponent.wcagLevel}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-500">Downloads:</span>
//                     <span className="text-gray-700">{selectedComponent.downloadCount.toLocaleString()}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }