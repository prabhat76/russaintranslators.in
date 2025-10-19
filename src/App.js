import React, { useState, useEffect, lazy, Suspense } from 'react';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/sections/Header';
import About from './components/sections/About';
import Gallery from './components/sections/Gallery';
import Services from './components/sections/Services';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';
import Modal from './components/ui/Modal';
import { GALLERY_IMAGES } from './constants/content';

const Chatbot = lazy(() => import('./components/Chatbot'));

// Splash Screen Component (memoized for performance)
const SplashScreen = React.memo(({ onComplete, currentLanguage }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 6000); // Extended for flag zoom-out reveal effect
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      overflow: 'hidden',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Subtle animated background pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(239, 68, 68, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 60% 40%, rgba(34, 197, 94, 0.03) 0%, transparent 50%)
        `,
        animation: 'backgroundFloat 20s ease-in-out infinite'
      }}></div>
      
      {/* Dynamic Flag with Zoom In Effect */}
            {/* Enhanced Flag with Glow Effect */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
        animation: 'flagZoomOut 6s ease-out forwards',
        opacity: 1
      }}>
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(30, 64, 175, 0.05) 50%, transparent 80%)',
          borderRadius: '20px',
          filter: 'drop-shadow(0 0 25px rgba(59, 130, 246, 0.25))',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          animation: 'containerFade 6s ease-out forwards'
        }}>
          <img
            src="/images/download.webp"
            alt="Russian and International Flags - Symbol of Unity and Professional Translation Services"
            style={{
              width: '400px',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '16px',
              filter: 'drop-shadow(0 12px 30px rgba(0, 0, 0, 0.25)) saturate(1.3) brightness(1.1) contrast(1.15) blur(0px)',
              transition: 'all 0.3s ease',
              position: 'relative',
              zIndex: 2,
              animation: 'imageEnhance 6s ease-in-out infinite reverse'
            }}
          />
          {/* Enhanced background glow */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '350px',
            height: '350px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(30, 64, 175, 0.04) 40%, transparent 70%)',
            borderRadius: '16px',
            zIndex: 1,
            animation: 'pulseGlow 3s ease-in-out infinite'
          }}></div>
        </div>
      </div>

      {/* No overlay div - text will appear directly over flag */}

      {/* Main Content Container with Dynamic Fade Out */}
      <div style={{
        position: 'relative',
        textAlign: 'center',
        maxWidth: '800px',
        padding: '2rem',
        animation: 'textFadeIn 6s ease-in-out forwards',
        opacity: 0,
        transform: 'translateY(50px) scale(0.5)',
        zIndex: 10,
        background: 'rgba(248, 250, 252, 0.9)',
        borderRadius: '24px',
        backdropFilter: 'blur(15px)',
        transition: 'all 0.5s ease',
        filter: 'blur(4px)'
      }}>
        {/* Top Decorative Line */}
        <div style={{
          height: '2px',
          background: 'linear-gradient(90deg, #64748b, #1e293b)',
          margin: '0 auto 2rem',
          animation: 'lineExpand 1s ease-out 0.2s forwards',
          width: '0px'
        }}></div>

        {/* Main Heading */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: '300',
          marginBottom: '1rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#1e293b',
          lineHeight: '1.1',
          fontFamily: '"Inter", sans-serif'
        }}>
          Language
          <span style={{
            display: 'block',
            fontWeight: '600',
            fontSize: '0.85em',
            marginTop: '0.2em',
            color: '#475569'
          }}>
            Liberty
          </span>
        </h1>

        {/* Subtitle */}
        <div style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          fontWeight: '400',
          color: '#64748b',
          marginBottom: '2.5rem',
          letterSpacing: '0.02em',
          lineHeight: '1.4'
        }}>
          Professional Russian Translation Services
        </div>

        {/* Trust & Collaboration Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 24px',
          border: '1px solid #e2e8f0',
          borderRadius: '50px',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          fontSize: '0.9rem',
          fontWeight: '500',
          color: '#475569',
          animation: 'badgeFadeIn 1s ease-out 0.5s forwards',
          opacity: 0
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #3b82f6, #1e40af)'
          }}></div>
          Bridging India & Russia with Trust
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #ef4444, #dc2626)'
          }}></div>
        </div>

        {/* Bottom Decorative Elements */}
        <div style={{
          marginTop: '3rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          animation: 'dotsAppear 1s ease-out 0.8s forwards',
          opacity: 0
        }}>
          {[1, 2, 3].map((dot, index) => (
            <div
              key={dot}
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: '#94a3b8',
                animation: `dotPulse 2s ease-in-out ${index * 0.3}s infinite`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Enhanced Loading Progress Bar */}
      <div style={{
        position: 'absolute',
        bottom: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '280px',
        height: '3px',
        background: 'rgba(100, 116, 139, 0.15)',
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, #3b82f6 0%, #1e40af 50%, #3b82f6 100%)',
          transform: 'translateX(-100%)',
          animation: 'progressBar 6s ease-out forwards',
          borderRadius: '4px',
          boxShadow: '0 0 12px rgba(59, 130, 246, 0.3)',
          position: 'relative'
        }}>
          {/* Shimmer effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
            animation: 'shimmer 2s infinite'
          }}></div>
        </div>
      </div>

      {/* Loading Status Text */}
      <div style={{
        position: 'absolute',
        bottom: '25px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '0.8rem',
        color: '#64748b',
        fontWeight: '500',
        letterSpacing: '0.05em',
        animation: 'loadingTextFade 2s ease-in-out 1s infinite alternate',
        textAlign: 'center'
      }}>
        {currentLanguage === 'en' ? 'Loading Professional Services...' : 'Загрузка профессиональных услуг...'}
      </div>

      <style>{`
        @keyframes flagZoomIn {
          0% { 
            opacity: 0.2; 
            transform: translate(-50%, -50%) scale(0.6);
            filter: brightness(0.7) contrast(0.9) saturate(0.8);
          }
          25% { 
            opacity: 0.4; 
            transform: translate(-50%, -50%) scale(0.8);
            filter: brightness(0.9) contrast(1.0) saturate(1.0);
          }
          50% { 
            opacity: 0.7; 
            transform: translate(-50%, -50%) scale(1.0);
            filter: brightness(1.0) contrast(1.1) saturate(1.2);
          }
          75% { 
            opacity: 0.9; 
            transform: translate(-50%, -50%) scale(1.2);
            filter: brightness(1.1) contrast(1.2) saturate(1.3);
          }
          100% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1.4);
            filter: brightness(1.3) contrast(1.4) saturate(1.5);
          }
        }
        @keyframes textFadeOut {
          0% { 
            opacity: 1; 
            transform: translateY(0) scale(1);
            background: rgba(248, 250, 252, 0.9);
            backdropFilter: blur(15px);
          }
          30% { 
            opacity: 0.8; 
            transform: translateY(-5px) scale(0.98);
            background: rgba(248, 250, 252, 0.7);
            backdropFilter: blur(12px);
          }
          60% { 
            opacity: 0.5; 
            transform: translateY(-15px) scale(0.95);
            background: rgba(248, 250, 252, 0.4);
            backdropFilter: blur(8px);
          }
          100% { 
            opacity: 0.2; 
            transform: translateY(-30px) scale(0.9);
            background: rgba(248, 250, 252, 0.1);
            backdropFilter: blur(3px);
          }
        }
        @keyframes lineExpand {
          0% { width: 0px; }
          100% { width: 60px; }
        }
        @keyframes badgeFadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotsAppear {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes progressBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
});

// Main App Content Component
const AppContent = React.memo(() => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024 && window.innerWidth > 768);
  const [showSplash, setShowSplash] = useState(true);

  // Handle splash screen completion
  const handleSplashComplete = () => {
    console.log('Splash complete callback called');
    setShowSplash(false);
  };

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Modal functions
  const openModal = (index) => {
    setSelectedImage(index);
  };
  
  const closeModal = () => {
    setSelectedImage(null);
  };

  // Show splash screen
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} currentLanguage={currentLanguage} />;
  }

  return (
    <div style={{ overflow: 'hidden' }}>
      {/* Header */}
      <Header 
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        isMobile={isMobile}
        isTablet={isTablet}
      />

      {/* Hero Section with Animations
      <Hero 
        content={{
          hero: {
            title: currentLanguage === 'en' ? 'Expert Russian Translation Services' : 'Экспертные услуги перевода',
            subtitle: currentLanguage === 'en' ? 'Professional, accurate, and culturally-aware Russian translation services' : 'Профессиональные, точные и культурно-ориентированные услуги перевода',
            cta: currentLanguage === 'en' ? 'Get a Free Quote' : 'Получить бесплатную цену'
          }
        }}
        currentLanguage={currentLanguage}
      /> */}

      {/* About Section (Meet Sabrina) */}
      <div id="about">
        <About 
          currentLanguage={currentLanguage}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      </div>

      {/* Portfolio Section */}
      <div id="gallery">
        <Gallery 
          currentLanguage={currentLanguage}
          isMobile={isMobile}
          isTablet={isTablet}
          openModal={openModal}
        />
      </div>

      {/* Services Section */}
      <div id="services">
        <Services 
          currentLanguage={currentLanguage}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      </div>

      {/* Testimonials Section */}
      <div id="testimonials">
        <Testimonials 
          currentLanguage={currentLanguage}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <Contact 
          currentLanguage={currentLanguage}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      </div>

      {/* Image Modal */}
      <Modal
        isOpen={selectedImage !== null}
        onClose={closeModal}
        size="large"
        showCloseButton={true}
      >
        {selectedImage !== null && (
          <div style={{ textAlign: 'center' }}>
            <img
              src={GALLERY_IMAGES[selectedImage]?.src}
              alt={GALLERY_IMAGES[selectedImage]?.title}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '70vh',
                objectFit: 'contain',
                borderRadius: '12px'
              }}
            />
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '0.5rem'
              }}>
                {GALLERY_IMAGES[selectedImage]?.title}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#64748b',
                margin: 0
              }}>
                {GALLERY_IMAGES[selectedImage]?.desc}
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Chatbot */}
      <Suspense fallback={<div>Loading chat...</div>}>
        <Chatbot currentLanguage={currentLanguage} />
      </Suspense>
    </div>
  );
});

// Main App Component
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
  
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
