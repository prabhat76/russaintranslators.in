const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyAru4IFHn19f2RQB3z8LFiGHr4PYynUkd8",
  authDomain: "russiantranslator-aa708.firebaseapp.com",
  databaseURL: "https://russiantranslator-aa708-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "russiantranslator-aa708",
  storageBucket: "russiantranslator-aa708.firebasestorage.app",
  messagingSenderId: "631900278460",
  appId: "1:631900278460:web:ac2ed8da7da1b856fc8ab9"
};

const app = initializeApp(firebaseConfig);
const rtdb = getDatabase(app);

const content = {
  en: {
    nav: { home: 'Home', about: 'About', services: 'Services', contact: 'Contact' },
    hero: { 
      title: 'Professional Russian Translation Services', 
      subtitle: 'Expert Russian-English interpreter with 6+ years of experience', 
      cta: 'Call Now', 
      learn: 'Learn More' 
    },
    about: { 
      title: 'Meet Sabrina Bhatt', 
      subtitle: 'Your Russian Translation Expert', 
      proficiency: 'Language Proficiency', 
      experienceText: 'With 6+ years of professional experience in Russian-English translation and interpretation, I provide accurate and culturally sensitive language services for businesses and individuals.' 
    },
    services: { 
      title: 'Professional Translation Services', 
      subtitle: 'Comprehensive Russian-English language solutions for businesses and individuals' 
    },
    gallery: { title: 'Professional Work Gallery' },
    contact: { 
      title: 'Get In Touch', 
      subtitle: 'Ready to break language barriers? Contact us for professional Russian translation services', 
      call: 'Call Us', 
      email: 'Email Us', 
      whatsapp: 'WhatsApp', 
      offer: 'Special Offer', 
      quote: 'Request a Quote', 
      submit: 'Get Free Quote' 
    },
    appointments: { 
      title: 'Book Your Appointment', 
      subtitle: 'Choose the perfect consultation package for your translation needs', 
      free: 'Free Consultation', 
      business: 'Business Strategy Session', 
      urgent: 'Urgent Support', 
      book: 'Book Free Call', 
      strategy: 'Book Strategy Call', 
      callNow: 'Call Now' 
    }
  },
  ru: {
    nav: { home: 'Главная', about: 'О нас', services: 'Услуги', contact: 'Контакты' },
    hero: { 
      title: 'Профессиональные услуги русского перевода', 
      subtitle: 'Эксперт русско-английского перевода с опытом работы 6+ лет', 
      cta: 'Позвонить', 
      learn: 'Узнать больше' 
    },
    about: { 
      title: 'Знакомьтесь: Сабрина Бхатт', 
      subtitle: 'Ваш эксперт по русскому переводу', 
      proficiency: 'Языковые навыки', 
      experienceText: 'Имея более 6 лет профессионального опыта в русско-английском переводе и устном переводе, я предоставляю точные и культурно чувствительные языковые услуги для бизнеса и частных лиц.' 
    },
    services: { 
      title: 'Профессиональные переводческие услуги', 
      subtitle: 'Комплексные русско-английские языковые решения для бизнеса и частных лиц' 
    },
    gallery: { title: 'Галерея профессиональных работ' },
    contact: { 
      title: 'Свяжитесь с нами', 
      subtitle: 'Готовы преодолеть языковые барьеры? Свяжитесь с нами для профессиональных услуг русского перевода', 
      call: 'Позвоните нам', 
      email: 'Напишите нам', 
      whatsapp: 'WhatsApp', 
      offer: 'Специальное предложение', 
      quote: 'Запросить расценки', 
      submit: 'Получить бесплатную оценку' 
    },
    appointments: { 
      title: 'Записаться на прием', 
      subtitle: 'Выберите идеальный пакет консультаций для ваших переводческих потребностей', 
      free: 'Бесплатная консультация', 
      business: 'Бизнес-стратегическая сессия', 
      urgent: 'Срочная поддержка', 
      book: 'Записаться на звонок', 
      strategy: 'Записаться на стратегический звонок', 
      callNow: 'Позвонить сейчас' 
    }
  }
};

async function uploadContent() {
  try {
    await set(ref(rtdb, 'content'), content);
    console.log('✅ Content uploaded to Realtime Database');
  } catch (error) {
    console.error('❌ Upload error:', error);
  }
}

uploadContent();