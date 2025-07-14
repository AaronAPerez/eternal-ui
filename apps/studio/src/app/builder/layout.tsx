import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grid Builder - Eternal UI',
  description: 'Create responsive layouts with our visual grid builder',
};

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {children}
    </div>
  );
}