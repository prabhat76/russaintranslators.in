import React, { useState } from 'react';

const ContentSubmitButton = () => {
  const [submitStatus, setSubmitStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const triggerContentSync = async () => {
    setIsSubmitting(true);
    setSubmitStatus('⏳ Triggering content sync...');

    try {
      const response = await fetch('https://api.github.com/repos/prabhat76/russian-translator/dispatches', {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: 'content-updated',
          client_payload: {
            timestamp: new Date().toISOString(),
            source: 'manual-submit'
          }
        })
      });

      if (response.ok) {
        setSubmitStatus('✅ Content sync triggered successfully!');
      } else {
        setSubmitStatus('❌ Failed to trigger sync');
      }
    } catch (error) {
      setSubmitStatus('❌ Error: ' + error.message);
    }

    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus(''), 5000);
  };

  return (
    <div style={{
      padding: '20px',
      background: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #e9ecef',
      textAlign: 'center'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#495057' }}>🚀 Manual Content Sync</h3>
      
      <button
        onClick={triggerContentSync}
        disabled={isSubmitting}
        style={{
          background: isSubmitting ? '#6c757d' : 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          minWidth: '200px'
        }}
      >
        {isSubmitting ? '⏳ Submitting...' : '🚀 Submit & Sync Content'}
      </button>

      {submitStatus && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          borderRadius: '6px',
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

export default ContentSubmitButton;