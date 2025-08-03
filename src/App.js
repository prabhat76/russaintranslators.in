import React, { useState, useEffect } from 'react';
import './App.css';
import Chatbot from './components/Chatbot';

const AppContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('ru') ? 'ru' : 'en';
  });
  
  const switchLanguage = (lang) => {
    setCurrentLanguage(lang);
  };
  
  const content = {
    en: {
      nav: { home: 'Home', about: 'About', services: 'Services', contact: 'Contact' },
      hero: { title: 'Professional Russian Translation Services', subtitle: 'Expert Russian-English interpreter with 6+ years of experience', cta: 'Call Now', learn: 'Learn More' },
      about: { title: 'Meet Sabrina Bhatt', subtitle: 'Your Russian Translation Expert', proficiency: 'Language Proficiency', experienceText: 'With 6+ years of professional experience in Russian-English translation and interpretation, I provide accurate and culturally sensitive language services for businesses and individuals.' },
      services: { title: 'Professional Translation Services', subtitle: 'Comprehensive Russian-English language solutions for businesses and individuals' },
      gallery: { title: 'Professional Work Gallery' },
      contact: { title: 'Get In Touch', subtitle: 'Ready to break language barriers? Contact us for professional Russian translation services', call: 'Call Us', email: 'Email Us', whatsapp: 'WhatsApp', offer: 'Special Offer', quote: 'Request a Quote', submit: 'Get Free Quote' },
      appointments: { title: 'Book Your Appointment', subtitle: 'Choose the perfect consultation package for your translation needs', free: 'Free Consultation', business: 'Business Strategy Session', urgent: 'Urgent Support', book: 'Book Free Call', strategy: 'Book Strategy Call', callNow: 'Call Now' }
    },
    ru: {
      nav: { home: 'Главная', about: 'О нас', services: 'Услуги', contact: 'Контакты' },
      hero: { title: 'Профессиональные услуги русского перевода', subtitle: 'Эксперт русско-английского перевода с опытом работы 6+ лет', cta: 'Позвонить', learn: 'Узнать больше' },
      about: { title: 'Знакомьтесь: Сабрина Бхатт', subtitle: 'Ваш эксперт по русскому переводу', proficiency: 'Языковые навыки', experienceText: 'Имея более 6 лет профессионального опыта в русско-английском переводе и устном переводе, я предоставляю точные и культурно чувствительные языковые услуги для бизнеса и частных лиц.' },
      services: { title: 'Профессиональные переводческие услуги', subtitle: 'Комплексные русско-английские языковые решения для бизнеса и частных лиц' },
      gallery: { title: 'Галерея профессиональных работ' },
      contact: { title: 'Свяжитесь с нами', subtitle: 'Готовы преодолеть языковые барьеры? Свяжитесь с нами для профессиональных услуг русского перевода', call: 'Позвоните нам', email: 'Напишите нам', whatsapp: 'WhatsApp', offer: 'Специальное предложение', quote: 'Запросить расценки', submit: 'Получить бесплатную оценку' },
      appointments: { title: 'Записаться на прием', subtitle: 'Выберите идеальный пакет консультаций для ваших переводческих потребностей', free: 'Бесплатная консультация', business: 'Бизнес-стратегическая сессия', urgent: 'Срочная поддержка', book: 'Записаться на звонок', strategy: 'Записаться на стратегический звонок', callNow: 'Позвонить сейчас' }
    }
  };
  
  const t = content[currentLanguage];

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
              <div className="language-toggle">
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="langToggle" 
                    checked={currentLanguage === 'ru'} 
                    onChange={(e) => switchLanguage(e.target.checked ? 'ru' : 'en')}
                  />
                  <label htmlFor="langToggle" className="toggle-label">
                    <span className="toggle-text left">🇺🇸 EN</span>
                    <span className="toggle-slider"></span>
                    <span className="toggle-text right">🇷🇺 RU</span>
                  </label>
                </div>
              </div>
              <div className="language-badge">
                <span className="flag">🇷🇺</span>
                <span>{currentLanguage === 'en' ? 'Russian Expert' : 'Эксперт русского языка'}</span>
              </div>
              <div className="experience-badge">
                <span className="years">6+</span>
                <span>{currentLanguage === 'en' ? 'Years Experience' : 'Лет опыта'}</span>
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
              <a href="#home" className="nav-link" onClick={() => setIsMenuOpen(false)}>{t.nav.home}</a>
              <a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>{t.nav.about}</a>
              <a href="#services" className="nav-link" onClick={() => setIsMenuOpen(false)}>{t.nav.services}</a>
              <a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>{t.nav.contact}</a>
              <div className="nav-cta-group">
                <a href="https://wa.me/918789389223" className="nav-cta whatsapp" onClick={() => setIsMenuOpen(false)}>💬 WhatsApp</a>
                <a href="tel:+918789389223" className="nav-cta call" onClick={() => setIsMenuOpen(false)}>📞 {t.hero.cta}</a>
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
              <h1>{t.hero.title}</h1>
              <p>{t.hero.subtitle}</p>
              <div className="hero-cta">
                <a href="tel:+918789389223" className="cta-button primary">📞 {t.hero.cta}</a>
                <a href="#about" className="cta-button secondary">{t.hero.learn}</a>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h1>{t.about.title}</h1>
              <h4>{t.about.subtitle}</h4>
              <p>{currentLanguage === 'en' ? 'Born to a Russian mother and an Indian father, I bridge communication gaps between Russian-speaking countries and the world. With education in Russia, Uzbekistan, and India, I bring authentic cultural understanding to every translation project.' : 'Рожденная от русской матери и индийского отца, я устраняю коммуникационные барьеры между русскоговорящими странами и миром. Получив образование в России, Узбекистане и Индии, я привношу подлинное культурное понимание в каждый переводческий проект.'}</p>
              <h4>{t.about.proficiency}</h4>
              <p>{t.about.experienceText}</p>
            </div>
            
            <div className="about-image">
              <img src="/images/sabrina-profile.jpeg" alt="Sabrina Bhatt" />
            </div>
          </div>
        </div>
      </section>

      <section className="gallery">
        <div className="container">
          <h2>{t.gallery.title}</h2>
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
            <h2>{t.services.title}</h2>
            <p>{t.services.subtitle}</p>
          </div>
          <div className="services-grid">
            <div className="service-card featured">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop" alt="Virtual Meetings" />
              </div>
              <div className="service-content">
                <div className="service-badge">{currentLanguage === 'en' ? 'Most Popular' : 'Самый популярный'}</div>
                <h3>{currentLanguage === 'en' ? 'Virtual Meeting Interpretation' : 'Устный перевод виртуальных встреч'}</h3>
                <p>{currentLanguage === 'en' ? 'Real-time Russian-English interpretation for Zoom, Teams, and Google Meet sessions with crystal-clear audio quality.' : 'Устный перевод русский-английский в реальном времени для сессий Zoom, Teams и Google Meet с кристально чистым качеством звука.'}</p>
                <ul className="service-features">
                  <li>✓ {currentLanguage === 'en' ? 'HD Audio Quality' : 'HD качество звука'}</li>
                  <li>✓ {currentLanguage === 'en' ? 'Screen Sharing Support' : 'Поддержка демонстрации экрана'}</li>
                  <li>✓ {currentLanguage === 'en' ? '24/7 Availability' : 'Доступность 24/7'}</li>
                </ul>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop" alt="Business Meetings" />
              </div>
              <div className="service-content">
                <h3>{currentLanguage === 'en' ? 'In-Person Business Meetings' : 'Личные деловые встречи'}</h3>
                <p>{currentLanguage === 'en' ? 'Professional on-site interpretation for corporate meetings, negotiations, and conferences across Mumbai and India.' : 'Профессиональный устный перевод на месте для корпоративных встреч, переговоров и конференций по всему Мумбаи и Индии.'}</p>
                <ul className="service-features">
                  <li>✓ {currentLanguage === 'en' ? 'Ministerial Level Experience' : 'Опыт министерского уровня'}</li>
                  <li>✓ {currentLanguage === 'en' ? 'Confidentiality Assured' : 'Гарантированная конфиденциальность'}</li>
                  <li>✓ {currentLanguage === 'en' ? 'Industry Expertise' : 'Отраслевая экспертиза'}</li>
                </ul>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop" alt="Document Translation" />
              </div>
              <div className="service-content">
                <h3>{currentLanguage === 'en' ? 'Certified Document Translation' : 'Сертифицированный перевод документов'}</h3>
                <p>{currentLanguage === 'en' ? 'Official translation of legal documents, contracts, certificates, and technical manuals with government certification.' : 'Официальный перевод юридических документов, контрактов, сертификатов и технических руководств с государственной сертификацией.'}</p>
                <ul className="service-features">
                  <li>✓ {currentLanguage === 'en' ? 'Legal Certification' : 'Юридическая сертификация'}</li>
                  <li>✓ {currentLanguage === 'en' ? 'Fast Turnaround' : 'Быстрое выполнение'}</li>
                  <li>✓ {currentLanguage === 'en' ? 'Technical Accuracy' : 'Техническая точность'}</li>
                </ul>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop" alt="Russian Language Training" />
              </div>
              <div className="service-content">
                <h3>{currentLanguage === 'en' ? 'Russian Language Training' : 'Обучение английскому языку'}</h3>
                <p>{currentLanguage === 'en' ? 'Comprehensive Russian language courses from beginner to advanced levels, including business etiquette and cultural training.' : 'Комплексные курсы английского языка от начального до продвинутого уровня, включая деловой этикет и культурное обучение.'}</p>
                <ul className="service-features">
                  <li>✓ {currentLanguage === 'en' ? 'A1 to C1 Levels' : 'Уровни A1-C1'}</li>
                  <li>✓ {currentLanguage === 'en' ? 'Cultural Etiquette' : 'Культурный этикет'}</li>
                  <li>✓ {currentLanguage === 'en' ? 'Business Russian' : 'Деловой английский'}</li>
                </ul>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop" alt="Travel Support" />
              </div>
              <div className="service-content">
                <h3>{currentLanguage === 'en' ? 'Executive Travel Support' : 'Поддержка деловых поездок'}</h3>
                <p>{currentLanguage === 'en' ? 'Personal interpreter services for business executives traveling to Russian-speaking countries or hosting Russian delegates.' : 'Персональные услуги переводчика для бизнес-руководителей, путешествующих в русскоговорящие страны или принимающих российские делегации.'}</p>
                <ul className="service-features">
                  <li>✓ {currentLanguage === 'en' ? 'Airport Assistance' : 'Помощь в аэропорту'}</li>
                  <li>✓ {currentLanguage === 'en' ? 'Cultural Guidance' : 'Культурное руководство'}</li>
                  <li>✓ {currentLanguage === 'en' ? '24/7 Support' : 'Поддержка 24/7'}</li>
                </ul>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop" alt="Entertainment Industry" />
              </div>
              <div className="service-content">
                <h3>{currentLanguage === 'en' ? 'Entertainment Industry Support' : 'Поддержка индустрии развлечений'}</h3>
                <p>{currentLanguage === 'en' ? 'Specialized services for Russian artists, models, and performers working in India, including script reading and agency coordination.' : 'Специализированные услуги для российских артистов, моделей и исполнителей, работающих в Индии, включая чтение сценариев и координацию с агентствами.'}</p>
                <ul className="service-features">
                  <li>✓ {currentLanguage === 'en' ? 'Script Translation' : 'Перевод сценариев'}</li>
                  <li>✓ {currentLanguage === 'en' ? 'Agency Coordination' : 'Координация с агентствами'}</li>
                  <li>✓ {currentLanguage === 'en' ? 'Cultural Adaptation' : 'Культурная адаптация'}</li>
                </ul>
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
                <h3>{currentLanguage === 'en' ? 'Call Us' : 'Позвоните нам'}</h3>
                <p>{currentLanguage === 'en' ? 'Speak directly with our experts' : 'Говорите напрямую с нашими экспертами'}</p>
                <div className="contact-details">
                  <a href="tel:+918789389223">+91-8789389223</a>
                  <a href="tel:+917304876702">+91-7304876702</a>
                </div>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">✉️</div>
                <h3>{currentLanguage === 'en' ? 'Email Us' : 'Напишите нам'}</h3>
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
                <h3>{currentLanguage === 'en' ? 'Special Offer' : 'Специальное предложение'}</h3>
                <p>{currentLanguage === 'en' ? 'First-time clients get' : 'Новые клиенты получают'}</p>
                <div className="offer-badge">20% OFF</div>
              </div>
            </div>
            
            <div className="contact-form-section">
              <div className="contact-image">
                <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=600&fit=crop" alt="Professional Translator" />
              </div>
              <div className="contact-form">
                <h3>{currentLanguage === 'en' ? 'Request a Quote' : 'Запросить расценки'}</h3>
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
                  <button type="submit" className="submit-btn">{currentLanguage === 'en' ? 'Get Free Quote' : 'Получить бесплатную оценку'}</button>
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
      
      <Chatbot language={currentLanguage} />
      
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
  return <AppContent />;
}

export default App;