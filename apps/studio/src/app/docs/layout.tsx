import { DocsNavigation } from '@/components/docs/DocsNavigation'
import { DocsSearch } from '@/components/docs/DocsSearch'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      <aside className="w-64 border-r border-gray-200 dark:border-gray-800 p-6">
        <DocsSearch />
        <DocsNavigation />
      </aside>
      
      <main className="flex-1 max-w-4xl mx-auto p-8">
        {children}
      </main>
    </div>
  )
}