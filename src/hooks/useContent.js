import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../firebase';
import { CONTENT } from '../constants/content';

export const useContent = (language) => {
  const [content, setContent] = useState(CONTENT[language]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const contentRef = ref(rtdb, `content/${language}`);
    
    const unsubscribe = onValue(contentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setContent(data);
      } else {
        // Fallback to hardcoded content
        setContent(CONTENT[language]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [language]);

  return { content, loading };
};