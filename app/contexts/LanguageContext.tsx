'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Import translations
import en from '../../translations/en.json';
import hi from '../../translations/hi.json';
import es from '../../translations/es.json';
import fr from '../../translations/fr.json';
import de from '../../translations/de.json';
import zh from '../../translations/zh.json';
import ar from '../../translations/ar.json';
import ru from '../../translations/ru.json';
// Import other languages as they are created
// import es from '../../translations/es.json';
// import fr from '../../translations/fr.json';
// import de from '../../translations/de.json';
// import zh from '../../translations/zh.json';
// import ar from '../../translations/ar.json';
// import ru from '../../translations/ru.json';

export type SupportedLang = 'en' | 'hi' | 'es' | 'fr' | 'de' | 'zh' | 'ar' | 'ru';

// Map language codes to their JSON data
const translations = {
  en,
  hi,
  es,
  fr,
  de,
  zh,
  ar,
  ru,
};

export const LANGUAGE_NAMES: Record<SupportedLang, string> = {
  en: 'English',
  hi: 'हिन्दी (Hindi)',
  es: 'Español (Spanish)',
  fr: 'Français (French)',
  de: 'Deutsch (German)',
  zh: '中文 (Mandarin)',
  ar: 'العربية (Arabic)',
  ru: 'Русский (Russian)',
};

interface LanguageContextType {
  lang: SupportedLang;
  setLang: (lang: SupportedLang) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper to normalize language codes
function normalizeLang(code: string): SupportedLang {
  if (code.startsWith('en')) return 'en';
  if (code.startsWith('hi')) return 'hi';
  if (code.startsWith('es')) return 'es';
  if (code.startsWith('fr')) return 'fr';
  if (code.startsWith('de')) return 'de';
  if (code.startsWith('zh')) return 'zh';
  if (code.startsWith('ar')) return 'ar';
  if (code.startsWith('ru')) return 'ru';
  return 'en'; // fallback
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangRaw] = useState<SupportedLang>('en');

  // Wrap setLang to normalize
  const setLang = (code: string) => {
    setLangRaw(normalizeLang(code));
  };

  // Function to get nested translation value
  const t = (key: string): any => {
    const keys = key.split('.');
    let result: any = (translations as Record<SupportedLang, any>)[normalizeLang(lang)];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        // Fallback to English if translation is missing
        let fallbackResult: any = translations['en'];
        for (const fk of keys) {
            fallbackResult = fallbackResult?.[fk];
        }
        return fallbackResult || key;
      }
    }
    return result;
  };

  const value = { lang: normalizeLang(lang), setLang, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 