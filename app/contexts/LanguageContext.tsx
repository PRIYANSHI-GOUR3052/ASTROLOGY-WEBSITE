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

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<SupportedLang>('en');

  // Function to get nested translation value
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = (translations as Record<SupportedLang, any>)[lang];
    
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
    return result || key;
  };

  const value = { lang, setLang, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 