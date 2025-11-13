import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Handshake, TrendingUp, Building2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function IndoRussianRelations() {
  const { t } = useLanguage();
  
  return (
    <section id="relations" className="py-24 bg-gradient-to-br from-red-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 bg-red-700 text-white rounded-full mb-4">
            <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{t("relations.badge")}</p>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 text-gray-900" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, letterSpacing: '-0.01em' }}>
            {t("relations.title")}
          </h2>
          <p className="text-lg text-gray-600" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}>
            {t("relations.subtitle")}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1564507592333-c60657eea523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWolMjBtYWhhbCUyMGluZGlhfGVufDF8fHx8MTc2MTgwMzU0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Taj Mahal"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg mt-8">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1642600962564-2683f5847715?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXNzaWFuJTIwYXJjaGl0ZWN0dXJlJTIwbW9zY293fGVufDF8fHx8MTc2MTg5MDk5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Russian Architecture"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg col-span-2 -mt-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1629635604005-ac3b76405996?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFuc2xhdGlvbiUyMGxhbmd1YWdlJTIwYm9va3N8ZW58MXx8fHwxNzYxODkwOTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Translation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <p className="text-lg text-gray-600 mb-4">
                {t("relations.history.desc")}
              </p>
              <p className="text-lg text-gray-600">
                {t("relations.role")}
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                  <Handshake className="w-6 h-6 text-red-700" />
                </div>
                <div>
                  <h3 className="mb-1 text-gray-900">{t("relations.defense")}</h3>
                  <p className="text-gray-600">{t("relations.defense.desc")}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                  <TrendingUp className="w-6 h-6 text-red-700" />
                </div>
                <div>
                  <h3 className="mb-1 text-gray-900">{t("relations.trade")}</h3>
                  <p className="text-gray-600">{t("relations.trade.desc")}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                  <Building2 className="w-6 h-6 text-red-700" />
                </div>
                <div>
                  <h3 className="mb-1 text-gray-900">{t("relations.culture")}</h3>
                  <p className="text-gray-600">{t("relations.culture.desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
