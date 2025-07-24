import React from 'react';
import { Metadata } from 'next';
import { Toaster } from '@/components/ui/Toaster';
import { StudioProvider } from '@/components/studio/StudioProvider';

export const metadata: Metadata = {
  title: 'Studio - Eternal UI Pro',
  description: 'AI-powered visual website builder',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StudioProvider>
     <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        {children}
        <Toaster />
        
      </div>
    </StudioProvider>
  );
}