import { Component } from '@/types';

export const createDefaultComponent = (type: string, position: { x: number; y: number }): Component => {
  const id = `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const getDefaultProps = (componentType: string) => {
    switch (componentType) {
      case 'text':
        return { content: 'Your text here' };
      case 'heading':
        return { content: 'Your Heading', level: 1 };
      case 'button':
        return { text: 'Click me', href: '#' };
      case 'image':
        return { src: '', alt: 'Image description' };
      case 'hero':
        return {
          title: 'Welcome to Our Website',
          subtitle: 'Build amazing experiences with our platform',
          ctaText: 'Get Started'
        };
      case 'navigation':
        return {
          logo: 'Brand',
          links: ['Home', 'About', 'Services', 'Contact']
        };
      case 'footer':
        return {
          copyright: '© 2024 Your Company',
          links: ['Privacy', 'Terms', 'Contact']
        };
      case 'logo':
        return { text: 'LOGO' };
      case 'card':
        return {
          title: 'Card Title',
          content: 'Card content goes here',
          imageUrl: ''
        };
      case 'testimonial':
        return {
          quote: 'This is an amazing product!',
          author: 'John Doe',
          role: 'CEO, Company',
          avatar: ''
        };
      case 'pricing':
        return {
          title: 'Basic Plan',
          price: '$9.99',
          features: ['Feature 1', 'Feature 2', 'Feature 3']
        };
      case 'form':
        return {
          title: 'Contact Us',
          fields: ['name', 'email', 'message'],
          submitText: 'Send Message'
        };
      case 'cta':
        return {
          title: 'Ready to get started?',
          subtitle: 'Join thousands of satisfied customers',
          buttonText: 'Get Started Now'
        };
      default:
        return {};
    }
  };

  const getDefaultStyles = (componentType: string): React.CSSProperties => {
    const baseStyles = {
      borderRadius: '0px',
      border: 'none'
    };

    switch (componentType) {
      case 'text':
        return {
          ...baseStyles,
          fontSize: '16px',
          fontFamily: 'Inter',
          color: '#374151',
          padding: '16px',
          fontWeight: '400',
          textAlign: 'left'
        };
      case 'heading':
        return {
          ...baseStyles,
          fontSize: '32px',
          fontFamily: 'Inter',
          color: '#111827',
          padding: '16px',
          fontWeight: '700',
          textAlign: 'left'
        };
      case 'button':
        return {
          ...baseStyles,
          background: '#3b82f6',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '600',
          textAlign: 'center',
          transition: 'all 0.2s ease'
        };
      case 'container':
        return {
          ...baseStyles,
          background: '#f9fafb',
          padding: '24px',
          borderRadius: '12px',
          border: '2px dashed #d1d5db'
        };
      case 'card':
        return {
          ...baseStyles,
          background: '#ffffff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        };
      case 'hero':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '80px 20px',
          textAlign: 'center',
          borderRadius: '0px'
        };
      case 'navigation':
        return {
          ...baseStyles,
          background: '#ffffff',
          padding: '16px 24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        };
      case 'footer':
        return {
          ...baseStyles,
          background: '#1f2937',
          color: 'white',
          padding: '40px 24px',
          textAlign: 'center'
        };
      case 'testimonial':
        return {
          ...baseStyles,
          background: '#ffffff',
          padding: '32px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        };
      case 'pricing':
        return {
          ...baseStyles,
          background: '#ffffff',
          padding: '32px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          border: '2px solid #e5e7eb'
        };
      case 'cta':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          padding: '60px 20px',
          textAlign: 'center',
          borderRadius: '16px'
        };
      default:
        return {
          ...baseStyles,
          background: '#f3f4f6',
          padding: '16px',
          color: '#374151'
        };
    }
  };

  const getDefaultSize = (componentType: string) => {
    switch (componentType) {
      case 'button':
        return { width: 150, height: 50 };
      case 'hero':
        return { width: 1200, height: 400 };
      case 'navigation':
        return { width: 1200, height: 80 };
      case 'footer':
        return { width: 1200, height: 120 };
      case 'card':
        return { width: 300, height: 200 };
      case 'testimonial':
        return { width: 350, height: 200 };
      case 'pricing':
        return { width: 300, height: 400 };
      case 'cta':
        return { width: 600, height: 200 };
      case 'heading':
        return { width: 400, height: 60 };
      default:
        return { width: 200, height: 100 };
    }
  };

  return {
    id,
    type: type as any,
    props: getDefaultProps(type),
    styles: getDefaultStyles(type),
    position,
    size: getDefaultSize(type),
    isDraggable: true
  };
};

export const duplicateComponent = (component: Component): Component => {
  return {
    ...component,
    id: `${component.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    position: {
      x: component.position.x + 20,
      y: component.position.y + 20
    }
  };
};

export const getComponentDisplayName = (type: string): string => {
  const displayNames: Record<string, string> = {
    text: 'Text Block',
    heading: 'Heading',
    button: 'Button',
    image: 'Image',
    hero: 'Hero Section',
    navigation: 'Navigation',
    footer: 'Footer',
    logo: 'Logo',
    container: 'Container',
    card: 'Card',
    testimonial: 'Testimonial',
    pricing: 'Pricing Table',
    form: 'Contact Form',
    cta: 'Call to Action'
  };
  
  return displayNames[type] || type.charAt(0).toUpperCase() + type.slice(1);
};
