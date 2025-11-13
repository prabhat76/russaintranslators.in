import { useState, useEffect } from "react";
import { db, storage, auth } from "../config/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { Upload, Trash2, Edit, Plus, LogOut, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";

interface PortfolioItem {
  id?: string;
  client: string;
  industry: string;
  projectType: string;
  year: string;
  description: string;
  descriptionRu: string;
  imageUrl: string;
  logoUrl?: string;
}

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

export function AdminPanel() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"portfolio" | "blog">("portfolio");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Portfolio form state
  const [portfolioForm, setPortfolioForm] = useState<PortfolioItem>({
    client: "",
    industry: "",
    projectType: "",
    year: "",
    description: "",
    descriptionRu: "",
    imageUrl: "",
    logoUrl: ""
  });
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [portfolioImage, setPortfolioImage] = useState<File | null>(null);
  const [portfolioLogo, setPortfolioLogo] = useState<File | null>(null);

  // Blog form state
  const [blogForm, setBlogForm] = useState<BlogPost>({
    title: "",
    titleRu: "",
    content: "",
    contentRu: "",
    imageUrl: "",
    date: new Date().toISOString().split('T')[0],
    author: "Sabrina Bhatt"
  });
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogImage, setBlogImage] = useState<File | null>(null);

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        loadPortfolioItems();
        loadBlogPosts();
      }
    });
    return () => unsubscribe();
  }, []);

  // Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Login successful!");
    } catch (error: any) {
      setMessage("Login failed: " + error.message);
    }
    setLoading(false);
  };

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
    setMessage("Logged out successfully");
  };

  // Upload image to Firebase Storage
  const uploadImage = async (file: File, folder: string): Promise<string> => {
    const timestamp = Date.now();
    const storageRef = ref(storage, `${folder}/${timestamp}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  // Load portfolio items
  const loadPortfolioItems = async () => {
    const querySnapshot = await getDocs(collection(db, "portfolio"));
    const items: PortfolioItem[] = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as PortfolioItem);
    });
    setPortfolioItems(items);
  };

  // Load blog posts
  const loadBlogPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    const posts: BlogPost[] = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() } as BlogPost);
    });
    setBlogPosts(posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  // Add portfolio item
  const handleAddPortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      let imageUrl = portfolioForm.imageUrl;
      let logoUrl = portfolioForm.logoUrl;

      if (portfolioImage) {
        imageUrl = await uploadImage(portfolioImage, "portfolio");
      }
      if (portfolioLogo) {
        logoUrl = await uploadImage(portfolioLogo, "logos");
      }

      await addDoc(collection(db, "portfolio"), {
        ...portfolioForm,
        imageUrl,
        logoUrl
      });

      setMessage("Portfolio item added successfully!");
      setPortfolioForm({
        client: "",
        industry: "",
        projectType: "",
        year: "",
        description: "",
        descriptionRu: "",
        imageUrl: "",
        logoUrl: ""
      });
      setPortfolioImage(null);
      setPortfolioLogo(null);
      loadPortfolioItems();
    } catch (error: any) {
      setMessage("Error: " + error.message);
    }
    setLoading(false);
  };

  // Delete portfolio item
  const handleDeletePortfolio = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteDoc(doc(db, "portfolio", id));
        setMessage("Portfolio item deleted!");
        loadPortfolioItems();
      } catch (error: any) {
        setMessage("Error: " + error.message);
      }
    }
  };

  // Add blog post
  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      let imageUrl = blogForm.imageUrl;

      if (blogImage) {
        imageUrl = await uploadImage(blogImage, "blogs");
      }

      await addDoc(collection(db, "blogs"), {
        ...blogForm,
        imageUrl
      });

      setMessage("Blog post added successfully!");
      setBlogForm({
        title: "",
        titleRu: "",
        content: "",
        contentRu: "",
        imageUrl: "",
        date: new Date().toISOString().split('T')[0],
        author: "Sabrina Bhatt"
      });
      setBlogImage(null);
      loadBlogPosts();
    } catch (error: any) {
      setMessage("Error: " + error.message);
    }
    setLoading(false);
  };

  // Delete blog post
  const handleDeleteBlog = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        await deleteDoc(doc(db, "blogs", id));
        setMessage("Blog post deleted!");
        loadBlogPosts();
      } catch (error: any) {
        setMessage("Error: " + error.message);
      }
    }
  };

  // Login form
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-red-700 hover:bg-red-800 text-white"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          {message && (
            <div className={`mt-4 p-3 rounded-lg ${message.includes("failed") || message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Admin panel
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            Admin Panel
          </h1>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("portfolio")}
              className={`flex-1 px-6 py-4 font-semibold ${activeTab === "portfolio" ? "text-red-700 border-b-2 border-red-700" : "text-gray-500"}`}
            >
              Portfolio Management
            </button>
            <button
              onClick={() => setActiveTab("blog")}
              className={`flex-1 px-6 py-4 font-semibold ${activeTab === "blog" ? "text-red-700 border-b-2 border-red-700" : "text-gray-500"}`}
            >
              Blog Management
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl ${message.includes("Error") || message.includes("failed") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message}
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === "portfolio" && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Add Portfolio Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Plus className="w-6 h-6 text-red-700" />
                Add Portfolio Item
              </h2>
              <form onSubmit={handleAddPortfolio} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                  <input
                    type="text"
                    value={portfolioForm.client}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, client: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <input
                      type="text"
                      value={portfolioForm.industry}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, industry: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                    <input
                      type="text"
                      value={portfolioForm.year}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, year: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                  <input
                    type="text"
                    value={portfolioForm.projectType}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, projectType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (English)</label>
                  <textarea
                    value={portfolioForm.description}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (Russian)</label>
                  <textarea
                    value={portfolioForm.descriptionRu}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, descriptionRu: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPortfolioImage(e.target.files?.[0] || null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Logo (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPortfolioLogo(e.target.files?.[0] || null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-700 hover:bg-red-800 text-white flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  {loading ? "Uploading..." : "Add Portfolio Item"}
                </Button>
              </form>
            </div>

            {/* Portfolio List */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Existing Portfolio Items</h2>
              <div className="space-y-4 max-h-[800px] overflow-y-auto">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-xl p-4 hover:border-red-300 transition-colors">
                    <div className="flex gap-4">
                      {item.imageUrl && (
                        <img src={item.imageUrl} alt={item.client} className="w-24 h-24 object-cover rounded-lg" />
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{item.client}</h3>
                        <p className="text-sm text-gray-600">{item.industry} • {item.year}</p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                      </div>
                      <button
                        onClick={() => handleDeletePortfolio(item.id!)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
                {portfolioItems.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No portfolio items yet</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === "blog" && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Add Blog Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Plus className="w-6 h-6 text-red-700" />
                Add Blog Post
              </h2>
              <form onSubmit={handleAddBlog} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title (English)</label>
                  <input
                    type="text"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title (Russian)</label>
                  <input
                    type="text"
                    value={blogForm.titleRu}
                    onChange={(e) => setBlogForm({ ...blogForm, titleRu: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content (English)</label>
                  <textarea
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    rows={6}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content (Russian)</label>
                  <textarea
                    value={blogForm.contentRu}
                    onChange={(e) => setBlogForm({ ...blogForm, contentRu: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    rows={6}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={blogForm.date}
                      onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                    <input
                      type="text"
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBlogImage(e.target.files?.[0] || null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-700 hover:bg-red-800 text-white flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  {loading ? "Publishing..." : "Publish Blog Post"}
                </Button>
              </form>
            </div>

            {/* Blog List */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Published Blog Posts</h2>
              <div className="space-y-4 max-h-[800px] overflow-y-auto">
                {blogPosts.map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-xl p-4 hover:border-red-300 transition-colors">
                    <div className="flex gap-4">
                      {post.imageUrl && (
                        <img src={post.imageUrl} alt={post.title} className="w-24 h-24 object-cover rounded-lg" />
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{post.title}</h3>
                        <p className="text-sm text-gray-600">{post.author} • {post.date}</p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{post.content}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteBlog(post.id!)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
                {blogPosts.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No blog posts yet</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
