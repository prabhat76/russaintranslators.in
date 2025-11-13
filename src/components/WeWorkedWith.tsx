import { useLanguage } from "../context/LanguageContext";
import { Building2, Factory, Briefcase, GraduationCap, Ship, Heart } from "lucide-react";

export function WeWorkedWith() {
  const { t } = useLanguage();

  const clients = [
    {
      icon: Building2,
      name: t("clients.corporate"),
      description: t("clients.corporate.desc"),
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Factory,
      name: t("clients.manufacturing"),
      description: t("clients.manufacturing.desc"),
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      icon: Briefcase,
      name: t("clients.legal"),
      description: t("clients.legal.desc"),
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: GraduationCap,
      name: t("clients.education"),
      description: t("clients.education.desc"),
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: Ship,
      name: t("clients.trade"),
      description: t("clients.trade.desc"),
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200"
    },
    {
      icon: Heart,
      name: t("clients.healthcare"),
      description: t("clients.healthcare.desc"),
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    }
  ];

  return (
    <section id="clients" className="py-24 bg-gradient-to-br from-gray-50 via-white to-red-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full border border-red-200 mb-4">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-red-700 font-medium text-sm">{t("clients.badge")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            {t("clients.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("clients.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients.map((client, index) => {
            const Icon = client.icon;
            return (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl ${client.bgColor} border-2 ${client.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
              >
                <div className={`inline-flex p-4 rounded-xl ${client.bgColor} border-2 ${client.borderColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${client.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {client.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {client.description}
                </p>
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${client.bgColor} rounded-b-2xl transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            );
          })}
        </div>

        {/* Success Statistics */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center p-6 rounded-xl bg-white shadow-lg border border-gray-100">
            <div className="text-4xl font-bold text-red-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t("clients.stat1.value")}
            </div>
            <div className="text-sm text-gray-600">{t("clients.stat1.label")}</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white shadow-lg border border-gray-100">
            <div className="text-4xl font-bold text-red-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t("clients.stat2.value")}
            </div>
            <div className="text-sm text-gray-600">{t("clients.stat2.label")}</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white shadow-lg border border-gray-100">
            <div className="text-4xl font-bold text-red-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t("clients.stat3.value")}
            </div>
            <div className="text-sm text-gray-600">{t("clients.stat3.label")}</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white shadow-lg border border-gray-100">
            <div className="text-4xl font-bold text-red-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t("clients.stat4.value")}
            </div>
            <div className="text-sm text-gray-600">{t("clients.stat4.label")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
