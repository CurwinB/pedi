import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Heart, Shield, Search } from "lucide-react";
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
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="Natural wellness herbs and remedies" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Discover Natural Remedies with AI
              </h1>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
                Get personalized natural health solutions powered by artificial intelligence. 
                Search symptoms and discover time-tested remedies backed by research.
              </p>
            </div>
            
            <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Try: 'headache relief' or 'trouble sleeping' or 'digestive issues'"
                size="large"
              />
              <p className="text-sm opacity-75 mt-3">
                Search in natural language - describe your symptoms or health concerns
              </p>
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
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Browse by Category</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore natural remedies organized by health category to find solutions for your specific needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="bg-gradient-card hover:shadow-natural transition-all duration-300 cursor-pointer group">
                <CardHeader className="text-center pb-3">
                  <div className="mx-auto p-3 bg-primary/10 rounded-full mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm text-center leading-relaxed">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Middle Ad */}
        <div className="flex justify-center mb-12">
          <AdPlaceholder size="rectangle" />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Natural Remedies?</h2>
              <p className="text-muted-foreground text-lg">
                Discover the benefits of traditional healing backed by modern research
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Time-Tested Solutions</h3>
                <p className="text-muted-foreground">
                  Remedies used for centuries, now validated by modern research and scientific studies.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">AI-Powered Search</h3>
                <p className="text-muted-foreground">
                  Advanced AI understands your symptoms and provides personalized natural remedy recommendations.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Safety First</h3>
                <p className="text-muted-foreground">
                  Complete information on usage, interactions, and safety warnings for informed decisions.
                </p>
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
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Natural Remedies AI</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the power of natural healing with AI-powered insights. Always consult healthcare 
              professionals before starting any new treatment.
            </p>
            <div className="text-sm text-muted-foreground">
              © 2024 Natural Remedies AI. For informational purposes only.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
