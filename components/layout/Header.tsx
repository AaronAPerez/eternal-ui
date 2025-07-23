import { SimpleThemeToggle, ThemeToggle } from "@/lib/theme/ThemeToggle";
import EternalUILogo from "../Logo/EternalUILogo";


export function Header() {
  return (
    <header className="border-b border-border-primary bg-background-secondary">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <EternalUILogo asLink href="/" />
        {/* <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <h1 className="text-xl font-bold text-text-primary">Eternal UI</h1>
        </div> */}
        
        <nav className="flex items-center gap-6">
          <a href="/components" className="text-text-secondary hover:text-text-primary transition-colors">
            Components
          </a>
          <a href="/studio" className="text-text-secondary hover:text-text-primary transition-colors">
            Studio
          </a>
          <a href="/builder" className="text-text-secondary hover:text-text-primary transition-colors">
            Builder
          </a>
          <a href="/marketplace" className="text-text-secondary hover:text-text-primary transition-colors">
            Marketplace
          </a>
          
          {/* Theme toggle */}
          {/* <SimpleThemeToggle /> */}
          
          {/* Or use the full theme selector */}
         <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}