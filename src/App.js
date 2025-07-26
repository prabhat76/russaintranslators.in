import React, { useState, useEffect } from 'react';
import './App.css';
import SEO from './components/SEO';
import Chatbot from './components/Chatbot';
import SEODashboard from './components/SEODashboard';
import Analytics from './pages/Analytics';
import { contentEN } from './data/content-en';
import { contentRU } from './data/content-ru';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [analytics, setAnalytics] = useState({ visitors: 0, translations: 0, satisfaction: 0 });
  const [language, setLanguage] = useState('en');
  const content = language === 'en' ? contentEN : contentRU;
  
  // Check if analytics page is requested
  const isAnalyticsPage = window.location.pathname === '/analytics' || window.location.search.includes('page=analytics');

  // SEO Analytics tracking
  useEffect(() => {
    const trackVisit = () => {
      const visits = localStorage.getItem('visits') || 0;
      const newVisits = parseInt(visits) + 1;
      localStorage.setItem('visits', newVisits);
      
      setAnalytics({
        visitors: newVisits + 1247,
        translations: Math.floor(newVisits * 2.3) + 856,
        satisfaction: 98.5
      });
    };
    
    trackVisit();
    
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };
  
  if (isAnalyticsPage) {
    return <Analytics />;
  }

  return (
    <div className="App">
      <SEO />
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <span className="flag">🇷🇺</span>
            <span className="brand-text">Language Liberty</span>
          </div>
          
          <div className="language-toggle">
            <button 
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <button 
              className={`lang-btn ${language === 'ru' ? 'active' : ''}`}
              onClick={() => setLanguage('ru')}
            >
              RU
            </button>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#home" onClick={() => scrollToSection('home')}>{content.nav.home}</a>
            <a href="#about" onClick={() => scrollToSection('about')}>{content.nav.about}</a>
            <a href="#how-it-works" onClick={() => scrollToSection('how-it-works')}>{content.nav.howItWorks}</a>
            <a href="#services" onClick={() => scrollToSection('services')}>{content.nav.services}</a>
            <a href="#linkedin" onClick={() => scrollToSection('linkedin')}>{content.nav.linkedin}</a>
            <a href="#testimonials" onClick={() => scrollToSection('testimonials')}>{content.nav.testimonials}</a>
            <a href="#contact" onClick={() => scrollToSection('contact')}>{content.nav.contact}</a>
          </div>
          
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>{content.hero.title}</h1>
          <p>{content.hero.subtitle}</p>
          <div className="hero-cta">
            <button onClick={() => scrollToSection('contact')} className="cta-primary">
              {content.hero.cta1}
            </button>
            <button onClick={() => scrollToSection('services')} className="cta-secondary">
              {content.hero.cta2}
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">6+</span>
              <span className="stat-label">{content.hero.stats.experience}</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">{content.hero.stats.support}</span>
            </div>
            <div className="stat">
              <span className="stat-number">{analytics.satisfaction}%</span>
              <span className="stat-label">{content.hero.stats.satisfaction}</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>{content.about.title}</h2>
              <h3>{content.about.subtitle}</h3>
              <p>{content.about.description}</p>
              
              <div className="expertise">
                <h4>{content.about.proficiency}</h4>
                <div className="languages">
                  {content.about.languages.map((lang, index) => (
                    <span key={index} className="lang">{lang}</span>
                  ))}
                </div>
              </div>
              
              <div className="experience">
                <h4>{content.about.experienceTitle}</h4>
                <p>{content.about.experienceText}</p>
              </div>
            </div>
            
            <div className="about-image">
              <div className="profile-image">
                <img 
                  src="/images/sabrina-profile.jpg" 
                  alt="Sabrina Bhatt - Professional Russian Translator"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="image-fallback" style={{display: 'none'}}>
                  <span>👩‍💼</span>
                  <p>Sabrina Bhatt<br/>Russian Translator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <h2>How Our Translation Process Works</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Initial Consultation</h3>
                <p>Share your requirements via call or WhatsApp. We analyze your document type, deadline, and specific needs.</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Quote & Timeline</h3>
                <p>Receive instant quote with transparent pricing. Get 20% OFF on first booking with clear delivery timeline.</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Professional Translation</h3>
                <p>Native Russian speaker with cultural expertise translates your content with 99.9% accuracy guarantee.</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Quality Check & Delivery</h3>
                <p>Thorough proofreading and quality assurance before secure delivery via your preferred method.</p>
              </div>
            </div>
          </div>
          

        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">💻</div>
              <h3>Online Meetings</h3>
              <p>Professional real-time interpretation for Zoom, Teams, and WebEx conferences with crystal-clear audio quality</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🤝</div>
              <h3>Offline Meetings</h3>
              <p>Executive-level in-person interpretation for high-stakes business negotiations and diplomatic meetings</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">📄</div>
              <h3>Document Translation</h3>
              <p>Certified translation of legal contracts, technical manuals, medical reports, and official government documents</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🎓</div>
              <h3>Russian Language Training</h3>
              <p>Comprehensive Russian courses from survival basics to business fluency (A1-C1 levels) with cultural etiquette</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">✈️</div>
              <h3>Executive Travel Support</h3>
              <p>Personal interpreter companion for C-level executives during international business trips and trade missions</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🎭</div>
              <h3>Creative Industry Support</h3>
              <p>Specialized assistance for Russian artists, models, performers, and creative professionals working in India</p>
            </div>
          </div>
        </div>
      </section>

      {/* LinkedIn Section */}
      <section id="linkedin" className="linkedin-section">
        <div className="container">
          <h2>Connect with Sabrina on LinkedIn</h2>
          <p>Follow my professional journey and get insights into Russian business culture</p>
          
          <div className="linkedin-container">
            <div className="linkedin-profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  <img src="/images/sabrina-profile.jpg" alt="Sabrina Bhatt" onError={(e) => e.target.style.display = 'none'} />
                  <div className="linkedin-icon">💼</div>
                </div>
                <div className="profile-info">
                  <h3>Sabrina Bhatt</h3>
                  <p>Professional Russian Translator & Interpreter</p>
                  <p>📍 Mumbai, India • 🌐 Global Services</p>
                </div>
              </div>
              
              <div className="profile-stats">
                <div className="stat-item">
                  <strong>6+</strong>
                  <span>Years Experience</span>
                </div>
                <div className="stat-item">
                  <strong>500+</strong>
                  <span>Connections</span>
                </div>
                <div className="stat-item">
                  <strong>98.5%</strong>
                  <span>Success Rate</span>
                </div>
              </div>
              
              <div className="profile-highlights">
                <h4>Professional Highlights</h4>
                <ul>
                  <li>✅ Native Russian Speaker</li>
                  <li>✅ Fortune 500 Experience</li>
                  <li>✅ Ministerial-Level Meetings</li>
                  <li>✅ 24/7 Support Available</li>
                </ul>
              </div>
            </div>
            
            <div className="linkedin-cta">
              <a 
                href="https://www.linkedin.com/in/sabrina-bhatt-658aa0221/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="linkedin-btn"
              >
                <span className="linkedin-icon">💼</span>
                View Full LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <h2>What Our Clients Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Sabrina's interpretation during our Coal India negotiations was flawless. Her cultural insights helped us close a $50M deal with Russian partners."</p>
              </div>
              <div className="testimonial-author">
                <img src="/images/client1.jpg" alt="Client" onError={(e) => e.target.style.display = 'none'} />
                <div>
                  <h4>Rajesh Kumar</h4>
                  <span>CEO, Mining Corp India</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Professional, punctual, and precise. Sabrina translated our pharmaceutical patents with 100% accuracy. Highly recommended!"</p>
              </div>
              <div className="testimonial-author">
                <img src="/images/client2.jpg" alt="Client" onError={(e) => e.target.style.display = 'none'} />
                <div>
                  <h4>Dr. Priya Sharma</h4>
                  <span>Director, PharmaTech Ltd</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Excellent Russian language training! Sabrina's teaching helped our team successfully expand into Moscow markets."</p>
              </div>
              <div className="testimonial-author">
                <img src="/images/client3.jpg" alt="Client" onError={(e) => e.target.style.display = 'none'} />
                <div>
                  <h4>Amit Patel</h4>
                  <span>International Business Head</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Contact Information</h3>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <p><strong>Primary:</strong> +91-8789389223</p>
                  <p><strong>Secondary:</strong> +91-7304876702</p>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <p><strong>Location:</strong> Mumbai, India</p>
                  <p>Serving clients globally</p>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">⏰</span>
                <div>
                  <p><strong>Availability:</strong> 24/7 Support</p>
                  <p>Emergency translation services available</p>
                </div>
              </div>
              
              <div className="special-offer">
                <h4>🎉 Special Offer</h4>
                <p>Get <strong>20% OFF</strong> on your first booking!</p>
                <p>Professional Russian translation services with cultural expertise.</p>
              </div>
            </div>
            
            <div className="contact-form">
              <h3>Quick Quote Request</h3>
              <form className="quote-form">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Email Address" required />
                <input type="tel" placeholder="Phone Number" />
                <select required>
                  <option value="">Select Service</option>
                  <option value="online-meeting">Online Meeting Interpretation</option>
                  <option value="offline-meeting">Offline Meeting Interpretation</option>
                  <option value="document">Document Translation</option>
                  <option value="course">Russian Language Course</option>
                  <option value="travel">Travel Support</option>
                  <option value="artist">Artist Assistance</option>
                </select>
                <textarea placeholder="Project Details" rows="4"></textarea>
                <button type="submit" className="submit-btn">Get Free Quote</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>Language Liberty</h3>
              <p>Professional Russian Translation & Interpretation Services</p>
            </div>
            
            <div className="footer-links">
              <h4>Quick Links</h4>
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#services">Services</a>
              <a href="#linkedin">LinkedIn</a>
              <a href="#testimonials">Reviews</a>
              <a href="#contact">Contact</a>
            </div>
            
            <div className="footer-contact">
              <h4>Contact</h4>
              <p>📞 +91-8789389223</p>
              <p>📞 +91-7304876702</p>
              <p>📍 Mumbai, India</p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 Language Liberty. All rights reserved.</p>
            <p>Russian Translation & Interpretation Services | Mumbai | 24/7 Support</p>
          </div>
        </div>
      </footer>
      
      {/* Live Chatbot */}
      <Chatbot />
      

    </div>
  );
}

export default App;