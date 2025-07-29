import React, { useState, useEffect } from 'react';
import './App.css';
import Chatbot from './components/Chatbot';

function App() {
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
    // SEO Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: 'Russian Translation Services - Language Liberty',
        page_location: window.location.href
      });
    }
  }, []);

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <img src="/images/download.webp" alt="Language Liberty Logo" className="logo" />
            <div className="brand-text">
              <h3>LANGUAGE LIBERTY</h3>
              <span>Your Russian Translator & Interpreter</span>
            </div>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact Us</a>
            <a href="tel:+918789389223" className="nav-cta">📞 Call Now</a>
          </div>
          
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-image">
          <img src="/images/sabrina-profile.jpeg" alt="Russian Translation Services" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h1>About me</h1>
              <h4>SABRINA BHATT</h4>
              <p>Born to a Russian mother and an Indian father, she always enjoyed burning the communicational bridges between Russian speaking countries and the rest of the world. She was born in Russia and has done her schooling in parts of Russia and Uzbekistan. She is now here, providing Russian Translation and Interpretation service to help various companies grow.</p>
              
              <h4>Language Proficiency</h4>
              <p>As her higher education and college was done in India, her proficiency in Hindi, English and Russian is now helping corporate companies in having easy and efficient communication with countries like Russia, Ukraine, Belarus, Uzbekistan, Kazakhstan etc., So if you need russian translator in Mumbai or interpreter in Mumbai please feel free to contact us.</p>
              
              <h4>Experience</h4>
              <p>Having an experience of more than 6 years of working with different companies who are into pharmaceuticals, chemicals, mining and export/import businesses she is currently working with Enrika Trades and Services Pvt. Ltd. She regularly attends meeting at a ministerial level with several companies like Coal India, Belaz, Artek Surfin Chemical Ltd and many more.</p>
            </div>
            
            <div className="about-image">
              <img src="/images/sabrina-profile.jpeg" alt="Sabrina Bhatt" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery">
        <div className="container">
          <h2>Professional Work Gallery</h2>
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
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2>Services Offered</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">💻</div>
              <h3>Online Meetings</h3>
              <p>Interpretation/translation service for online meetings.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🤝</div>
              <h3>Offline Meetings</h3>
              <p>Interpretation/translation service for offline meetings.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">📄</div>
              <h3>Documentation</h3>
              <p>Translation service for official/unofficial letters, documents, emails etc.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🎓</div>
              <h3>Survival Russian Course/Etiquette Training</h3>
              <p>Survival Russian course, greetings and basic etiquettes courses for employees visiting Russian speaking countries</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">✈️</div>
              <h3>Official Travel</h3>
              <p>Travel with the senior team of a company for meetings held within the country and abroad</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🗣️</div>
              <h3>Communicational Assistance</h3>
              <p>Communicational assistance to Russian clients while their stay in India and Indian clients while their stay in Russia</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">📱</div>
              <h3>Online Communicational Assistance</h3>
              <p>Communicational assistance to Russian/Indian clients though emails, WhatsApp, and other social media platforms.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🎭</div>
              <h3>Artists Training And Assistance</h3>
              <p>Communicational assistance to Russian models, actors, and other artists during their stay in India (including shoots, auditions, script readings and dealing with agencies)</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">👨‍🏫</div>
              <h3>Personal Classes</h3>
              <p>Personal Russian classes – level A-1, A-2, A-3 (speaking, reading ,talking)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h6>Contact Us (+91)-8789389223 (+91)-7304876702</h6>
              <p>Book your Russian Interpreter in Mumbai now.</p>
              <p>Get 20% OFF on your first booking. Russian translation and interpretation service is now providing 24 hours of communicational assistance.</p>
            </div>
            <div className="contact-image">
              <img src="/images/contact-image.jpg" alt="Contact Us" />
            </div>
          </div>
        </div>
      </section>

      {/* Appointments Section */}
      <section className="appointments">
        <div className="container">
          <h2>Online Appointments</h2>
          <div className="appointment-card">
            <h3>Senior Translator and Interpreter</h3>
            <div className="service-item">
              <h4>Consultation</h4>
              <p>30 mins | Free</p>
              <p>Get consultation from our certified translators and discuss about your requirement in details. All our Russian translators in India are Russian Native...</p>
              <button className="book-btn">BOOK</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p><strong>Language Liberty - Russian Translation & Interpretation Services</strong></p>
            <p>Professional Russian translation services in Mumbai with 6+ years of experience. Expert Russian-English translator for businesses and individuals.</p>
            
            <div className="services-list">
              <h4>Our Services</h4>
              <ul>
                <li><strong>Online/Offline Meetings:</strong> Real-time Russian interpretation</li>
                <li><strong>Document Translation:</strong> Official documents and technical content</li>
                <li><strong>Russian Language Course:</strong> Professional training and etiquette</li>
                <li><strong>Travel Support:</strong> Linguistic aid for business meetings</li>
                <li><strong>Communication Assistance:</strong> 24/7 support via multiple channels</li>
                <li><strong>Artist Support:</strong> Assistance for Russian artists in India</li>
              </ul>
            </div>
            
            <div className="why-choose">
              <h4>Why Choose Us?</h4>
              <ul>
                <li><strong>Expert Translator:</strong> Native Russian speaker with Indian education</li>
                <li><strong>Proven Experience:</strong> 6+ years working with top companies</li>
                <li><strong>24/7 Availability:</strong> Round-the-clock support</li>
                <li><strong>Special Offer:</strong> 20% OFF on first booking</li>
              </ul>
            </div>
            
            <p><strong>Contact: +91-8789389223 | +91-7304876702</strong></p>
            <p><strong>Email: sabrina@languageliberty.com</strong></p>
            
            <div className="footer-bottom">
              <p>Copyright © 2025 Language Liberty - All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
      
      <Chatbot />
      
      {/* Image Modal */}
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
}

export default App;