import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { RemedyCard } from "@/components/RemedyCard";
import { Disclaimer } from "@/components/Disclaimer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
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

  const handleSearch = async (searchQuery: string) => {
    setLoading(true);
    
    // Update URL with search query
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    
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

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />

      <main className="container mx-auto px-4 py-24">
        {/* Search Bar Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Search Natural Remedies</h1>
            <p className="text-muted-foreground">Find natural solutions for your health concerns</p>
          </div>
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search for symptoms or natural remedies..."
            size="large"
          />
        </div>
        {/* Top Ad */}
        <div className="flex justify-center mb-8">
          <AdPlaceholder size="leaderboard" />
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Searching for natural remedies...</p>
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="space-y-8">
            {/* Summary Section */}
            <div className="bg-background/80 backdrop-blur-sm rounded-lg border border-border p-6 shadow-soft">
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Natural Remedies for: "{query}"
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                {result.summary}
              </p>
            </div>

            {/* First Ad */}
            <div className="flex justify-center">
              <AdPlaceholder size="rectangle" />
            </div>

            {/* Remedies Grid */}
            <div className="grid gap-6 md:gap-8">
              {result.remedies.map((remedy, index) => (
                <div key={index}>
                  <RemedyCard remedy={remedy} index={index} />
                  
                  {/* Insert ads between remedy cards */}
                  {(index + 1) % 2 === 0 && index < result.remedies.length - 1 && (
                    <div className="flex justify-center mt-8">
                      <AdPlaceholder size="rectangle" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Final Ad before disclaimer */}
            <div className="flex justify-center">
              <AdPlaceholder size="leaderboard" />
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