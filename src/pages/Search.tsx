import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { RemedyCard } from "@/components/RemedyCard";
import { Disclaimer } from "@/components/Disclaimer";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Sparkles, Zap, Shield, Clock, Leaf, Heart, Sun } from "lucide-react";
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
  ancientRemedies?: AncientRemedy[];
}

interface AncientRemedy {
  name: string;
  culture: string;
  traditionalUse: string;
  modernFindings: string;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Organic background elements with varied colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-200/20 to-indigo-200/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 right-20 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/15 rounded-full blur-2xl animate-float delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-amber-200/15 to-orange-200/10 rounded-full blur-xl animate-float delay-500" />
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-slate-200/15 to-blue-200/10 rounded-full blur-lg animate-float delay-700" />
      </div>
      
      <Header />

      <main className="container mx-auto px-4 py-8 lg:py-16 relative z-10">
        {/* Welcoming Header */}
        <div className="text-center mb-12 lg:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-6 p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200/50 shadow-soft">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full">
              <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-800">
              Natural Solutions for {query}
            </h1>
          </div>
          
          <p className="text-base sm:text-lg text-slate-700/80 max-w-2xl mx-auto leading-relaxed font-medium mb-6 sm:mb-8 px-4">
            🌿 Gentle, time-tested remedies crafted by nature for your wellness journey
          </p>
          
          {/* Wellness Promise Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-blue-200/30 shadow-soft hover:shadow-natural transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">Safe & Gentle</h3>
              <p className="text-xs sm:text-sm text-slate-600/80">Nature's wisdom with your safety in mind</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-200/30 shadow-soft hover:shadow-natural transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">Personalized</h3>
              <p className="text-xs sm:text-sm text-slate-600/80">Tailored to your unique needs</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-amber-200/30 shadow-soft hover:shadow-natural transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sun className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">Time-Tested</h3>
              <p className="text-xs sm:text-sm text-slate-600/80">Backed by generations of healing</p>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16 sm:py-20">
            <div className="text-center space-y-6 sm:space-y-8 animate-fade-in px-4">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto flex items-center justify-center shadow-glow animate-pulse">
                  <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 animate-spin text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full animate-ping"></div>
              </div>
              <div className="space-y-3">
                <p className="text-xl sm:text-2xl font-semibold text-slate-800">🌱 Gathering Nature's Wisdom</p>
                <p className="text-slate-600/80 max-w-md mx-auto text-base sm:text-lg leading-relaxed">
                  Carefully selecting the perfect natural remedies for your unique needs...
                </p>
              </div>
              <div className="flex justify-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="space-y-8 sm:space-y-12 animate-fade-in">
            {/* How We Choose Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/50 p-6 sm:p-8 shadow-soft">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl shadow-soft flex-shrink-0">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">🌿 How We Craft Your Natural Solutions</h3>
                  <p className="text-slate-600/80 leading-relaxed text-sm sm:text-lg">
                    Each remedy is lovingly selected from nature's pharmacy, combining ancient wisdom with modern understanding. 
                    We consider your unique symptoms, health profile, and preferences to create a personalized wellness plan 
                    that honors both traditional healing practices and contemporary safety standards.
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Summary Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white/90 via-slate-50/80 to-blue-50/70 backdrop-blur-sm rounded-3xl border border-slate-200/50 p-6 sm:p-10 shadow-natural">
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-bl from-blue-300/20 to-transparent rounded-full -translate-y-16 sm:-translate-y-24 translate-x-16 sm:translate-x-24" />
              <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-40 sm:h-40 bg-gradient-to-tr from-purple-300/15 to-transparent rounded-full translate-y-12 sm:translate-y-20 -translate-x-12 sm:-translate-x-20" />
              
              <div className="relative z-10">
                <div className="flex items-start gap-3 sm:gap-5 mb-6 sm:mb-8">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-glow flex-shrink-0">
                    <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                      🌱 Your Personal Wellness Journey for {query}
                    </h2>
                    <p className="text-indigo-600 font-medium text-base sm:text-lg">Gentle healing, naturally crafted for you</p>
                  </div>
                </div>
                <div className="bg-white/70 rounded-2xl p-6 sm:p-8 border border-slate-200/30 backdrop-blur-sm">
                  <p className="text-slate-700 leading-relaxed text-base sm:text-lg font-medium">
                    {result.summary}
                  </p>
                </div>
              </div>
            </div>

            {/* Remedies Section */}
            <section className="space-y-6 sm:space-y-8">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
                  🌿 {result.remedies.length} Natural Remedies Chosen Just for You
                </h2>
                <p className="text-slate-600/80 text-base sm:text-lg max-w-2xl mx-auto px-4">
                  Each remedy has been carefully selected to work in harmony with your body's natural healing abilities
                </p>
              </div>
              
              <div className="grid gap-6 sm:gap-8 lg:gap-10">
                {result.remedies.map((remedy, index) => (
                  <div key={index} className="transform hover:scale-[1.02] transition-all duration-300">
                    <RemedyCard remedy={remedy} index={index} />
                  </div>
                ))}
              </div>
            </section>

            {/* Ancient Remedies */}
            <section className="space-y-6 sm:space-y-8">
              <div className="bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-yellow-50/70 backdrop-blur-sm rounded-3xl border border-amber-200/40 p-6 sm:p-10 shadow-natural">
                <div className="flex items-start gap-3 sm:gap-5 mb-6 sm:mb-8">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-glow flex-shrink-0">
                    <Sun className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-2">
                      🏛️ Ancient Wisdom, Modern Validation
                    </h2>
                    <p className="text-amber-700 font-medium text-base sm:text-lg">Time-honored remedies blessed by science</p>
                  </div>
                </div>
                
                {result.ancientRemedies && result.ancientRemedies.length > 0 ? (
                  result.ancientRemedies.map((ancientRemedy, index) => (
                    <div key={index} className="bg-white/80 rounded-2xl p-6 sm:p-8 border border-amber-200/30 mb-6 sm:mb-8 last:mb-0 backdrop-blur-sm shadow-soft">
                      <h3 className="text-xl sm:text-2xl font-bold text-amber-900 mb-4 sm:mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full flex items-center justify-center text-amber-800 text-sm sm:text-lg font-bold shadow-soft flex-shrink-0">
                          {index + 1}
                        </span>
                        🌿 {ancientRemedy.name}
                      </h3>
                      
                      <div className="space-y-4 sm:space-y-6">
                        <div className="p-4 sm:p-6 bg-amber-50/60 rounded-2xl border-l-4 border-amber-400 backdrop-blur-sm">
                          <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-3 text-base sm:text-lg">
                            <span className="text-xl sm:text-2xl">🏛️</span>
                            Ancient Wisdom from {ancientRemedy.culture}
                          </h4>
                          <p className="text-amber-800 leading-relaxed text-sm sm:text-lg">
                            {ancientRemedy.traditionalUse}
                          </p>
                        </div>
                        
                        <div className="p-4 sm:p-6 bg-blue-50/60 rounded-2xl border-l-4 border-blue-400 backdrop-blur-sm">
                          <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-3 text-base sm:text-lg">
                            <span className="text-xl sm:text-2xl">🔬</span>
                            Modern Science Says
                          </h4>
                          <p className="text-blue-800 leading-relaxed text-sm sm:text-lg">
                            {ancientRemedy.modernFindings}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white/80 rounded-2xl p-6 sm:p-8 border border-amber-200/30 text-center backdrop-blur-sm">
                    <div className="text-4xl sm:text-6xl mb-4">🌿</div>
                    <p className="text-amber-800 leading-relaxed text-base sm:text-lg">
                      While ancient wisdom offers many treasures, we've focused on providing the most relevant 
                      modern herbal solutions for your specific needs. Each remedy above carries the blessing 
                      of both time-tested use and contemporary research.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Lifestyle Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/50 p-6 sm:p-8 shadow-soft">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-soft flex-shrink-0">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">🌱 Nurturing Your Whole Self</h3>
                  <p className="text-slate-600/80 leading-relaxed text-sm sm:text-lg mb-4 sm:mb-6">
                    True healing happens when we care for both body and spirit. These gentle practices 
                    can amplify your herbal remedies and support your natural healing journey.
                  </p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="bg-blue-50/60 rounded-2xl p-4 sm:p-6 border border-blue-200/30">
                  <h4 className="font-bold text-blue-900 mb-4 text-base sm:text-lg flex items-center gap-2">
                    <span className="text-lg sm:text-xl">🌸</span> Daily Rituals
                  </h4>
                  <ul className="space-y-2 text-blue-800 text-sm sm:text-base">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                      Gentle hydration with herbal teas
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                      Restorative sleep in a peaceful space
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                      Mindful breathing and gentle movement
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                      Time in nature's embrace
                    </li>
                  </ul>
                </div>
                
                <div className="bg-purple-50/60 rounded-2xl p-4 sm:p-6 border border-purple-200/30">
                  <h4 className="font-bold text-purple-900 mb-4 text-base sm:text-lg flex items-center gap-2">
                    <span className="text-lg sm:text-xl">🕊️</span> Creating Harmony
                  </h4>
                  <ul className="space-y-2 text-purple-800 text-sm sm:text-base">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></span>
                      Nourishing foods that love you back
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></span>
                      A calm, toxin-free sanctuary
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></span>
                      Consistent, gentle routines
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></span>
                      Listening to your body's wisdom
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Community Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/50 p-6 sm:p-8 shadow-soft">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-soft flex-shrink-0">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">🌿 Explore More Natural Wonders</h3>
                  <p className="text-slate-600/80 mb-4 sm:mb-6 text-sm sm:text-lg">
                    Join thousands discovering the gentle power of nature's pharmacy
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                {[
                  { icon: "🌼", title: "Chamomile Dreams", desc: "Gentle comfort for anxious moments" },
                  { icon: "🧿", title: "Magnesium Magic", desc: "Nature's relaxation mineral" },
                  { icon: "💜", title: "Lavender Peace", desc: "Aromatherapy for the soul" },
                  { icon: "✨", title: "Golden Turmeric", desc: "Ancient anti-inflammatory wisdom" },
                  { icon: "🫚", title: "Ginger Warmth", desc: "Digestive comfort from the earth" },
                  { icon: "🍃", title: "Herbal Blends", desc: "Therapeutic teas for every need" }
                ].map((item, index) => (
                  <div key={index} className="bg-gradient-to-br from-slate-50/80 to-blue-50/60 rounded-2xl p-4 sm:p-6 border border-slate-200/30 hover:shadow-soft transition-all duration-300 cursor-pointer group">
                    <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                    <h4 className="font-bold text-slate-800 mb-1 sm:mb-2 text-xs sm:text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-600/80">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-blue-50/60 backdrop-blur-sm rounded-3xl border border-blue-200/40 p-6 sm:p-8 shadow-soft">
              <Disclaimer />
            </div>
          </div>
        )}

        {!result && !loading && query && (
          <div className="text-center py-16 sm:py-20">
            <div className="text-4xl sm:text-6xl mb-6">🌿</div>
            <p className="text-slate-600/80 text-lg sm:text-xl px-4">
              Begin your natural wellness journey by sharing your needs above
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
