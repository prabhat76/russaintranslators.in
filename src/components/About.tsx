import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, Globe2, Award } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import flagsImage from "../assets/download.jpg";
import sabrinaPhoto from "../assets/sabrina-photo.jpg";

export function About() {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={sabrinaPhoto}
                alt="Sabrina Bhatt - Professional Russian Translator"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* India-Russia Partnership Badge with Flag */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl max-w-xs border-2 border-red-100">
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={flagsImage} 
                  alt="India-Russia Partnership" 
                  className="w-20 h-16 object-cover rounded-lg shadow-md border border-gray-200"
                />
                <div className="flex flex-col">
                  <div className="flex gap-1 mb-1">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  </div>
                  <p className="text-xs text-red-700" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    India-Russia
                  </p>
                  <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Partnership
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                "{t("about.quote")}"
              </p>
              <p className="mt-2 text-xs text-gray-500">{t("about.author")}</p>
            </div>
          </div>
          
          <div>
            <div className="inline-block px-4 py-2 bg-red-50 text-red-700 rounded-full mb-4">
              <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{t("about.badge")}</p>
            </div>
            <h2 className="text-4xl md:text-5xl mb-6 text-gray-900" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, letterSpacing: '-0.01em' }}>{t("about.name")}</h2>
            <p className="text-lg text-gray-600 mb-6" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}>
              {t("about.bio1")}
            </p>
            <p className="text-lg text-gray-600 mb-8" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}>
              {t("about.bio2")}
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-700" />
                </div>
                <div>
                  <h3 className="mb-1 text-gray-900">{t("about.heritage")}</h3>
                  <p className="text-gray-600">{t("about.heritage.desc")}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Globe2 className="w-6 h-6 text-red-700" />
                </div>
                <div>
                  <h3 className="mb-1 text-gray-900">{t("about.expertise")}</h3>
                  <p className="text-gray-600">{t("about.expertise.desc")}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-red-700" />
                </div>
                <div>
                  <h3 className="mb-1 text-gray-900">{t("about.bridge")}</h3>
                  <p className="text-gray-600">{t("about.bridge.desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
