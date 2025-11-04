import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { useLanguage } from "../context/LanguageContext";
import flagsImage from "figma:asset/ef9e02fa22c0907cb0e03f86b7c3180828061600.png";

export function Hero() {
  const { t } = useLanguage();
  
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Crystal Clear Flag Background - Full Screen */}
        <div className="absolute inset-0">
          <img 
            src={flagsImage} 
            alt="India-Russia Partnership" 
            className="w-full h-full object-cover"
            style={{
              imageRendering: '-webkit-optimize-contrast',
              transform: 'scale(1.15)',
              transformOrigin: 'center center'
            }}
          />
        </div>
        
        {/* Strategic Gradient Only for Text Area - Left Side */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.35) 45%, transparent 60%)'
          }}
        ></div>
        
        {/* Bottom gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-2xl text-white">
          {/* Flag Badge with Enhanced Design */}
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl mb-8 border border-red-100">
            <div className="relative">
              <img 
                src={flagsImage} 
                alt="India-Russia Partnership" 
                className="w-16 h-12 object-cover rounded-lg shadow-md"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="border-l border-gray-200 pl-3">
              <p className="text-sm text-red-700" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                {t("hero.badge")}
              </p>
              <p className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                India 🇮🇳 • Russia 🇷🇺
              </p>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl mb-6 text-white" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, letterSpacing: '-0.02em' }}>{t("hero.title")}</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}>
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={scrollToContact} size="lg" className="bg-[#D52B1E] hover:bg-[#b02318] text-white shadow-lg">
              {t("hero.cta")}
            </Button>
            <Button 
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} 
              size="lg" 
              className="bg-white/95 backdrop-blur-sm text-gray-900 hover:bg-white border-2 border-white shadow-lg"
            >
              {t("hero.learn")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
