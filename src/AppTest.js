import React, { useState, useCallback } from 'react';

// Simple splash screen component
const SplashScreen = ({ onComplete, currentLanguage }) => {
  React.useEffect(() => {
    console.log('SplashScreen mounted');
    const timer = setTimeout(() => {
      console.log('SplashScreen timer complete');
      if (onComplete) {
        onComplete();
      }
    }, 2500); // Reduced to 2.5 seconds
    
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
        boxShadow: '0 20px 40px rgba(30,58,138,0.1)'
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
            border: '2px solid rgba(30,58,138,0.1)'
          }}
        />
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '900',
          marginBottom: '1rem',
          color: '#1e3a8a',
          textShadow: 'none'
        }}>
          Language Liberty
        </h1>
        <p style={{
          fontSize: '1.3rem',
          opacity: 0.8,
          marginBottom: '1.5rem',
          color: '#475569'
        }}>
          {currentLanguage === 'ru' 
            ? 'Профессиональные услуги русско-английского перевода'
            : 'Professional Russian-English Translation Services'
          }
        </p>
        <div style={{
          fontSize: '2.5rem',
          marginBottom: '1rem'
        }}>
          🇺🇸 ⟷ 🇷🇺
        </div>
        <div style={{
          fontSize: '1rem',
          opacity: 0.7,
          fontStyle: 'italic',
          color: '#64748b'
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

// Temporary simple main content
const MainContent = () => (
  <div style={{ fontFamily: 'Arial, sans-serif' }}>
    {/* Header */}
    <header style={{
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
      color: 'white',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/images/download.webp" alt="Language Liberty Logo" style={{ width: '50px', height: '50px', borderRadius: '10px' }} />
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Language Liberty</h1>
            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>Professional Russian Translation Services</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span>🇺🇸 ⟷ 🇷🇺</span>
          <a href="tel:+918789389223" style={{ color: 'white', textDecoration: 'none', background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '5px' }}>
            📞 +91-8789389223
          </a>
        </div>
      </div>
    </header>

    {/* Meet Sabrina Section */}
    <section style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '4rem 2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '4rem', 
          alignItems: 'center',
          '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
            gap: '2rem'
          }
        }}>
          {/* Text Content */}
          <div>
            <div style={{ 
              color: '#1e3a8a', 
              fontSize: '1rem', 
              fontWeight: '600', 
              textTransform: 'uppercase', 
              letterSpacing: '1px',
              marginBottom: '1rem'
            }}>
              About Your Translator
            </div>
            <h2 style={{ 
              fontSize: '3.5rem', 
              color: '#1e3a8a', 
              marginBottom: '1rem',
              fontWeight: '900',
              lineHeight: '1.1'
            }}>
              Meet Sabrina
            </h2>
            <div style={{ 
              fontSize: '1.3rem', 
              color: '#475569', 
              marginBottom: '2rem',
              fontWeight: '500'
            }}>
              Professional Russian-English Translation Services
            </div>
            
            {/* Description */}
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ 
                color: '#64748b', 
                lineHeight: '1.7', 
                marginBottom: '1.5rem',
                fontSize: '1.1rem'
              }}>
                Born to a Russian mother and an Indian father, I bridge communication gaps between Russian-speaking countries and the world. With education in Russia, Uzbekistan, and India, I bring authentic cultural understanding to every translation project.
              </p>
              <p style={{ 
                color: '#64748b', 
                lineHeight: '1.7', 
                marginBottom: '1.5rem',
                fontSize: '1.1rem'
              }}>
                With 6+ years of professional experience, I specialize in business interpretation, document translation, and cultural consultation for companies expanding into Russian markets.
              </p>
            </div>

            {/* Credentials */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '1rem', 
              marginBottom: '2rem' 
            }}>
              {[
                { icon: '🎓', title: 'CERTIFIED', subtitle: 'TRANSLATOR' },
                { icon: '🌍', title: 'MULTICULTURAL', subtitle: 'BACKGROUND' },
                { icon: '💼', title: 'BUSINESS', subtitle: 'SPECIALIST' }
              ].map((credential, index) => (
                <div key={index} style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '15px',
                  textAlign: 'center',
                  border: '1px solid rgba(30,58,138,0.1)',
                  boxShadow: '0 4px 20px rgba(30,58,138,0.05)'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{credential.icon}</div>
                  <div style={{ 
                    fontSize: '0.9rem', 
                    fontWeight: '700', 
                    color: '#1e3a8a',
                    marginBottom: '0.2rem'
                  }}>
                    {credential.title}
                  </div>
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: '#64748b',
                    fontWeight: '500'
                  }}>
                    {credential.subtitle}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button style={{
                background: '#1e3a8a',
                color: 'white',
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(30,58,138,0.3)',
                transition: 'all 0.3s ease'
              }}>
                GET QUOTE
              </button>
              <button style={{
                background: 'transparent',
                color: '#1e3a8a',
                padding: '1rem 2rem',
                border: '2px solid #1e3a8a',
                borderRadius: '10px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                📞 CALL NOW
              </button>
            </div>
          </div>

          {/* Image */}
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img 
                src="/images/sabrina-profile.jpeg" 
                alt="Sabrina Bhatt - Professional Russian Translator" 
                style={{
                  width: '350px',
                  height: '400px',
                  borderRadius: '25px',
                  objectFit: 'cover',
                  boxShadow: '0 25px 50px rgba(30,58,138,0.2)',
                  border: '4px solid white'
                }}
              />
              {/* Floating Elements */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '-20px',
                background: 'white',
                padding: '1rem',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(30,58,138,0.15)',
                fontSize: '2rem'
              }}>
                🌍
              </div>
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '-20px',
                background: 'white',
                padding: '1rem',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(30,58,138,0.15)',
                fontSize: '2rem'
              }}>
                💼
              </div>
              <div style={{
                position: 'absolute',
                top: '50%',
                right: '-30px',
                background: 'white',
                padding: '1rem',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(30,58,138,0.15)',
                fontSize: '2rem'
              }}>
                🔗
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Services Section */}
    <section style={{ padding: '4rem 2rem', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '2.5rem', color: '#1e3a8a', marginBottom: '1rem', fontWeight: '900' }}>Our Services</h3>
          <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
            Professional Russian-English translation and interpretation services tailored to your business needs
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {[
            { 
              icon: '�️', 
              badge: 'ZOOM',
              title: 'Virtual Meeting Interpretation', 
              desc: 'Real-time Russian-English interpretation for Zoom, Teams, and Google Meet sessions with crystal-clear audio quality.',
              features: ['HD Audio Quality', 'Screen Sharing Support', '24/7 Availability'],
              popular: true
            },
            { 
              icon: '🤝', 
              badge: 'BUSINESS',
              title: 'In-Person Business Meetings', 
              desc: 'Professional on-site interpretation for corporate meetings, negotiations, and conferences across Mumbai and India.',
              features: ['Ministerial Level Experience', 'Confidentiality Assured', 'Industry Expertise']
            },
            { 
              icon: '📋', 
              badge: 'CERTIFIED',
              title: 'Certified Document Translation', 
              desc: 'Official translation of legal documents, contracts, certificates, and technical manuals with government certification.',
              features: ['Legal Certification', 'Fast Turnaround', 'Technical Accuracy']
            },
            { 
              icon: '🎓', 
              badge: 'TRAINING',
              title: 'Russian Language Training', 
              desc: 'Comprehensive Russian language courses from beginner to advanced levels, including business etiquette and cultural training.',
              features: ['A1 to C1 Levels', 'Cultural Etiquette', 'Business Russian']
            },
            { 
              icon: '✈️', 
              badge: 'TRAVEL',
              title: 'Executive Travel Support', 
              desc: 'Personal interpreter services for business executives traveling to Russian-speaking countries or hosting Russian delegates.',
              features: ['Airport Assistance', 'Cultural Guidance', '24/7 Support']
            },
            { 
              icon: '🎬', 
              badge: 'ENTERTAINMENT',
              title: 'Entertainment Industry Support', 
              desc: 'Specialized services for Russian artists, models, and performers working in India, including script reading and agency coordination.',
              features: ['Script Translation', 'Agency Coordination', 'Cultural Adaptation']
            }
          ].map((service, index) => (
            <div key={index} style={{
              background: service.popular ? 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)' : '#f8fafc',
              color: service.popular ? 'white' : '#1e3a8a',
              padding: '2.5rem',
              borderRadius: '20px',
              border: service.popular ? 'none' : '1px solid #e2e8f0',
              boxShadow: service.popular ? '0 25px 50px rgba(30,58,138,0.3)' : '0 10px 30px rgba(30,58,138,0.1)',
              position: 'relative',
              transform: service.popular ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.3s ease'
            }}>
              {/* Popular Badge */}
              {service.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#fbbf24',
                  color: '#1e3a8a',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  boxShadow: '0 5px 15px rgba(251,191,36,0.3)'
                }}>
                  Most Popular
                </div>
              )}
              
              {/* Service Icon with Badge */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  position: 'relative',
                  background: service.popular ? 'rgba(255,255,255,0.2)' : 'white',
                  padding: '1.5rem',
                  borderRadius: '20px',
                  border: service.popular ? 'none' : '2px solid #e2e8f0'
                }}>
                  <div style={{ fontSize: '3rem' }}>{service.icon}</div>
                  <div style={{
                    position: 'absolute',
                    bottom: '-8px',
                    right: '-8px',
                    background: service.popular ? '#fbbf24' : '#1e3a8a',
                    color: service.popular ? '#1e3a8a' : 'white',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '10px',
                    fontSize: '0.7rem',
                    fontWeight: '700'
                  }}>
                    {service.badge}
                  </div>
                </div>
              </div>
              
              {/* Service Content */}
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ 
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: service.popular ? 'white' : '#1e3a8a'
                }}>
                  {service.title}
                </h4>
                <p style={{ 
                  lineHeight: '1.6', 
                  marginBottom: '1.5rem',
                  color: service.popular ? 'rgba(255,255,255,0.9)' : '#64748b'
                }}>
                  {service.desc}
                </p>
                
                {/* Features List */}
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: 0,
                  textAlign: 'left'
                }}>
                  {service.features.map((feature, i) => (
                    <li key={i} style={{
                      padding: '0.5rem 0',
                      borderBottom: i < service.features.length - 1 ? `1px solid ${service.popular ? 'rgba(255,255,255,0.2)' : '#e2e8f0'}` : 'none',
                      color: service.popular ? 'rgba(255,255,255,0.9)' : '#64748b',
                      fontSize: '0.9rem'
                    }}>
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Contact Section */}
    <section style={{ background: '#1e3a8a', color: 'white', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Contact Us</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <h4>📞 Call Us</h4>
            <p>+91-8789389223</p>
            <p>+91-7304876702</p>
          </div>
          <div>
            <h4>✉️ Email Us</h4>
            <p>sabrina@languageliberty.com</p>
          </div>
          <div>
            <h4>💬 WhatsApp</h4>
            <p>Quick chat for instant quotes</p>
          </div>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '2rem',
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <h4 style={{ marginBottom: '1rem' }}>🎉 Special Offer</h4>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>20% OFF First Booking</p>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer style={{ background: '#0f172a', color: 'white', padding: '2rem', textAlign: 'center' }}>
      <p>© 2025 Language Liberty. All rights reserved. | Professional Russian Translation Services</p>
    </footer>
  </div>
);

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentLanguage] = useState(() => {
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('ru') ? 'ru' : 'en';
  });

  console.log('App rendering - showSplash:', showSplash);

  const handleSplashComplete = useCallback(() => {
    console.log('Splash complete called');
    setShowSplash(false);
  }, []);

  if (showSplash) {
    return (
      <SplashScreen
        onComplete={handleSplashComplete}
        currentLanguage={currentLanguage}
      />
    );
  }

  return <MainContent />;
}

export default App;
