import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { RemedyCard } from "@/components/RemedyCard";
import { Disclaimer } from "@/components/Disclaimer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
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
  const [contentLoaded, setContentLoaded] = useState(false);
  const [adsVisible, setAdsVisible] = useState(false);
  
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
    setContentLoaded(false);
    setAdsVisible(false);
    
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
      
      // Mark content as loaded and defer ads
      setTimeout(() => {
        setContentLoaded(true);
        // Show ads after a brief delay to ensure content is stable
        setTimeout(() => {
          setAdsVisible(true);
        }, 500);
      }, 100);
      
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
        {/* Top Ad - Deferred */}
        {adsVisible && (
          <div className="flex justify-center mb-8 animate-fade-in">
            <AdPlaceholder size="leaderboard" />
          </div>
        )}

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

            {/* First Ad - Deferred */}
            {adsVisible && (
              <div className="flex justify-center animate-fade-in">
                <AdPlaceholder size="rectangle" />
              </div>
            )}

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
                    
                    {/* Insert ads between remedy cards - Deferred */}
                    {(index + 1) % 2 === 0 && index < result.remedies.length - 1 && adsVisible && (
                      <div className="flex justify-center mt-8 animate-fade-in">
                        <AdPlaceholder size="rectangle" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Final Ad before disclaimer - Deferred */}
            {adsVisible && (
              <div className="flex justify-center animate-fade-in">
                <AdPlaceholder size="leaderboard" />
              </div>
            )}

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