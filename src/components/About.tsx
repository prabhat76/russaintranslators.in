import { Heart, Globe2, Award } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import flagsImage from "../assets/download.jpg";
import sabrinaMeeting from "../assets/image.png";

export function About() {
    const { t } = useLanguage();

    return (
        <section id="about" className="py-24 bg-gradient-to-b from-red-50 to-white">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={sabrinaMeeting}
                                alt="Sabrina Bhatt with Russian and Indian officials"
                                className="w-full h-full object-cover bg-gray-50"
                            />
                        </div>

                        {/* India-Russia Partnership Badge with Flag */}
                        <motion.div
                            className="absolute -bottom-6 -right-6 bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-2xl shadow-2xl max-w-xs border-2 border-red-200"
                            initial={{ y: 20, opacity: 0, scale: 0.9 }}
                            animate={{ y: [0, -10, 0], opacity: 1, scale: [0.9, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <img
                                    src={flagsImage}
                                    alt="India-Russia Partnership"
                                    className="w-16 h-12 object-cover rounded-lg shadow-md border border-gray-200"
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
                                    <p className="text-xs text-red-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        Partnership
                                    </p>
                                </div>
                            </div>
                            <h3 className="text-lg text-red-800 font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>About Our Founder</h3>
                            <p className="text-xs text-red-800 italic" style={{ fontFamily: 'Playfair Display, serif', lineHeight: '1.6' }}>
                                "Language is the bridge between cultures. My heritage allows me to build that bridge with authenticity and deep cultural understanding." — Sabrina Bhatt
                            </p>
                        </motion.div>
                    </div>

                    <div>
                        <div className="inline-block px-4 py-2 bg-red-50 text-red-700 rounded-full mb-4">
                            <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{t("about.badge")}</p>
                        </div>
                        <h2 className="text-4xl md:text-5xl mb-6 text-red-900" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, letterSpacing: '-0.01em' }}>{t("about.name")}</h2>
                        <p className="text-lg text-gray-600 mb-6" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}>
                            Born to a Russian mother and raised with a deep appreciation for both Indian and Russian cultures, Sabrina Bhatt brings a unique perspective to language translation services.
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
                                    <h3 className="mb-1 text-red-800">Heritage</h3>
                                    <p className="text-gray-600">Born to a Russian mother and an Indian father, she always enjoyed burning the communicational bridges between Russian speaking countries and the rest of the world. She was born in Russia and has done her schooling in parts of Russia and Uzbekistan.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                    <Globe2 className="w-6 h-6 text-red-700" />
                                </div>
                                <div>
                                    <h3 className="mb-1 text-red-800">{t("about.expertise")}</h3>
                                    <p className="text-gray-600">{t("about.expertise.desc")}</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                    <Award className="w-6 h-6 text-red-700" />
                                </div>
                                <div>
                                    <h3 className="mb-1 text-red-800">Bridge</h3>
                                    <p className="text-gray-600">Having an experience of more than 6 years of working with different companies who are into pharmaceuticals, chemicals, mining and export/import businesses she is currently working with Enrika Trades and Services Pvt. Ltd. She regularly attends meeting at a ministerial level with several companies like Coal India, Belaz, Artek Surfin Chemical Ltd and many more .</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
