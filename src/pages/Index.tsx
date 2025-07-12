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
      description: "Stomach troubles getting you down? Find natural solutions for bloating, acid reflux, IBS, and other digestive issues that have worked for people just like you.", 
      icon: Heart,
      keywords: "digestive health, stomach remedies, acid reflux treatment, bloating relief, IBS natural treatment"
    },
    { 
      name: "Pain & Inflammation", 
      description: "Dealing with aches and pains? Explore gentle, effective home remedies for headaches, arthritis, muscle soreness, and joint pain that won't leave you feeling groggy.", 
      icon: Shield,
      keywords: "natural pain relief, arthritis remedies, headache treatment, anti-inflammatory herbs, muscle pain relief"
    },
    { 
      name: "Mental Wellness", 
      description: "Feeling stressed or anxious? Discover calming herbal remedies and natural approaches that can help you feel more centered and sleep better at night.", 
      icon: Leaf,
      keywords: "anxiety relief, natural antidepressants, stress management, insomnia remedies, mental health herbs"
    },
    { 
      name: "Immune Support", 
      description: "Keep your body's defenses strong with natural remedies that have helped families stay healthy for generations. Perfect for cold season and year-round wellness.", 
      icon: Shield,
      keywords: "immune system boosters, cold remedies, flu prevention, respiratory health, natural antibiotics"
    }
  ];

  const healthConditions = [
    {
      title: "Headaches and Migraines",
      description: "Headaches and migraines affect millions of people worldwide and can significantly impact quality of life. Natural approaches focus on identifying triggers, reducing inflammation, and supporting the nervous system. Many effective remedies work by improving blood circulation, reducing muscle tension, or addressing nutritional deficiencies that contribute to headache frequency. Stress management, dietary modifications, and herbal remedies have shown considerable success in both preventing and treating various types of headaches naturally.",
      remedies: [
        "Feverfew: Take 100-300mg daily to prevent migraines and reduce frequency",
        "Magnesium: 400-600mg daily can help prevent tension headaches and migraines",
        "Peppermint oil: Apply diluted oil to temples for immediate tension headache relief"
      ]
    },
    {
      title: "Common Cold and Flu",
      description: "The common cold and flu are viral infections that affect the respiratory system, causing symptoms like congestion, cough, fever, and fatigue. Natural remedies focus on supporting the immune system, reducing inflammation, and helping the body fight off the infection more effectively. Many traditional herbs and nutrients have antiviral properties and can significantly reduce the duration and severity of symptoms when used at the first sign of illness.",
      remedies: [
        "Elderberry: Take 15ml syrup or 300mg extract 3 times daily during illness",
        "Zinc lozenges: Use within 24 hours of symptoms, 13-23mg every 2 hours while awake",
        "Echinacea: 300mg standardized extract 3 times daily for immune support"
      ]
    },
    {
      title: "Digestive Issues",
      description: "Digestive problems including bloating, gas, indigestion, and irregular bowel movements are increasingly common due to stress, poor diet, and lifestyle factors. Natural approaches emphasize restoring gut health through probiotics, digestive enzymes, and anti-inflammatory herbs. Many traditional remedies work by soothing the digestive tract, improving nutrient absorption, and supporting healthy gut bacteria balance for long-term digestive wellness.",
      remedies: [
        "Ginger: 1-3g daily for nausea, bloating, and general digestive support",
        "Probiotics: 10-50 billion CFU daily to restore healthy gut bacteria",
        "Digestive bitters: Take 10-15 drops before meals to stimulate digestion"
      ]
    },
    {
      title: "Sleep Disorders",
      description: "Sleep disorders including insomnia, restless sleep, and difficulty falling asleep affect millions and can have serious health consequences. Natural sleep aids work by calming the nervous system, regulating circadian rhythms, and addressing underlying causes like stress and anxiety. Herbal remedies, lifestyle modifications, and relaxation techniques can effectively improve sleep quality without the side effects associated with prescription sleep medications.",
      remedies: [
        "Melatonin: 0.5-3mg taken 30 minutes before desired bedtime",
        "Valerian root: 300-600mg extract taken 1-2 hours before bed",
        "Passionflower: Drink as tea or take 250mg extract for anxiety-related insomnia"
      ]
    },
    {
      title: "Anxiety and Stress",
      description: "Chronic anxiety and stress have become widespread health concerns that can impact both mental and physical wellbeing. Natural approaches focus on supporting the nervous system, balancing stress hormones, and promoting relaxation responses. Adaptogenic herbs, nutritional supplements, and mind-body practices can effectively reduce anxiety symptoms and improve stress resilience without the dependency issues associated with pharmaceutical alternatives.",
      remedies: [
        "Ashwagandha: 300-500mg twice daily to reduce cortisol and anxiety",
        "L-theanine: 100-200mg for calm alertness without drowsiness",
        "Lemon balm: Drink as tea or take 300mg extract for nervous tension"
      ]
    },
    {
      title: "Skin Conditions",
      description: "Skin conditions like eczema, acne, psoriasis, and dermatitis often have underlying causes related to inflammation, immune function, and gut health. Natural treatments address both topical symptoms and internal factors contributing to skin problems. Many plant-based remedies have anti-inflammatory, antimicrobial, and healing properties that can effectively treat various skin conditions while supporting overall skin health and preventing future outbreaks.",
      remedies: [
        "Aloe vera gel: Apply pure gel 2-3 times daily for inflammation and healing",
        "Tea tree oil: Dilute 5-10% in carrier oil for acne and fungal infections",
        "Calendula cream: Apply to wounds, rashes, and irritated skin for healing"
      ]
    },
    {
      title: "Respiratory Problems",
      description: "Respiratory issues including asthma, bronchitis, allergies, and chronic cough can significantly impact breathing and quality of life. Natural remedies focus on reducing inflammation in the airways, supporting lung function, and addressing underlying triggers. Many herbs have expectorant, bronchodilator, and anti-inflammatory properties that help clear congestion, ease breathing, and support overall respiratory health naturally.",
      remedies: [
        "Eucalyptus oil: Inhale steam with 3-5 drops for congestion relief",
        "Thyme: Drink as tea or use 200mg extract for cough and bronchial support",
        "N-acetylcysteine (NAC): 600mg twice daily to thin mucus and support lung function"
      ]
    },
    {
      title: "Joint Pain and Arthritis",
      description: "Joint pain and arthritis involve inflammation and degeneration of cartilage, causing pain, stiffness, and reduced mobility. Natural anti-inflammatory approaches can significantly reduce symptoms and slow disease progression. Many herbs and supplements work by reducing inflammatory markers, supporting cartilage repair, and improving joint lubrication. These natural treatments often provide relief comparable to conventional medications without the associated side effects.",
      remedies: [
        "Turmeric: 500-1000mg curcumin with black pepper for anti-inflammatory effects",
        "Glucosamine sulfate: 1500mg daily to support cartilage repair and joint health",
        "Boswellia: 300-400mg standardized extract for pain and inflammation reduction"
      ]
    },
    {
      title: "High Blood Pressure",
      description: "High blood pressure is a silent condition that increases risk of heart disease and stroke. Natural approaches focus on lifestyle modifications, stress reduction, and cardiovascular-supporting nutrients. Many herbs and supplements have been shown to help lower blood pressure by improving blood vessel flexibility, reducing inflammation, and supporting healthy circulation. These natural methods work best when combined with dietary changes and regular exercise.",
      remedies: [
        "Hawthorn berry: 160-1800mg daily to support cardiovascular health",
        "Garlic extract: 600-1200mg aged garlic daily for blood pressure support",
        "Magnesium: 400-800mg daily to relax blood vessels and support heart health"
      ]
    },
    {
      title: "Diabetes Management",
      description: "Type 2 diabetes involves insulin resistance and blood sugar dysregulation that can be significantly improved through natural approaches. Dietary modifications, herbal remedies, and targeted supplements can help improve insulin sensitivity, regulate glucose metabolism, and prevent complications. Many traditional plants have glucose-lowering properties and can be valuable additions to conventional diabetes management when used under proper supervision.",
      remedies: [
        "Cinnamon: 1-6g daily to help improve insulin sensitivity and glucose control",
        "Chromium picolinate: 200-400mcg daily to support healthy blood sugar levels",
        "Bitter melon: 2-4g daily as extract or fresh juice for glucose regulation"
      ]
    },
    {
      title: "Weight Management",
      description: "Healthy weight management involves addressing metabolism, appetite regulation, and underlying factors that contribute to weight gain. Natural approaches focus on supporting thyroid function, balancing hormones, and enhancing fat metabolism. Many herbs and nutrients can help increase energy expenditure, reduce cravings, and support healthy body composition when combined with appropriate diet and exercise modifications.",
      remedies: [
        "Green tea extract: 400-500mg EGCG daily to boost metabolism and fat burning",
        "Garcinia cambogia: 500-1000mg before meals for appetite suppression",
        "L-carnitine: 1-3g daily to support fat metabolism and energy production"
      ]
    },
    {
      title: "Hormonal Imbalances",
      description: "Hormonal imbalances affecting thyroid, reproductive, and stress hormones can cause a wide range of symptoms including fatigue, mood changes, and metabolic dysfunction. Natural hormone balancing approaches focus on supporting endocrine gland function, reducing hormone-disrupting toxins, and providing nutrients needed for hormone production. Many adaptogenic herbs help the body naturally regulate hormone levels and improve overall endocrine health.",
      remedies: [
        "Maca root: 1.5-3g daily to support overall hormonal balance and energy",
        "Vitex (Chasteberry): 20-40mg daily for women's reproductive hormone balance",
        "Rhodiola: 200-400mg daily to support adrenal function and stress hormones"
      ]
    }
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
                Thousands of natural remedies at your fingertips. From grandmother's time-tested solutions to modern herbal treatments - find what works for real health issues that real people face every day.
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

      {/* Introduction Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground leading-relaxed">
            Finding the right natural remedy shouldn't be complicated. Whether you're dealing with a headache, 
            trouble sleeping, or digestive issues, home remedies have helped people feel better for generations. 
            Here you'll find simple, effective herbal remedies that actually work - complete with how to use them safely.
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground mb-6">Find Natural Solutions for What's Bothering You</h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Browse by what's going on with your health. We've organized home remedies and herbal treatments by the issues they actually help with.
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
              <h2 className="text-4xl font-bold text-foreground mb-6">What Makes Us Different</h2>
              <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
                Real people sharing real remedies that have worked for generations. We're here to help you find gentle, effective solutions for your health concerns.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="text-center space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="mx-auto w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-glow">
                  <Leaf className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Tried & True</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  These aren't fads or trends. We focus on home remedies that have helped families for centuries and still work today.
                </p>
              </div>

              <div className="text-center space-y-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="mx-auto w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-glow">
                  <Sparkles className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Actually Researched</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We dig into the science behind natural remedies so you know what works, what doesn't, and how to use them safely.
                </p>
              </div>

              <div className="text-center space-y-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <div className="mx-auto w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-glow">
                  <Shield className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Your Safety Matters</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Every natural remedy comes with honest information about side effects, drug interactions, and when to see a doctor instead.
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
                  <h4 className="font-semibold text-foreground">From Around the World</h4>
                  <p className="text-muted-foreground">Learn healing traditions from different cultures and what modern science says about them</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-card rounded-2xl border border-border shadow-soft">
                <div className="p-3 bg-primary-soft rounded-xl">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Real People, Real Results</h4>
                  <p className="text-muted-foreground">Built by people who've used these remedies and want to share what actually works</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Conditions Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">What Can We Help You With?</h2>
          <p className="text-muted-foreground text-xl max-w-4xl mx-auto leading-relaxed">
            From everyday aches to chronic conditions, people have been using natural remedies to feel better for thousands of years. Here's what we cover and the home remedies that might help.
          </p>
        </div>

        <Accordion type="single" collapsible className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {healthConditions.map((condition, index) => (
            <AccordionItem key={index} value={`condition-${index}`} className="bg-card rounded-xl border border-border hover:shadow-soft transition-all duration-300">
              <AccordionTrigger className="p-4 hover:no-underline hover:bg-muted/50 rounded-t-xl text-center">
                <h3 className="text-foreground font-medium">{condition.title}</h3>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed text-sm">{condition.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 text-sm">Natural Treatment Options:</h4>
                    <ul className="space-y-2">
                      {condition.remedies.map((remedy, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start space-x-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{remedy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Popular Remedies Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">The Natural Remedies People Actually Use</h2>
            <p className="text-muted-foreground text-xl max-w-4xl mx-auto leading-relaxed">
              These are the herbal remedies and home treatments that keep showing up in grandma's recipe box for a reason. Each one includes practical tips on how to use them and important safety info you should know.
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
          <h2 className="text-3xl font-bold text-foreground mb-8">How Natural Healing Really Works</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">What Makes a Good Natural Remedy?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Natural remedies aren't just herbs thrown together. The best ones come from generations of families passing down what works, combined with what modern research tells us about safety and effectiveness. It's about finding gentle solutions that work with your body, not against it.
              </p>
              
              <h3 className="text-2xl font-semibold text-foreground">Why We Check the Science</h3>
              <p className="text-muted-foreground leading-relaxed">
                Just because something is natural doesn't mean it's automatically safe or that it works. We look at both traditional wisdom and current research to give you the straight story about what each remedy can and can't do for you.
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">The Whole-Body Approach</h3>
              <p className="text-muted-foreground leading-relaxed">
                What we love about natural remedies is that they often help with more than just your main problem. Ginger for nausea also helps digestion. Chamomile for sleep also calms anxiety. It's like getting a bonus with your health solution.
              </p>
              
              <h3 className="text-2xl font-semibold text-foreground">Safety Comes First</h3>
              <p className="text-muted-foreground leading-relaxed">
                Natural doesn't always mean harmless. Some herbs can interfere with medications or aren't right for certain health conditions. We tell you the truth about risks and side effects because your safety matters more than anything else.
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
