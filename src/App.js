import React, { useState, useEffect } from 'react';
import './App.css';
import Chatbot from './components/Chatbot';
import SEO from './components/SEO';

import { ContentProvider, useContentContext } from './contexts/ContentContext';

const AppContent = () => {
  const { content, currentLanguage, changeLanguage, loading } = useContentContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = [
    {src: '/images/sabrina-work-1.jpeg', title: 'Corporate Meeting', desc: 'Russian-English interpretation for business negotiations'},
    {src: '/images/sabrina-work-2.jpeg', title: 'International Conference', desc: 'Simultaneous translation services'},
    {src: '/images/sabrina-work-3.jpeg', title: 'Document Translation', desc: 'Official document certification and translation'},
    {src: '/images/sabrina-work-4.jpeg', title: 'Ministerial Level Meeting', desc: 'High-level diplomatic interpretation'},
    {src: '/images/sabrina-work-5.jpeg', title: 'Trade Negotiations', desc: 'Export-import business interpretation'},
    {src: '/images/sabrina-work-6.jpeg', title: 'Professional Consultation', desc: 'Technical translation and advisory services'},
    {src: '/images/sabrina-work-7.jpeg', title: 'Client Consultation', desc: 'Personalized translation service planning'},
    {src: '/images/sabrina-work-8.jpeg', title: 'Language Training', desc: 'Russian language course and etiquette training'},
    {src: '/images/sabrina-work-9.jpeg', title: 'Virtual Interpretation', desc: 'Online meeting translation services'},
    {src: '/images/sabrina-work-10.jpeg', title: 'Industry Expertise', desc: 'Specialized translation for various sectors'}
  ];

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setSelectedImage(galleryImages[index]);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % galleryImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(galleryImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(galleryImages[prevIndex]);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: 'Russian Translation Services - Language Liberty',
        page_location: window.location.href
      });
    }

    const checkMobile = () => window.innerWidth <= 768;
    if (checkMobile()) {
      const galleryGrid = document.querySelector('.gallery-grid');
      if (galleryGrid) {
        let scrollPosition = 0;
        const cardWidth = window.innerWidth <= 480 ? 250 : 280;
        const gap = window.innerWidth <= 480 ? 12 : 15;
        
        const interval = setInterval(() => {
          if (!checkMobile()) {
            clearInterval(interval);
            return;
          }
          scrollPosition += cardWidth + gap;
          if (scrollPosition >= galleryGrid.scrollWidth - galleryGrid.clientWidth) {
            scrollPosition = 0;
          }
          galleryGrid.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        }, 3000);

        return () => clearInterval(interval);
      }
    }
  }, []);

  if (loading || !content) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <header className="header">
        <div className="header-top">
          <div className="container">
            <div className="header-info">
              <div className="info-item">
                <span className="info-icon">📞</span>
                <a href="tel:+918789389223">+91-8789389223</a>
              </div>
              <div className="info-item">
                <span className="info-icon">✉️</span>
                <a href="mailto:sabrina@languageliberty.com">sabrina@languageliberty.com</a>
              </div>
              <div className="info-item">
                <span className="info-icon">📍</span>
                <span>Mumbai, India</span>
              </div>
            </div>
            <div className="header-actions">
              <div className="language-badge">
                <span className="flag">🇷🇺</span>
                <span>Russian Expert</span>
              </div>
              <div className="experience-badge">
                <span className="years">6+</span>
                <span>Years Experience</span>
              </div>
            </div>
          </div>
        </div>
        
        <nav className="nav">
          <div className="container">
            <div className="nav-brand">
              <img src="/images/download.webp" alt="Language Liberty Logo" className="logo" />
              <div className="brand-text">
                <h3>LANGUAGE LIBERTY</h3>
                <span>Professional Russian Translation Services</span>
              </div>
            </div>
            
            <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              <a href="#home" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</a>
              <a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About Sabrina</a>
              <a href="#services" className="nav-link" onClick={() => setIsMenuOpen(false)}>Services</a>
              <a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</a>
              <div className="nav-cta-group">
                <a href="https://wa.me/918789389223" className="nav-cta whatsapp" onClick={() => setIsMenuOpen(false)}>💬 WhatsApp</a>
                <a href="tel:+918789389223" className="nav-cta call" onClick={() => setIsMenuOpen(false)}>📞 Call Now</a>
              </div>
            </div>
            
            <button 
              className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </header>

      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-video">
            <video 
              src="/images/sabrina-intro-video.mp4" 
              autoPlay 
              muted 
              loop 
              playsInline
              className="hero-video-element"
            />
            <div className="video-overlay">
              <h1>Professional Russian Translation Services</h1>
              <p>Expert Russian-English interpreter with 6+ years of experience</p>
              <div className="hero-cta">
                <a href="tel:+918789389223" className="cta-button primary">📞 Call Now</a>
                <a href="#about" className="cta-button secondary">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h1>Meet Sabrina Bhatt</h1>
              <h4>Your Russian Translation Expert</h4>
              <p>{content.about.description}</p>
              <h4>{content.about.proficiency}</h4>
              <p>{content.about.experienceText}</p>
            </div>
            
            <div className="about-image">
              <img src="/images/sabrina-profile.jpeg" alt="Sabrina Bhatt" />
            </div>
          </div>
        </div>
      </section>

      <section className="gallery">
        <div className="container">
          <h2>{currentLanguage === 'en' ? 'Professional Work Gallery' : 'Галерея профессиональных работ'}</h2>
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div key={index} className="gallery-item" onClick={() => openModal(index)}>
                <img src={image.src} alt={image.title} />
                <div className="gallery-overlay">
                  <h4>{image.title}</h4>
                  <p>{image.desc}</p>
                </div>
              </div>
            ))}
          </div> {/* Close .gallery-grid */}
        </div> {/* Close .container for gallery */}
      </section> {/* Close gallery section */}

      <section id="services" className="services">
        <div className="container">
          <div className="services-header">
            <h2>Professional Translation Services</h2>
            <p>Comprehensive Russian-English language solutions for businesses and individuals</p>
          </div>
          <h2>{content.services.title}</h2>
          <div className="services-grid">
            <div className="service-card featured">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop" alt="Virtual Meetings" />
              </div>
              <div className="service-content">
                <div className="service-badge">Most Popular</div>
                <h3>Virtual Meeting Interpretation</h3>
                <p>Real-time Russian-English interpretation for Zoom, Teams, and Google Meet sessions with crystal-clear audio quality.</p>
                <ul className="service-features">
                  <li>✓ HD Audio Quality</li>
                  <li>✓ Screen Sharing Support</li>
                  <li>✓ 24/7 Availability</li>
                </ul>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop" alt="Online Meetings" />
              </div>
              <div className="service-content">
                <h3>{content.services.items[0].title}</h3>
                <p>{currentLanguage === 'en' ? content.services.items[0].description : 'Профессиональный перевод в реальном времени с английского и хинди на русский для конференций Zoom, Teams и WebEx'}</p>
                <ul className="service-features">
                  <li>✓ Real-time Translation</li>
                  <li>✓ Multiple Platforms</li>
                  <li>✓ Professional Quality</li>
                </ul>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop" alt="Business Meetings" />
              </div>
              <div className="service-content">
                <h3>In-Person Business Meetings</h3>
                <p>Professional on-site interpretation for corporate meetings, negotiations, and conferences across Mumbai and India.</p>
                <ul className="service-features">
                  <li>✓ Ministerial Level Experience</li>
                  <li>✓ Confidentiality Assured</li>
                  <li>✓ Industry Expertise</li>
                </ul>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop" alt="Document Translation" />
              </div>
              <div className="service-content">
                <h3>Certified Document Translation</h3>
                <p>Official translation of legal documents, contracts, certificates, and technical manuals with government certification.</p>
                <ul className="service-features">
                  <li>✓ Legal Certification</li>
                  <li>✓ Fast Turnaround</li>
                  <li>✓ Technical Accuracy</li>
                </ul>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop" alt="Russian Language Training" />
              </div>
              <div className="service-content">
                <h3>Russian Language Training</h3>
                <p>Comprehensive Russian language courses from beginner to advanced levels, including business etiquette and cultural training.</p>
                <ul className="service-features">
                  <li>✓ A1 to C1 Levels</li>
                  <li>✓ Cultural Etiquette</li>
                  <li>✓ Business Russian</li>
                </ul>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop" alt="Travel Support" />
              </div>
              <div className="service-content">
                <h3>Executive Travel Support</h3>
                <p>Personal interpreter services for business executives traveling to Russian-speaking countries or hosting Russian delegates.</p>
                <ul className="service-features">
                  <li>✓ Airport Assistance</li>
                  <li>✓ Cultural Guidance</li>
                  <li>✓ 24/7 Support</li>
                </ul>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop" alt="Entertainment Industry" />
              </div>
              <div className="service-content">
                <h3>Entertainment Industry Support</h3>
                <p>Specialized services for Russian artists, models, and performers working in India, including script reading and agency coordination.</p>
                <ul className="service-features">
                  <li>✓ Script Translation</li>
                  <li>✓ Agency Coordination</li>
                  <li>✓ Cultural Adaptation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-header">
            <h2>Get In Touch</h2>
            <p>Ready to break language barriers? Contact us for professional Russian translation services</p>
          </div>
          <div className="contact-content">
            <div className="contact-cards">
              <div className="contact-card">
                <div className="contact-icon">📞</div>
                <h3>Call Us</h3>
                <p>Speak directly with our experts</p>
                <div className="contact-details">
                  <a href="tel:+918789389223">+91-8789389223</a>
                  <a href="tel:+917304876702">+91-7304876702</a>
                </div>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">✉️</div>
                <h3>Email Us</h3>
                <p>Send us your requirements</p>
                <div className="contact-details">
                  <a href="mailto:sabrina@languageliberty.com">sabrina@languageliberty.com</a>
                </div>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">💬</div>
                <h3>WhatsApp</h3>
                <p>Quick chat for instant quotes</p>
                <div className="contact-details">
                  <a href="https://wa.me/918789389223">Message on WhatsApp</a>
                </div>
              </div>
              
              <div className="contact-card special-offer">
                <div className="contact-icon">🎉</div>
                <h3>Special Offer</h3>
                <p>First-time clients get</p>
                <div className="offer-badge">20% OFF</div>
              </div>
            </div>
            
            <div className="contact-form-section">
              <div className="contact-image">
                <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=600&fit=crop" alt="Professional Translator" />
              </div>
              <div className="contact-form">
                <h3>Request a Quote</h3>
                <form className="quote-form">
                  <div className="form-group">
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Email Address" required />
                  </div>
                  <div className="form-group">
                    <input type="tel" placeholder="Phone Number" />
                    <select required>
                      <option value="">Select Service</option>
                      <option value="virtual">Virtual Meeting Interpretation</option>
                      <option value="business">Business Meeting</option>
                      <option value="document">Document Translation</option>
                      <option value="training">Language Training</option>
                      <option value="travel">Travel Support</option>
                    </select>
                  </div>
                  <textarea placeholder="Describe your requirements..." rows="4" required></textarea>
                  <button type="submit" className="submit-btn">Get Free Quote</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="appointments">
        <div className="container">
          <div className="appointments-header">
            <h2>Book Your Appointment</h2>
            <p>Choose the perfect consultation package for your translation needs</p>
          </div>
          <div className="appointments-grid">
            <div className="appointment-card free">
              <div className="appointment-badge">Most Popular</div>
              <div className="appointment-icon">💬</div>
              <h3>Free Consultation</h3>
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
              <button className="book-btn primary" onClick={() => window.open('tel:+918789389223')}>Book Free Call</button>
            </div>
            
            <div className="appointment-card premium">
              <div className="appointment-icon">🎯</div>
              <h3>Business Strategy Session</h3>
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
              <button className="book-btn secondary" onClick={() => window.open('https://wa.me/918789389223')}>Book Strategy Call</button>
            </div>
            
            <div className="appointment-card urgent">
              <div className="appointment-icon">⚡</div>
              <h3>Urgent Support</h3>
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
              <button className="book-btn urgent-btn" onClick={() => window.open('tel:+918789389223')}>Call Now</button>
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
      
      <Chatbot language={currentLanguage} />
      
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedImage(null)}>×</button>
            <button className="modal-nav modal-prev" onClick={prevImage}>‹</button>
            <button className="modal-nav modal-next" onClick={nextImage}>›</button>
            <img src={selectedImage.src} alt={selectedImage.title} />
            <div className="modal-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.desc}</p>
              <div className="modal-counter">{currentImageIndex + 1} / {galleryImages.length}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
}

export default App;