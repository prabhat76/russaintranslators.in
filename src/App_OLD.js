import React, { useState, useEffect, lazy, Suspense } from 'react';
import './App.css';
import Header from './components/sections/Header';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Gallery from './components/sections/Gallery';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';
import Modal from './components/ui/Modal';
import { GALLERY_IMAGES } from './constants/content';

const Chatbot = lazy(() => import('./components/Chatbot'));

// Splash Screen Component
const SplashScreen = ({ onComplete, currentLanguage }) => {
  React.useEffect(() => {
    console.log('SplashScreen mounted');
    const timer = setTimeout(() => {
      console.log('SplashScreen timer complete');
      if (onComplete) {
        onComplete();
      }
    }, 2500); // 2.5 seconds
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      color: '#1e3a8a',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'rgba(30,58,138,0.05)',
        padding: '3rem',
        borderRadius: '20px',
        border: '1px solid rgba(30,58,138,0.1)',
        boxShadow: '0 20px 40px rgba(30,58,138,0.1)',
        animation: 'fadeInScale 0.8s ease-out 0s both'
      }}>
        <img 
          src="/images/download.webp" 
          alt="Language Liberty Logo" 
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '20px',
            marginBottom: '2rem',
            boxShadow: '0 10px 30px rgba(30,58,138,0.2)',
            border: '2px solid rgba(30,58,138,0.1)',
            animation: 'scaleIn 1s ease-out 0s both'
          }}
        />
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '900',
          marginBottom: '1rem',
          color: '#1e3a8a',
          textShadow: 'none',
          animation: 'fadeInUp 1s ease-out 0.3s both'
        }}>
          Language Liberty
        </h1>
        <p style={{
          fontSize: '1.3rem',
          opacity: 0.8,
          marginBottom: '1.5rem',
          color: '#475569',
          animation: 'fadeInUp 1s ease-out 0.6s both'
        }}>
          {currentLanguage === 'ru' 
            ? 'Профессиональные услуги русско-английского перевода'
            : 'Professional Russian-English Translation Services'
          }
        </p>
        <div style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          animation: 'bounceIn 1.2s ease-out 0.9s both'
        }}>
          🇺🇸 ⟷ 🇷🇺
        </div>
        <div style={{
          fontSize: '1rem',
          opacity: 0.7,
          fontStyle: 'italic',
          color: '#64748b',
          animation: 'fadeIn 1s ease-out 1.2s both'
        }}>
          {currentLanguage === 'ru' 
            ? 'Преодолеваем языковые барьеры'
            : 'Breaking Language Barriers'
          }
        </div>
      </div>
    </div>
  );
};


const AppContent = React.memo(() => {
  const [showSplash, setShowSplash] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackData, setFeedbackData] = useState({ rating: 5, message: '', name: '' });
  const [testimonials, setTestimonials] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 992 && window.innerWidth > 768);
  const [showAllImages, setShowAllImages] = useState(false);

  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('ru') ? 'ru' : 'en';
  });

  const handleSplashComplete = useCallback(() => {
    console.log('Splash complete callback triggered');
    setShowSplash(false);
  }, []);
  
  const switchLanguage = useCallback((lang) => {
    analytics.languageSwitch(currentLanguage, lang);
    setCurrentLanguage(lang);
  }, [currentLanguage]);
  
  const { formData, formStatus, isSubmitting, handleInputChange, handleFormSubmit } = useForm({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  }, currentLanguage);
  
  const { content: t, loading: contentLoading } = useContent(currentLanguage);
  
  const closeModal = useCallback(() => setSelectedImage(null), []);
  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  
  const handleFeedbackSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!mockFirebaseOps) {
      try {
        await addDoc(collection(db, 'feedback'), {
          ...feedbackData,
          timestamp: serverTimestamp(),
          language: currentLanguage
        });
      } catch (error) {
        console.warn('Feedback submission error:', error.message);
      }
    } else {
      console.log('Mock feedback submission:', feedbackData);
    }
    
    setFeedbackData({ rating: 5, message: '', name: '' });
    setShowFeedbackForm(false);
  }, [feedbackData, currentLanguage]);
  
  const handleFeedbackChange = useCallback((e) => {
    setFeedbackData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }, []);

  const openModal = useCallback((index) => {
    analytics.galleryView(GALLERY_IMAGES[index].title);
    setCurrentImageIndex(index);
    setSelectedImage(GALLERY_IMAGES[index]);
  }, []);

  const nextImage = useCallback(() => {
    const nextIndex = (currentImageIndex + 1) % GALLERY_IMAGES.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(GALLERY_IMAGES[nextIndex]);
  }, [currentImageIndex]);

  const prevImage = useCallback(() => {
    const prevIndex = (currentImageIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(GALLERY_IMAGES[prevIndex]);
  }, [currentImageIndex]);

  // Responsive resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 992 && window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Track page view
    analytics.pageView('home');
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: 'Russian Translation Services - Language Liberty',
        page_location: window.location.href
      });
    }
    
    // Real-time listeners
    let unsubscribeTestimonials = () => {};
    
    if (!mockFirebaseOps) {
      try {
        // Testimonials listener
        const testimonialsQuery = query(collection(db, 'testimonials'), orderBy('timestamp', 'desc'));
        unsubscribeTestimonials = onSnapshot(testimonialsQuery, (snapshot) => {
          setTestimonials(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        

      } catch (error) {
        console.warn('Firestore setup error:', error.message);
      }
    }
    
    // Mobile gallery auto-scroll with performance optimization
    const checkMobile = () => window.innerWidth <= 768;
    const handleResize = throttle(() => {
      if (!checkMobile()) {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (galleryGrid) {
          galleryGrid.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 250);

    window.addEventListener('resize', handleResize);
    let galleryInterval;
    
    if (checkMobile()) {
      const galleryGrid = document.querySelector('.gallery-grid');
      if (galleryGrid) {
        let scrollPosition = 0;
        const cardWidth = window.innerWidth <= 480 ? 250 : 280;
        const gap = window.innerWidth <= 480 ? 12 : 15;
        
        galleryInterval = setInterval(() => {
          if (!checkMobile()) {
            clearInterval(galleryInterval);
            return;
          }
          scrollPosition += cardWidth + gap;
          if (scrollPosition >= galleryGrid.scrollWidth - galleryGrid.clientWidth) {
            scrollPosition = 0;
          }
          galleryGrid.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        }, 3000);
      }
    }
    
    return () => {
      unsubscribeTestimonials();
      if (galleryInterval) clearInterval(galleryInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (contentLoading) {
    return <div className="loading">Loading content...</div>;
  }

  // Show splash screen first
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} currentLanguage={currentLanguage} />;
  }
  
  // Debug: Log the actual content structure
  console.log('Current content:', t);
  console.log('Contact section:', t?.contact);

  return (
    <div className="App">
      <header style={{
        background: 'white',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        {/* Main Navigation Only */}
        <nav style={{ padding: '1.25rem 0' }}>
          <div style={{ width: '100%', margin: '0 auto', padding: isMobile ? '0 1rem' : '0 3rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center'
            }}>
              {/* Brand */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img 
                  src="/images/download.webp" 
                  alt="Language Liberty Logo" 
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0'
                  }}
                />
                <div>
                  <h3 style={{
                    margin: 0,
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    color: '#1e293b',
                    letterSpacing: '-0.02em'
                  }}>
                    LANGUAGE LIBERTY
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: '0.9rem',
                    color: '#6366f1',
                    fontWeight: '500'
                  }}>
                    Professional Russian Translation Services
                  </p>
                </div>
              </div>
              
              {/* Navigation Links & Controls */}
              <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem'
              }}>
                <a href="#home" onClick={closeMenu} style={{
                  color: '#475569',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '1rem',
                  transition: 'color 0.3s'
                }}>
                  {t.nav?.home || 'Home'}
                </a>
                <a href="#about" onClick={closeMenu} style={{
                  color: '#475569',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '1rem',
                  transition: 'color 0.3s'
                }}>
                  {currentLanguage === 'ru' ? 'О Сабрине' : 'Meet Sabrina'}
                </a>
                <a href="#services" onClick={closeMenu} style={{
                  color: '#475569',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '1rem',
                  transition: 'color 0.3s'
                }}>
                  {t.nav?.services || 'Services'}
                </a>
                <a href="#contact" onClick={closeMenu} style={{
                  color: '#475569',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '1rem',
                  transition: 'color 0.3s'
                }}>
                  {t.nav?.contact || 'Contact'}
                </a>
                
                {/* Language Toggle - Optimal Position */}
                <div style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  borderRadius: '25px',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '1rem'
                }}>
                  <input 
                    type="checkbox" 
                    id="langToggle" 
                    checked={currentLanguage === 'ru'} 
                    onChange={(e) => switchLanguage(e.target.checked ? 'ru' : 'en')}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="langToggle" style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    cursor: 'pointer',
                    gap: '0.25rem'
                  }}>
                    <span style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      background: currentLanguage === 'en' ? 'white' : 'transparent',
                      color: currentLanguage === 'en' ? '#6366f1' : 'white',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      transition: 'all 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      🇺🇸 EN
                    </span>
                    <span style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      background: currentLanguage === 'ru' ? 'white' : 'transparent',
                      color: currentLanguage === 'ru' ? '#6366f1' : 'white',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      transition: 'all 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      🇷🇺 RU
                    </span>
                  </label>
                </div>
                
                {/* CTA Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem', marginLeft: '1rem' }}>
                  <a 
                    href="https://wa.me/918789389223" 
                    onClick={() => { analytics.contactAttempt('whatsapp'); closeMenu(); }}
                    style={{
                      background: '#10b981',
                      color: 'white',
                      padding: '0.75rem 1.25rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s'
                    }}
                  >
                    💬 WhatsApp
                  </a>
                  <a 
                    href="tel:+918789389223" 
                    onClick={() => { analytics.contactAttempt('phone'); closeMenu(); }}
                    style={{
                      background: '#6366f1',
                      color: 'white',
                      padding: '0.75rem 1.25rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s'
                    }}
                  >
                    📞 Call Now
                  </a>
                </div>
              </div>
              
              {/* Mobile Menu Toggle */}
              <button 
                className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
                style={{
                  display: 'none',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem'
                }}
              >
                <span style={{
                  display: 'block',
                  width: '25px',
                  height: '3px',
                  background: '#1e293b',
                  margin: '5px 0',
                  transition: '0.3s'
                }}></span>
                <span style={{
                  display: 'block',
                  width: '25px',
                  height: '3px',
                  background: '#1e293b',
                  margin: '5px 0',
                  transition: '0.3s'
                }}></span>
                <span style={{
                  display: 'block',
                  width: '25px',
                  height: '3px',
                  background: '#1e293b',
                  margin: '5px 0',
                  transition: '0.3s'
                }}></span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Meet Sabrina Section - Moved to Top */}
      <section id="about" style={{ 
        padding: isMobile ? '3rem 1rem' : isTablet ? '4rem 2rem' : '6rem 3rem', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decorative pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          pointerEvents: 'none',
          zIndex: 1
        }}></div>
        
        <div style={{ width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '0.8fr 1.2fr', 
            gap: isMobile ? '3rem' : isTablet ? '4rem' : '6rem', 
            alignItems: 'center'
          }}>
            {/* Left Content */}
            <div style={{
              paddingLeft: '20px',
              paddingRight: '10px'
            }}>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{
                  fontSize: '0.9rem',
                  color: '#6366f1',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  ABOUT YOUR TRANSLATOR
                </span>
              </div>
              
              <h1 style={{
                fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
                fontWeight: '800',
                color: '#1e293b',
                marginBottom: '1.5rem',
                lineHeight: '1.1'
              }}>
                MEET SABRINA
              </h1>
              
              <h2 style={{
                fontSize: '1.3rem',
                color: '#6366f1',
                fontWeight: '600',
                marginBottom: '1.5rem'
              }}>
                Professional Russian-English Translation Services
              </h2>
              
              <p style={{
                fontSize: '1.1rem',
                color: '#475569',
                lineHeight: '1.7',
                marginBottom: '1.5rem'
              }}>
                {currentLanguage === 'en' ? 'Born to a Russian mother and an Indian father, I bridge communication gaps between Russian-speaking countries and the world. With education in Russia, Uzbekistan, and India, I bring authentic cultural understanding to every translation project.' : 'Рожденная от русской матери и индийского отца, я устраняю коммуникационные барьеры между русскоговорящими странами и миром. Получив образование в России, Узбекистане и Индии, я привношу подлинное культурное понимание в каждый переводческий проект.'}
              </p>
              
              <p style={{
                fontSize: '1.1rem',
                color: '#475569',
                lineHeight: '1.7',
                marginBottom: '2.5rem'
              }}>
                With 6+ years of professional experience, I specialize in business interpretation, document translation, and cultural consultation for companies expanding into Russian markets.
              </p>
              
              {/* Credentials */}
              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                marginBottom: '2.5rem',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'white',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '50px',
                  border: '2px solid #e2e8f0',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: '#3b82f6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '0.75rem'
                  }}>
                    <span style={{ color: 'white', fontSize: '1.2rem' }}>✓</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>CERTIFIED</div>
                    <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>TRANSLATOR</div>
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'white',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '50px',
                  border: '2px solid #e2e8f0',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: '#10b981',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '0.75rem'
                  }}>
                    <span style={{ color: 'white', fontSize: '1.2rem' }}>🌍</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>MULTICULTURAL</div>
                    <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>BACKGROUND</div>
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'white',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '50px',
                  border: '2px solid #e2e8f0',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: '#f59e0b',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '0.75rem'
                  }}>
                    <span style={{ color: 'white', fontSize: '1.2rem' }}>💼</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>BUSINESS</div>
                    <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>SPECIALIST</div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button style={{
                  background: '#6366f1',
                  color: 'white',
                  padding: '0.875rem 2rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(99,102,241,0.3)',
                  transition: 'all 0.3s ease'
                }} onClick={() => { 
                  analytics.contactAttempt('meet_sabrina_quote'); 
                  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); 
                }}>
                  GET QUOTE
                </button>
                
                <button style={{
                  background: 'white',
                  color: '#6366f1',
                  padding: '0.875rem 2rem',
                  borderRadius: '8px',
                  border: '2px solid #6366f1',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }} onClick={() => { 
                  analytics.contactAttempt('meet_sabrina_call'); 
                  window.open('tel:+918789389223'); 
                }}>
                  📞 CALL NOW
                </button>
              </div>
            </div>
            
            {/* Right Image */}
            <div style={{ position: 'relative', overflow: 'visible' }}>
              <div style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '30px',
                padding: '0.5rem',
                transform: 'rotate(-2deg)',
                boxShadow: '0 25px 50px rgba(59,130,246,0.3)',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                overflow: 'visible'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotate(-1deg) translateY(-10px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 35px 70px rgba(59,130,246,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'rotate(-2deg) translateY(0px) scale(1)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(59,130,246,0.3)';
              }}>
                <img 
                  src="/images/sabrina-profile.jpeg" 
                  alt="Sabrina Bhatt - Professional Russian Translator" 
                  style={{
                    width: '110%',
                    height: isMobile ? '600px' : isTablet ? '750px' : '850px',
                    objectFit: 'cover',
                    borderRadius: '20px',
                    transform: 'rotate(2deg) translateX(-5%)',
                    transition: 'all 0.5s ease',
                    filter: 'brightness(1.1) contrast(1.05)',
                    animation: 'subtleFloat 4s ease-in-out infinite'
                  }}
                />
              </div>
              
              {/* Floating decorative elements with animations */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                borderRadius: '50%',
                width: '90px',
                height: '90px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.2rem',
                boxShadow: '0 15px 35px rgba(59,130,246,0.4)',
                animation: 'float 3s ease-in-out infinite',
                zIndex: 10,
                border: '3px solid rgba(255,255,255,0.8)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.15) rotate(10deg)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(59,130,246,0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(59,130,246,0.4)';
              }}>
                🏆
              </div>
              
              <div style={{
                position: 'absolute',
                bottom: '-15px',
                left: '-35px',
                background: 'linear-gradient(135deg, white, #f8fafc)',
                borderRadius: '20px',
                padding: '1.5rem',
                boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                border: '3px solid #e2e8f0',
                animation: 'floatReverse 4s ease-in-out infinite',
                zIndex: 10,
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 45px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
              }}>
                <div style={{ fontWeight: '800', color: '#1e293b', fontSize: '1.1rem' }}>6+ Years</div>
                <div style={{ color: '#3b82f6', fontSize: '0.9rem', fontWeight: '600' }}>Experience</div>
              </div>
              
              {/* Additional floating element - language indicator */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '-50px',
                background: 'linear-gradient(135deg, #2563eb, #1e40af)',
                borderRadius: '50%',
                width: '70px',
                height: '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                boxShadow: '0 12px 30px rgba(239,68,68,0.4)',
                animation: 'floatAround 5s ease-in-out infinite',
                zIndex: 10,
                border: '3px solid rgba(255,255,255,0.9)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.2) rotate(-10deg)';
                e.currentTarget.style.boxShadow = '0 18px 40px rgba(239,68,68,0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(239,68,68,0.4)';
              }}>
                🇷🇺
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="home" style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: isMobile ? '3rem 1rem' : isTablet ? '3rem 2rem' : '4rem 3rem',
        minHeight: isMobile ? '60vh' : '70vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ width: '100%', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '1fr 400px', 
            gap: isMobile ? '3rem' : isTablet ? '4rem' : '6rem', 
            alignItems: 'center'
          }}>
            {/* Left Content */}
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{
                  fontSize: '0.9rem',
                  color: '#6366f1',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  PROFESSIONAL TRANSLATION SERVICES
                </span>
              </div>
              
              <h1 style={{
                fontSize: isMobile ? '2.5rem' : isTablet ? '3rem' : '4rem',
                fontWeight: '900',
                color: '#1e293b',
                marginBottom: '1.5rem',
                lineHeight: '1.1'
              }}>
                {currentLanguage === 'ru' ? 'Разрушаем языковые барьеры' : 'Breaking Language Barriers'}
              </h1>
              
              <h2 style={{
                fontSize: '1.5rem',
                color: '#6366f1',
                fontWeight: '600',
                marginBottom: '2rem'
              }}>
                {currentLanguage === 'ru' 
                  ? 'Профессиональные услуги русско-английского перевода в Мумбаи'
                  : 'Expert Russian-English Translation Services in Mumbai'
                }
              </h2>
              
              <p style={{
                fontSize: '1.2rem',
                color: '#475569',
                lineHeight: '1.7',
                marginBottom: '3rem',
                maxWidth: '500px'
              }}>
                {currentLanguage === 'ru' 
                  ? 'Соединяя русскоговорящие страны с индийскими предприятиями через профессиональный перевод и культурную экспертизу.'
                  : 'Connecting Russian-speaking countries with Indian businesses through professional interpretation and cultural expertise.'
                }
              </p>
              
              {/* Hero CTAs */}
              <div style={{ 
                display: 'flex', 
                gap: isMobile ? '0.5rem' : '1rem', 
                marginBottom: '3rem',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'stretch' : 'flex-start'
              }}>
                <button style={{
                  background: '#6366f1',
                  color: 'white',
                  padding: isMobile ? '0.8rem 1.5rem' : '1rem 2.5rem',
                  borderRadius: '12px',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(99,102,241,0.3)',
                  transition: 'all 0.3s ease'
                }} onClick={() => { 
                  analytics.contactAttempt('hero_phone'); 
                  window.open('tel:+918789389223'); 
                }}>
                  📞 {currentLanguage === 'ru' ? 'Позвонить сейчас' : 'Call Now'}
                </button>
                
                <button style={{
                  background: 'white',
                  color: '#6366f1',
                  padding: isMobile ? '0.8rem 1.5rem' : '1rem 2.5rem',
                  borderRadius: '12px',
                  border: '2px solid #6366f1',
                  fontWeight: '600',
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }} onClick={() => { 
                  document.getElementById('services').scrollIntoView({ behavior: 'smooth' }); 
                }}>
                  {currentLanguage === 'ru' ? 'Узнать больше' : 'Learn More'}
                </button>
              </div>
              
              {/* Quick Stats */}
              <div style={{ 
                display: 'flex', 
                gap: '2rem',
                padding: '1.5rem 0',
                borderTop: '1px solid #e2e8f0'
              }}>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b' }}>200+</div>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                    {currentLanguage === 'ru' ? 'Довольных клиентов' : 'Happy Clients'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b' }}>6+</div>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                    {currentLanguage === 'ru' ? 'Лет опыта' : 'Years Experience'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b' }}>24/7</div>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                    {currentLanguage === 'ru' ? 'Поддержка' : 'Support'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Image/Visual */}
            <div style={{ position: 'relative' }}>
              <div style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                color: 'white',
                boxShadow: '0 25px 50px rgba(99,102,241,0.3)'
              }}>
                <div style={{ fontSize: isMobile ? '2.5rem' : '4rem', marginBottom: '1rem' }}>🇺🇸 ⟷ 🇷🇺</div>
                <h3 style={{ 
                  fontSize: isMobile ? '1.2rem' : '1.5rem', 
                  fontWeight: '700', 
                  marginBottom: '1rem',
                  margin: 0
                }}>
                  Language Liberty
                </h3>
                <p style={{ 
                  opacity: 0.9, 
                  marginBottom: '2rem',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  {currentLanguage === 'ru' 
                    ? 'Ваш надежный партнер в русско-английском переводе'
                    : 'Your trusted partner in Russian-English translation'
                  }
                </p>
                
                {/* Contact Info Cards */}
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    padding: '1rem',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>📞 Direct Call</div>
                    <div style={{ fontSize: '1.1rem' }}>+91-8789389223</div>
                  </div>
                  
                  <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    padding: '1rem',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>✉️ Email</div>
                    <div style={{ fontSize: '0.9rem' }}>sabrina@languageliberty.com</div>
                  </div>
                </div>
              </div>
              
              {/* Floating testimonial */}
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-30px',
                background: 'white',
                borderRadius: '15px',
                padding: '1rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                border: '2px solid #e2e8f0',
                maxWidth: '200px'
              }}>
                <div style={{ color: '#fbbf24', marginBottom: '0.5rem' }}>⭐⭐⭐⭐⭐</div>
                <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>
                  "Professional & Reliable"
                </div>
                <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>- Business Client</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Global Brands Section - Full Screen with Better Spacing */}
      <section style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        padding: isMobile ? '4rem 1rem' : isTablet ? '6rem 2rem' : '8rem 4rem',
        color: 'white',
        minHeight: isMobile ? '80vh' : '100vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ 
          width: '100%',
          padding: isMobile ? '0 1rem' : '0 3rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.3fr 0.7fr',
            gap: isMobile ? '4rem' : isTablet ? '6rem' : '10rem',
            alignItems: 'center'
          }}>
            {/* Left Content - More Spacious */}
            <div style={{ paddingRight: '2rem' }}>
              <h2 style={{
                fontSize: 'clamp(4rem, 10vw, 6rem)',
                fontWeight: '900',
                lineHeight: '0.85',
                marginBottom: '3rem',
                margin: 0,
                letterSpacing: '-0.02em'
              }}>
                TRUSTED BY<br />
                <span style={{ color: '#fbbf24' }}>GLOBAL BRANDS</span>
              </h2>
              
              <p style={{
                fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                lineHeight: '1.7',
                marginBottom: '4rem',
                opacity: 0.95,
                margin: 0,
                maxWidth: '600px'
              }}>
                Professional Russian-English translation & interpretation services trusted by leading companies across India, Russia, and Eastern Europe
              </p>
              
              {/* Trust Badges - More Spaced */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2.5rem',
                marginBottom: '5rem'
              }}>
                <div style={{
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '25px',
                  padding: '2.5rem 2rem',
                  textAlign: 'center',
                  backdropFilter: 'blur(15px)',
                  border: '2px solid rgba(255,255,255,0.25)',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>🏆</div>
                  <div style={{ fontWeight: '700', fontSize: '1.2rem', marginBottom: '0.5rem' }}>ISO</div>
                  <div style={{ fontSize: '1rem', opacity: 0.9 }}>CERTIFIED</div>
                </div>
                
                <div style={{
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '25px',
                  padding: '2.5rem 2rem',
                  textAlign: 'center',
                  backdropFilter: 'blur(15px)',
                  border: '2px solid rgba(255,255,255,0.25)',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>⭐</div>
                  <div style={{ fontWeight: '700', fontSize: '1.2rem', marginBottom: '0.5rem' }}>PREMIUM</div>
                  <div style={{ fontSize: '1rem', opacity: 0.9 }}>QUALITY</div>
                </div>
                
                <div style={{
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '25px',
                  padding: '2.5rem 2rem',
                  textAlign: 'center',
                  backdropFilter: 'blur(15px)',
                  border: '2px solid rgba(255,255,255,0.25)',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>🔒</div>
                  <div style={{ fontWeight: '700', fontSize: '1.2rem', marginBottom: '0.5rem' }}>SECURE</div>
                  <div style={{ fontSize: '1rem', opacity: 0.9 }}>& CONFIDENTIAL</div>
                </div>
              </div>
              
              {/* Large Stats Row - More Spread Out */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '3rem',
                marginBottom: '5rem',
                padding: '3rem 0',
                borderTop: '2px solid rgba(255,255,255,0.25)',
                borderBottom: '2px solid rgba(255,255,255,0.25)'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3.5rem', fontWeight: '900', color: '#fbbf24', marginBottom: '0.5rem' }}>200+</div>
                  <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Happy Clients</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3.5rem', fontWeight: '900', color: '#fbbf24', marginBottom: '0.5rem' }}>6+</div>
                  <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Years Experience</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3.5rem', fontWeight: '900', color: '#fbbf24', marginBottom: '0.5rem' }}>24/7</div>
                  <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Support</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3.5rem', fontWeight: '900', color: '#fbbf24', marginBottom: '0.5rem' }}>100%</div>
                  <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Accuracy</div>
                </div>
              </div>
              
              {/* CTA Buttons - More Breathing Room */}
              <div style={{ display: 'flex', gap: '2rem' }}>
                <button style={{
                  background: '#fbbf24',
                  color: '#1e293b',
                  padding: '2rem 4rem',
                  borderRadius: '20px',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '1.4rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 15px 45px rgba(251,191,36,0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }} onClick={() => { 
                  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); 
                }}>
                  GET QUOTE
                </button>
                
                <button style={{
                  background: 'transparent',
                  color: 'white',
                  padding: '2rem 4rem',
                  borderRadius: '20px',
                  border: '3px solid white',
                  fontWeight: '600',
                  fontSize: '1.4rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }} onClick={() => { 
                  window.open('tel:+918789389223'); 
                }}>
                  📞 +91 8789389223
                </button>
              </div>
            </div>
            
            {/* Right Visual - Less Dense */}
            <div style={{ 
              position: 'relative',
              height: '70vh',
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '40px',
                padding: '4rem',
                backdropFilter: 'blur(20px)',
                border: '3px solid rgba(255,255,255,0.25)',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                {/* Larger Team Grid with More Space */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '4rem',
                  marginBottom: '4rem'
                }}>
                  <div style={{
                    width: '140px',
                    height: '140px',
                    background: 'rgba(255,255,255,0.3)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4.5rem',
                    margin: '0 auto',
                    border: '4px solid rgba(255,255,255,0.4)'
                  }}>👨‍💼</div>
                  <div style={{
                    width: '140px',
                    height: '140px',
                    background: 'rgba(255,255,255,0.3)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4.5rem',
                    margin: '0 auto',
                    border: '4px solid rgba(255,255,255,0.4)'
                  }}>👩‍💼</div>
                  <div style={{
                    width: '140px',
                    height: '140px',
                    background: 'rgba(255,255,255,0.3)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4.5rem',
                    margin: '0 auto',
                    border: '4px solid rgba(255,255,255,0.4)'
                  }}>👨‍💻</div>
                  <div style={{
                    width: '140px',
                    height: '140px',
                    background: 'rgba(255,255,255,0.3)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4.5rem',
                    margin: '0 auto',
                    border: '4px solid rgba(255,255,255,0.4)'
                  }}>👩‍🏫</div>
                </div>
                
                <div style={{
                  textAlign: 'center',
                  color: 'white'
                }}>
                  <h3 style={{ 
                    margin: 0, 
                    marginBottom: '1.5rem', 
                    fontSize: '2.8rem',
                    fontWeight: '700'
                  }}>
                    Expert Global Team
                  </h3>
                  <p style={{ 
                    margin: 0, 
                    opacity: 0.9,
                    fontSize: '1.4rem',
                    lineHeight: '1.6'
                  }}>
                    Professional translators, interpreters<br />
                    & cultural consultants worldwide
                  </p>
                </div>
              </div>
              
              {/* Larger, More Prominent Floating Elements */}
              <div style={{
                position: 'absolute',
                top: '3%',
                right: '-8%',
                background: '#fbbf24',
                borderRadius: '25px',
                padding: '2.5rem',
                color: '#1e293b',
                fontWeight: '700',
                textAlign: 'center',
                boxShadow: '0 20px 50px rgba(251,191,36,0.5)',
                transform: 'rotate(8deg)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>200+</div>
                <div style={{ fontSize: '1.1rem' }}>Successful</div>
                <div style={{ fontSize: '1.1rem' }}>Projects</div>
              </div>
              
              <div style={{
                position: 'absolute',
                bottom: '8%',
                left: '-8%',
                background: 'white',
                borderRadius: '25px',
                padding: '2.5rem',
                color: '#1e293b',
                fontWeight: '600',
                textAlign: 'center',
                boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                transform: 'rotate(-8deg)'
              }}>
                <div style={{ color: '#fbbf24', marginBottom: '0.75rem', fontSize: '1.8rem' }}>⭐⭐⭐⭐⭐</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>5.0</div>
                <div style={{ fontSize: '1.1rem' }}>Client Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{
        padding: isMobile ? '4rem 1rem' : isTablet ? '5rem 2rem' : '6rem 4rem',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)',
        position: 'relative',
        minHeight: '100vh'
      }}>
        {/* Gallery Wall Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            repeating-linear-gradient(
              0deg,
              rgba(0,0,0,0.02) 0px,
              rgba(0,0,0,0.02) 1px,
              transparent 1px,
              transparent 40px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(0,0,0,0.02) 0px,
              rgba(0,0,0,0.02) 1px,
              transparent 1px,
              transparent 40px
            )
          `,
          pointerEvents: 'none'
        }}></div>

        <div style={{ width: '100%', position: 'relative', zIndex: 2 }}>
          {/* Gallery Header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 2rem',
              background: 'rgba(59,130,246,0.1)',
              border: '2px solid #3b82f6',
              borderRadius: '30px',
              marginBottom: '2rem'
            }}>
              <span style={{
                fontSize: '0.9rem',
                color: '#3b82f6',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                {currentLanguage === 'en' ? '🖼️ Professional Gallery Wall' : '🖼️ Профессиональная галерея'}
              </span>
            </div>
            <h2 style={{
              fontSize: isMobile ? '2.5rem' : '4rem',
              fontWeight: '900',
              color: '#1e293b',
              marginBottom: '1rem',
              lineHeight: '1.1',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}>
              {currentLanguage === 'en' ? 'Translation Portfolio' : 'Портфолио переводов'}
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {currentLanguage === 'en' 
                ? 'Complete visual showcase of professional Russian translation work'
                : 'Полная визуальная демонстрация профессиональной работы по русскому переводу'
              }
            </p>
          </div>
          
          {/* Wall Gallery Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(auto-fit, minmax(250px, 1fr))' : 
                                isTablet ? 'repeat(auto-fit, minmax(300px, 1fr))' : 
                                'repeat(auto-fit, minmax(280px, 1fr))',
            gap: isMobile ? '2rem' : '2.5rem',
            maxWidth: '1800px',
            margin: '0 auto',
            gridAutoRows: 'max-content',
            justifyItems: 'center',
            alignItems: 'start'
          }}>
            {(showAllImages ? GALLERY_IMAGES : GALLERY_IMAGES.slice(0, 10)).map((image, index) => {
              // Create different natural aspect ratios for variety
              const aspectRatios = [
                { width: 300, height: 400 }, // Portrait
                { width: 400, height: 300 }, // Landscape
                { width: 350, height: 450 }, // Tall portrait
                { width: 450, height: 300 }, // Wide landscape
                { width: 320, height: 320 }, // Square
                { width: 380, height: 280 }, // Wide
                { width: 280, height: 380 }, // Tall
                { width: 420, height: 350 }, // Medium landscape
                { width: 340, height: 420 }, // Medium portrait
                { width: 400, height: 400 }  // Large square
              ];
              
              const imageSize = aspectRatios[index % aspectRatios.length];
              
              return (
                <div key={index} style={{
                  position: 'relative',
                  background: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: `
                    0 4px 6px rgba(0,0,0,0.07),
                    0 10px 15px rgba(0,0,0,0.08),
                    inset 0 1px 0 rgba(255,255,255,0.9)
                  `,
                  border: '1px solid rgba(0,0,0,0.05)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  transform: `rotate(${(Math.sin(index * 17) * 3)}deg)`,
                  transformOrigin: 'center center',
                  width: `${isMobile ? Math.min(imageSize.width * 0.8, 280) : imageSize.width}px`,
                  maxWidth: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1.02) translateY(-8px)';
                  e.currentTarget.style.boxShadow = `
                    0 20px 25px rgba(0,0,0,0.15),
                    0 30px 40px rgba(0,0,0,0.1),
                    inset 0 1px 0 rgba(255,255,255,0.9)
                  `;
                  e.currentTarget.style.zIndex = '10';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `rotate(${(Math.sin(index * 17) * 3)}deg) scale(1) translateY(0px)`;
                  e.currentTarget.style.boxShadow = `
                    0 4px 6px rgba(0,0,0,0.07),
                    0 10px 15px rgba(0,0,0,0.08),
                    inset 0 1px 0 rgba(255,255,255,0.9)
                  `;
                  e.currentTarget.style.zIndex = '1';
                }}
                onClick={() => openModal(index)}>
                  
                  {/* Gallery Frame */}
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: `${isMobile ? Math.min(imageSize.height * 0.8, 350) : imageSize.height}px`,
                    background: '#f8f9fa',
                    border: '3px solid #e9ecef',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginBottom: '15px'
                  }}>
                    <img 
                      src={image.src} 
                      alt={image.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'all 0.4s ease',
                        filter: 'brightness(0.95) contrast(1.05) saturate(1.1)'
                      }}
                    />
                    
                    {/* Photo Corner Tabs */}
                    <div style={{
                      position: 'absolute',
                      top: '-5px',
                      left: '20px',
                      width: '40px',
                      height: '20px',
                      background: 'rgba(255,255,255,0.9)',
                      clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: '-5px',
                      right: '20px',
                      width: '40px',
                      height: '20px',
                      background: 'rgba(255,255,255,0.9)',
                      clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}></div>
                  </div>

                  {/* Gallery Label */}
                  <div style={{
                    background: 'white',
                    padding: '12px 15px',
                    textAlign: 'center',
                    borderTop: '1px solid #e9ecef'
                  }}>
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: '#1e293b',
                      marginBottom: '5px',
                      fontFamily: 'serif'
                    }}>
                      {image.title}
                    </h4>
                    <p style={{
                      fontSize: '0.85rem',
                      color: '#64748b',
                      margin: '5px 0',
                      fontStyle: 'italic'
                    }}>
                      {image.desc}
                    </p>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#94a3b8',
                      marginTop: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontWeight: '500'
                    }}>
                      {index < 3 ? (currentLanguage === 'en' ? 'Business Meeting' : 'Деловая встреча') : 
                       index < 6 ? (currentLanguage === 'en' ? 'Document Translation' : 'Перевод документов') : 
                       (currentLanguage === 'en' ? 'Training Session' : 'Учебная сессия')}
                    </div>
                  </div>

                  {/* Gallery Number Plate */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-8px',
                    right: '15px',
                    background: '#3b82f6',
                    color: 'white',
                    width: '30px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)',
                    boxShadow: '0 2px 4px rgba(59,130,246,0.3)'
                  }}>
                    {index + 1}
                  </div>
                </div>
              );
            })}
          </div>

          {/* See More Button */}
          {GALLERY_IMAGES.length > 10 && (
            <div style={{
              textAlign: 'center',
              marginTop: '4rem'
            }}>
              <button
                onClick={() => setShowAllImages(!showAllImages)}
                style={{
                  background: showAllImages 
                    ? 'linear-gradient(135deg, #64748b, #475569)' 
                    : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2.5rem',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 25px rgba(59,130,246,0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                  e.currentTarget.style.boxShadow = showAllImages 
                    ? '0 15px 35px rgba(100,116,139,0.4)'
                    : '0 15px 35px rgba(59,130,246,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                  e.currentTarget.style.boxShadow = showAllImages 
                    ? '0 10px 25px rgba(100,116,139,0.3)'
                    : '0 10px 25px rgba(59,130,246,0.3)';
                }}
              >
                {showAllImages 
                  ? (currentLanguage === 'en' ? `Show Less (${GALLERY_IMAGES.length - 10} Hidden)` : `Показать меньше (${GALLERY_IMAGES.length - 10} скрыто)`)
                  : (currentLanguage === 'en' ? `See More (${GALLERY_IMAGES.length - 10} More)` : `Посмотреть больше (еще ${GALLERY_IMAGES.length - 10})`)
                }
              </button>
            </div>
          )}
        </div>
      </section>
      
      <section className="testimonials" style={{
        padding: isMobile ? '4rem 1rem' : isTablet ? '5rem 2rem' : '6rem 3rem',
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243L8.2 0H5.373zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657l1.415 1.414L13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.242 0h3.414zM22.344 0l-9.315 9.314 1.415 1.414L25.758 0h-3.414zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4z'/%3E%3C/g%3E%3C/svg%3E")`,
          pointerEvents: 'none'
        }}></div>

        <div style={{ width: '100%', position: 'relative', zIndex: 2 }}>
          {/* Enhanced Header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 2rem',
              background: 'rgba(59,130,246,0.1)',
              border: '2px solid #3b82f6',
              borderRadius: '30px',
              marginBottom: '2rem'
            }}>
              <span style={{
                fontSize: '0.9rem',
                color: '#3b82f6',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                ⭐ {currentLanguage === 'en' ? 'Client Success Stories' : 'Истории успеха клиентов'}
              </span>
            </div>
            <h2 style={{
              fontSize: isMobile ? '2.5rem' : '4rem',
              fontWeight: '900',
              color: 'white',
              marginBottom: '1rem',
              lineHeight: '1.1',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              {currentLanguage === 'en' ? 'Trusted by Professionals' : 'Доверие профессионалов'}
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {currentLanguage === 'en' 
                ? 'Real experiences from clients who chose our Russian translation expertise'
                : 'Реальный опыт клиентов, выбравших наш опыт русского перевода'
              }
            </p>
          </div>

          {/* Enhanced Testimonials Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: isMobile ? '2rem' : '2.5rem',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {testimonials.length > 0 ? testimonials.map((testimonial, index) => (
              <div key={testimonial.id} style={{
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '20px',
                padding: '2.5rem',
                boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                border: '1px solid rgba(255,255,255,0.2)',
                position: 'relative',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(10px)',
                transform: `translateY(${index % 2 === 0 ? '0' : '20px'})`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 30px 70px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `translateY(${index % 2 === 0 ? '0' : '20px'}) scale(1)`;
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.15)';
              }}>
                {/* Quote Icon */}
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '30px',
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  color: 'white',
                  boxShadow: '0 10px 20px rgba(59,130,246,0.3)'
                }}>
                  "
                </div>
                
                <div style={{
                  display: 'flex',
                  gap: '0.3rem',
                  marginBottom: '1.5rem',
                  marginTop: '1rem'
                }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} style={{ color: '#fbbf24', fontSize: '1.3rem' }}>⭐</span>
                  ))}
                </div>
                
                <p style={{
                  fontSize: '1.1rem',
                  color: '#1e293b',
                  lineHeight: '1.7',
                  marginBottom: '2rem',
                  fontStyle: 'italic',
                  fontWeight: '500'
                }}>
                  "{testimonial.message}"
                </p>
                
                <div style={{
                  borderTop: '2px solid #e2e8f0',
                  paddingTop: '1.5rem'
                }}>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '0.3rem'
                  }}>
                    {testimonial.name}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#64748b',
                    fontWeight: '500'
                  }}>
                    {testimonial.title}
                  </div>
                </div>
              </div>
            )) : (
              // Enhanced Default testimonials
              <>
                <div style={{
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  position: 'relative',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '30px',
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    color: 'white',
                    boxShadow: '0 10px 20px rgba(59,130,246,0.3)'
                  }}>
                    "
                  </div>
                  <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1.5rem', marginTop: '1rem' }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: '#fbbf24', fontSize: '1.3rem' }}>⭐</span>
                    ))}
                  </div>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#1e293b',
                    lineHeight: '1.7',
                    marginBottom: '2rem',
                    fontStyle: 'italic',
                    fontWeight: '500'
                  }}>
                    "{currentLanguage === 'en' ? 'Sabrina provided excellent Russian interpretation for our business meeting with Moscow partners. Her cultural understanding made all the difference.' : 'Сабрина обеспечила отличный русский перевод для нашей деловой встречи с московскими партнерами. Ее культурное понимание имело решающее значение.'}"
                  </p>
                  <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '1.5rem' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.3rem' }}>
                      Rajesh Kumar
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '500' }}>
                      {currentLanguage === 'en' ? 'CEO, Tech Solutions Mumbai' : 'Генеральный директор, Tech Solutions Mumbai'}
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  position: 'relative',
                  backdropFilter: 'blur(10px)',
                  transform: 'translateY(20px)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '30px',
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    color: 'white',
                    boxShadow: '0 10px 20px rgba(59,130,246,0.3)'
                  }}>
                    "
                  </div>
                  <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1.5rem', marginTop: '1rem' }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: '#fbbf24', fontSize: '1.3rem' }}>⭐</span>
                    ))}
                  </div>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#1e293b',
                    lineHeight: '1.7',
                    marginBottom: '2rem',
                    fontStyle: 'italic',
                    fontWeight: '500'
                  }}>
                    "{currentLanguage === 'en' ? 'Professional document translation service. Fast, accurate, and certified. Highly recommended for legal documents.' : 'Профессиональная служба перевода документов. Быстро, точно и сертифицировано. Настоятельно рекомендуется для юридических документов.'}"
                  </p>
                  <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '1.5rem' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.3rem' }}>
                      Priya Sharma
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '500' }}>
                      {currentLanguage === 'en' ? 'Legal Advisor, Mumbai High Court' : 'Юридический консультант, Высокий суд Мумбаи'}
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  position: 'relative',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '30px',
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    color: 'white',
                    boxShadow: '0 10px 20px rgba(59,130,246,0.3)'
                  }}>
                    "
                  </div>
                  <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1.5rem', marginTop: '1rem' }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: '#fbbf24', fontSize: '1.3rem' }}>⭐</span>
                    ))}
                  </div>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#1e293b',
                    lineHeight: '1.7',
                    marginBottom: '2rem',
                    fontStyle: 'italic',
                    fontWeight: '500'
                  }}>
                    "{currentLanguage === 'en' ? 'Sabrina helped our Russian artists during their Mumbai shoot. Her entertainment industry knowledge was invaluable.' : 'Сабрина помогла нашим русским артистам во время их съемок в Мумбаи. Ее знание индустрии развлечений было бесценным.'}"
                  </p>
                  <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '1.5rem' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.3rem' }}>
                      Mikhail Petrov
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '500' }}>
                      {currentLanguage === 'en' ? 'Film Producer, Moscow Films' : 'Кинопродюсер, Moscow Films'}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Add Review Section */}
          <div style={{
            textAlign: 'center',
            marginTop: '4rem',
            padding: '3rem',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'white',
              marginBottom: '1rem'
            }}>
              {currentLanguage === 'en' ? '✍️ Share Your Experience' : '✍️ Поделитесь своим опытом'}
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.1rem',
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              {currentLanguage === 'en' 
                ? 'Help others discover our Russian translation services by sharing your experience'
                : 'Помогите другим узнать о наших услугах русского перевода, поделившись своим опытом'
              }
            </p>
            <button
              onClick={() => setShowFeedbackForm(true)}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: 'white',
                border: 'none',
                padding: '1rem 3rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px rgba(59,130,246,0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(59,130,246,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(59,130,246,0.3)';
              }}
            >
              {currentLanguage === 'en' ? '⭐ Write a Review' : '⭐ Написать отзыв'}
            </button>
          </div>
        </div>
      </section>

      <section id="services" style={{
        padding: isMobile ? '3rem 1rem' : isTablet ? '4rem 2rem' : '6rem 3rem',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        position: 'relative'
      }}>
        <div style={{ width: '100%', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: '800',
              color: '#1e293b',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {currentLanguage === 'ru' ? 'Наши услуги' : 'Our Services'}
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              {currentLanguage === 'ru' 
                ? 'Профессиональные услуги русско-английского перевода и интерпретации, адаптированные под ваши бизнес-потребности'
                : 'Professional Russian-English translation and interpretation services tailored to your business needs'
              }
            </p>
          </div>

          {/* Services Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
            maxWidth: '1600px',
            margin: '0 auto 3rem'
          }}>
            {/* Virtual Meeting Interpretation - Most Popular */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '0',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              border: '3px solid #6366f1',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{
                position: 'absolute',
                top: '15px',
                left: '15px',
                background: '#6366f1',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '25px',
                fontSize: '0.8rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                zIndex: 2
              }}>
                {currentLanguage === 'ru' ? 'САМЫЙ ПОПУЛЯРНЫЙ' : 'MOST POPULAR'}
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
                padding: '3rem 2rem 2rem',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: '#6366f1',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '2rem',
                  color: 'white',
                  boxShadow: '0 10px 30px rgba(99,102,241,0.3)'
                }}>
                  💻
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: '#1e293b',
                  margin: '0 0 1rem',
                  lineHeight: '1.3'
                }}>
                  {currentLanguage === 'ru' ? 'Устный перевод виртуальных встреч' : 'Virtual Meeting Interpretation'}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#64748b',
                  margin: '0 0 1.5rem',
                  lineHeight: '1.5'
                }}>
                  {currentLanguage === 'ru' 
                    ? 'Устный перевод русский-английский в реальном времени для сессий Zoom, Teams и Google Meet с кристально чистым качеством звука.'
                    : 'Real-time Russian-English interpretation for Zoom, Teams, and Google Meet sessions with crystal-clear audio quality.'
                  }
                </p>
              </div>
              
              <div style={{ padding: '1.5rem 2rem 2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  {(currentLanguage === 'ru' 
                    ? ['HD качество звука', 'Поддержка демонстрации экрана', 'Доступность 24/7']
                    : ['HD Audio Quality', 'Screen Sharing Support', '24/7 Availability']
                  ).map((feature, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '0.75rem',
                      fontSize: '0.95rem',
                      color: '#374151'
                    }}>
                      <span style={{ color: '#10b981', marginRight: '0.75rem', fontSize: '1.1rem' }}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* In-Person Business Meetings */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '0',
              boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                padding: '3rem 2rem 2rem',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: '#f59e0b',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '2rem',
                  color: 'white',
                  boxShadow: '0 10px 30px rgba(245,158,11,0.3)'
                }}>
                  🤝
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: '#1e293b',
                  margin: '0 0 1rem',
                  lineHeight: '1.3'
                }}>
                  {currentLanguage === 'ru' ? 'Личные деловые встречи' : 'In-Person Business Meetings'}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#64748b',
                  margin: '0 0 1.5rem',
                  lineHeight: '1.5'
                }}>
                  {currentLanguage === 'ru' 
                    ? 'Профессиональный устный перевод на месте для корпоративных встреч, переговоров и конференций по всему Мумбаи и Индии.'
                    : 'Professional on-site interpretation for corporate meetings, negotiations, and conferences across Mumbai and India.'
                  }
                </p>
              </div>
              
              <div style={{ padding: '1.5rem 2rem 2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  {(currentLanguage === 'ru' 
                    ? ['Опыт министерского уровня', 'Гарантированная конфиденциальность', 'Отраслевая экспертиза']
                    : ['Ministerial Level Experience', 'Confidentiality Assured', 'Industry Expertise']
                  ).map((feature, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '0.75rem',
                      fontSize: '0.95rem',
                      color: '#374151'
                    }}>
                      <span style={{ color: '#10b981', marginRight: '0.75rem', fontSize: '1.1rem' }}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certified Document Translation */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '0',
              boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                padding: '3rem 2rem 2rem',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: '#10b981',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '2rem',
                  color: 'white',
                  boxShadow: '0 10px 30px rgba(16,185,129,0.3)'
                }}>
                  📄
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: '#1e293b',
                  margin: '0 0 1rem',
                  lineHeight: '1.3'
                }}>
                  {currentLanguage === 'ru' ? 'Сертифицированный перевод документов' : 'Certified Document Translation'}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#64748b',
                  margin: '0 0 1.5rem',
                  lineHeight: '1.5'
                }}>
                  {currentLanguage === 'ru' 
                    ? 'Официальный перевод юридических документов, контрактов, сертификатов и технических руководств с государственной сертификацией.'
                    : 'Official translation of legal documents, contracts, certificates, and technical manuals with government certification.'
                  }
                </p>
              </div>
              
              <div style={{ padding: '1.5rem 2rem 2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  {(currentLanguage === 'ru' 
                    ? ['Юридическая сертификация', 'Быстрое выполнение', 'Техническая точность']
                    : ['Legal Certification', 'Fast Turnaround', 'Technical Accuracy']
                  ).map((feature, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '0.75rem',
                      fontSize: '0.95rem',
                      color: '#374151'
                    }}>
                      <span style={{ color: '#10b981', marginRight: '0.75rem', fontSize: '1.1rem' }}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Russian Language Training */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '0',
              boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)',
                padding: '3rem 2rem 2rem',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: '#ea580c',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '2rem',
                  color: 'white',
                  boxShadow: '0 10px 30px rgba(234,88,12,0.3)'
                }}>
                  🎓
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: '#1e293b',
                  margin: '0 0 1rem',
                  lineHeight: '1.3'
                }}>
                  {currentLanguage === 'ru' ? 'Обучение русскому языку' : 'Russian Language Training'}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#64748b',
                  margin: '0 0 1.5rem',
                  lineHeight: '1.5'
                }}>
                  {currentLanguage === 'ru' 
                    ? 'Комплексные курсы русского языка от начального до продвинутого уровня, включая деловой этикет и культурное обучение.'
                    : 'Comprehensive Russian language courses from beginner to advanced levels, including business etiquette and cultural training.'
                  }
                </p>
              </div>
              
              <div style={{ padding: '1.5rem 2rem 2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  {(currentLanguage === 'ru' 
                    ? ['Уровни A1-C1', 'Культурный этикет', 'Деловой русский']
                    : ['A1 to C1 Levels', 'Cultural Etiquette', 'Business Russian']
                  ).map((feature, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '0.75rem',
                      fontSize: '0.95rem',
                      color: '#374151'
                    }}>
                      <span style={{ color: '#10b981', marginRight: '0.75rem', fontSize: '1.1rem' }}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Executive Travel Support */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '0',
              boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%)',
                padding: '3rem 2rem 2rem',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: '#8b5cf6',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '2rem',
                  color: 'white',
                  boxShadow: '0 10px 30px rgba(139,92,246,0.3)'
                }}>
                  ✈️
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: '#1e293b',
                  margin: '0 0 1rem',
                  lineHeight: '1.3'
                }}>
                  {currentLanguage === 'ru' ? 'Поддержка деловых поездок' : 'Executive Travel Support'}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#64748b',
                  margin: '0 0 1.5rem',
                  lineHeight: '1.5'
                }}>
                  {currentLanguage === 'ru' 
                    ? 'Персональные услуги переводчика для бизнес-руководителей, путешествующих в русскоговорящие страны или принимающих российские делегации.'
                    : 'Personal interpreter services for business executives traveling to Russian-speaking countries or hosting Russian delegates.'
                  }
                </p>
              </div>
              
              <div style={{ padding: '1.5rem 2rem 2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  {(currentLanguage === 'ru' 
                    ? ['Помощь в аэропорту', 'Культурное руководство', 'Поддержка 24/7']
                    : ['Airport Assistance', 'Cultural Guidance', '24/7 Support']
                  ).map((feature, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '0.75rem',
                      fontSize: '0.95rem',
                      color: '#374151'
                    }}>
                      <span style={{ color: '#10b981', marginRight: '0.75rem', fontSize: '1.1rem' }}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Entertainment Industry Support */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '0',
              boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)',
                padding: '3rem 2rem 2rem',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: '#ef4444',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '2rem',
                  color: 'white',
                  boxShadow: '0 10px 30px rgba(239,68,68,0.3)'
                }}>
                  🎬
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: '#1e293b',
                  margin: '0 0 1rem',
                  lineHeight: '1.3'
                }}>
                  {currentLanguage === 'ru' ? 'Поддержка индустрии развлечений' : 'Entertainment Industry Support'}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#64748b',
                  margin: '0 0 1.5rem',
                  lineHeight: '1.5'
                }}>
                  {currentLanguage === 'ru' 
                    ? 'Специализированные услуги для российских артистов, моделей и исполнителей, работающих в Индии, включая чтение сценариев и координацию с агентствами.'
                    : 'Specialized services for Russian artists, models, and performers working in India, including script reading and agency coordination.'
                  }
                </p>
              </div>
              
              <div style={{ padding: '1.5rem 2rem 2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  {(currentLanguage === 'ru' 
                    ? ['Перевод сценариев', 'Координация с агентствами', 'Культурная адаптация']
                    : ['Script Translation', 'Agency Coordination', 'Cultural Adaptation']
                  ).map((feature, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '0.75rem',
                      fontSize: '0.95rem',
                      color: '#374151'
                    }}>
                      <span style={{ color: '#10b981', marginRight: '0.75rem', fontSize: '1.1rem' }}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-header">
            <h2>{t.contact.title}</h2>
            <p>{t.contact.subtitle}</p>
          </div>
          <div className="contact-main-card">
            <div className="contact-cards">
              <div className="contact-card">
                <div className="contact-icon">📞</div>
                <h3>{t.contact?.call || (currentLanguage === 'en' ? 'Call Us' : 'Позвоните нам')}</h3>
                <p>{currentLanguage === 'en' ? 'Speak directly with our experts' : 'Говорите напрямую с нашими экспертами'}</p>
                <div className="contact-details">
                  <a href="tel:+918789389223">+91-8789389223</a>
                  <a href="tel:+917304876702">+91-7304876702</a>
                </div>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">✉️</div>
                <h3>{t.contact?.email || (currentLanguage === 'en' ? 'Email Us' : 'Напишите нам')}</h3>
                <p>{currentLanguage === 'en' ? 'Send us your requirements' : 'Отправьте нам ваши требования'}</p>
                <div className="contact-details">
                  <a href="mailto:sabrina@languageliberty.com">sabrina@languageliberty.com</a>
                </div>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">💬</div>
                <h3>WhatsApp</h3>
                <p>{currentLanguage === 'en' ? 'Quick chat for instant quotes' : 'Быстрый чат для мгновенных расценок'}</p>
                <div className="contact-details">
                  <a href="https://wa.me/918789389223">Message on WhatsApp</a>
                </div>
              </div>
              
              <div className="contact-card special-offer">
                <div className="contact-icon">🎉</div>
                <h3>{t.contact?.offer || (currentLanguage === 'en' ? 'Special Offer' : 'Специальное предложение')}</h3>
                <p>{currentLanguage === 'en' ? 'First-time clients get' : 'Новые клиенты получают'}</p>
                <div className="offer-badge">20% OFF</div>
              </div>
            </div>
            
            <div className="contact-form-section">
              <div className="contact-image">
                <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=600&fit=crop" alt="Professional Translator" />
              </div>
              <div className="contact-form">
                <h3>{t.contact?.quote || (currentLanguage === 'en' ? 'Request a Quote' : 'Запросить расценки')}</h3>
                <form className="quote-form" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="name"
                      placeholder={currentLanguage === 'en' ? 'Your Name' : 'Ваше имя'}
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                    />
                    <input 
                      type="email" 
                      name="email"
                      placeholder={currentLanguage === 'en' ? 'Email Address' : 'Адрес электронной почты'}
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder={currentLanguage === 'en' ? 'Phone Number' : 'Номер телефона'}
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">{currentLanguage === 'en' ? 'Select Service' : 'Выберите услугу'}</option>
                      <option value="virtual">{currentLanguage === 'en' ? 'Virtual Meeting Interpretation' : 'Устный перевод виртуальных встреч'}</option>
                      <option value="business">{currentLanguage === 'en' ? 'Business Meeting' : 'Деловая встреча'}</option>
                      <option value="document">{currentLanguage === 'en' ? 'Document Translation' : 'Перевод документов'}</option>
                      <option value="training">{currentLanguage === 'en' ? 'Language Training' : 'Обучение языку'}</option>
                      <option value="travel">{currentLanguage === 'en' ? 'Travel Support' : 'Поддержка в поездках'}</option>
                    </select>
                  </div>
                  <textarea 
                    name="message"
                    placeholder={currentLanguage === 'en' ? 'Describe your requirements...' : 'Опишите ваши требования...'}
                    rows="4" 
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                  {formStatus && (
                    <div className={`form-status ${formStatus.includes('Error') || formStatus.includes('Ошибка') ? 'error' : 'success'}`}>
                      {formStatus}
                    </div>
                  )}
                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                      currentLanguage === 'en' ? 'Sending...' : 'Отправка...'
                    ) : (
                      t.contact?.submit || (currentLanguage === 'en' ? 'Get Free Quote' : 'Получить бесплатную оценку')
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="appointments">
        <div className="container">
          <div className="appointments-header">
            <h2>{t.appointments.title}</h2>
            <p>{t.appointments.subtitle}</p>
          </div>
          <div className="appointments-grid">
            <div className="appointment-card free">
              <div className="appointment-badge">Most Popular</div>
              <div className="appointment-icon">💬</div>
              <h3>{currentLanguage === 'en' ? 'Free Consultation' : 'Бесплатная консультация'}</h3>
              <div className="appointment-price">
                <span className="price">₹0</span>
                <span className="duration">30 minutes</span>
              </div>
              <ul className="appointment-features">
                <li>✓ Requirement Analysis</li>
                <li>✓ Service Recommendations</li>
                <li>✓ Pricing Discussion</li>
                <li>✓ Timeline Planning</li>
              </ul>
              <button className="book-btn primary" onClick={() => window.open('tel:+918789389223')}>{currentLanguage === 'en' ? 'Book Free Call' : 'Записаться на звонок'}</button>
            </div>
            
            <div className="appointment-card premium">
              <div className="appointment-icon">🎯</div>
              <h3>{currentLanguage === 'en' ? 'Business Strategy Session' : 'Бизнес-стратегическая сессия'}</h3>
              <div className="appointment-price">
                <span className="price">₹2,500</span>
                <span className="duration">60 minutes</span>
              </div>
              <ul className="appointment-features">
                <li>✓ Detailed Business Analysis</li>
                <li>✓ Custom Translation Strategy</li>
                <li>✓ Cultural Adaptation Plan</li>
                <li>✓ Long-term Partnership</li>
              </ul>
              <button className="book-btn secondary" onClick={() => window.open('https://wa.me/918789389223')}>{currentLanguage === 'en' ? 'Book Strategy Call' : 'Записаться на стратегический звонок'}</button>
            </div>
            
            <div className="appointment-card urgent">
              <div className="appointment-icon">⚡</div>
              <h3>{currentLanguage === 'en' ? 'Urgent Support' : 'Срочная поддержка'}</h3>
              <div className="appointment-price">
                <span className="price">₹5,000</span>
                <span className="duration">Available 24/7</span>
              </div>
              <ul className="appointment-features">
                <li>✓ Immediate Response</li>
                <li>✓ Emergency Translation</li>
                <li>✓ Crisis Communication</li>
                <li>✓ Same-day Delivery</li>
              </ul>
              <button className="book-btn urgent-btn" onClick={() => window.open('tel:+918789389223')}>{currentLanguage === 'en' ? 'Call Now' : 'Позвонить сейчас'}</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <h3>Language Liberty</h3>
              <p>Breaking language barriers with professional Russian translation services in Mumbai. 6+ years of expertise in business interpretation and cultural communication.</p>
              <div className="footer-social">
                <a href="tel:+918789389223" className="social-link">📞</a>
                <a href="mailto:sabrina@languageliberty.com" className="social-link">✉️</a>
                <a href="https://wa.me/918789389223" className="social-link">💬</a>
              </div>
            </div>
            
            <div className="footer-services">
              <h4>Our Services</h4>
              <ul>
                <li>Virtual Meeting Interpretation</li>
                <li>Business Meeting Support</li>
                <li>Document Translation</li>
                <li>Russian Language Training</li>
                <li>Travel Support</li>
                <li>Entertainment Industry</li>
              </ul>
            </div>
            
            <div className="footer-contact">
              <h4>Contact Info</h4>
              <div className="contact-item">
                <span className="contact-label">Phone:</span>
                <a href="tel:+918789389223">+91-8789389223</a>
              </div>
              <div className="contact-item">
                <span className="contact-label">Alt Phone:</span>
                <a href="tel:+917304876702">+91-7304876702</a>
              </div>
              <div className="contact-item">
                <span className="contact-label">Email:</span>
                <a href="mailto:sabrina@languageliberty.com">sabrina@languageliberty.com</a>
              </div>
              <div className="contact-item">
                <span className="contact-label">Location:</span>
                <span>Mumbai, India</span>
              </div>
            </div>
            
            <div className="footer-cta">
              <h4>Get Started</h4>
              <p>Ready to break language barriers?</p>
              <div className="footer-buttons">
                <a href="tel:+918789389223" className="footer-btn primary">Call Now</a>
                <a href="https://wa.me/918789389223" className="footer-btn secondary">WhatsApp</a>
              </div>
              <div className="footer-offer">
                <span className="offer-text">🎉 20% OFF First Booking</span>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2025 Language Liberty. All rights reserved. | Professional Russian Translation Services</p>
          </div>
        </div>
      </footer>
      
      <Suspense fallback={<div>Loading...</div>}>
        <Chatbot language={currentLanguage} />
      </Suspense>
      

      
      {/* Mobile-only floating language toggle */}
      <div className="mobile-lang-toggle">
        <div className="toggle-switch">
          <input 
            type="checkbox" 
            id="mobileLangToggle" 
            checked={currentLanguage === 'ru'} 
            onChange={(e) => switchLanguage(e.target.checked ? 'ru' : 'en')}
          />
          <label htmlFor="mobileLangToggle" className="toggle-label">
            <span className="toggle-text left">🇺🇸 EN</span>
            <span className="toggle-slider"></span>
            <span className="toggle-text right">🇷🇺 RU</span>
          </label>
        </div>
      </div>
      
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <button className="modal-nav modal-prev" onClick={prevImage}>‹</button>
            <button className="modal-nav modal-next" onClick={nextImage}>›</button>
            <img src={selectedImage.src} alt={selectedImage.title} />
            <div className="modal-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.desc}</p>
              <div className="modal-counter">{currentImageIndex + 1} / {GALLERY_IMAGES.length}</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <div className="modal-overlay" onClick={() => setShowFeedbackForm(false)}>
          <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowFeedbackForm(false)}>×</button>
            <h3>{currentLanguage === 'en' ? 'Share Your Experience' : 'Поделитесь впечатлениями'}</h3>
            <form onSubmit={handleFeedbackSubmit}>
              <div className="rating-input">
                <label>{currentLanguage === 'en' ? 'Rating:' : 'Оценка:'}</label>
                <div className="star-rating">
                  {[1,2,3,4,5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={star <= feedbackData.rating ? 'active' : ''}
                      onClick={() => setFeedbackData(prev => ({...prev, rating: star}))}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="text"
                name="name"
                placeholder={currentLanguage === 'en' ? 'Your Name' : 'Ваше имя'}
                value={feedbackData.name}
                onChange={handleFeedbackChange}
                required
              />
              <textarea
                name="message"
                placeholder={currentLanguage === 'en' ? 'Share your experience...' : 'Поделитесь впечатлениями...'}
                value={feedbackData.message}
                onChange={handleFeedbackChange}
                required
                rows="4"
              />
              <button type="submit" className="submit-feedback">
                {currentLanguage === 'en' ? 'Submit Feedback' : 'Отправить отзыв'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
});

function App() {
  // Check if current path is admin
  const isAdminRoute = window.location.pathname === '/admin';
  
  if (isAdminRoute) {
    // Lazy load admin component
    const AdminApp = React.lazy(() => import('./AdminApp'));
    return (
      <Suspense fallback={<div className="loading">Loading Admin...</div>}>
        <AdminApp />
      </Suspense>
    );
  }
  
  return <AppContent />;
}

export default App;