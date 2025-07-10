import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
    {
      title: "Turmeric For Inflammation",
      description: "Turmeric contains curcumin, a powerful anti-inflammatory compound that has been used for thousands of years in traditional medicine. It helps reduce inflammation markers in the body, supports joint health, and may help alleviate symptoms of arthritis. The active compounds in turmeric work by inhibiting inflammatory enzymes and reducing oxidative stress. Regular consumption can help manage chronic inflammation naturally.",
      useCases: [
        "Joint pain and arthritis: Take 500-1000mg curcumin extract daily with black pepper for better absorption",
        "General inflammation: Add 1-2 teaspoons of ground turmeric to warm milk or smoothies",
        "Safety note: May interact with blood thinners; consult healthcare provider if taking medications"
      ]
    },
    {
      title: "Ginger For Nausea",
      description: "Ginger has been scientifically proven to reduce nausea and vomiting through its active compounds gingerol and shogaol. These compounds affect the digestive system and brain pathways that control nausea. It's particularly effective for motion sickness, morning sickness during pregnancy, and chemotherapy-induced nausea. Ginger also aids overall digestion and has anti-inflammatory properties.",
      useCases: [
        "Motion sickness: Take 1g dried ginger powder 30 minutes before travel",
        "Morning sickness: Sip ginger tea made with 1 inch fresh ginger root steeped in hot water",
        "Dosage limit: Maximum 4g daily; pregnant women should limit to 1g daily"
      ]
    },
    {
      title: "Echinacea For Immunity",
      description: "Echinacea is a purple coneflower that stimulates the immune system and helps the body fight off infections. Research shows it can reduce the duration and severity of cold symptoms when taken at the first sign of illness. The herb works by increasing white blood cell activity and supporting the body's natural defense mechanisms. It's been used by Native Americans for centuries as a natural remedy.",
      useCases: [
        "Cold prevention: Take 300mg standardized extract 3 times daily during cold season",
        "Active infection: Increase to 400mg every 2-3 hours for first 48 hours of symptoms",
        "Caution: Avoid long-term use (more than 8 weeks) and don't use if allergic to ragweed family plants"
      ]
    },
    {
      title: "Chamomile For Sleep",
      description: "Chamomile contains apigenin, a compound that binds to brain receptors to promote sleepiness and reduce insomnia. This gentle herb has mild sedative effects and helps calm anxiety that often interferes with sleep. German chamomile is particularly effective for promoting relaxation and improving sleep quality. It's safe for most people and has been used as a natural sleep aid for centuries.",
      useCases: [
        "Bedtime routine: Drink 1 cup chamomile tea 30-45 minutes before bed",
        "Sleep disorders: Take 400-1600mg chamomile extract daily in divided doses",
        "Generally safe: May cause drowsiness; avoid before driving or operating machinery"
      ]
    },
    {
      title: "Garlic For Infections",
      description: "Garlic contains allicin, a powerful antimicrobial compound that fights bacteria, viruses, and fungi. When garlic is crushed or chopped, it releases allicin which has been shown to be effective against various pathogens including antibiotic-resistant strains. It also supports cardiovascular health and boosts immune function. Fresh garlic is most potent when consumed raw or lightly cooked.",
      useCases: [
        "Immune support: Eat 1-2 fresh garlic cloves daily, crushed and mixed with honey",
        "Respiratory infections: Make garlic tea by steeping 3-4 crushed cloves in hot water",
        "Precautions: May cause stomach upset on empty stomach; can thin blood and interact with medications"
      ]
    },
    {
      title: "Aloe Vera For Skin",
      description: "Aloe vera gel contains over 75 active compounds including vitamins, minerals, amino acids, and anti-inflammatory substances. It accelerates wound healing, soothes burns, and provides deep moisturization for dry or damaged skin. The clear gel has cooling properties and helps reduce inflammation while promoting cell regeneration. It's particularly effective for sunburns, minor cuts, and inflammatory skin conditions.",
      useCases: [
        "Sunburn relief: Apply pure aloe gel directly to affected areas 3-4 times daily",
        "Dry skin: Use as a daily moisturizer, especially effective when applied to damp skin",
        "Quality matters: Use 100% pure aloe gel without added chemicals; patch test before first use"
      ]
    },
    {
      title: "Peppermint For Digestion",
      description: "Peppermint contains menthol and other volatile oils that relax the smooth muscles of the digestive tract, helping to relieve digestive discomfort. It's particularly effective for irritable bowel syndrome (IBS), indigestion, and gas. The herb has antispasmodic properties that can reduce cramping and bloating. Peppermint also has antimicrobial properties that help maintain healthy gut flora.",
      useCases: [
        "IBS symptoms: Take 0.2-0.4ml enteric-coated peppermint oil capsules 3 times daily",
        "Indigestion: Drink peppermint tea after meals using 1 tablespoon dried leaves per cup",
        "Caution: Avoid with GERD as it may worsen heartburn; don't give to infants or young children"
      ]
    },
    {
      title: "Lavender For Anxiety",
      description: "Lavender essential oil has clinically proven anxiolytic (anxiety-reducing) effects through its interaction with neurotransmitters in the brain. The herb promotes relaxation, reduces stress hormones, and can improve mood disorders. Inhaling lavender aromatherapy has been shown to lower cortisol levels and activate the parasympathetic nervous system. It's gentle enough for daily use and well-tolerated by most people.",
      useCases: [
        "Daily stress: Add 3-4 drops lavender oil to a diffuser or inhale directly from bottle",
        "Sleep anxiety: Place dried lavender sachets under pillow or drink lavender tea before bed",
        "Safe usage: Generally well-tolerated; may cause skin sensitivity in some individuals when applied topically"
      ]
    },
    {
      title: "Green Tea For Antioxidants",
      description: "Green tea is rich in catechins, particularly EGCG (epigallocatechin gallate), which are powerful antioxidants that protect cells from damage caused by free radicals. These compounds support cardiovascular health, brain function, and may help prevent certain cancers. Green tea also contains L-theanine, an amino acid that promotes calm alertness and can improve mental focus when combined with the tea's natural caffeine.",
      useCases: [
        "Daily antioxidant support: Drink 2-3 cups of high-quality green tea throughout the day",
        "Concentrated benefits: Take 300-400mg EGCG supplement with meals if preferred over tea",
        "Caffeine content: Contains 25-50mg caffeine per cup; limit intake if sensitive to caffeine"
      ]
    },
    {
      title: "Honey For Coughs",
      description: "Raw honey has natural antimicrobial properties and forms a protective coating in the throat that soothes irritation and suppresses cough reflexes. Studies show honey is as effective as over-the-counter cough suppressants for nighttime coughs in children and adults. The thick consistency helps coat the throat while its natural sugars provide quick energy. Manuka honey has particularly strong antibacterial properties.",
      useCases: [
        "Nighttime cough: Take 1-2 tablespoons raw honey before bedtime, let it coat throat slowly",
        "Sore throat: Mix honey with warm water and lemon juice, gargle and swallow slowly",
        "Age restriction: Never give honey to children under 12 months due to risk of infant botulism"
      ]
    },
    {
      title: "Apple Cider Vinegar For Digestion",
      description: "Apple cider vinegar with 'the mother' contains beneficial bacteria and enzymes that support digestive health. It helps increase stomach acid production, which aids in breaking down proteins and absorbing nutrients. The acetic acid in ACV may help regulate blood sugar levels and support healthy gut bacteria. It also has antimicrobial properties that can help maintain digestive balance.",
      useCases: [
        "Digestive support: Mix 1-2 tablespoons in 8oz water and drink 15-30 minutes before meals",
        "Blood sugar management: Take diluted ACV with high-carbohydrate meals to help moderate glucose response",
        "Tooth protection: Always dilute and drink through a straw; rinse mouth afterward to protect tooth enamel"
      ]
    },
    {
      title: "Ginkgo For Memory",
      description: "Ginkgo biloba improves blood circulation to the brain and acts as an antioxidant, potentially supporting cognitive function and memory. The herb contains flavonoids and terpenoids that help protect nerve cells and improve neural transmission. Some studies suggest it may help with age-related cognitive decline and improve focus and mental clarity. It's been used in traditional Chinese medicine for thousands of years.",
      useCases: [
        "Cognitive support: Take 120-240mg standardized ginkgo extract daily, divided into 2-3 doses",
        "Memory enhancement: Use consistently for 6-8 weeks to see potential benefits",
        "Drug interactions: Can interact with blood thinners and seizure medications; consult healthcare provider first"
      ]
    }
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

          <Accordion type="single" collapsible className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {popularRemedies.map((remedy, index) => (
              <AccordionItem key={index} value={`remedy-${index}`} className="bg-card rounded-2xl border border-border hover:shadow-natural transition-all duration-300">
                <AccordionTrigger className="p-6 hover:no-underline hover:bg-muted/50 rounded-t-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary-soft rounded-lg">
                      <Leaf className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-foreground font-medium text-left">{remedy.title}</h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0">
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{remedy.description}</p>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Usage & Safety:</h4>
                      <ul className="space-y-2">
                        {remedy.useCases.map((useCase, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start space-x-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{useCase}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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


      <Footer />
    </div>
  );
};

export default Index;
