'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Dynamic import to avoid SSR issues
const BrowserGridSystem = dynamic(
  () => import('@/components/grid/BrowserGridSystem'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

export default function BuilderPage() {
  return (
    <main className="h-screen overflow-hidden">
      <Suspense fallback={<LoadingSpinner />}>
        <BrowserGridSystem />
      </Suspense>
    </main>
  );
}