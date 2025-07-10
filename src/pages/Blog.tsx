import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, User, Search, Leaf, Heart, Shield, Brain } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const blogPosts = [
    {
      id: 1,
      title: "The Science Behind Turmeric: A Natural Anti-Inflammatory Wonder",
      excerpt: "Discover how curcumin, the active compound in turmeric, has been scientifically proven to reduce inflammation and support overall health.",
      author: "Dr. Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Research",
      tags: ["turmeric", "inflammation", "science"],
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=200&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "5 Herbal Teas That Can Improve Your Sleep Quality",
      excerpt: "Learn about chamomile, valerian root, and other natural remedies that can help you achieve better, more restful sleep.",
      author: "Emma Martinez",
      date: "2024-01-12",
      readTime: "4 min read",
      category: "Wellness",
      tags: ["sleep", "herbal tea", "insomnia"],
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Ancient Ayurvedic Practices for Modern Stress Relief",
      excerpt: "Explore time-tested Ayurvedic techniques that can help manage stress and anxiety in today's fast-paced world.",
      author: "Dr. Raj Patel",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Traditional Medicine",
      tags: ["ayurveda", "stress", "meditation"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Building Your Home Herb Garden: A Beginner's Guide",
      excerpt: "Start growing your own medicinal herbs with our comprehensive guide to creating a healing garden at home.",
      author: "Lisa Chen",
      date: "2024-01-08",
      readTime: "7 min read",
      category: "DIY",
      tags: ["herbs", "gardening", "homegrown"],
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=200&fit=crop"
    },
    {
      id: 5,
      title: "Essential Oils vs. Synthetic Fragrances: What You Need to Know",
      excerpt: "Understanding the differences between natural essential oils and synthetic alternatives for therapeutic use.",
      author: "Michael Thompson",
      date: "2024-01-05",
      readTime: "5 min read",
      category: "Education",
      tags: ["essential oils", "aromatherapy", "natural"],
      image: "https://images.unsplash.com/photo-1582894905531-2b8afc40e45b?w=400&h=200&fit=crop"
    },
    {
      id: 6,
      title: "The Role of Nutrition in Natural Healing",
      excerpt: "Discover how proper nutrition and superfoods can enhance your body's natural healing processes.",
      author: "Dr. Amanda Foster",
      date: "2024-01-03",
      readTime: "8 min read",
      category: "Nutrition",
      tags: ["nutrition", "superfoods", "healing"],
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=200&fit=crop"
    }
  ];

  const categories = [
    { name: "All", icon: Leaf, count: blogPosts.length },
    { name: "Research", icon: Brain, count: blogPosts.filter(post => post.category === "Research").length },
    { name: "Wellness", icon: Heart, count: blogPosts.filter(post => post.category === "Wellness").length },
    { name: "Traditional Medicine", icon: Shield, count: blogPosts.filter(post => post.category === "Traditional Medicine").length },
    { name: "DIY", icon: Leaf, count: blogPosts.filter(post => post.category === "DIY").length },
    { name: "Education", icon: Brain, count: blogPosts.filter(post => post.category === "Education").length },
    { name: "Nutrition", icon: Heart, count: blogPosts.filter(post => post.category === "Nutrition").length }
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Natural Health <span className="text-primary-glow">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              Discover evidence-based insights, traditional wisdom, and practical tips for natural healing and wellness.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.name)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.name}</span>
                  <Badge variant="secondary" className="ml-1">
                    {category.count}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && selectedCategory === "All" && !searchTerm && (
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Featured Article</h2>
            <Card className="overflow-hidden hover:shadow-natural transition-all duration-300 bg-gradient-card border-0">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge>{featuredPost.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{featuredPost.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{featuredPost.author}</span>
                    </div>
                    <Button>Read Article</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <Card 
                  key={post.id} 
                  className="overflow-hidden hover:shadow-natural transition-all duration-300 cursor-pointer group bg-card border-border animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge>{post.category}</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center text-sm text-muted-foreground space-x-4 mb-2">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{post.author}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gradient-accent/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Stay Updated</h2>
            <p className="text-muted-foreground text-lg">
              Get the latest articles on natural health and wellness delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="bg-gradient-hero hover:shadow-glow">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;