import React, { useState, useEffect } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { rtdb } from '../firebase';

const ContentEditor = () => {
  const [content, setContent] = useState({});
  const [selectedLang, setSelectedLang] = useState('en');
  const [selectedSection, setSelectedSection] = useState('nav');
  const [saveStatus, setSaveStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(new Set());
  const [newFieldKey, setNewFieldKey] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');
  const [showAddField, setShowAddField] = useState(false);
  const [bulkEditMode, setBulkEditMode] = useState(false);
  const [bulkEditData, setBulkEditData] = useState('');

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
      setSaveStatus('✅ Saved');
      setUnsavedChanges(prev => {
        const newSet = new Set(prev);
        newSet.delete(path);
        return newSet;
      });
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (error) {
      setSaveStatus('❌ Error saving');
      console.error('Update error:', error);
    }
  };

  const handleContentChange = (path, value) => {
    setContent(prev => ({
      ...prev,
      [selectedLang]: {
        ...prev[selectedLang],
        [selectedSection]: {
          ...prev[selectedLang]?.[selectedSection],
          [path]: value
        }
      }
    }));
    setUnsavedChanges(prev => new Set(prev).add(path));
  };

  const saveAllChanges = async () => {
    const promises = Array.from(unsavedChanges).map(path => 
      updateContent(path, content[selectedLang]?.[selectedSection]?.[path])
    );
    await Promise.all(promises);
  };

  const addNewField = async () => {
    if (!newFieldKey.trim() || !newFieldValue.trim()) {
      setSaveStatus('❌ Key and value required');
      return;
    }
    
    if (currentSection[newFieldKey]) {
      setSaveStatus('❌ Key already exists');
      return;
    }

    try {
      await set(ref(rtdb, `content/${selectedLang}/${selectedSection}/${newFieldKey}`), newFieldValue);
      setSaveStatus('✅ Field added');
      setNewFieldKey('');
      setNewFieldValue('');
      setShowAddField(false);
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (error) {
      setSaveStatus('❌ Error adding field');
      console.error('Add field error:', error);
    }
  };

  const deleteField = async (fieldKey) => {
    if (!window.confirm(`Delete field "${fieldKey}"?`)) return;
    
    try {
      await set(ref(rtdb, `content/${selectedLang}/${selectedSection}/${fieldKey}`), null);
      setSaveStatus('✅ Field deleted');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (error) {
      setSaveStatus('❌ Error deleting field');
      console.error('Delete field error:', error);
    }
  };

  const handleBulkEdit = async () => {
    try {
      const bulkData = JSON.parse(bulkEditData);
      const promises = Object.entries(bulkData).map(([key, value]) => 
        set(ref(rtdb, `content/${selectedLang}/${selectedSection}/${key}`), value)
      );
      await Promise.all(promises);
      setSaveStatus('✅ Bulk update completed');
      setBulkEditData('');
      setBulkEditMode(false);
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (error) {
      setSaveStatus('❌ Invalid JSON or update error');
      console.error('Bulk edit error:', error);
    }
  };

  const exportSection = () => {
    const dataStr = JSON.stringify(currentSection, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedLang}-${selectedSection}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const currentSection = content[selectedLang]?.[selectedSection] || {};
  const filteredFields = Object.entries(currentSection).filter(([key]) => 
    key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sections = [
    { value: 'nav', label: '🧭 Navigation', icon: '🧭' },
    { value: 'hero', label: '🎯 Hero Section', icon: '🎯' },
    { value: 'about', label: '👤 About Section', icon: '👤' },
    { value: 'services', label: '⚙️ Services', icon: '⚙️' },
    { value: 'contact', label: '📞 Contact', icon: '📞' },
    { value: 'appointments', label: '📅 Appointments', icon: '📅' },
    { value: 'gallery', label: '🖼️ Gallery', icon: '🖼️' }
  ];

  return (
    <div className="content-editor" style={{ padding: '20px', maxWidth: '1200px' }}>
      <div className="editor-header" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        color: 'white'
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '24px' }}>📝 Content Management System</h2>
          <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>Edit website content in real-time</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {saveStatus && <span style={{ fontSize: '14px' }}>{saveStatus}</span>}
          <button 
            onClick={() => setShowAddField(!showAddField)}
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            ➕ Add Field
          </button>
          <button 
            onClick={() => setBulkEditMode(!bulkEditMode)}
            style={{
              background: '#6f42c1',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            📝 Bulk Edit
          </button>
          <button 
            onClick={exportSection}
            style={{
              background: '#17a2b8',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            📥 Export
          </button>
          {unsavedChanges.size > 0 && (
            <button 
              onClick={saveAllChanges}
              style={{
                background: '#28a745',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              💾 Save All ({unsavedChanges.size})
            </button>
          )}
        </div>
      </div>
      
      <div className="editor-controls" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr 1fr auto',
        gap: '15px',
        marginBottom: '25px',
        padding: '20px',
        background: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Language:</label>
          <select 
            value={selectedLang} 
            onChange={(e) => setSelectedLang(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ced4da',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          >
            <option value="en">🇺🇸 English</option>
            <option value="ru">🇷🇺 Russian</option>
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Section:</label>
          <select 
            value={selectedSection} 
            onChange={(e) => setSelectedSection(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ced4da',
              borderRadius: '6px',
              fontSize: '14px'
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
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Search Fields:</label>
          <input
            type="text"
            placeholder="🔍 Search content fields..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ced4da',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'end' }}>
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            style={{
              padding: '8px 16px',
              background: isPreviewMode ? '#28a745' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {isPreviewMode ? '📝 Edit' : '👁️ Preview'}
          </button>
        </div>
      </div>

      <div className="content-stats" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '25px'
      }}>
        <div style={{
          padding: '15px',
          background: '#e3f2fd',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>
            {Object.keys(currentSection).length}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>Total Fields</div>
        </div>
        <div style={{
          padding: '15px',
          background: '#fff3e0',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f57c00' }}>
            {unsavedChanges.size}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>Unsaved Changes</div>
        </div>
        <div style={{
          padding: '15px',
          background: '#e8f5e8',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#388e3c' }}>
            {filteredFields.length}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>Filtered Results</div>
        </div>
      </div>

      {showAddField && (
        <div className="add-field-form" style={{
          padding: '20px',
          background: '#e3f2fd',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #2196f3'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#1976d2' }}>➕ Add New Field</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '10px', alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Field Key:</label>
              <input
                type="text"
                value={newFieldKey}
                onChange={(e) => setNewFieldKey(e.target.value)}
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
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Field Value:</label>
              <input
                type="text"
                value={newFieldValue}
                onChange={(e) => setNewFieldValue(e.target.value)}
                placeholder="Enter the content value"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ced4da',
                  borderRadius: '6px'
                }}
              />
            </div>
            <button
              onClick={addNewField}
              style={{
                background: '#28a745',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              ✅ Add
            </button>
          </div>
        </div>
      )}

      {bulkEditMode && (
        <div className="bulk-edit-form" style={{
          padding: '20px',
          background: '#f3e5f5',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #9c27b0'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#7b1fa2' }}>📝 Bulk Edit (JSON Format)</h3>
          <textarea
            value={bulkEditData}
            onChange={(e) => setBulkEditData(e.target.value)}
            placeholder={`{\n  "key1": "value1",\n  "key2": "value2"\n}`}
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
          <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
            <button
              onClick={handleBulkEdit}
              style={{
                background: '#28a745',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              ✅ Apply Changes
            </button>
            <button
              onClick={() => setBulkEditData(JSON.stringify(currentSection, null, 2))}
              style={{
                background: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              📋 Load Current
            </button>
          </div>
        </div>
      )}

      <div className="content-fields" style={{
        display: 'grid',
        gap: '20px'
      }}>
        {filteredFields.length > 0 ? filteredFields.map(([key, value]) => (
          <div key={key} className="field-group" style={{
            padding: '20px',
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <label style={{ 
                fontWeight: '600', 
                color: '#495057',
                fontSize: '16px'
              }}>
                {key}
                {unsavedChanges.has(key) && <span style={{ color: '#ffc107', marginLeft: '5px' }}>●</span>}
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '12px', color: '#6c757d' }}>
                  {value?.length || 0} characters
                </span>
                <button
                  onClick={() => deleteField(key)}
                  style={{
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                  title="Delete field"
                >
                  🗑️
                </button>
              </div>
            </div>
            {isPreviewMode ? (
              <div style={{
                padding: '12px',
                background: '#f8f9fa',
                borderRadius: '6px',
                border: '1px solid #e9ecef',
                minHeight: '60px',
                whiteSpace: 'pre-wrap'
              }}>
                {value || 'No content'}
              </div>
            ) : (
              <textarea
                value={value || ''}
                onChange={(e) => handleContentChange(key, e.target.value)}
                onBlur={() => {
                  if (unsavedChanges.has(key)) {
                    updateContent(key, content[selectedLang]?.[selectedSection]?.[key]);
                  }
                }}
                rows={Math.max(3, Math.ceil((value?.length || 0) / 80))}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: unsavedChanges.has(key) ? '2px solid #ffc107' : '1px solid #ced4da',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  minHeight: '60px'
                }}
                placeholder={`Enter ${key} content...`}
              />
            )}
          </div>
        )) : (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#6c757d',
            background: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🔍</div>
            <h3>No fields found</h3>
            <p>Try adjusting your search term or select a different section.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentEditor;