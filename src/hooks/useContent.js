import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../firebase';
import { CONTENT } from '../constants/content';

// Try to import build-time content
let BUILD_CONTENT = {};
try {
  BUILD_CONTENT = require('../data/build-content.json');
  console.log('📦 Build-time content loaded');
} catch (error) {
  console.log('📦 No build-time content found, using constants');
}

export const useContent = (language) => {
  // Use build-time content if available, otherwise fallback to constants
  const fallbackContent = BUILD_CONTENT[language] || CONTENT[language] || {};
  const [content, setContent] = useState(fallbackContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const contentRef = ref(rtdb, `content/${language}`);
    
    const unsubscribe = onValue(contentRef, (snapshot) => {
      const data = snapshot.val();
      if (data && typeof data === 'object') {
        // Merge with fallback content to ensure all properties exist
        const mergedContent = {
          ...CONTENT[language],
          ...BUILD_CONTENT[language],
          ...data
        };
        setContent(mergedContent);
      } else {
        // Fallback to build-time or hardcoded content
        setContent(fallbackContent);
      }
      setLoading(false);
    }, (error) => {
      console.error('Firebase content fetch error:', error);
      setContent(fallbackContent);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [language]);

  return { content, loading };
};