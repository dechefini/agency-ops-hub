
import { useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    
    // If saved theme exists, return it
    if (savedTheme) return savedTheme;
    
    // Check if user prefers dark mode
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "system";
    }
    
    // Default to light
    return "light";
  });
  
  // Update theme when it changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }
    
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  
  return {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme);
    },
    toggleTheme: () => {
      setTheme(prevTheme => {
        if (prevTheme === "light") return "dark";
        if (prevTheme === "dark") return "system";
        return "light";
      });
    }
  };
}
