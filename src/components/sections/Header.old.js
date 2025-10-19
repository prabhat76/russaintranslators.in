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
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      zIndex: 1000,
      position: 'sticky',
      top: 0,
      borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
    }}>
      
      {/* Horizontal Navigation Menu */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        margin: '0 auto',
        padding: '12px 0',
        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.8) 0%, rgba(245, 245, 245, 0.9) 50%, rgba(255, 255, 255, 0.8) 100%)',
        backdropFilter: 'blur(10px)'
      }}>
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '800px',
          gap: isMobile ? '20px' : '30px'
        }}>
          {allSections.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#2C2C2C',
                fontWeight: '400',
                fontFamily: '"Inter", sans-serif',
                fontSize: '15px',
                fontWeight: activeSection === item.id ? '600' : '500',
                cursor: 'pointer',
                position: 'relative',
                textTransform: 'uppercase',
                padding: '0 5px',
                letterSpacing: '0.8px',
                transition: 'all 0.2s ease',
                borderBottom: activeSection === item.id ? '2px solid #2C2C2C' : '2px solid transparent'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Flag Banner - Increased by 100px (900px from 800px) */}
      <div style={{
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0'
      }}>
        <img 
          src="/images/download.webp" 
          alt="Russian and Indian Flags"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block'
          }}
        />
      </div>
      
      {/* Section Markers */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '25px 20px',
        borderBottom: '1px solid #000'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>You are here:</span>
            <span style={{ fontWeight: '600', color: '#000' }}>
              {allSections.find(section => section.id === activeSection)?.label || 'HOME'}
            </span>
          </div>
          <div style={{
            display: 'flex',
            gap: '15px'
          }}>
            <button
              onClick={() => scrollToSection('contact')}
              style={{
                background: '#000',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                borderRadius: '3px'
              }}
            >
              Get A Quote
            </button>
          </div>
        </div>
      </div>
      
      {/* About Section */}
      {activeSection === 'about' && (
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '30px 20px'
        }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#000',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            About Language Liberty
          </h3>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#000',
            textAlign: 'justify'
          }}>
            Language Liberty is a professional translation and interpretation service specializing in Russian and English languages.
            With years of experience and a deep understanding of both cultures, we provide high-quality translation services for business,
            legal, medical, and personal documents. Our team of expert translators ensures accuracy, cultural sensitivity, and timely delivery
            for all your language needs.
          </p>
        </div>
      )}

      {/* Meet Sabrina Section */}
      {activeSection === 'sabrina' && (
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '30px 20px'
        }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#000',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Meet Sabrina
          </h3>

          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '30px',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: isMobile ? '100%' : '300px',
              flexShrink: 0
            }}>
              <img 
                src="/images/sabrina-profile.jpeg"
                alt="Sabrina - Russian Translator"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '5px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                }}
              />
            </div>

            <div style={{
              flex: 1
            }}>
              <h4 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#000',
                marginBottom: '15px',
                marginTop: 0
              }}>
                Sabrina Bhatt
              </h4>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#000',
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                With over 15 years of experience translating between Russian and English, Sabrina brings a unique cultural understanding to every project. Born in Moscow and educated in both Russia and India, she possesses an intimate knowledge of linguistic nuances in both cultures.
              </p>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#000',
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                Sabrina specializes in legal, medical, and technical translations, ensuring precise and culturally-appropriate translations for even the most complex documents. Her background in international relations gives her exceptional insight into diplomatic and business communications.
              </p>

              <div style={{
                marginTop: '20px',
                display: 'flex',
                gap: '15px'
              }}>
                <button 
                  onClick={() => scrollToSection('portfolio')}
                  style={{
                    background: '#000',
                    color: '#fff',
                    padding: '8px 20px',
                    border: 'none',
                    borderRadius: '3px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  View Portfolio
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  style={{
                    background: 'transparent',
                    color: '#000',
                    padding: '8px 20px',
                    border: '1px solid #000',
                    borderRadius: '3px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Contact Sabrina
                </button>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '40px',
            padding: '20px',
            border: '1px solid #000',
            borderRadius: '5px',
            background: '#fafafa'
          }}>
            <h4 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#000',
              marginBottom: '15px',
              marginTop: 0,
              textAlign: 'center'
            }}>
              Credentials & Certifications
            </h4>
            <ul style={{
              paddingLeft: '20px',
              margin: '0',
              columns: isMobile ? '1' : '2',
              columnGap: '30px'
            }}>
              <li style={{
                fontSize: '15px',
                color: '#000',
                marginBottom: '10px'
              }}>Master's Degree in Translation and Interpretation - Moscow State Linguistic University</li>
              <li style={{
                fontSize: '15px',
                color: '#000',
                marginBottom: '10px'
              }}>Certified Member of the American Translators Association (ATA)</li>
              <li style={{
                fontSize: '15px',
                color: '#000',
                marginBottom: '10px'
              }}>Diploma in Technical and Scientific Translation</li>
              <li style={{
                fontSize: '15px',
                color: '#000',
                marginBottom: '10px'
              }}>Certificate in Medical Translation - Institute of Linguistics</li>
              <li style={{
                fontSize: '15px',
                color: '#000',
                marginBottom: '10px'
              }}>Legal Translation Specialization - International Federation of Translators</li>
              <li style={{
                fontSize: '15px',
                color: '#000',
                marginBottom: '10px'
              }}>15+ Years Professional Experience with International Clients</li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
