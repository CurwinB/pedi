
import { useLocation } from "react-router-dom";

interface AdPlaceholderProps {
  size?: "banner" | "rectangle" | "leaderboard" | "mobile-banner";
  className?: string;
}

// Routes where ads ARE allowed to be displayed
const ALLOWED_ADS_ROUTES = [
  '/',           // homepage
  '/clarify',    // clarify page
  '/search',     // results page
  '/blog',       // blog listing page
];

const shouldShowAds = (pathname: string): boolean => {
  // Allow ads on specific routes
  if (ALLOWED_ADS_ROUTES.includes(pathname)) {
    return true;
  }
  
  // Allow ads on individual blog posts (routes like /blog/some-slug)
  if (pathname.startsWith('/blog/') && pathname !== '/blog') {
    return true;
  }
  
  return false;
};

export const AdPlaceholder = ({ size = "rectangle", className = "" }: AdPlaceholderProps) => {
  const location = useLocation();
  
  // Only render ads on approved pages
  if (!shouldShowAds(location.pathname)) {
    return null;
  }

  const dimensions = {
    banner: "w-full h-16",
    rectangle: "w-80 h-64",
    leaderboard: "w-full h-24",
    "mobile-banner": "w-full h-20"
  };

  return (
    <div className={`${dimensions[size]} bg-muted/50 border border-border rounded-lg flex items-center justify-center text-muted-foreground text-sm ${className}`}>
      <div className="text-center">
        <div className="font-medium">Advertisement</div>
        <div className="text-xs opacity-70">Google AdSense</div>
      </div>
    </div>
  );
};
