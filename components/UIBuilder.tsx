import { useTheme } from '@/lib/theme/context';
import { SimpleThemeToggle } from '@/components/theme/ThemeToggle';

export function UIBuilder() {
  const { actualTheme } = useTheme();
  
  return (
    <div className="h-screen flex flex-col bg-background-primary">
      {/* Header */}
      <header className="h-16 border-b border-border-primary bg-background-secondary">
        <div className="flex items-center justify-between px-6 h-full">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
              Eternal UI Builder
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <SimpleThemeToggle />
            <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors">
              Save Project
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Component palette */}
        <aside className="w-80 border-r border-border-primary bg-background-secondary">
          <ComponentPalette />
        </aside>

        {/* Canvas */}
        <main className="flex-1 bg-background-tertiary">
          <Canvas />
        </main>

        {/* Properties panel */}
        <aside className="w-80 border-l border-border-primary bg-background-secondary">
          <PropertiesPanel />
        </aside>
      </div>
    </div>
  );
}