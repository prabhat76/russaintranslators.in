import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { useLanguage } from "../context/LanguageContext";
import flagsImage from "../assets/download.jpg";

export function Hero() {
  const { t } = useLanguage();
  
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
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
        
        {/* Minimal Tint for Text Readability - Far Left */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.28) 18%, rgba(0,0,0,0.10) 32%, transparent 42%)'
          }}
        ></div>
        
        {/* Subtle bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-2xl text-white ml-8 md:ml-16" style={{ marginTop: '-222px' }}>
          {/* Clean Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl mb-8 border border-red-100">
            <p className="text-sm text-[#D52B1E]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              {t("hero.badge")}
            </p>
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