"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dictionaries, type Lang, type TranslationKey } from "./dictionaries";

// ================================================================
// LanguageContext · client-side language switch
// ================================================================
// Storage: localStorage key "lang"
// Default: "es" (Spanish)
// Hook: useLang() returns { lang, t, toggleLang }
// ================================================================

interface LanguageContextValue {
  lang: Lang;
  t: (key: TranslationKey) => string;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  // Load persisted preference on mount (client only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("lang");
      if (stored === "es" || stored === "en") {
        setLang(stored);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  // Persist changes and update <html lang="">
  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
      document.documentElement.setAttribute("lang", lang);
    } catch {
      // localStorage unavailable
    }
  }, [lang]);

  const t = (key: TranslationKey): string => {
    return dictionaries[lang][key] ?? String(key);
  };

  const toggleLang = () => {
    setLang((prev) => (prev === "es" ? "en" : "es"));
  };

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
