import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grid Builder - Eternal UI',
  description: 'Create responsive layouts with our visual grid builder',
};

/**
 * Fixed Builder Layout
 * 
 * Key fixes:
 * - Remove overflow-hidden to prevent grid cutoff
 * - Use proper flexbox layout for full height
 * - Ensure proper scrolling behavior
 */
export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {children}
    </div>
  );
}
