import { useLanguage } from "../context/LanguageContext";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Calendar, User, Clock } from "lucide-react";

interface BlogPost {
  id?: string;
  title: string;
  titleRu: string;
  content: string;
  contentRu: string;
  imageUrl: string;
  date: string;
  author: string;
}

export function Blog() {
  const { t, language } = useLanguage();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Load blog posts from Firebase
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const posts: BlogPost[] = [];
        querySnapshot.forEach((doc) => {
          posts.push({ id: doc.id, ...doc.data() } as BlogPost);
        });
        setBlogPosts(posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (error) {
        console.log("No blog posts available:", error);
      }
      setLoading(false);
    };

    loadBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === "ru" ? "ru-RU" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);
  };

  if (blogPosts.length === 0 && !loading) {
    return null; // Don't show section if no blogs
  }

  return (
    <section id="blog" className="py-24 bg-gradient-to-br from-white via-gray-50 to-red-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full border border-red-200 mb-4">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-red-700 font-medium text-sm">
              {language === "ru" ? "Блог" : "Blog"}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            {language === "ru" ? "Последние новости" : "Latest Insights"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === "ru" 
              ? "Статьи и новости о языке, культуре и индийско-российских отношениях"
              : "Articles and updates on language, culture, and Indo-Russian relations"
            }
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">{language === "ru" ? "Загрузка..." : "Loading..."}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Featured Image */}
                <div className="relative h-56 overflow-hidden bg-gray-200">
                  <img
                    src={post.imageUrl}
                    alt={language === "ru" ? post.titleRu : post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-700 transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {language === "ru" ? post.titleRu : post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
                    {language === "ru" ? post.contentRu : post.content}
                  </p>

                  {/* Read More Button */}
                  <button className="text-red-700 font-semibold text-sm hover:gap-2 flex items-center gap-1 transition-all duration-300 group-hover:gap-2">
                    <span>{language === "ru" ? "Читать далее" : "Read More"}</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div>

                {/* Bottom accent line */}
                <div className="h-1 bg-gradient-to-r from-red-600 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
