import React from 'react';
import WebsiteBuilderStudio from '@/components/WebsiteBuilder/WebsiteBuilderStudio';
import { Navigation } from '@/navigation/Navigation';

export default function BuilderPage() {
  return (
    <div className="h-screen">
      <Navigation/>
      <WebsiteBuilderStudio />
    </div>
  );
}