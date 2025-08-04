import React, { useState, useEffect } from 'react';
import { ref, onValue, set, get } from 'firebase/database';
import { rtdb } from '../firebase';
import ContentSubmitButton from './ContentSubmitButton';

const ContentSubmissionForm = () => {
  const [formData, setFormData] = useState({
    language: 'en',
    section: 'nav',
    submissionType: 'single',
    key: '',
    value: '',
    bulkData: '',
    file: null
  });
  const [submitStatus, setSubmitStatus] = useState('');
  const [currentContent, setCurrentContent] = useState({});
  const [previewData, setPreviewData] = useState(null);

  const sections = [
    { value: 'nav', label: '🧭 Navigation' },
    { value: 'hero', label: '🎯 Hero Section' },
    { value: 'about', label: '👤 About Section' },
    { value: 'services', label: '⚙️ Services' },
    { value: 'gallery', label: '🖼️ Gallery' },
    { value: 'contact', label: '📞 Contact' },
    { value: 'appointments', label: '📅 Appointments' }
  ];

  useEffect(() => {
    const contentRef = ref(rtdb, 'content');
    const unsubscribe = onValue(contentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCurrentContent(data);
      }
    });
    return unsubscribe;
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-preview for bulk data
    if (field === 'bulkData' && value.trim()) {
      try {
        const parsed = JSON.parse(value);
        setPreviewData(parsed);
      } catch {
        setPreviewData(null);
      }
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = JSON.parse(e.target.result);
          setFormData(prev => ({ ...prev, file: content }));
          setPreviewData(content);
        } catch (error) {
          setSubmitStatus('❌ Invalid JSON file');
        }
      };
      reader.readAsText(file);
    } else {
      setSubmitStatus('❌ Please select a valid JSON file');
    }
  };

  const submitSingleKeyValue = async () => {
    const { language, section, key, value } = formData;
    
    if (!key.trim() || !value.trim()) {
      setSubmitStatus('❌ Key and value are required');
      return;
    }

    try {
      // Check if key exists
      const existingData = await get(ref(rtdb, `content/${language}/${section}/${key}`));
      if (existingData.exists()) {
        if (!window.confirm(`Key "${key}" already exists. Overwrite?`)) {
          return;
        }
      }

      await set(ref(rtdb, `content/${language}/${section}/${key}`), value);
      setSubmitStatus(`✅ Added ${language}.${section}.${key}`);
      
      // Clear form
      setFormData(prev => ({ ...prev, key: '', value: '' }));
      
    } catch (error) {
      setSubmitStatus('❌ Submission failed: ' + error.message);
    }
  };

  const submitBulkData = async () => {
    const { language, section, bulkData } = formData;
    
    try {
      const data = JSON.parse(bulkData);
      
      if (typeof data !== 'object' || Array.isArray(data)) {
        throw new Error('Data must be a JSON object');
      }

      const updates = {};
      Object.entries(data).forEach(([key, value]) => {
        updates[`content/${language}/${section}/${key}`] = value;
      });

      // Use Firebase update for batch operations
      const { update } = await import('firebase/database');
      await update(ref(rtdb), updates);
      
      setSubmitStatus(`✅ Added ${Object.keys(data).length} items to ${language}.${section}`);
      setFormData(prev => ({ ...prev, bulkData: '' }));
      setPreviewData(null);
      
    } catch (error) {
      setSubmitStatus('❌ Bulk submission failed: ' + error.message);
    }
  };

  const submitFileData = async () => {
    const { language, file } = formData;
    
    if (!file) {
      setSubmitStatus('❌ No file data to submit');
      return;
    }

    try {
      const updates = {};
      Object.entries(file).forEach(([section, fields]) => {
        if (typeof fields === 'object' && !Array.isArray(fields)) {
          Object.entries(fields).forEach(([key, value]) => {
            updates[`content/${language}/${section}/${key}`] = value;
          });
        }
      });

      const { update } = await import('firebase/database');
      await update(ref(rtdb), updates);
      
      const totalItems = Object.values(file).reduce((sum, section) => 
        sum + (typeof section === 'object' ? Object.keys(section).length : 0), 0
      );
      
      setSubmitStatus(`✅ Uploaded ${totalItems} items from file to ${language}`);
      setFormData(prev => ({ ...prev, file: null }));
      setPreviewData(null);
      
    } catch (error) {
      setSubmitStatus('❌ File submission failed: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('⏳ Submitting...');

    switch (formData.submissionType) {
      case 'single':
        await submitSingleKeyValue();
        break;
      case 'bulk':
        await submitBulkData();
        break;
      case 'file':
        await submitFileData();
        break;
      default:
        setSubmitStatus('❌ Invalid submission type');
    }

    setTimeout(() => setSubmitStatus(''), 5000);
  };

  const currentSectionData = currentContent[formData.language]?.[formData.section] || {};

  return (
    <div className="content-submission-form" style={{ 
      maxWidth: '1000px', 
      margin: '0 auto', 
      padding: '20px' 
    }}>
      <div className="form-header" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: 0, fontSize: '24px' }}>📤 Content Submission Portal</h2>
        <p style={{ margin: '10px 0 0 0', opacity: 0.9 }}>
          Submit new content or update existing translations
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '25px' }}>
        {/* Basic Settings */}
        <div className="form-section" style={{
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#495057' }}>⚙️ Basic Settings</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                Language:
              </label>
              <select
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ced4da',
                  borderRadius: '6px'
                }}
              >
                <option value="en">🇺🇸 English</option>
                <option value="ru">🇷🇺 Russian</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                Section:
              </label>
              <select
                value={formData.section}
                onChange={(e) => handleInputChange('section', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ced4da',
                  borderRadius: '6px'
                }}
              >
                {sections.map(section => (
                  <option key={section.value} value={section.value}>
                    {section.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                Submission Type:
              </label>
              <select
                value={formData.submissionType}
                onChange={(e) => handleInputChange('submissionType', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ced4da',
                  borderRadius: '6px'
                }}
              >
                <option value="single">➕ Single Key-Value</option>
                <option value="bulk">📦 Bulk JSON Data</option>
                <option value="file">📁 File Upload</option>
              </select>
            </div>
          </div>
        </div>

        {/* Single Key-Value Form */}
        {formData.submissionType === 'single' && (
          <div className="form-section" style={{
            padding: '20px',
            background: '#e3f2fd',
            borderRadius: '8px',
            border: '1px solid #2196f3'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#1976d2' }}>➕ Add Single Key-Value Pair</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                  Key Name:
                </label>
                <input
                  type="text"
                  value={formData.key}
                  onChange={(e) => handleInputChange('key', e.target.value)}
                  placeholder="e.g., newButton"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ced4da',
                    borderRadius: '6px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                  Value:
                </label>
                <textarea
                  value={formData.value}
                  onChange={(e) => handleInputChange('value', e.target.value)}
                  placeholder="Enter the content value"
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ced4da',
                    borderRadius: '6px',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Bulk JSON Form */}
        {formData.submissionType === 'bulk' && (
          <div className="form-section" style={{
            padding: '20px',
            background: '#f3e5f5',
            borderRadius: '8px',
            border: '1px solid #9c27b0'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#7b1fa2' }}>📦 Bulk JSON Data</h3>
            <textarea
              value={formData.bulkData}
              onChange={(e) => handleInputChange('bulkData', e.target.value)}
              placeholder={`{\n  "key1": "value1",\n  "key2": "value2",\n  "key3": "value3"\n}`}
              rows={8}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ced4da',
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontSize: '14px'
              }}
            />
          </div>
        )}

        {/* File Upload Form */}
        {formData.submissionType === 'file' && (
          <div className="form-section" style={{
            padding: '20px',
            background: '#e8f5e8',
            borderRadius: '8px',
            border: '1px solid #4caf50'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#388e3c' }}>📁 File Upload</h3>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ced4da',
                borderRadius: '6px',
                background: 'white'
              }}
            />
            <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#666' }}>
              Upload a JSON file with section structure (e.g., exported from Content Editor)
            </p>
          </div>
        )}

        {/* Preview */}
        {previewData && (
          <div className="preview-section" style={{
            padding: '20px',
            background: '#fff3e0',
            borderRadius: '8px',
            border: '1px solid #ff9800'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#f57c00' }}>👁️ Preview</h3>
            <pre style={{
              background: 'white',
              padding: '15px',
              borderRadius: '6px',
              border: '1px solid #e0e0e0',
              fontSize: '14px',
              overflow: 'auto',
              maxHeight: '300px'
            }}>
              {JSON.stringify(previewData, null, 2)}
            </pre>
          </div>
        )}

        {/* Current Section Data */}
        {Object.keys(currentSectionData).length > 0 && (
          <div className="current-data-section" style={{
            padding: '20px',
            background: '#f5f5f5',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#666' }}>
              📋 Current {formData.language}.{formData.section} ({Object.keys(currentSectionData).length} items)
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '10px',
              maxHeight: '200px',
              overflow: 'auto'
            }}>
              {Object.entries(currentSectionData).map(([key, value]) => (
                <div key={key} style={{
                  padding: '8px',
                  background: 'white',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  <strong>{key}:</strong> {typeof value === 'string' && value.length > 30 
                    ? value.substring(0, 30) + '...' 
                    : value}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              minWidth: '200px'
            }}
          >
            🚀 Submit Content
          </button>
        </div>

        {/* Manual Sync Button */}
        <ContentSubmitButton />

        {/* Status Message */}
        {submitStatus && (
          <div style={{
            padding: '15px',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: '600',
            background: submitStatus.includes('✅') ? '#d4edda' : 
                       submitStatus.includes('❌') ? '#f8d7da' : '#fff3cd',
            color: submitStatus.includes('✅') ? '#155724' : 
                   submitStatus.includes('❌') ? '#721c24' : '#856404',
            border: `1px solid ${submitStatus.includes('✅') ? '#c3e6cb' : 
                                 submitStatus.includes('❌') ? '#f5c6cb' : '#ffeaa7'}`
          }}>
            {submitStatus}
          </div>
        )}
      </form>
    </div>
  );
};

export default ContentSubmissionForm;