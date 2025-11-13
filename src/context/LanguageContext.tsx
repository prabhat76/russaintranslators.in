import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ru";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    "header.tagline": "Russian Translation Services",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.relations": "Indo-Russian Relations",
    "nav.contact": "Contact",
    
    // Hero
    "hero.badge": "Bridging India & Russia Through Language",
    "hero.title": "Language Liberty",
    "hero.subtitle": "Professional Russian Translation Services with a Deep Understanding of Indo-Russian Cultural Nuances",
    "hero.cta": "Get Started",
    "hero.learn": "Learn More",
    
    // About
    "about.quote": "Language is the bridge between cultures. My heritage allows me to build that bridge with authenticity and deep cultural understanding.",
    "about.author": "— Sabrina Bhatt",
    "about.badge": "About Our Founder",
    "about.name": "Sabrina Bhatt",
    "about.bio1": "Born to a Russian mother and raised with a deep appreciation for both Indian and Russian cultures, Sabrina Bhatt brings a unique perspective to language translation services.",
    "about.bio2": "With native fluency in Russian and a profound understanding of Indian business culture, Sabrina founded Language Liberty to bridge the linguistic and cultural gap between these two great nations.",
    "about.heritage": "Russian Heritage",
    "about.heritage.desc": "Native fluency with deep cultural understanding",
    "about.expertise": "Indian Business Expertise",
    "about.expertise.desc": "Comprehensive knowledge of Indian market dynamics",
    "about.bridge": "Cultural Bridge",
    "about.bridge.desc": "Unique ability to navigate both cultural contexts",
    
    // Services
    "services.badge": "Our Services",
    "services.title": "Comprehensive Translation Solutions",
    "services.subtitle": "From business documents to literary works, we provide expert Russian translation services tailored to your specific needs",
    "services.business": "Business Translation",
    "services.business.desc": "Contracts, proposals, and corporate communications",
    "services.legal": "Legal Documentation",
    "services.legal.desc": "Certified translations of legal documents and agreements",
    "services.technical": "Technical Translation",
    "services.technical.desc": "Manuals, specifications, and technical documentation",
    "services.interpretation": "Interpretation Services",
    "services.interpretation.desc": "Real-time interpretation for meetings and conferences",
    "services.website": "Website Localization",
    "services.website.desc": "Complete website translation and cultural adaptation",
    "services.literary": "Literary Translation",
    "services.literary.desc": "Books, articles, and creative content with cultural adaptation",
    
    // Indo-Russian Relations
    "relations.badge": "Cultural Bridge",
    "relations.title": "Indo-Russian Relations",
    "relations.subtitle": "A partnership spanning decades, built on mutual respect, cultural exchange, and shared values",
    "relations.history": "Rich Historical Ties",
    "relations.history.desc": "Decades of diplomatic relations and cultural exchange between India and Russia have created strong bonds.",
    "relations.trade": "Growing Trade Relations",
    "relations.trade.desc": "Bilateral trade continues to expand across energy, defense, technology, and pharmaceuticals.",
    "relations.culture": "Cultural Exchange",
    "relations.culture.desc": "From Bollywood to ballet, both nations celebrate each other's rich cultural heritage.",
    "relations.defense": "Strategic Partnership",
    "relations.defense.desc": "Long-standing cooperation in defense, space exploration, and nuclear energy.",
    "relations.stats.title": "Indo-Russian Partnership by Numbers",
    "relations.stat1.value": "$13B+",
    "relations.stat1.label": "Annual Bilateral Trade",
    "relations.stat2.value": "70+",
    "relations.stat2.label": "Years of Diplomatic Relations",
    "relations.stat3.value": "20,000+",
    "relations.stat3.label": "Indian Students in Russia",
    "relations.role": "Language Liberty's role in strengthening these ties through accurate, culturally-sensitive translation services cannot be overstated. We facilitate communication that builds trust and understanding between Indian and Russian businesses.",
    
    // Contact
    "contact.badge": "Get In Touch",
    "contact.title": "Let's Connect",
    "contact.subtitle": "Ready to bridge the language gap? Contact us today for professional translation services",
    "contact.name": "Your Name",
    "contact.email": "Your Email",
    "contact.message": "Your Message",
    "contact.send": "Send Message",
    "contact.info": "Contact Information",
    "contact.reach": "Reach out to us for professional Russian translation services",
    "contact.location": "Mumbai, India",
    "contact.hours": "Working Hours",
    "contact.hours.time": "Mon-Fri: 9:00 AM - 6:00 PM IST",
    
    // Footer
    "footer.about": "About",
    "footer.about.desc": "Language Liberty is a professional Russian translation service founded by Sabrina Bhatt, bridging Indo-Russian cultural and linguistic gaps.",
    "footer.quick": "Quick Links",
    "footer.connect": "Connect",
    "footer.rights": "All rights reserved.",
  },
  ru: {
    // Header
    "header.tagline": "Услуги русского перевода",
    "nav.home": "Главная",
    "nav.about": "О нас",
    "nav.services": "Услуги",
    "nav.relations": "Индийско-российские отношения",
    "nav.contact": "Контакты",
    
    // Hero
    "hero.badge": "Соединяя Индию и Россию через язык",
    "hero.title": "Language Liberty",
    "hero.subtitle": "Профессиональные услуги русского перевода с глубоким пониманием индийско-российских культурных нюансов",
    "hero.cta": "Начать",
    "hero.learn": "Узнать больше",
    
    // About
    "about.quote": "Язык - это мост между культурами. Мое наследие позволяет мне строить этот мост с подлинностью и глубоким культурным пониманием.",
    "about.author": "— Сабрина Бхатт",
    "about.badge": "О нашем основателе",
    "about.name": "Сабрина Бхатт",
    "about.bio1": "Родившаяся в семье русской матери и воспитанная с глубокой признательностью как к индийской, так и к русской культурам, Сабрина Бхатт привносит уникальную перспективу в услуги языкового перевода.",
    "about.bio2": "Обладая родным уровнем владения русским языком и глубоким пониманием индийской деловой культуры, Сабрина основала Language Liberty, чтобы преодолеть языковой и культурный разрыв между этими двумя великими нациями.",
    "about.heritage": "Русское наследие",
    "about.heritage.desc": "Родной уровень владения языком с глубоким культурным пониманием",
    "about.expertise": "Индийская деловая экспертиза",
    "about.expertise.desc": "Всестороннее знание динамики индийского рынка",
    "about.bridge": "Культурный мост",
    "about.bridge.desc": "Уникальная способность ориентироваться в обоих культурных контекстах",
    
    // Services
    "services.badge": "Наши услуги",
    "services.title": "Комплексные решения по переводу",
    "services.subtitle": "От деловых документов до литературных произведений - мы предоставляем экспертные услуги русского перевода, адаптированные под ваши конкретные потребности",
    "services.business": "Деловой перевод",
    "services.business.desc": "Контракты, предложения и корпоративные коммуникации",
    "services.legal": "Юридическая документация",
    "services.legal.desc": "Заверенные переводы юридических документов и соглашений",
    "services.technical": "Технический перевод",
    "services.technical.desc": "Руководства, спецификации и техническая документация",
    "services.interpretation": "Услуги устного перевода",
    "services.interpretation.desc": "Синхронный перевод для встреч и конференций",
    "services.website": "Локализация веб-сайтов",
    "services.website.desc": "Полный перевод веб-сайта и культурная адаптация",
    "services.literary": "Литературный перевод",
    "services.literary.desc": "Книги, статьи и творческий контент с культурной адаптацией",
    
    // Indo-Russian Relations
    "relations.badge": "Культурный мост",
    "relations.title": "Индийско-российские отношения",
    "relations.subtitle": "Партнерство, охватывающее десятилетия, построенное на взаимном уважении, культурном обмене и общих ценностях",
    "relations.history": "Богатые исторические связи",
    "relations.history.desc": "Десятилетия дипломатических отношений и культурного обмена между Индией и Россией создали прочные узы.",
    "relations.trade": "Растущие торговые отношения",
    "relations.trade.desc": "Двусторонняя торговля продолжает расширяться в сферах энергетики, обороны, технологий и фармацевтики.",
    "relations.culture": "Культурный обмен",
    "relations.culture.desc": "От Болливуда до балета - обе страны отмечают богатое культурное наследие друг друга.",
    "relations.defense": "Стратегическое партнерство",
    "relations.defense.desc": "Долгосрочное сотрудничество в области обороны, освоения космоса и атомной энергетики.",
    "relations.stats.title": "Индийско-российское партнерство в цифрах",
    "relations.stat1.value": "$13 млрд+",
    "relations.stat1.label": "Годовой двусторонний товарооборот",
    "relations.stat2.value": "70+",
    "relations.stat2.label": "Лет дипломатических отношений",
    "relations.stat3.value": "20,000+",
    "relations.stat3.label": "Индийских студентов в России",
    "relations.role": "Роль Language Liberty в укреплении этих связей через точные, культурно-чувствительные переводческие услуги невозможно переоценить. Мы облегчаем коммуникацию, которая строит доверие и понимание между индийским и российским бизнесом.",
    
    // Contact
    "contact.badge": "Свяжитесь с нами",
    "contact.title": "Давайте свяжемся",
    "contact.subtitle": "Готовы преодолеть языковой барьер? Свяжитесь с нами сегодня для профессиональных переводческих услуг",
    "contact.name": "Ваше имя",
    "contact.email": "Ваш Email",
    "contact.message": "Ваше сообщение",
    "contact.send": "Отправить сообщение",
    "contact.info": "Контактная информация",
    "contact.reach": "Свяжитесь с нами для профессиональных услуг русского перевода",
    "contact.location": "Мумбаи, Индия",
    "contact.hours": "Часы работы",
    "contact.hours.time": "Пн-Пт: 9:00 - 18:00 IST",
    
    // Footer
    "footer.about": "О компании",
    "footer.about.desc": "Language Liberty - это профессиональная служба русского перевода, основанная Сабриной Бхатт, преодолевающая индийско-российские культурные и языковые барьеры.",
    "footer.quick": "Быстрые ссылки",
    "footer.connect": "Связаться",
    "footer.rights": "Все права защищены.",
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
