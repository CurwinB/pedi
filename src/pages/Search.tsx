import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { RemedyCard } from "@/components/RemedyCard";
import { Disclaimer } from "@/components/Disclaimer";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Sparkles, Zap, Shield, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Remedy {
  name: string;
  description: string;
  usage: string;
  warnings?: string;
  sources?: string[];
}

interface SearchResult {
  summary: string;
  remedies: Remedy[];
}

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  
  const query = searchParams.get("q") || "";

  const updateSEOMetaTags = (searchQuery: string, searchResult?: SearchResult) => {
    // Update page title
    const pageTitle = searchResult 
      ? `Natural Remedies for ${searchQuery} | Remedypedia`
      : `Searching for ${searchQuery} | Remedypedia`;
    document.title = pageTitle;

    // Update meta description
    const metaDescription = searchResult 
      ? `Discover personalized natural remedies for ${searchQuery}. ${searchResult.remedies.length} evidence-based solutions including ${searchResult.remedies.slice(0, 2).map(r => r.name).join(', ')} and more.`
      : `Finding natural remedies for ${searchQuery}. Personalized, evidence-based solutions for your health needs.`;
    
    // Update or create meta description
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute('content', metaDescription);

    // Update or create keywords meta tag
    const keywords = searchResult 
      ? [searchQuery, ...searchResult.remedies.map(r => r.name), 'natural remedies', 'herbal medicine', 'alternative medicine', 'holistic health'].join(', ')
      : [searchQuery, 'natural remedies', 'herbal medicine', 'alternative medicine', 'holistic health'].join(', ');
    
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute('content', keywords);

    // Update Open Graph tags for social sharing
    const ogTitle = pageTitle;
    const ogDescription = metaDescription;
    
    let ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (!ogTitleMeta) {
      ogTitleMeta = document.createElement('meta');
      ogTitleMeta.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitleMeta);
    }
    ogTitleMeta.setAttribute('content', ogTitle);

    let ogDescMeta = document.querySelector('meta[property="og:description"]');
    if (!ogDescMeta) {
      ogDescMeta = document.createElement('meta');
      ogDescMeta.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescMeta);
    }
    ogDescMeta.setAttribute('content', ogDescription);
  };

  const handleSearch = async (searchQuery: string) => {
    setLoading(true);
    
    // Update URL with search query
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    
    // Update basic SEO tags immediately
    updateSEOMetaTags(searchQuery);
    
    try {
      // Get clarification answers from URL params
      const clarificationAnswers: Record<string, string | string[]> = {};
      searchParams.forEach((value, key) => {
        if (key !== 'q') {
          // Handle multiple values for the same key (checkbox answers)
          if (clarificationAnswers[key]) {
            if (Array.isArray(clarificationAnswers[key])) {
              (clarificationAnswers[key] as string[]).push(value);
            } else {
              clarificationAnswers[key] = [clarificationAnswers[key] as string, value];
            }
          } else {
            clarificationAnswers[key] = value;
          }
        }
      });

      // Call the Gemini edge function
      const { data, error } = await supabase.functions.invoke('generate-remedies', {
        body: { 
          query: searchQuery,
          clarificationAnswers
        }
      });

      if (error) throw error;
      
      setResult(data);
      
      // Update SEO tags with full search result data
      updateSEOMetaTags(searchQuery, data);
      
    } catch (error) {
      toast({
        title: "Search Error",
        description: "There was an error processing your search. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Auto-search when component mounts with query
  useEffect(() => {
    if (query && !result && !loading) {
      handleSearch(query);
    }
  }, [query]);

  // Cleanup meta tags when component unmounts
  useEffect(() => {
    return () => {
      // Reset to default title
      document.title = "Remedypedia - Natural Remedies & Herbal Medicine Guide";
      
      // Reset meta description
      const descriptionMeta = document.querySelector('meta[name="description"]');
      if (descriptionMeta) {
        descriptionMeta.setAttribute('content', 'Discover evidence-based natural remedies and herbal medicine solutions. Your comprehensive guide to alternative healthcare and holistic wellness treatments.');
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-background to-primary/5 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-40 right-20 w-24 h-24 bg-gradient-to-br from-green-400/20 to-primary/20 rounded-full blur-lg animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-br from-secondary/15 to-primary/15 rounded-full blur-md animate-pulse delay-500" />
      
      <Header />

      <main className="container mx-auto px-4 py-24 relative z-10">
        {/* Page Header with SEO-Rich H1 */}
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4 drop-shadow-sm">
            Natural Remedies for {query} | Evidence-Based Solutions
          </h1>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
          <p className="text-lg text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed font-medium">
            Personalized natural solutions based on your symptoms and health profile
          </p>
          
          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 max-w-2xl mx-auto">
            <div className="text-center p-3 bg-background/60 backdrop-blur-sm rounded-xl border border-primary/20">
              <Shield className="h-5 w-5 text-primary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Safety First</p>
            </div>
            <div className="text-center p-3 bg-background/60 backdrop-blur-sm rounded-xl border border-primary/20">
              <Zap className="h-5 w-5 text-secondary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Personalized</p>
            </div>
            <div className="text-center p-3 bg-background/60 backdrop-blur-sm rounded-xl border border-primary/20">
              <Clock className="h-5 w-5 text-green-600 mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Research-Based</p>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center space-y-6 animate-fade-in">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto flex items-center justify-center shadow-glow animate-pulse">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-primary rounded-full animate-ping opacity-20"></div>
              </div>
              <div className="space-y-2">
                <p className="text-xl font-semibold text-foreground">Analyzing Your Symptoms</p>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Our system is carefully selecting personalized natural remedies based on your health profile...
                </p>
              </div>
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="space-y-10 animate-fade-in">
            {/* How We Choose These Remedies Section */}
            <div className="bg-background/80 backdrop-blur-sm rounded-xl border border-border p-6 shadow-soft mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">How We Choose These Remedies</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our remedies are curated using advanced AI technology and sourced from trusted herbal medicine 
                databases, traditional health systems, and peer-reviewed research. Each recommendation is carefully 
                matched to your specific symptoms, health profile, and personal preferences to ensure the most 
                relevant and safe suggestions. We prioritize remedies with strong historical use and modern 
                scientific support while considering potential interactions and contraindications.
              </p>
            </div>

            {/* Enhanced Summary Section with H2 */}
            <div className="relative overflow-hidden bg-gradient-to-br from-background/95 via-background/90 to-primary/5 backdrop-blur-sm rounded-2xl border border-primary/20 p-8 shadow-elegant">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -translate-y-20 translate-x-20" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full translate-y-16 -translate-x-16" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-1">
                      Personalized Natural Treatment Plan for {query}
                    </h2>
                    <p className="text-primary/80 font-medium">Evidence-based holistic medicine solutions</p>
                  </div>
                </div>
                <div className="bg-background/50 rounded-xl p-6 border border-primary/10">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {result.summary}
                  </p>
                </div>
              </div>
            </div>


            {/* Remedies Section with H2 */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground text-center mb-8">
                {result.remedies.length} Natural Remedies for {query} Treatment | Alternative Medicine Options
              </h2>
              
              {/* Remedies Grid */}
              <div className="grid gap-6 md:gap-8">
                {result.remedies.map((remedy, index) => (
                  <div key={index}>
                    <RemedyCard remedy={remedy} index={index} />
                    
                  </div>
                ))}
              </div>
            </section>

            {/* When a Remedy Isn't Enough Section */}
            <div className="bg-background/80 backdrop-blur-sm rounded-xl border border-border p-6 shadow-soft mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">When a Remedy Isn't Enough</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Natural remedies work best when paired with lifestyle adjustments that address root causes. 
                Consider combining these recommendations with:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Essential Foundations</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Adequate hydration (8-10 glasses daily)</li>
                    <li>• Quality sleep (7-9 hours nightly)</li>
                    <li>• Stress management techniques</li>
                    <li>• Regular gentle exercise</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Trigger Avoidance</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Identifying and avoiding dietary triggers</li>
                    <li>• Limiting screen time and blue light exposure</li>
                    <li>• Creating a calm, toxin-free environment</li>
                    <li>• Maintaining consistent daily routines</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* People Also Explore Section */}
            <div className="bg-background/80 backdrop-blur-sm rounded-xl border border-border p-6 shadow-soft mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">People Also Explore</h3>
              <p className="text-muted-foreground mb-4">
                Discover other natural remedies and wellness topics frequently explored by our community:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
                  <h4 className="font-medium text-foreground mb-2">Chamomile for Stress</h4>
                  <p className="text-sm text-muted-foreground">Gentle nervine herb for anxiety and sleep support</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
                  <h4 className="font-medium text-foreground mb-2">Magnesium-Rich Foods</h4>
                  <p className="text-sm text-muted-foreground">Natural migraine relief through mineral supplementation</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
                  <h4 className="font-medium text-foreground mb-2">Lavender Aromatherapy</h4>
                  <p className="text-sm text-muted-foreground">Essential oil therapy for relaxation and sleep</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
                  <h4 className="font-medium text-foreground mb-2">Turmeric Anti-Inflammatory</h4>
                  <p className="text-sm text-muted-foreground">Golden spice for pain and inflammation management</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
                  <h4 className="font-medium text-foreground mb-2">Ginger for Digestion</h4>
                  <p className="text-sm text-muted-foreground">Traditional remedy for nausea and digestive issues</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
                  <h4 className="font-medium text-foreground mb-2">Herbal Tea Blends</h4>
                  <p className="text-sm text-muted-foreground">Therapeutic combinations for various health goals</p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <Disclaimer />
          </div>
        )}

        {!result && !loading && query && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Start typing to search for natural remedies and health solutions.
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;