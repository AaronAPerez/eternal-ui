'use client';

import React, { useEffect } from 'react';
import '@/styles/builder-layout-fixes.css';
import CompleteStudioBuilderInterface from '../../components/builder/CompleteStudioBuilderInterface';

/**
 * Builder Page - Fixed Layout Version
 * 
 * This page implements the fixed layout structure to prevent
 * grid cutoff and ensure proper scrolling behavior.
 */
export default function BuilderPage() {
  // Apply builder-specific body classes
  useEffect(() => {
    document.body.classList.add('builder-page-active');
    
    return () => {
      document.body.classList.remove('builder-page-active');
    };
  }, []);

  return (
    <div className="h-screen">
      <CompleteStudioBuilderInterface />
    </div>
  );
}
