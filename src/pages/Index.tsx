import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Heart, Shield, Search, Sparkles, Book, Users } from "lucide-react";
import Header from "@/components/Header";
import heroImage from "@/assets/hero-wellness.jpg";

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/clarify?q=${encodeURIComponent(query)}`);
  };

  const categories = [
    { name: "Digestive Health", description: "Natural remedies for stomach issues, bloating, and digestive wellness", icon: Heart },
    { name: "Pain & Inflammation", description: "Natural approaches to managing pain and reducing inflammation", icon: Shield },
    { name: "Mental Wellness", description: "Herbs and natural solutions for stress, anxiety, and mental clarity", icon: Leaf },
    { name: "Immune Support", description: "Natural ways to boost immunity and support overall health", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img 
            src={heroImage} 
            alt="Natural wellness herbs and remedies" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 opacity-20 animate-float">
          <Leaf className="h-12 w-12 text-primary-foreground" />
        </div>
        <div className="absolute top-40 right-20 opacity-20 animate-float" style={{ animationDelay: '1s' }}>
          <Sparkles className="h-8 w-8 text-primary-foreground" />
        </div>
        <div className="absolute bottom-32 left-1/4 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
          <Heart className="h-10 w-10 text-primary-foreground" />
        </div>
        
        <div className="relative container mx-auto px-4 pt-32 pb-20 lg:pt-40 lg:pb-32">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-white/90 bg-clip-text">
                Welcome to <span className="text-primary-glow">Remedypedia</span>
              </h1>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
                Discover the power of natural healing with AI-powered insights. Get personalized remedies 
                backed by centuries of traditional wisdom and modern research.
              </p>
            </div>
            
            <div className="bg-background/10 backdrop-blur-md rounded-3xl p-8 border border-primary-foreground/20 shadow-glow animate-slide-up">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Try: 'headache relief' or 'trouble sleeping' or 'digestive issues'"
                size="large"
              />
              <p className="text-sm opacity-75 mt-4">
                Search in natural language - describe your symptoms or health concerns
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-6">
              <div className="text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="text-3xl font-bold text-primary-glow">1000+</div>
                <div className="text-sm opacity-80">Natural Remedies</div>
              </div>
              <div className="text-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
                <div className="text-3xl font-bold text-primary-glow">50+</div>
                <div className="text-sm opacity-80">Health Categories</div>
              </div>
              <div className="text-center animate-fade-in" style={{ animationDelay: '0.9s' }}>
                <div className="text-3xl font-bold text-primary-glow">24/7</div>
                <div className="text-sm opacity-80">AI Assistant</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Ad */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <AdPlaceholder size="leaderboard" />
        </div>
      </div>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground mb-6">Browse by Category</h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Explore natural remedies organized by health category to find solutions for your specific needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={index} 
                className="bg-gradient-card hover:shadow-natural transition-all duration-500 cursor-pointer group border-0 hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto p-4 bg-gradient-accent rounded-2xl mb-4 group-hover:shadow-glow transition-all duration-300">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Middle Ad */}
        <div className="flex justify-center mb-16">
          <AdPlaceholder size="rectangle" />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-accent/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl font-bold text-foreground mb-6">Why Choose Remedypedia?</h2>
              <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
                Discover the benefits of traditional healing backed by modern research and AI technology
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="text-center space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="mx-auto w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-glow">
                  <Leaf className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Time-Tested Solutions</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Remedies used for centuries, now validated by modern research and scientific studies. Traditional wisdom meets contemporary science.
                </p>
              </div>

              <div className="text-center space-y-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="mx-auto w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-glow">
                  <Sparkles className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">AI-Powered Intelligence</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Advanced AI understands your symptoms and provides personalized natural remedy recommendations tailored to your unique situation.
                </p>
              </div>

              <div className="text-center space-y-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <div className="mx-auto w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-glow">
                  <Shield className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Safety & Trust</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Complete information on usage, interactions, and safety warnings. Always consult healthcare professionals for informed decisions.
                </p>
              </div>
            </div>

            {/* Additional Features */}
            <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
              <div className="flex items-center space-x-4 p-6 bg-card rounded-2xl border border-border shadow-soft">
                <div className="p-3 bg-primary-soft rounded-xl">
                  <Book className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Comprehensive Database</h4>
                  <p className="text-muted-foreground">Access thousands of natural remedies from cultures worldwide</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-card rounded-2xl border border-border shadow-soft">
                <div className="p-3 bg-primary-soft rounded-xl">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Community Trusted</h4>
                  <p className="text-muted-foreground">Remedies reviewed and validated by health experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <AdPlaceholder size="leaderboard" />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Remedypedia</h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                Discover the power of natural healing with AI-powered insights. Your trusted companion 
                for traditional remedies backed by modern research.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button 
                variant="outline" 
                onClick={() => navigate("/search?q=popular")}
                className="bg-card hover:bg-gradient-card"
              >
                Explore All Remedies
              </Button>
              <Button 
                variant="ghost"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Back to Top
              </Button>
            </div>
            
            <div className="pt-8 border-t border-border">
              <div className="text-sm text-muted-foreground space-y-2">
                <div>© 2024 Remedypedia. For informational purposes only.</div>
                <div>Always consult healthcare professionals before starting any new treatment.</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
