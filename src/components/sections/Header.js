import React, { useState, useEffect } from 'react';

const Header = ({ currentLanguage, setCurrentLanguage, isMobile, isTablet }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load saved language preference on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru')) {
      setCurrentLanguage(savedLanguage);
    }
  }, [setCurrentLanguage]);

  const navItems = [
    { 
      id: 'services', 
      label: currentLanguage === 'en' ? 'Services' : 'Услуги' 
    },
    { 
      id: 'gallery', 
      label: currentLanguage === 'en' ? 'Gallery' : 'Галерея' 
    },
    { 
      id: 'testimonials', 
      label: currentLanguage === 'en' ? 'Testimonials' : 'Отзывы' 
    },
    { 
      id: 'contact', 
      label: currentLanguage === 'en' ? 'Contact' : 'Контакты' 
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: isScrolled 
        ? 'rgba(255, 255, 255, 0.95)' 
        : 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderBottom: isScrolled 
        ? '1px solid rgba(226, 232, 240, 0.8)' 
        : '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
      boxShadow: isScrolled 
        ? '0 4px 20px rgba(0, 0, 0, 0.1)' 
        : 'none'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: isMobile ? '1rem' : '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer'
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
          }}>
            <span style={{ fontSize: '20px' }}>🇷🇺</span>
          </div>
          <div>
            <h1 style={{
              fontSize: isMobile ? '1.2rem' : '1.5rem',
              fontWeight: '800',
              color: isScrolled ? '#1e293b' : 'white',
              margin: 0,
              lineHeight: '1.2'
            }}>
              {currentLanguage === 'en' ? 'Russian Translator' : 'Русский переводчик'}
            </h1>
            <p style={{
              fontSize: '0.75rem',
              color: isScrolled ? '#64748b' : 'rgba(255, 255, 255, 0.8)',
              margin: 0,
              fontWeight: '500'
            }}>
              {currentLanguage === 'en' ? 'Professional Services' : 'Профессиональные услуги'}
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem'
          }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isScrolled ? '#475569' : 'rgba(255, 255, 255, 0.9)',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  padding: '0.5rem 0',
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isScrolled ? '#3b82f6' : 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isScrolled ? '#475569' : 'rgba(255, 255, 255, 0.9)';
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}

        {/* Language Toggle & Mobile Menu */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {/* Enhanced Language Toggle */}
          <div 
            className="language-toggle-container"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
            <div style={{
              position: 'relative',
              background: isScrolled 
                ? 'rgba(255, 255, 255, 0.9)' 
                : 'rgba(255, 255, 255, 0.15)',
              border: `2px solid ${isScrolled ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.3)'}`,
              borderRadius: '30px',
              padding: '4px',
              backdropFilter: 'blur(10px)',
              boxShadow: isScrolled 
                ? '0 4px 12px rgba(59, 130, 246, 0.1)' 
                : '0 4px 12px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}>
              {/* Sliding Background */}
              <div style={{
                position: 'absolute',
                top: '4px',
                left: currentLanguage === 'en' ? '4px' : '50%',
                width: 'calc(50% - 4px)',
                height: 'calc(100% - 8px)',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                borderRadius: '24px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)',
                zIndex: 1
              }}></div>

              {/* Language Options */}
              <div style={{
                display: 'flex',
                position: 'relative',
                zIndex: 2
              }}>
                {/* English Option */}
                <button
                  onClick={() => {
                    setCurrentLanguage('en');
                    localStorage.setItem('preferredLanguage', 'en');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '24px',
                    padding: '8px 16px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    color: currentLanguage === 'en' 
                      ? 'white' 
                      : (isScrolled ? '#64748b' : 'rgba(255, 255, 255, 0.8)'),
                    minWidth: '60px'
                  }}
                  onMouseEnter={(e) => {
                    if (currentLanguage !== 'en') {
                      e.currentTarget.style.color = isScrolled ? '#3b82f6' : 'white';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentLanguage !== 'en') {
                      e.currentTarget.style.color = isScrolled ? '#64748b' : 'rgba(255, 255, 255, 0.8)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  <span style={{ 
                    fontSize: '1.1rem',
                    filter: currentLanguage === 'en' ? 'none' : 'grayscale(50%)',
                    transition: 'filter 0.3s ease'
                  }}>🇺🇸</span>
                  <span>EN</span>
                </button>

                {/* Russian Option */}
                <button
                  onClick={() => {
                    setCurrentLanguage('ru');
                    localStorage.setItem('preferredLanguage', 'ru');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '24px',
                    padding: '8px 16px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    color: currentLanguage === 'ru' 
                      ? 'white' 
                      : (isScrolled ? '#64748b' : 'rgba(255, 255, 255, 0.8)'),
                    minWidth: '60px'
                  }}
                  onMouseEnter={(e) => {
                    if (currentLanguage !== 'ru') {
                      e.currentTarget.style.color = isScrolled ? '#3b82f6' : 'white';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentLanguage !== 'ru') {
                      e.currentTarget.style.color = isScrolled ? '#64748b' : 'rgba(255, 255, 255, 0.8)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  <span style={{ 
                    fontSize: '1.1rem',
                    filter: currentLanguage === 'ru' ? 'none' : 'grayscale(50%)',
                    transition: 'filter 0.3s ease'
                  }}>🇷🇺</span>
                  <span>RU</span>
                </button>
              </div>

              {/* Tooltip */}
              <div style={{
                position: 'absolute',
                bottom: '-35px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(30, 41, 59, 0.95)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                opacity: 0,
                pointerEvents: 'none',
                transition: 'opacity 0.3s ease',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 1000
              }}
              className="language-tooltip"
              >
                {currentLanguage === 'en' ? 'Switch to Russian' : 'Переключить на английский'}
                <div style={{
                  position: 'absolute',
                  top: '-4px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '4px solid transparent',
                  borderRight: '4px solid transparent',
                  borderBottom: '4px solid rgba(30, 41, 59, 0.95)'
                }}></div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: isScrolled 
                  ? 'rgba(59, 130, 246, 0.1)' 
                  : 'rgba(255, 255, 255, 0.2)',
                border: `1px solid ${isScrolled ? '#3b82f6' : 'rgba(255, 255, 255, 0.3)'}`,
                borderRadius: '8px',
                padding: '0.5rem',
                color: isScrolled ? '#3b82f6' : 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around'
              }}>
                <span style={{
                  display: 'block',
                  height: '2px',
                  background: 'currentColor',
                  borderRadius: '1px',
                  transition: 'all 0.3s ease',
                  transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
                }}></span>
                <span style={{
                  display: 'block',
                  height: '2px',
                  background: 'currentColor',
                  borderRadius: '1px',
                  transition: 'all 0.3s ease',
                  opacity: isMenuOpen ? 0 : 1
                }}></span>
                <span style={{
                  display: 'block',
                  height: '2px',
                  background: 'currentColor',
                  borderRadius: '1px',
                  transition: 'all 0.3s ease',
                  transform: isMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
                }}></span>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          borderTop: 'none',
          borderRadius: '0 0 16px 16px',
          padding: '1rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#475569',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  padding: '1rem',
                  textAlign: 'left',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                  e.currentTarget.style.color = '#3b82f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                  e.currentTarget.style.color = '#475569';
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Language Toggle Hover Effect CSS */}
      <style>{`
        .language-toggle-container:hover .language-tooltip {
          opacity: 1 !important;
        }
        
        @media (max-width: 768px) {
          .language-tooltip {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
