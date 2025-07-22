import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './context';

export function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();

  const themes = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ];

  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {themes.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all
            ${theme === value 
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }
          `}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}

// Simple toggle button version
export function SimpleThemeToggle() {
  const { toggleTheme, actualTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        p-2 rounded-lg border border-gray-200 dark:border-gray-700 
        bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700
        text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100
        transition-all duration-200
      "
      aria-label={`Switch to ${actualTheme === 'light' ? 'dark' : 'light'} theme`}
    >
      {actualTheme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}