import { useTheme } from '@/lib/theme/context';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function MobileThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ];

  const currentTheme = themes.find(t => t.value === theme);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-secondary border border-border-primary text-text-primary hover:bg-background-tertiary transition-colors"
      >
        <currentTheme.icon className="w-4 h-4" />
        <span className="text-sm">{currentTheme?.label}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-background-secondary border border-border-primary rounded-lg shadow-lg z-50">
          {themes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => {
                setTheme(value);
                setIsOpen(false);
              }}
              className={`
                flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-background-tertiary transition-colors first:rounded-t-lg last:rounded-b-lg
                ${theme === value ? 'bg-background-tertiary text-primary-600' : 'text-text-primary'}
              `}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}