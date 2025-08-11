import React, { useState, useEffect, lazy, Suspense } from 'react';
import './App.css';
import Header from './components/sections/Header';
import About from './components/sections/About';
import MobilePortfolio from './components/sections/MobilePortfolio.simple';
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
            ? 'Загрузка переводческих услуг...'
            : 'Loading translation services...'
          }
        </div>
      </div>

      {/* Splash Screen Animations */}
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0.5) rotate(-10deg);
            opacity: 0;
          }
          to {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

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

      {/* Mobile Portfolio Section */}
      <MobilePortfolio 
        currentLanguage={currentLanguage}
        isMobile={isMobile}
        isTablet={isTablet}
      />

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
  
  return <AppContent />;
}

export default App;
