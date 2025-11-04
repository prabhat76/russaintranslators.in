import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you for your inquiry! We will get back to you shortly.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 text-[#D52B1E] rounded-full mb-4 border border-red-100">
            <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{t("contact.badge")}</p>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 text-gray-900" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, letterSpacing: '-0.01em' }}>
            {t("contact.title")}
          </h2>
          <p className="text-lg text-gray-600" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}>
            {t("contact.subtitle")}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="md:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-gray-700">
                      {t("contact.name")}
                    </label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder={t("contact.name")}
                      className="border-gray-200 focus:border-[#D52B1E] focus:ring-[#D52B1E]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-2 text-gray-700">
                      {t("contact.email")}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder={t("contact.email")}
                      className="border-gray-200 focus:border-[#D52B1E] focus:ring-[#D52B1E]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block mb-2 text-gray-700">
                      Phone
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91 XXXXX XXXXX"
                      className="border-gray-200 focus:border-[#D52B1E] focus:ring-[#D52B1E]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 text-gray-700">
                      {t("contact.message")}
                    </label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder={t("contact.message")}
                      rows={5}
                      className="border-gray-200 focus:border-[#D52B1E] focus:ring-[#D52B1E]"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-[#D52B1E] hover:bg-[#b02318]" size="lg">
                    {t("contact.send")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#D52B1E] rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2 text-gray-900">Email</h3>
                <a href="mailto:contact@languageliberty.in" className="text-gray-600 hover:text-[#D52B1E] transition-colors">
                  contact@languageliberty.in
                </a>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#0039A6] rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2 text-gray-900">Phone</h3>
                <a href="tel:+919876543210" className="text-gray-600 hover:text-[#0039A6] transition-colors">
                  +91 98765 43210
                </a>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#FF9933] rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2 text-gray-900">{t("contact.location")}</h3>
                <p className="text-gray-600">
                  {t("contact.location")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
