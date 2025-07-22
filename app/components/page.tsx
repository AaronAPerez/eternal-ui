'use client'

import { Suspense } from 'react'
import React from 'react';

// Define proper interfaces instead of using 'any'
interface ComponentLibraryProps {
  onComponentSelect?: (componentId: string) => void;
  searchQuery?: string;
  selectedCategory?: string;
}

interface ComponentItem {
  id: string;
  name: string;
  category: string;
  description: string;
  props: Record<string, unknown>; // Instead of any
}

const ComponentLibrary: React.FC<ComponentLibraryProps> = ({
  onComponentSelect}) => {
  // Replace any usage of 'any' with proper types
  const handleComponentSelect = (component: ComponentItem) => { // Instead of (component: any)
    onComponentSelect?.(component.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Component Library</h2>
        <p className="text-gray-600">Preparing 120+ components...</p>
      </div>
    </div>
  )
}


export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<ComponentLibrary />}>
        <ComponentLibrary />
      </Suspense>
    </div>
  )
}