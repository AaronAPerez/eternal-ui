export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            function getThemePreference() {
              if (typeof localStorage !== 'undefined' && localStorage.getItem('eternal-ui-theme')) {
                return localStorage.getItem('eternal-ui-theme');
              }
              return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            
            const themePreference = getThemePreference();
            const actualTheme = themePreference === 'system' 
              ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
              : themePreference;
            
            document.documentElement.classList.add(actualTheme);
            document.documentElement.style.colorScheme = actualTheme;
          })();
        `,
      }}
    />
  );
}