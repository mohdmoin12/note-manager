// src/components/theme-provider.jsx

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// ✅ Export this so other files (like Header.jsx) can use the hook
export const useTheme = useNextTheme;
