import { useLanguage } from "../context/LanguageContext";
import { Building2, Calendar, FileText, ExternalLink } from "lucide-react";

interface PortfolioItem {
  id: number;
  image: string;
  client: string;
  industry: string;
  projectType: string;
  year: string;
  description: string;
  logo?: string;
}

export function Portfolio() {
  const { t } = useLanguage();

  // Portfolio items - Easy to add/remove/modify
  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      image: "/portfolio/sirmaxo.jpg", // Place images in public/portfolio/
      client: "Sirmaxo Chemicals Pvt Ltd",
      industry: "Manufacturing",
      projectType: "Business Translation",
      year: "2020-Present",
      description: t("portfolio.item1.desc"),
      logo: "/logos/sirmaxo.png" // Optional: client logo
    },
    {
      id: 2,
      image: "/portfolio/sulphur.jpg",
      client: "Sulphur Mills Ltd",
      industry: "Manufacturing",
      projectType: "Training & Translation",
      year: "2020-Present",
      description: t("portfolio.item2.desc")
    },
    {
      id: 3,
      image: "/portfolio/kjk.jpg",
      client: "KJK Diamonds",
      industry: "Retail",
      projectType: "Cultural Training",
      year: "2021",
      description: t("portfolio.item3.desc")
    },
    {
      id: 4,
      image: "/portfolio/fli.jpg",
      client: "Foreign Language Institute",
      industry: "Education",
      projectType: "Language Training",
      year: "2019-Present",
      description: t("portfolio.item4.desc")
    },
    {
      id: 5,
      image: "/portfolio/corporate.jpg",
      client: "Corporate Enterprises",
      industry: "Multiple",
      projectType: "Business Translation",
      year: "2020-Present",
      description: t("portfolio.item5.desc")
    },
    {
      id: 6,
      image: "/portfolio/education.jpg",
      client: "Educational Institutions",
      industry: "Education",
      projectType: "Academic Translation",
      year: "2020-Present",
      description: t("portfolio.item6.desc")
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-br from-gray-50 via-white to-red-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full border border-red-200 mb-4">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-red-700 font-medium text-sm">{t("portfolio.badge")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            {t("portfolio.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("portfolio.subtitle")}
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img
                  src={item.image}
                  alt={item.client}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback if image not found
                    e.currentTarget.src = `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Logo overlay (if available) */}
                {item.logo && (
                  <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-lg">
                    <img src={item.logo} alt={`${item.client} logo`} className="h-8 w-auto" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium border border-red-200">
                    {item.industry}
                  </span>
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                    {item.year}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {item.client}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <FileText className="w-4 h-4" />
                  <span>{item.projectType}</span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                {/* View Details Button */}
                <button className="mt-4 flex items-center gap-2 text-red-700 font-medium text-sm hover:gap-3 transition-all duration-300">
                  <span>View Details</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center p-6 rounded-xl bg-white shadow-lg border border-gray-100">
            <div className="text-4xl font-bold text-red-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t("portfolio.stat1.value")}
            </div>
            <div className="text-sm text-gray-600">{t("portfolio.stat1.label")}</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white shadow-lg border border-gray-100">
            <div className="text-4xl font-bold text-red-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t("portfolio.stat2.value")}
            </div>
            <div className="text-sm text-gray-600">{t("portfolio.stat2.label")}</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white shadow-lg border border-gray-100">
            <div className="text-4xl font-bold text-red-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t("portfolio.stat3.value")}
            </div>
            <div className="text-sm text-gray-600">{t("portfolio.stat3.label")}</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white shadow-lg border border-gray-100">
            <div className="text-4xl font-bold text-red-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t("portfolio.stat4.value")}
            </div>
            <div className="text-sm text-gray-600">{t("portfolio.stat4.label")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
