import { FileText, Users, Briefcase, GraduationCap, Scale, BookOpen } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useLanguage } from "../context/LanguageContext";

export function Services() {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: Briefcase,
      titleKey: "services.business",
      descKey: "services.business.desc"
    },
    {
      icon: Scale,
      titleKey: "services.legal",
      descKey: "services.legal.desc"
    },
    {
      icon: FileText,
      titleKey: "services.technical",
      descKey: "services.technical.desc"
    },
    {
      icon: Users,
      titleKey: "services.interpretation",
      descKey: "services.interpretation.desc"
    },
    {
      icon: GraduationCap,
      titleKey: "services.website",
      descKey: "services.website.desc"
    },
    {
      icon: BookOpen,
      titleKey: "services.literary",
      descKey: "services.literary.desc"
    }
  ];
  
  const iconColors = [
    'bg-[#D52B1E] text-white', // Russia Red
    'bg-[#0039A6] text-white', // Russia Blue
    'bg-[#FF9933] text-white', // India Orange
    'bg-[#D52B1E] text-white', // Russia Red
    'bg-[#0039A6] text-white', // Russia Blue
    'bg-[#138808] text-white', // India Green
  ];
  
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 text-[#D52B1E] rounded-full mb-4 border border-red-100">
            <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{t("services.badge")}</p>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 text-gray-900" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, letterSpacing: '-0.01em' }}>
            {t("services.title")}
          </h2>
          <p className="text-lg text-gray-600" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}>
            {t("services.subtitle")}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${iconColors[index]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="mb-2 text-gray-900">{t(service.titleKey)}</h3>
                  <p className="text-gray-600">{t(service.descKey)}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
