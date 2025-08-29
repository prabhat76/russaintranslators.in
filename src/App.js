import React, { useState, useEffect, lazy, Suspense } from 'react';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/sections/Header';
import About from './components/sections/About';
import Portfolio from './components/sections/Portfolio';
import Services from './components/sections/Services';
import Gallery from './components/sections/Gallery';
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
    }, 2500);
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
      <img
        src="/images/handshake-flags.png"
        alt="India and Russia handshake"
        style={{
          width: '240px',
          height: '240px',
          marginBottom: '2rem',
          animation: 'zoomInOut 2.2s ease-in-out infinite',
          willChange: 'transform',
          contain: 'strict'
        }}
        loading="eager"
        decoding="async"
      />
      <h1 style={{
        fontSize: '2.2rem',
        fontWeight: '800',
        marginBottom: '0.7rem',
        color: '#1e3a8a',
        letterSpacing: '0.01em',
        textTransform: 'uppercase'
      }}>
        LANGUAGE LIBERTY
      </h1>
      <div style={{
        fontSize: '1.1rem',
        color: '#475569',
        opacity: 0.85
      }}>
        Your Russian Translator & Interpreter
      </div>
      <style>{`
        @keyframes zoomInOut {
          0% { transform: scale(1); }
          40% { transform: scale(1.12); }
          60% { transform: scale(0.96); }
          100% { transform: scale(1); }
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

      {/* About Section (Meet Sabrina) */}
      <div id="about">
        <About 
          currentLanguage={currentLanguage}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      </div>

      {/* Gallery Section */}
      <div id="gallery">
        <Gallery 
          currentLanguage={currentLanguage}
          isMobile={isMobile}
          isTablet={isTablet}
          openModal={openModal}
        />
      </div>

      {/* Portfolio Section */}
      <div id="portfolio">
        <Portfolio 
          currentLanguage={currentLanguage}
          isMobile={isMobile}
          isTablet={isTablet}
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
