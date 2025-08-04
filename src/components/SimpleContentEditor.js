import React, { useState, useEffect } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { rtdb } from '../firebase';

const SimpleContentEditor = () => {
  const [, setContent] = useState({ en: {}, ru: {} });
  const [editedContent, setEditedContent] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const contentRef = ref(rtdb, 'content');
    const unsubscribe = onValue(contentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const cleanData = { en: data.en || {}, ru: data.ru || {} };
        setContent(cleanData);
        setEditedContent(JSON.stringify(cleanData, null, 2));
      }
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus('⏳ Submitting changes...');

    try {
      const parsedContent = JSON.parse(editedContent);
      
      const updateData = {
        ...parsedContent,
        lastUpdated: new Date().toISOString(),
        version: Date.now(),
        source: 'simple-editor'
      };

      await set(ref(rtdb, 'content'), updateData);
      setSubmitStatus('✅ Changes submitted successfully!');
      
    } catch (error) {
      setSubmitStatus('❌ Error: ' + error.message);
    }

    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus(''), 5000);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: 0 }}>📝 Content Editor</h2>
        <p style={{ margin: '10px 0 0 0', opacity: 0.9 }}>
          Edit all website content directly in JSON format
        </p>
      </div>

      <div style={{
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #e9ecef',
        marginBottom: '20px'
      }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '10px', 
          fontWeight: '600',
          fontSize: '16px'
        }}>
          Website Content (JSON Format):
        </label>
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          style={{
            width: '100%',
            height: '500px',
            padding: '15px',
            border: '1px solid #ced4da',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '14px',
            resize: 'vertical'
          }}
          placeholder="Loading content..."
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{
            background: isSubmitting ? '#6c757d' : 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            minWidth: '200px'
          }}
        >
          {isSubmitting ? '⏳ Submitting...' : '🚀 Submit Changes'}
        </button>
      </div>

      {submitStatus && (
        <div style={{
          padding: '15px',
          borderRadius: '8px',
          textAlign: 'center',
          fontWeight: '600',
          background: submitStatus.includes('✅') ? '#d4edda' : '#f8d7da',
          color: submitStatus.includes('✅') ? '#155724' : '#721c24',
          border: `1px solid ${submitStatus.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {submitStatus}
        </div>
      )}
    </div>
  );
};

export default SimpleContentEditor;