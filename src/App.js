import React, { useState, useEffect } from 'react';
import './App.css';
import Chatbot from './components/Chatbot';
import SEO from './components/SEO';
import { contentEN } from './data/content-en';
import { contentRU } from './data/content-ru';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [language, setLanguage] = useState('en');
  const content = language === 'en' ? contentEN : contentRU;

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

    // Auto slideshow for mobile gallery only
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

  return (
    <div className="App">
      <SEO />
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <img src="/images/download.webp" alt="Language Liberty Logo" className="logo" />
            <div className="brand-text">
              <h3>{language === 'en' ? 'LANGUAGE LIBERTY' : 'LANGUAGE LIBERTY'}</h3>
              <span>{language === 'en' ? 'Your Russian Translator & Interpreter' : 'Ваш русский переводчик и интерпретатор'}</span>
            </div>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#home" onClick={() => setIsMenuOpen(false)}>{content.nav.home}</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>{content.nav.about}</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)}>{content.nav.services}</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>{content.nav.contact}</a>
            <a href="tel:+918789389223" className="nav-cta" onClick={() => setIsMenuOpen(false)}>📞 {language === 'en' ? 'Call Now' : 'Звонить'}</a>
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
              <h1>{content.about.title}</h1>
              <h4>SABRINA BHATT</h4>
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

      {/* Gallery Section */}
      <section className="gallery">
        <div className="container">
          <h2>{language === 'en' ? 'Professional Work Gallery' : 'Галерея профессиональных работ'}</h2>
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
              <p>{language === 'en' ? content.services.items[0].description : 'Профессиональный перевод в реальном времени с английского и хинди на русский для конференций Zoom, Teams и WebEx'}</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🤝</div>
              <h3>{content.services.items[1].title}</h3>
              <p>{language === 'en' ? content.services.items[1].description : 'Устный перевод с английского и хинди на русский для важных деловых переговоров и дипломатических встреч'}</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">📄</div>
              <h3>{content.services.items[2].title}</h3>
              <p>{language === 'en' ? content.services.items[2].description : 'Сертифицированный перевод документов с английского и хинди на русский: юридические контракты, технические руководства, медицинские отчеты'}</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🎓</div>
              <h3>{content.services.items[3].title}</h3>
              <p>{language === 'en' ? content.services.items[3].description : 'Обучение русскому языку для англо- и хиндиговорящих: от базового до делового уровня (A1-C1) с культурным этикетом'}</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">✈️</div>
              <h3>{content.services.items[4].title}</h3>
              <p>{language === 'en' ? content.services.items[4].description : 'Личный переводчик с английского/хинди на русский для руководителей во время международных деловых поездок'}</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🗣️</div>
              <h3>{language === 'en' ? 'Communicational Assistance' : 'Коммуникационная помощь'}</h3>
              <p>{language === 'en' ? 'Communicational assistance to Russian clients while their stay in India and Indian clients while their stay in Russia' : 'Переводческая помощь с английского/хинди на русский для российских клиентов в Индии и индийских клиентов в России'}</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">📱</div>
              <h3>{language === 'en' ? 'Online Communicational Assistance' : 'Онлайн коммуникационная помощь'}</h3>
              <p>{language === 'en' ? 'Communicational assistance to Russian/Indian clients though emails, WhatsApp, and other social media platforms.' : 'Переводческая помощь с английского/хинди на русский через электронную почту, WhatsApp и другие платформы.'}</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🎭</div>
              <h3>{content.services.items[5].title}</h3>
              <p>{content.services.items[5].description}</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">👨‍🏫</div>
              <h3>{language === 'en' ? 'Personal Classes' : 'Персональные занятия'}</h3>
              <p>{language === 'en' ? 'Personal Russian classes – level A-1, A-2, A-3 (speaking, reading, talking)' : 'Персональные уроки русского языка для англо- и хиндиговорящих – уровни A-1, A-2, A-3 (говорение, чтение, разговор)'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h6>{language === 'en' ? 'Contact Us' : 'Связаться с нами'}</h6>
              <p>{language === 'en' ? 'Book your Russian Interpreter in Mumbai now.' : 'Забронируйте русского переводчика в Мумбаи прямо сейчас.'}</p>
              <p>{language === 'en' ? 'Get 20% OFF on your first booking. Russian translation and interpretation service is now providing 24 hours of communicational assistance.' : 'Получите скидку 20% на первый заказ. Услуги русского перевода и интерпретации теперь предоставляют круглосуточную коммуникационную поддержку.'}</p>
            </div>
            <div className="contact-card">
              <div className="contact-card-header">
                <div className="contact-avatar">🇷🇺</div>
                <div className="contact-details">
                  <h3>Sabrina Bhatt</h3>
                  <p>{language === 'en' ? 'Russian Translation Expert' : 'Эксперт по русскому переводу'}</p>
                </div>
              </div>
              <div className="contact-methods">
                <a href="tel:+918789389223" className="contact-method">
                  <span className="contact-icon">📞</span>
                  <div>
                    <strong>+91-8789389223</strong>
                    <small>{language === 'en' ? 'Primary' : 'Основной'}</small>
                  </div>
                </a>
                <a href="tel:+917304876702" className="contact-method">
                  <span className="contact-icon">📱</span>
                  <div>
                    <strong>+91-7304876702</strong>
                    <small>{language === 'en' ? 'Secondary' : 'Дополнительный'}</small>
                  </div>
                </a>
                <a href="mailto:sabrina@languageliberty.com" className="contact-method">
                  <span className="contact-icon">✉️</span>
                  <div>
                    <strong>sabrina@languageliberty.com</strong>
                    <small>{language === 'en' ? 'Email' : 'Электронная почта'}</small>
                  </div>
                </a>
                <a href="https://wa.me/918789389223" className="contact-method whatsapp">
                  <span className="contact-icon">💬</span>
                  <div>
                    <strong>WhatsApp</strong>
                    <small>{language === 'en' ? 'Instant messaging' : 'Мгновенные сообщения'}</small>
                  </div>
                </a>
              </div>
              <div className="contact-card-footer">
                <span className="availability">🟢 {language === 'en' ? '24/7 Available' : 'Доступно 24/7'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointments Section */}
      <section className="appointments">
        <div className="container">
          <h2>{language === 'en' ? 'Book Your Consultation' : 'Забронировать консультацию'}</h2>
          <div className="appointments-grid">
            <div className="appointment-card">
              <div className="appointment-icon">📞</div>
              <h3>{language === 'en' ? 'Free Consultation' : 'Бесплатная консультация'}</h3>
              <div className="appointment-details">
                <span className="duration">{language === 'en' ? '30 minutes' : '30 минут'}</span>
                <span className="price">{language === 'en' ? 'FREE' : 'БЕСПЛАТНО'}</span>
              </div>
              <p>{language === 'en' ? 'Get expert consultation from our certified Russian translator. Discuss your requirements and get personalized solutions.' : 'Получите экспертную консультацию от нашего сертифицированного переводчика. Обсудите ваши требования и получите индивидуальные решения.'}</p>
              <ul className="appointment-features">
                <li>✓ {language === 'en' ? 'Requirement analysis' : 'Анализ требований'}</li>
                <li>✓ {language === 'en' ? 'Cost estimation' : 'Оценка стоимости'}</li>
                <li>✓ {language === 'en' ? 'Timeline discussion' : 'Обсуждение сроков'}</li>
                <li>✓ {language === 'en' ? 'Service recommendations' : 'Рекомендации по услугам'}</li>
              </ul>
              <button className="book-btn" onClick={() => window.open('tel:+918789389223')}>{language === 'en' ? 'Book Free Call' : 'Забронировать бесплатный звонок'}</button>
            </div>
            
            <div className="appointment-card">
              <div className="appointment-icon">💼</div>
              <h3>{language === 'en' ? 'Business Meeting' : 'Деловая встреча'}</h3>
              <div className="appointment-details">
                <span className="duration">{language === 'en' ? '1-2 hours' : '1-2 часа'}</span>
                <span className="price">₹2000+</span>
              </div>
              <p>{language === 'en' ? 'Professional interpretation services for your business meetings with Russian clients or partners.' : 'Профессиональные услуги перевода для ваших деловых встреч с русскими клиентами или партнерами.'}</p>
              <ul className="appointment-features">
                <li>✓ {language === 'en' ? 'Live interpretation' : 'Перевод в реальном времени'}</li>
                <li>✓ {language === 'en' ? 'Document translation' : 'Перевод документов'}</li>
                <li>✓ {language === 'en' ? 'Cultural guidance' : 'Культурное консультирование'}</li>
                <li>✓ {language === 'en' ? 'Follow-up support' : 'Последующая поддержка'}</li>
              </ul>
              <button className="book-btn" onClick={() => window.open('mailto:sabrina@languageliberty.com?subject=Business Meeting Booking')}>{language === 'en' ? 'Schedule Meeting' : 'Запланировать встречу'}</button>
            </div>
            
            <div className="appointment-card">
              <div className="appointment-icon">🎓</div>
              <h3>{language === 'en' ? 'Language Training' : 'Языковое обучение'}</h3>
              <div className="appointment-details">
                <span className="duration">{language === 'en' ? '1 hour' : '1 час'}</span>
                <span className="price">₹1500+</span>
              </div>
              <p>{language === 'en' ? 'Personal Russian language classes and cultural etiquette training for professionals.' : 'Персональные уроки русского языка и обучение культурному этикету для профессионалов.'}</p>
              <ul className="appointment-features">
                <li>✓ {language === 'en' ? 'Customized curriculum' : 'Индивидуальная программа'}</li>
                <li>✓ {language === 'en' ? 'Business Russian focus' : 'Фокус на деловом русском'}</li>
                <li>✓ {language === 'en' ? 'Cultural training' : 'Культурное обучение'}</li>
                <li>✓ {language === 'en' ? 'Flexible scheduling' : 'Гибкое расписание'}</li>
              </ul>
              <button className="book-btn" onClick={() => window.open('https://wa.me/918789389223?text=Hi, I want to book Russian language training')}>{language === 'en' ? 'Start Learning' : 'Начать обучение'}</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p><strong>{language === 'en' ? 'Language Liberty - Russian Translation & Interpretation Services' : 'Language Liberty - Услуги русского перевода и интерпретации'}</strong></p>
            <p>{language === 'en' ? 'Professional Russian translation services in Mumbai with 6+ years of experience. Expert Russian-English translator for businesses and individuals.' : 'Профессиональные услуги русского перевода в Мумбаи с опытом работы 6+ лет. Экспертный переводчик русский-английский для бизнеса и частных лиц.'}</p>
            
            <div className="services-list">
              <h4>{language === 'en' ? 'Our Services' : 'Наши услуги'}</h4>
              <ul>
                <li><strong>{language === 'en' ? 'Online/Offline Meetings:' : 'Онлайн/Офлайн встречи:'}</strong> {language === 'en' ? 'Real-time Russian interpretation' : 'Перевод в реальном времени на русский'}</li>
                <li><strong>{language === 'en' ? 'Document Translation:' : 'Перевод документов:'}</strong> {language === 'en' ? 'Official documents and technical content' : 'Официальные документы и технический контент'}</li>
                <li><strong>{language === 'en' ? 'Russian Language Course:' : 'Курс русского языка:'}</strong> {language === 'en' ? 'Professional training and etiquette' : 'Профессиональное обучение и этикет'}</li>
                <li><strong>{language === 'en' ? 'Travel Support:' : 'Поддержка в поездках:'}</strong> {language === 'en' ? 'Linguistic aid for business meetings' : 'Языковая помощь для деловых встреч'}</li>
                <li><strong>{language === 'en' ? 'Communication Assistance:' : 'Коммуникационная помощь:'}</strong> {language === 'en' ? '24/7 support via multiple channels' : 'Поддержка 24/7 через различные каналы'}</li>
                <li><strong>{language === 'en' ? 'Artist Support:' : 'Поддержка артистов:'}</strong> {language === 'en' ? 'Assistance for Russian artists in India' : 'Помощь русским артистам в Индии'}</li>
              </ul>
            </div>
            
            <div className="why-choose">
              <h4>{language === 'en' ? 'Why Choose Us?' : 'Почему выбирают нас?'}</h4>
              <ul>
                <li><strong>{language === 'en' ? 'Expert Translator:' : 'Эксперт-переводчик:'}</strong> {language === 'en' ? 'Native Russian speaker with Indian education' : 'Носитель русского языка с индийским образованием'}</li>
                <li><strong>{language === 'en' ? 'Proven Experience:' : 'Проверенный опыт:'}</strong> {language === 'en' ? '6+ years working with top companies' : '6+ лет работы с ведущими компаниями'}</li>
                <li><strong>{language === 'en' ? '24/7 Availability:' : 'Доступность 24/7:'}</strong> {language === 'en' ? 'Round-the-clock support' : 'Круглосуточная поддержка'}</li>
                <li><strong>{language === 'en' ? 'Special Offer:' : 'Специальное предложение:'}</strong> {language === 'en' ? '20% OFF on first booking' : 'Скидка 20% на первый заказ'}</li>
              </ul>
            </div>
            
            <p><strong>Contact: +91-8789389223 | +91-7304876702</strong></p>
            <p><strong>Email: sabrina@languageliberty.com</strong></p>
            
            <div className="footer-bottom">
              <p>{language === 'en' ? 'Copyright © 2025 Language Liberty - All Rights Reserved.' : 'Авторские права © 2025 Language Liberty - Все права защищены.'}</p>
            </div>
          </div>
        </div>
      </footer>
      
      <Chatbot language={language} />
      
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