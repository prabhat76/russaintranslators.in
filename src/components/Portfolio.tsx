import { useLanguage } from "../context/LanguageContext";
import { Building2, Calendar, FileText, ExternalLink } from "lucide-react";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

interface PortfolioItem {
  id?: string;
  imageUrl: string;
  client: string;
  industry: string;
  projectType: string;
  year: string;
  description: string;
  descriptionRu: string;
  logoUrl?: string;
}

export function Portfolio() {
  const { t, language } = useLanguage();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback portfolio items if Firebase is not configured or empty
  const fallbackItems: PortfolioItem[] = [
    {
      id: "1",
      imageUrl: "/portfolio/portfolio-1.jpg",
      client: "Sirmaxo Chemicals Pvt Ltd",
      industry: "Manufacturing",
      projectType: "Business Translation",
      year: "2020-Present",
      description: "Technical documentation and client communication for architectural glass manufacturing",
      descriptionRu: "Техническая документация и коммуникация с клиентами для производства архитектурного стекла"
    },
    {
      id: "2",
      imageUrl: "/portfolio/portfolio-2.jpg",
      client: "Sulphur Mills Ltd",
      industry: "Manufacturing",
      projectType: "Training & Translation",
      year: "2020-Present",
      description: "Industrial documentation and technical specifications for sulphur processing",
      descriptionRu: "Промышленная документация и технические спецификации для переработки серы"
    },
    {
      id: "3",
      imageUrl: "/portfolio/portfolio-3.jpg",
      client: "KJK Diamonds",
      industry: "Retail",
      projectType: "Cultural Training",
      year: "2021",
      description: "Corporate communications and business proposals for diamond trading",
      descriptionRu: "Корпоративные коммуникации и бизнес-предложения для торговли алмазами"
    },
    {
      id: "4",
      imageUrl: "/portfolio/portfolio-4.jpg",
      client: "Foreign Language Institute",
      industry: "Education",
      projectType: "Language Training",
      year: "2019-Present",
      description: "Educational materials and student communication for language institute",
      descriptionRu: "Образовательные материалы и коммуникация со студентами языкового института"
    },
    {
      id: "5",
      imageUrl: "/portfolio/portfolio-5.jpg",
      client: "Corporate Clients",
      industry: "Various",
      projectType: "Business Translation",
      year: "2020-Present",
      description: "Business contracts and corporate documentation translation",
      descriptionRu: "Перевод деловых контрактов и корпоративной документации"
    },
    {
      id: "6",
      imageUrl: "/portfolio/portfolio-6.jpg",
      client: "Educational Institutions",
      industry: "Education",
      projectType: "Academic Translation",
      year: "2019-Present",
      description: "Academic materials and institutional documentation translation",
      descriptionRu: "Перевод академических материалов и институциональной документации"
    }
  ];

  // Load portfolio items from Firebase
  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "portfolio"));
        const items: PortfolioItem[] = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as PortfolioItem);
        });
        
        // Use Firebase data if available, otherwise use fallback
        if (items.length > 0) {
          setPortfolioItems(items);
        } else {
          setPortfolioItems(fallbackItems);
        }
      } catch (error) {
        console.log("Using fallback portfolio items:", error);
        setPortfolioItems(fallbackItems);
      }
      setLoading(false);
    };

    loadPortfolio();
  }, []);

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
          {loading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">Loading portfolio...</p>
            </div>
          ) : (
            portfolioItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <img
                    src={item.imageUrl}
                    alt={item.client}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback if image not found
                      e.currentTarget.src = `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Logo overlay (if available) */}
                  {item.logoUrl && (
                    <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-lg">
                      <img src={item.logoUrl} alt={`${item.client} logo`} className="h-8 w-auto" />
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
                    {language === "ru" ? item.descriptionRu : item.description}
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
            ))
          )}
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

        {/* Experience Timeline Graph */}
        <div className="mt-20">
          <ExperienceTimeline />
        </div>
      </div>
    </section>
  );
}
