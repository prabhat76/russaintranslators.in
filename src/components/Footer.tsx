import { Languages, Mail, Phone, Linkedin, Facebook, Instagram } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Languages className="w-8 h-8 text-red-500" />
              <div>
                <h3 className="text-white">Language Liberty</h3>
                <p className="text-xs text-gray-400">{t("header.tagline")}</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              {t("footer.about.desc")}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-white">{t("footer.quick")}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-400 hover:text-red-500 transition-colors">{t("nav.about")}</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-red-500 transition-colors">{t("nav.services")}</a>
              </li>
              <li>
                <a href="#relations" className="text-gray-400 hover:text-red-500 transition-colors">{t("nav.relations")}</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-red-500 transition-colors">{t("nav.contact")}</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-white">{t("footer.connect")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <a href="mailto:contact@languageliberty.in" className="text-gray-400 hover:text-red-500 transition-colors">
                  contact@languageliberty.in
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-red-500 transition-colors">
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Language Liberty. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
