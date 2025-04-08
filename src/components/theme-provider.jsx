// src/components/theme-provider.jsx

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from "next-themes";

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class"      // Enables Tailwind 'dark:' class support
      defaultTheme="system" // Fallback to system preference
      enableSystem           // Use system theme if preferred
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

// ✅ Export the theme hook to use in components
export const useTheme = useNextTheme;
