import { useLocation } from "react-router-dom";

interface AdPlaceholderProps {
  size?: "banner" | "rectangle" | "leaderboard" | "mobile-banner";
  className?: string;
}

// Routes where ads should not be displayed (compliance pages)
const NO_ADS_ROUTES = [
  '/about',
  '/privacy',
  '/terms', 
  '/contact',
  '/disclaimer'
];

const shouldHideAds = (pathname: string): boolean => {
  return NO_ADS_ROUTES.includes(pathname);
};

export const AdPlaceholder = ({ size = "rectangle", className = "" }: AdPlaceholderProps) => {
  const location = useLocation();
  
  // Don't render ads on compliance pages
  if (shouldHideAds(location.pathname)) {
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