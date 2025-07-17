interface ComponentTemplate {
  name: string;
  code: string;
  preview: string;
  keywords: string[];
}

/**
 * Dynamic Mock Generator
 * 
 * This creates realistic mock components based on the user's description
 * by matching keywords to component templates.
 */
export class DynamicMockGenerator {
  private templates: ComponentTemplate[] = [
    {
      name: 'PricingTableComponent',
      keywords: ['pricing', 'table', 'tier', 'plan', 'subscription', 'cost', 'price'],
      code: `import React from 'react';
import { Check, X } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
}

interface PricingTableProps {
  tiers?: PricingTier[];
  onSelectPlan?: (planName: string) => void;
}

export const PricingTableComponent: React.FC<PricingTableProps> = ({
  tiers = [
    {
      name: 'Starter',
      price: '$9',
      period: 'month',
      features: ['Up to 5 projects', 'Basic components', 'Email support'],
      buttonText: 'Start Free'
    },
    {
      name: 'Professional',
      price: '$29',
      period: 'month',
      features: ['Unlimited projects', 'AI components', 'Priority support', 'Team collaboration'],
      popular: true,
      buttonText: 'Start Pro'
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'month',
      features: ['Everything in Pro', 'White-label', 'Custom integrations', 'Dedicated support'],
      buttonText: 'Contact Sales'
    }
  ],
  onSelectPlan
}) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h2>
        <p className="text-lg text-gray-600">
          Select the perfect plan for your needs
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, index) => (
          <div
            key={index}
            className={\`relative bg-white rounded-2xl shadow-lg border-2 \${
              tier.popular ? 'border-blue-500 scale-105' : 'border-gray-200'
            } transition-all duration-200 hover:shadow-xl\`}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {tier.name}
              </h3>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  {tier.price}
                </span>
                <span className="text-gray-600 ml-2">
                  /{tier.period}
                </span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => onSelectPlan?.(tier.name)}
                className={\`w-full py-3 px-6 rounded-lg font-medium transition-colors \${
                  tier.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }\`}
                aria-label={\`Select \${tier.name} plan\`}
              >
                {tier.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingTableComponent;`,
      preview: `<div class="max-w-6xl mx-auto p-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
          <p class="text-lg text-gray-600">Select the perfect plan for your needs</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Starter</h3>
            <div class="mb-6">
              <span class="text-4xl font-bold text-gray-900">$9</span>
              <span class="text-gray-600 ml-2">/month</span>
            </div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-700">Up to 5 projects</span>
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-700">Basic components</span>
              </li>
            </ul>
            <button class="w-full py-3 px-6 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              Start Free
            </button>
          </div>
          <div class="relative bg-white rounded-2xl shadow-lg border-2 border-blue-500 scale-105 p-8">
            <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Professional</h3>
            <div class="mb-6">
              <span class="text-4xl font-bold text-gray-900">$29</span>
              <span class="text-gray-600 ml-2">/month</span>
            </div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-700">Unlimited projects</span>
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-700">AI components</span>
              </li>
            </ul>
            <button class="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Start Pro
            </button>
          </div>
          <div class="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Enterprise</h3>
            <div class="mb-6">
              <span class="text-4xl font-bold text-gray-900">$99</span>
              <span class="text-gray-600 ml-2">/month</span>
            </div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-700">Everything in Pro</span>
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-700">White-label</span>
              </li>
            </ul>
            <button class="w-full py-3 px-6 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>`
    },
    {
      name: 'TestimonialCarouselComponent',
      keywords: ['testimonial', 'carousel', 'review', 'feedback', 'customer', 'rating', 'star'],
      code: `import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

interface TestimonialCarouselProps {
  testimonials?: Testimonial[];
  autoPlay?: boolean;
}

export const TestimonialCarouselComponent: React.FC<TestimonialCarouselProps> = ({
  testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'TechCorp',
      avatar: '/api/placeholder/64/64',
      content: 'This AI component generator has revolutionized our development process. We can create beautiful, accessible components in minutes instead of hours.',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Lead Developer',
      company: 'StartupXYZ',
      avatar: '/api/placeholder/64/64',
      content: 'The generated code is production-ready and follows all the best practices. Its like having a senior developer generate components for us.',
      rating: 5
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'UI Designer',
      company: 'DesignStudio',
      avatar: '/api/placeholder/64/64',
      content: 'Finally, a tool that bridges the gap between design and development. The AI understands exactly what I need and generates perfect code.',
      rating: 5
    }
  ],
  autoPlay = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={\`w-4 h-4 \${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}\`}
      />
    ));
  };

  React.useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(nextTestimonial, 5000);
      return () => clearInterval(timer);
    }
  }, [autoPlay]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          What Our Users Say
        </h2>
        <p className="text-lg text-gray-600">
          Trusted by developers and designers worldwide
        </p>
      </div>

      <div className="relative">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <div className="flex items-center mb-6">
            <img
              src={testimonials[currentIndex].avatar}
              alt={\`\${testimonials[currentIndex].name} avatar\`}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="font-semibold text-gray-900">
                {testimonials[currentIndex].name}
              </h3>
              <p className="text-gray-600">
                {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
              </p>
            </div>
          </div>

          <div className="flex items-center mb-4">
            {renderStars(testimonials[currentIndex].rating)}
          </div>

          <blockquote className="text-lg text-gray-700 italic mb-6">
            "{testimonials[currentIndex].content}"
          </blockquote>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={prevTestimonial}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={\`w-2 h-2 rounded-full transition-colors \${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }\`}
                aria-label={\`Go to testimonial \${index + 1}\`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarouselComponent;`,
      preview: `<div class="max-w-4xl mx-auto p-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p class="text-lg text-gray-600">Trusted by developers and designers worldwide</p>
        </div>
        <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <div class="flex items-center mb-6">
            <div class="w-16 h-16 rounded-full bg-gray-300 mr-4"></div>
            <div>
              <h3 class="font-semibold text-gray-900">Sarah Johnson</h3>
              <p class="text-gray-600">Product Manager at TechCorp</p>
            </div>
          </div>
          <div class="flex items-center mb-4">
            <div class="flex space-x-1">
              <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
          <blockquote class="text-lg text-gray-700 italic mb-6">
            "This AI component generator has revolutionized our development process. We can create beautiful, accessible components in minutes instead of hours."
          </blockquote>
        </div>
        <div class="flex justify-between items-center mt-6">
          <button class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <div class="flex space-x-2">
            <div class="w-2 h-2 rounded-full bg-blue-600"></div>
            <div class="w-2 h-2 rounded-full bg-gray-300"></div>
            <div class="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
          <button class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>`
    },
    {
      name: 'FeatureSectionComponent',
      keywords: ['feature', 'section', 'benefits', 'highlights', 'icon', 'grid', 'showcase'],
      code: `import React from 'react';
import { Zap, Shield, Users, Sparkles, Code, Globe } from 'lucide-react';

interface Feature {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
}

interface FeatureSectionProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

export const FeatureSectionComponent: React.FC<FeatureSectionProps> = ({
  title = "Why Choose Our Platform",
  subtitle = "Everything you need to build amazing products",
  features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Generation',
      description: 'Create production-ready components with advanced AI that understands your needs and generates clean, accessible code.',
      color: 'blue'
    },
    {
      icon: Code,
      title: 'Clean Code Output',
      description: 'Get TypeScript-first, fully documented code that follows industry best practices and is ready for production.',
      color: 'green'
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Built with security in mind, featuring automatic vulnerability scanning and compliance with industry standards.',
      color: 'purple'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for performance with sub-second load times and efficient rendering for the best user experience.',
      color: 'yellow'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Real-time collaboration features that let your team work together seamlessly on projects of any size.',
      color: 'pink'
    },
    {
      icon: Globe,
      title: 'Global Scale',
      description: 'Built to scale globally with CDN distribution, multi-region support, and enterprise-grade infrastructure.',
      color: 'indigo'
    }
  ]
}) => {
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600 bg-blue-50',
      green: 'text-green-600 bg-green-50',
      purple: 'text-purple-600 bg-purple-50',
      yellow: 'text-yellow-600 bg-yellow-50',
      pink: 'text-pink-600 bg-pink-50',
      indigo: 'text-indigo-600 bg-indigo-50'
    };
    return colorMap[color] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className={\`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-6 \${getColorClasses(feature.color)}\`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureSectionComponent;`,
      preview: `<div class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">Everything you need to build amazing products</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300">
              <div class="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-6 text-blue-600 bg-blue-50">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">AI-Powered Generation</h3>
              <p class="text-gray-600 leading-relaxed">Create production-ready components with advanced AI that understands your needs and generates clean, accessible code.</p>
            </div>
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300">
              <div class="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-6 text-green-600 bg-green-50">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Clean Code Output</h3>
              <p class="text-gray-600 leading-relaxed">Get TypeScript-first, fully documented code that follows industry best practices and is ready for production.</p>
            </div>
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300">
              <div class="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-6 text-purple-600 bg-purple-50">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Security First</h3>
              <p class="text-gray-600 leading-relaxed">Built with security in mind, featuring automatic vulnerability scanning and compliance with industry standards.</p>
            </div>
          </div>
          <div class="text-center mt-12">
            <button class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Get Started Today
            </button>
          </div>
        </div>
      </div>`
    },
    {
      name: 'ContactFormComponent',
      keywords: ['contact', 'form', 'submit', 'email', 'message', 'input', 'validation'],
      code: `import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  onSubmit?: (data: FormData) => void;
  showContactInfo?: boolean;
}

export const ContactFormComponent: React.FC<ContactFormProps> = ({
  onSubmit,
  showContactInfo = true
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onSubmit) {
        onSubmit(formData);
      }
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-900 mb-2">
            Message Sent Successfully!
          </h2>
          <p className="text-green-700 mb-6">
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Get In Touch
        </h2>
        <p className="text-lg text-gray-600">
          Have a question or want to work together? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={\`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors \${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }\`}
                  placeholder="Enter your name"
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={\`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors \${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }\`}
                  placeholder="Enter your email"
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className={\`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors \${
                  errors.subject ? 'border-red-500' : 'border-gray-300'
                }\`}
                placeholder="What's this about?"
                aria-describedby={errors.subject ? 'subject-error' : undefined}
              />
              {errors.subject && (
                <p id="subject-error" className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className={\`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none \${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }\`}
                placeholder="Tell us more about your project or question..."
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        {showContactInfo && (
          <div className="space-y-8">
            <div className="bg-blue-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">hello@company.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">123 Business Ave, Suite 100<br />New York, NY 10001</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Office Hours
              </h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactFormComponent;`,
      preview: `<div class="max-w-4xl mx-auto p-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p class="text-lg text-gray-600">Have a question or want to work together? We'd love to hear from you.</p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <form class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                  <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your name">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input type="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your email">
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="What's this about?">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea rows="6" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" placeholder="Tell us more about your project or question..."></textarea>
              </div>
              <button type="submit" class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
                <span>Send Message</span>
              </button>
            </form>
          </div>
          <div class="space-y-8">
            <div class="bg-blue-50 rounded-xl p-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div class="space-y-4">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span class="text-gray-700">hello@company.com</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span class="text-gray-700">+1 (555) 123-4567</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span class="text-gray-700">123 Business Ave, Suite 100<br>New York, NY 10001</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
    },
    {
      name: 'DashboardCardComponent',
      keywords: ['dashboard', 'card', 'metrics', 'analytics', 'stats', 'chart', 'data', 'kpi'],
      code: `import React from 'react';
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingBag, Eye } from 'lucide-react';

interface MetricData {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<any>;
  color: string;
}

interface DashboardCardProps {
  title?: string;
  metrics?: MetricData[];
  timeframe?: string;
}

export const DashboardCardComponent: React.FC<DashboardCardProps> = ({
  title = "Performance Overview",
  timeframe = "Last 30 days",
  metrics = [
    {
      label: 'Total Revenue',
      value: '$45,231',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      label: 'Active Users',
      value: '2,340',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      label: 'Orders',
      value: '184',
      change: '-3.1%',
      trend: 'down',
      icon: ShoppingBag,
      color: 'purple'
    },
    {
      label: 'Page Views',
      value: '12,429',
      change: '+15.8%',
      trend: 'up',
      icon: Eye,
      color: 'orange'
    }
  ]
}) => {
  const getColorClasses = (color: string) => {
    const colorMap = {
      green: 'text-green-600 bg-green-50',
      blue: 'text-blue-600 bg-blue-50',
      purple: 'text-purple-600 bg-purple-50',
      orange: 'text-orange-600 bg-orange-50',
      red: 'text-red-600 bg-red-50'
    };
    return colorMap[color] || 'text-gray-600 bg-gray-50';
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    if (trend === 'up') return TrendingUp;
    if (trend === 'down') return TrendingDown;
    return null;
  };

  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {timeframe}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = getTrendIcon(metric.trend);
          
          return (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={\`inline-flex items-center justify-center w-10 h-10 rounded-lg \${getColorClasses(metric.color)}\`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                {TrendIcon && (
                  <div className={\`flex items-center text-sm font-medium \${getTrendColor(metric.trend)}\`}>
                    <TrendIcon className="w-4 h-4 mr-1" />
                    {metric.change}
                  </div>
                )}
              </div>
              
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {metric.value}
                </p>
                <p className="text-sm text-gray-600">
                  {metric.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Updated 5 minutes ago
          </p>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
            View detailed report →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCardComponent;`,
      preview: `<div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Performance Overview</h3>
            <p class="text-sm text-gray-500 mt-1">Last 30 days</p>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-xs text-gray-500">Live</span>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center justify-between mb-3">
              <div class="inline-flex items-center justify-center w-10 h-10 rounded-lg text-green-600 bg-green-50">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
              </div>
              <div class="flex items-center text-sm font-medium text-green-600">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
                +12.5%
              </div>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900 mb-1">$45,231</p>
              <p class="text-sm text-gray-600">Total Revenue</p>
            </div>
          </div>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center justify-between mb-3">
              <div class="inline-flex items-center justify-center w-10 h-10 rounded-lg text-blue-600 bg-blue-50">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-1a6 6 0 01-4.5 0"/>
                </svg>
              </div>
              <div class="flex items-center text-sm font-medium text-green-600">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
                +8.2%
              </div>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900 mb-1">2,340</p>
              <p class="text-sm text-gray-600">Active Users</p>
            </div>
          </div>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center justify-between mb-3">
              <div class="inline-flex items-center justify-center w-10 h-10 rounded-lg text-purple-600 bg-purple-50">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
              </div>
              <div class="flex items-center text-sm font-medium text-red-600">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/>
                </svg>
                -3.1%
              </div>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900 mb-1">184</p>
              <p class="text-sm text-gray-600">Orders</p>
            </div>
          </div>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center justify-between mb-3">
              <div class="inline-flex items-center justify-center w-10 h-10 rounded-lg text-orange-600 bg-orange-50">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </div>
              <div class="flex items-center text-sm font-medium text-green-600">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
                +15.8%
              </div>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900 mb-1">12,429</p>
              <p class="text-sm text-gray-600">Page Views</p>
            </div>
          </div>
        </div>
        <div class="mt-6 pt-6 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-600">Updated 5 minutes ago</p>
            <button class="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
              View detailed report →
            </button>
          </div>
        </div>
      </div>`
    },
    {
      name: 'ButtonComponent',
      keywords: ['button', 'click', 'action', 'cta', 'primary', 'secondary'],
      code: `import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const ButtonComponent: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = ''
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
      case 'secondary':
        return 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500';
      case 'outline':
        return 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500';
      case 'ghost':
        return 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500';
      default:
        return 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2 text-base';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={\`
        inline-flex items-center justify-center
        font-medium rounded-lg
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        \${getVariantClasses()}
        \${getSizeClasses()}
        \${className}
      \`.trim().replace(/\s+/g, ' ')}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {loading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      {children}
    </button>
  );
};

export default ButtonComponent;`,
      preview: `<div class="p-8 space-y-6">
        <div class="text-center">
          <h3 class="text-xl font-semibold mb-4">Button Component Showcase</h3>
          <p class="text-gray-600 mb-8">Flexible, accessible buttons for any use case</p>
        </div>
        
        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <button class="inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 px-4 py-2 text-base">
              Primary Button
            </button>
            <button class="inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 px-4 py-2 text-base">
              Secondary Button
            </button>
            <button class="inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 px-4 py-2 text-base">
              Outline Button
            </button>
          </div>
          
          <div class="flex items-center space-x-4">
            <button class="inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 px-3 py-1.5 text-sm">
              Small
            </button>
            <button class="inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 px-4 py-2 text-base">
              Medium
            </button>
            <button class="inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 px-6 py-3 text-lg">
              Large
            </button>
          </div>
          
          <div class="flex items-center space-x-4">
            <button class="inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 px-4 py-2 text-base">
              <div class="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Loading...
            </button>
            <button class="inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 px-4 py-2 text-base opacity-50 cursor-not-allowed" disabled>
              Disabled
            </button>
          </div>
        </div>
      </div>`
    }
  ];

  generateComponent(description: string): ComponentTemplate {
    const lowerDescription = description.toLowerCase();
    
    // Find the best matching template based on keywords
    const matchedTemplate = this.templates.find(template => 
      template.keywords.some(keyword => lowerDescription.includes(keyword))
    );

    if (matchedTemplate) {
      // Customize the template based on the description
      return {
        ...matchedTemplate,
        name: this.generateComponentName(description),
        code: this.customizeCode(matchedTemplate.code, description),
        preview: this.customizePreview(matchedTemplate.preview, description)
      };
    }

    // Default fallback component
    return {
      name: this.generateComponentName(description),
      keywords: [],
      code: this.generateDefaultComponent(description),
      preview: this.generateDefaultPreview(description)
    };
  }

  private generateComponentName(description: string): string {
    const words = description.split(' ')
      .filter(word => word.length > 2)
      .slice(0, 3)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1));
    
    return words.join('') + 'Component';
  }

  private customizeCode(baseCode: string, description: string): string {
    // Add description-specific customizations
    let customizedCode = baseCode;
    
    // Add the description as a comment
    customizedCode = `/**
 * ${description}
 * 
 * Generated with Eternal UI's Enhanced AI Generator
 * - Fully accessible (WCAG 2.1 AA)
 * - Responsive design
 * - TypeScript support
 * - Performance optimized
 */

${customizedCode}`;
    
    return customizedCode;
  }

  private customizePreview(basePreview: string, description: string): string {
    // Add description-specific customizations to preview
    return basePreview;
  }

  private generateDefaultComponent(description: string): string {
    return `import React from 'react';

interface ${this.generateComponentName(description)}Props {
  title?: string;
  description?: string;
  onAction?: () => void;
}

/**
 * ${description}
 * 
 * Generated with Eternal UI's Enhanced AI Generator
 * - Fully accessible (WCAG 2.1 AA)
 * - Responsive design
 * - TypeScript support
 * - Performance optimized
 */
export const ${this.generateComponentName(description)}: React.FC<${this.generateComponentName(description)}Props> = ({
  title = "Generated Component",
  description = "This component was generated based on: ${description}",
  onAction
}) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-500">AI Generated</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        
        <div className="space-y-3">
          <button
            onClick={onAction}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Primary action button"
          >
            Take Action
          </button>
          
          <button
            className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            aria-label="Secondary action button"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ${this.generateComponentName(description)};`;
  }

  private generateDefaultPreview(description: string): string {
    return `<div class="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Generated Component</h3>
          <div class="flex items-center space-x-1">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <span class="text-xs text-gray-500">AI Generated</span>
          </div>
        </div>
        <p class="text-gray-600 mb-6">${description}</p>
        <div class="space-y-3">
          <button class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Take Action
          </button>
          <button class="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>`;
  }
}