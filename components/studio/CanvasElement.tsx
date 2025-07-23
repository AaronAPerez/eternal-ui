'use client';

import React, { useState, useRef, useCallback } from 'react';
import { 
  Trash2, Copy, Move, Brain, Eye, EyeOff, Lock, Unlock,
  Star, Heart, ShoppingCart, CheckCircle2, Image, Play
} from 'lucide-react';

interface CanvasElementProps {
  element: any;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
  canvasMode: 'desktop' | 'tablet' | 'mobile';
}

export function CanvasElement({
  element,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  canvasMode
}: CanvasElementProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });
  const startElementPos = useRef({ x: 0, y: 0 });

  // Handle drag start
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target !== elementRef.current) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    startElementPos.current = { x: element.position.x, y: element.position.y };
    
    onSelect(element.id);
  }, [element.id, element.position, onSelect]);

  // Handle drag move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    
    const newPosition = {
      x: Math.max(0, startElementPos.current.x + deltaX),
      y: Math.max(0, startElementPos.current.y + deltaY)
    };
    
    onUpdate(element.id, { position: newPosition });
  }, [isDragging, element.id, onUpdate]);

  // Handle drag end
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Set up global mouse events
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Render component content based on type
  const renderComponentContent = () => {
    switch (element.type) {
      case 'hero':
        return (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-lg min-h-48 relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-4">{element.props.title || 'Hero Title'}</h1>
              <p className="text-xl text-indigo-100 mb-6">{element.props.subtitle || 'Hero subtitle text'}</p>
              <div className="flex gap-4">
                <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  {element.props.primaryCta || 'Get Started'}
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
                  {element.props.secondaryCta || 'Learn More'}
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
          </div>
        );

      case 'productCard':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden max-w-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700 relative h-48">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image className="w-16 h-16 text-gray-400" />
              </div>
              {element.props.badge && (
                <div className="absolute top-3 left-3">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {element.props.badge}
                  </span>
                </div>
              )}
              <button className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Heart className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {element.props.name || 'Product Name'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {element.props.description || 'Product description goes here with details about features.'}
              </p>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < (element.props.rating || 4) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                  ({element.props.reviews || 24} reviews)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${element.props.price || '99.99'}
                  </span>
                  {element.props.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${element.props.originalPrice}
                    </span>
                  )}
                </div>
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        );

      case 'contactForm':
        return (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-md">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {element.props.title || 'Get In Touch'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {element.props.description || 'We\'d love to hear from you. Send us a message!'}
            </p>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              />
              <button
                type="submit"
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        );

      case 'pricingCard':
        return (
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border-2 max-w-sm relative ${
            element.props.featured 
              ? 'border-indigo-500 ring-4 ring-indigo-100 dark:ring-indigo-900 scale-105' 
              : 'border-gray-200 dark:border-gray-700'
          }`}>
            {element.props.featured && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {element.props.plan || 'Pro Plan'}
              </h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">
                  ${element.props.price || '29'}
                </span>
                <span className="text-gray-600 dark:text-gray-400 text-lg">
                  /{element.props.period || 'month'}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {(element.props.features || [
                  'Unlimited projects',
                  'Priority support', 
                  'Advanced features',
                  'Team collaboration'
                ]).map((feature: string, index: number) => (
                  <li key={index} className="flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                element.props.featured
                  ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
              }`}>
                {element.props.buttonText || 'Get Started'}
              </button>
            </div>
          </div>
        );

      case 'teamMember':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center border border-gray-200 dark:border-gray-700 max-w-sm">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              {(element.props.name || 'TM').split(' ').map((n: string) => n[0]).join('').toUpperCase()}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              {element.props.name || 'Team Member'}
            </h3>
            <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">
              {element.props.role || 'Position'}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {element.props.bio || 'Brief description of the team member and their expertise in the field.'}
            </p>
            <div className="flex justify-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </button>
            </div>
          </div>
        );

      case 'testimonial':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 max-w-lg">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-gray-700 dark:text-gray-300 text-lg italic mb-6">
              "{element.props.quote || 'This service has been absolutely amazing. I highly recommend it to anyone looking for quality and reliability.'}"
            </blockquote>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                {(element.props.name || 'JD').split(' ').map((n: string) => n[0]).join('').toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {element.props.name || 'John Doe'}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  {element.props.role || 'CEO, Company Inc.'}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="text-center">
              <div className="font-medium text-gray-900 dark:text-white mb-2 capitalize">
                {element.type.replace(/([A-Z])/g, ' $1').trim()} Component
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {element.props.title || element.props.name || 'Component content'}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      ref={elementRef}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(element.id);
      }}
      className={`absolute cursor-move select-none transition-all duration-200 ${
        isSelected 
          ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 z-10' 
          : 'hover:ring-1 hover:ring-gray-300 dark:hover:ring-gray-600'
      } ${isDragging ? 'opacity-75 scale-105 z-20' : ''}`}
      style={{
        left: element.position.x,
        top: element.position.y,
        width: element.size?.width || 'auto',
        height: element.size?.height || 'auto',
      }}
    >
      {renderComponentContent()}
      
      {/* AI Generated Badge */}
      {element.metadata?.isAIGenerated && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg z-30">
          <Brain className="w-3 h-3" />
          <span>AI</span>
        </div>
      )}
      
      {/* Element Controls */}
      {isSelected && (
        <>
          {/* Control Bar */}
          <div className="absolute -top-10 left-0 flex items-center gap-1 bg-indigo-500 text-white px-3 py-1 rounded-md text-xs shadow-lg z-30">
            <span className="capitalize font-medium">
              {element.type.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            {element.metadata?.isAIGenerated && (
              <Brain className="w-3 h-3 text-purple-200 ml-1" />
            )}
            <div className="flex items-center gap-1 ml-2 border-l border-indigo-400 pl-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle duplicate
                }}
                className="p-1 hover:bg-indigo-600 rounded transition-colors"
                title="Duplicate"
              >
                <Copy className="w-3 h-3" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(element.id);
                }}
                className="p-1 hover:bg-red-500 rounded transition-colors"
                title="Delete"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Resize Handles */}
          <div className="absolute -inset-1 pointer-events-none">
            {/* Corner handles */}
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-indigo-500 rounded-full cursor-nw-resize pointer-events-auto"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full cursor-ne-resize pointer-events-auto"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-indigo-500 rounded-full cursor-sw-resize pointer-events-auto"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full cursor-se-resize pointer-events-auto"></div>
            
            {/* Edge handles */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-indigo-500 rounded-full cursor-n-resize pointer-events-auto"></div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-indigo-500 rounded-full cursor-s-resize pointer-events-auto"></div>
            <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-indigo-500 rounded-full cursor-w-resize pointer-events-auto"></div>
            <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-indigo-500 rounded-full cursor-e-resize pointer-events-auto"></div>
          </div>
        </>
      )}
    </div>
  );
}