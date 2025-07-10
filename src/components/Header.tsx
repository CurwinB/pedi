import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { Menu, X, Search as SearchIcon } from "lucide-react";
import logo from "/lovable-uploads/691daaa3-cce8-4929-935b-09ac88e6b4ef.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (query: string) => {
    navigate(`/clarify?q=${encodeURIComponent(query)}`);
    setIsSearchOpen(false);
  };

  const isHomePage = location.pathname === "/";

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || !isHomePage
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-soft" 
            : "bg-white/95 backdrop-blur-sm border-b border-border/20 shadow-soft"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <img 
                src={logo} 
                alt="Remedypedia Logo" 
                className="h-32 lg:h-40 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className={`transition-colors duration-300 ${
                  location.pathname === "/" 
                    ? "text-primary font-semibold" 
                    : "text-foreground hover:text-primary"
                }`}
              >
                Home
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/blog")}
                className={`transition-colors duration-300 ${
                  location.pathname === "/blog" 
                    ? "text-primary font-semibold" 
                    : "text-foreground hover:text-primary"
                }`}
              >
                Blog
              </Button>
              <Button
                variant="ghost"
                onClick={() => setIsSearchOpen(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <SearchIcon className="h-4 w-4 mr-2" />
                Search Remedies
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/search?q=popular")}
                className="bg-gradient-card border-primary/20 hover:border-primary/40"
              >
                Browse All
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/98 backdrop-blur-md border-t border-border">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <Button
                variant="ghost"
                onClick={() => {
                  navigate("/");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start"
              >
                Home
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  navigate("/blog");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start"
              >
                Blog
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start"
              >
                <SearchIcon className="h-4 w-4 mr-2" />
                Search Remedies
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  navigate("/search?q=popular");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start"
              >
                Browse All
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-card rounded-2xl border border-border shadow-natural p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Search Natural Remedies</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Try: 'headache relief' or 'trouble sleeping' or 'digestive issues'"
              size="large"
            />
            <p className="text-sm text-muted-foreground mt-3 text-center">
              Search in natural language - describe your symptoms or health concerns
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;