import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  size?: "default" | "large";
}

export const SearchBar = ({ onSearch, placeholder = "Describe your symptoms or search for natural remedies...", size = "default" }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const inputSize = size === "large" ? "h-14 text-lg" : "h-12";
  const buttonSize = size === "large" ? "h-14 px-8 text-lg" : "h-12";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className={`pl-12 pr-4 ${inputSize} border-border bg-background/80 backdrop-blur-sm shadow-soft focus:shadow-natural transition-all duration-300`}
          />
        </div>
        <Button 
          type="submit" 
          variant="hero" 
          className={buttonSize}
          disabled={!query.trim()}
        >
          Search
        </Button>
      </div>
    </form>
  );
};