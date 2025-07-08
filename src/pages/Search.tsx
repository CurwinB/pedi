import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { RemedyCard } from "@/components/RemedyCard";
import { Disclaimer } from "@/components/Disclaimer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
      // TODO: Replace with actual Gemini API call
      // For now, show mock data
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      
      const mockResult: SearchResult = {
        summary: `Based on your search for "${searchQuery}", here are some natural remedies that may help. These suggestions are based on traditional uses and available research, but should not replace professional medical advice.`,
        remedies: [
          {
            name: "Ginger Root",
            description: "Ginger contains powerful anti-inflammatory compounds called gingerols that may help reduce pain and inflammation naturally.",
            usage: "Fresh ginger can be steeped in hot water for tea (1-2 grams per cup) or taken as a supplement (250-1000mg daily). Can also be used fresh in cooking.",
            warnings: "May interact with blood thinners. Avoid high doses during pregnancy. Can cause heartburn in sensitive individuals.",
            sources: ["Journal of Pain Research", "Phytotherapy Research"]
          },
          {
            name: "Turmeric (Curcumin)",
            description: "Curcumin, the active compound in turmeric, has potent anti-inflammatory and antioxidant properties that may help with various inflammatory conditions.",
            usage: "Take 500-1000mg curcumin extract daily with black pepper (piperine) for better absorption. Can also add 1-2 teaspoons turmeric powder to foods.",
            warnings: "May increase bleeding risk when combined with blood thinners. Can worsen acid reflux in some people.",
            sources: ["Anti-inflammatory & Anti-allergy Agents", "Current Pharmaceutical Design"]
          },
          {
            name: "Chamomile",
            description: "Contains compounds like apigenin that have calming and anti-inflammatory effects, particularly helpful for digestive issues and anxiety.",
            usage: "Steep 1-2 teaspoons dried chamomile flowers in hot water for 5-10 minutes. Drink 2-3 cups daily or take as standardized extract (400-1600mg daily).",
            warnings: "May cause allergic reactions in people sensitive to ragweed, chrysanthemums, or daisies. Can interact with blood thinners.",
            sources: ["Molecular Medicine Reports", "Phytomedicine"]
          }
        ]
      };
      
      setResult(mockResult);
      
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
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
          
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search for symptoms or natural remedies..."
          />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
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
    </div>
  );
};

export default Search;