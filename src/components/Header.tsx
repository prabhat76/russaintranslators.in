import { Languages } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../context/LanguageContext";
import flagsImage from "../assets/download.jpg";

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ru" : "en");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md shadow-md border-b-4 border-red-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Flag Image with Enhanced Design */}
            <div className="relative group">
              <div className="absolute inset-0 bg-red-100 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img 
                src={flagsImage} 
                alt="India-Russia Partnership" 
                className="relative w-16 h-12 object-cover rounded-xl shadow-lg border-2 border-red-200 group-hover:scale-105 group-hover:border-red-400 transition-all duration-300"
              />
            </div>
            
            {/* Decorative Divider */}
            <div className="flex items-center gap-3">
              <div className="h-12 w-px bg-gradient-to-b from-transparent via-red-300 to-transparent"></div>
              
              {/* Brand Text */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 
                    className="text-red-800 tracking-tight leading-tight" 
                    style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
                  >
                    Language Liberty
                  </h1>
                  <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded-md text-xs border border-red-200">
                    Est. 2020
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="flex gap-0.5">
                    <div className="w-1 h-1 rounded-full bg-red-600"></div>
                    <div className="w-1 h-1 rounded-full bg-red-400"></div>
                    <div className="w-1 h-1 rounded-full bg-red-600"></div>
                  </div>
                  <p className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {t("header.tagline")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-red-700 transition-colors">
              {t("nav.about")}
            </button>
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-red-700 transition-colors">
              {t("nav.services")}
            </button>
            <button onClick={() => scrollToSection('clients')} className="text-gray-700 hover:text-red-700 transition-colors">
              {t("nav.clients")}
            </button>
            <button onClick={() => scrollToSection('relations')} className="text-gray-700 hover:text-red-700 transition-colors">
              {t("nav.relations")}
            </button>
            <Button onClick={() => scrollToSection('contact')} className="bg-red-700 text-white hover:bg-red-800 shadow-md">
              {t("nav.contact")}
            </Button>
            
            {/* Language Toggle with Flags */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 transition-all"
              title={language === "en" ? "Switch to Russian - Переключиться на русский" : "Switch to English - Переключиться на английский"}
            >
              {language === "en" ? (
                <>
                  <span className="text-lg">🇮🇳</span>
                  <span className="text-sm text-red-700">EN</span>
                  <span className="text-xs text-gray-300">|</span>
                  <span className="text-sm text-gray-500">RU</span>
                </>
              ) : (
                <>
                  <span className="text-lg">🇷🇺</span>
                  <span className="text-sm text-red-700">RU</span>
                  <span className="text-xs text-gray-300">|</span>
                  <span className="text-sm text-gray-500">EN</span>
                </>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
