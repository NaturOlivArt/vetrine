import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Vérifier si le thème est stocké dans localStorage ou utiliser la préférence système
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    // Vérifier la préférence système
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Mettre à jour la classe sur l'élément HTML et sauvegarder dans localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Fonction pour basculer le thème
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}