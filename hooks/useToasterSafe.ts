'use client';

import React from 'react';
import { useContext } from 'react';

// Create a simple context for toaster (you can import from your UI library)
const ToasterContext = React.createContext<any>(null);

export function useToasterSafe() {
  const context = useContext(ToasterContext);
  
  if (!context) {
    // Return no-op functions if toaster isn't available
    return {
      success: (message: string) => console.log('Success:', message),
      error: (title: string, message?: string) => console.log('Error:', title, message),
      warning: (message: string) => console.log('Warning:', message),
      info: (message: string) => console.log('Info:', message),
    };
  }
  
  return context;
}
