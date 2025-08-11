import React, { useState, useEffect } from 'react';

const SimpleContentEditor = () => {
  const [contentSections, setContentSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Simulate loading content data
    setTimeout(() => {
      setContentSections([
        {
          id: 'hero',
          title: 'Hero Section',
          type: 'hero',
          content: {
            title: 'Professional Russian Translation Services',
            subtitle: 'Expert translations for documents, websites, and business communications',
            ctaText: 'Get Free Quote'
          }
        },
        {
          id: 'services',
          title: 'Services Section',
          type: 'services',
          content: {
            title: 'Our Translation Services',
            description: 'We provide comprehensive Russian translation services for various industries and document types.',
            services: [
              {
                name: 'Document Translation',
                description: 'Legal, medical, and technical document translation'
              },
              {
                name: 'Website Localization',
                description: 'Complete website translation and cultural adaptation'
              },
              {
                name: 'Business Translation',
                description: 'Marketing materials and business communications'
              }
            ]
          }
        },
        {
          id: 'about',
          title: 'About Section',
          type: 'about',
          content: {
            title: 'About Our Translation Team',
            description: 'Our team of certified translators brings years of experience in Russian-English translation across various industries.',
            features: [
              'Native Russian speakers',
              'Certified professionals',
              'Industry expertise',
              'Quality guarantee'
            ]
          }
        },
        {
          id: 'contact',
          title: 'Contact Section',
          type: 'contact',
          content: {
            title: 'Get In Touch',
            description: 'Contact us for professional Russian translation services',
            email: 'contact@russiantranslator.com',
            phone: '+1 (555) 123-4567'
          }
        }
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update the section in the list
    setContentSections(sections =>
      sections.map(s => s.id === selectedSection.id ? selectedSection : s)
    );
    
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original content
    const originalSection = contentSections.find(s => s.id === selectedSection.id);
    setSelectedSection(originalSection);
    setIsEditing(false);
  };

  const updateContent = (field, value) => {
    setSelectedSection(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value
      }
    }));
  };

  const updateArrayItem = (arrayField, index, field, value) => {
    setSelectedSection(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [arrayField]: prev.content[arrayField].map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const addArrayItem = (arrayField, newItem) => {
    setSelectedSection(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [arrayField]: [...prev.content[arrayField], newItem]
      }
    }));
  };

  const removeArrayItem = (arrayField, index) => {
    setSelectedSection(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [arrayField]: prev.content[arrayField].filter((_, i) => i !== index)
      }
    }));
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px',
        fontSize: '1.1rem',
        color: '#64748b'
      }}>
        Loading content...
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#1e293b',
          margin: 0
        }}>
          Content Editor
        </h2>
        
        {selectedSection && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = '#2563eb'}
                onMouseLeave={(e) => e.target.style.background = '#3b82f6'}
              >
                Edit Section
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'transparent',
                    color: '#64748b',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f8fafc';
                    e.target.style.borderColor = '#9ca3af';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.borderColor = '#d1d5db';
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  style={{
                    padding: '0.5rem 1rem',
                    background: isSaving ? '#9ca3af' : '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: isSaving ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSaving) e.target.style.background = '#059669';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSaving) e.target.style.background = '#10b981';
                  }}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '2rem',
        height: 'calc(100vh - 200px)'
      }}>
        {/* Section List */}
        <div style={{
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '1rem',
          overflowY: 'auto'
        }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '1rem'
          }}>
            Content Sections
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {contentSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionSelect(section)}
                style={{
                  padding: '0.75rem',
                  background: selectedSection?.id === section.id ? '#eff6ff' : 'transparent',
                  color: selectedSection?.id === section.id ? '#1d4ed8' : '#374151',
                  border: selectedSection?.id === section.id ? '1px solid #bfdbfe' : '1px solid transparent',
                  borderRadius: '8px',
                  textAlign: 'left',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (selectedSection?.id !== section.id) {
                    e.target.style.background = '#f8fafc';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedSection?.id !== section.id) {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content Editor */}
        <div style={{
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '1.5rem',
          overflowY: 'auto'
        }}>
          {!selectedSection ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#64748b',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                Select a Section to Edit
              </h3>
              <p>Choose a content section from the left panel to start editing.</p>
            </div>
          ) : (
            <div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '1.5rem'
              }}>
                Editing: {selectedSection.title}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Basic fields */}
                {selectedSection.content.title && (
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Title
                    </label>
                    <input
                      type="text"
                      value={selectedSection.content.title}
                      onChange={(e) => updateContent('title', e.target.value)}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        background: isEditing ? 'white' : '#f9fafb',
                        color: '#374151'
                      }}
                    />
                  </div>
                )}

                {selectedSection.content.subtitle && (
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={selectedSection.content.subtitle}
                      onChange={(e) => updateContent('subtitle', e.target.value)}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        background: isEditing ? 'white' : '#f9fafb',
                        color: '#374151'
                      }}
                    />
                  </div>
                )}

                {selectedSection.content.description && (
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Description
                    </label>
                    <textarea
                      value={selectedSection.content.description}
                      onChange={(e) => updateContent('description', e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        background: isEditing ? 'white' : '#f9fafb',
                        color: '#374151',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                )}

                {/* Services array */}
                {selectedSection.content.services && (
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Services
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {selectedSection.content.services.map((service, index) => (
                        <div key={index} style={{
                          padding: '1rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          background: '#f9fafb'
                        }}>
                          <input
                            type="text"
                            value={service.name}
                            onChange={(e) => updateArrayItem('services', index, 'name', e.target.value)}
                            disabled={!isEditing}
                            placeholder="Service name"
                            style={{
                              width: '100%',
                              padding: '0.5rem',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              fontSize: '0.875rem',
                              marginBottom: '0.5rem',
                              background: isEditing ? 'white' : '#f3f4f6'
                            }}
                          />
                          <textarea
                            value={service.description}
                            onChange={(e) => updateArrayItem('services', index, 'description', e.target.value)}
                            disabled={!isEditing}
                            placeholder="Service description"
                            rows={2}
                            style={{
                              width: '100%',
                              padding: '0.5rem',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              fontSize: '0.875rem',
                              background: isEditing ? 'white' : '#f3f4f6',
                              resize: 'vertical'
                            }}
                          />
                          {isEditing && (
                            <button
                              onClick={() => removeArrayItem('services', index)}
                              style={{
                                marginTop: '0.5rem',
                                padding: '0.25rem 0.5rem',
                                background: '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                cursor: 'pointer'
                              }}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      {isEditing && (
                        <button
                          onClick={() => addArrayItem('services', { name: '', description: '' })}
                          style={{
                            padding: '0.75rem',
                            background: '#e5e7eb',
                            color: '#374151',
                            border: '1px dashed #9ca3af',
                            borderRadius: '8px',
                            fontSize: '0.875rem',
                            cursor: 'pointer'
                          }}
                        >
                          + Add Service
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Contact fields */}
                {selectedSection.content.email && (
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={selectedSection.content.email}
                      onChange={(e) => updateContent('email', e.target.value)}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        background: isEditing ? 'white' : '#f9fafb',
                        color: '#374151'
                      }}
                    />
                  </div>
                )}

                {selectedSection.content.phone && (
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={selectedSection.content.phone}
                      onChange={(e) => updateContent('phone', e.target.value)}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        background: isEditing ? 'white' : '#f9fafb',
                        color: '#374151'
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleContentEditor;
