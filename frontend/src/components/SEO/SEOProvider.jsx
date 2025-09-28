import { HelmetProvider } from 'react-helmet-async';
import { createContext, useContext, useState } from 'react';

const SEOContext = createContext();

export const useSEO = () => {
  const context = useContext(SEOContext);
  if (!context) {
    throw new Error('useSEO must be used within SEOProvider');
  }
  return context;
};

export const SEOProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [currentPage, setCurrentPage] = useState('home');

  const updateSEO = (page, lang = language) => {
    setCurrentPage(page);
    setLanguage(lang);
  };

  const value = {
    language,
    currentPage,
    setLanguage,
    setCurrentPage,
    updateSEO
  };

  return (
    <HelmetProvider>
      <SEOContext.Provider value={value}>
        {children}
      </SEOContext.Provider>
    </HelmetProvider>
  );
};