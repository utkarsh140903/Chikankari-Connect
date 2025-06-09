import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export const useFavicon = () => {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    // Get the current theme (resolved theme handles system preference)
    const currentTheme = resolvedTheme || theme;
    
    // Find existing favicon link element
    let faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    
    // If no favicon link exists, create one
    if (!faviconLink) {
      faviconLink = document.createElement('link');
      faviconLink.rel = 'icon';
      faviconLink.type = 'image/svg+xml';
      document.head.appendChild(faviconLink);
    }
    
    // Set the appropriate favicon based on theme
    if (currentTheme === 'dark') {
      faviconLink.href = '/favicon-dark.svg';
    } else {
      faviconLink.href = '/favicon-light.svg';
    }
  }, [theme, resolvedTheme]);
};

