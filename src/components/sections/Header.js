import React, { useEffect, useState } from 'react';

const Header = ({ currentLanguage, setCurrentLanguage, isMobile }) => {
  // Load saved language preference on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru')) {
      setCurrentLanguage(savedLanguage);
    }
  }, [setCurrentLanguage]);
  
  // State to track active section for navigation
  const [activeSection, setActiveSection] = useState('home');

  const allSections = [
    { 
      id: 'home', 
      label: currentLanguage === 'en' ? 'HOME' : 'ГЛАВНАЯ' 
    },
    { 
      id: 'about', 
      label: currentLanguage === 'en' ? 'ABOUT' : 'О НАС' 
    },
    {
      id: 'sabrina',
      label: currentLanguage === 'en' ? 'MEET SABRINA' : 'ПОЗНАКОМЬТЕСЬ С САБРИНОЙ'
    },
    { 
      id: 'services', 
      label: currentLanguage === 'en' ? 'SERVICES' : 'УСЛУГИ' 
    },
    { 
      id: 'portfolio', 
      label: currentLanguage === 'en' ? 'PORTFOLIO' : 'ПОРТФОЛИО' 
    },
    { 
      id: 'contact', 
      label: currentLanguage === 'en' ? 'CONTACT US' : 'СВЯЗАТЬСЯ С НАМИ' 
    }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={{
      width: '100%',
      background: 'rgba(248, 250, 252, 0.98)',
      backdropFilter: 'blur(25px) saturate(180%)',
      WebkitBackdropFilter: 'blur(25px) saturate(180%)',
      zIndex: 1000,
      position: 'sticky',
      top: 0,
      borderBottom: '1px solid rgba(71, 85, 105, 0.08)',
      boxShadow: 'var(--shadow-lg)',
      transition: 'all 0.3s ease'
    }}>
      {/* Header Content */}
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem 2rem',
        position: 'relative'
      }}>
        {/* Brand Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1
        }}>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: '700',
            color: 'var(--primary-color, #1e293b)',
            margin: 0,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-heading, Inter, sans-serif)'
          }}>
            Language Liberty
          </h1>
          <p style={{
            fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
            fontWeight: '400',
            color: 'var(--text-secondary, #475569)',
            margin: '0.25rem 0 0 0',
            letterSpacing: '0.02em'
          }}>
            Professional Russian Translation Services
          </p>
        </div>
        
        {/* Contact Actions */}
        <div style={{
          position: 'absolute',
          right: '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <a 
            href="tel:+918789389223"
            style={{
              background: 'none',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer',
              color: 'var(--text-secondary, #475569)',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--primary-accent, #3b82f6)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary, #475569)'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
            </svg>
          </a>
          <a 
            href="mailto:sabrina@languageliberty.com"
            style={{
              background: 'none',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer',
              color: 'var(--text-secondary, #475569)',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--primary-accent, #3b82f6)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary, #475569)'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
            </svg>
          </a>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav style={{
        borderTop: '1px solid rgba(148, 163, 184, 0.1)',
        background: 'rgba(248, 250, 252, 0.8)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.75rem 2rem',
          gap: isMobile ? '1.5rem' : '2.5rem'
        }}>
          {allSections.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: activeSection === item.id ? 'var(--primary-color, #1e293b)' : 'var(--text-secondary, #475569)',
                fontSize: '0.875rem',
                fontWeight: activeSection === item.id ? '600' : '500',
                cursor: 'pointer',
                position: 'relative',
                textTransform: 'uppercase',
                padding: '0.5rem 0',
                letterSpacing: '0.05em',
                transition: 'all 0.2s ease',
                borderBottom: activeSection === item.id ? '2px solid var(--primary-accent, #3b82f6)' : '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (activeSection !== item.id) {
                  e.target.style.color = 'var(--primary-color, #1e293b)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== item.id) {
                  e.target.style.color = 'var(--text-secondary, #475569)';
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
      
      {/* Flag Banner */}
      <div style={{
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0'
      }}>
        <img 
          src="/images/download.webp" 
          alt="Russian and Indian Flags - Symbol of Unity and Collaboration"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            filter: 'brightness(1.05) contrast(1.02)'
          }}
          loading="eager"
        />
      </div>
      
      {/* Section Indicator */}
      <div className="bg-secondary" style={{
        borderTop: '1px solid rgba(148, 163, 184, 0.1)',
        background: 'var(--bg-secondary, #f8fafc)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem'
        }}>
          <div style={{
            fontSize: '0.875rem',
            color: 'var(--text-muted, #64748b)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>Current Section:</span>
            <span style={{ 
              fontWeight: '600', 
              color: 'var(--primary-color, #1e293b)',
              textTransform: 'uppercase',
              letterSpacing: '0.025em'
            }}>
              {allSections.find(section => section.id === activeSection)?.label || 'HOME'}
            </span>
          </div>
          <button
            onClick={() => scrollToSection('contact')}
            className="btn btn-primary"
            style={{
              background: 'var(--gradient-primary, linear-gradient(135deg, #1e293b 0%, #334155 100%))',
              color: 'white',
              border: 'none',
              padding: '0.625rem 1.25rem',
              borderRadius: 'var(--radius-md, 12px)',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05))'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = 'var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08))';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05))';
            }}
          >
            Get Free Quote
          </button>
        </div>
      </div>
      
      {/* Dynamic Section Content */}
      {activeSection === 'about' && (
        <section className="bg-primary section" style={{
          background: 'var(--bg-primary, white)',
          padding: 'var(--spacing-xl, 3rem) 0'
        }}>
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">About Language Liberty</h2>
              <p className="section-subtitle">
                Building bridges between Russia and India through expert translation services.
                We specialize in creating trust and understanding across cultures.
              </p>
            </div>
            <div className="grid grid-2" style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: 'var(--spacing-xl, 3rem)',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ marginBottom: 'var(--spacing-md, 1.5rem)' }}>
                  Language Liberty represents the highest standard in Russian-English translation services. 
                  Our mission is to facilitate seamless communication between businesses, organizations, 
                  and individuals across Russia and India.
                </p>
                <p style={{ marginBottom: 'var(--spacing-md, 1.5rem)' }}>
                  With deep cultural understanding and linguistic expertise, we ensure that every 
                  translation preserves not just the words, but the intent, context, and cultural 
                  nuances that make communication truly effective.
                </p>
                <div className="grid grid-3" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 'var(--spacing-lg, 2rem)',
                  marginTop: 'var(--spacing-lg, 2rem)'
                }}>
                  <div className="text-center">
                    <h4 style={{ color: 'var(--primary-accent, #3b82f6)', fontSize: '2rem', marginBottom: '0.5rem' }}>15+</h4>
                    <p style={{ fontSize: '0.875rem', margin: 0 }}>Years Experience</p>
                  </div>
                  <div className="text-center">
                    <h4 style={{ color: 'var(--primary-accent, #3b82f6)', fontSize: '2rem', marginBottom: '0.5rem' }}>1000+</h4>
                    <p style={{ fontSize: '0.875rem', margin: 0 }}>Projects Completed</p>
                  </div>
                  <div className="text-center">
                    <h4 style={{ color: 'var(--primary-accent, #3b82f6)', fontSize: '2rem', marginBottom: '0.5rem' }}>24/7</h4>
                    <p style={{ fontSize: '0.875rem', margin: 0 }}>Support Available</p>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <img 
                  src="/images/download.webp"
                  alt="Professional Translation Services - International Unity"
                  style={{
                    width: '100%',
                    maxWidth: '400px',
                    height: 'auto',
                    borderRadius: 'var(--radius-lg, 20px)',
                    objectFit: 'cover',
                    boxShadow: 'var(--shadow-lg, 0 10px 25px rgba(0, 0, 0, 0.1))'
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'sabrina' && (
        <section className="bg-secondary section" style={{
          background: 'var(--bg-secondary, #f8fafc)',
          padding: 'var(--spacing-xl, 3rem) 0'
        }}>
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Meet Sabrina Bhatt</h2>
              <p className="section-subtitle">
                Your trusted Russian translation expert with over 15 years of experience 
                bridging cultures and facilitating communication.
              </p>
            </div>
            <div className="grid grid-2" style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '350px 1fr',
              gap: 'var(--spacing-xl, 3rem)',
              alignItems: 'start'
            }}>
              <div style={{ textAlign: 'center' }}>
                <img 
                  src="/images/sabrina-profile.jpeg"
                  alt="Sabrina Bhatt - Professional Russian Translator"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 'var(--radius-lg, 20px)',
                    boxShadow: 'var(--shadow-lg, 0 10px 25px rgba(0, 0, 0, 0.1))'
                  }}
                />
              </div>
              <div>
                <h3 style={{ 
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'var(--primary-color, #1e293b)',
                  marginBottom: 'var(--spacing-md, 1.5rem)'
                }}>
                  Expert Translator & Cultural Bridge
                </h3>
                <p style={{ marginBottom: 'var(--spacing-md, 1.5rem)' }}>
                  With over 15 years of experience translating between Russian and English, 
                  Sabrina brings unparalleled expertise to every project. Her unique background, 
                  having lived and worked in both Russia and India, provides her with deep 
                  cultural understanding that goes beyond mere language translation.
                </p>
                <p style={{ marginBottom: 'var(--spacing-lg, 2rem)' }}>
                  Sabrina specializes in legal, medical, technical, and business translations, 
                  ensuring that complex documents maintain their precision and cultural context 
                  across languages. Her commitment to excellence has earned the trust of 
                  international clients and organizations.
                </p>
                
                <div className="card" style={{
                  background: 'var(--bg-primary, white)',
                  borderRadius: 'var(--radius-md, 12px)',
                  padding: 'var(--spacing-lg, 2rem)',
                  boxShadow: 'var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08))'
                }}>
                  <h4 style={{ 
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: 'var(--primary-color, #1e293b)',
                    marginBottom: 'var(--spacing-md, 1.5rem)',
                    textAlign: 'center'
                  }}>
                    Professional Credentials
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: 'var(--spacing-sm, 1rem)'
                  }}>
                    {[
                      "Master's in Translation & Interpretation - Moscow State Linguistic University",
                      "Certified Member - American Translators Association (ATA)",
                      "Technical & Scientific Translation Diploma",
                      "Medical Translation Certificate - Institute of Linguistics",
                      "Legal Translation Specialization - International Federation of Translators",
                      "15+ Years Professional Experience with International Clients"
                    ].map((credential, index) => (
                      <li key={index} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 'var(--spacing-sm, 1rem)',
                        fontSize: '0.9rem',
                        lineHeight: '1.5'
                      }}>
                        <span style={{
                          display: 'inline-block',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: 'var(--primary-accent, #3b82f6)',
                          marginTop: '0.5rem',
                          flexShrink: 0
                        }}></span>
                        <span>{credential}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div style={{
                  marginTop: 'var(--spacing-lg, 2rem)',
                  display: 'flex',
                  gap: 'var(--spacing-md, 1.5rem)',
                  flexWrap: 'wrap'
                }}>
                  <button 
                    onClick={() => scrollToSection('portfolio')}
                    className="btn btn-primary"
                    style={{
                      background: 'var(--gradient-primary, linear-gradient(135deg, #1e293b 0%, #334155 100%))',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: 'var(--radius-md, 12px)',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    View Portfolio
                  </button>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="btn btn-secondary"
                    style={{
                      background: 'var(--bg-primary, white)',
                      color: 'var(--primary-color, #1e293b)',
                      border: '1px solid var(--secondary-light, #94a3b8)',
                      padding: '0.75rem 1.5rem',
                      borderRadius: 'var(--radius-md, 12px)',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    Contact Sabrina
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </header>
  );
};

export default Header;