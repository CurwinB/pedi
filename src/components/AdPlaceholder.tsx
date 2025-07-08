interface AdPlaceholderProps {
  size?: "banner" | "rectangle" | "leaderboard" | "mobile-banner";
  className?: string;
}

export const AdPlaceholder = ({ size = "rectangle", className = "" }: AdPlaceholderProps) => {
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