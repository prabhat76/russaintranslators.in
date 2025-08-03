import React, { useState, useEffect } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { rtdb } from '../firebase';

const ContentEditor = () => {
  const [content, setContent] = useState({});
  const [selectedLang, setSelectedLang] = useState('en');
  const [selectedSection, setSelectedSection] = useState('nav');

  useEffect(() => {
    const contentRef = ref(rtdb, 'content');
    const unsubscribe = onValue(contentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setContent(data);
      }
    });
    return unsubscribe;
  }, []);

  const updateContent = async (path, value) => {
    try {
      await set(ref(rtdb, `content/${selectedLang}/${selectedSection}/${path}`), value);
      console.log('Content updated');
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const currentSection = content[selectedLang]?.[selectedSection] || {};

  return (
    <div className="content-editor">
      <h2>📝 Content Editor</h2>
      
      <div className="editor-controls">
        <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)}>
          <option value="en">English</option>
          <option value="ru">Russian</option>
        </select>
        
        <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
          <option value="nav">Navigation</option>
          <option value="hero">Hero Section</option>
          <option value="about">About Section</option>
          <option value="services">Services</option>
          <option value="contact">Contact</option>
          <option value="appointments">Appointments</option>
        </select>
      </div>

      <div className="content-fields">
        {Object.entries(currentSection).map(([key, value]) => (
          <div key={key} className="field-group">
            <label>{key}:</label>
            <textarea
              value={value}
              onChange={(e) => updateContent(key, e.target.value)}
              rows={value.length > 50 ? 4 : 2}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentEditor;