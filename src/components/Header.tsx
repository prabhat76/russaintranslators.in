import { Button } from "./ui/button";
import { useLanguage } from "../context/LanguageContext";
import { LanguageToggleSimple } from "./ui/language-toggle-simple";


export function Header() {
  const { language, setLanguage, t } = useLanguage();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };



  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md shadow-md border-b-4 border-red-700">
      <div className="container mx-auto px-4" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex items-center justify-between">
          <div></div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-red-700 transition-colors">
              {t("nav.about")}
            </button>
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-red-700 transition-colors">
              {t("nav.services")}
            </button>
            <button onClick={() => scrollToSection('portfolio')} className="text-gray-700 hover:text-red-700 transition-colors">
              Portfolio
            </button>
            <button onClick={() => scrollToSection('relations')} className="text-gray-700 hover:text-red-700 transition-colors">
              {t("nav.relations")}
            </button>
            <Button onClick={() => scrollToSection('contact')} className="bg-red-700 text-white hover:bg-red-800 shadow-md">
              {t("nav.contact")}
            </Button>
            
            <LanguageToggleSimple />
          </nav>
        </div>
      </div>
    </header>
  );
}
