'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  lang: 'en' | 'hi';
  setLang: (language: 'en' | 'hi') => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<'en' | 'hi'>('en'); // Default language is English

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
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