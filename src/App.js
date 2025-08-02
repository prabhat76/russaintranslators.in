import React, { useState, useEffect } from 'react';
import './App.css';
import Chatbot from './components/Chatbot';
import SEO from './components/SEO';
import VideoIntro from './components/VideoIntro';
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
      <SEO />
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <img src="/images/download.webp" alt="Language Liberty Logo" className="logo" />
            <div className="brand-text">
              <h3>LANGUAGE LIBERTY</h3>
              <span>{currentLanguage === 'en' ? 'Your Russian Translator & Interpreter' : 'Ваш русский переводчик и интерпретатор'}</span>
            </div>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#home" onClick={() => setIsMenuOpen(false)}>{content.nav.home}</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>{content.nav.about}</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)}>{content.nav.services}</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>{content.nav.contact}</a>
            <a href="tel:+918789389223" className="nav-cta" onClick={() => setIsMenuOpen(false)}>📞 {currentLanguage === 'en' ? 'Call Now' : 'Звонить'}</a>
          </div>
          
          <div className="language-toggle">
            <button 
              className={`lang-btn ${currentLanguage === 'en' ? 'active' : ''}`}
              onClick={() => changeLanguage('en')}
            >
              EN
            </button>
            <button 
              className={`lang-btn ${currentLanguage === 'ru' ? 'active' : ''}`}
              onClick={() => changeLanguage('ru')}
            >
              RU
            </button>
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
          <img 
            src="/images/sabrina-profile.jpeg" 
            alt="Russian Translation Services" 
            onClick={() => {
              setCurrentImageIndex(0);
              setSelectedImage({src: '/images/sabrina-profile.jpeg', title: 'Sabrina Bhatt - Russian Translation Expert', desc: 'Professional Russian translator and interpreter with 6+ years of experience'});
            }}
            style={{cursor: 'pointer'}}
          />
        </div>
      </section>

      {/* Video Introduction Section */}
      <VideoIntro />

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h4>{content.about.proficiency}</h4>
              <p>{content.about.experienceText}</p>
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
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2>{content.services.title}</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">💻</div>
              <h3>{content.services.items[0].title}</h3>
              <p>{currentLanguage === 'en' ? content.services.items[0].description : 'Профессиональный перевод в реальном времени с английского и хинди на русский для конференций Zoom, Teams и WebEx'}</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🤝</div>
              <h3>{content.services.items[1].title}</h3>
              <p>{currentLanguage === 'en' ? content.services.items[1].description : 'Устный перевод с английского и хинди на русский для важных деловых переговоров и дипломатических встреч'}</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">📄</div>
              <h3>{content.services.items[2].title}</h3>
              <p>{currentLanguage === 'en' ? content.services.items[2].description : 'Сертифицированный перевод документов с английского и хинди на русский: юридические контракты, технические руководства, медицинские отчеты'}</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🎓</div>
              <h3>{content.services.items[3].title}</h3>
              <p>{currentLanguage === 'en' ? content.services.items[3].description : 'Обучение русскому языку для англо- и хиндиговорящих: от базового до делового уровня (A1-C1) с культурным этикетом'}</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">✈️</div>
              <h3>{content.services.items[4].title}</h3>
              <p>{currentLanguage === 'en' ? content.services.items[4].description : 'Личный переводчик с английского/хинди на русский для руководителей во время международных деловых поездок'}</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🗣️</div>
              <h3>{content.additionalServices.communicationalAssistance.title}</h3>
              <p>{content.additionalServices.communicationalAssistance.description}</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">📱</div>
              <h3>{content.additionalServices.onlineAssistance.title}</h3>
              <p>{content.additionalServices.onlineAssistance.description}</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🎭</div>
              <h3>{content.services.items[5].title}</h3>
              <p>{content.services.items[5].description}</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">👨‍🏫</div>
              <h3>{content.additionalServices.personalClasses.title}</h3>
              <p>{content.additionalServices.personalClasses.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h6>{content.contact.title}</h6>
              <p>{content.contact.subtitle}</p>
              <p>{content.contact.description}</p>
            </div>
            <div className="contact-card">
              <div className="contact-card-header">
                <div className="contact-avatar">🇷🇺</div>
                <div className="contact-details">
                  <h3>{content.contact.details.name}</h3>
                  <p>{currentLanguage === 'en' ? 'Russian Translation Expert' : 'Эксперт по русскому переводу'}</p>
                </div>
              </div>
              <div className="contact-methods">
                <a href={`tel:${content.contact.details.phone1}`} className="contact-method">
                  <span className="contact-icon">📞</span>
                  <div>
                    <strong>{content.contact.details.phone1}</strong>
                    <small>{content.contact.info.primary}</small>
                  </div>
                </a>
                <a href={`tel:${content.contact.details.phone2}`} className="contact-method">
                  <span className="contact-icon">📱</span>
                  <div>
                    <strong>{content.contact.details.phone2}</strong>
                    <small>{content.contact.info.secondary}</small>
                  </div>
                </a>
                <a href={`mailto:${content.contact.details.email}`} className="contact-method">
                  <span className="contact-icon">✉️</span>
                  <div>
                    <strong>{content.contact.details.email}</strong>
                    <small>{content.contact.info.email}</small>
                  </div>
                </a>
                <a href={content.contact.details.whatsappUrl} className="contact-method whatsapp">
                  <span className="contact-icon">💬</span>
                  <div>
                    <strong>WhatsApp</strong>
                    <small>{content.contact.info.whatsapp}</small>
                  </div>
                </a>
              </div>
              <div className="contact-card-footer">
                <span className="availability">🟢 {content.contact.info.availability}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointments Section */}
      <section className="appointments">
        <div className="container">
          <h2>{content.appointments.title}</h2>
          <div className="appointments-grid">
            <div className="appointment-card">
              <div className="appointment-icon">📞</div>
              <h3>{content.appointments.freeConsultation.title}</h3>
              <div className="appointment-details">
                <span className="duration">{content.appointments.freeConsultation.duration}</span>
                <span className="price">{content.appointments.freeConsultation.price}</span>
              </div>
              <p>{content.appointments.freeConsultation.description}</p>
              <ul className="appointment-features">
                {content.appointments.freeConsultation.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
              <button className="book-btn" onClick={() => window.open(content.appointments.freeConsultation.action)}>{content.appointments.freeConsultation.button}</button>
            </div>
            
            <div className="appointment-card">
              <div className="appointment-icon">💼</div>
              <h3>{content.appointments.businessMeeting.title}</h3>
              <div className="appointment-details">
                <span className="duration">{content.appointments.businessMeeting.duration}</span>
                <span className="price">{content.appointments.businessMeeting.price}</span>
              </div>
              <p>{content.appointments.businessMeeting.description}</p>
              <ul className="appointment-features">
                {content.appointments.businessMeeting.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
              <button className="book-btn" onClick={() => window.open(content.appointments.businessMeeting.action)}>{content.appointments.businessMeeting.button}</button>
            </div>
            
            <div className="appointment-card">
              <div className="appointment-icon">🎓</div>
              <h3>{content.appointments.languageTraining.title}</h3>
              <div className="appointment-details">
                <span className="duration">{content.appointments.languageTraining.duration}</span>
                <span className="price">{content.appointments.languageTraining.price}</span>
              </div>
              <p>{content.appointments.languageTraining.description}</p>
              <ul className="appointment-features">
                {content.appointments.languageTraining.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
              <button className="book-btn" onClick={() => window.open(content.appointments.languageTraining.action)}>{content.appointments.languageTraining.button}</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p><strong>{content.footer.companyName} - {content.footer.tagline[currentLanguage]}</strong></p>
            <p>{content.footer.description[currentLanguage]}</p>
            
            <div className="services-list">
              <h4>{currentLanguage === 'en' ? 'Our Services' : 'Наши услуги'}</h4>
              <ul>
                <li><strong>{currentLanguage === 'en' ? 'Online/Offline Meetings:' : 'Онлайн/Офлайн встречи:'}</strong> {currentLanguage === 'en' ? 'Real-time Russian interpretation' : 'Перевод в реальном времени на русский'}</li>
                <li><strong>{currentLanguage === 'en' ? 'Document Translation:' : 'Перевод документов:'}</strong> {currentLanguage === 'en' ? 'Official documents and technical content' : 'Официальные документы и технический контент'}</li>
                <li><strong>{currentLanguage === 'en' ? 'Russian Language Course:' : 'Курс русского языка:'}</strong> {currentLanguage === 'en' ? 'Professional training and etiquette' : 'Профессиональное обучение и этикет'}</li>
                <li><strong>{currentLanguage === 'en' ? 'Travel Support:' : 'Поддержка в поездках:'}</strong> {currentLanguage === 'en' ? 'Linguistic aid for business meetings' : 'Языковая помощь для деловых встреч'}</li>
                <li><strong>{currentLanguage === 'en' ? 'Communication Assistance:' : 'Коммуникационная помощь:'}</strong> {currentLanguage === 'en' ? '24/7 support via multiple channels' : 'Поддержка 24/7 через различные каналы'}</li>
                <li><strong>{currentLanguage === 'en' ? 'Artist Support:' : 'Поддержка артистов:'}</strong> {currentLanguage === 'en' ? 'Assistance for Russian artists in India' : 'Помощь русским артистам в Индии'}</li>
              </ul>
            </div>
            
            <div className="why-choose">
              <h4>{currentLanguage === 'en' ? 'Why Choose Us?' : 'Почему выбирают нас?'}</h4>
              <ul>
                <li><strong>{currentLanguage === 'en' ? 'Expert Translator:' : 'Эксперт-переводчик:'}</strong> {currentLanguage === 'en' ? 'Native Russian speaker with Indian education' : 'Носитель русского языка с индийским образованием'}</li>
                <li><strong>{currentLanguage === 'en' ? 'Proven Experience:' : 'Проверенный опыт:'}</strong> {currentLanguage === 'en' ? '6+ years working with top companies' : '6+ лет работы с ведущими компаниями'}</li>
                <li><strong>{currentLanguage === 'en' ? '24/7 Availability:' : 'Доступность 24/7:'}</strong> {currentLanguage === 'en' ? 'Round-the-clock support' : 'Круглосуточная поддержка'}</li>
                <li><strong>{currentLanguage === 'en' ? 'Special Offer:' : 'Специальное предложение:'}</strong> {currentLanguage === 'en' ? '20% OFF on first booking' : 'Скидка 20% на первый заказ'}</li>
              </ul>
            </div>
            
            <p><strong>Contact: {content.contact.details.phone1} | {content.contact.details.phone2}</strong></p>
            <p><strong>Email: {content.contact.details.email}</strong></p>
            
            <div className="footer-bottom">
              <p>{content.footer.copyright[currentLanguage]}</p>
            </div>
          </div>
        </div>
      </footer>
      
      <Chatbot language={currentLanguage} />
      
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
};

function App() {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
}

export default App;