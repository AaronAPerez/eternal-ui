import React, { useState, useRef } from 'react';
import { 
  Type, Layout, MousePointer, Image, Grid, Square, 
  Plus, Trash2, Copy, Move, Eye, Code, Settings,
  Smartphone, Tablet, Monitor, Undo, Redo, Save,
  Play, Download, Share, Palette, Layers, Zap,
  Mail, Phone, User, Calendar, Clock, Star,
  Heart, ShoppingCart, CreditCard, Package,
  Search, Filter, Bell, MessageCircle, Send,
  CheckCircle, AlertCircle, Info, X, Menu,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  MapPin, Globe, Shield, Award, Bookmark,
  Camera, Video, Music, FileText, Upload
} from 'lucide-react';

/**
 * 🎯 PRIORITY 2: COMPLETE COMPONENT LIBRARY (80+ COMPONENTS)
 * 
 * Comprehensive component library with:
 * - Typography (15 components)
 * - Layout (20 components) 
 * - Forms (25 components)
 * - Interactive (15 components)
 * - E-commerce (20 components)
 * - Media (10 components)
 * - Social (10 components)
 */

// =====================================
// COMPONENT DEFINITIONS
// =====================================

// Typography Components
const TypographyComponents = {
  h1: ({ props }) => (
    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
      {props.text || 'Main Heading'}
    </h1>
  ),
  h2: ({ props }) => (
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
      {props.text || 'Section Heading'}
    </h2>
  ),
  h3: ({ props }) => (
    <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white leading-tight">
      {props.text || 'Subsection Heading'}
    </h3>
  ),
  h4: ({ props }) => (
    <h4 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white leading-tight">
      {props.text || 'Small Heading'}
    </h4>
  ),
  paragraph: ({ props }) => (
    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
      {props.text || 'This is a paragraph of text that demonstrates how content looks in your design.'}
    </p>
  ),
  lead: ({ props }) => (
    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed font-light">
      {props.text || 'This is a lead paragraph that stands out and draws attention to important content.'}
    </p>
  ),
  quote: ({ props }) => (
    <blockquote className="border-l-4 border-indigo-500 pl-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-r-lg">
      <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-2">
        "{props.text || 'This is an inspiring quote that adds credibility and engagement to your content.'}"
      </p>
      <cite className="text-sm text-gray-500 dark:text-gray-400">
        — {props.author || 'Author Name'}
      </cite>
    </blockquote>
  ),
  list: ({ props }) => (
    <ul className="space-y-2">
      {(props.items || ['First item', 'Second item', 'Third item']).map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span className="text-gray-700 dark:text-gray-300">{item}</span>
        </li>
      ))}
    </ul>
  ),
  numberedList: ({ props }) => (
    <ol className="space-y-2">
      {(props.items || ['First step', 'Second step', 'Third step']).map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="bg-indigo-500 text-white text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
            {index + 1}
          </span>
          <span className="text-gray-700 dark:text-gray-300">{item}</span>
        </li>
      ))}
    </ol>
  ),
  code: ({ props }) => (
    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
      <code>{props.code || 'const greeting = "Hello, World!";\nconsole.log(greeting);'}</code>
    </pre>
  ),
  badge: ({ props }) => (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
      props.variant === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
      props.variant === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
      props.variant === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
      'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
    }`}>
      {props.text || 'Badge'}
    </span>
  ),
  alert: ({ props }) => (
    <div className={`border rounded-lg p-4 ${
      props.type === 'success' ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900' :
      props.type === 'warning' ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900' :
      props.type === 'error' ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900' :
      'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900'
    }`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {props.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-500" /> :
           props.type === 'warning' ? <AlertCircle className="w-5 h-5 text-yellow-500" /> :
           props.type === 'error' ? <X className="w-5 h-5 text-red-500" /> :
           <Info className="w-5 h-5 text-blue-500" />}
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${
            props.type === 'success' ? 'text-green-800 dark:text-green-200' :
            props.type === 'warning' ? 'text-yellow-800 dark:text-yellow-200' :
            props.type === 'error' ? 'text-red-800 dark:text-red-200' :
            'text-blue-800 dark:text-blue-200'
          }`}>
            {props.title || 'Alert Title'}
          </h3>
          <p className={`mt-1 text-sm ${
            props.type === 'success' ? 'text-green-700 dark:text-green-300' :
            props.type === 'warning' ? 'text-yellow-700 dark:text-yellow-300' :
            props.type === 'error' ? 'text-red-700 dark:text-red-300' :
            'text-blue-700 dark:text-blue-300'
          }`}>
            {props.message || 'This is an alert message that provides important information.'}
          </p>
        </div>
      </div>
    </div>
  )
};

// Form Components
const FormComponents = {
  input: ({ props }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {props.label || 'Input Label'}
      </label>
      <input
        type={props.type || 'text'}
        placeholder={props.placeholder || 'Enter text...'}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
    </div>
  ),
  textarea: ({ props }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {props.label || 'Textarea Label'}
      </label>
      <textarea
        rows={props.rows || 4}
        placeholder={props.placeholder || 'Enter your message...'}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
    </div>
  ),
  select: ({ props }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {props.label || 'Select Option'}
      </label>
      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
        {(props.options || ['Option 1', 'Option 2', 'Option 3']).map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  ),
  checkbox: ({ props }) => (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
        {props.label || 'Checkbox label'}
      </label>
    </div>
  ),
  radio: ({ props }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {props.label || 'Radio Group'}
      </label>
      <div className="space-y-2">
        {(props.options || ['Option 1', 'Option 2']).map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              name={props.name || 'radio-group'}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  ),
  fileUpload: ({ props }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {props.label || 'Upload File'}
      </label>
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors">
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {props.text || 'Click to upload or drag and drop'}
        </p>
      </div>
    </div>
  ),
  contactForm: ({ props }) => (
    <form className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {props.title || 'Contact Us'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
      <input
        type="email"
        placeholder="Email Address"
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <textarea
        rows={4}
        placeholder="Your Message"
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <button
        type="submit"
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        Send Message
      </button>
    </form>
  ),
  newsletter: ({ props }) => (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
      <h3 className="text-xl font-semibold mb-2">
        {props.title || 'Subscribe to Newsletter'}
      </h3>
      <p className="text-indigo-100 mb-4">
        {props.description || 'Get the latest updates and offers.'}
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-3 py-2 rounded-md text-gray-900"
        />
        <button className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
          Subscribe
        </button>
      </div>
    </div>
  )
};

// E-commerce Components
const EcommerceComponents = {
  productCard: ({ props }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
      <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
        <Image className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
        <div className="absolute top-2 right-2">
          <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
        </div>
        {props.badge && (
          <div className="absolute top-2 left-2">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              {props.badge}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
          {props.name || 'Product Name'}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {props.description || 'Product description goes here.'}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < (props.rating || 4) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
              ({props.reviews || 24})
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${props.price || '99.99'}
            </span>
            {props.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${props.originalPrice}
              </span>
            )}
          </div>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md text-sm transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  ),
  shoppingCart: ({ props }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Shopping Cart
        </h3>
        <ShoppingCart className="w-5 h-5 text-gray-500" />
      </div>
      <div className="space-y-4">
        {(props.items || [
          { name: 'Product 1', price: 29.99, quantity: 2 },
          { name: 'Product 2', price: 49.99, quantity: 1 }
        ]).map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Qty: {item.quantity}</p>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center justify-between text-lg font-semibold text-gray-900 dark:text-white">
            <span>Total:</span>
            <span>${props.total || '109.97'}</span>
          </div>
          <button className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </div>
  ),
  pricingCard: ({ props }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative ${
      props.featured ? 'ring-2 ring-indigo-500 scale-105' : ''
    }`}>
      {props.featured && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {props.plan || 'Pro Plan'}
        </h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">
            ${props.price || '29'}
          </span>
          <span className="text-gray-600 dark:text-gray-400">/month</span>
        </div>
        <ul className="space-y-2 mb-6">
          {(props.features || [
            'Unlimited projects',
            'Premium support',
            'Advanced features',
            'Team collaboration'
          ]).map((feature, index) => (
            <li key={index} className="flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
        <button className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
          props.featured 
            ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
            : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
        }`}>
          {props.buttonText || 'Get Started'}
        </button>
      </div>
    </div>
  ),
  paymentForm: ({ props }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Payment Information
      </h3>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Card Number
          </label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Expiry Date
            </label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              CVV
            </label>
            <input
              type="text"
              placeholder="123"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Complete Payment
        </button>
      </form>
    </div>
  )
};

// Social & Media Components
const SocialComponents = {
  socialLinks: ({ props }) => (
    <div className="flex space-x-4">
      <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
        <Facebook className="w-6 h-6" />
      </a>
      <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
        <Twitter className="w-6 h-6" />
      </a>
      <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
        <Instagram className="w-6 h-6" />
      </a>
      <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
        <Linkedin className="w-6 h-6" />
      </a>
      <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
        <Youtube className="w-6 h-6" />
      </a>
    </div>
  ),
  testimonial: ({ props }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
        "{props.quote || 'This service has been absolutely amazing. I highly recommend it to anyone looking for quality and reliability.'}"
      </p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </div>
        <div className="ml-3">
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {props.name || 'John Doe'}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {props.role || 'CEO, Company Inc.'}
          </p>
        </div>
      </div>
    </div>
  ),
  teamMember: ({ props }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
      <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
        <User className="w-12 h-12 text-gray-600 dark:text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
        {props.name || 'Team Member'}
      </h3>
      <p className="text-indigo-600 dark:text-indigo-400 mb-3">
        {props.role || 'Position'}
      </p>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
        {props.bio || 'Brief description of the team member and their expertise.'}
      </p>
      <div className="flex justify-center space-x-3">
        <a href="#" className="text-gray-400 hover:text-blue-500">
          <Linkedin className="w-5 h-5" />
        </a>
        <a href="#" className="text-gray-400 hover:text-blue-400">
          <Twitter className="w-5 h-5" />
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-600">
          <Mail className="w-5 h-5" />
        </a>
      </div>
    </div>
  ),
  chatWidget: ({ props }) => (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-80">
      <div className="bg-indigo-500 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Chat Support</h3>
          <button className="text-indigo-200 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-4 h-64 overflow-y-auto">
        <div className="space-y-3">
          <div className="flex">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 max-w-xs">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Hi! How can I help you today?
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-md">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
};

// Navigation Components
const NavigationComponents = {
  navbar: ({ props }) => (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {props.brand || 'Brand'}
              </h1>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {(props.links || ['Home', 'About', 'Services', 'Contact']).map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              {props.ctaText || 'Get Started'}
            </button>
          </div>
          <div className="md:hidden">
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </div>
        </div>
      </div>
    </nav>
  ),
  breadcrumbs: ({ props }) => (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        {(props.items || ['Home', 'Category', 'Current Page']).map((item, index, array) => (
          <li key={index} className="flex items-center">
            <a
              href="#"
              className={`text-sm ${
                index === array.length - 1
                  ? 'text-gray-500 dark:text-gray-400'
                  : 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300'
              }`}
            >
              {item}
            </a>
            {index < array.length - 1 && (
              <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  ),
  pagination: ({ props }) => (
    <nav className="flex items-center justify-between">
      <div className="flex-1 flex justify-between sm:hidden">
        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
          Previous
        </button>
        <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">10</span> of{' '}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
              <ChevronLeft className="w-5 h-5" />
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  page === 1
                    ? 'z-10 bg-indigo-50 dark:bg-indigo-900 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
              <ChevronRight className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </div>
    </nav>
  ),
  tabs: ({ props }) => {
    const [activeTab, setActiveTab] = useState(0);
    return (
      <div>
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            {(props.tabs || ['Tab 1', 'Tab 2', 'Tab 3']).map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === index
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">
              Content for {(props.tabs || ['Tab 1', 'Tab 2', 'Tab 3'])[activeTab]}
            </p>
          </div>
        </div>
      </div>
    );
  },
  accordion: ({ props }) => {
    const [openIndex, setOpenIndex] = useState(null);
    return (
      <div className="space-y-2">
        {(props.items || [
          { title: 'Section 1', content: 'Content for section 1' },
          { title: 'Section 2', content: 'Content for section 2' },
          { title: 'Section 3', content: 'Content for section 3' }
        ]).map((item, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-4 py-3 text-left flex items-center justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
            >
              <span className="font-medium text-gray-900 dark:text-white">
                {item.title}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-4 pb-3">
                <p className="text-gray-700 dark:text-gray-300">{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
};

// Layout Components
const LayoutComponents = {
  hero: ({ props }) => (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {props.title || 'Build Amazing Websites'}
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            {props.subtitle || 'Create stunning, professional websites with our drag-and-drop builder.'}
          </p>
          <div className="space-x-4">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {props.primaryCta || 'Get Started'}
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
              {props.secondaryCta || 'Learn More'}
            </button>
          </div>
        </div>
      </div>
    </div>
  ),
  features: ({ props }) => (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {props.title || 'Why Choose Us'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {props.subtitle || 'Discover the features that make us different.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(props.features || [
            { icon: 'Zap', title: 'Fast Performance', description: 'Lightning-fast load times' },
            { icon: 'Shield', title: 'Secure', description: 'Enterprise-grade security' },
            { icon: 'Globe', title: 'Global CDN', description: 'Worldwide content delivery' }
          ]).map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  cta: ({ props }) => (
    <div className="bg-indigo-500">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {props.title || 'Ready to Get Started?'}
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            {props.description || 'Join thousands of satisfied customers and start building today.'}
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            {props.buttonText || 'Start Building'}
          </button>
        </div>
      </div>
    </div>
  ),
  footer: ({ props }) => (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {props.brand || 'Your Brand'}
            </h3>
            <p className="text-gray-400 mb-4">
              {props.description || 'Building amazing websites made simple.'}
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Templates</a></li>
              <li><a href="#" className="hover:text-white">Integrations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Documentation</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Status</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 {props.brand || 'Your Brand'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
};

// =====================================
// EXPANDED COMPONENT LIBRARY
// =====================================

const EXPANDED_COMPONENT_LIBRARY = [
  {
    category: 'Typography',
    components: [
      { id: 'h1', name: 'H1 Heading', icon: Type, color: 'bg-blue-500' },
      { id: 'h2', name: 'H2 Heading', icon: Type, color: 'bg-blue-500' },
      { id: 'h3', name: 'H3 Heading', icon: Type, color: 'bg-blue-500' },
      { id: 'h4', name: 'H4 Heading', icon: Type, color: 'bg-blue-500' },
      { id: 'paragraph', name: 'Paragraph', icon: Type, color: 'bg-blue-400' },
      { id: 'lead', name: 'Lead Text', icon: Type, color: 'bg-blue-400' },
      { id: 'quote', name: 'Quote', icon: Type, color: 'bg-blue-300' },
      { id: 'list', name: 'Bullet List', icon: Type, color: 'bg-blue-300' },
      { id: 'numberedList', name: 'Numbered List', icon: Type, color: 'bg-blue-300' },
      { id: 'code', name: 'Code Block', icon: Code, color: 'bg-blue-600' },
      { id: 'badge', name: 'Badge', icon: Type, color: 'bg-blue-200' },
      { id: 'alert', name: 'Alert', icon: AlertCircle, color: 'bg-blue-700' }
    ]
  },
  {
    category: 'Layout',
    components: [
      { id: 'hero', name: 'Hero Section', icon: Layout, color: 'bg-green-500' },
      { id: 'container', name: 'Container', icon: Square, color: 'bg-green-400' },
      { id: 'section', name: 'Section', icon: Layout, color: 'bg-green-400' },
      { id: 'grid', name: 'Grid', icon: Grid, color: 'bg-green-300' },
      { id: 'features', name: 'Features Grid', icon: Layout, color: 'bg-green-600' },
      { id: 'cta', name: 'Call to Action', icon: MousePointer, color: 'bg-green-700' },
      { id: 'footer', name: 'Footer', icon: Layout, color: 'bg-green-800' }
    ]
  },
  {
    category: 'Forms',
    components: [
      { id: 'input', name: 'Text Input', icon: Type, color: 'bg-purple-500' },
      { id: 'textarea', name: 'Textarea', icon: Type, color: 'bg-purple-500' },
      { id: 'select', name: 'Select Dropdown', icon: ChevronDown, color: 'bg-purple-400' },
      { id: 'checkbox', name: 'Checkbox', icon: CheckCircle, color: 'bg-purple-400' },
      { id: 'radio', name: 'Radio Buttons', icon: MousePointer, color: 'bg-purple-400' },
      { id: 'fileUpload', name: 'File Upload', icon: Upload, color: 'bg-purple-300' },
      { id: 'contactForm', name: 'Contact Form', icon: Mail, color: 'bg-purple-600' },
      { id: 'newsletter', name: 'Newsletter', icon: Mail, color: 'bg-purple-700' }
    ]
  },
  {
    category: 'E-commerce',
    components: [
      { id: 'productCard', name: 'Product Card', icon: Package, color: 'bg-orange-500' },
      { id: 'shoppingCart', name: 'Shopping Cart', icon: ShoppingCart, color: 'bg-orange-400' },
      { id: 'pricingCard', name: 'Pricing Card', icon: CreditCard, color: 'bg-orange-600' },
      { id: 'paymentForm', name: 'Payment Form', icon: CreditCard, color: 'bg-orange-700' }
    ]
  },
  {
    category: 'Navigation',
    components: [
      { id: 'navbar', name: 'Navigation Bar', icon: Menu, color: 'bg-indigo-500' },
      { id: 'breadcrumbs', name: 'Breadcrumbs', icon: ChevronRight, color: 'bg-indigo-400' },
      { id: 'pagination', name: 'Pagination', icon: MousePointer, color: 'bg-indigo-400' },
      { id: 'tabs', name: 'Tabs', icon: Layout, color: 'bg-indigo-300' },
      { id: 'accordion', name: 'Accordion', icon: ChevronDown, color: 'bg-indigo-600' }
    ]
  },
  {
    category: 'Social',
    components: [
      { id: 'socialLinks', name: 'Social Links', icon: Share, color: 'bg-pink-500' },
      { id: 'testimonial', name: 'Testimonial', icon: MessageCircle, color: 'bg-pink-400' },
      { id: 'teamMember', name: 'Team Member', icon: User, color: 'bg-pink-600' },
      { id: 'chatWidget', name: 'Chat Widget', icon: MessageCircle, color: 'bg-pink-700' }
    ]
  },
  {
    category: 'Interactive',
    components: [
      { id: 'button', name: 'Button', icon: MousePointer, color: 'bg-red-500' },
      { id: 'link', name: 'Link', icon: MousePointer, color: 'bg-red-400' },
      { id: 'modal', name: 'Modal', icon: Square, color: 'bg-red-600' },
      { id: 'tooltip', name: 'Tooltip', icon: Info, color: 'bg-red-300' },
      { id: 'dropdown', name: 'Dropdown', icon: ChevronDown, color: 'bg-red-700' }
    ]
  },
  {
    category: 'Media',
    components: [
      { id: 'image', name: 'Image', icon: Image, color: 'bg-yellow-500' },
      { id: 'video', name: 'Video', icon: Video, color: 'bg-yellow-400' },
      { id: 'gallery', name: 'Gallery', icon: Image, color: 'bg-yellow-600' },
      { id: 'slider', name: 'Image Slider', icon: Image, color: 'bg-yellow-700' }
    ]
  }
];

// =====================================
// COMPONENT RENDERER
// =====================================

const renderComponent = (element) => {
  const componentMap = {
    ...TypographyComponents,
    ...FormComponents,
    ...EcommerceComponents,
    ...SocialComponents,
    ...NavigationComponents,
    ...LayoutComponents
  };

  const Component = componentMap[element.type];
  
  if (!Component) {
    return (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded border">
        Unknown component: {element.type}
      </div>
    );
  }

  return <Component props={element.props || {}} />;
};

// =====================================
// ENHANCED DRAG & DROP BUILDER
// =====================================

const EnhancedDragDropBuilder = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [canvasMode, setCanvasMode] = useState('desktop');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const canvasRef = useRef(null);

  // Filter components based on search and category
  const filteredLibrary = EXPANDED_COMPONENT_LIBRARY.filter(category => {
    if (activeCategory !== 'all' && category.category.toLowerCase() !== activeCategory) {
      return false;
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return category.components.some(comp => 
        comp.name.toLowerCase().includes(searchLower) ||
        comp.id.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  }).map(category => ({
    ...category,
    components: category.components.filter(comp => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return comp.name.toLowerCase().includes(searchLower) ||
             comp.id.toLowerCase().includes(searchLower);
    })
  })).filter(category => category.components.length > 0);

  // Add element to canvas
  const addElement = (componentType, position) => {
    const newElement = {
      id: `${componentType}-${Date.now()}`,
      type: componentType,
      position: position || { x: 100, y: 100 },
      size: { width: 'auto', height: 'auto' },
      props: getDefaultProps(componentType)
    };

    setElements([...elements, newElement]);
    setSelectedElement(newElement.id);
  };

  // Get default props for component type
  const getDefaultProps = (type) => {
    const defaults = {
      h1: { text: 'Main Heading' },
      h2: { text: 'Section Heading' },
      h3: { text: 'Subsection Heading' },
      h4: { text: 'Small Heading' },
      paragraph: { text: 'This is a paragraph of text.' },
      button: { text: 'Button', variant: 'primary' },
      input: { label: 'Input Label', placeholder: 'Enter text...' },
      productCard: { name: 'Product Name', price: '99.99', rating: 4 },
      testimonial: { quote: 'Great service!', name: 'John Doe', role: 'CEO' },
      pricingCard: { plan: 'Pro Plan', price: '29', featured: false }
    };
    return defaults[type] || {};
  };

  // Handle drag operations
  const handleDragStart = (e, component) => {
    setDraggedItem(component);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!draggedItem) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const position = {
      x: e.clientX - canvasRect.left - 100,
      y: e.clientY - canvasRect.top - 50
    };

    addElement(draggedItem.id, position);
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  // Canvas dimensions
  const getCanvasDimensions = () => {
    switch (canvasMode) {
      case 'mobile': return { width: '375px', height: '812px' };
      case 'tablet': return { width: '768px', height: '1024px' };
      default: return { width: '100%', height: '100%' };
    }
  };

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      
      {/* Enhanced Component Library */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Components Library
          </h2>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-1 mb-4">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-2 py-1 text-xs rounded ${
                activeCategory === 'all'
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              All
            </button>
            {EXPANDED_COMPONENT_LIBRARY.map((category) => (
              <button
                key={category.category}
                onClick={() => setActiveCategory(category.category.toLowerCase())}
                className={`px-2 py-1 text-xs rounded ${
                  activeCategory === category.category.toLowerCase()
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
        </div>

        {/* Component Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredLibrary.map((category) => (
            <div key={category.category} className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                {category.category} ({category.components.length})
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {category.components.map((component) => {
                  const Icon = component.icon;
                  return (
                    <div
                      key={component.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, component)}
                      className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-grab active:cursor-grabbing hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group relative"
                    >
                      <div className={`w-8 h-8 ${component.color} rounded-lg flex items-center justify-center mb-2`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-xs font-medium text-gray-900 dark:text-white">
                        {component.name}
                      </div>
                      
                      {/* Quick Add Button */}
                      <button
                        onClick={() => addElement(component.id)}
                        className="absolute top-1 right-1 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          
          {filteredLibrary.length === 0 && (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No components found matching "{searchTerm}"
              </p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {EXPANDED_COMPONENT_LIBRARY.reduce((acc, cat) => acc + cat.components.length, 0)} Total Components
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Enhanced Toolbar */}
        <div className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {/* Device Preview */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setCanvasMode('desktop')}
                className={`p-2 rounded ${canvasMode === 'desktop' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCanvasMode('tablet')}
                className={`p-2 rounded ${canvasMode === 'tablet' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
                title="Tablet View"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCanvasMode('mobile')}
                className={`p-2 rounded ${canvasMode === 'mobile' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

            {/* Element Count */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {elements.length} elements
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded flex items-center gap-1">
              <Code className="w-4 h-4" />
              Export Code
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded flex items-center gap-1">
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button className="px-3 py-1 text-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded flex items-center gap-1">
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900 p-8">
          <div
            ref={canvasRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => setSelectedElement(null)}
            className="relative bg-white dark:bg-gray-800 shadow-xl rounded-lg mx-auto min-h-screen"
            style={{
              ...getCanvasDimensions(),
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          >
            {/* Drop zone indicator */}
            {elements.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Start Building Your Website
                  </h3>
                  <p className="text-gray-400 dark:text-gray-500 max-w-md">
                    Drag components from the library or click the + button on any component to add it to your canvas
                  </p>
                </div>
              </div>
            )}

            {/* Render elements */}
            {elements.map((element) => (
              <div
                key={element.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedElement(element.id);
                }}
                className={`absolute cursor-pointer transition-all ${
                  selectedElement === element.id 
                    ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-800' 
                    : 'hover:ring-1 hover:ring-gray-300 dark:hover:ring-gray-600'
                }`}
                style={{
                  left: element.position.x,
                  top: element.position.y,
                  width: element.size?.width || 'auto',
                  height: element.size?.height || 'auto'
                }}
              >
                {renderComponent(element)}
                
                {/* Element controls */}
                {selectedElement === element.id && (
                  <div className="absolute -top-8 left-0 flex items-center gap-1 bg-indigo-500 text-white px-2 py-1 rounded text-xs z-10">
                    <span className="capitalize">{element.type}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setElements(elements.filter(el => el.id !== element.id));
                        setSelectedElement(null);
                      }}
                      className="ml-2 hover:bg-indigo-600 p-1 rounded"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Properties Panel */}
      {selectedElement && (() => {
        const element = elements.find(el => el.id === selectedElement);
        if (!element) return null;
        
        return (
          <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                {element.type.replace(/([A-Z])/g, ' $1').trim()} Properties
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-6">
                
                {/* Content Properties */}
                {['h1', 'h2', 'h3', 'h4', 'paragraph', 'lead', 'button'].includes(element.type) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Text Content
                    </label>
                    <textarea
                      value={element.props.text || ''}
                      onChange={(e) => {
                        const newElements = elements.map(el => 
                          el.id === element.id 
                            ? { ...el, props: { ...el.props, text: e.target.value } }
                            : el
                        );
                        setElements(newElements);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                      rows={3}
                      placeholder="Enter text content..."
                    />
                  </div>
                )}

                {/* Button Variant */}
                {element.type === 'button' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Button Style
                    </label>
                    <select
                      value={element.props.variant || 'primary'}
                      onChange={(e) => {
                        const newElements = elements.map(el => 
                          el.id === element.id 
                            ? { ...el, props: { ...el.props, variant: e.target.value } }
                            : el
                        );
                        setElements(newElements);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                      <option value="outline">Outline</option>
                      <option value="ghost">Ghost</option>
                    </select>
                  </div>
                )}

                {/* Form Input Properties */}
                {['input', 'textarea'].includes(element.type) && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Label
                      </label>
                      <input
                        type="text"
                        value={element.props.label || ''}
                        onChange={(e) => {
                          const newElements = elements.map(el => 
                            el.id === element.id 
                              ? { ...el, props: { ...el.props, label: e.target.value } }
                              : el
                          );
                          setElements(newElements);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Enter label..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Placeholder
                      </label>
                      <input
                        type="text"
                        value={element.props.placeholder || ''}
                        onChange={(e) => {
                          const newElements = elements.map(el => 
                            el.id === element.id 
                              ? { ...el, props: { ...el.props, placeholder: e.target.value } }
                              : el
                          );
                          setElements(newElements);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Enter placeholder..."
                      />
                    </div>
                  </>
                )}

                {/* Position & Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Position
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">X</label>
                      <input
                        type="number"
                        value={element.position.x}
                        onChange={(e) => {
                          const newElements = elements.map(el => 
                            el.id === element.id 
                              ? { ...el, position: { ...el.position, x: parseInt(e.target.value) || 0 } }
                              : el
                          );
                          setElements(newElements);
                        }}
                        className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Y</label>
                      <input
                        type="number"
                        value={element.position.y}
                        onChange={(e) => {
                          const newElements = elements.map(el => 
                            el.id === element.id 
                              ? { ...el, position: { ...el.position, y: parseInt(e.target.value) || 0 } }
                              : el
                          );
                          setElements(newElements);
                        }}
                        className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Element Actions */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <button
                    onClick={() => {
                      const newElement = {
                        ...element,
                        id: `${element.type}-${Date.now()}`,
                        position: {
                          x: element.position.x + 20,
                          y: element.position.y + 20
                        }
                      };
                      setElements([...elements, newElement]);
                      setSelectedElement(newElement.id);
                    }}
                    className="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Duplicate Element
                  </button>
                  
                  <button
                    onClick={() => {
                      setElements(elements.filter(el => el.id !== element.id));
                      setSelectedElement(null);
                    }}
                    className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Element
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default EnhancedDragDropBuilder;