import { useState, useEffect } from 'react';

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
        const contentModule = await import(`../data/content-${language}.json`);
        const loadedContent = contentModule.default;
        
        // Cache the content
        contentCache.set(language, loadedContent);
        setContent(loadedContent);
      } catch (err) {
        console.error(`Failed to load content for language: ${language}`, err);
        
        // Fallback to English if other language fails
        if (language !== 'en') {
          try {
            const fallbackModule = await import('../data/content-en.json');
            const fallbackContent = fallbackModule.default;
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