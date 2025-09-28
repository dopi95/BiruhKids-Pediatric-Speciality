import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or default to 'En'
    return localStorage.getItem('biruhkids-language') || 'En';
  });

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('biruhkids-language', newLanguage);
  };

  useEffect(() => {
    // Save to localStorage whenever language changes
    localStorage.setItem('biruhkids-language', language);
  }, [language]);

  const value = {
    language,
    changeLanguage,
    isAmharic: language === 'Am',
    isEnglish: language === 'En'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};