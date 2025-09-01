"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function applyTheme(theme) {
  const root = window.document.documentElement;

  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("system");

  useEffect(
    function () {
      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";

        setTheme(systemTheme);
        applyTheme(systemTheme);
      }
    },
    [theme]
  );

  function toggleTheme() {
    const curTheme = theme === "dark" ? "light" : "dark";
    setTheme(curTheme);
    applyTheme(curTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("ThemeContext was used outside provider!");

  return context;
}

export { ThemeProvider, useTheme };
