import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Heart, Shield, Search, Sparkles, Book, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-wellness.jpg";
import logo from "/lovable-uploads/123aadee-f061-4367-8c78-1a4ec06bf1d9.png";

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/clarify?q=${encodeURIComponent(query)}`);
  };

  const categories = [
    { 
      name: "Digestive Health", 
      description: "Discover time-tested natural remedies for digestive issues including acid reflux, bloating, IBS, constipation, and stomach ulcers. Learn about herbal treatments, dietary solutions, and traditional medicine approaches.", 
      icon: Heart,
      keywords: "digestive health, stomach remedies, acid reflux treatment, bloating relief, IBS natural treatment"
    },
    { 
      name: "Pain & Inflammation", 
      description: "Explore natural pain relief methods for arthritis, headaches, muscle pain, joint inflammation, and chronic pain conditions using herbs, essential oils, and traditional healing practices.", 
      icon: Shield,
      keywords: "natural pain relief, arthritis remedies, headache treatment, anti-inflammatory herbs, muscle pain relief"
    },
    { 
      name: "Mental Wellness", 
      description: "Find natural solutions for anxiety, depression, stress management, insomnia, and mental clarity using adaptogenic herbs, meditation techniques, and holistic wellness approaches.", 
      icon: Leaf,
      keywords: "anxiety relief, natural antidepressants, stress management, insomnia remedies, mental health herbs"
    },
    { 
      name: "Immune Support", 
      description: "Strengthen your immune system naturally with proven remedies for cold prevention, flu treatment, respiratory health, and overall immunity using medicinal plants and supplements.", 
      icon: Shield,
      keywords: "immune system boosters, cold remedies, flu prevention, respiratory health, natural antibiotics"
    }
  ];

  const healthConditions = [
    "Headaches and Migraines", "Common Cold and Flu", "Digestive Issues", "Sleep Disorders",
    "Anxiety and Stress", "Skin Conditions", "Respiratory Problems", "Joint Pain and Arthritis",
    "High Blood Pressure", "Diabetes Management", "Weight Management", "Hormonal Imbalances"
  ];

  const popularRemedies = [
    "Turmeric for inflammation", "Ginger for nausea", "Echinacea for immunity", "Chamomile for sleep",
    "Garlic for infections", "Aloe vera for skin", "Peppermint for digestion", "Lavender for anxiety",
    "Green tea for antioxidants", "Honey for coughs", "Apple cider vinegar for digestion", "Ginkgo for memory"
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
                Welcome to <span className="text-white font-bold drop-shadow-lg">Remedypedia</span>
              </h1>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
                Your comprehensive natural health database featuring over 10,000 evidence-based remedies, herbal treatments, and traditional medicine solutions for common health conditions. Discover safe, effective natural alternatives with detailed usage instructions, dosage guidelines, and safety warnings backed by scientific research and centuries of traditional wisdom.
              </p>
            </div>
            
            <div className="bg-background/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-primary-foreground/20 shadow-glow animate-slide-up mb-8">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Try: 'headache relief' or 'trouble sleeping' or 'digestive issues'"
                size="large"
              />
              <p className="text-sm opacity-75 mt-4 text-center">
                Search in natural language - describe your symptoms or health concerns
              </p>
            </div>

            {/* Extra spacing for mobile ad space */}
            <div className="h-16 md:h-0"></div>

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
                Discover the benefits of traditional healing backed by modern research and comprehensive safety information
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
                <h3 className="text-2xl font-bold text-foreground">Evidence-Based Research</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Comprehensive database of natural remedies backed by scientific research and traditional knowledge with detailed usage and safety information.
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

      {/* Health Conditions Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">Common Health Conditions We Cover</h2>
          <p className="text-muted-foreground text-xl max-w-4xl mx-auto leading-relaxed">
            Find natural treatment options for the most searched health conditions. Our database includes evidence-based remedies for both acute and chronic conditions, helping you explore safe alternatives to conventional treatments.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {healthConditions.map((condition, index) => (
            <div 
              key={index}
              className="p-4 bg-card rounded-xl border border-border hover:shadow-soft transition-all duration-300 text-center cursor-pointer hover:scale-105"
            >
              <p className="text-foreground font-medium">{condition}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Remedies Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Most Popular Natural Remedies</h2>
            <p className="text-muted-foreground text-xl max-w-4xl mx-auto leading-relaxed">
              Discover the most researched and trusted natural remedies used by millions worldwide. Each remedy includes detailed preparation methods, dosage recommendations, and safety guidelines based on traditional use and modern research.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {popularRemedies.map((remedy, index) => (
              <div 
                key={index}
                className="p-6 bg-card rounded-2xl border border-border hover:shadow-natural transition-all duration-300 cursor-pointer group hover:scale-105"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-soft rounded-lg group-hover:shadow-glow transition-all duration-300">
                    <Leaf className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-foreground font-medium capitalize">{remedy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2 className="text-3xl font-bold text-foreground mb-8">Understanding Natural Medicine and Herbal Remedies</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">What Are Natural Remedies?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Natural remedies encompass traditional healing practices, herbal medicine, nutritional therapy, and lifestyle interventions that support the body's natural healing processes. These time-tested approaches have been used across cultures for thousands of years to treat various health conditions safely and effectively.
              </p>
              
              <h3 className="text-2xl font-semibold text-foreground">Evidence-Based Approach</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our database combines traditional knowledge with modern scientific research to provide you with reliable information about natural treatments. Each remedy is evaluated for safety, efficacy, and potential interactions with conventional medications.
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">Holistic Health Benefits</h3>
              <p className="text-muted-foreground leading-relaxed">
                Natural remedies often provide multiple health benefits beyond treating specific symptoms. They support overall wellness, boost immune function, improve energy levels, and promote long-term health without the side effects commonly associated with synthetic medications.
              </p>
              
              <h3 className="text-2xl font-semibold text-foreground">Safety First</h3>
              <p className="text-muted-foreground leading-relaxed">
                While natural doesn't always mean safe, our platform provides comprehensive safety information, dosage guidelines, and contraindications for each remedy. We always recommend consulting with healthcare professionals before starting any new treatment regimen.
              </p>
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

      <Footer />
    </div>
  );
};

export default Index;
