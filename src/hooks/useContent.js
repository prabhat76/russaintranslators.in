import { useState, useEffect } from 'react';

// Note: This hook is deprecated in favor of ContentContext
// Use useContentContext() instead

const contentCache = new Map();

export const useContent = (language = 'en') => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError(null);
      
      // Check cache first
      if (contentCache.has(language)) {
        setContent(contentCache.get(language));
        setLoading(false);
        return;
      }

      try {
        const contentUrl = language === 'en' 
          ? 'https://raw.githubusercontent.com/prabhat76/russian-translator-content/master/data/content.json'
          : 'https://raw.githubusercontent.com/prabhat76/russian-translator-content/master/data/russian.json';
        
        const response = await fetch(contentUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const loadedContent = await response.json();
        
        // Cache the content
        contentCache.set(language, loadedContent);
        setContent(loadedContent);
      } catch (err) {
        console.error(`Failed to load content for language: ${language}`, err);
        
        // Fallback to English if other language fails
        if (language !== 'en') {
          try {
            const fallbackUrl = 'https://raw.githubusercontent.com/prabhat76/russian-translator-content/master/data/content.json';
            const fallbackResponse = await fetch(fallbackUrl);
            if (!fallbackResponse.ok) throw new Error(`HTTP ${fallbackResponse.status}`);
            
            const fallbackContent = await fallbackResponse.json();
            contentCache.set('en', fallbackContent);
            setContent(fallbackContent);
          } catch (fallbackErr) {
            setError(`Failed to load content for ${language} and fallback`);
          }
        } else {
          setError(`Failed to load English content`);
        }
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [language]);

  return { content, loading, error };
};