'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';

// Import translations
import en from '../../translations/en.json';
import hi from '../../translations/hi.json';
import es from '../../translations/es.json';
import fr from '../../translations/fr.json';
import de from '../../translations/de.json';
import zh from '../../translations/zh.json';
import ar from '../../translations/ar.json';
import ru from '../../translations/ru.json';
import bn from '../../translations/bn.json';
import ta from '../../translations/ta.json';
import te from '../../translations/te.json';
import mr from '../../translations/mr.json';
import gu from '../../translations/gu.json';
import ml from '../../translations/ml.json';
import kn from '../../translations/kn.json';
import or from '../../translations/or.json';
import pa from '../../translations/pa.json';
// Import other languages as they are created
// import es from '../../translations/es.json';
// import fr from '../../translations/fr.json';
// import de from '../../translations/de.json';
// import zh from '../../translations/zh.json';
// import ar from '../../translations/ar.json';
// import ru from '../../translations/ru.json';

export type SupportedLang =
  | 'en'
  | 'hi'
  | 'bn'
  | 'ta'
  | 'te'
  | 'mr'
  | 'gu'
  | 'ml'
  | 'kn'
  | 'or'
  | 'pa'
  | 'es'
  | 'fr'
  | 'de'
  | 'zh'
  | 'ar'
  | 'ru';

// Map language codes to their JSON data
const translations = {
  en,
  hi,
  bn,
  ta,
  te,
  mr,
  gu,
  ml,
  kn,
  or,
  pa,
  es,
  fr,
  de,
  zh,
  ar,
  ru,
} as const;

export const LANGUAGE_NAMES: Record<SupportedLang, string> = {
  en: 'English',
  hi: 'हिन्दी (Hindi)',
  bn: 'বাংলা (Bengali)',
  ta: 'தமிழ் (Tamil)',
  te: 'తెలుగు (Telugu)',
  mr: 'मराठी (Marathi)',
  gu: 'ગુજરાતી (Gujarati)',
  ml: 'മലയാളം (Malayalam)',
  kn: 'ಕನ್ನಡ (Kannada)',
  or: 'ଓଡ଼ିଆ (Odia)',
  pa: 'ਪੰਜਾਬੀ (Punjabi)',
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
  if (code.startsWith('bn')) return 'bn';
  if (code.startsWith('ta')) return 'ta';
  if (code.startsWith('te')) return 'te';
  if (code.startsWith('mr')) return 'mr';
  if (code.startsWith('gu')) return 'gu';
  if (code.startsWith('ml')) return 'ml';
  if (code.startsWith('kn')) return 'kn';
  if (code.startsWith('or')) return 'or';
  if (code.startsWith('pa')) return 'pa';
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

  // Wrap setLang to normalize and update HTML lang attribute
  const setLang = (code: string) => {
    const newLang = normalizeLang(code);
    setLangRaw(newLang);
    
    // Update HTML lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang;
    }
  };

  // Function to get nested translation value
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: unknown = translations[normalizeLang(lang)];
    
    for (const k of keys) {
      if (typeof result === 'object' && result !== null && k in result) {
        result = (result as Record<string, unknown>)[k];
      } else {
        result = undefined;
        break;
      }
    }
    
    if (result === undefined) {
      // Fallback to English if translation is missing
      let fallbackResult: unknown = translations['en'];
      for (const fk of keys) {
        if (typeof fallbackResult === 'object' && fallbackResult !== null && fk in fallbackResult) {
          fallbackResult = (fallbackResult as Record<string, unknown>)[fk];
        } else {
          fallbackResult = undefined;
          break;
        }
      }
      return typeof fallbackResult === 'string' ? fallbackResult : key;
    }
    
    return typeof result === 'string' ? result : key;
  };

  // Set initial lang attribute
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const value = { lang: normalizeLang(lang), setLang, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 