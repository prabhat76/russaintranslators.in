import React, { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();

const SUPPORTED_LANGUAGES = ['en', 'ru'];
const DEFAULT_LANGUAGE = 'en';

export const ContentProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || DEFAULT_LANGUAGE;
  });
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadContent = async (language) => {
    setLoading(true);
    setError(null);

    try {
      const contentUrl = language === 'en' 
        ? 'https://raw.githubusercontent.com/prabhat76/russian-translator-content/master/data/content.json'
        : 'https://raw.githubusercontent.com/prabhat76/russian-translator-content/master/data/russian.json';
      
      const response = await fetch(contentUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const contentData = await response.json();
      setContent(contentData);
    } catch (err) {
      console.error(`Failed to load content for language: ${language}`, err);
      
      if (language !== DEFAULT_LANGUAGE) {
        try {
          const fallbackUrl = 'https://raw.githubusercontent.com/prabhat76/russian-translator-content/master/data/content.json';
          const fallbackResponse = await fetch(fallbackUrl);
          if (!fallbackResponse.ok) throw new Error(`HTTP ${fallbackResponse.status}`);
          
          const fallbackData = await fallbackResponse.json();
          setContent(fallbackData);
          setCurrentLanguage(DEFAULT_LANGUAGE);
        } catch (fallbackErr) {
          setError('Failed to load content');
        }
      } else {
        setError('Failed to load content');
      }
    } finally {
      setLoading(false);
    }
  };

  const changeLanguage = (language) => {
    if (SUPPORTED_LANGUAGES.includes(language)) {
      setCurrentLanguage(language);
      localStorage.setItem('selectedLanguage', language);
    }
  };

  useEffect(() => {
    loadContent(currentLanguage);
  }, [currentLanguage]);

  const value = {
    content,
    currentLanguage,
    changeLanguage,
    loading,
    error,
    supportedLanguages: SUPPORTED_LANGUAGES,
    isRussian: currentLanguage === 'ru'
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContentContext = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContentContext must be used within a ContentProvider');
  }
  return context;
};