import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Header = ({ currentLanguage, setCurrentLanguage, isMobile, isTablet }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state
      setIsScrolled(currentScrollY > 50);
      
      // Auto-hide logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header after a small delay
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setIsVisible(false);
        }, 150);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header immediately
        clearTimeout(scrollTimeout);
        setIsVisible(true);
      }
      
      // Always show header at top of page
      if (currentScrollY <= 50) {
        clearTimeout(scrollTimeout);
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e) => {
      // Show header when mouse is near the top of the screen
      if (e.clientY <= 50) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(scrollTimeout);
    };
  }, [lastScrollY]);

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
        ? theme.glassStrong
        : theme.glass,
      backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${isScrolled ? theme.border : 'rgba(255, 255, 255, 0.1)'}`,
      transform: (isVisible || isMenuOpen) ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'all 0.3s ease-in-out',
      boxShadow: isScrolled ? theme.shadow : 'none'
    }}>
      <div style={{
        maxWidth: '1200px', // Reduced from broader width
        margin: '0 auto',
        padding: isMobile ? '0.5rem 1rem' : '0.5rem 2rem', // Reduced padding to make header thinner
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: isMobile ? '60px' : '70px' // Fixed thinner height
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer'
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div style={{
            width: '32px', // Smaller for thinner header
            height: '32px',
            background: theme.gradient,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '8px',
            boxShadow: `0 4px 12px ${theme.primary}30`,
            transition: 'all 0.3s ease'
          }}>
            <span style={{ fontSize: '16px' }}>🇷🇺</span>
          </div>
          <div>
            <h1 style={{
              fontSize: isMobile ? '1rem' : '1.2rem', // Smaller for thinner header
              fontWeight: '800',
              color: theme.text,
              margin: 0,
              lineHeight: '1.1',
              transition: 'color 0.3s ease'
            }}>
              {currentLanguage === 'en' ? 'Russian Translator' : 'Русский переводчик'}
            </h1>
            <p style={{
              fontSize: '0.65rem', // Smaller for thinner header
              color: theme.textSecondary,
              margin: 0,
              fontWeight: '500',
              transition: 'color 0.3s ease'
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
            gap: '1.5rem' // Slightly reduced gap
          }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: theme.textSecondary,
                  fontSize: '0.9rem', // Smaller for thinner header
                  fontWeight: '500',
                  cursor: 'pointer',
                  padding: '0.4rem 0', // Reduced padding
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme.textSecondary;
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
          gap: '0.75rem' // Reduced gap
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
              background: theme.glass,
              border: `2px solid ${theme.border}`,
              borderRadius: '20px', // Smaller for thinner header
              padding: '2px', // Reduced padding
              backdropFilter: 'blur(10px)',
              boxShadow: theme.shadow,
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}>
              {/* Sliding Background */}
              <div style={{
                position: 'absolute',
                top: '2px',
                left: currentLanguage === 'en' ? '2px' : '50%',
                width: 'calc(50% - 2px)',
                height: 'calc(100% - 4px)',
                background: theme.gradient,
                borderRadius: '18px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: `0 2px 8px ${theme.primary}40`,
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
                    gap: '3px', // Smaller gap for thinner header
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '18px',
                    padding: '4px 10px', // Smaller padding
                    fontSize: '0.75rem', // Smaller font
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    color: currentLanguage === 'en' ? 'white' : theme.textMuted,
                    minWidth: '45px'
                  }}
                  onMouseEnter={(e) => {
                    if (currentLanguage !== 'en') {
                      e.currentTarget.style.color = theme.primary;
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentLanguage !== 'en') {
                      e.currentTarget.style.color = theme.textMuted;
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  <span style={{ 
                    fontSize: '0.9rem', // Smaller flag for thinner header
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
                    gap: '3px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '18px',
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    color: currentLanguage === 'ru' ? 'white' : theme.textMuted,
                    minWidth: '45px'
                  }}
                  onMouseEnter={(e) => {
                    if (currentLanguage !== 'ru') {
                      e.currentTarget.style.color = theme.primary;
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentLanguage !== 'ru') {
                      e.currentTarget.style.color = theme.textMuted;
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  <span style={{ 
                    fontSize: '0.9rem', // Smaller flag for thinner header
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
                background: theme.mode === 'dark' ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                color: theme.text,
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.7rem',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                opacity: 0,
                pointerEvents: 'none',
                transition: 'opacity 0.3s ease',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.border}`,
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
                  borderBottom: `4px solid ${theme.mode === 'dark' ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)'}`
                }}></div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: '6px',
                padding: '0.3rem', // Smaller padding for thinner header
                color: theme.text,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = theme.surfaceHover;
                e.currentTarget.style.borderColor = theme.borderHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = theme.surface;
                e.currentTarget.style.borderColor = theme.border;
              }}
            >
              <div style={{
                width: '18px', // Smaller for thinner header
                height: '18px',
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
          background: theme.glassStrong,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.border}`,
          borderTop: 'none',
          borderRadius: '0 0 16px 16px',
          padding: '1rem',
          boxShadow: theme.shadow
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
                  color: theme.textSecondary,
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  padding: '1rem',
                  textAlign: 'left',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = theme.surfaceHover;
                  e.currentTarget.style.color = theme.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                  e.currentTarget.style.color = theme.textSecondary;
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
