// import React from 'react';
// import { Layout, Type, Settings, Image } from 'lucide-react';
// import { ComponentDefinition } from '../types';

// export const COMPONENT_LIBRARY: ComponentDefinition[] = [
//   // Layout Components
//   {
//     id: 'container',
//     name: 'Container',
//     description: 'Responsive container with max-width control',
//     category: 'layout',
//     icon: Layout,
//     tags: ['wrapper', 'responsive', 'container'],
//     complexity: 'basic',
//     popularity: 98,
//     isPremium: false,
//     defaultProps: {
//       maxWidth: '1200px',
//       padding: '1rem',
//       centerContent: true
//     },
//     defaultStyle: {
//       width: '100%',
//       margin: '0 auto',
//       padding: '1rem',
//       backgroundColor: '#f8f9fa',
//       borderRadius: '8px',
//       minHeight: '100px'
//     },
//     propSchema: {
//       maxWidth: { 
//         type: 'select', 
//         options: ['640px', '768px', '1024px', '1200px', '1400px', '100%'],
//         description: 'Maximum width of the container'
//       },
//       padding: { 
//         type: 'spacing',
//         description: 'Internal padding'
//       },
//       centerContent: { 
//         type: 'boolean',
//         description: 'Center content horizontally'
//       }
//     },
//     accessibility: { wcagLevel: 'AAA', screenReader: true, keyboardNav: true },
//     performance: { bundleSize: 2.1, renderScore: 98 },
//     frameworks: ['React', 'Vue', 'Angular', 'HTML'],
//     features: ['responsive', 'customizable'],
//     previewComponent: ({ children, maxWidth, padding, centerContent, ...props }) => (
//       <div
//         style={{
//           maxWidth,
//           padding,
//           margin: centerContent ? '0 auto' : '0',
//           width: '100%',
//           border: '2px dashed #e5e5e5',
//           minHeight: '100px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           backgroundColor: '#f8f9fa',
//           borderRadius: '8px'
//         }}
//         {...props}
//       >
//         {children || <span style={{ color: '#888', fontSize: '14px' }}>Container</span>}
//       </div>
//     )
//   },

//   // Text Components
//   {
//     id: 'heading',
//     name: 'Heading',
//     description: 'Semantic heading element (H1-H6)',
//     category: 'content',
//     icon: Type,
//     tags: ['text', 'heading', 'typography'],
//     complexity: 'basic',
//     popularity: 97,
//     isPremium: false,
//     defaultProps: {
//       level: 'h1',
//       text: 'Your Heading Here',
//       size: '2rem',
//       weight: 'bold',
//       color: '#000000',
//       align: 'left'
//     },
//     defaultStyle: {
//       margin: '0 0 1rem 0',
//       lineHeight: '1.2'
//     },
//     propSchema: {
//       level: { 
//         type: 'select', 
//         options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
//         description: 'Heading level for SEO and accessibility'
//       },
//       text: { 
//         type: 'text',
//         description: 'The heading text content'
//       },
//       size: { 
//         type: 'select', 
//         options: ['0.875rem', '1rem', '1.25rem', '1.5rem', '2rem', '2.5rem', '3rem'],
//         description: 'Font size'
//       },
//       weight: { 
//         type: 'select', 
//         options: ['normal', 'medium', 'semibold', 'bold'],
//         description: 'Font weight'
//       },
//       color: { 
//         type: 'color',
//         description: 'Text color'
//       },
//       align: { 
//         type: 'select', 
//         options: ['left', 'center', 'right', 'justify'],
//         description: 'Text alignment'
//       }
//     },
//     accessibility: { wcagLevel: 'AAA', screenReader: true, keyboardNav: true },
//     performance: { bundleSize: 0.8, renderScore: 99 },
//     frameworks: ['React', 'Vue', 'Angular', 'HTML'],
//     features: ['semantic', 'accessible', 'seo-friendly'],
//     previewComponent: ({ level, text, size, weight, color, align, ...props }) => {
//       const Tag = level as keyof JSX.IntrinsicElements;
//       return (
//         <Tag
//           style={{
//             fontSize: size,
//             fontWeight: weight,
//             color,
//             textAlign: align as any,
//             margin: '0 0 1rem 0',
//             lineHeight: '1.2'
//           }}
//           {...props}
//         >
//           {text}
//         </Tag>
//       );
//     }
//   },

//   // Paragraph Component
//   {
//     id: 'paragraph',
//     name: 'Paragraph',
//     description: 'Text paragraph with formatting options',
//     category: 'content',
//     icon: Type,
//     tags: ['text', 'paragraph', 'content'],
//     complexity: 'basic',
//     popularity: 96,
//     isPremium: false,
//     defaultProps: {
//       text: 'Your paragraph text goes here. You can edit this text and apply various formatting options.',
//       size: '1rem',
//       lineHeight: '1.6',
//       color: '#333333',
//       align: 'left',
//       maxWidth: 'none'
//     },
//     defaultStyle: {
//       margin: '0 0 1rem 0'
//     },
//     propSchema: {
//       text: { 
//         type: 'textarea', 
//         rows: 4,
//         description: 'The paragraph text content'
//       },
//       size: { 
//         type: 'select', 
//         options: ['0.875rem', '1rem', '1.125rem', '1.25rem'],
//         description: 'Font size'
//       },
//       lineHeight: { 
//         type: 'select', 
//         options: ['1.2', '1.4', '1.6', '1.8', '2.0'],
//         description: 'Line height for readability'
//       },
//       color: { 
//         type: 'color',
//         description: 'Text color'
//       },
//       align: { 
//         type: 'select', 
//         options: ['left', 'center', 'right', 'justify'],
//         description: 'Text alignment'
//       },
//       maxWidth: { 
//         type: 'text', 
//         placeholder: 'e.g., 600px or none',
//         description: 'Maximum width for optimal reading'
//       }
//     },
//     accessibility: { wcagLevel: 'AAA', screenReader: true, keyboardNav: true },
//     performance: { bundleSize: 0.6, renderScore: 99 },
//     frameworks: ['React', 'Vue', 'Angular', 'HTML'],
//     features: ['readable', 'accessible'],
//     previewComponent: ({ text, size, lineHeight, color, align, maxWidth, ...props }) => (
//       <p
//         style={{
//           fontSize: size,
//           lineHeight,
//           color,
//           textAlign: align as any,
//           maxWidth: maxWidth === 'none' ? undefined : maxWidth,
//           margin: '0 0 1rem 0'
//         }}
//         {...props}
//       >
//         {text}
//       </p>
//     )
//   },

//   // Button Components
//   {
//     id: 'button',
//     name: 'Button',
//     description: 'Interactive button with multiple variants',
//     category: 'buttons',
//     icon: Settings,
//     tags: ['button', 'action', 'interactive'],
//     complexity: 'basic',
//     popularity: 99,
//     isPremium: false,
//     defaultProps: {
//       text: 'Click Me',
//       variant: 'primary',
//       size: 'medium',
//       disabled: false,
//       fullWidth: false,
//       icon: 'none',
//       iconPosition: 'left'
//     },
//     defaultStyle: {
//       border: 'none',
//       borderRadius: '6px',
//       cursor: 'pointer',
//       fontWeight: '500',
//       transition: 'all 0.2s'
//     },
//     propSchema: {
//       text: { 
//         type: 'text',
//         description: 'Button text content'
//       },
//       variant: { 
//         type: 'select', 
//         options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
//         description: 'Visual style variant'
//       },
//       size: { 
//         type: 'select', 
//         options: ['small', 'medium', 'large'],
//         description: 'Button size'
//       },
//       disabled: { 
//         type: 'boolean',
//         description: 'Disable button interaction'
//       },
//       fullWidth: { 
//         type: 'boolean',
//         description: 'Full width button'
//       },
//       icon: { 
//         type: 'select', 
//         options: ['none', 'arrow', 'download', 'play', 'star'],
//         description: 'Icon to display'
//       },
//       iconPosition: { 
//         type: 'select', 
//         options: ['left', 'right'],
//         description: 'Icon position'
//       }
//     },
//     accessibility: { wcagLevel: 'AAA', screenReader: true, keyboardNav: true },
//     performance: { bundleSize: 1.8, renderScore: 98 },
//     frameworks: ['React', 'Vue', 'Angular', 'HTML'],
//     features: ['interactive', 'accessible', 'customizable'],
//     previewComponent: ({ text, variant, size, disabled, fullWidth, icon, iconPosition, ...props }) => {
//       const variants = {
//         primary: { backgroundColor: '#3b82f6', color: 'white' },
//         secondary: { backgroundColor: '#6b7280', color: 'white' },
//         outline: { backgroundColor: 'transparent', color: '#3b82f6', border: '2px solid #3b82f6' },
//         ghost: { backgroundColor: 'transparent', color: '#3b82f6' },
//         danger: { backgroundColor: '#ef4444', color: 'white' }
//       };

//       const sizes = {
//         small: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
//         medium: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
//         large: { padding: '1rem 2rem', fontSize: '1.125rem' }
//       };

//       return (
//         <button
//           style={{
//             ...variants[variant as keyof typeof variants],
//             ...sizes[size as keyof typeof sizes],
//             border: variant === 'outline' ? '2px solid #3b82f6' : 'none',
//             borderRadius: '6px',
//             cursor: disabled ? 'not-allowed' : 'pointer',
//             fontWeight: '500',
//             transition: 'all 0.2s',
//             opacity: disabled ? 0.5 : 1,
//             width: fullWidth ? '100%' : 'auto',
//             display: 'inline-flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: '0.5rem'
//           }}
//           disabled={disabled}
//           {...props}
//         >
//           {icon !== 'none' && iconPosition === 'left' && <span>→</span>}
//           {text}
//           {icon !== 'none' && iconPosition === 'right' && <span>→</span>}
//         </button>
//       );
//     }
//   },

//   // Image Component
//   {
//     id: 'image',
//     name: 'Image',
//     description: 'Responsive image with optimization',
//     category: 'content',
//     icon: Image,
//     tags: ['image', 'media', 'responsive'],
//     complexity: 'basic',
//     popularity: 94,
//     isPremium: false,
//     defaultProps: {
//       src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
//       alt: 'Beautiful landscape image',
//       width: '100%',
//       height: 'auto',
//       objectFit: 'cover',
//       borderRadius: '0px'
//     },
//     defaultStyle: {
//       display: 'block',
//       maxWidth: '100%'
//     },
//     propSchema: {
//       src: { 
//         type: 'image',
//         description: 'Image source URL'
//       },
//       alt: { 
//         type: 'text', 
//         placeholder: 'Describe the image for accessibility',
//         description: 'Alternative text for screen readers'
//       },
//       width: { 
//         type: 'text', 
//         placeholder: 'e.g., 100%, 400px',
//         description: 'Image width'
//       },
//       height: { 
//         type: 'text', 
//         placeholder: 'e.g., auto, 300px',
//         description: 'Image height'
//       },
//       objectFit: { 
//         type: 'select', 
//         options: ['cover', 'contain', 'fill', 'scale-down', 'none'],
//         description: 'How image should fit its container'
//       },
//       borderRadius: { 
//         type: 'text', 
//         placeholder: 'e.g., 0px, 8px, 50%',
//         description: 'Border radius for rounded corners'
//       }
//     },
//     accessibility: { wcagLevel: 'AAA', screenReader: true, keyboardNav: true },
//     performance: { bundleSize: 1.2, renderScore: 95 },
//     frameworks: ['React', 'Vue', 'Angular', 'HTML'],
//     features: ['responsive', 'optimized', 'lazy-loading'],
//     previewComponent: ({ src, alt, width, height, objectFit, borderRadius, ...props }) => (
//       <img
//         src={src}
//         alt={alt}
//         style={{
//           width,
//           height,
//           objectFit: objectFit as any,
//           borderRadius,
//           display: 'block',
//           maxWidth: '100%'
//         }}
//         {...props}
//       />
//     )
//   },

//   // Form Input Component
//   {
//     id: 'text-input',
//     name: 'Text Input',
//     description: 'Text input field with validation',
//     category: 'forms',
//     icon: Type,
//     tags: ['input', 'form', 'text'],
//     complexity: 'basic',
//     popularity: 98,
//     isPremium: false,
//     defaultProps: {
//       placeholder: 'Enter text...',
//       label: 'Text Input',
//       type: 'text',
//       required: false,
//       disabled: false,
//       fullWidth: true,
//       helperText: ''
//     },
//     defaultStyle: {
//       marginBottom: '1rem'
//     },
//     propSchema: {
//       placeholder: { 
//         type: 'text',
//         description: 'Placeholder text'
//       },
//       label: { 
//         type: 'text',
//         description: 'Input label'
//       },
//       type: { 
//         type: 'select', 
//         options: ['text', 'email', 'password', 'tel', 'url'],
//         description: 'Input type'
//       },
//       required: { 
//         type: 'boolean',
//         description: 'Required field'
//       },
//       disabled: { 
//         type: 'boolean',
//         description: 'Disable input'
//       },
//       fullWidth: { 
//         type: 'boolean',
//         description: 'Full width input'
//       },
//       helperText: { 
//         type: 'text',
//         description: 'Helper text below input'
//       }
//     },
//     accessibility: { wcagLevel: 'AAA', screenReader: true, keyboardNav: true },
//     performance: { bundleSize: 2.1, renderScore: 96 },
//     frameworks: ['React', 'Vue', 'Angular', 'HTML'],
//     features: ['validation', 'accessible', 'customizable'],
//     previewComponent: ({ placeholder, label, type, required, disabled, fullWidth, helperText, ...props }) => (
//       <div style={{ marginBottom: '1rem', width: fullWidth ? '100%' : 'auto' }}>
//         {label && (
//           <label style={{
//             display: 'block',
//             marginBottom: '0.5rem',
//             fontWeight: '500',
//             color: '#374151'
//           }}>
//             {label}
//             {required && <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>}
//           </label>
//         )}
//         <input
//           type={type}
//           placeholder={placeholder}
//           disabled={disabled}
//           style={{
//             width: '100%',
//             padding: '0.75rem',
//             border: '2px solid #d1d5db',
//             borderRadius: '6px',
//             fontSize: '1rem',
//             transition: 'border-color 0.2s',
//             backgroundColor: disabled ? '#f9fafb' : 'white',
//             cursor: disabled ? 'not-allowed' : 'text'
//           }}
//           {...props}
//         />
//         {helperText && (
//           <p style={{
//             fontSize: '0.875rem',
//             color: '#6b7280',
//             marginTop: '0.25rem',
//             margin: '0.25rem 0 0 0'
//           }}>
//             {helperText}
//           </p>
//         )}
//       </div>
//     )
//   }
// ];

// export default COMPONENT_LIBRARY;